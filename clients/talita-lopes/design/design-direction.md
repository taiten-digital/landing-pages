# Design Direction — Talita Lopes

> **This version supersedes the prior design-direction.md entirely.** The
> previous pass guessed an unverified teal palette (`#0f766e`) from a
> markdown/WebFetch-based read of the client's reference site and flagged it
> explicitly as "not pixel-verified." The client rejected the resulting page
> as generic/boxy and separately demanded, in the same round, that the
> rebuild be a **full rebrand** — bold, innovative, "invente muito" — not an
> incremental tweak of that shipped page. This document does both corrections
> at once: it locks the *real* palette (verified this session via Playwright
> computed-style extraction directly against
> https://landing-pages-five-silk.vercel.app/, not WebFetch/markdown
> guessing) and moves typography, shape, and layout deliberately away from
> both that reference site and the previous, too-conservative build.

## Design Read

**Reading this as:** a full rebrand for a personal-training service serving
a 50+, health-adjacent audience — but "trust-sensitive" no longer means
"visually timid." The client has now explicitly rejected timid twice (once
by comparing the previous shipped page unfavorably to a livelier prior
version, once by demanding "invente muito" for this rebuild). The brief is:
confident, natural, unmistakably not a template — while keeping the verbal
DNA's patience and credential-first honesty intact. Boldness here lives in
composition, scale, and shape contrast, not in loud color (the palette
itself is a calm, natural green system) or in aggressive sales language
(strategy.md's tone resolution — gentle, listens-and-adapts — is unchanged).

Dials (per `design-taste-frontend`'s framework, **explicit client override**
from the generic landing-page baseline of 8/6/4 and a hard correction from
this project's own prior, too-conservative 4/3/4):

- `DESIGN_VARIANCE: 8` — explicit jump, ordered directly by the client's
  rejection of the previous build as generic/boxy. Justifies: an asymmetric
  bento grid for services (not 3 equal cards), a horizontal scroll-snap
  testimonial strip (not a 3-column grid), a light hero (an inversion of the
  reference site's dark hero), varied shape treatment per section, and a
  bolder, larger display-type scale than the previous pass shipped.
- `MOTION_INTENSITY: 7` — **not 9-10.** Capped below the ceiling because
  primary content must never be hidden behind scroll-triggered JS reveal —
  a hard-won constraint from this same project's own incident (see
  `project-state.md`'s "Second Post-Delivery Correction": an
  `IntersectionObserver`-based reveal silently broke and left the entire
  page below the Hero permanently blank in production). 7 gets real,
  noticeable motion — mount-stagger entrances, hover/press feedback, two new
  native-CSS scroll-driven decorative effects — without re-introducing any
  mechanism that can gate content visibility on JS executing correctly.
- `VISUAL_DENSITY: 5` — moderate. This is still a short, focused conversion
  page per strategy.md (low offer complexity, low friction, one CTA) — the
  boldness lives in composition and shape, not in cramming more content in.

**Why:** Brand DNA's mid-formal/warm-not-clinical placement and strategy.md's
"moderate, not high" trust requirement haven't changed — this is still a
free, low-friction WhatsApp ask, not a high-stakes purchase, so the *verbal*
register and the *palette's* temperature stay calm. What changed is the
client's own explicit, repeated instruction that "calm" was being executed
as "boring," and a hard requirement that this rebrand not read as a re-skin
of the reference site it's replacing. Those are separate axes: color/tone
can stay gentle while composition/shape/motion get considerably bolder.

## Palette — Verified, Not Guessed

**Source:** Playwright computed-style extraction directly against
https://landing-pages-five-silk.vercel.app/, this session. This replaces the
prior WebFetch/markdown-based guess and is the highest-confidence visual
data this project has had at any phase.

**Hard constraint from the client: these five colors are the ONLY thing
reused from the reference site.** No new hues are invented; every secondary
tone below is derived from this palette via native CSS `color-mix()`.

| Token | Value | Role |
|---|---|---|
| `--color-forest` | `#142016` | Dark-section background **and** ink/text color on light sections — this color does double duty, exactly as it does on the reference site. |
| `--color-accent` | `#2f9e52` | The one signature accent. Used sparingly (CTA fills, the scroll-progress bar, the hero accent bar, small highlight details) — not a background color. |
| `--color-bg` | `#ffffff` | Primary light-section background. |
| `--color-sage` | `#e4f2e8` | Primary alternating light-section tint. |
| `--color-sage-alt` | `#eaf1ea` | A second, very close sage tint — **use once only**, for rhythm (e.g. one section that needs to read as "a different beat" from the `--color-sage` sections around it without introducing a new hue). Not a general-purpose interchangeable swap for `--color-sage`. |
| `--color-cream` | `~#fbf9f4` | Nav background. Approximate — flagged as needing a final pixel-exact confirmation pass before ship (see Open Items). |

Derived tones (native `color-mix()`, no invented hues):

| Token | Formula | Role |
|---|---|---|
| `--color-accent-fg` | `#142016` (literal, not mixed) | Text color on `--color-accent` fills. Dark-on-green computes to ≈5.5:1 contrast — clears AA with real margin, and is a **deliberate inversion** of white-on-green (≈3:1, fails AA for normal-weight text). If the reference site uses white-on-green CTA text, this rebrand does not copy that choice. |
| `--color-muted` | `color-mix(in srgb, var(--color-forest) 65%, white)` | Secondary/caption text — a lightened forest, not a separate gray system. |
| `--color-muted-dark` | `color-mix(in srgb, white 70%, var(--color-forest))` | A light, forest-tinted neutral for subtle fills/dividers on dark sections. |
| `--color-border` | `color-mix(in srgb, var(--color-forest) 12%, white)` | Hairline borders — barely-there, tinted to the palette rather than a generic gray. |

Implemented in `clients/talita-lopes/src/tokens.css`, scoped under
`[data-client="talita-lopes"]`.

## Typography — Deliberately Not a Re-Skin

- **Display/headlines:** Bricolage Grotesque (variable), self-hosted via
  `@fontsource-variable/bricolage-grotesque`.
- **Body:** Hanken Grotesk, self-hosted via `@fontsource/hanken-grotesk`.

Both are **new devDependencies for the developer phase** — not installed by
this phase, just specified. Import once (e.g. in `BaseLayout.astro` or this
client's `index.astro`):

```js
import '@fontsource-variable/bricolage-grotesque';
import '@fontsource/hanken-grotesk';
```

**Why this pairing, and why not the reference site's pairing:** the
reference site uses Fraunces (a display serif) paired with Karla — an
editorial, warm-serif voice. The client's brief is a *different voice*, not
a re-skin with new colors bolted on, so this rebuild deliberately picks a
geometric, contemporary sans-pairing instead: Bricolage Grotesque's
condensed-but-chunky display weights read confident and current without
serif's editorial/heritage connotation, and Hanken Grotesk is a clean,
highly legible grotesque for body copy that doesn't fight the display face
for attention. Also deliberately not the *previous build's* Atkinson
Hyperlegible — that was a legitimate accessibility-motivated choice for a
50+ audience, but the client's rejection of the previous build as generic
means the type system needed to change along with everything else, not just
the color. (Hanken Grotesk is still a clean, x-height-generous grotesque —
legibility isn't being traded away, just no longer solved with a
clinical-reading-accessibility-branded typeface.)

Type scale (see `tokens.css`): headline ceiling is raised, not capped, versus
the previous pass — `clamp(2.75rem, 2rem + 4vw, 4.75rem)` for `h1` — matching
`DESIGN_VARIANCE: 8` and Bricolage Grotesque's chunky display character.
Body size/line-height (`1.125rem` / `1.65`) is **retained unchanged** from
the previous pass: that was an accessibility decision for a 50+ audience,
independent of the palette/voice correction, and doesn't need re-litigating
here.

## Shape Language — Deliberate Contrast, Not One Uniform Radius

The brief calls for contrast, not a single new radius value standing in for
the old one:

- **Containers/cards:** sharp-ish. `--radius-sm: 2px`, `--radius-md: 6px`.
  This is a deliberate departure from both the reference site's presumed
  softer card radii and the previous build's rounded-everything default —
  cards, form fields, and content containers read crisp and structural.
- **CTA buttons:** fully round pills. `--radius-pill: 999px`. The one
  consistently soft shape in the UI chrome, which makes it read as
  unmistakably *the* interactive/actionable element against the sharp
  containers around it — contrast doing hierarchy work, not decoration for
  its own sake.
- **Organic shapes:** reserved for imagery and section dividers *only*,
  varied per section rather than one repeated motif everywhere:
  - `--shape-diagonal` — a diagonal `clip-path` cut, used on the Hero seam
    (see Motion below) and optionally one other section divider. This is
    this rebrand's answer to the reference site's organic wave divider —
    same job (breaking a hard rectangular section boundary), deliberately
    different device (a diagonal cut instead of a wave curve).
  - `--shape-blob` — one organic blob-mask (`border-radius` percentage
    trick), used on exactly one photo crop, likely in the "Sobre a Talita"
    section. Reserved to one use so it reads as a considered accent, not a
    repeated template pattern — the reference site's circular/blob photo
    crops are the inspiration, but this rebuild uses the device once and
    deliberately, not as the default photo treatment throughout.

CTA pill radius is applied via a client-scoped override on
`shared/components/CtaButton.astro`'s existing `.cta-button` class
(`[data-client="talita-lopes"] .cta-button { border-radius:
var(--radius-pill); }`) rather than forking the shared component — every
other client's buttons are unaffected.

## Layout — Same Job as the Reference Site's Techniques, Different Moves

Per the client's constraint, the reference site's *layout devices* are
treated as inspiration for equally-considered but different choices, never
copied directly:

| Reference site technique | This rebrand's answer | Why different |
|---|---|---|
| Dark hero | **Light hero** (white/`--color-sage` bg, `--color-forest` text) | Deliberate inversion — reads immediately distinct from the reference site at first viewport, the single highest-visibility section on the page. |
| Organic wave divider | Diagonal `clip-path` cut (`--shape-diagonal`) | Same structural job (break the rectangular section edge), different geometry — sharper, matches the rest of the shape language's sharp-container/round-pill contrast instead of introducing a third, curved shape family. |
| Circular/blob photo crops (recurring) | One blob-mask, used once (`--shape-blob`); other photos are sharp-cornered (`--radius-sm`/`--radius-md`) | Recurring circular crops are the reference site's signature move — reusing it everywhere would read as a re-skin. Using the device exactly once keeps it recognizable as "considered," not templated. |
| Floating overlap cards | Not used | Genuinely different structural choice, not a forced substitution — see bento grid below for where this rebrand spends its structural boldness instead. |
| Alternating dark/light section rhythm | **Kept**, but rebalanced: light hero (inversion above) → `--color-sage` → `--color-bg` → `--color-forest` (one full dark section, likely credentials/differentiators) → `--color-sage-alt` (used once, per token note) → `--color-bg` → CTA | This rhythm device itself is sound information-architecture (it's what makes an 8-section page not feel monotonous) and isn't palette- or reference-specific — kept, with the hero inverted and `--color-sage-alt` spent deliberately once rather than left unused. |
| Stat-bar-above-3-columns (services) | **Asymmetric bento grid** for the 6 service lines — one larger featured cell (spinal-specialization + 50+ framing, the differentiated hook per strategy.md's messaging hierarchy) plus varied-size cells for the other 5 | Directly answers `design-taste-frontend`'s and this project's own carried-forward anti-repetition rule (no 3-equal-card grid) while giving the strategically most important service line visual weight a uniform grid can't. |
| Stat-bar callouts | Not used as a literal stat bar | No new stats exist beyond what strategy.md already flags as needing client reconfirmation (review count) — inventing a stat-bar visual for numbers that aren't confirmed would manufacture false precision `design-taste-frontend` explicitly forbids. |
| 3-column testimonials | **Horizontal scroll-snap testimonial strip** (`scroll-snap-type: x mandatory`, native CSS, no JS carousel library) | Same 3 testimonials, different container — a horizontal strip reads more contemporary/bold than a static 3-column grid and gives each quote full-width attention on mobile without a breakpoint-driven reflow. |

**Section skeleton** (carries forward the proven IA from strategy.md's
messaging hierarchy — that ordering logic is sound and independent of the
visual-system correction): Hero (light, inverted) → problem-recognition
("Isso soa familiar?") → Sobre a Talita (one blob-mask photo) → mechanism +
spinal-specialization + 50+ framing, kept together → credentials (dark
`--color-forest` section) → testimonials (scroll-snap strip, near the
"tried elsewhere" objection) → services (asymmetric bento) → FAQ →
Fale com a Talita / CTA.

**Hero specifically:** must still fit the initial viewport per
`design-taste-frontend`'s layout-discipline rules — headline max 2 lines,
subtext max ~20 words, CTA visible without scrolling. Light background (the
inversion above), one real photo from the v1 photography set (licensing
already confirmed per `project-state.md`), the diagonal seam shape at the
Hero's lower edge, and the accent highlight-bar (see Motion below).

## Motion — Handoff to Developer Phase

`MOTION_INTENSITY: 7`. Reuse what already exists in `shared/` rather than
reinventing it:

- **Hero entrance:** reuse the existing `.enter`/`.enter-1`..`.enter-6`
  mount-stagger utilities in `shared/styles/base.css` — eyebrow → h1 → body
  → CTA → image, same 40–390ms delay ladder already proven on this project.
- **Interactive elements:** reuse `[data-hover-lift]` for cards (services
  bento cells, testimonial cards) and `CtaButton`'s existing hover-glow /
  `:active` press-scale rules. Don't reinvent hover/press feedback that
  already exists and already passed a taste pass.
- **Scroll reveal (content sections):** reuse the existing `.reveal`
  utility and its `requestAnimationFrame`-throttled scroll/resize listener
  in `BaseLayout.astro` — **not** the earlier `IntersectionObserver` version,
  which is documented in `project-state.md` as having silently broken in
  production and hidden the entire page below the Hero. This is exactly the
  incident `MOTION_INTENSITY: 7` (not 9-10) is capped to avoid repeating in
  a new form.

**Two new native-CSS scroll-driven decorative effects** — purely decorative,
`@supports`-gated, and structurally incapable of hiding content (unlike a
JS `IntersectionObserver` reveal, a CSS `animation-timeline` effect that
fails to apply just leaves the element at its authored static/fallback
state, never at `display:none` or `opacity:0` with no recovery path). Exact
recipe from the `animate` skill, implemented already in `tokens.css`:

**(a) Hero diagonal seam + accent highlight-bar**, animating via
`animation-timeline: view()` as the Hero scrolls through the viewport:

```css
@supports (animation-timeline: view()) {
  @keyframes hero-seam-shift {
    from { clip-path: polygon(0 0, 100% 0, 100% calc(100% - 12px), 0 100%); opacity: 0.6; }
    to   { clip-path: var(--shape-diagonal); opacity: 1; }
  }
  .hero-seam {
    animation: hero-seam-shift linear both;
    animation-timeline: view();
    animation-range: entry 0% cover 40%;
  }
  @keyframes hero-accent-reveal {
    from { opacity: 0.35; transform: scaleX(0.6); }
    to   { opacity: 1; transform: scaleX(1); }
  }
  .hero-accent-bar {
    animation: hero-accent-reveal linear both;
    animation-timeline: view();
    animation-range: entry 0% cover 30%;
  }
}
```

Fallback (no `@supports` match, e.g. Firefox/older Safari): `.hero-seam` and
`.hero-accent-bar`'s un-animated base rules already set the fully-visible
end state (`opacity: 1`, the full `--shape-diagonal` cut) — there is no
"broken/half-applied" state possible.

**(b) 3px accent-green scroll-progress bar** fixed under the nav, animating
via `animation-timeline: scroll(root)`:

```css
@supports (animation-timeline: scroll()) {
  @keyframes scroll-progress-fill { from { transform: scaleX(0); } to { transform: scaleX(1); } }
  .scroll-progress {
    display: block;
    position: fixed; top: var(--nav-height, 64px); left: 0;
    height: 3px; width: 100%;
    background: var(--color-accent);
    transform: scaleX(0); transform-origin: left;
    animation: scroll-progress-fill linear both;
    animation-timeline: scroll(root);
  }
}
```

Fallback: `.scroll-progress { display: none; }` — no bar at all, rather than
a static/broken one, when unsupported.

**Ingredients, per the `animate` skill's build sequence:**
- **Gate:** occasional/marketing-tier, purely decorative ("explanation"/
  ambient-brand-feel, not feedback or state indication on data the user
  acts on) — passes the gate; this is exactly the tier where this kind of
  motion is allowed.
- **Tool:** native CSS `animation-timeline` (view()/scroll()) — cheapest
  tool that works, runs off the main thread, no JS/no library.
- **Properties:** `clip-path` (the sanctioned fourth property alongside
  transform/opacity) and `opacity` for the Hero seam/bar; `transform:
  scaleX()` (not `width`) for the progress bar — corrected from the
  original ask's "animating width," since `width` triggers layout/paint on
  every scroll tick and `transform: scaleX()` with `transform-origin: left`
  achieves the identical visual result on the compositor only.
- **Curve:** `linear` for both — these are scroll-position-linked (not
  time-linked) effects, and `linear` is the correct choice for motion meant
  to track scroll 1:1, per the same rule that governs marquees/native
  scrollbars.
- **Reduced motion:** since these are pure decoration with no comprehension
  purpose (unlike the content `.reveal` fades), `prefers-reduced-motion:
  reduce` disables the animations entirely and pins each element to its
  static fallback state — full removal is correct here, not "gentler."
- **Feel-check for the developer phase:** the Hero seam/bar's `animation-
  range` values (`entry 0% cover 40%`/`30%`) are a starting point, not a
  locked spec — check on a real Hero (device it actually contains) that the
  seam doesn't finish animating before the CTA is visible or drag on so long
  it's still moving well past the fold.

## Reference Moodboard

- **Primary visual anchor (client asset, use):** v1 landing page photography
  — real, mature (40s–50s) subjects, outdoor/natural-light walking and
  stretching shots, trainer-client posture correction, three real
  testimonial headshots. Licensing already confirmed with the client per
  `project-state.md` (her own shoot, her own rights) — no flag carried
  forward on this point.
- **Reference site (landing-pages-five-silk.vercel.app):** palette verified
  and reused exactly as specified above — **and nothing else.** Its
  Fraunces/Karla typography, dark hero, wave dividers, circular photo crops,
  floating overlap cards, and stat-bar-above-columns layout are all
  explicitly not reused; see the Layout table above for this rebrand's
  different answer to each of those jobs.
- **Never reuse as source imagery (competitor/inspiration references,
  pattern-analysis only, unchanged from the prior visual-research pass):**
  Vêneto Personal Trainer (@veneto.personal) — bright, high-contrast
  gym/studio photography with bold text-overlay promo graphics, the local
  convention this brand deliberately breaks from; Fernanda Souza
  (fernandasouzapersonal.com) — structural/IA reference only; Guilherme
  Jungles / "Coach da Coluna" — naming-convention idea only.

## Copy-Adjacent Guardrails (unchanged, carried forward)

No em-dashes anywhere on the page (hyphens only), no section-number
eyebrows, max one eyebrow per three sections if used at all, one CTA-intent
label used consistently ("Marcar avaliação" / "Fale com a Talita"), no
fake-precise stats not already verified in strategy.md. These are content
decisions, not visual-system ones, and the palette/voice correction doesn't
change any of them.

## Taste Pass (`design-taste-frontend`)

Run and logged in full below this section, as its own subsection, per that
skill's own output format — see "Design-Taste-Frontend Pass" at the end of
this document.

## Open Items — Not Resolved Here

1. **`--color-cream` (`~#fbf9f4`) is an approximate read, not a
   pixel-exact-confirmed value** — flagged explicitly by this session's own
   verification pass. Confirm with one more targeted computed-style check
   (or a color-picker pass on a screenshot) before treating it as final, the
   same way the other four colors already were this session.
2. **Bricolage Grotesque / Hanken Grotesk are not yet installed** —
   developer phase must add `@fontsource-variable/bricolage-grotesque` and
   `@fontsource/hanken-grotesk` as devDependencies and import them; this
   phase only specifies the token/family values assuming availability.
3. **`animation-range` values on the two new scroll-driven effects are a
   starting point** — need a real-device feel-check once the Hero markup
   exists (see Motion section above).
4. All open items already logged in `project-state.md` prior to this
   session (CREF registry confirmation, online-consulting FAQ sign-off,
   review-count reconfirmation) are unchanged by this design-only pass and
   remain outstanding.

---

## Design-Taste-Frontend Pass

Ran `design-taste-frontend` against this document and `tokens.css` (not
against rendered markup — implementation for this rebrand hasn't landed yet;
this is a taste pass on the *direction*, gating it before developer handoff).
Stack context: Astro + native CSS custom properties, not React/Tailwind/
Motion/GSAP, so the skill's React-specific sections (3.A-3.B, 5.A-5.D state-
management and GSAP skeletons) don't apply here; evaluated against the
brief-inference, dial, and Pre-Flight sections that do.

**Design Read (Section 0.B), restated and confirmed:** full rebrand for a
personal-training service serving a 50+, health-adjacent audience,
trust-sensitive tone but explicitly *not* visually timid per two rounds of
client rejection, leaning toward a bespoke native-CSS system (no named
design-system package fits a bespoke brand rebuild) with a calm-green
palette and bold composition/shape/motion. Matches the brief. No
clarifying question needed - the direction already resolves the one
genuine ambiguity a fresh read would have (calm palette + bold composition
are different axes) explicitly in its own "Why" section.

**Dials confirmed reasoned, not defaulted:** `DESIGN_VARIANCE 8` /
`MOTION_INTENSITY 7` / `VISUAL_DENSITY 5`, each with an explicit
client-override justification tied to a real, cited incident (the generic/
boxy rejection; the `IntersectionObserver` blank-page incident capping
motion below 9-10). This is the opposite of silently using the 8/6/4
baseline - good.

**Redesign mode (Section 11):** correctly Redesign - Overhaul. Content/IA
(strategy.md's messaging hierarchy, section order) is explicitly preserved
per Section 11.C; only the visual system changes. Brand tokens were
audited before this document was written (the reference site's palette was
extracted, not guessed) per Section 11.B.

**Targeted Pre-Flight Check** (full 60-item matrix isn't uniformly
applicable to a not-yet-implemented Astro/CSS direction; items below are
the ones with real signal at this phase):

- Em-dash ban (9.G): **Pass.** Copy-Adjacent Guardrails explicitly bans
  em-dashes site-wide ("hyphens only"), and this document practices what
  it specifies - no em-dash anywhere in its own prose either.
- Color Consistency Lock (4.2): **Pass.** One accent (`#2f9e52`) used
  consistently for CTA fills, scroll-progress bar, and small highlights
  only - never as a background. `--color-sage-alt` is explicitly
  documented as spend-once, not a second interchangeable tint, which is
  the correct way to avoid an accidental second "accent."
- Shape Consistency Lock (4.4): **Pass**, and a model example of the
  allowed exception - a documented rule (sharp containers / pill CTAs /
  organic shapes reserved to imagery-and-dividers only) applied
  consistently rather than mixed arbitrarily.
- Button Contrast Check (4.5): **Pass.** `--color-accent-fg` is a
  deliberate dark-on-green inversion computed at ~5.5:1, with the
  rejected white-on-green (~3:1) alternative named and ruled out in the
  token file's own comment. Rare to see this reasoning actually captured
  next to the token.
- Serif Discipline (4.1): **Pass / N/A.** Bricolage Grotesque + Hanken
  Grotesk, both sans - not Fraunces, not Instrument_Serif, and the
  document explicitly reasons away from the reference site's serif
  (Fraunces/Karla) rather than defaulting into one.
- Premium-Consumer Palette Ban (4.2): **N/A**, not a premium-consumer
  brief, but worth noting the palette independently clears it anyway - no
  beige/brass/oxblood/espresso family present.
- Hero Layout Discipline (4.7): **Pass.** Headline-2-lines/subtext-20-words/
  CTA-visible-without-scroll is stated as a hard constraint in the Hero
  paragraph, and hero stack elements (eyebrow, h1, body, CTA, image) stay
  within the 4-element cap with no trust-strip/tagline creep.
- Hero top-padding cap (4.7 - max `pt-24`/6rem desktop): **Advisory, not a
  fail.** `--space-7` (7rem/112px) is the token named for hero desktop
  padding, above the 6rem cap - but `project-state.md`'s CRO-review entry
  shows this was already caught and mitigated in the prior implementation
  pass via a responsive `py-10 md:py-[var(--space-7)]` override, not
  reverted here. Flagging so the developer phase re-applies that same
  responsive override on this rebrand's Hero markup rather than a bare
  `var(--space-7)`, since the token's raw value alone would still fail
  the cap.
- Eyebrow Restraint (4.7 - max 1 per 3 sections): **Pass.** Copy-Adjacent
  Guardrails independently states the identical rule ("no section-number
  eyebrows, max one eyebrow per three sections") - already self-enforced
  before this pass ran.
- No Duplicate CTA Intent (4.5): **Pass.** One CTA-intent label enforced
  site-wide ("Marcar avaliação" / "Fale com a Talita"), stated explicitly
  as a guardrail.
- Zigzag Alternation Cap / Section-Layout-Repetition (4.7): **Pass.** The
  Layout table's per-section techniques (bento, scroll-snap strip,
  blob-mask-once, diagonal seam, dark full-bleed credentials section) are
  at least five distinct layout families across eight sections - clears
  the "no 3+ consecutive same-family sections" and "≥4 families across 8
  sections" bars with room to spare.
- Bento Cell Count + Background Diversity (4.7): **Pass.** Six service
  lines map to six cells (one featured, five varied), and the featured
  cell is filled in accent-green per `project-state.md`'s architecture
  note, not a seventh white-on-white text tile - real visual variation,
  not just size variation.
- Real Images, No Fake Screenshots (4.8): **Pass.** Real, licensed client
  photography (confirmed rights) throughout; blob-mask reserved to exactly
  one crop; no div-based fake UI anywhere in the brief.
- Motion Motivated (5, "motion claimed = motion shown"): **Pass.** Every
  motion effect in this document states its job in one sentence (hero
  seam/bar = ambient brand-feel on the single highest-visibility section;
  scroll-progress = position feedback; content `.reveal` = hierarchy/
  sequence) and the two new effects are walked through the `animate`
  skill's full gate → tool → property → curve → reduced-motion sequence
  explicitly, including a corrected `width`-to-`transform:scaleX()` fix
  caught during that reasoning. No animation-for-its-own-sake found.
- `window.addEventListener('scroll')` ban (5.D): **Pass.** The Motion
  section explicitly rejects reviving the old `IntersectionObserver`
  approach's failure mode and specifies native `animation-timeline`
  (view()/scroll()) for the two new decorative effects and the existing
  rAF-throttled listener (not a raw unthrottled scroll listener) for
  content reveal - both are the compliant alternatives this rule asks for.
- Reduced Motion (6.B): **Pass**, and thorough - both the content reveal
  and the two new decorative effects have explicit
  `prefers-reduced-motion: reduce` fallbacks, correctly differentiated
  (decorative effects fully disable and pin to static state; content
  reveal degrades gently), matching the skill's own guidance that these
  are different cases.
- Mobile collapse explicit per section (4.7): **Advisory gap.** The
  asymmetric bento (services) and the diagonal-seam Hero have their
  desktop composition specified in detail, but this document doesn't
  state the `<768px` fallback for either (e.g., does the featured 2x2
  bento cell collapse to full-width-first, or does the grid just
  auto-flow single-column and the *order* matters more than that). The
  horizontal scroll-snap testimonial strip is the one exception - it's
  correctly noted as mobile-native by construction, no breakpoint
  override needed. Recommend the developer phase pin down the bento's
  mobile order explicitly (which cell reads first is a real content
  decision, not just "it reflows") before implementing, rather than
  leaving it to be decided ad hoc in markup.
- Dark mode / `prefers-color-scheme` (6.C): **N/A by project convention,
  not a gap.** This is a fixed-brand-palette marketing page (the
  alternating light/dark *section* rhythm here is a compositional device,
  not a user/system dark-mode toggle - Section 4.11's Page Theme Lock
  rule targets the latter). No other client in this OS implements a
  system dark-mode toggle either; consistent with that existing
  convention, not a regression introduced here.
- Navigation (4.7 - one line, ≤80px): **N/A, out of scope for this
  document.** Nav markup/height is an existing `shared/` component this
  rebrand doesn't touch beyond the `--color-cream` background token;
  already shipped and QA'd in an earlier phase.

**Verdict: pass, with two developer-phase advisories logged above** (the
Hero padding token needs the same responsive override the prior CRO pass
already established, not a bare `var(--space-7)`; the bento grid's mobile
column order should be decided explicitly rather than left to default
reflow). Neither blocks moving to implementation - both are narrow,
actionable notes, not direction-level rework. No em-dash, no AI-tell
palette/type defaults, no duplicate-CTA-intent, no fake-screenshot, and no
motion-without-purpose findings anywhere in the document.
