# Landing Page OS

A reusable system for producing independent client landing pages. Read this
file before starting any client work — it's the complete map, so a fresh
session doesn't need to re-derive the architecture.

Each client is its own standalone Vite + React + TypeScript app under
`react-clients/<slug>/`, built via a lean 3-role, conversational pipeline
(client interview → design interview → parallel per-section agents). This
system previously had a separate Astro-monorepo pipeline with two clients
built on it; both were migrated to this React system and the Astro pipeline
was retired and deleted — there is only one system now.

## Content integrity
This system has one non-negotiable rule that overrides any request to make
a page "more impressive" — it isn't a security rule, so it isn't relaxed by
these being pre-sale visual demos rather than production apps: **never
present something as true that isn't verified.** It shows up in two forms:

- **Text/stats** — never fabricate testimonials, review counts, ratings,
  awards, certifications, customer counts, or results. Every React
  `section-builder` agent must write `PROOF NEEDED: <what>` or
  `UNKNOWN — <what>` inline instead of inventing one. A later round asking
  to "state how many Google reviews exist and add a rating" still can't be
  satisfied by inventing a number if it can't be verified; ship the honest,
  already-established phrasing instead ("Avaliação verificada no Google"
  with no specific count), and say plainly to the client which part of the
  request couldn't be done and why.
- **Images** — the same rule, less obvious because it's visual instead of
  written:
  - Never present a stock or generic photo as depicting the client or any
    specific real person. Generic/thematic stock is fine for decorative or
    atmospheric use (an empty gym, a park path) as long as it's never
    captioned or implied to be a specific individual.
  - Never turn an unconfirmed photo into a stand-in for a specific real
    person's identity (an "avatar" next to their name, a caption naming
    them) unless you actually know who's pictured. A client-supplied photo
    of unclear provenance (does it show the client, or a student/model?)
    doesn't clear that bar just because it's real — when in doubt, use a
    neutral placeholder (initials, an icon) instead of guessing.
  - Note the license of any newly-sourced stock photo inline as a code
    comment next to its import (which service, that it's free for
    commercial use, whether attribution is required) — this is the only
    record of where an asset came from once it's in the repo.
  - Don't swap a client's real, already-approved photo for a stock
    substitute just to make a technical complaint (blurry, oversized, bad
    crop) go away — diagnose the actual CSS/sizing bug first. Only replace
    a real photo when it's genuinely unfit for the specific use (e.g., a
    portrait-oriented photo being forced into a full-bleed wide banner —
    see below) and say so explicitly rather than silently substituting.
  - Don't hide or omit real, verified contact info (a phone number, an
    email address) behind cosmetic simplification (a generic label like
    "WhatsApp" instead of the actual number) — that's a regression in
    usefulness dressed up as a design improvement, not an actual
    simplification.

## Full-bleed hero sections
A hero meant to "fill the page" means `min-height: calc(100svh - <nav
height>)`, where `<nav height>` is *measured* on this specific client's
actual rendered nav (a `ref` + `useLayoutEffect` reading
`getBoundingClientRect()`, not a number copied from another client or
assumed from a "usual" nav height — logo size, link count, and padding all
shift it) so Hero + nav sum to exactly one viewport. If the hero has a
bottom decorative element that visually eats into it (a wave divider, a
gradient fade), an exact one-screen match can still read as short once
something is visually carved out of the bottom edge — add a deliberate
overshoot on top of it, sized by feel and confirmed by re-measuring after,
not a constant copied from elsewhere. Use `svh` with a `vh` fallback
(mobile browser chrome resizes `vh` but not `svh`). See the
`motion-playbook` skill for the exact recipe.

**Match a full-bleed background photo's orientation to the container
before choosing it, not after.** A portrait-oriented photo (taller than
wide) forced into a wide, short hero box either shows a tight, mostly
decontextualized slice (`object-fit: cover` crops the *sides* only when
the container is proportionally *taller* than the photo — for a wide
hero it's usually the reverse: it crops top/bottom, and hard, the wider
the mismatch) or has to be blurred into near-abstraction to hide that crop.
This cost three separate photo swaps on one project before the actual
cause (aspect-ratio mismatch, not "wrong photo") was identified. Before
implementing: check the source image's real pixel dimensions against the
hero box's approximate rendered aspect ratio; prefer a **landscape-
oriented photo close to the container's own aspect ratio** so
`object-fit: cover` only trims a modest amount off one axis. This applies
whether the photo is the client's own or freshly-sourced stock.

## General CSS gotchas
- **A CSS Grid item's default `min-width` is `auto`** (sized to fit its
  content), not 0. A grid item containing a horizontally-scrolling child
  (a carousel `overflow-x: auto` strip, for instance) can have that
  child's full intrinsic content width leak into the grid track itself,
  making the item — and anything centered inside it — render wider than
  the actual viewport. If the ancestor has `overflow: hidden`, this fails
  *silently*: no scrollbar, no visible break, just centered elements that
  read as subtly "off" (arrows that look shifted, cards that look cropped
  wrong) because the box they're centered in is bigger than the screen.
  Fix: `min-width: 0` on the grid item.
- **A block box with `aspect-ratio` and no explicit `width` can collapse to
  ~0 if its only child becomes `position: absolute`.** Wrapping an `<img>`
  in an inner `position: absolute; inset: -Npx` layer (to add continuous
  idle-float motion without revealing the frame's edge) means that layer
  contributes *zero* intrinsic size to its ancestors. If the frame itself
  has `aspect-ratio` set but relies on `width: auto` (or an ancestor relies
  on `max-width` instead of `width` inside a CSS Grid item with non-stretch
  sizing), the whole chain can collapse to a few pixels — on
  `jonatas-hotts` this made the hero photo disappear entirely at all three
  breakpoints, with no visible error and nothing wrong in the CSS as
  written (only `getBoundingClientRect()` showed a 6px-wide box). Fix: once
  any node in a photo-card chain has an absolutely positioned child, give
  every ancestor up to the sized container an *explicit* `width` (not
  `max-width`, not implicit grid/flex stretch).
- **A CSS Grid row's default `align-items: stretch` forces every card in
  that row to match the tallest one.** A 4-item service card next to a
  7-item one, or a short testimonial next to a long one, gets stretched
  into dead empty space at its own bottom — this reads as an unintentional
  layout gap, not a deliberate one, and a client on
  `don-leon-barbearia-londrina` flagged it independently in two different
  grids on the same page. Fix: add `items-start` to any `grid-cols-*`
  container whose cards' content length varies.
- **A carousel that snaps by `index * itemWidth` alone overshoots near the
  end of the list** — once fewer items remain than fit in one viewport
  width, the calculated offset scrolls past the last real item into blank
  background. Measure the real track width and viewport width and clamp the
  target (`Math.min(maxScroll, index * itemStep)`); see the `motion-playbook`
  skill's Carousels recipe.
- **A marquee with a hardcoded "2 copies" of its content can still run dry
  mid-loop on a wide viewport** if those 2 copies together are narrower
  than the screen — the seamless-loop math is correct but there's simply
  not enough content queued up. Measure one copy's width against the
  viewport and render `Math.ceil(viewportWidth / trackWidth) + 1` copies
  instead of assuming 2 is always enough; see `motion-playbook`'s Marquees
  recipe.
- **Two consecutive sections sharing the same background color give the eye
  no boundary**, so even reasonable padding between them reads as one long
  dead gap rather than two intentional sections. A `don-leon-barbearia-londrina`
  round flagged "espaçamento imenso sem intenção" twice — once from grid
  stretch (above), once from this, after generous section padding
  (`py-24 sm:py-32`, ~192-256px between two sections) made it worse. Default
  new sections to tighter padding (`py-16 sm:py-20`), and when a section's
  background repeats the one directly before it, add a thin
  `border-t border-white/5` divider so the transition reads as deliberate.

## QA approach
No permanent test framework. `claude-in-chrome` has not successfully
connected once in this environment across real use — when it doesn't,
install Playwright (`npm install -D playwright && npx playwright install
chromium`) and write a throwaway script rather than guessing visual
correctness from source code. This isn't optional when scroll/motion is
involved: a real bug (scroll-reveal silently hiding ~90% of a page on an
earlier build) was invisible from source reading and only found by
actually screenshotting the page. A visual pass alone still isn't enough
for spacing/sizing/animation claims — check `document.body.scrollWidth -
window.innerWidth === 0` at every tested breakpoint as a cheap, general
tripwire for grid/flex blowout bugs before they're reported back by the
client. Add a permanent automated visual-regression or Lighthouse CI
*pipeline* only when a specific client need justifies it.

React clients type-check as part of their own `npm run build` (`tsc -b &&
vite build`) inside `react-clients/<slug>/`.

---

## Stack
Vite + React + TypeScript, Tailwind CSS v4 (`@tailwindcss/vite`), Framer
Motion for animation. Each client is a fully independent app — its own
`package.json`, its own `npm run build` → `dist/`, no shared routing,
tokens, or components with any other client. No adapter/backend; these are
static, deployable-anywhere sales-demo builds. Security hardening is
explicitly out of scope (pre-sale visual demos shown to a prospective
client, not production apps handling real user data) — but Content
integrity above is not a security rule and still fully applies.

### Folder map
```
react-clients/
  README.md                     slug rule, explains independent-app model
  <slug>/
    client-brief.md              output of the Client Intel Interview
    design-brief.md              output of the Design Planning Interview
    package.json / vite.config.ts / tsconfig*.json / index.html
    src/
      main.tsx
      App.tsx                    composes section components in design-brief order
      index.css                  @import "tailwindcss"; + @theme {} with this client's tokens
      sections/
        <SectionName>.tsx        one file per section, one section-builder agent per file
      assets/images/
    dist/                        build output, gitignored
```

### The pipeline (5 phases, see `.claude/skills/create-client/SKILL.md` for the full playbook)
1. **Scaffold** — `npm run create-react-client -- "Client Name"`
   (`scripts/create-react-client.mjs`). Installs and wires Vite+React+TS+
   Tailwind v4+Framer Motion; copies blank `client-brief.md`/`design-brief.md`.
   Automates only technical wiring — never a design decision.
2. **Client Intel Interview** — the main session, live with the user, not a
   subagent (subagents can't hold a real-time conversation). Business,
   services, differentiators, audience, social handles, real contact info,
   brand assets, tone, real proof. Fills `client-brief.md`.
3. **Design Planning Interview** — also live, main session. Aesthetic
   direction, references, existing brand colors/fonts, motion intensity, and
   the justified final section list (no generic template — every section
   beyond Hero/Nav/Footer/Contact earns its place). Invokes `motion-playbook`
   to assign each section a distinct animation mechanism. Fills
   `design-brief.md`: tokens, section → mechanism table, section list.
4. **Parallel section builders** — the `section-builder` agent, invoked once
   per section, **all in one message** (true parallel Agent tool calls).
   Each reads `client-brief.md` + `design-brief.md` + its own spec +
   siblings' taken mechanisms, and writes exactly one
   `src/sections/<SectionName>.tsx`.
5. **Final assembly** — main session composes `App.tsx`, runs `npm run
   build` (type-checks + builds), Playwright-verifies breakpoints, reports
   `dist/` as ready to host and share.

Golden rule for every phase and every agent involved: **always ask, never
assume.** This applies to the two live interviews and to every
`section-builder` invocation — an unconfirmed fact becomes `UNKNOWN`/
`PROOF NEEDED`, never a guess.

### Favicon
Every client gets a real favicon during Final Assembly (Phase 5) — the
scaffold script deliberately strips the generic default Vite favicon/icon
sprite (`public/favicon.svg`, `public/icons.svg`) and the `<link rel="icon">`
pointing at it, so a client left without one is an obvious, visible gap
instead of a silently wrong/generic icon. Generate the real one with
`scripts/generate-favicon.mjs`:
- **Real logo exists**: pad/crop it onto a square PNG in the site's own
  `--color-bg` token. If the logo is a wide wordmark+logomark lockup (most
  are), crop to isolate just the icon/logomark — a full lockup shrunk to
  favicon size reads as illegible noise. Check the source image's real pixel
  dimensions first and preview the crop before committing to it, the same
  "measure, don't guess" discipline as any other asset crop in this repo.
- **No logo yet**: a plain monogram (the client's first initial) in their
  own `--color-accent`/`--color-accent-fg` tokens — a neutral placeholder,
  same as the "initials instead of guessing" rule under Content integrity,
  never a generic unrelated icon.

### Icons, copy & spacing style
Never hand-draw an SVG icon, and never settle for a vaguely-related generic
one either — check `lucide-react` and `react-icons` (which bundles Font
Awesome, Material Design, Tabler, Phosphor, Game Icons, Simple Icons, and
more) across several sets for a literal match, then search Iconify's public
API (`https://api.iconify.design/search?query=<keyword>`) if none of those
have it; when more than one real candidate turns up, render them side by
side and pick the one that's unambiguous at icon size, not just the first
result — a technically-real razor icon still got rejected as unclear before
a literal clippers icon replaced it. Never use an em dash (—) in any
rendered copy (headings, body text, alt text, aria-labels) — restructure
with a comma, period, or colon instead. Default section padding to
`py-16 sm:py-20`, not `py-24 sm:py-32`, and add a `border-t border-white/5`
divider whenever a section's background repeats the one directly before
it — two same-color sections back to back make even reasonable padding
read as one dead gap. All three rules came from explicit client rejection
on `don-leon-barbearia-londrina` (hand-drawn icons, then vague/half-right
substitutes; "nunca use esses traços" for the em dash; "espaçamento imenso
sem intenção" raised twice, for grid-stretch and again for section
padding); see `.claude/agents/section-builder.md` for the full rule text
and method every section-builder invocation follows, and `motion-playbook`
for the carousel/marquee measurement recipes these same rounds surfaced.

### Motion (Framer Motion)
Full recipes live in `.claude/skills/motion-playbook/SKILL.md` — load it
before assigning or building any section's animation. In short: content is
visible immediately (no `whileInView` hiding of primary content — an
earlier scroll-reveal system was rejected twice by a real client
regardless of whether it was technically working, "parece que não
carregou" the first time, "essa animação... um lixo" the second, and was
removed as a pattern entirely); grid/row items get continuous idle float
with a per-item phase offset so they don't move in sync; ambient glows use
a large blur radius (40-70px) and a gradient that's fully transparent well
before its own edge (a small blur on a hard-stopped gradient reads as a
visible smudge, not soft light); stat/emphasis text can use a
gradient-text treatment; a section whose content is inherently sequential
(a stepper, an FAQ) should let that real mechanic carry the motion instead
of decorating a static layout; every section in a page must use a
**different** mechanism from its neighbors; `useReducedMotion()` zeroes out
motion entirely under `prefers-reduced-motion: reduce`. Ship confident
continuous motion on the first pass, not as a later patch added only after
a client flags a section as static. Two animations on one element (a
continuous `animate` plus a `whileHover`/`whileTap`) compose correctly in
Framer Motion — there's no CSS `animation`-shorthand collision to worry
about here.

**Prefer structural reinvention over decoration when a section is flagged
as static or generic.** Adding hover states, glows, or floats to an
existing card-grid-plus-text layout is often a *smaller* fix than what's
actually being asked for. Before decorating a section, ask whether a
genuinely different composition would serve the same content better (a
plain photo+bullet-list "About" as a before/after contrast module; a Q&A
as a chat-bubble thread instead of an accordion grid; a linear process as
an auto-advancing stepper instead of a static row) — and give neighboring
sections *different* mechanisms from each other, the same way a repeated
color or font would be a tell.

## Commands
```
npm run create-react-client -- "Client Name"   # scaffold a new independent React client app
npm run build:react-clients                    # build + aggregate every React client into dist-react-clients/<slug>/
```
Per-client commands (run inside `react-clients/<slug>/`):
```
npm run dev       # local dev server
npm run build     # type-check + static build → dist/
npm run preview   # serve the built dist/ locally, for the Playwright QA pass
```

## Deployment
Each client produces its own `dist/` (no adapter, static, deployable
anywhere) when built individually. To deploy **every** client under one
domain at once (`domain.com/<slug>/` per client, one Vercel/Netlify
project) instead of one deploy per client, use `npm run
build:react-clients` (`scripts/build-react-clients.mjs`) — it builds every
`react-clients/*/` app and copies each `dist/` into
`dist-react-clients/<slug>/`, plus a root `index.html` listing them. See
`react-clients/README.md` for the exact Vercel project settings.
