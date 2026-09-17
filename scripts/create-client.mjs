#!/usr/bin/env node
// Deterministic client scaffold. Node built-ins only — no new dependencies.
// Usage: node scripts/create-client.mjs "Client Name"
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { slugify, isValidSlug } from '../shared/utilities/slugify.mjs';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const clientName = process.argv[2];

if (!clientName) {
  console.error('Usage: node scripts/create-client.mjs "Client Name"');
  process.exit(1);
}

const slug = slugify(clientName);
if (!isValidSlug(slug)) {
  console.error(`Could not derive a valid slug from "${clientName}" (got "${slug}").`);
  process.exit(1);
}

const clientDir = path.join(ROOT, 'clients', slug);
if (fs.existsSync(clientDir)) {
  console.error(`clients/${slug} already exists.`);
  process.exit(1);
}

const dirs = [
  'discovery', 'research', 'brand', 'strategy', 'copy',
  'design', 'assets/moodboard', 'src', 'qa',
];
for (const dir of dirs) {
  fs.mkdirSync(path.join(clientDir, dir), { recursive: true });
}

function fill(content) {
  return content
    .replaceAll('{{CLIENT_NAME}}', clientName)
    .replaceAll('{{SLUG}}', slug)
    .replaceAll('{{DATE}}', new Date().toISOString().slice(0, 10));
}

const templatesDir = path.join(ROOT, 'templates');
const templateMap = {
  'discovery/questionnaire.md': 'discovery/questionnaire.md',
  'research/company-intelligence.md': 'research/company-intelligence.md',
  'research/competitor-analysis.md': 'research/competitor-analysis.md',
  'brand/brand-dna.md': 'brand/brand-dna.md',
  'strategy/strategy.md': 'strategy/strategy.md',
  'strategy/page-architecture.md': 'strategy/page-architecture.md',
  'design/design-direction.md': 'design/design-direction.md',
  'qa/post-mortem.md': 'qa/post-mortem.md',
  'project-state.md': 'project-state.md',
};

for (const [templateRel, destRel] of Object.entries(templateMap)) {
  const src = fs.readFileSync(path.join(templatesDir, templateRel), 'utf8');
  fs.writeFileSync(path.join(clientDir, destRel), fill(src));
}

fs.writeFileSync(
  path.join(clientDir, 'src', 'tokens.css'),
  `/* Client-level token overrides for "${slug}". Loaded after shared/design-system/tokens.css. */\n[data-client="${slug}"] {\n  /* --color-accent: #___; */\n}\n`
);

fs.writeFileSync(
  path.join(clientDir, 'src', 'index.astro'),
  `---\n// Placeholder page for "${clientName}" — the developer agent replaces this\n// during implementation. This file's existence is what registers the route\n// at /${slug} (see src/pages/[slug].astro).\nimport Hero from '../../../shared/components/Hero.astro';\n---\n<Hero headline="${clientName}" subheadline="Page not yet implemented." />\n`
);

console.log(`Created clients/${slug}/`);
console.log(`Next: fill out clients/${slug}/discovery/questionnaire.md, then run the /create-client workflow.`);
