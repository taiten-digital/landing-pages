# Visual Research — Jonatas Hotts

Inputs read: `brand/brand-dna.md`, `strategy/strategy.md`,
`research/competitor-analysis.md`. References gathered and tagged in
`assets/moodboard/references.md` (no image files saved — see that file's
note on why; everything below is text-described via `WebFetch`, not
screenshot-verified, since `claude-in-chrome` did not connect this
session). Treat every visual claim below as **directional**, same
confidence caveat brand-dna.md already applies to its own visual section —
confirm against real client-supplied exports or a live browser pass before
`visual-direction` locks exact hex/type values.

## 1. Client's own imagery cues

Consistent with brand-dna.md and confirmed again by a fresh WebFetch read
of instagram.com/jhotts this session:
- **Setting:** real gym floor (dumbbells, racks, treadmills), some
  outdoor clips — not a studio, not stock.
- **Subject framing:** demonstration-led — close-ups on exercise form
  (grip, posture, movement), not posed portraiture. Authority is shown
  through "watch me do this correctly," not through a styled headshot.
- **Text-overlay device:** short, white/bright, casual sans-serif
  Portuguese captions layered on clips — meme-format, built for fast
  social reading, not a designed lower-third or branded template.
- **No consistent color grade, logo lockup, or template graphic** across
  posts — organic individual-practitioner content, not agency-managed.
  This is the strongest, most repeated finding across both the original
  brand-DNA pass and this session's re-check: **there is no existing
  visual system to extract hex/type from — direction has to be built
  fresh from tone**, not lifted from the feed.
- **Implication for the landing page:** if the client can supply real
  clips/photos (per strategy.md's "Proof to Use" — demonstrated over
  asserted competence), the page's imagery should preserve this same
  candid, demonstration-led quality rather than being replaced with
  polished stock photography of a generic trainer — that would
  contradict both the brand's actual visual reality and this project's
  content-integrity rule against substituting stock for a specific real
  person's identity.

## 2. Competitor visual conventions

Two visually distinct tiers exist in the researched set (per
`competitor-analysis.md`), and the split matters for direction:

**Local Londrina tier (Talita Lopes, Vêneto) — thin/generic-professional
visual production:**
- Talita Lopes: clean white background, black text, flat monochrome
  icon-led service grid, no photography at all. Professional but generic
  — reads closer to a template than a personality.
- Vêneto: gym-equipment photography, bright/high-contrast tones, bold
  legible text overlays functioning as service-flyer copy rather than
  personality-led content.
- **Neither uses real demonstration/personality content the way Jonatas's
  own Instagram already does** — this is a genuine opening: Jonatas's
  actual raw material (candid coaching footage) is more distinctive than
  what any local competitor's site currently shows, if the landing page
  is built to use it rather than default to icons-and-stock like Talita
  Lopes's site.
- Talita Lopes is a direct local rival on top of being visually generic —
  doubly a reason not to borrow her icon-grid, no-photography layout.

**National online-coaching tier (Treino Ninja, Consultoria Personal) —
full commercial-proof visual grammar:**
- Dark or light high-production backgrounds, real before/after
  photography, named-staff headshots, star-rating badges, trust/security
  badges, tiered pricing cards, high-contrast repeated CTA buttons.
- This entire visual grammar (badges, before/afters, rating stars) is
  **off-limits for Jonatas right now** — strategy.md and brand-dna.md are
  explicit that none of that proof exists yet, and visually implying it
  (via a badge-shaped graphic, a star icon, a fake-looking testimonial
  card) would misrepresent the actual proof state even without a false
  number attached. If a design element *looks* like a review badge or
  before/after slot, it reads as a proof claim regardless of whether text
  backs it up.

**Category-wide pattern worth keeping:** WhatsApp-styled CTA convention
(green-adjacent, message-bubble affordance) is universal across every
local competitor and matches Jonatas's own existing behavior — this is a
convention to follow, not break from, per strategy.md's "Primary CTA"
section.

## 3. Design inspiration (structure/rigor only — see moodboard tags)

- **Duolingo's design system** (via styles.refero.design) — not
  fitness-relevant by content, but a useful **method** reference: a
  casual/playful brand can still run on strict role-based color rules
  (one accent reserved for a specific meaning, e.g. "progress"), a locked
  radius scale, and an explicit do/don't list, rather than "energetic"
  meaning scattered, undisciplined color use. Translated for Jonatas:
  pick one or two accent colors and give each a single explicit job (for
  example, reserve the WhatsApp-CTA color *only* for the CTA, never as
  decorative fill elsewhere) instead of a generically "energetic gym
  palette" (reds/oranges/neon) applied without hierarchy — brand-dna.md
  already warns against assuming a "typical gym" palette without
  evidence, and this gives ui-design a disciplined way to pick something
  original instead.
- **inspora.design** — browsed for category structure (Web, Branding,
  Product, Motion, Illustration, 3D, Print); no fitness-specific entries
  surfaced via this pass's search. Flagged as a worthwhile manual
  follow-up for ui-design under "Web"/"Branding" once a rough direction
  is chosen, not exhausted here.

## 4. Direction implied for `visual-direction` (observations, not token decisions)

These are patterns for the next phase to act on, not chosen values:

1. **Photography/imagery should stay candid and demonstration-led** if
   real client footage becomes available — this is Jonatas's actual,
   distinctive visual asset, and no competitor (local or national) is
   using anything like it. Do not default to stock-photo "trainer with
   client" imagery; per this project's content-integrity rule, any stock
   used must never be presented as Jonatas or a specific real client, and
   its license must be noted inline wherever it's used.
2. **Avoid both extremes observed in the competitor set:** don't go
   icon-and-whitespace generic (Talita Lopes — also a direct local
   rival, doubly avoid), and don't borrow the proof-stack visual grammar
   (badges, before/afters, star ratings — Treino Ninja/Consultoria
   Personal) that Jonatas can't honestly back up yet.
3. **Color/type has no existing system to extract** — confirmed again
   this session. Build fresh from tone (casual, direct, a little
   playful-but-competent) using a disciplined, role-based approach
   (Duolingo reference) rather than an assumed "gym palette." Keep the
   WhatsApp-green CTA convention that's category-standard and already
   the client's own behavior.
4. **Motion, once implementation starts, should lean toward the energetic
   end of this system's `MOTION_INTENSITY` dial** (per root CLAUDE.md) —
   confident load-triggered entrances, hover feedback with real
   personality — to match the "energetic, informal, demonstration-led"
   brand read, while staying within this project's house rule of no
   scroll-triggered content-hiding animation.

## 5. Open gaps for the next phase

- No pixel-verified colors/typefaces exist anywhere in this research —
  `visual-direction` is choosing genuinely new values, not confirming
  extracted ones. State this plainly to the client if asked why the page
  doesn't "look like" the Instagram feed: the feed never had a designed
  system to match.
- Real client photo/video assets are still unconfirmed (strategy.md flags
  this as a real risk) — if none arrive before implementation, section 3
  of the page ("what it's like to train with him") will need to lean on
  copy/typography/layout energy instead of imagery, which should be
  flagged then, not assumed solvable now.
