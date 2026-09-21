# Project State — Jonatas Hotts (`jonatas-hotts`)

## Phases
| Phase | Status | Owner | Last updated |
|---|---|---|---|
| 1. Scaffold | done | create-client script | 2026-09-17 |
| 2. Discovery | done | main session | 2026-09-17 |
| 3. Research | done | researcher | 2026-09-17 |
| 4. Brand DNA | done | brand-intelligence | 2026-09-17 |
| 5. Competitor research | done | researcher | 2026-09-17 |
| 6. Strategy | done | strategist | 2026-09-17 |
| 7. Minimum-page audit / IA | done | ux-architect | 2026-09-17 |
| 8. Copy | done | copywriter | 2026-09-17 |
| 9. Visual research | done | visual-researcher | 2026-09-17 |
| 10. Visual direction | done | ui-design | 2026-09-17 |
| 11. Implementation | done | developer | 2026-09-17 |
| 12. Responsive pass | done | developer | 2026-09-17 |
| 13. QA | done | qa | 2026-09-17 |
| 14. CRO review | done | cro | 2026-09-17 |
| 15. Iteration | done | main session | 2026-09-17 |
| 16. Final validation | done | main session | 2026-09-17 |
| 17. Deploy-ready | done | main session | 2026-09-17 |
| 18. Post-mortem | done | main session | 2026-09-17 |
| 19. Client feedback: add real photos | done | main session | 2026-09-17 |
| 20. Client feedback: mais dinâmica/animações | done | main session | 2026-09-17 |
| 21. Client feedback: fotos aleatórias/tortas | done | main session | 2026-09-17 |
| 22. Client feedback: inovar estrutura das seções | done | main session | 2026-09-17 |

## Decisions Log
- 2026-09-17: Client scaffolded.
- 2026-09-17: Discovery filled from client answers — CTA is WhatsApp
  "agendar avaliação", location deferred to research.
- 2026-09-17: Research confirmed location as Londrina, PR (Instagram bio,
  WhatsApp area code 43, business registry address, local directories) and
  that he trains both in-person and online. See
  research/company-intelligence.md for full sourcing.

## Open Questions / Blockers
- Pricing/package structure — not found anywhere public. Copy must mark as
  PROOF NEEDED or omit; do not invent numbers.
- CREF certification number — legally required in Brazil, near-certainly
  exists, but not publicly displayed. Needs client confirmation before any
  certification claim is used.
- No verifiable testimonials/review counts found — page must not fabricate
  social proof.
- Faith/religious identity line ("Jesus é o caminho") appears in his
  Instagram bio — real, but prominence on the landing page is a brand/taste
  call, not yet decided. Revisit in brand-DNA phase.
- Research used WebFetch (no live browser) for Instagram data — two
  independent fetches agreed, but a manual spot-check is worth doing before
  finalizing bio-derived copy claims.
- Whether to surface a stated niche/specialization (competitors do; Jonatas
  doesn't have one declared publicly) — carry into strategy phase.
- Marcos Brito's (competitor) CREF-number claim unconfirmed — low priority,
  only matters if positioning directly against him.

## Decisions Log (cont.)
- 2026-09-17: Brand DNA — verbal tone judged casual/meme-format/direct
  (explicitly NOT the mid-formal register used for prior client Talita
  Lopes); positioning confirmed as general fitness/conditioning coach, not
  elite/competition; faith line ("Jesus é o caminho") judged a minimal,
  tasteful personal aside, not a campaign theme — pending client
  confirmation. No visual color/type system could be extracted (no browser
  access) — ui-design phase builds fresh from tone, not an extracted
  palette.
- 2026-09-17: Competitor research — local Londrina category convention is
  WhatsApp-only CTA, no public pricing, no testimonials (matches Jonatas's
  own pattern — not a gap to fix). Credentials are the de facto proof
  substitute locally. National online-coaching brands publish pricing/
  reviews but that model doesn't fit Jonatas's unverified-proof situation —
  don't imitate it. GuiaFix's "16 competitors avg 5.0 stars" is actually
  1-review-each, thin signal, noted as correction to earlier research.
- 2026-09-17: Copy written (5 sections, pt-BR, casual voice). No pricing/
  CREF/testimonials fabricated — marked PROOF NEEDED inline where relevant.
  Real WhatsApp number (43) 99981-3940 used; faith-line aside placed only
  in the contact section, minimal per brand-dna.md's judgment.
- 2026-09-17: Visual direction locked — "sticker" language (chunky rounded
  shapes, 3px outline, hard-offset shadow, no blur), WhatsApp-green CTA
  (role-locked, never decorative), amber as the personality color, Archivo
  Black + Manrope Variable. Deliberately structurally distinct from prior
  client Talita Lopes (sharp containers/pill CTA/soft shadow there vs.
  sticker/hard-shadow here).
- 2026-09-17: Implementation done — `npm run check` and `npm run build`
  both pass. Nav height measured per-client (76px) for the full-bleed hero
  calc. Verified via Playwright (computed styles, not screenshots): no
  horizontal overflow at 3 breakpoints, all `.enter` elements reach
  opacity 1, all `.idle-float` animations run with staggered per-card
  timing and none conflict with `.enter`/hover transforms, reduced-motion
  collapses idle-float correctly. Fixed a real shared-component bug found
  via measurement: `CtaButton.astro` had no `gap` between icon+label
  (scoped fix in this client's tokens.css, shared file untouched). No
  fabricated proof appears on the page. No real photo/video of Jonatas was
  available — hero/training sections use color-block + typography per
  design-direction.md's documented fallback, not stock standing in for him.
- 2026-09-17: QA pass — technical gate clean, no overflow/motion/
  content-integrity issues at any breakpoint. Found one real bug: caption
  chips in TrainingSection.astro rendered invisible (white-on-white) due to
  a CSS specificity tie between the component's `.caption-chip` rule and
  tokens.css's `.card-sticker` rule, with tokens.css winning document-order
  ties since it's always inlined last. Fixed by scoping the selector to
  `.caption-chip.card-sticker` (bumps specificity, no more tie). Rebuilt
  clean. Full findings in qa/post-mortem.md.
- 2026-09-17: CRO review — value prop, offer clarity, and objection
  coverage (pricing, first-contact friction) all land well; caption-chip
  fix confirmed visually. One gap found: "Como é treinar com o Jonatas"
  section referenced "os vídeos dele" with no way to actually see them.
  Fixed by linking that phrase to his verified real Instagram
  (instagram.com/jhotts, from research/company-intelligence.md) — makes an
  existing claim checkable instead of adding new unverified content.
  Rebuilt clean. Minor non-blocking note: faith-line cross emoji (✝️)
  showed as a missing glyph in headless Chromium (test-environment font
  gap, not a real bug) — worth a glance on a real device before final
  client sign-off.
- 2026-09-17: Final validation — `npm run check` and `npm run build` both
  pass, `dist/jonatas-hotts/index.html` exists. Page is deploy-ready as a
  static site (see root CLAUDE.md Deployment section) — no CI/deploy config
  written, no specific host requested by the client.
- 2026-09-17: Client feedback after first look ("MT estática", "não tem
  NENHUMA imagem", wants his face on the page for trust) — this overrides
  the earlier no-photo fallback. Sourced 4 real photos directly from his
  own public Instagram (instagram.com/jhotts): a profile portrait and 3
  technique-demo video thumbnails, downloaded via direct CDN URL (found via
  WebFetch on the profile page; claude-in-chrome still would not connect).
  Manually verified all 4 show the same person, consistent with the
  documented content style (technique clips, meme-style captions) — one
  clearly different photo (an unrelated couple, evidently reposted content)
  was found in the same fetch and explicitly excluded, not used. Cropped
  the 3 technique photos with `sharp` to remove each clip's own burned-in
  caption text before use. Saved to
  `clients/jonatas-hotts/assets/images/` (jonatas-perfil.jpg,
  jonatas-treino-1/2/3.jpg). Used real photo (not a photo-of-the-mount
  animated `.enter`), never `[data-hover-lift]`. Rebuilt/rescreenshotted at
  desktop+mobile via throwaway Playwright script: 0px overflow both, one
  caption-wrap bug found and fixed immediately (`width: max-content` was
  missing, text wrapped to 3 lines in the narrow chip). No further
  fabricated content added — only real, sourced imagery.
- 2026-09-17: Client feedback again ("MT estática, faça um planejamento
  para dar dinâmica, animações e efeitos") — planned in plan mode, approved,
  then implemented. Audited every section for motion gaps: the 3 real
  photos (added in the previous round) had zero idle motion (fixed static
  rotate only), StartSection had no idle motion anywhere, contact signature
  row didn't even mount-fade. Closed every gap reusing the existing
  `.idle-float`/`.card-sticker` system (no new dependency, no JS): added a
  3rd DOM node (float layer) inside Hero's and Training's photo frames so
  the real photos now idle-bob without breaking their static tilt (the
  established .enter→static-transform→.idle-float 3-node pattern); added a
  new opacity-only `.idle-glow` breathing utility to `tokens.css` for the
  two ambient glows (opacity-only specifically because `.contact-glow` has
  a static centering `transform` that a scale-based keyframe would have
  silently broken — same animation-conflict class of bug as before); gave
  Start's step-number badges idle-float (they had no existing transform, so
  no restructuring needed) and animated the timeline's dashed connector via
  `background-position` (letting the section's real sequential mechanic
  carry motion instead of building an unneeded JS stepper, which the code
  had already explicitly declined); added `.enter` to the previously
  static contact-signature row; added hover transitions (transition-only,
  no conflict risk) to the Instagram link, phone link, and offer cards.
  **Real bug hit and fixed during implementation**: giving the hero/training
  photo frames `aspect-ratio` with no explicit `width` collapsed them to
  ~6px (border-only) - the new float layer is `position:absolute` so it
  stops contributing intrinsic size to ancestors, and combined with
  `.hero-photo-wrap` relying on `max-width` (not `width`) inside a
  single-column CSS Grid, the whole chain collapsed to zero on all 3
  breakpoints. Fixed by giving `.hero-photo-frame`/`.training-photo-frame`
  explicit `width: 100%` and `.hero-photo-wrap` an explicit `width` (not
  just `max-width`). Caught via direct Playwright measurement (rendered
  0px-wide), not visible from reading the CSS - consistent with this
  project's established "measure, don't assume" QA approach. Verified after
  the fix: 0px overflow at 390/768/1440, every new `.idle-float`/`.idle-glow`
  element confirmed actually animating via `getComputedStyle` (not just
  present in CSS), and full motion shutdown confirmed under
  `reducedMotion: 'reduce'`. `npm run check` + `npm run build` clean.
- 2026-09-17: Client feedback again ("parece que pegou qualquer imagem,
  tudo torto, deixe enquadrado") — valid on both counts. Re-evaluated the
  3 photos actually chosen: the hero one was him sitting mid-video-thumbnail
  looking confused with mostly empty background; one training photo was
  cropped so tight to the caption-removal zone it showed almost nothing but
  ceiling; both plus the third had a deliberate "sticker tilt"
  (`rotate(-2deg)`/`-3deg`/`2.5deg`) that, combined with weak crops, read as
  careless rather than intentional. Fixed properly this time: fetched more
  candidates from the same public Instagram (instagram.com/jhotts, same
  method as before — WebFetch for URLs, direct curl download, PII
  classifier blocked one further WebFetch attempt for MORE urls beyond what
  was already fetched earlier in the session, respected and worked with
  what was already in hand), manually reviewed each for framing (visible
  face, clear context, minimal dead space) before choosing, explicitly
  excluded 2 more irrelevant photos found in the fetch (an unrelated couple
  again, and what looks like his grandmother — personal, not for the
  page). Replaced the hero photo with a straight-on talking-to-camera close
  crop (clear eye contact) and one training photo with him actively
  coaching a real client on a leg-press machine (directly illustrates "como
  é treinar com o Jonatas" instead of an ambiguous solo sitting shot). Kept
  the bench-press photo (was already a reasonable action shot). Removed the
  rotation from all 3 real photo frames entirely (now perfectly straight) —
  kept the tilt only on small decorative badges/caption chips, which read
  as intentional "sticker" styling rather than crooked photos. Updated alt
  text and the training caption ("ajusta a pegada" → "acompanha de perto",
  matching what the new photo actually shows). `npm run check` + `build`
  clean, 0 overflow at all breakpoints, verified visually via Playwright
  screenshots (not just source review).
- 2026-09-17: Post-implementation fix — copy files used em dashes, which
  design-direction.md's Copy-Adjacent Guardrails ban for this client. Did a
  punctuation-only pass across the 5 section .astro files (em dash →
  comma/colon/parentheses/period, no wording changed), then re-ran
  `npm run check && npm run build` — both still pass. Source copy/*.md
  files left as-is (that's the copywriter's deliverable of record); the
  rendered page is now dash-free.
- 2026-09-17: Client feedback again ("continua reta, sem diferença, IMPORTANTE
  INOVAR") — read this as a different problem than the two prior motion
  rounds already solved: the page had real idle motion by this point, but
  `OfferSection` and `TrainingSection` were still structurally identical to
  each other ("heading + paragraph + generic card(s) beside it"), exactly
  the pattern root CLAUDE.md's Motion section names as needing structural
  reinvention, not more decoration, once a client flags a section as
  static/generic a second time. Used plan mode for this one (structural
  change, worth confirming direction before writing code). Rebuilt both
  sections with genuinely different, content-tied mechanisms instead of
  reusing the same card-grid shape twice:
  - `OfferSection`: the 2 static format cards became a segmented toggle
    ("Presencial"/"Online") with a sliding thumb. Picking a format doesn't
    just swap which description shows — it changes the CTA's actual `href`
    to a `wa.me` link with a message pre-filled for that specific format
    (`WHATSAPP_URL_PRESENCIAL`/`WHATSAPP_URL_ONLINE`, new constants in
    `index.astro`, passed down as props). The interaction has a real
    consequence, not just a visual one.
  - `TrainingSection`: the 2 stacked photo cards became an overlapping,
    clickable photo stack (Polaroid-pile style) — click/Enter/Space sends
    the front photo to the back with a smooth shuffle. Vanilla `<script>`,
    same convention as `clients/talita-lopes/src/ContactSection.astro`'s
    `data-stepper` (the only prior JS-interactive precedent in this
    system) — `querySelectorAll` + `data-*` attributes, no framework.
  - Both new interactive pieces respect the project's animation-conflict
    discipline: the shuffle's JS-driven transform lives on a brand-new
    dedicated middle node (`.stack-pos`), never sharing an element with
    `.enter` (outer) or `.idle-float` (inner) — extending the established
    3-node pattern to a 3rd, interaction-driven effect. Both the toggle
    thumb and the stack shuffle use CSS `transition` (click-driven), not
    `animation` (autoplaying) — verified this is not the banned
    scroll-reveal pattern: nothing is hidden until scrolled to, and every
    state change is a direct user click/keypress, never triggered by
    scroll position. Both get `transition: none` under
    `prefers-reduced-motion: reduce` (interaction stays fully functional,
    just instant instead of animated) — confirmed via `getComputedStyle`.
  - **Real bug hit and fixed**: `shared/components/CtaButton.astro` didn't
    forward unknown props (`data-format-cta`, etc.) to the rendered `<a>` —
    Astro components only render what the template explicitly outputs, no
    implicit passthrough. Fixed by adding a `...rest` spread and extending
    `Props` from `astroHTML.JSX.AnchorHTMLAttributes` (additive, no
    existing usage affected — confirmed via `npm run check`, 0 errors
    across all clients). Also caught: `data-href-0`/`data-href-1` don't
    map to `dataset.href0`/`dataset.href1` (a dash before a *digit* isn't
    camelCased per the HTML dataset spec, only a dash before a letter is) —
    renamed to `data-href0`/`data-href1`. Both bugs were silent (no
    console error, attribute just missing/undefined) and only surfaced by
    reading the actual rendered HTML and the real `href` after a simulated
    click, not by reading the source.
  - Verified via Playwright: toggle click updates `aria-hidden` on panels,
    slides the thumb (non-identity `matrix()`), and changes the CTA's real
    `href` attribute; stack click/Enter-key swaps `z-index` and
    `.stack-pos` transform; all 12 `.idle-float` elements still animating
    after both interactions (nothing got stuck); 0px overflow at
    390/768/1440; reduced-motion collapses both new transitions to `0s`
    while keeping them functional and fully disables all idle-float as
    before. `npm run check` + `npm run build` clean.
  - `StartSection`/`ContactSection` deliberately left untouched this round
    — both already have their own distinct mechanism (vertical timeline;
    intentionally-quiet closing signature) from earlier rounds, and
    touching them now risked undoing a previously-reasoned design decision
    rather than fixing an actual gap.
