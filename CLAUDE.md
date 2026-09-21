# Landing Page OS

A reusable system for producing independent client landing pages. Read this
file before starting any client work — it's the complete map, so a fresh
session doesn't need to re-derive the architecture.

## Two systems in this repo

**This repo currently holds two separate, non-interoperating systems.** Know
which one you're in before touching anything.

- **React Independent-App System** (primary — use for every new client from
  now on). Each client is its own standalone Vite + React + TypeScript app
  under `react-clients/<slug>/`, built via a lean 3-role, conversational
  pipeline (client interview → design interview → parallel per-section
  agents). See "React Independent-App System" below.
- **Legacy: Astro Monorepo** (frozen — `clients/talita-lopes` and
  `clients/jonatas-hotts` only). The original single-build Astro monorepo
  with shared routing/tokens and an 18-phase autonomous-agent pipeline. It
  is **not extended** — no new clients are scaffolded here, and the pipeline
  it used is retired. It stays exactly as-is for maintaining those two
  already-approved projects. See "Legacy: Astro Monorepo" below.

The sections immediately below (Content integrity, Full-bleed hero sections,
General CSS gotchas, QA approach) apply to both systems — read them
regardless of which one you're working in.

## Content integrity
This system has one non-negotiable rule that overrides any request to make
a page "more impressive," in both systems above — it isn't a security rule,
so it isn't relaxed by these being pre-sale visual demos rather than
production apps: **never present something as true that isn't verified.**
It shows up in two forms:

- **Text/stats** — never fabricate testimonials, review counts, ratings,
  awards, certifications, customer counts, or results. Every copywriting
  step (the legacy `conversion-copywriting` skill, and every React
  `section-builder` agent) must write `PROOF NEEDED: <what>` or
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
actual rendered nav (`getBoundingClientRect()`, not a number copied from
another client or assumed from a "usual" nav height — logo size, link
count, and padding all shift it) so Hero + nav sum to exactly one viewport.
If the hero has a bottom decorative element that visually eats into it (a
wave divider, a gradient fade), an exact one-screen match can still read as
short once something is visually carved out of the bottom edge — add a
deliberate overshoot on top of it, sized by feel and confirmed by
re-measuring after, not a constant copied from elsewhere. Use `svh` with a
`vh` fallback (mobile browser chrome resizes `vh` but not `svh`).

In the legacy Astro system this measurement happens via a tiny `<script>`
island reading `getBoundingClientRect()`. In the React system, do the same
measurement with a `ref` + `useLayoutEffect` (see the `motion-playbook`
skill) — the math and the "measure, don't assume" rule are identical, only
the mechanism differs.

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

## General CSS gotchas (both systems)
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
  sizing), the whole chain can collapse to a few pixels — on `jonatas-hotts`
  this made the hero photo disappear entirely at all three breakpoints, with
  no visible error and nothing wrong in the CSS as written (only
  `getBoundingClientRect()` showed a 6px-wide box). Fix: once any node in a
  photo-card chain has an absolutely positioned child, give every ancestor
  up to the sized container an *explicit* `width` (not `max-width`, not
  implicit grid/flex stretch).
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

These six are plain browser-layout facts, equally true whether the markup is
`.astro` or `.tsx`. Astro/tokens.css-specific pitfalls (cascade order,
`CtaButton` prop forwarding, `data-*` dash-before-digit) live under
"Legacy: Astro Monorepo" below, since they only apply to that codebase.

## QA approach (both systems)
No permanent test framework in either system. `claude-in-chrome` has not
successfully connected once in this environment across real use — when it
doesn't, install Playwright (`npm install -D playwright && npx playwright
install chromium`) and write a throwaway script rather than guessing visual
correctness from source code. This isn't optional when scroll/motion is
involved: a real bug (scroll-reveal silently hiding ~90% of a page) was
invisible from source reading and only found by actually screenshotting the
page — see `clients/talita-lopes/project-state.md`. A visual pass alone
still isn't enough for spacing/sizing/animation claims — check
`document.body.scrollWidth - window.innerWidth === 0` at every tested
breakpoint as a cheap, general tripwire for grid/flex blowout bugs before
they're reported back by the client. Add a permanent automated
visual-regression or Lighthouse CI *pipeline* only when a specific client
need justifies it.

Type-checking differs per system: legacy Astro clients use `npm run check`
(`astro check`) at the repo root; React clients type-check as part of their
own `npm run build` (`tsc -b && vite build`) inside `react-clients/<slug>/`.

---

## React Independent-App System (primary — use for all new clients)

**Stack**: Vite + React + TypeScript, Tailwind CSS v4 (`@tailwindcss/vite`),
Framer Motion for animation. Each client is a fully independent app — its
own `package.json`, its own `npm run build` → `dist/`, no shared routing,
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
visible immediately (no `whileInView` hiding of primary content — the old
CSS scroll-reveal system was removed for exactly this reason, see the
`talita-lopes` history under "Legacy: Astro Monorepo" below); grid/row items
get continuous idle float with a per-item phase offset so they don't move in
sync; ambient glows use a large blur radius and a gradient that's fully
transparent well before its own edge; stat/emphasis text can use a
gradient-text treatment; a section whose content is inherently sequential
(a stepper, an FAQ) should let that real mechanic carry the motion instead
of decorating a static layout; every section in a page must use a
**different** mechanism from its neighbors; `useReducedMotion()` zeroes out
motion entirely under `prefers-reduced-motion: reduce`. Unlike the old CSS
system, two animations on one element (a continuous `animate` plus a
`whileHover`/`whileTap`) compose correctly in Framer Motion — the CSS
`animation`-shorthand-collision bug documented below no longer applies here.

---

## Legacy: Astro Monorepo (frozen — `talita-lopes`, `jonatas-hotts` only)

Everything in this section describes the original system. It is not
extended: no new clients are scaffolded here, and `scripts/create-client.mjs`
/ the old 18-phase pipeline exist only to maintain the two clients already
built on them.

### Stack
Astro (static output) + TypeScript + Tailwind CSS v4 (via `@tailwindcss/vite`,
no config file needed — v4 auto-detects usage). No UI framework (React/Vue) —
client pages are plain `.astro` with vanilla `<script>` islands only when a
section genuinely needs interactivity. No adapter: `npm run build` produces a
host-agnostic `dist/` static site.

### Folder map
```
CLAUDE.md                   this file
docs/
  skills-registry.md         category → skill lookup
  mcp-registry.md            tool/MCP capability → when to use
.claude/
  agents/                    legacy Astro agents + the React section-builder agent
  skills/                    project skills + the create-client workflow
templates/                   blank per-client docs (Astro legacy + React starters)
scripts/create-client.mjs        deterministic Astro client scaffold (legacy, Node built-ins only)
scripts/create-react-client.mjs  deterministic React client scaffold (primary path)
shared/design-system/tokens.css  base CSS custom properties every legacy Astro client falls back to
shared/styles/base.css      reset + fluid type + `@import "tailwindcss";` (legacy Astro only)
shared/utilities/slugify.mjs single source of truth for slug generation (used by both scaffold scripts)
shared/components/*.astro   structural-only shared components (Hero, Nav, Footer, CtaButton) — legacy Astro only
src/
  layouts/BaseLayout.astro   shared HTML shell (legacy Astro only)
  pages/index.astro          root directory of client links (legacy Astro only)
  pages/[slug].astro         routes /<slug> to clients/<slug>/src/index.astro (legacy Astro only)
clients/
  README.md                  slug rules
  <slug>/                    one per legacy Astro client — see "Client folder" below
react-clients/
  README.md                  slug rules for the independent React apps (see above)
  <slug>/                    one per React client — see "React Independent-App System" above
```

### Routing
`src/pages/[slug].astro` discovers every legacy client via
`import.meta.glob('/clients/*/src/index.astro')` — **creating
`clients/<slug>/src/index.astro` is what registers the route** at
`domain.com/<slug>`. There is no separate routing config to edit. The same
mechanism loads `clients/<slug>/src/tokens.css` (if present) and inlines it
after the shared base tokens, scoped under `[data-client="<slug>"]`, so a
client's token overrides win without any shared file changing. React clients
have no equivalent — each is its own independent app with its own build, not
a route in this glob.

**Per-client SEO metadata:** a client's `src/index.astro` can export
`pageTitle`, `pageDescription`, `pageLang`, and `pageThemeColor` (e.g.
`export const pageTitle = '...'`) — `[slug].astro` reads these and forwards
them to `BaseLayout` along with an auto-set `canonicalPath` of `/<slug>`.
All are optional (defaults: `title` falls back to the slug, `lang` to
`'en'`, no `theme-color` meta if `pageThemeColor` is unset); a client whose
page needs a non-English `<html lang>` or real `<title>`/canonical/OG/
theme-color tags must use these exports rather than writing its own
`<title>`/`<meta>` tags inline (which will either be redundant or lose to
the shared ones).

### Client folder
```
clients/<slug>/
  project-state.md            phase table + decisions log — the persistent memory across sessions
  discovery/questionnaire.md
  research/company-intelligence.md, competitor-analysis.md
  brand/brand-dna.md
  strategy/strategy.md, page-architecture.md
  copy/                        freeform — no template, varies too much per page
  design/design-direction.md, visual-research.md
  assets/moodboard/
  src/index.astro, tokens.css  the actual implementation + token overrides
  qa/post-mortem.md
```

### Maintaining an existing legacy client
No new Astro clients are created. `scripts/create-client.mjs` still exists
and works but is dormant/manual-only — the `create-client` skill no longer
calls it (that skill now runs the React pipeline above). For a maintenance
task on `talita-lopes` or `jonatas-hotts` (a copy tweak, a token/color
adjustment, a bug fix, a QA pass), use the 4 agents below directly rather
than reviving the old 18-phase orchestration.

### Agents (`.claude/agents/`)
| Agent | Role |
|---|---|
| `copywriter` | Section copy (legacy Astro clients only) |
| `ui-design` | Design tokens + visual direction (legacy Astro clients only) |
| `developer` | Astro implementation, responsive, SEO, performance (legacy Astro clients only) |
| `qa` | Technical/visual/accessibility QA (legacy Astro clients only) |
| `section-builder` | Builds one React section for a new client — see "React Independent-App System" above |

The other 6 agents this system used to have (`researcher`,
`brand-intelligence`, `strategist`, `ux-architect`, `visual-researcher`,
`cro`) have been removed — their function is now covered by the two live
interviews in the React pipeline. There is no legitimate "redo the brand
DNA/strategy" task on a frozen, already-shipped client; a live conversation
covers any real update need.

### Skills
See `docs/skills-registry.md` for the full category table (legacy skills are
marked there), and `docs/mcp-registry.md` for external tool capabilities.
Several categories are covered by already-installed global skills
(`design-taste-frontend`, `impeccable`, `mobile-native`, `animate`) rather
than duplicated here.

### Design tokens
`shared/design-system/tokens.css` defines the base variables (`--color-*`,
`--font-sans`, `--space-*`, `--radius-*`, `--max-width`). Shared components
reference only these var names — never a literal color/font — so no client
is forced to look like another. Each client overrides what it needs in its
own `src/tokens.css`.

### Motion (CSS, legacy Astro only)
`shared/styles/base.css` defines ready-to-use, zero-dependency motion
utilities (built from the `animate` skill's actual recipes, not
approximated) — reach for these instead of reinventing animation per client:
- `.enter` + `.enter-1` … `.enter-6` — mount/entrance stagger (e.g. a Hero's
  headline → subtext → CTA sequence). Load-triggered, not scroll-triggered.
- `[data-hover-lift]` — subtle hover lift + shadow on cards, gated to
  `(hover: hover) and (pointer: fine)`.
- `[data-sticky-nav]` (paired with `Nav.astro`'s `sticky` prop) — opt-in
  `position: sticky` header with a subtle backdrop-blur/shadow once
  scrolled (`.is-scrolled`, toggled by a tiny rAF-throttled scroll listener
  in `BaseLayout.astro`). This is the *only* scroll-tied effect left in the
  system — see below for why.
- All of the above fully disable under `prefers-reduced-motion: reduce`
  (not just "gentler" — zero motion for that preference).

**No content-hiding or content-appearing scroll animation.** A `.reveal`
utility (`clip-path` wipe on scroll, then a native CSS `animation-timeline`
version) was built, fixed, and rebuilt twice on this project and the client
rejected the *feel* of it twice regardless of whether it was technically
working — "parece que não carregou" the first time, "essa animação... um
lixo" the second. It's removed entirely, not just from this client but as
a pattern: **content is visible immediately, always.** Put visual ambition
into shape/layout/typography/icons/imagery instead of into scroll-triggered
reveal choreography. A low `MOTION_INTENSITY` dial from
`design-taste-frontend` still means real motion is expected — just confine
it to load-triggered entrances (`.enter`) and interaction feedback
(`[data-hover-lift]`, button press states), never to "things appearing as
you scroll." See `clients/talita-lopes/project-state.md`'s "Post-Delivery
Correction" and "Second Remap" entries for the full incident history. The
React system carries this same rule forward via Framer Motion — see
"Motion (Framer Motion)" above.

**Ship confident continuous motion on the first pass, not as a later
patch.** The Talita Lopes project took 14 rounds of client feedback to
reach a motion level the client considered acceptable — almost every
"essa parte tá muito estática" complaint was fixed with a recipe that
should just be the default, not an opt-in extra added after a complaint:
- Cards in a grid/row (bento cells, contact/social cards, pricing tiers,
  etc.) get a continuous idle float (`translateY` bob, 4-6s, ease-in-out)
  with a **different `animation-duration` and `animation-delay` per card**
  so they drift out of phase — synchronized motion across a whole grid
  reads as robotic, not alive.
- Every ambient glow (a blurred radial-gradient blob behind a photo, a
  CTA, a card) needs a **large blur radius relative to its size** (40-70px,
  not 10px) and a gradient that reaches fully transparent well before its
  own edge — a small blur on a hard-stopped gradient reads as a visible
  smudge/ring, not soft light. This was flagged by the client twice before
  being fixed both times the same way.
- Stat numbers, section leads, or other single-word/short-phrase emphasis
  can use a gradient-text treatment (`background-clip: text` with a
  2-stop gradient of the accent color) instead of a flat color — cheap,
  reads as considered.
- When a section's own primary mechanic is inherently timed or sequential
  (a numbered process, a Q&A), let the REAL mechanic carry the motion
  instead of decorating a static version of it — an auto-advancing
  stepper with a real countdown fill-bar under the active step beats a
  static 3-card row with an unrelated decorative dot traveling on its own
  track nearby. The motion should be legible as part of what the section
  *is*, not chrome bolted beside it.

**Animation property conflicts — check before adding continuous motion to
anything that already has hover/press feedback.** This exact bug shipped
three separate times on Talita Lopes (bento cards, contact/social cards, a
Hero glass card) before the pattern was recognized: `[data-hover-lift]`
and any local `:hover`/`:active` rule that sets `transform` will silently
fight a continuous `animation` on the same element, because the
`animation` shorthand property does not merge across two separate CSS
rules — whichever rule wins the cascade replaces the other's animation
*entirely*. In the worst case (an `.enter` mount-fade combined with a
later continuous-motion rule) the element gets stuck permanently invisible
(`opacity: 0`), because the mount animation that was supposed to move it
to `opacity: 1` never runs. Before adding a continuous `animation` to an
element:
1. Check whether it (or a shared utility applied to it, like
   `[data-hover-lift]`) already declares `animation` or a `transform`-based
   `:hover`/`:active` rule, or carries an `.enter` mount class.
2. If so, either move the *other* effect off `transform`/`animation`
   entirely (hover feedback → `box-shadow`/`border-color`/`filter`; press
   feedback → `filter: brightness()` instead of `transform: scale()`), or
   move the continuous animation onto a child wrapper instead of the same
   element.
3. **Verify by reading the computed style** (`getComputedStyle(el).opacity`
   / `.transform`), not by assuming the CSS as written will behave as
   intended — this is what actually caught all three instances, the bug
   was invisible from reading the source alone.
This specific pitfall is CSS-specific and does not apply to the React
system's Framer Motion usage — see "Motion (Framer Motion)" above.

**Prefer structural reinvention over decoration when a section is flagged
as static or generic.** Adding hover states, glows, or floats to an
existing card-grid-plus-text layout is a *smaller* fix than the client is
usually asking for — "essa sessão não está fazendo jus ao resto da
página" and "você só mudou detalhes" were both responses to exactly that
kind of decoration-only pass. What actually landed: a plain photo+bullet-
list "About" became a before/after contrast module; a 2-column FAQ
accordion grid became a chat-bubble thread (the FAQ *is* a Q&A, so make
the UI say that literally); a static 3-card process row became an
auto-advancing stepper. Before decorating a section, ask whether a
genuinely different composition would serve the same content — and give
neighboring sections *different* mechanisms from each other (bento grid,
carousel, chat thread, stepper, contrast panels are all already spoken
for on this project; reach for a new one before reusing one, the same way
a repeated color or font would be a tell). This rule is stack-agnostic and
applies just as much to the React system's section-builder agents.

### Astro-specific CSS pitfalls
- **`shared/design-system/tokens.css` is always inlined last** (by design —
  see Routing above, it's what lets a client's `--custom-property`
  overrides win without touching shared files). That has a side effect the
  routing mechanism doesn't call out: any plain *class-selector* rule
  inside tokens.css also always wins a same-specificity cascade tie against
  a component's own scoped `<style>` block, regardless of which one was
  meant to win, purely because of document order. On `jonatas-hotts`, a
  component-local `.caption-chip { background: dark }` lost silently to
  tokens.css's shared `.card-sticker { background: light }` (identical
  0,2,0 specificity) — the element rendered as invisible white-on-white
  text, caught only via `getComputedStyle`, not from reading the CSS. If a
  client-specific component reuses a shared sticker/card utility class but
  needs to override one of that class's own properties (not just a
  variable), co-locate the combined selector in the component's own style
  block (e.g. `.caption-chip.card-sticker { background: ... }`, which beats
  `.card-sticker` alone on specificity) rather than relying on declaration
  order across separate stylesheets to sort it out.
- **`shared/components/CtaButton.astro` (and any other shared component
  that renders a fixed template) does not forward unknown props to the
  underlying element** — Astro components only render what the template
  explicitly writes out, there's no implicit passthrough of extra
  attributes the way a plain HTML element would accept them. Wiring a
  click-driven interactive component (a toggle, a stepper) to a CTA's
  `href` by passing `data-*` attributes into `<CtaButton>` silently does
  nothing until the component spreads `...rest` onto its `<a>` — fixed
  once, on `jonatas-hotts`, by adding `const { href, variant, external,
  pulse, ...rest } = Astro.props` and `<a {...rest} href={href} ...>`,
  with `Props extends astroHTML.JSX.AnchorHTMLAttributes` so TypeScript
  doesn't reject the extra attributes. This is now safe for any client to
  rely on. Related: **a `data-*` attribute name with a dash before a
  *digit* doesn't camelCase into `dataset`** (`data-href-0` stays
  `dataset['href-0']`, inaccessible via `dataset.href0`) — only a dash
  before an ASCII letter converts, per the HTML spec. Use `data-href0`
  (no separating dash) instead of `data-href-0` when the suffix is a
  number.
- When in doubt about *any* claim involving spacing, sizing, alignment, or
  whether an animation is actually running — read the computed style
  (`getComputedStyle`, `getBoundingClientRect`) via a throwaway Playwright
  script rather than trusting a screenshot or the CSS as written. Several
  real bugs on this project (the two above, plus a flex-shrink width bug
  that squeezed one card in a row of three) were completely invisible
  visually or from reading the source, and only surfaced through direct
  measurement.

### Deployment (legacy Astro)
`astro.config.mjs` uses `output: 'static'`, no adapter — `dist/` is
deployable to any static host (Vercel, Netlify, S3+CDN, etc.) or served
path-based (`domain.com/<slug>`) behind any reverse proxy. React clients
each produce their own `dist/` the same way (no adapter, static, deployable
anywhere) — see "React Independent-App System" above.

## Commands
```
npm run dev                              # legacy Astro: local dev server
npm run build                            # legacy Astro: static build → dist/
npm run check                            # legacy Astro: astro check (types)
npm run create-client -- "Client Name"   # legacy Astro: scaffold a new client folder (dormant — do not use for new clients)
npm run create-react-client -- "Client Name"   # primary: scaffold a new independent React client app
```
Per-React-client commands (run inside `react-clients/<slug>/`):
```
npm run dev       # local dev server
npm run build     # type-check + static build → dist/
npm run preview   # serve the built dist/ locally, for the Playwright QA pass
```
