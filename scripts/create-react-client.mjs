#!/usr/bin/env node
// Scaffolds a new independent React client app under react-clients/<slug>/.
// Shells out to npm/Vite for the actual project scaffold — no reimplementing
// what Vite already does well. Only wires the house conventions (Tailwind v4,
// Framer Motion, sections/ folder, brief templates) on top.
// Usage: node scripts/create-react-client.mjs "Client Name"
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

function slugify(name) {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // strip accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function isValidSlug(slug) {
  return /^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug);
}

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const clientName = process.argv[2];

if (!clientName) {
  console.error('Usage: node scripts/create-react-client.mjs "Client Name"');
  process.exit(1);
}

const slug = slugify(clientName);
if (!isValidSlug(slug)) {
  console.error(`Could not derive a valid slug from "${clientName}" (got "${slug}").`);
  process.exit(1);
}

const clientDir = path.join(ROOT, 'react-clients', slug);
if (fs.existsSync(clientDir)) {
  console.error(`react-clients/${slug} already exists.`);
  process.exit(1);
}

// Forward slashes on purpose, even on Windows: this string goes through a
// shell (execSync), and a Windows-style backslash path silently loses its
// separators somewhere between here and cmd.exe when run under Git Bash's
// node — forward slashes are accepted everywhere on Windows and dodge the
// issue entirely.
const relClientDir = `react-clients/${slug}`;

console.log(`Scaffolding react-clients/${slug}/ (Vite + React + TS)...`);
execSync(`npm create vite@latest ${relClientDir} -- --template react-ts`, {
  cwd: ROOT,
  stdio: 'inherit',
});

console.log('Installing dependencies...');
execSync('npm install', { cwd: clientDir, stdio: 'inherit' });
// lucide-react + react-icons are pre-installed here because section-builder
// agents only have Read/Write/Skill (no Bash) — they can't npm install
// mid-build, and CLAUDE.md's "Icons & copy style" rule requires them to
// pull every icon from a real library, never hand-draw an SVG.
execSync('npm install tailwindcss @tailwindcss/vite framer-motion lucide-react react-icons', {
  cwd: clientDir,
  stdio: 'inherit',
});

fs.writeFileSync(
  path.join(clientDir, 'vite.config.ts'),
  `import { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\nimport tailwindcss from '@tailwindcss/vite';\n\n// base: './' keeps built asset paths relative, so dist/ works from any\n// subpath or static host without extra config.\nexport default defineConfig({\n  base: './',\n  plugins: [react(), tailwindcss()],\n});\n`
);

fs.writeFileSync(
  path.join(clientDir, 'src', 'index.css'),
  `@import "tailwindcss";\n\n@theme {\n  /* Design tokens go here — filled during the Design Planning Interview,\n     see design-brief.md. Nothing is assumed or pre-filled. */\n}\n`
);
fs.rmSync(path.join(clientDir, 'src', 'App.css'), { force: true });

fs.writeFileSync(
  path.join(clientDir, 'src', 'App.tsx'),
  `// Section imports get added here during Final Assembly (Phase 5), once the\n// parallel section-builder agents have written each src/sections/*.tsx file.\nexport default function App() {\n  return <></>;\n}\n`
);

fs.mkdirSync(path.join(clientDir, 'src', 'sections'), { recursive: true });
fs.mkdirSync(path.join(clientDir, 'src', 'assets', 'images'), { recursive: true });
fs.writeFileSync(path.join(clientDir, 'src', 'sections', '.gitkeep'), '');

function fill(content) {
  return content
    .replaceAll('{{CLIENT_NAME}}', clientName)
    .replaceAll('{{SLUG}}', slug)
    .replaceAll('{{DATE}}', new Date().toISOString().slice(0, 10));
}

const templatesDir = path.join(ROOT, 'templates', 'react-client');
for (const file of ['client-brief.md', 'design-brief.md']) {
  const src = fs.readFileSync(path.join(templatesDir, file), 'utf8');
  fs.writeFileSync(path.join(clientDir, file), fill(src));
}

console.log(`\nCreated react-clients/${slug}/`);
console.log('Next: run the Client Intel Interview (see .claude/skills/create-client/SKILL.md, Phase 2).');
