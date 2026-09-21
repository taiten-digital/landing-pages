#!/usr/bin/env node
// Generates react-clients/<slug>/public/favicon.png and points index.html at
// it, replacing the generic default Vite favicon/icons.svg every scaffold
// starts with. Two modes:
//   - Real logo exists: pad/crop it onto a square in the site's own --bg
//     token (never distort or stretch a real logo to force a square fit).
//   - No logo yet: a plain monogram (first letter of the client name) in the
//     site's own --accent/--accent-fg tokens - a neutral placeholder, never
//     a generic/unrelated icon, matching CLAUDE.md's "Content integrity"
//     placeholder rule.
// Usage:
//   node scripts/generate-favicon.mjs <slug> --logo <path/to/logo.png> --bg "#0b0c0f" [--crop left,top,width,height]
//   node scripts/generate-favicon.mjs <slug> --letter "D" --accent "#2f5fd6" --accent-fg "#ffffff"
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const [slug, ...rest] = process.argv.slice(2);
const args = {};
for (let i = 0; i < rest.length; i += 2) args[rest[i].replace(/^--/, '')] = rest[i + 1];

if (!slug || (!args.logo && !args.letter)) {
  console.error(
    'Usage: node scripts/generate-favicon.mjs <slug> --logo <path> --bg "#hex" [--crop l,t,w,h]\n' +
    '   or: node scripts/generate-favicon.mjs <slug> --letter "X" --accent "#hex" --accent-fg "#hex"'
  );
  process.exit(1);
}

const clientDir = path.join(ROOT, 'react-clients', slug);
const outPath = path.join(clientDir, 'public', 'favicon.png');
const SIZE = 256;

async function fromLogo() {
  let img = sharp(path.join(ROOT, args.logo));
  if (args.crop) {
    const [left, top, width, height] = args.crop.split(',').map(Number);
    img = img.extract({ left, top, width, height });
  }
  await img
    .resize(SIZE, SIZE, { fit: 'contain', background: args.bg || '#ffffff' })
    .flatten({ background: args.bg || '#ffffff' })
    .png()
    .toFile(outPath);
}

async function fromMonogram() {
  const accent = args.accent || '#111111';
  const accentFg = args['accent-fg'] || '#ffffff';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}">
    <rect width="${SIZE}" height="${SIZE}" rx="${SIZE * 0.22}" fill="${accent}" />
    <text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle"
      font-family="system-ui, sans-serif" font-weight="800"
      font-size="${SIZE * 0.52}" fill="${accentFg}">${args.letter.toUpperCase()}</text>
  </svg>`;
  await sharp(Buffer.from(svg)).png().toFile(outPath);
}

fs.mkdirSync(path.dirname(outPath), { recursive: true });
await (args.logo ? fromLogo() : fromMonogram());

for (const stale of ['favicon.svg', 'icons.svg']) {
  fs.rmSync(path.join(clientDir, 'public', stale), { force: true });
}

const indexPath = path.join(clientDir, 'index.html');
const html = fs.readFileSync(indexPath, 'utf8');
const linkTag = '<link rel="icon" type="image/png" href="/favicon.png" />';
fs.writeFileSync(
  indexPath,
  /<link rel="icon"[^>]*>/.test(html)
    ? html.replace(/<link rel="icon"[^>]*>/, linkTag)
    : html.replace('</head>', `  ${linkTag}\n  </head>`)
);

console.log(`Favicon written to react-clients/${slug}/public/favicon.png`);
