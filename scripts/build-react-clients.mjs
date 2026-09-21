#!/usr/bin/env node
// Builds every react-clients/*/ app and copies each dist/ into
// dist-react-clients/<slug>/, plus a root index.html listing them all — so
// the whole react-clients/ folder can be deployed as ONE static site where
// each client is served at /<slug>/, without giving up per-client
// independent builds (each still has its own package.json/node_modules,
// this just aggregates the OUTPUT for a single deploy). Node built-ins +
// npm only, same philosophy as the other scripts here.
// Usage: node scripts/build-react-clients.mjs
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const CLIENTS_DIR = path.join(ROOT, 'react-clients');
const OUT_DIR = path.join(ROOT, 'dist-react-clients');

const slugs = fs
  .readdirSync(CLIENTS_DIR, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name);

if (slugs.length === 0) {
  console.error('No clients found under react-clients/.');
  process.exit(1);
}

fs.rmSync(OUT_DIR, { recursive: true, force: true });
fs.mkdirSync(OUT_DIR, { recursive: true });

for (const slug of slugs) {
  const clientDir = path.join(CLIENTS_DIR, slug);
  console.log(`\n--- Building ${slug} ---`);
  if (!fs.existsSync(path.join(clientDir, 'node_modules'))) {
    execSync('npm install', { cwd: clientDir, stdio: 'inherit' });
  }
  execSync('npm run build', { cwd: clientDir, stdio: 'inherit' });
  fs.cpSync(path.join(clientDir, 'dist'), path.join(OUT_DIR, slug), { recursive: true });
}

const links = slugs.map((s) => `      <li><a href="/${s}/">${s}</a></li>`).join('\n');
fs.writeFileSync(
  path.join(OUT_DIR, 'index.html'),
  `<!doctype html>\n<html lang="pt-BR">\n  <head>\n    <meta charset="UTF-8" />\n    <title>Landing pages</title>\n  </head>\n  <body>\n    <h1>Landing pages</h1>\n    <ul>\n${links}\n    </ul>\n  </body>\n</html>\n`
);

console.log(`\nBuilt ${slugs.length} client(s) into dist-react-clients/`);
