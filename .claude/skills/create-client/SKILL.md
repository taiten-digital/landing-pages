---
name: create-client
description: Run the lean, conversational lifecycle for a new client landing page - client interview, design interview, then parallel per-section React implementation. Use when the user asks to create a landing page for a new client/company, or invokes /create-client.
---

Category: workflow (meta-skill) · This is the orchestrator's playbook — the
main Claude Code session follows it directly. No separate "Orchestrator"
subagent exists: subagents run in fresh, isolated context and can't hold a
live conversation with the user, so the main session (this one) conducts
both interviews directly.

## Before starting
Read `CLAUDE.md` at the repo root if you haven't already this session — it's
the complete map of this system's stack, pipeline, and hard-won rules.

**Golden rule, for every phase below: always ask, never assume.** Adapt
questions to the specific business — a SaaS ≠ a restaurant ≠ a personal
trainer. If something can't be verified (a stat, a testimonial, a photo's
subject), it gets marked `UNKNOWN`/`PROOF NEEDED`, never invented.

## Phase 1 — Scaffold
Run: `npm run create-react-client -- "<Client Name>"`
Creates `react-clients/<slug>/` — an independent Vite + React + TS project
with Tailwind v4 and Framer Motion already installed and wired, plus blank
`client-brief.md`/`design-brief.md` copied in. If the script reports the
slug already exists, stop and ask the user whether this is an update to an
existing client rather than a new one.

## Phase 2 — Client Intel Interview (you, live with the user)
Ask about the business/services, differentiators, target audience, social
media handles, real contact info (WhatsApp/phone/email/address), existing
brand assets (logo/photos — note where to find them), tone/voice, and real
proof (testimonials/reviews/certifications). Never fabricate an answer the
user hasn't given or confirmed. Fill `react-clients/<slug>/client-brief.md`
directly as you go.

## Phase 3 — Design Planning Interview (you, live with the user)
Ask about aesthetic direction, liked/disliked references, existing brand
colors/fonts, and desired motion intensity. Decide the final section list
together with the user — Hero/Nav/Footer/Contact are typical defaults, but
anything else (Services, Pricing, Testimonials, FAQ, Gallery, About) only
belongs on the page if the business genuinely needs it; justify each one,
don't default to a generic template.

Before locking the Hero direction, check an existing sibling client's
`src/sections/Hero.tsx` (e.g. `talita-lopes`, `don-leon-barbearia-londrina`)
— the house style is a full-bleed background photo, and deviating from it
(e.g. because no landscape photo exists yet) needs to be surfaced to the
client explicitly, not decided silently. Also check the asset inventory
against the planned section list: if a section would clearly benefit from
a real photo (Hero, About, a services card) and `client-brief.md` doesn't
have one, ask the client for it now rather than discovering the gap after
the page ships as icon-only. See CLAUDE.md's "Full-bleed hero sections"
and "Content integrity" for the full reasoning.

Pick a real Google Font pairing for `--font-display`/`--font-sans` (never
leave it at plain `system-ui`/`'Inter'` with no import — see CLAUDE.md's
`--font-sans` gotcha under "General CSS gotchas" for the exact token name
Tailwind v4 requires), and keep the accent color reserved for true
emphasis rather than repeated on every label/icon/heading (see CLAUDE.md's
"Color palette & contrast").

Invoke the `motion-playbook` skill and use it to assign each section a
**distinct** animation mechanism — no two sections should read as the same
decoration with different content. Write `react-clients/<slug>/design-brief.md`:
concrete design tokens (ready to paste into `src/index.css`'s `@theme`
block), the section → mechanism motion table, and the justified section
list.

## Phase 4 — Parallel section builders
For every section in `design-brief.md`, invoke the `section-builder` agent —
**all invocations in one message** (multiple Agent tool calls together, not
one at a time). Each invocation's prompt must include: the paths to
`client-brief.md` and `design-brief.md`, this section's name/role, its
assigned animation mechanism, and the list of mechanisms already taken by
sibling sections. Each agent writes exactly one
`react-clients/<slug>/src/sections/<SectionName>.tsx` and touches nothing
else.

## Phase 5 — Final assembly (you, not a subagent phase)
Wire every section component into `react-clients/<slug>/src/App.tsx` in
`design-brief.md`'s section order. Generate the real favicon (the scaffold
strips the generic default Vite one on purpose — see CLAUDE.md's "Favicon"):
`node scripts/generate-favicon.mjs <slug> --logo <path> --bg "<their --color-bg>" [--crop l,t,w,h]`
if a real logo exists (crop to isolate just the icon/logomark, not a full
wordmark lockup — check the source pixel dimensions first, same "measure,
don't guess" discipline as any other asset crop in this repo), or
`node scripts/generate-favicon.mjs <slug> --letter "<first letter>" --accent "<their --color-accent>" --accent-fg "<their --color-accent-fg>"`
if there's no logo yet. Run `npm run build` inside
`react-clients/<slug>/` (this also type-checks — the Vite react-ts template's
build script is `tsc -b && vite build`). Write a throwaway Playwright script
(not committed) to check the built preview at mobile/tablet/desktop widths,
**plus one width in the 800-950px band** (a Nav with several links + a
text CTA button most often first breaks there, not at the standard three
widths) — `claude-in-chrome` has not connected once in this environment,
don't rely on it. Per CLAUDE.md's QA approach, check
`document.body.scrollWidth - window.innerWidth === 0` at each breakpoint as
a cheap tripwire for layout blowout, and if the Nav has both scroll-driven
chrome and a mobile-menu toggle, screenshot "menu open while still at
scrollY=0" as its own case — that state combination is invisible to a
sweep that only opens the menu after scrolling.

Before reporting the page done, run the cross-section consistency checks
from CLAUDE.md's "QA approach" (grep `font-display` usage across every
section's main heading, grep the heading/body color token for outliers,
grep `<button` and confirm every hit has `cursor-pointer`) — a clean build
and a zero-overflow sweep do not catch inter-section drift between
parallel `section-builder` agents, since each agent only sees the shared
briefs, never sibling agents' actual output. Report `dist/` as ready — it's
a deployable static artifact; send the client a link once hosted.

## If something doesn't fit this flow
If a client genuinely needs something outside this lean pipeline (deep
competitor research, a formal CRO review, SEO/analytics setup), that's a new
explicit decision to make with the user — note it as a gap rather than
improvising a subagent or skill for it silently.
