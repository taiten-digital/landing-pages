# QA & Post-Mortem — Talita Lopes

## Breakpoint Checklist (mobile / tablet / desktop)
- [x] Typography scales, no overflow — `h1`/`h2`/`h3` use `clamp()` (client
      override in `tokens.css` tightens the range for legibility); body grids
      (`grid md:grid-cols-2` / `md:grid-cols-3`) have no explicit column count
      below `md` (768px), so Tailwind's grid default stacks them to a single
      column on mobile. No fixed pixel widths found anywhere in the client's
      section files; all images are `width:100%; height:auto` with intrinsic
      `width`/`height` attributes for aspect ratio (no CLS). Verified by
      reading the compiled Tailwind classes and inline styles, not by
      rendering — see limitation note below.
- [x] Images sized/lazy-loaded appropriately — hero image
      (`hero-senhora.webp`, the LCP candidate) is `loading="eager"
      fetchpriority="high"`; all 6 other images (`about`, 3 testimonial
      avatars, services, contact) are `loading="lazy"`. All carry correct
      intrinsic `width`/`height`. Confirmed in `dist/talita-lopes/index.html`.
- [x] CTA reachable and legible at every width — 2 WhatsApp CTAs (hero,
      contact), same `wa.me` number + prefilled message, both render as
      `inline-block` with generous `padding` tokens; not clipped or
      dependent on viewport width.
- [~] Touch targets >= 44px on mobile — CTA buttons pass (~46px tall:
      `padding-block: var(--space-2)` = 8px top+bottom + body line-height
      1.65 × 18px ≈ 30px content ≈ 46px total). **FAQ accordion `<summary>`
      does not** — see Issue #1.
- [x] Nav usable on mobile — `shared/components/Nav.astro` is used with only
      a `brand` prop (`<Nav brand="Talita Lopes" />`), no `links`, so it
      renders a static brand name with an empty `<nav>` and nothing to
      overflow or need a mobile menu for. Appropriate for a single-scroll
      page whose primary navigation is the WhatsApp CTAs, not in-page links.

**Limitation:** `claude-in-chrome` was unavailable in this environment
(`navigate` returned "Browser extension is not connected") — consistent with
this same unavailability during the project's visual-research phase (see
`project-state.md`). Ran `npm run preview` and confirmed the server serves
`/talita-lopes` (HTTP 200), but could not take real screenshots at
390/768/1440px. The breakpoint checks above are verified via the built
HTML/CSS/Tailwind classes (responsive grid classes, `clamp()` typography,
`container` max-width, image intrinsic sizing, computed CTA/summary box
dimensions from token values) rather than pixel-rendered screenshots.
**Recommend a real screenshot pass (or `mobile-native` hardware check per its
own rules) before final sign-off**, since no tool in this session could
render the page.

## Technical
- [x] `astro check` passes — 0 errors, 0 warnings, 0 hints.
- [x] `astro build` succeeds — clean build, 2 pages generated
      (`/`, `/talita-lopes`), 7 images optimized. No client-side JS beyond
      one inline `application/ld+json` script (FAQ schema) — no hydration,
      so no browser console errors are possible from app code; not verified
      via live console read (`claude-in-chrome` unavailable).
- [x] Links valid, forms functional — only 3 `href`s render: self-canonical
      (`/talita-lopes`), the built stylesheet, and the WhatsApp CTA (used
      twice, identical valid `https://wa.me/5543984795883?text=...` with a
      URL-encoded PT-BR message). No `<form>` elements on the page.
- [x] SEO meta / OG tags present — `pageTitle`/`pageDescription`/`pageLang`
      exported from `index.astro` and correctly forwarded by
      `src/pages/[slug].astro` → `BaseLayout`: verified in built HTML —
      `<html lang="pt-BR">`, real `<title>`, `<meta name="description">`,
      `<link rel="canonical" href="/talita-lopes">`, `og:title`/
      `og:description`/`og:type`. Exactly one `<h1>`, six `<h2>`s, no
      skipped heading levels. All 7 images have descriptive, non-generic
      Portuguese `alt` text (no decorative images needing `alt=""`).
- [~] Accessibility: contrast, alt text, labels, focus states — alt text
      good (see above). Contrast checked against tokens: CTA button
      (white on `--color-accent` `#0f766e`) ≈ 5.5:1, body/muted text
      (`#4b5563` / `#0a0a0a` on white or `--color-accent-soft`
      `#e6f4f3`) all comfortably pass WCAG AA. Native `<details>/<summary>`
      used for FAQ (correct semantics, keyboard-operable, no ARIA needed).
      **No custom focus-visible styling anywhere in `shared/` or the client**
      — relies entirely on browser default `:focus` outline (functional,
      not a failure, but unpolished for a professional page) — see Issue #2.

## Issues Found
| Issue | Severity | Fixed? |
|---|---|---|
| FAQ `<summary>` tap target is only as tall as its text line (~30px). | Medium | Yes — `padding-block: var(--space-3); min-height: 44px` moved onto `<summary>` itself in `FaqSection.astro`. |
| No focus-visible styling on any interactive element. | Low | Yes — added `:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }` to `shared/styles/base.css` (benefits every client). |
| Both WhatsApp CTAs open in the same tab. | Low | Yes — `CtaButton.astro` gained an `external` prop (`target="_blank" rel="noopener noreferrer"`), used on both call sites. |
| No `mobile-native` baseline (tap-highlight, touch-action). | Low | Yes — added `-webkit-tap-highlight-color: transparent` (body) and `touch-action: manipulation` (links/buttons/summary) to `shared/styles/base.css` (benefits every client). |
| No `theme-color` meta tag. | Low | Yes — `BaseLayout` gained a `themeColor` prop, `[slug].astro` forwards an optional `pageThemeColor` export; this client set it to `#0f766e`. |
| Visual breakpoint checks could not be performed with real screenshots — `claude-in-chrome` extension not connected in this environment. Verified responsiveness via HTML/CSS/Tailwind class inspection instead. | Process note | Not fixed — environment limitation, not a code issue. Still owed before final sign-off if a working browser connection becomes available. |

All fixes applied directly by the main session (not a separate developer-agent iteration, since these were small, well-defined CSS/markup changes) and verified with a clean `npm run check` + `npm run build`, with the `target="_blank"`, `theme-color`, and 44px min-height confirmed present in the built HTML.

## Conversion Review (CRO)

**Method note:** `claude-in-chrome` was unavailable again for this pass
(`navigate` timed out with "Browser extension is not connected" / hidden
`tabs_context_mcp` lookup did not respond) — the same environment limitation
QA already logged, present for the entire project. No `Bash` tool was
available in this session either, so `npm run preview` could not be started
from here. This review is therefore based on direct reads of
`strategy/strategy.md`, `strategy/page-architecture.md`,
`project-state.md`, and the actual built output
(`dist/talita-lopes/index.html`) — real final markup/copy/CSS values, not a
rendered screenshot. Anything below that depends on viewport geometry (the
Hero finding) is explicitly flagged as computed-from-CSS, not visually
confirmed, and should be re-checked with a real screenshot pass before
launch.

- **Value proposition clarity:** The combined claim strategy.md ranks #1–#3
  (mechanism + spine specialization + 50+ framing, "must be understood in
  the first viewport") is written as one coherent sentence, correctly not
  split into disconnected lines: the Hero's first body paragraph reads
  "Especialista em exercício físico para distúrbios da coluna vertebral, com
  treinos pensados para pessoas 50+ que querem se mexer com segurança e no
  próprio ritmo — mesmo quem já tentou treinar antes e não teve o resultado
  esperado," directly under the H1's mechanism line ("O treino se adapta a
  você. Não o contrário."). The wording matches strategy.md's required exact
  phrasing for the specialization claim. **Risk (unverified, flag for
  screenshot pass):** the H1 alone only carries the mechanism claim (#1) —
  the spine+50+ combination (#2/#3) lives entirely in the paragraph below
  it, and the Hero section's top/bottom padding uses a fixed, non-fluid
  token (`--space-7: 7rem` = 112px, same at every viewport width — unlike
  the type scale, which is `clamp()`-based and does scale down). On a short
  mobile viewport, 112px of top padding + eyebrow + a 2–3 line H1 could push
  that differentiator paragraph itself below the fold, meaning the page's
  single most important strategic requirement (the combined claim visible
  on load) may not actually render in the first viewport on smaller phones.
  This can't be confirmed without a real device/screenshot check. If
  confirmed, the fix is a mobile-specific reduction of Hero's
  `padding-block` (e.g. a smaller value below a breakpoint, or making
  `--space-7` itself fluid) rather than a copy change.

  **Fixed (2026-09-15, main session):** applied the recommended mobile-first
  fix pre-emptively rather than waiting on an unavailable screenshot tool —
  `HeroSection.astro`'s section padding changed from a fixed
  `padding-block: var(--space-7)` (112px at every width) to responsive
  Tailwind classes `py-10 md:py-[var(--space-7)]` (40px on mobile, 112px from
  `md:` up). This meaningfully shortens the Hero on small screens so the
  differentiator paragraph sits higher. Verified with `npm run check` +
  `npm run build` (both clean); **still not pixel/screenshot-verified** —
  the underlying `claude-in-chrome` unavailability that blocked this review
  also blocks confirming the fold line exactly. Recommend one real-device or
  screenshot check before launch to confirm.

- **Offer clarity:** Good. The free, no-commitment nature of the offer is
  stated early (Hero's second paragraph: "avaliação física gratuita, sem
  compromisso, para entender seu caso antes de qualquer treino"), restated
  immediately before the final CTA ("Sem compromisso, sem cartão, sem letra
  miúda"), and the FAQ's first (default-open) question directly confirms it
  ("A avaliação física é realmente gratuita?"). What happens after the
  WhatsApp message is explained by the compact 3-step "Como funciona" block
  immediately before the final CTA, per page-architecture.md's design (fold
  the offer-mechanics content into the last section rather than giving it
  its own scroll stop). No pricing is disclosed on the page, consistent
  with strategy.md §9; the one pricing question in FAQ ("Quanto custa?")
  correctly defers to a direct conversation rather than inventing a number.

- **Trust/proof sufficiency:** The three testimonials are sequenced exactly
  as strategy.md specifies — the "passei mais de dois anos com outros
  profissionais sem o resultado que queria" quote leads, with the
  Testimonials section's own intro copy ("Já treinou com outros
  profissionais antes e não viu diferença?") explicitly naming that
  objection before the proof appears. Credentials (CREF, UNOPAR, +10 anos)
  are stated plainly in About, positioned after the Hero's claim as required.
  Two known gaps carried over from strategy/copy, not rediscovered here,
  still open at CRO time:
  - **CREF registry confirmation** (strategy.md §5, project-state.md's open
    questions): the number `CREF 019973-G/PR` is printed twice on the live
    page as a flat, unhedged fact, but strategy.md is explicit that only the
    client's own channels were checked, not the CREF-PR registry itself.
    This is a regulated-profession credential with real compliance stakes —
    treat as a **pre-launch blocker**, not a copy edit: verify the string
    against the registry (or get written client confirmation) before this
    page goes live, independent of anything else in this review.
  - **Online-consulting-for-50+ FAQ answer**: strategy.md flagged this
    objection as having no source material to draw from. The shipped FAQ
    answer ("...se você está começando agora ou tem uma condição de coluna
    mais delicada, o mais seguro costuma ser conversar diretamente com a
    Talita...") is a copywriter-originated reassurance line, not sourced
    from client material. It's reasonably hedged and avoids a hard claim,
    but it does make an implicit safety judgment call about a health-
    adjacent decision — exactly the category strategy.md's Section 4/6 flags
    as compliance-sensitive. This should get explicit client sign-off before
    launch, same as the CREF item, rather than being treated as resolved
    because it reads well.
  - Handled correctly (no action needed): the "28 reviews / 5 stars" claim
    strategy.md flagged as possibly stale is **not** on the page — testimony
    attribution uses the safer qualitative "Avaliação verificada no Google"
    with no count. Gerontology specialization is also correctly absent
    (strategy.md said not to originate wording for it without client
    confirmation, and none appears).

- **Objection coverage:** All 5 objections in strategy.md §6 have a concrete
  answer on the page, not just implicit coverage:
  1. "Tried PT/physio before, no results" → Testimonials (see above), led
     with the exact matching quote.
  2. "Will this help my specific back/sciatica issue" → Hero specialization
     line + sciatica testimonial + FAQ "Tenho dor nas costas / dor ciática.
     O treino é seguro para mim?" (which also correctly avoids a medical
     claim, suggesting the visitor bring a doctor/physio's info rather than
     promising a cure).
  3. "Will it respect my age / not push too hard" → "ouve e adapta o
     treino... me senti cuidada" testimonial + the mechanism message
     repeated in Hero and the final CTA section.
  4. "Is online consulting as good as in-person for 50+" → FAQ answer
     (flagged above as needing sign-off) *and* the Services section, which
     scopes online consulting toward the secondary segment ("indicado para
     quem já treina com autonomia") rather than presenting it as a like-for-
     like substitute for the primary 50+ segment — this dual handling
     matches strategy.md's suggested approach.
  5. "General hesitation about starting/resuming at 50+" → FAQ "Preciso ter
     experiência prévia com treino?" plus the free/no-commitment framing
     throughout.
  No objection from strategy.md's list is unaddressed in the shipped copy.

- **CTA hierarchy/friction:** Single conversion path, no competing CTAs —
  matches strategy.md §7 exactly. Nav renders with no links (`<Nav
  brand="Talita Lopes" />`, no `links` prop), so there's nothing on the page
  competing with the WhatsApp CTA for attention. Both CTA instances (Hero:
  "Marcar avaliação gratuita"; final section: "Marcar avaliação") point to
  the identical `wa.me` number and prefilled message, and both now open in a
  new tab (`target="_blank" rel="noopener noreferrer"`, from this QA pass's
  Issue #3 fix) — this doesn't add meaningful friction since a `wa.me` link
  is already an app/context handoff either way, and it means a visitor who
  backs out of WhatsApp still has the landing page open in the original tab.
  Minor, low-priority-only observation: the two CTA labels differ ("...
  gratuita" vs plain) — not a real inconsistency given the final section's
  surrounding copy ("Sem compromisso, sem cartão, sem letra miúda") already
  restates the free/no-risk framing, so the shorter label there isn't a
  loss; not worth a fix.

### Prioritized Findings
| # | Finding | Section | Priority | Action |
|---|---|---|---|---|
| 1 | CREF registry not independently verified against CREF-PR; number stated as flat fact on-page twice | About | High (compliance) | Verify registry string or get written client sign-off before launch — not a copy change |
| 2 | Online-consulting-for-50+ FAQ answer is an unsourced, copywriter-originated safety judgment on a health-adjacent question | FAQ | High (compliance) | Client sign-off before launch; keep current hedged wording if approved, otherwise revise with client input |
| 3 | Hero's combined spine+50+ claim sits in a paragraph below the H1, gated behind a fixed (non-fluid) 112px `padding-block`; unverified whether it clears the fold on short mobile viewports | Hero | Medium (unverified — needs screenshot) | **Fixed 2026-09-15**: `py-10 md:py-[var(--space-7)]` (responsive). Still not screenshot-verified — confirm on a real device before launch. |
| 4 | CTA label differs between Hero ("...gratuita") and final CTA (no "gratuita") | Hero / Contact | Low | No action needed — final section's surrounding copy already covers the free/no-risk framing |

## Post-Mortem (on completion)
- What worked: parallel-running independent phases (research + brand DNA,
  then ux-architecture + visual-research) with no quality loss since their
  inputs didn't overlap. Fact/Observation/Inference/Unknown tagging from the
  research phase held all the way through to shipped copy — nothing got
  quietly upgraded from "unverified" to "stated as fact." Discovering and
  reusing the client's own pre-existing v1 landing page (once confirmed with
  the user) gave real testimonials and credentials from day one instead of
  placeholders.
- What failed: `claude-in-chrome` was unavailable for this project's entire
  duration, so visual research, QA, and CRO all had to fall back to
  WebFetch/source-code reading instead of real screenshots — every visual
  judgment call (colors, layout, the Hero fold risk) carries a "not
  pixel-verified" caveat that a working browser connection would remove.
- Missing capabilities/tools: a working browser-automation connection in
  this environment; no CREF-PR (or equivalent professional-registry) lookup
  tool for verifying a regulated-profession credential.
- Useful research sources: a client's own prior landing page, when one
  exists, is a legitimate high-value research source once the user confirms
  it. A Linktree-style bio link was the reliable signal for resolving which
  of two similarly-named Instagram handles was actually official.
- Reusable components/patterns discovered: the `pageTitle`/`pageDescription`/
  `pageLang`/`pageThemeColor` named-export convention (fixed a real routing
  gap, now applies to every client); `CtaButton`'s `external` prop; the
  focus-visible/tap-highlight/touch-action baseline added to
  `shared/styles/base.css`.
- Improvements for the next client: add an image-licensing question to the
  discovery questionnaire up front for any client with existing commissioned
  photography, so rights get confirmed before visual research rather than
  mid-pipeline; for a regulated profession, flag credential-verification as
  an explicit pre-launch checklist item rather than a copy-review footnote.

---

# QA Pass — 2026-09-15 Rebrand (Breakpoint + Technical)

Full visual/structural rebrand (new palette `#142016/#2f9e52/#e4f2e8/#eaf1ea/#fbf9f4`,
Bricolage Grotesque + Hanken Grotesk, asymmetric layouts, diagonal Hero seam,
blob-mask photo, horizontal scroll-snap testimonials, bento-grid services,
native CSS scroll-driven decorative effects). This section supersedes the
breakpoint/technical checklists above for anything palette/layout-specific;
the CRO and original Post-Mortem sections above still describe the prior
(pre-rebrand) pass and are left as project history.

**Method:** `claude-in-chrome` was checked first per `docs/mcp-registry.md`
and, consistent with this project's entire history, did not connect. Went
straight to Playwright (`chromium.launch()`, already installed) against
`npm run preview` on `localhost:4321`. Used real scroll simulation for
every screenshot (`window.scrollBy` in stepped increments across the full
`document.body.scrollHeight` before capturing) specifically to trigger the
`.reveal` scroll-check in `src/layouts/BaseLayout.astro` (a naive `fullPage`
screenshot without scrolling first would miss any content still sitting in
its pre-reveal `clip-path: inset(0 0 100% 0)` state, the exact mistake this
project's history already flagged and fixed twice). Verified at 390x844
(mobile), 768x1024 (tablet), 1440x900 (desktop). Also ran `mobile-native`'s
baseline checklist and `impeccable`'s `audit.md` accessibility/responsive
dimensions directly against the code and computed styles (not the full
`impeccable` routing/context workflow, which is scoped for a design
engagement rather than an incremental QA pass).

## 1. `npm run check` / `npm run build`
- [x] `astro check` - 0 errors, 0 warnings, 0 hints (before and after every
      fix below; re-verified after each edit).
- [x] `astro build` - clean, 2 pages generated, 6 images optimized, every
      time it was run in this pass (5 rebuilds total across the fixes below).
- [x] `npm run preview` + real-scroll Playwright pass at all 3 breakpoints:
      zero console errors / zero `pageerror` events captured via
      `page.on('console'/'pageerror')` across all three viewports.

## 2. Breakpoint checklist (390 / 768 / 1440)
- [x] No horizontal overflow at any width - `document.documentElement`
      `scrollWidth === clientWidth` at 390/768/1440 (checked
      programmatically; the horizontal testimonial strip's own
      `overflow-x` is correctly contained within the page, doesn't leak).
- [x] Bento grid (Services) stacks correctly - single column with the
      featured "Avaliacao fisica" cell first on mobile (as authored: `.bento
      { grid-template-columns: 1fr }` below 768px, DOM order already puts
      `featured: true` first); at 768px+ becomes `repeat(3, 1fr)` with the
      featured cell spanning `grid-column: 1/3; grid-row: 1/3` - confirmed
      visually at both 768 and 1440, matches the intended 2x2 feature +
      surrounding secondary cells.
- [x] Horizontal scroll-snap testimonial strip affordance (risk item #2) -
      confirmed correct on mobile: `.testi-card { flex: 0 0 82% }` below
      640px leaves an 18%-wide visible slice of the next card at the
      viewport edge, a clear "there's more" affordance, not a dead-end
      single card. Screenshotted directly - the next card's avatar and
      blockquote edge are genuinely visible, not just implied by code.
- [x] Nav, hero, about, FAQ, process/contact sections all reflow correctly
      at all 3 widths - no clipped text, no orphaned CTAs, sticky rails
      (`testi-rail`, `faq-rail`) behave correctly at 768px+ only, correctly
      absent (normal flow) below that.
- [x] Touch targets >=44px - CTA buttons (hero, contact) 44px+ via
      `CtaButton.astro`'s `min-height: 44px`; FAQ `<summary>` still 44px
      (carried from the prior pass's fix). The nav CTA was the exception -
      see Issue R1 below (found and fixed this pass).

## 3. Contrast (risk item #1) - computed via Chromium `getComputedStyle` + WCAG relative-luminance formula, not eyeballed
| Pair | Colors | Ratio | Verdict |
|---|---|---|---|
| White text on dark-forest (testimonials h2, contact h2) | `#fff` on `#142016` | 16.83:1 | Pass (AAA) |
| Muted-dark body text on dark-forest (testi-context, contact-body, footer) | color-mix (~`#b8bcb9`) on `#142016` | 8.78:1 | Pass (AAA) |
| Dark ink on accent-green (bento featured cell, CTA buttons, timeline dot, nav CTA) | `#142016` on `#2f9e52` | 4.91:1 | Pass (AA) |
| Accent-green on dark-forest (testi-stat-number "+10 anos", about-credentials bullet) | `#2f9e52` on `#142016` | 4.91:1 | Pass (AA; also qualifies as large text) |
| Hero eyebrow: accent-green text on sage | `#2f9e52` on `#e4f2e8` | 2.96:1 | Fail (needs 4.5:1; text is 14.4px/700, doesn't qualify for the 3:1 large-text exception) - see Issue R2, fixed this pass. |
| Logo-mark decorative glyph (aria-hidden) on white nav | `#2f9e52` on `#fff` | 3.42:1 | N/A - `aria-hidden="true"` decorative brand mark, not text content; WCAG text-contrast doesn't apply. Not flagged. |

The design-direction doc explicitly worked out the dark-on-green button pair
(documented ~5.5:1, measured 4.91:1 - close enough to be the same color-mix
rounding, not a discrepancy worth chasing) but never checked the inverse
case (accent-green as text on the light sage tint), which is where the one
real failure was.

## 4. Scroll-driven decorative effects (risk item #3)
Checked via `CSS.supports()` + `getComputedStyle` on `.hero-seam`,
`.hero-accent-bar`, `.scroll-progress`, both with and without
`reducedMotion: 'reduce'` context emulation (Playwright's Chromium 153 in
this environment supports both `animation-timeline: view()` and
`animation-timeline: scroll(root)`, so the real-feature path was exercised,
not just the fallback).

- [x] Normal motion: `.hero-seam` and `.hero-accent-bar` both bind
      `animation-timeline: view()` correctly, and `.scroll-progress` binds
      `animation-timeline: scroll(root)` correctly (computed `transform`
      tracked real scroll position, e.g. `scaleX(0.0507)` at ~5% down the
      page). No half-applied/broken `@supports` state - the feature-query
      branch is fully live in this Chromium version.
- [x] `prefers-reduced-motion: reduce` (emulated via Playwright context,
      confirmed visually via screenshot too): `animationName` computes to
      `none` on all three elements, and every fallback lands in its
      documented final state - hero seam's full diagonal clip-path at full
      opacity, scroll-progress bar shown fully filled (a static "complete"
      bar rather than a broken partial one - a deliberate, reasonable
      design choice for reduced-motion users, not a bug), and (after Issue
      R3's fix) the accent bar's tilt.
- [x] Issue R3 (found and fixed this pass) - see below: the accent-bar's
      scroll-timeline keyframes were overriding, not composing with, its
      static `rotate(-1.5deg)` base transform, silently flattening the
      "highlighter" tilt to 0 degrees on every browser that supports
      `animation-timeline: view()` (i.e. most current Chromium/Edge
      traffic, arguably the majority of real visitors) - reduced-motion and
      non-supporting-browser users were seeing the correct tilted bar;
      supporting-browser users were not. Confirmed via computed `transform`
      matrix before/after (identity matrix -> `rotate(-1.5deg)`-equivalent
      matrix) and via screenshot.

## 5. Hero headline "voce" spacing fix - re-verified from a fresh build, not trusted from the fix report
Per the task's explicit instruction not to trust the prior session's fix
report: read `HeroSection.astro`'s source directly, ran a fresh
`npm run build`, and inspected the raw compiled HTML byte-for-byte:
```
O treino se adapta a <span class="accent-highlight" ...><span class="hero-accent-bar" ...></span><span class="accent-highlight-text" ...>voce</span></span>. Nao o contrario.
```
The space between `a` and `<span>` is present in the compiled output (Astro
preserves the `{' '}` expression's literal space), and the desktop
screenshot confirms it visually: "a voce" renders as two separate words with
normal spacing, not "avoce." Fix holds in a fresh build/server restart.

## 6. Touch targets, tap highlights, focus-visible (risk item #6 + `mobile-native` baseline)
- [x] `-webkit-tap-highlight-color: transparent`, `touch-action: manipulation`,
      `user-select: none` + `-webkit-touch-callout: none` on
      `a, button, summary, [role="button"]` - present in `shared/styles/base.css`,
      applies globally, still correct for this rebrand.
- [x] `:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px }`
      - confirmed live via keyboard `Tab` trace in Playwright: nav CTA ->
      hero CTA -> testimonial strip (Chromium's native scroll-container tab
      stop, a genuine accessibility positive for the horizontal carousel -
      keyboard users can reach and scroll it) -> FAQ `<summary>` items,
      every stop rendering a visible 2px accent-green outline with a 2px
      offset.
- [x] `overscroll-behavior-x: contain` on `.testi-strip` correctly prevents
      the horizontal carousel drag from chaining into the browser's
      edge-swipe back/forward gesture, without blocking normal page scroll
      (no `overscroll-behavior: none` on `html`/`body`, which is correct -
      this is a normal scrolling document, not an app shell with its own
      pull-to-refresh conflict; adding it would be unnecessary).
- [x] Native `scroll-snap-type: x mandatory` / `scroll-snap-align: start` for
      the testimonial carousel - no hand-rolled JS gesture, so no
      `touch-action` override needed (matches `mobile-native`'s own
      guidance: prefer native scroll-snap over `touch-action` + custom JS
      when the carousel doesn't need a custom gesture).
- [x] No `<input>`/`<form>` elements on the page (WhatsApp-link only) - the
      16px-input-zoom and `inputmode` checks don't apply.
- [x] `theme-color` (risk item #7): `<meta name="theme-color" content="#2f9e52">`
      confirmed in the built HTML, correctly forwarded via `index.astro`'s
      `pageThemeColor` export -> `[slug].astro` -> `BaseLayout`. Single
      value (no light/dark split) is correct - this site has no dark-mode
      variant, so a `prefers-color-scheme`-split `theme-color` pair would
      be inventing a theme that doesn't exist.
- [~] Not verified on real hardware - sticky-hover edge cases, the exact
      feel of `animation-range` on a real device's scroll physics (already
      flagged as an open item in `project-state.md`), and actual iOS/Android
      tap-delay behavior all require a physical device per `mobile-native`'s
      own rules; Chromium/Playwright emulation cannot reproduce them.

## 7. Semantic HTML / heading hierarchy / alt text (impeccable audit.md dimensions)
- [x] Heading order: one `<h1>`, then `h2`s for every major section, `h3`s
      correctly nested only under the Services `h2` (one level, no skips).
- [x] All 6 images have descriptive, non-generic Portuguese `alt` text (no
      change from the prior pass - rebrand didn't touch copy).
- [x] `<main>`, `<header>` (Nav), `<footer>` landmarks present; FAQ uses
      native `<details>/<summary>` (correct semantics, no ARIA needed).

## Issues Found This Pass
| # | Issue | Severity | Fixed? |
|---|---|---|---|
| R1 | Nav CTA rendered with no button styling - transparent background, ~21.6px tall (fails the 44px touch-target minimum), oversized flat horizontal padding. Root cause: `shared/components/Nav.astro` hand-rolls an `<a class="cta-button cta-button--primary nav-cta">` instead of rendering `<CtaButton>`; Astro scopes component `<style>` blocks per source file, so `CtaButton.astro`'s background/color/min-height/padding rules never apply to markup written in a different file, even with matching class names - only the client's global (non-scoped) `tokens.css` override (`border-radius`, `padding-inline`) bled through, producing a half-styled, mostly-invisible button. This affects any future client that uses `Nav`'s `cta` prop, not just this one. | High (touch-target failure + primary CTA in the persistent nav rendering as plain unstyled text) | Yes - added the missing `display/align-items/min-height/padding-block/border-radius/background/color/font-weight/text-decoration` declarations directly to `Nav.astro`'s own scoped `.nav-cta` rule (self-sufficient, doesn't depend on cross-file class matching), plus an `:active { transform: scale(0.97) }` press-feedback rule for parity with `CtaButton`'s own tap feedback (found via the `mobile-native` pass). Verified: computed `background-color: rgb(47, 158, 82)`, `height: 44px`, screenshot shows a correct green pill matching the hero/contact CTAs. |
| R2 | Hero eyebrow text ("PERSONAL TRAINER EM LONDRINA/PR") - accent-green on sage - measured 2.96:1, fails WCAG AA (needs 4.5:1 at this size/weight). | Medium (WCAG AA violation, real content not decorative) | Yes - `HeroSection.astro`'s `.hero-eyebrow` color changed to `color-mix(in srgb, var(--color-accent) 70%, var(--color-forest) 30%)`, measured 4.71:1. Scoped to this one selector; `--color-accent` itself and every other usage (CTA buttons, bento, testimonial stat, which all pass already) are untouched. |
| R3 | Scroll-driven accent-bar's `@keyframes hero-accent-reveal` animated only `scaleX()`, which (via `animation-fill-mode: both`) replaces the element's entire `transform` for the whole scroll range, silently dropping the base `rotate(-1.5deg)` tilt on every browser supporting `animation-timeline: view()`. Reduced-motion and non-supporting browsers showed the correct tilted bar; the majority-traffic supporting-browser path showed a flattened, untilted bar. | Medium (visual-only regression on the design's signature decorative detail, affecting most real traffic) | Yes - `tokens.css` keyframes now include `rotate(-1.5deg)` in both the `from` and `to` transform values, so the tilt survives the animation instead of being overwritten. Verified via computed `transform` matrix (now matches the reduced-motion fallback's matrix) and a before/after screenshot. |
| R4 | `--color-cream` (`#fbf9f4`) is defined as a token explicitly commented "nav bg" in `tokens.css` and named as the nav background in `design-direction.md`, but is never actually applied anywhere - `.nav-header` has no `background` declaration at all, so the nav renders on the page's plain white instead of the intended cream tint. This is a known, already-flagged open item (`project-state.md`'s "Open Questions" listed it as an "approximate-hex flag needing confirmation"), but the actual gap is more fundamental than an approximate hex value - the token isn't wired to any element. | Low (visual fidelity only - `#fbf9f4` vs `#ffffff` is a very subtle difference, not a contrast or usability issue) | Not fixed. `Nav.astro`'s `<header class="container nav-header">` is itself the centered, max-width-constrained container - simply adding `background: var(--color-cream)` to `.nav-header` would only tint the centered content width, not the full viewport width, leaving a visible seam at the true page edges on wide viewports. Wiring this correctly needs a small structural change (an outer full-bleed wrapper) that's a deliberate layout decision, not a safe one-line QA patch under this pass's scope. Recommend a follow-up dev-phase task, not blocking launch. |
| R5 | Screenshot artifact: a small black rounded toolbar with 4 icons appears at a fixed viewport-relative position (bottom-center-ish) in several Playwright screenshots. Confirmed not part of the page - the raw source image (`hero-senhora.webp`) has no such element, and the artifact's position is fixed relative to the browser viewport across different scroll offsets and page heights (consistent with a Chromium-internal overlay, not page content). | Process note | Not a page defect - flagging so the CRO reviewer isn't confused if they see the same artifact in any handed-off screenshots. |

All fixes in this pass applied directly (small, well-defined CSS changes,
matching this project's established pattern), each individually re-verified
with a clean `npm run check` + `npm run build` and a targeted Playwright
re-check (computed styles and/or screenshot) before moving to the next fix.
Final full-pass re-check after all fixes: `npm run check` (0/0/0),
`npm run build` (clean), real-scroll Playwright screenshots at all 3
breakpoints with zero console errors.

**Outstanding before CRO/launch sign-off:**
- ~~R4 (nav background token gap)~~ - **fixed post-QA by main session**:
  `Nav.astro` now wraps the header in a `.nav-bar` div carrying
  `background: var(--nav-bg, transparent)` (transparent by default for
  every other client, opt-in via a token), and `tokens.css` sets
  `--nav-bg: var(--color-cream)` for this client. Verified via computed
  style (`rgb(251, 249, 244)`, exact match) and screenshot.
- Real-device confirmation of `animation-range` feel and general touch
  behavior (already an open item in `project-state.md`, unchanged by this
  pass - Chromium/Playwright emulation cannot substitute for hardware per
  `mobile-native`'s own rules).

## Conversion Review — 2026-09-15 Rebrand

**Method note:** the `cro` subagent correctly refused to fabricate a visual
review twice in a row — first because `claude-in-chrome` won't connect in
this environment (consistent with this project's entire history), then
because a session-level agent-registry caching issue meant a just-added
`Bash` tool grant to `.claude/agents/cro.md` didn't take effect for a
freshly spawned instance of that agent within the same session (confirmed
the file on disk was correct; the running agent's actual tool list wasn't).
Rather than burn a third attempt on the same caching issue, the main
session ran this review directly: invoked the `cro-review` skill, launched
Chromium via Playwright with real scroll simulation (not naive `fullPage`),
and viewed the resulting screenshots at 1440px and 390px before writing
anything below — this is a real visual review, not a source-code inference.

1. **Value proposition clarity:** Clear, not buried. The combined claim
   (mechanism + spine specialization + 50+ framing) sits in the Hero's
   subheadline paragraph directly under the H1, fully within the first
   viewport at both 1440px and 390px. The bold treatment (diagonal seam,
   bleed photo, accent-highlight bar on "você") draws the eye *toward* the
   headline rather than competing with it — the highlight bar in particular
   does real work by anchoring attention on the personalization pivot word,
   which strategy.md ranks as the top messaging-hierarchy item. No
   degradation from the visual boldness.

2. **Testimonials discoverability:** Confirmed adequate on both platforms,
   for different reasons. Mobile: the horizontal strip's card width (82% of
   viewport) leaves a clear ~18% peek of the next card at the screen edge —
   a strong, standard "swipeable" visual cue, verified in a cropped
   screenshot. Desktop: `overflow-x: auto` with no scrollbar-hiding CSS
   means a native horizontal scrollbar renders at the bottom of the strip
   (confirmed via computed style: `overflow-x: auto`, `scrollbar-width:
   auto`, `scrollWidth` 1085px vs `clientWidth` 757px, i.e. genuinely
   overflowing) — a familiar, standard affordance for a mouse-only desktop
   user, not just the peek. **Minor, non-blocking suggestion:** the peek
   alone is a subtler cue than the mobile case for a desktop user who
   doesn't immediately look at the scrollbar; a light right-edge fade-mask
   gradient would make "there's more" even harder to miss, but this is
   polish, not a fix — the strip is functionally and visually discoverable
   as-is.

3. **Services bento grid — featured cell primacy:** Reads as primary, not
   decorative. The "Avaliação física" cell is the largest element in the
   section (2×2, solid accent-green fill, positioned first/top-left), with
   the strongest color contrast against the five white/bordered cells
   around it. This is unambiguous visual hierarchy, not just size variation
   — a visitor's eye goes there first. No finding here; this is working as
   designed.

4. **CTA hierarchy across nav/hero/final section:** No competing-CTA
   problem. All three CTA instances (nav "Marcar avaliação", Hero "Marcar
   avaliação gratuita", final section "Marcar avaliação") are the identical
   green pill style, pointing to the identical `wa.me` action — this reads
   as one action made conveniently available at three natural points (top
   of page, after the pitch, at the close), not as three different asks
   competing for attention. This matches the general pattern of repeating
   one dominant CTA at intervals rather than diversifying it. No finding.

5. **Overall audience fit — the central tension this rebrand had to walk:**
   **Verdict: it holds.** The boldness lives entirely in composition and
   shape (asymmetry, the diagonal Hero seam, the bento grid, the dark/light
   section alternation) — not in color loudness (the palette is the same
   natural, muted green/sage/forest system the client's own reference site
   already validated with a 50+ audience) and not in copy tone (still
   credential-first, still uses "Isso soa familiar?"-style gentle
   recognition language, still hedges the two flagged unverified claims
   rather than overselling). The real photography of actual mature subjects
   throughout keeps the page grounded in who it's actually for, regardless
   of how confident the surrounding shapes are. Bricolage Grotesque itself
   reads as rounded/friendly rather than aggressive or youth-skewing (it's
   not a sharp-edged or condensed "streetwear" display face). Nothing
   observed in the rendered page suggests this reads as built for a
   different, younger audience than strategy.md targets — the bold
   /trust-sensitive tension this rebrand set out to walk is successfully
   resolved by putting the boldness on the *structural* axis and leaving
   color/tone/imagery on the *calm* axis, exactly as `design-direction.md`
   intended.

**No blocking findings from this pass.** The one non-blocking suggestion
(#2, the testimonial-strip fade-mask) is optional polish, not a fix.
