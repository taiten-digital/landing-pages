---
name: visual-direction
description: Turn brand DNA, strategy, and visual research into concrete design token values (colors, type, spacing, radius) for a client's landing page. Use during the design phase, before implementation.
---

Category: ui · When to use: phase 10 of `/create-client`, after
`brand/brand-dna.md`, `strategy/strategy.md`, and `design/visual-research.md`
(from the visual-research skill) exist · Inputs: those three files ·
Outputs: `design/design-direction.md` (rationale) and
`clients/<slug>/src/tokens.css` (implementation) · Dependencies: none ·
Limitations: this decides tokens and layout notes only. For actual taste
judgment (does this look templated/generic, is hierarchy right, is it too
loud/quiet) **invoke the `design-taste-frontend` skill** rather than
re-deriving aesthetic rules here — this skill is the client-specific input
layer, `design-taste-frontend` is the quality bar.

## Method
1. State the one-line design read: what should this feel like, and why, tying
   back to Brand DNA and audience sophistication. Use
   [styles.refero.design](https://styles.refero.design/)'s own method for
   this: match the product's *category* (SaaS, fintech, ecommerce, local
   service, etc.), then its *density* (sparse, editorial, operational,
   technical, conversion-heavy) — "make it clean" means something
   different for each combination, and skipping straight to aesthetics
   without naming these first is what produces a generic result that
   could belong to any client.
2. Set token overrides in `clients/<slug>/src/tokens.css` — only override
   values that need to differ from `shared/design-system/tokens.css`,
   scoped under `[data-client="<slug>"]`. Write `design-direction.md` with
   the same rigor as a real extracted design system (a Refero Styles
   `DESIGN.md` is the model): every color gets a stated *role*, not just a
   hex ("the only chromatic interactive color," not "accent color"), and
   note explicit do/don't rules for using it — a vague mood description is
   exactly what `astro-client-integration` has nothing to act on when it
   defaults to generic choices.
3. Note layout/imagery/motion direction; hand off motion specifics to the
   `animate` skill rather than specifying easing curves here.
4. Distinguish moodboard inspiration from assets actually licensed for reuse —
   never assume publicly found imagery is free to use commercially.
5. For any full-bleed/background photo use (a hero especially), note the
   target container's approximate aspect ratio here and flag that the
   sourced photo should be landscape-oriented and close to that ratio —
   catching an orientation mismatch at this stage is far cheaper than
   discovering it after implementation. A portrait photo forced into a
   wide hero crops badly no matter how good the photo or how much blur is
   applied to hide it; see `CLAUDE.md`'s "Full-bleed hero sections".
6. Before finalizing, run the direction past `design-taste-frontend` to catch
   generic-AI-aesthetic patterns.
