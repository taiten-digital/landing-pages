# Clients

Each subdirectory here is one client project, created by
`npm run create-client -- "Client Name"` (see `scripts/create-client.mjs`).

Slug rule: lowercase, URL-safe, no spaces/accents, hyphen-separated
(`Clínica São Paulo` → `clinica-sao-paulo`). Slugs must be unique and stable —
once deployed at `/​<slug>`, don't rename.

Creating `clients/<slug>/src/index.astro` is what registers the route at
`domain.com/<slug>` — see `src/pages/[slug].astro`.
