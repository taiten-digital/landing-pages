# React Clients

Each subdirectory here is one client landing page, created by
`npm run create-react-client -- "Client Name"` (see
`scripts/create-react-client.mjs`). Unlike `clients/` (the legacy Astro
monorepo, frozen — see root `CLAUDE.md`), each project here is a fully
**independent** Vite + React + TypeScript app: its own `package.json`, its
own `npm run build` → `dist/`, no shared routing or shared runtime with any
other client.

Slug rule: lowercase, URL-safe, no spaces/accents, hyphen-separated
(`Clínica São Paulo` → `clinica-sao-paulo`).

See root `CLAUDE.md`'s "React Independent-App System" section and
`.claude/skills/create-client/SKILL.md` for the full pipeline.
