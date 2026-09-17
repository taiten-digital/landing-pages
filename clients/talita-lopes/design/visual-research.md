# Visual Research — Talita Lopes

## Method note (read before trusting confidence levels below)
`claude-in-chrome` (the tool this skill normally uses for rendered
screenshots) was **unavailable in this environment** — the browser extension
did not connect on repeated attempts. This research therefore still relies on
automated page-fetch tools, not human-eye pixel inspection or a saved
screenshot. However, the fetch used here (`WebFetch`, which retrieves and
renders/parses the actual page HTML/CSS/asset URLs) is a meaningfully better
source than the plain markdown-conversion fetch that produced brand-dna.md's
original "lower-confidence" visual DNA section: it surfaced actual CSS
utility classes, real image file names, and the CDN/hosting path for every
photo, which the original pass did not have. Treat the findings below as
**upgraded-confidence, still not screenshot-verified** — if pixel-exact hex
codes or font names are needed for `visual-direction`, a manual screenshot
pass (or direct CSS/DevTools inspection) is still recommended before locking
tokens.

No new image files could be saved to `assets/moodboard/` for the same reason
(no working screenshot tool in this session). `assets/moodboard/references.md`
lists every tagged reference with its source URL in place of saved image
files; capturing actual screenshots is a follow-up task once browser access
is available.

---

## 1. Client's own imagery — v1 landing page (**Client asset**)

Confirms and sharpens the brand-dna.md flag: the v1 page's photography is
real, custom, and demographically on-target, not a placeholder set.

- **Hosting/provenance signal:** every photo is served from the site's own
  build CDN (`/_astro/` output), with descriptive Portuguese file names tied
  to their section role — `hero-senhora`, `treino-alongamento`,
  `sobre-instrutora-aluna`, `caminhada-acompanhada`, `diferenciais-forca`,
  `hero-treino`, plus three `testimonial-*` headshots. This naming pattern
  (Portuguese, scene-specific, matched 1:1 to page sections) is consistent
  with a commissioned/custom shoot for this exact site, not a stock library
  drop-in — stock assets on Unsplash/Pexels/Shutterstock/etc. would show
  generic numeric IDs or English stock-catalog names instead.
  - **Caveat, don't skip this:** file-naming pattern is strong circumstantial
    evidence, not proof of licensing. Before treating these images as
    reusable in the rebuild, confirm with the client (or whoever built v1)
    that usage rights/model releases were actually secured for a client-owned
    rebuild — don't assert "free to reuse" on naming convention alone.
- **Subject matter, confirmed:** outdoor jogging/walking (mature woman,
  40s–50s, natural light, real outdoor setting), assisted stretching/mobility
  work indoors, trainer-client posture correction close-up, accompanied
  outdoor walk, a celebratory/achievement moment between trainer and client,
  a resistance-band functional-training shot, and three real testimonial
  headshots.
- **Color/layout, confirmed via rendered fetch:** white/off-white background
  (matches brand-dna.md), but the accent color is **teal/turquoise** on CTAs
  and highlights — this is new information; brand-dna.md had flagged the
  accent as "unspecified." Layout is grid-based with a clear funnel
  structure: hero → problem-recognition → about → 5-step numbered process →
  services grid → 3-column testimonials → FAQ accordion → contact footer.
  This matches brand-dna.md's IA description closely and adds the specific
  step-count/column-count detail.
- **Pattern to carry forward:** this photo set is the strongest, most
  differentiated visual asset this client has — real mature-adult bodies in
  real outdoor/training environments, doing exactly the kind of movement
  (walking, stretching, assisted mobility) the spinal-health/50+ positioning
  is about. Nothing else reviewed in this pass (client's own official site,
  or any local competitor) shows this combination.

## 2. Client's own imagery — official site (**Client asset**, weaker)

- **Confirmed:** near-total absence of real photography. The image
  inventory is almost entirely Icons8 stock icon files (`icons8-haltere-64`,
  `icons8-esteira-64`, `icons8-treinamento-funcional-50`, etc.) plus a logo
  PNG and an `oval.svg` profile-photo frame — i.e. even the one placeholder
  clearly intended for a real photo is an empty SVG mask, not a filled
  photograph. This is a stronger confirmation of brand-dna.md's "icon-led,
  almost no real photography" flag than the original text-fetch could give.
- **Color, confirmed:** white/light-neutral background, black text/nav,
  **orange/warm accent** on icons and highlights, **green** WhatsApp CTA
  buttons. This is a third, distinct accent palette from the v1 page's teal —
  another concrete confirmation of brand-dna.md's point #2 (the two
  properties are two different visual systems, not one brand extended
  across two pages).
- **Icons8 is a licensed stock-icon platform**, not free-for-any-use by
  default depending on the license tier purchased — if any of these icon
  files get reused in the rebuild (unlikely, given the recommendation below),
  verify the client's Icons8 license tier first rather than assuming reuse
  rights transfer automatically.
- **Pattern:** confirms the do/don't guidance already in brand-dna.md —
  don't carry the icon-only look forward as the primary visual system.

## 3. Local competitor visual language (**Competitor reference — analysis only, never reuse**)

- **Vêneto Personal Trainer (@veneto.personal)** — confirmed via profile
  fetch: bright, high-contrast gym/studio photography, athletic-looking
  subjects, service-promo posts with bold text-overlay graphics (e.g. "TAF
  POLÍCIA," "100% online via App"). This is generic, energetic
  fitness-marketing visual language — closer to the "no neon, no heavy reds/
  oranges typical of generic fitness marketing" pattern that brand-dna.md
  says Talita's brand deliberately does *not* follow. Useful confirmation
  that staying out of that bright-studio/text-overlay convention is a real
  point of visual differentiation locally, not just a hypothesis.
- **Marcelo Alexandre do Nascimento and Fernando Azevedo (Superprof
  listings)** — **inaccessible for visual review**, both listing pages
  returned HTTP 403 on repeated fetch attempts (consistent with
  competitor-analysis.md's own note that these pages were fetch-blocked).
  Their visual language remains unknown; competitor-analysis.md already
  flags this as a marketplace-template limitation rather than a custom
  branded look, so it's a lower-priority gap — these two compete on
  positioning claims in a template listing, not on a designed page.
- **Pattern across the broader confirmed-local set** (Paulo Alves, Fabiana
  Teixeira, Ali/treinecomali, W. Bernardo, per competitor-analysis.md):
  Instagram-native fitness content only, no dedicated landing page for any
  of them. This reinforces competitor-analysis.md's differentiation point —
  simply *having* a designed, funnel-structured page (which the v1 build
  already is) is itself a local visual/presentation advantage, independent
  of photography choices.

## 4. Local market conventions worth following or breaking

**Worth breaking from (local default):**
- Bright, saturated, studio-lit "gym energy" photography (Vêneto's pattern,
  and the generic-fitness-marketing look brand-dna.md already warns against)
  — Talita's outdoor/natural-light, mature-subject photography is a
  deliberate, working departure from this and should stay the visual anchor.
- Bold text-overlay promo graphics stacked on photos (also Vêneto's pattern)
  — nothing in either of Talita's own properties uses this device; don't
  introduce it in the rebuild just because it's a common local social-media
  convention.

**Worth following (local default, no reason to break it):**
- WhatsApp-first CTA, consistent across every local competitor found and
  both of Talita's own properties — not a differentiator either direction,
  keep it as-is.
- No published pricing — universal locally per competitor-analysis.md,
  consistent with both of Talita's properties; no visual "pricing table"
  section is needed or expected by this market.

**Category benchmarks, non-local (`Inspiration` — public imagery, not
licensed for reuse, structural/IA reference only):**
- Fernanda Souza (fernandasouzapersonal.com, Florianópolis) — already noted
  in competitor-analysis.md for leading with specific outcome testimonials
  before credentials. Treat any of her page's actual images purely as
  structural inspiration for section *order*, never as source imagery — she
  is a real competitor-adjacent business elsewhere in Brazil, not a stock
  library.
- Guilherme Jungles / "Coach da Coluna" (Curitiba) — named-method branding
  device ("#VIDA100DOR") is an IA/positioning idea worth noting, not a
  visual asset; no imagery from this site should be reused.

## 5. Recommendation for `visual-direction`

- Treat the v1 page's photography as the confirmed visual anchor (pending
  the licensing check above), teal as the working accent-color starting
  point (also pending a real hex-value/screenshot check), and the v1 page's
  section-by-section IA as the layout skeleton.
- Discard the official site's icon-driven system and Icons8 assets as the
  primary look; they can stay as a supplementary icon set only if a real
  license check clears them, and only for minor UI iconography, not as a
  photography substitute.
- Do not pull any imagery from Vêneto, Fernanda Souza, or Guilherme Jungles
  into the actual rebuild — competitor and inspiration references are for
  pattern analysis only.
- Recommend a follow-up screenshot pass (once `claude-in-chrome` or
  equivalent is available) before `visual-direction` locks exact hex codes
  or typefaces — this pass upgraded confidence on accent colors, layout
  detail, and photo provenance, but did not produce pixel-verified values.

## Sources / fetch log
- https://landing-pages-five-silk.vercel.app/ — WebFetch (rendered HTML/CSS
  parse), 2026-09-15. **Client asset.**
- https://talitalopespersonal.com.br — WebFetch (rendered HTML/CSS parse),
  2026-09-15. **Client asset.**
- https://www.instagram.com/veneto.personal/ — WebFetch, 2026-09-15.
  **Competitor reference.**
- https://www.superprof.com.br/marcelo-alexandre-nascimento-... .html —
  WebFetch attempted, HTTP 403, 2026-09-15. **Competitor reference (visual
  content inaccessible).**
- https://www.superprof.com.br/personal-trainer-londrina-especialista-
  treinamento-envelhecimento-... .html (Fernando Azevedo) — WebFetch
  attempted, HTTP 403, 2026-09-15. **Competitor reference (visual content
  inaccessible).**
- fernandasouzapersonal.com — referenced from competitor-analysis.md, not
  re-fetched this pass (non-local, category benchmark only). **Inspiration.**
- guijungles.wixsite.com/coachdacoluna — referenced from
  competitor-analysis.md, not re-fetched this pass (non-local, category
  benchmark only). **Inspiration.**
- `mcp__claude-in-chrome__*` — attempted twice, browser extension not
  connected in this environment; no screenshots captured this pass.
