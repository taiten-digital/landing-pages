---
name: performance-budget
description: Check image, font, and JS budget for a client landing page using Astro's built-in optimization. Use during implementation and before final QA.
---

Category: performance · When to use: phase 12-13 of `/create-client` ·
Inputs: `clients/<slug>/src/*.astro` · Outputs: notes in
`qa/post-mortem.md` · Dependencies: Astro's built-in `astro:assets` — no new
image/perf library · Limitations: don't chase a metric at the cost of a
worse experience (e.g. removing a genuinely useful hero image for a marginal
score gain).

## Checklist
- [ ] Images use `astro:assets` `<Image>`/`getImage` for automatic
      optimization/sizing, not raw `<img src>` to large source files
- [ ] Below-the-fold images use `loading="lazy"`; hero image does not
- [ ] No unused JS shipped — zero-JS by default per the astro-client-integration
      skill; any `<script>` island is justified
- [ ] Fonts: system font stack by default (`shared/design-system/tokens.css`);
      only add a webfont with a concrete brand reason, and self-host or use
      `font-display: swap`
- [ ] `astro build` output has no unexpectedly large assets
