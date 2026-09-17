---
name: seo-technical
description: Configure title, meta description, canonical, Open Graph, headings, and alt text for a client landing page. Use during implementation, before final QA.
---

Category: seo · When to use: phase 12 of `/create-client`, alongside
implementation · Inputs: `copy/*.md`, `strategy/strategy.md` · Outputs: meta
tags in `clients/<slug>/src/index.astro` (passed as `title`/`description`
props to `BaseLayout`) · Dependencies: none · Limitations: structured data is
opt-in — only add it when it's genuinely justified (e.g. real
LocalBusiness/Product/FAQ data exists), never as boilerplate.

## Convention
Set metadata by exporting `pageTitle`, `pageDescription`, `pageLang` (if not
English), and `pageThemeColor` (the client's accent hex, if wanted) as named
consts from `clients/<slug>/src/index.astro` — `src/pages/[slug].astro`
reads these and forwards them to `BaseLayout` (which also auto-sets the
canonical URL to `/<slug>`). Do not write your own `<title>`/`<meta
name="description">`/canonical tags inline in the client page — they'll be
redundant with or lose to the shared ones.

## Checklist
- [ ] `pageTitle` exported, reflects the core promise, not just the company name
- [ ] `pageDescription` exported, written for the SERP, not copy-pasted from the hero
- [ ] `pageLang` exported if the page isn't in English
- [ ] `pageThemeColor` exported (client's accent color) for mobile browser chrome
- [ ] Open Graph title/description present (image only if a real one exists)
- [ ] Exactly one `<h1>` per page; heading levels nest logically
- [ ] All meaningful images have descriptive `alt` text; decorative images
      have `alt=""`
- [ ] robots behavior intentional (index by default; only noindex if asked)
