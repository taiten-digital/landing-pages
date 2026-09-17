---
name: qa-checklist
description: Run the full technical, visual, and accessibility QA pass on a finished client landing page before CRO review and final validation. Use after implementation is complete.
---

Category: testing · When to use: phase 13 of `/create-client`, after
implementation, before `cro-review` · Inputs: the built page ·
Outputs: `qa/post-mortem.md` (Breakpoint/Technical checklists) ·
Dependencies: `npm run check` (astro check), `npm run build`,
`mcp__claude-in-chrome__*` for visual breakpoint checks, Playwright as a
fallback (see below) · Limitations: this is a checklist-driven manual
review, not a permanent automated test suite — no Playwright/Lighthouse CI
*pipeline* added, but an ad-hoc Playwright script for a single verification
pass is expected and encouraged, not a violation of that rule.

## Method
1. `npm run check` — must pass with zero errors.
2. `npm run build` — must succeed with no console errors during `npm run
   preview`.
3. Visual pass at mobile (~390px), tablet (~768px), desktop (~1440px) via
   `claude-in-chrome`. **If it doesn't connect (check `docs/mcp-registry.md`
   — it hasn't connected once in this environment historically), don't
   guess from source code alone: install Playwright
   (`npm install -D playwright && npx playwright install chromium`) and
   write a throwaway script that navigates, scrolls the full page height
   programmatically (not just `fullPage` screenshot without scrolling —
   that can miss scroll-triggered content), and screenshots at each
   breakpoint.** This caught a real, severe bug (a scroll-reveal animation
   that silently hid ~90% of a page's content) that source-code reading
   alone missed entirely — see `clients/talita-lopes/project-state.md`.
   Check typography scale, spacing, overflow, image sizing, CTA
   reachability, nav usability, touch target size.
4. **A screenshot is not sufficient verification for spacing, sizing, or
   motion — measure.** For any claim about a gap, an element's width, or
   whether an animation is actually running, read it directly in the same
   Playwright script: `getBoundingClientRect()` for positions/sizes,
   `getComputedStyle()` for `opacity`/`transform`/`animation-name`. Also
   check `document.body.scrollWidth - window.innerWidth === 0` at every
   tested breakpoint — a nonzero value means something is silently
   overflowing (commonly a CSS Grid item missing `min-width: 0` around a
   scrolling child; see `CLAUDE.md`'s "Common CSS pitfalls"). Several real
   bugs on Talita Lopes were invisible in a screenshot and only caught this
   way: a floating card stuck permanently at `opacity: 0`, a carousel
   container silently 90px wider than its viewport with its overflow
   clipped (arrows/cards looked "off-center," not obviously broken), and a
   flex item squeezed to a fraction of its intended width while its
   siblings stayed full-size.
5. For deeper accessibility/UI polish judgment, invoke `impeccable`; for
   mobile-specific correctness (tap highlights, viewport bugs, safe areas),
   invoke `mobile-native`.
6. SEO: confirm the `seo-technical` checklist was completed.
7. Log every issue found in `qa/post-mortem.md`'s Issues table with severity;
   fix and re-check before moving to CRO review.
