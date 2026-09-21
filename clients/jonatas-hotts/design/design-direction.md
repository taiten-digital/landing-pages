# Design Direction — Jonatas Hotts

## Design Read

**Reading this as:** a local-service landing page (personal training,
Londrina, PR) for a low-to-medium-sophistication, mixed-organic/social
audience, with a casual, energetic, demonstration-led voice, leaning toward
a bespoke native-CSS system built fresh (no design-system package fits a
one-person local-trainer brand, and there is no existing palette/type to
extract from — confirmed twice, in brand-dna.md and again in
visual-research.md, since no browser access ever reached the real
Instagram feed).

Category: local service. Density: conversion-heavy but low-complexity — a
single WhatsApp CTA, no pricing, no proof stack, five sections total
(strategy.md). "Energetic" here has to mean something specific to *this*
brand, not a generic "gym site" mood: brand-dna.md's verbal DNA is
colloquial, funny-but-competent, meme-format-adjacent (Portuguese
text-overlay captions on training clips) — closer to "a guy who'll show
you the correct squat depth on camera and crack a joke about it" than to
either a polished fitness-app aesthetic or a stereotypical black/red/neon
gym flyer. That's the target feel: casual, warm, a little cheeky, visibly
handmade by one real person, not an agency or a national franchise.

**Why this reads differently from Talita Lopes** (same repo, same shared
component layer, must not read as the same system reskinned): that
project is a mid-formal, credential-led, 50+ health-adjacent brand — calm
natural-green palette, editorial serif-adjacent sans pairing
(Bricolage Grotesque/Hanken Grotesk), sharp-container-vs-round-pill-CTA
shape contrast, soft blurred elevation shadows on hover. Jonatas's brand
DNA is explicitly, verifiably the opposite register (brand-dna.md section
6 places him "casual," "playful/approachable," "individual-practitioner,"
against Talita Lopes's "mid-formal," directly instructing "don't default
to the same register"). This document keeps every token, shape, and hover
mechanic separate from that project's on purpose — see the comparison
table under Shape Language below.

Dials, reasoned explicitly per `design-taste-frontend`'s framework
(baseline for a local-service landing page is 7/6/4; every deviation below
has a stated reason, not a silent default):

- **`DESIGN_VARIANCE: 7`** — Above the generic local-service baseline
  because the brand voice itself calls for a bit of visual mischief (the
  sticker/callout shape language below), but not pushed to 9-10 because
  the page is short and low-complexity (five sections, one offer, no
  proof stack) — asymmetric chaos would fight the page's actual job,
  which is getting a cold visitor to a WhatsApp tap in about one screen's
  worth of attention (strategy.md).
- **`MOTION_INTENSITY: 8`** — Explicit steer from visual-research.md
  itself ("motion should lean toward the energetic end of this system's
  MOTION_INTENSITY dial ... to match the energetic, informal,
  demonstration-led brand read"). Not 9-10: root CLAUDE.md's hard,
  incident-derived rule against any scroll-triggered content-hiding
  animation caps how far "energetic" can go structurally — the energy
  has to live entirely in load-triggered entrances, continuous idle
  motion, and interaction feedback, never in "things appearing as you
  scroll."
- **`VISUAL_DENSITY: 4`** — Same reasoning as Talita Lopes's pass: this
  is a short, single-CTA, low-friction conversion page (strategy.md's
  explicit "Short" page-length rationale), so boldness has to live in
  color/shape/type/motion, not in cramming more content per section.
  Slightly lower than Talita's 5 because Jonatas's page is genuinely
  thinner in content (no testimonials section, no differentiators grid,
  no services bento — five sections, most of them short).

## Palette — Two Accents, Two Explicit Jobs, No New Hue Invented Beyond Them

Per the Duolingo-method reference already flagged in visual-research.md:
a casual/playful brand still runs on strict role-based color rules, not
"energetic" meaning scattered color everywhere. Every color below has one
stated job and a stated *don't*.

| Token | Value | Role (the ONE job) | Don't |
|---|---|---|---|
| `--color-accent` | `#25d366` | **The WhatsApp CTA, and only the CTA.** Button fills, the nav CTA, the CTA's built-in pulse/glow. Matches the category-wide local convention (visual-research.md: "WhatsApp-styled CTA convention is universal across every local competitor") and Jonatas's own existing WhatsApp-first behavior. | Never a section background, never a decorative highlight, never an icon color, never used "because it's the brand green" outside the CTA itself. |
| `--color-accent-fg` | `#14110d` | Text on the CTA green. Dark-on-green computes to roughly 10.6:1 contrast — white-on-this-green is roughly 2:1 and fails AA outright, so this is a deliberate inversion, not an oversight (same logic Talita Lopes's pass used for its own accent, computed fresh here for this different green). | — |
| `--color-energy` | `#ffb020` | **The actual "energetic/casual" brand color.** Headline emphasis (gradient-text on one word/short phrase), icon strokes, card hover glow/border, the sticker-badge accents, the hero ambient glow blob. This is the color a visitor will associate with the brand's personality — not the CTA green, which stays narrowly functional. | Never the CTA fill (that would blur the WhatsApp affordance visitors already recognize), never a large background block, never alone as small body-text color (fails AA on white — pair with `--color-energy-deep` in the gradient-text utility, or use it on the dark charcoal section where contrast is high). |
| `--color-energy-deep` | `#c1440e` | Second stop in the gradient-text utility (`.text-gradient-energy`), and available as a border/icon color on light backgrounds where `--color-energy` alone would under-contrast. | — |
| `--color-charcoal` | `#1c1815` | Ink color on light sections AND the background of the one full dark section (same "double duty" technique Talita Lopes's `--color-forest` uses — a sound, reusable CSS pattern, not a stolen look — but a warm charcoal hue with zero green in it, so it never reads as the same color). | — |
| `--color-bg` | `#ffffff` | Primary section background. | — |
| `--color-sand` | `#fff1de` | Alternating light-section tint (this brand's answer to Talita's sage tint — warm-hued instead of green-hued, used the same sparing way: one or two alternating sections, not the whole page). | — |
| `--color-muted` | `color-mix(in srgb, var(--color-charcoal) 60%, white)` | Secondary/caption text. | — |
| `--color-border` | `color-mix(in srgb, var(--color-charcoal) 14%, white)` | Hairline borders where the thick sticker border (below) would be too heavy (e.g. dividers inside the nav's mobile dropdown). | — |

**On saturation:** `#25d366` and `#ffb020` are both fairly saturated,
above `design-taste-frontend`'s "under 80% by default" guidance. This is
a deliberate, brief-driven override, not an oversight: the CTA green is
fixed by category convention (every local competitor and Jonatas's own
existing behavior already use a saturated WhatsApp green — desaturating
it would make the CTA read as *less* legible as "the WhatsApp button,"
the opposite of the goal), and the amber is the brand's one real
personality color for a client whose own content is genuinely loud
(meme-format captions, direct address, "approachable humor"). Both are
still role-locked to a short, explicit list of uses each — the saturation
is intentional, the *scatter* that would actually be the AI tell is what's
being avoided.

**Never reused from Talita Lopes's project:** no green in the `#2f9e52`
family, no sage/cream near-whites, no `color-mix()` percentages copied
verbatim (recomputed fresh against this palette's own charcoal).

## Typography — A Different Pairing, Different Register

- **Display/headlines:** Archivo Black (single static 900 weight), self-
  hosted via `@fontsource/archivo-black`.
- **Body:** Manrope (variable), self-hosted via
  `@fontsource-variable/manrope`.

Both are **new devDependencies for the developer phase**:

```
npm install @fontsource/archivo-black @fontsource-variable/manrope
```

Import once (e.g. in `BaseLayout.astro` or this client's `index.astro`):

```js
import '@fontsource/archivo-black';
import '@fontsource-variable/manrope';
```

**Why this pairing:** Archivo Black is a blunt, geometric, industrial-grip
display face — chunky and confident the way a hand-written meme caption
or a locker-room whiteboard is confident, not the way an editorial
magazine headline is confident. It has none of Bricolage Grotesque's
rounder, softer character (Talita Lopes's display face), so the two
brands' headlines are unmistakably different at a glance even before any
color is visible. Manrope pairs with it as a friendly, rounded-terminal
grotesque for body copy — casual and easy to read on a phone (this
audience is mostly mobile per strategy.md's traffic context) without
Hanken Grotesk's more clinical, neutral character. Neither face is used
anywhere in this repo yet.

Type scale (`tokens.css`): `h1` ceiling `clamp(2.5rem, 1.9rem + 3.2vw,
4.25rem)`, tight line-height (1.02) and a small negative tracking
(-0.01em) — Archivo Black is already visually heavy at any size, so the
scale stays a notch below Talita Lopes's 4.75rem ceiling rather than
competing with it for "biggest headline in the repo." Body text is
1.0625rem/1.6, a small bump over the shared 16px default for comfortable
mobile reading, independent of Talita's 50+-audience 1.125rem/1.65 choice
(different reasoning, coincidentally close numbers — not copied).

## Shape Language — One Rule Everywhere, the "Sticker" Device

Per `design-taste-frontend`'s Shape Consistency Lock: one corner-radius
system, applied consistently, no mixing without a documented rule. The
documented rule here is deliberately the *inverse* of Talita Lopes's:

| | Talita Lopes | Jonatas Hotts |
|---|---|---|
| Containers/cards | Sharp (`2px`/`6px` radius) | **Chunky rounded** (`10px`/`16px`/`28px` — `--radius-sm`/`-md`/`-lg`) |
| CTA shape | Fully round pill (the one soft shape, contrast device) | **Same chunky radius as everything else** (`--radius-md`) — no pill token defined for this client at all |
| Elevation | Soft blurred hover-lift shadow (`0 8px 20px -8px`, `[data-hover-lift]`) | **Flat, hard-edged offset shadow, zero blur** (`5px 5px 0 0`, growing to `8px 8px 0 0` on hover) — a graphic "sticker/meme-caption" device, not simulated depth |
| Border | None as a design element | **Thick 3px solid outline** (`--border-sticker`) on every card and the primary CTA |

The sticker device (thick outline + flat offset shadow, no blur) is a
direct, deliberate echo of the one visual element brand-dna.md and
visual-research.md both actually document from Jonatas's real content:
bright, casual text-overlay caption boxes layered over his training
clips. Rather than inventing an unrelated "energetic" shape trend, this
reuses the one shape idea that's genuinely his.

**Why not Talita's sharp-vs-pill contrast trick:** that specific device
(sharp containers, one soft pill CTA standing out against them) is now a
signature of this repo's other client. Doing "everything is chunky and
rounded including the CTA, personality lives in the outline+shadow
instead" is a structurally different answer to the same brief ("give the
CTA and cards personality without looking templated"), not a variation on
Talita's answer.

CTA gets the sticker border/shadow via a client-scoped override on
`shared/components/CtaButton.astro`'s existing `.cta-button--primary`
class (`tokens.css`), layered on top of (not replacing) that component's
own hover glow — the two apply at different times (base state vs. hover
state) so there's no shorthand conflict. `shared/components/Nav.astro`'s
own CTA (`.nav-cta`) is self-contained CSS per that file's own comment
and doesn't pick up the sticker treatment automatically — flagged as an
open item below rather than solved here.

## Layout Notes

Section skeleton follows strategy.md's messaging hierarchy directly (no
IA changes proposed here):

1. **Hero** — who he is, the core promise ("meets you where you are, in
   person or online"), primary CTA immediately visible.
2. **Who this is for / what you get** — general-fitness positioning +
   in-person vs. online explained. Exactly **two** cards (in-person /
   online) — per `design-taste-frontend`'s bento-cell-count rule, two
   real items get two cells, not a padded three-card row. Use the sticker
   card treatment on both, with the idle-float utility on each (see
   Motion) so the section doesn't read static despite having only two
   elements.
3. **What it's like to train with him** — tone/voice-led, real
   demonstration photo/video if the client supplies it (per strategy.md
   and visual-research.md, this is unconfirmed — see Open Items). If no
   real asset arrives, this section leans on typography and the
   `.text-gradient-energy` treatment on one or two emphasis phrases
   rather than a stock "trainer with client" photo, which the
   content-integrity rule rules out anyway (no stock photo may stand in
   for Jonatas or a specific real client).
4. **How it starts** — plain description of the assessment-first
   process. Strategy.md doesn't describe this as a numbered/step
   mechanic, and inventing a stepper component for content that isn't
   actually sequential-and-timed would be exactly the kind of
   "decoration bolted beside the content" root CLAUDE.md's motion
   section warns against — keep this as a short paragraph + CTA, not a
   forced stepper.
5. **Contact / final CTA** — WhatsApp CTA, plus the faith-line aside
   (brand-dna.md: present, tasteful, non-load-bearing — a small footer/
   about line, not a headline or repeated motif).

Per `design-taste-frontend`'s Section-Layout-Repetition rule, a
five-section page only needs roughly 2-3 distinct layout families to
clear "no 3+ consecutive sections share a layout family" — Hero (full-
bleed/color-block), a two-cell card row (section 2), a text-led section
(3), a short text+CTA section (4), and a contact block (5) already
satisfy that without inventing structure the content doesn't call for.

**Hero background:** no confirmed real photo/video asset exists yet
(visual-research.md flags this explicitly as unresolved). Two paths,
decided at implementation once assets are known:
- **If the client supplies a real, landscape-oriented gym-floor/training
  clip or photo:** use it full-bleed per root CLAUDE.md's full-bleed hero
  rules (`min-height: calc(100svh - <measured nav height>)`, measured on
  this client's actual rendered `Nav.astro`, not assumed). Match
  orientation before selecting: a wide, short hero box needs a photo
  close to that same wide aspect ratio so `object-fit: cover` only trims
  a modest amount off one axis — do not force a portrait-oriented clip
  into this hero shape (see CLAUDE.md's documented three-swap incident on
  the prior client).
- **If no real asset is available by implementation:** a bold color-block
  hero (white or `--color-sand` background, oversized Archivo Black
  headline, the `--glow-energy` ambient blob behind the CTA) — never a
  generic stock photo of an unidentified trainer standing in for Jonatas,
  per this project's content-integrity rule.

## Motion

`MOTION_INTENSITY: 8`. Reuse `shared/styles/base.css`'s existing
utilities rather than reinventing them, plus the two small additions in
`tokens.css`:

- **Hero entrance:** `.enter`/`.enter-1`.. `.enter-6` mount-stagger,
  unchanged from the shared recipe — eyebrow-or-none → h1 → subtext →
  CTA.
- **Interactive feedback:** `CtaButton`'s existing hover
  (translateY + accent-tinted glow) is unchanged and still fires
  correctly, since the sticker border/shadow added in `tokens.css` only
  touches the *base* state, not the `:hover` state.
- **Continuous idle motion on repeated cards** (the two format cards in
  section 2, and any small icon-tile row elsewhere): `.idle-float`
  utility in `tokens.css`, a gentle `translateY` + slight rotate "wiggle"
  bob (4-6s range, `ease-in-out`), each card given its own
  `--float-duration`/`--float-delay` inline so a row drifts out of phase
  rather than moving in robotic unison, per root CLAUDE.md's explicit
  rule.
- **The documented animation-conflict bug, pre-empted here rather than
  discovered after shipping (root CLAUDE.md flags this exact failure
  mode as having shipped three separate times on Talita Lopes):**
  `.idle-float` sets `animation`, so it must never land on the same
  element as `.enter` (also sets `animation`) or as a transform-based
  `:hover` rule — whichever rule wins the cascade silently drops the
  other's animation entirely, and in the worst case leaves an element
  permanently at `opacity: 0`. Concretely for this client's card
  markup: **`.enter` goes on the card's outer wrapper** (one-time mount
  fade), **`.idle-float` goes on an inner child element** (continuous
  bob), and **hover feedback for the card uses `.card-sticker`'s
  box-shadow/border-color hover rule** (already defined in `tokens.css`,
  not `[data-hover-lift]`, which is transform-based) — three different
  mechanisms on two different elements, none of them fighting over the
  same `transform`/`animation` property on the same node. Verify by
  reading `getComputedStyle` on the actual rendered card at
  implementation time, not by assuming the CSS as written behaves as
  intended, per root CLAUDE.md's own standing instruction.
- **Ambient glow (hero, behind the CTA/photo):** `--glow-energy` token,
  applied via a blurred pseudo-element (`filter: blur(56px)` or larger —
  root CLAUDE.md's rule: 40-70px blur radius relative to the blob's size,
  gradient fully transparent well before its own edge) so it reads as
  soft light, not a hard-stopped color smudge.
- **Gradient-text emphasis:** `.text-gradient-energy` utility, used on
  one word or short phrase per section at most (a section lead, a short
  stat-like phrase if strategy/copy ever states one) — restrained per the
  Duolingo-method role discipline above, not applied to every headline.
- **No scroll-triggered reveal of any kind.** Consistent with root
  CLAUDE.md's project-wide, incident-derived rule: content is visible
  immediately on this page, always. All motion above is load-triggered
  or interaction-triggered, never scroll-position-gated.
- **Reduced motion:** `.idle-float` and the shared `.enter`/`[data-hover-
  lift]` utilities all already collapse to a static state under
  `prefers-reduced-motion: reduce` (see `tokens.css` and
  `shared/styles/base.css`).

## Reference Moodboard

- **Client asset (real, use if supplied):** Jonatas's own Instagram
  content — candid gym-floor demonstration footage, close-ups on form,
  white/bright casual text-overlay captions. Described only via WebFetch
  text summaries so far (visual-research.md), not pixel-verified — this
  design direction is built from the *tone* those descriptions convey
  (casual, demonstration-led, meme-adjacent), not from any extracted hex/
  type value, and the sticker shape language is this document's concrete
  translation of the text-overlay-caption device into a reusable UI
  pattern. Request real exported clips/photos directly from the client
  before implementation locks any imagery.
- **Never reuse as source imagery or layout (competitor references, per
  visual-research.md and moodboard/references.md):** Talita Lopes's own
  site (direct local rival on top of being a different client of this
  same studio — icon-grid, no-photography layout, explicitly avoided);
  Vêneto Personal (bright high-contrast flyer-style local convention,
  structural reference only, not reused); Treino Ninja and Consultoria
  Personal (national online-coaching visual grammar — dark
  proof-stack backgrounds, before/after photography, star-rating and
  trust badges — entirely off-limits, Jonatas has no verified proof to
  back any of it).
- **Inspiration (structure/rigor only, not a source of assets):**
  Duolingo's design system (via styles.refero.design) — the "one accent,
  one explicit job" method applied above is this document's direct
  application of that reference; no Duolingo hue or typeface is used
  anywhere in this palette.

## Copy-Adjacent Guardrails

Copy hasn't been written yet (project-state.md: phase 8 pending). Noting
here so the copywriter phase and this direction stay compatible: one
CTA-intent label used consistently ("Agendar avaliação" per strategy.md's
Primary CTA section, not a rotating set of synonyms), no fabricated
stats/testimonials/certifications (content-integrity rule), faith-line
kept to one small aside per brand-dna.md's explicit judgment. No em-dash
anywhere on the page (hyphens only) — same standing convention as this
system's other client, applied here too rather than left unstated.

## Taste Pass (`design-taste-frontend`)

Ran `design-taste-frontend` against this document and `tokens.css` (no
rendered markup yet — implementation hasn't landed; this gates the
*direction* before developer handoff, same scope as the equivalent pass
on Talita Lopes's design-direction.md). Stack context: Astro + native CSS
custom properties, so the skill's React/Tailwind/Motion-library-specific
sections (3.A-3.B, 5.A-5.D component skeletons, Section 6's Next.js-
specific items) don't apply directly; evaluated against the sections that
do — brief inference, the three dials, and the parts of the Pre-Flight
Check with real signal at this phase.

**Design Read (0.B), restated and confirmed:** local-service landing page,
low-to-medium-sophistication mixed-organic/social audience, casual/
energetic/meme-adjacent voice, bespoke native-CSS system (no package fits
a one-person local-trainer brand). Matches the brief. No clarifying
question needed — brand-dna.md and visual-research.md already resolve the
one real ambiguity (how "energetic" translates visually for *this*
specific brand, not a generic gym) explicitly.

**Dials confirmed reasoned, not defaulted:** `DESIGN_VARIANCE 7` /
`MOTION_INTENSITY 8` / `VISUAL_DENSITY 4`, each justified against the
7/6/4 local-service baseline with a specific reason tied to strategy.md
or visual-research.md, not silently inherited.

**Redesign mode:** N/A, correctly — greenfield. There's no existing
Jonatas site or prior version of this client's page to preserve or
overhaul; Section 11's protocol doesn't apply.

**Targeted Pre-Flight Check** (full matrix isn't uniformly applicable to
a not-yet-implemented token/direction document; items below are the ones
with real signal at this phase):

- Em-dash ban (9.G): **Pass.** Copy-Adjacent Guardrails states the
  site-wide ban explicitly, and this document practices it too (no
  em-dash used anywhere in its own prose).
- Color Consistency Lock / one-accent-one-job (4.2): **Pass.** Two
  accents total, each with one stated job and an explicit "don't" list
  (Palette table above) — the CTA green never leaks into decoration, the
  energy amber never becomes a second CTA color.
- Premium-Consumer Palette Ban (4.2): **N/A**, not a premium-consumer
  brief — worth noting the palette independently avoids the banned
  beige/brass/oxblood/espresso family anyway (charcoal here is warm but
  not espresso-toned, and there's no beige background anywhere).
- Shape Consistency Lock (4.4): **Pass.** One documented rule (chunky
  radius everywhere including the CTA, personality via thick
  outline+hard offset shadow instead of a pill-vs-sharp contrast trick),
  applied consistently, with the one intentional exception (nav CTA not
  picking up the sticker treatment) named as an open item rather than
  silently inconsistent.
- Button Contrast Check (4.5): **Pass.** `--color-accent-fg` computed at
  roughly 10.6:1 on the CTA green, with the rejected white-on-green
  alternative (roughly 2:1) named and ruled out directly in this
  document and in the token file's own comment.
- Serif Discipline (4.1): **Pass/N/A.** Archivo Black + Manrope, both
  sans — not Fraunces, not Instrument_Serif, and not a serif pairing at
  all, so the "creative brief defaults to serif" tell doesn't apply here.
- Hero Layout Discipline (4.7): **Deferred to developer phase, not a
  fail.** This document specifies the hero's *background* strategy
  (real asset vs. color-block fallback) and the entrance motion, but the
  actual headline/subtext word counts and CTA placement depend on copy
  that doesn't exist yet (phase 8 pending) — the developer phase must
  apply the 2-line headline / 20-word subtext / CTA-visible-without-
  scroll rules once real copy lands, not assume this document already
  cleared them.
- Eyebrow Restraint (4.7): **Pass by construction.** A five-section page
  caps out at roughly one eyebrow per the stated ceiling; this direction
  doesn't propose section-number eyebrows or micro-meta anywhere.
- No Duplicate CTA Intent (4.5): **Pass.** One CTA-intent label
  ("Agendar avaliação") stated as the only one used site-wide, per
  strategy.md's own explicit "no secondary CTA is needed or justified."
- Zigzag Alternation Cap / Section-Layout-Repetition (4.7): **Pass.** Five
  distinct-enough layout families across five sections (color-block
  hero, two-cell sticker-card row, text-led, text+CTA, contact block) —
  no layout family repeats three times in a row, and there's no
  padded-to-three card grid anywhere.
- Bento Cell Count (4.7): **Pass.** Section 2's two real content items
  (in-person/online) get exactly two cells, not padded to three.
- Real Images, No Fake Screenshots (4.8): **Pass, with an open
  dependency.** No div-based fake UI anywhere in this brief; real
  photography is preferred throughout, and the fallback path (color-
  block hero, no stock photo standing in for Jonatas) is specified for
  the case where no real asset arrives, rather than defaulting to a
  generic trainer stock photo that the content-integrity rule would
  reject anyway.
- Motion Motivated / "motion claimed = motion shown" (5): **Pass.** Every
  motion element states its one-sentence job (entrance = orientation on
  load, idle-float = keeps a two-card section from reading static,
  ambient glow = brand-personality light source, gradient-text = one
  restrained emphasis device) and the animation-conflict section walks
  through the actual failure mode and its fix concretely, including
  which class goes on which DOM node.
- `window.addEventListener('scroll')` ban / no scroll-triggered reveal
  (5.D and root CLAUDE.md's own stronger project-wide rule): **Pass.**
  Explicitly stated twice (Motion section here, and the project-wide
  rule it's inherited from) — no scroll-position-gated visibility
  anywhere in this direction.
- Reduced Motion (6.B): **Pass.** `.idle-float`'s reduced-motion
  fallback is defined directly in `tokens.css`; the shared `.enter`/
  `[data-hover-lift]` utilities already handle their own.
- Dark mode / `prefers-color-scheme` (6.C): **N/A by project
  convention, not a gap** — same as every other client in this repo
  (fixed-brand-palette marketing page, no user-facing theme toggle).
- Navigation (4.7): **N/A, out of scope for this document** — `Nav.astro`
  is an existing shared component this direction only touches via
  `--font-display`/token cascade, not restructured here.

**Verdict: pass, with one developer-phase advisory and one open
dependency logged above** (hero copy must still be checked against the
2-line/20-word/CTA-visible rules once copywriting lands, since this
document precedes that phase; the nav CTA's sticker treatment is an
intentional scope decision, not an oversight, flagged for the developer
phase to revisit if it reads inconsistent in context). No em-dash, no
AI-tell palette/type defaults, no duplicate-CTA-intent, no fake-screenshot,
and no motion-without-purpose findings anywhere in the document.

## Open Items — Not Resolved Here

1. **Real Jonatas photo/video assets are unconfirmed** (visual-research.md
   flags this explicitly). This document specifies both the "if supplied"
   and "if not" hero/section-3 treatment, but doesn't assume either — the
   developer phase needs to check with the client before locking imagery.
2. **Archivo Black / Manrope Variable are not yet installed** — developer
   phase must add `@fontsource/archivo-black` and
   `@fontsource-variable/manrope` as devDependencies and import them;
   this phase only specifies the token/family values assuming
   availability.
3. **Nav's own CTA (`Nav.astro`'s `.nav-cta`) doesn't inherit the sticker
   border/shadow** applied to `CtaButton`'s primary variant, since it's
   deliberately self-contained CSS per that file's own comment. A minor,
   intentional scope decision (avoids forking shared component CSS for a
   small nav-bar affordance) rather than an oversight — flagged for the
   developer phase to add if it reads inconsistent once rendered, not
   resolved here.
4. **Hero headline/subtext word counts can't be checked against
   `design-taste-frontend`'s hard layout-discipline rules yet** — copy
   phase (project-state.md phase 8) is still pending. The developer phase
   must re-verify the 2-line headline / 20-word subtext / CTA-visible-
   without-scroll rules once real copy exists, not assume this document
   already cleared them.
5. **`--float-duration`/`--float-delay` values in `.idle-float`'s default
   fallback (`5s`/`0s`) are a starting point** — the developer phase
   should assign genuinely different values per card (e.g. `4.6s`/`0s`
   and `5.4s`/`0.3s` for a two-card row) rather than leaving both cards
   on the class default, which would defeat the out-of-phase intent
   stated in the Motion section.
6. All open items already logged in `project-state.md` (CREF
   confirmation, pricing, testimonials, faith-line prominence, dual-offer
   differentiation) are unchanged by this design-only pass and remain
   outstanding.
