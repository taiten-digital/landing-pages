# Landing Page OS

A reusable system for producing independent client landing pages on a shared
technical foundation. Read this file before starting any client work — it's
the complete map, so a fresh session doesn't need to re-derive the
architecture.

## Stack
Astro (static output) + TypeScript + Tailwind CSS v4 (via `@tailwindcss/vite`,
no config file needed — v4 auto-detects usage). No UI framework (React/Vue) —
client pages are plain `.astro` with vanilla `<script>` islands only when a
section genuinely needs interactivity. No adapter: `npm run build` produces a
host-agnostic `dist/` static site.

## Folder map
```
CLAUDE.md                   this file
docs/
  skills-registry.md         category → skill lookup
  mcp-registry.md            tool/MCP capability → when to use
.claude/
  agents/                    10 specialist subagents (see Agents below)
  skills/                    project skills + the create-client workflow
templates/                   blank per-client docs, copied by the scaffold script
scripts/create-client.mjs    deterministic client scaffold (Node built-ins only)
shared/
  design-system/tokens.css   base CSS custom properties every client falls back to
  styles/base.css            reset + fluid type + `@import "tailwindcss";`
  utilities/slugify.mjs      single source of truth for slug generation
  components/*.astro         structural-only shared components (Hero, Nav, Footer, CtaButton)
src/
  layouts/BaseLayout.astro   shared HTML shell
  pages/index.astro          root directory of client links
  pages/[slug].astro         routes /<slug> to clients/<slug>/src/index.astro
clients/
  README.md                  slug rules
  <slug>/                    one per client — see "Client folder" below
```

## Routing
`src/pages/[slug].astro` discovers every client via
`import.meta.glob('/clients/*/src/index.astro')` — **creating
`clients/<slug>/src/index.astro` is what registers the route** at
`domain.com/<slug>`. There is no separate routing config to edit. The same
mechanism loads `clients/<slug>/src/tokens.css` (if present) and inlines it
after the shared base tokens, scoped under `[data-client="<slug>"]`, so a
client's token overrides win without any shared file changing.

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

## Client folder
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

## Adding a new client
Run `/create-client` (or ask Claude to create a landing page for `<Company>`)
— this loads `.claude/skills/create-client/SKILL.md`, the full 18-phase
lifecycle playbook. It begins with `npm run create-client -- "Client Name"`
(the deterministic scaffold), then hands off to the specialist agents below
phase by phase, updating `project-state.md` throughout.

## Orchestrator
There is no "Orchestrator" subagent. Subagents run in fresh, isolated context
per invocation and can't hold state across a 15+ phase pipeline — the **main
Claude Code session**, driving `create-client/SKILL.md` and reading/writing
each client's `project-state.md`, is the orchestrator. This is a deliberate
simplification, not an omission.

## Agents (`.claude/agents/`)
| Agent | Role |
|---|---|
| `researcher` | Company + competitor research |
| `brand-intelligence` | Brand DNA extraction |
| `strategist` | Positioning, messaging hierarchy, page-length rationale |
| `ux-architect` | Minimum-necessary-page audit + information architecture |
| `copywriter` | Section copy from strategy + real customer language |
| `visual-researcher` | Reference gathering (client/competitor/inspiration) |
| `ui-design` | Design tokens + visual direction |
| `developer` | Astro implementation, responsive, SEO, performance |
| `qa` | Technical/visual/accessibility QA |
| `cro` | Conversion-focused review |

## Skills
See `docs/skills-registry.md` for the full category table, and
`docs/mcp-registry.md` for external tool capabilities (web search, browser
automation, Figma, Drive). Several categories are covered by already-installed
global skills (`design-taste-frontend`, `impeccable`, `mobile-native`,
`animate`) rather than duplicated here.

## Design tokens
`shared/design-system/tokens.css` defines the base variables (`--color-*`,
`--font-sans`, `--space-*`, `--radius-*`, `--max-width`). Shared components
reference only these var names — never a literal color/font — so no client
is forced to look like another. Each client overrides what it needs in its
own `src/tokens.css`.

## Motion
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
Correction" and "Second Remap" entries for the full incident history.

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
a repeated color or font would be a tell).

## Content integrity
This system has one non-negotiable rule that overrides any request to make
a page "more impressive": **never present something as true that isn't
verified.** It shows up in two forms:

- **Text/stats** — never fabricate testimonials, review counts, ratings,
  awards, certifications, customer counts, or results. This is already
  enforced where copy is written (`conversion-copywriting`'s explicit
  "write PROOF NEEDED inline instead of inventing it" rule) — the point
  here is that the rule doesn't stop at the copy phase. A later round
  asking to "state how many Google reviews exist and add a rating" still
  can't be satisfied by inventing a number if it can't be verified; ship
  the honest, already-established phrasing instead ("Avaliação verificada
  no Google" with no specific count), and say plainly to the client which
  part of the request couldn't be done and why.
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

## Common CSS pitfalls (read before debugging a "why is this broken" mystery)
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
- **Two separate CSS rules setting `animation` on the same element don't
  merge** — the later/higher-specificity one wins outright and silently
  drops the other's animation. See the Motion section above for the exact
  failure mode this caused (an element permanently stuck at `opacity: 0`).
- When in doubt about *any* claim involving spacing, sizing, alignment, or
  whether an animation is actually running — read the computed style
  (`getComputedStyle`, `getBoundingClientRect`) via a throwaway Playwright
  script rather than trusting a screenshot or the CSS as written. Several
  real bugs on this project (the two above, plus a flex-shrink width bug
  that squeezed one card in a row of three) were completely invisible
  visually or from reading the source, and only surfaced through direct
  measurement.

## QA approach
No permanent test framework. `npm run check` (`astro check`) is the
type/build gate; the `qa-checklist` skill drives a manual, checklist-based
visual pass via `claude-in-chrome` at mobile/tablet/desktop breakpoints.
`claude-in-chrome` has not successfully connected once in this environment
across real use — when it doesn't, install Playwright
(`npm install -D playwright && npx playwright install chromium`) and write a
throwaway script (see `docs/mcp-registry.md`) rather than guessing visual
correctness from source code. This isn't optional when scroll/motion is
involved: a real bug (scroll-reveal silently hiding ~90% of a page) was
invisible from source reading and only found by actually screenshotting the
page — see `clients/talita-lopes/project-state.md`. A visual pass alone
still isn't enough for spacing/sizing/animation claims — see "Common CSS
pitfalls" above; check `document.body.scrollWidth - window.innerWidth === 0`
at every tested breakpoint as a cheap, general tripwire for grid/flex
blowout bugs before they're reported back by the client. Add a permanent
automated visual-regression or Lighthouse CI *pipeline* only when a specific
client need justifies it.

## Deployment
`astro.config.mjs` uses `output: 'static'`, no adapter — `dist/` is
deployable to any static host (Vercel, Netlify, S3+CDN, etc.) or served
path-based (`domain.com/<slug>`) behind any reverse proxy. No CI/deploy
config is written until a specific platform is chosen.

## Commands
```
npm run dev                              # local dev server
npm run build                            # static build → dist/
npm run check                            # astro check (types)
npm run create-client -- "Client Name"   # scaffold a new client folder
```
