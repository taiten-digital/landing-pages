# React Clients

Each subdirectory here is one client landing page, created by
`npm run create-react-client -- "Client Name"` (see
`scripts/create-react-client.mjs`). Each project is a fully
**independent** Vite + React + TypeScript app: its own `package.json`, its
own `npm run build` → `dist/`, no shared routing or shared runtime with any
other client.

Slug rule: lowercase, URL-safe, no spaces/accents, hyphen-separated
(`Clínica São Paulo` → `clinica-sao-paulo`).

## Deploying all clients under one domain
Each client still builds independently, but `npm run build:react-clients`
(`scripts/build-react-clients.mjs`) builds every one of them and copies the
results into `dist-react-clients/<slug>/`, plus a root `index.html` listing
them — so the whole thing deploys as **one** static site where each client
lands at `/<slug>/` (e.g. `suaurl.com.br/don-leon-barbearia-londrina/`). Set
up a Vercel project pointing at this repo with:
- **Build Command**: `npm run build:react-clients`
- **Output Directory**: `dist-react-clients`
- **Root Directory**: repo root (the script needs to see every client folder)

See root `CLAUDE.md` and `.claude/skills/create-client/SKILL.md` for the
full pipeline.
