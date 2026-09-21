# QA & Post-Mortem — Jonatas Hotts

## Breakpoint Checklist (mobile / tablet / desktop)
Tested via a throwaway Playwright script (claude-in-chrome did not connect
after two attempts, consistent with root CLAUDE.md's documented history in
this environment) against npm run preview at 390x844 (mobile), 768x1024
(tablet), 1440x900 (desktop).

- [x] Typography scales, no overflow
- [x] Images sized/lazy-loaded appropriately
- [x] CTA reachable and legible at every width
- [x] Touch targets >= 44px on mobile
- [x] Nav usable on mobile
- [x] Full-bleed hero fills exactly one viewport with the nav — measured
      `.nav-bar` height (76px, matches the `--nav-height-measured` token
      exactly) plus `.hero-section` height at each breakpoint: mobile
      768+76=844 (viewport 844), tablet 948+76=1024 (viewport 1024),
      desktop 824+76=900 (viewport 900). Exact match at all three, per root
      CLAUDE.md's full-bleed hero rule.
- [x] WhatsApp CTA links work and use the real number — every CTA
      (`a[href*="wa.me"]`, 5 instances across nav/hero/start/contact)
      resolves to `wa.me/5543999813940` with a pre-filled greeting message;
      cross-checked against `copy/05-contato-final.md`'s confirmed
      `(43) 99981-3940` — exact match, sourced from linktr.ee/jhotts per
      company-intelligence.md.
- [x] No motion runs under `prefers-reduced-motion: reduce` — verified via
      `context({ reducedMotion: 'reduce' })` plus `getComputedStyle` on
      every `.enter` and `.idle-float` element (35 total): all report
      `animationName: none`, `animationDuration: 0s`, `opacity: 1` (static,
      fully visible, no animation).
- [x] No animation gets stuck at a bad computed-style value — one real bug
      was found (see Issues table below: `.caption-chip` background lost a
      cascade tie, not a stuck-animation bug in the strict sense, but the
      same "two rules, one property, wrong one wins" failure family root
      CLAUDE.md's Common CSS Pitfalls section warns about) and has since
      been fixed (`.caption-chip.card-sticker` selector, rebuilt clean).
      All `.enter`
      elements were checked for `opacity: 0` computed style: the only ones
      found "stuck" (hero badges and caption chips' `.enter` wrappers, at
      mobile/tablet widths) are false positives — those wrappers sit inside
      `display: none` containers below the 900px breakpoint by design
      (`.hero-badges`/`.training-captions` are desktop-only), so the mount
      animation never running is irrelevant since the element is not
      rendered either way. Confirmed not stuck at the breakpoint where they
      are visible (1440px): all report `opacity: 1`.

## Technical
- [x] `astro check` passes — 0 errors, 0 warnings, 0 hints (25 files).
- [x] `astro build` succeeds, no console errors — build completes in
      ~1.2s; `page.on('console'/'pageerror')` listeners during the
      Playwright pass logged nothing at any breakpoint.
- [x] Links valid, forms functional — no forms on this page (by design,
      single WhatsApp CTA). All 5 `wa.me` links verified (see above). Nav
      anchor links (`#oferta`, `#treino`, `#contato`) all resolve to real
      section ids present in the DOM.
- [x] SEO meta / OG tags present — `<title>`, meta description, canonical
      (`/jonatas-hotts`), `theme-color`, `og:title`/`og:description`/
      `og:type`, `lang="pt-BR"` all confirmed in rendered HTML via
      `pageTitle`/`pageDescription`/`pageLang`/`pageThemeColor` exports.
- [x] Accessibility: contrast, alt text, labels, focus states — all
      decorative icons carry `aria-hidden="true"` (shared `Icon.astro`);
      every CTA has a real visible text label alongside its icon (no
      icon-only buttons). Computed WCAG contrast ratios spot-checked:
      hero eyebrow 4.61:1, muted body text ~9.5:1, step-number text on
      amber ~9.6:1, contact-area text on charcoal ~8:1, contact-signature
      (smallest/quietest text on the page) ~5.1:1 — all clear AA (4.5:1).
      `:focus-visible` outline present globally (`shared/styles/base.css`).
      Heading order is clean (single h1 → h2 per section → h3 in cards, no
      skipped levels).
- [x] Content-integrity scan (no fabricated proof/claims) — full rendered
      page text captured and read end to end: no testimonials, no review
      counts/ratings, no certifications/CREF number, no fabricated stats
      anywhere. Matches page-architecture.md's explicit audit (all of
      those were deliberately cut for lack of verification). The one
      proof-adjacent line on the page ("Nos videos dele, da pra ver esse
      jeito de ensinar na pratica...") describes tone/style, not a
      specific verifiable fact. Faith-line aside present exactly once, in
      Contact only, small and non-prominent, per brand-dna.md's sanctioned
      placement. Real phone number is shown as visible text, not hidden
      behind a generic label.

## Conversion Review (CRO)
Reviewed the built page at `/jonatas-hotts` (`npm run dev`) via a throwaway
Playwright script (claude-in-chrome again failed to connect) — full-viewport
screenshots at 390x844 (mobile) and 1440x900 (desktop), scrolled through the
whole page at each, cross-checked against `strategy/strategy.md` and
`strategy/page-architecture.md`.

### What's working
1. **Value prop lands in the first viewport, no scroll required, at both
   breakpoints.** Hero headline + subhead names the audience (emagrecer,
   condicionamento, voltar a treinar), states both delivery formats
   (presencial/online), and puts the primary CTA immediately in view —
   matches Core Promise and Messaging Hierarchy #1.
2. **Offer-clarity section is the strongest section on the page, and it's
   the one strategy.md says has to be.** "Pra quem é esse treino" answers
   "is this for someone like me?" directly ("Não é treino de atleta, nem
   preparação pra competição") and the two format cards give genuinely
   different, concrete descriptions (who comes to you and adjusts your form
   live vs. what the online plan/check-in actually includes) instead of
   leaving "in-person or online" as an unexplained toggle — this is the
   exact gap strategy.md names as the page's single biggest lever, and it's
   realized in the actual copy, not just planned for.
3. **Pricing objection handled exactly per strategy, not left silent or
   evasive.** Start section states plainly "não tem tabela fixa, porque o
   treino é montado pro que você precisa" — answers "what does it cost"
   honestly without inventing a number and without leaving the visitor to
   wonder if it's an oversight.
4. **"Messaging a stranger" friction gets a real, two-part answer, not just
   a promise.** Start section states outright "a primeira mensagem não é
   compromisso nenhum," and — beyond copy — the WhatsApp CTA's pre-filled
   message ("Vi sua página e quero agendar uma avaliação," set in
   `index.astro`) removes the harder sub-friction of "what do I even say
   first," which is a concrete reduction in first-contact cost, not just an
   assurance that it's low-stakes.
5. **CTA hierarchy is clean.** One action, one label ("Agendar avaliação"),
   at hero, end of "Como começa," and Contact (plus nav, plus a bare
   phone-number fallback link in Contact, same destination) — no competing
   action anywhere, matches strategy's explicit repetition-over-second-CTA
   call.
6. **The caption-chip bug QA flagged is confirmed fixed** — chips render
   with the intended dark background/white text at 1440px+ in this pass.

### What needs a fix before shipping
1. **Training section dangles an unverifiable trust claim, in the one
   section built to carry the page's hardest objection.**
   (`TrainingSection.astro`, "Como é treinar com o Jonatas" — strategy.md's
   designated substitute for a testimonials section, addressing "is this
   legit / is he qualified?".) Its third paragraph says "Nos vídeos dele,
   dá pra ver esse jeito de ensinar na prática" — but nothing on the page
   links anywhere near it (checked the whole client `src/` tree: zero
   instagram/linktree references in the actual markup, only in code
   comments). A visitor skeptical enough to want to check that claim has no
   path to do so without leaving the page and searching for his handle
   themselves — which reintroduces the exact doubt this section exists to
   remove. The fix isn't more copy or a stat: `research/
   company-intelligence.md` already has a verified real account
   (`instagram.com/jhotts`, confirmed via WebFetch and cited with an access
   date) — hyperlink "nos vídeos dele" (or add a small adjacent "ver no
   Instagram" link) to that real, already-researched URL. This is distinct
   from the "Instagram feed embed / follower count" item
   page-architecture.md deliberately cut — that was a follower-count/embed
   widget decision; this is just making an existing sentence's claim
   actually checkable with one honest link, not adding a new content block.
2. **Minor, non-blocking:** the faith-line's cross emoji (✝️) renders as a
   missing-glyph box in headless Chromium in this environment (no
   color-emoji font installed here). Flagging only because it's the one
   part of the page not yet confirmed on a real browser/OS — every
   mainstream platform ships a system emoji font so this is unlikely to
   reproduce for an actual visitor, and the line is explicitly
   non-load-bearing per brand-dna.md — but worth a 10-second real-device
   glance before final sign-off since it's the literal last line on the
   page.

No other objection from strategy.md's list goes unaddressed on the rendered
page, and no fabricated proof, stat, or testimonial appears anywhere —
content-integrity holds on this pass too.

**Fix applied (orchestrator, post-review):** "Nos vídeos dele" in
`TrainingSection.astro` is now a link to the verified real
`instagram.com/jhotts` (styled, underlined, opens in a new tab) — rebuilt
clean (`npm run check` + `npm run build`).

## Issues Found
| Issue | Severity | Fixed? |
|---|---|---|
| `.caption-chip`'s dark background never renders, so its text is invisible (white-on-white) at 900px and up. `clients/jonatas-hotts/src/TrainingSection.astro` line 104 sets `.caption-chip { background: var(--color-charcoal); color: var(--color-bg); }` (intended: dark chip, white text, the sticker-caption device from design-direction.md). It loses a CSS specificity tie to `clients/jonatas-hotts/src/tokens.css` line 194's `[data-client=jonatas-hotts] .card-sticker { background: var(--color-bg); ... }` (also applied to the same element via `class="caption-chip card-sticker"` in TrainingSection.astro lines 50-51). Both selectors compute to identical specificity (0,2,0: one class plus one attribute-or-class each), so the cascade falls back to document order — and tokens.css is inlined into head after the page's bundled component CSS (confirmed by inspecting the built HTML: the link to the component CSS chunk appears before the inline style block holding the tokens.css content), so `.card-sticker`'s white background always wins, leaving the chip a blank white pill with invisible white text on top. Confirmed via getComputedStyle: backgroundColor rgb(255,255,255), color rgb(255,255,255), text content present ("corrige a sua postura" etc) but unreadable. Verified visually with a zoomed screenshot after letting the mount animation fully settle (ruling out an animation-timing false positive) — the chips render as empty rounded outlines. Suggested fix (one line; I have no Edit/Write access to source in this session): raise the selector specificity so it is not order-dependent, e.g. change TrainingSection.astro line 102 from `.caption-chip { ... }` to `.caption-chip.card-sticker { ... }` (two classes = 0,3,0, beats `.card-sticker`'s 0,2,0 regardless of source order). This only affects the desktop/tablet-900px-plus caption strip, which is `aria-hidden="true"` decorative content (the same phrases already appear in the paragraph text beside it) — a visual-polish bug, not a content-access bug, but still worth fixing before CRO review since it currently reads as a broken/unfinished component in a screenshot. | High (visual — broken decorative component) | Yes — confirmed fixed in CRO review pass (`.caption-chip.card-sticker` selector now in source, chips render dark-bg/white-text correctly at 1440px). |
| Hero badges (Presencial/Online stickers, top-right of hero at 900px and up) appeared washed-out/pale in an initial full-page screenshot. Investigated as a possible second instance of the caption-chip bug — it was not: getComputedStyle showed correct values (opaque white bg, 3px dark border, hard offset shadow) and a re-screenshot after letting the `.enter` mount animation fully settle (the first screenshot only waited 100ms post-scroll, not enough for the staggered enter-5/enter-6 delay) rendered them correctly. No code fix needed — noted only so this is not re-flagged as a duplicate of the caption-chip bug above. | N/A (false positive, ruled out) | N/A |

## Post-Mortem (on completion)
- What worked: the full-bleed hero math (`--nav-height-measured: 76px`) is
  exact at all three breakpoints — a real, `getBoundingClientRect()`-
  measured value rather than an assumed constant, and it shows. Reduced-
  motion handling is complete and correctly gated everywhere it was
  checked (`.enter`, `.idle-float`, CtaButton's pulse). Content-integrity
  is clean — nothing fabricated anywhere on the rendered page.
- What failed: the `.card-sticker` shared utility class (tokens.css) and a
  component's own local style collided silently because tokens.css is
  architecturally guaranteed to be the last stylesheet in document order
  (by design, per root CLAUDE.md's Routing section — so a client's token
  overrides win without any shared file changing). That is correct and
  desirable for custom-property overrides, but it has a side effect the
  architecture does not call out: any class-selector rule in tokens.css
  (not just a `--custom-property`) also always wins a specificity tie
  against a component's own scoped styles, regardless of which one is
  more specific in intent. Worth a one-line callout in root CLAUDE.md's
  Common CSS Pitfalls section for future clients reusing card-sticker-
  style shared classes with a locally-overridden property.
- Missing capabilities/tools: claude-in-chrome again failed to connect
  (two attempts this session) — consistent with the documented history.
  The Playwright fallback worked once run from the repo root (a throwaway
  script placed in the OS temp scratchpad directory fails to resolve
  node_modules via ESM import; running it from the repo root directly,
  then deleting it, was the fix — worth a note in docs/mcp-registry.md if
  this recurs).
- Useful research sources: none beyond this client's own research/ and
  copy/ docs, used only to cross-check the WhatsApp number.
- Reusable components/patterns discovered: the specificity-tie failure
  mode above is a reusable lesson for any future client pairing a shared
  sticker/card utility class with a locally-colored variant of the same
  element (e.g. a dark chip using an otherwise-light card treatment) —
  always co-locate the class combination (bump specificity) rather than
  relying on declaration order across separate stylesheets.
- Improvements for the next client: flag the tokens.css cascade-order
  gotcha in root CLAUDE.md so it is not rediscovered per-client; keep
  using a real Playwright script run from the repo root (not the temp
  scratchpad) for any client whose QA needs the node_modules-resolving
  fallback path.

## Project-Level Post-Mortem (orchestrator, end of pipeline)
- What worked: research handled a near-total absence of client-provided
  input (only an Instagram handle, a CTA preference, and "you'll find the
  city") well by cross-referencing independent signals (bio text, WhatsApp
  area code, business registry, local directories) rather than guessing —
  every downstream phase (brand, strategy, copy, design) then had solid
  ground to build on. The project's content-integrity rule held end to end:
  zero fabricated pricing/testimonials/certifications made it into the
  shipped page despite a client with literally no public proof stack.
- What failed / friction: `claude-in-chrome` did not connect for any agent
  that tried it this session (research, visual-research, QA, CRO) —
  consistent with root CLAUDE.md's documented history; every one of those
  phases fell back to WebFetch/WebSearch or a throwaway Playwright script
  without being told to explicitly. This is now a firmly established
  pattern across two client projects, not a one-off.
- Reusable pattern found (promoted to root CLAUDE.md's Common CSS Pitfalls
  section — see that file): `shared/design-system/tokens.css` is always
  inlined last in document order so a client's `--custom-property`
  overrides win, but that also makes any *class-selector* rule inside
  tokens.css win cascade ties against a same-specificity rule in a
  component's own `<style>` block, regardless of which was "meant" to win.
  A shared class like `.card-sticker` combined with a component-local
  color variant needs the combined selector (`.local-class.card-sticker`)
  co-located, not declaration order relied on.
- Client folder is deploy-ready: `npm run check` and `npm run build` pass,
  `dist/jonatas-hotts/index.html` exists. See root CLAUDE.md's Deployment
  section for hosting options — no specific platform was requested, so no
  CI/deploy config was written.
