---
name: astro-client-integration
description: Implement a client's landing page as an Astro component wired into the shared routing/token system in this Landing Page OS repo. Use during the implementation phase of a client project.
---

Category: frontend · When to use: phase 11-12 of `/create-client` · Inputs:
`copy/*.md`, `strategy/page-architecture.md`, `design/design-direction.md`,
`clients/<slug>/src/tokens.css` · Outputs: `clients/<slug>/src/*.astro` ·
Dependencies: Astro, Tailwind v4 (via `@tailwindcss/vite`) already configured
at the repo root · Limitations: general code taste/anti-slop judgment and
responsive correctness are **not** this skill's job — invoke
`design-taste-frontend` and `mobile-native` for those.

## Method
1. Build sections as Astro components under `clients/<slug>/src/`, composed
   into `clients/<slug>/src/index.astro` — this file's existence is what
   registers the route (`src/pages/[slug].astro` discovers it via
   `import.meta.glob`). Do not touch `src/pages/[slug].astro` itself.
2. Reuse `shared/components/*.astro` (Hero, Nav, Footer, CtaButton) where they
   fit; add a new component only when a real, current need exists (no
   speculative variants). Note: `Footer.astro` currently hardcodes English
   copy with no localization prop — for a non-English client, write a small
   local footer instead of forcing a language mismatch (add a `text` prop to
   the shared component once a second client actually needs it, not before).
3. Export `pageTitle`, `pageDescription`, and (if not English) `pageLang` as
   named consts from `index.astro` for SEO — see the `seo-technical` skill.
   Don't write your own `<title>`/`<meta>`/canonical tags inline.
4. Style via CSS custom properties from `clients/<slug>/src/tokens.css` (which
   overrides `shared/design-system/tokens.css`) or Tailwind utility classes —
   never hardcode brand colors/fonts inline where a token exists.
5. Keep JS at zero unless a section genuinely needs interactivity; if so, use
   a plain `<script>` island, not a UI framework.
6. **Motion is not optional, but scroll-triggered content reveal is banned.**
   `design-direction.md`'s `MOTION_INTENSITY` dial (however low) means *some*
   purposeful animation, never zero — a page with no entrance animation and
   no hover/press feedback reads as unfinished regardless of how good the
   copy or layout is (this shipped once and the client rejected it as "looks
   like raw HTML"). But **never hide content behind a scroll-triggered
   reveal** (clip-path wipe, `IntersectionObserver`, `animation-timeline`, or
   otherwise) — that exact pattern was built, fixed, and rebuilt twice on
   the Talita Lopes client project and rejected twice on *feel* alone, even
   once it worked correctly. Content is visible immediately, always. Invoke the `animate`
   skill for real (you have the `Skill` tool — use it, don't approximate
   from memory) and use `shared/styles/base.css`'s `.enter`/`enter-1..6`
   (load-triggered mount stagger), `[data-hover-lift]` (card hover), and
   `[data-sticky-nav]` (opt-in sticky header with scroll-state blur/shadow —
   chrome changing, not content appearing) rather than reinventing them.
   Default to *more* continuous motion than feels safe on the first pass —
   see `CLAUDE.md`'s Motion section for the concrete recipes (desynced card
   float, large-blur ambient glows, gradient-text emphasis, motion that IS
   a section's mechanic rather than decoration beside it) and the exact
   `animation`/`transform` property-conflict bug to check for before adding
   a continuous animation to anything with existing hover/press feedback.
7. **Give neighboring sections genuinely different visual/technical
   mechanisms**, not the same card-grid pattern re-skinned with a new
   color. If a section's content is inherently a comparison, a
   conversation, or a sequence, let the UI say that literally (a
   before/after contrast module, a chat-bubble thread, an auto-advancing
   stepper) rather than defaulting to another bordered-card row. Decide
   this before writing CSS, not by decorating a generic layout after the
   fact — see `CLAUDE.md`'s Motion section.
8. **Full-bleed hero / background imagery:** size the section with
   `min-height: calc(100svh - <measured nav height>)` (plus a deliberate
   overshoot if a wave/fade visually eats into the bottom), and match a
   background photo's orientation to the container's aspect ratio
   *before* implementing — a portrait photo forced into a wide banner
   crops badly regardless of how good the photo is. Full detail and the
   reasoning in `CLAUDE.md`'s "Full-bleed hero sections" section. Any time
   a photo decision comes up mid-implementation (swapping a background,
   picking an avatar for a testimonial or chat element, sourcing new
   stock) — re-read `CLAUDE.md`'s "Content integrity" section first; it's
   easy to reach for a quick fix (a generic photo standing in for a real
   person, a real photo swapped out just to dodge a CSS bug) that only
   becomes a problem once the client notices.
9. Run `npm run check` (`astro check`) and `npm run build` before marking the
   phase done.
10. **Verify spacing, sizing, and motion claims by measurement, not by
    eyeballing a screenshot** — `getBoundingClientRect()` /
    `getComputedStyle()` via a throwaway Playwright script. A screenshot
    alone missed real bugs on the Talita Lopes project that measurement
    caught immediately (an element stuck at `opacity: 0`, a grid item
    silently wider than the viewport, a flex item squeezed to a sliver of
    its intended width). See `CLAUDE.md`'s "Common CSS pitfalls" section
    for the specific failure modes to check for.
11. Run the `mobile-native` skill for the responsive pass, and
    `design-taste-frontend` for a final code/visual taste pass.
