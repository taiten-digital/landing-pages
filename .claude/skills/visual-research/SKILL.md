---
name: visual-research
description: Gather visual references for a client - their own imagery, competitor visuals, industry conventions, and relevant design inspiration - before design direction is set. Use during the visual research phase of a client project.
---

Category: visual-research · When to use: phase 9 of `/create-client`, before
`visual-direction` · Inputs: `brand/brand-dna.md`,
`research/competitor-analysis.md` · Outputs: `design/visual-research.md` +
saved references in `assets/moodboard/` · Dependencies:
`mcp__claude-in-chrome__*` for screenshots/browsing, Figma MCP (`figma-use`,
`figma-design-to-code`) if the client provided Figma files, WebSearch/
WebFetch for industry conventions and design inspiration (see step 3) ·
Limitations: gathers and analyzes, does not decide final tokens — that's
`visual-direction`.

## Method
1. Capture the client's own imagery/photography style and existing campaigns
   (site + social), using `claude-in-chrome` for screenshots where useful.
2. Capture competitor visual language from `research/competitor-analysis.md`
   targets — layout, photography, typography, color.
3. Note industry-standard conventions worth following or deliberately
   breaking from. For fresh, non-templated direction (composition, motion
   ideas, type pairings, color combinations — never specific copyrighted
   assets or a whole layout to lift wholesale), check two free, no-login
   reference sources via `WebFetch`:
   - **[inspora.design](https://www.inspora.design/)** — an hourly-updated
     visual design archive filtered by category (Web, Branding, Product,
     Motion, Illustration, 3D, Print) and tagged by industry/style, each
     entry linking back to its original creator. Best for current mood/
     composition/motion inspiration across disciplines.
   - **[styles.refero.design](https://styles.refero.design/)** — 2,000+
     design systems extracted from real shipped products (Apple, Notion,
     Duolingo, etc.) as structured "DESIGN.md" summaries: exact color
     values with their *role* (not just a hex, but "the only chromatic
     interactive color"), type scale, spacing unit, and explicit do/don't
     rules. Best for seeing how a *rigorous* design system is structured,
     and for its own explicit anti-genericness method: match the product
     category → match the density (sparse/editorial/operational/technical/
     conversion-heavy) → translate that into a concrete brief, because
     "clean fintech, clean SaaS, clean ecommerce, and clean editorial all
     mean different things in practice" — a vague "make it clean" is what
     produces a generic result.
   Both are faster, more current sources of "what does genuinely
   contemporary design look like" than guessing from training-data-era
   examples — exactly the gap that produces a templated/generic-feeling
   first draft.
4. For each reference saved, tag it: **Client asset** (owned, reusable),
   **Competitor reference** (analysis only, never reuse), or **Inspiration**
   (public but likely not licensed for commercial reuse — verify before
   use). Everything from Inspora, Refero Styles, or any other public
   inspiration feed is **Inspiration**: reference for direction, structure,
   and rigor only. Never copy a specific layout, illustration, or asset
   wholesale, never attribute a technique to "the client's site" when it
   actually came from an unrelated reference, and never hand a client a
   real, recognizable brand's exact system (e.g. Apple's specific blue and
   SF Pro) as if it were an original direction for them — the value of a
   Refero Styles entry is the *rigor of how it's extracted and structured*,
   to apply to tokens actually derived from this client's own brand.
5. Summarize patterns (not just a link dump) in `design/visual-research.md`
   for the `visual-direction` skill to act on.
