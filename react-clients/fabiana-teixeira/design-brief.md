# Design Brief — Fabiana Teixeira (`fabiana-teixeira`)

Filled live with the user during the Design Planning Interview (Phase 3 of
`.claude/skills/create-client/SKILL.md`), after `client-brief.md` is done.
Every decision here should trace back to something the client actually said
or approved — don't default to a generic template.

## Aesthetic Direction & References
No existing logo/brand colors. Client chose: dark background + vibrant
pink/coral accent ("fitness feminino" direction, fits the emagrecimento
niche). Motion intensity: "confiante e presente" (continuous, visible motion
on every section, not subtle/static). Hero follows the house full-bleed
pattern (see `talita-lopes`/`don-leon-barbearia-londrina` Hero.tsx) — the
client's own `hero-deadlift.png` (1441×737, landscape) is already a good
aspect-ratio match, so no asset-constraint deviation needed here.

## Design Tokens
Ready to paste into `src/index.css`'s `@theme {}` block.
```css
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
@import "tailwindcss";

@theme {
  --color-bg: #120A10;
  --color-bg-alt: #1B1015;
  --color-surface: #201319;
  --color-border: rgba(255, 255, 255, 0.08);

  --color-accent: #FF4D79;
  --color-accent-2: #FF8FA3;
  --color-accent-fg: #1B0A0F;

  --color-text: #F7EDF0;
  --color-text-muted: #B8A0A8;

  --font-display: 'Bebas Neue', system-ui, sans-serif;
  --font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;

  --radius-card: 1.25rem;
  --radius-full: 999px;
}
```
Default section padding: `py-16 sm:py-20`. `Serviços` and `FAQ` both sit on
`--color-bg-alt` back to back — give `FAQ` a `border-t border-white/5`
divider so that transition reads as deliberate, not a dead gap.

## Motion Language Plan
One row per section. Each section's mechanism is genuinely distinct — no two
read as the same decoration with different content. See `motion-playbook`
for the exact recipes.

| Section | Animation mechanism |
|---|---|
| Nav | Scroll-driven chrome: transparent at `scrollY=0`, opaque/blurred panel after scrolling; mobile menu slides/fades in independent of scroll state. |
| Hero | Full-bleed `hero-deadlift.png` background with slow continuous Ken Burns zoom + gradient scrim; headline/CTA fade+slide up on mount (not scroll-triggered). |
| Sobre | Scroll-linked parallax on `back-workout.png` (subtle vertical offset via `useScroll`/`useTransform`, continuously tied to scroll position — not a reveal, photo is visible immediately) + gradient-text emphasis on the specialization phrase. |
| Serviços | Card grid with continuous idle float, per-card phase offset (different `duration`/`delay` per index). |
| FAQ | Accordion where the real expand/collapse mechanic carries the motion (`AnimatePresence` + height animation) — no decorative motion bolted on beside it. |
| Contato | Pulsing ambient glow (large blur, transparent-before-edge gradient) behind the WhatsApp CTA button, plus `whileHover`/`whileTap` feedback on the button itself. |
| Footer | Static — no animation mechanism needed for a footer's link/legal content. |

## Final Section List
- **Nav** — site chrome, standard.
- **Hero** — first impression, full-bleed photo per house style.
- **Sobre** — introduces Fabiana and the emagrecimento specialization in her
  own confirmed voice (motivador e acolhedor); uses `back-workout.png` since
  it's a real, client-confirmed training photo (not a posed portrait, so
  framed as action/atmosphere, not a captioned headshot).
- **Serviços** — presencial + online are the two confirmed service
  modalities; a dedicated section justifies itself since that's the core
  offer split the client explicitly named.
- **FAQ** — client-requested in place of "Como Funciona" to answer practical
  questions (presencial vs. online, how to start) without needing
  unavailable proof (testimonials, credentials) to fill the page.
- **Contato** — WhatsApp is the confirmed, real conversion channel.
- **Footer** — standard close, Instagram + WhatsApp links.
No Depoimentos/testimonials section — client confirmed no verifiable proof
exists yet (see client-brief.md's Real Proof section); do not add one later
without actual testimonials to show.

## Open Questions
None blocking Phase 4. Presencial gym name, CREF/years of experience, and
online consultancy format remain open per client-brief.md and are
deliberately not stated anywhere in copy.
