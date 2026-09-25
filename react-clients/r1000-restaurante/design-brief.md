# Design Brief — R1000 Restaurante (`r1000-restaurante`)

Filled live with the user during the Design Planning Interview (Phase 3 of
`.claude/skills/create-client/SKILL.md`), after `client-brief.md` is done.
Every decision here should trace back to something the client actually said
or approved — don't default to a generic template.

## Aesthetic Direction & References
- User brief: "vibe de comida de verdade", must not scare the client.
- User chose **"Brasa escura"**: warm charcoal background, the logo's own
  orange (#E83A04, sampled from the logo file) only on CTAs/focal points,
  cream text. This mirrors the client's existing identity (dark Instagram
  promo art, printed menu in charcoal + orange + cream/gold), so it reads as
  "their brand, better finished", not a new look.
- Food photos are the hero of the page: big, warm, generous plates. Real,
  honest, no glossy fine-dining feel. Plain casual Portuguese copy.
- Hero follows the house pattern (full-bleed photo, Ken Burns, gradient
  scrim, text overlay), user confirmed "o hero sempre naquele esquema".
- Hard rules from the user: NO prices, NO specific promotions/values (only
  "tem promoção"), NO photos of people.

## Assets (all in `src/assets/images/`, none has alpha)
| File | Size | Content | Use |
|---|---|---|---|
| `hero-marmitex-churrasco.webp` | 1200x1440 | Real client photo, overhead marmitex: linguiça, frango assado, carne, fritas, farofa, salada, plants on the side. Portrait; crop by `object-cover` with `object-[center_55%]` so the plate center stays in frame on wide screens (a 16:9 band of it was previewed and looks good). | Hero background |
| `prato-churrasco.webp` | 339x392 | Real client photo: carne assada fatiada, linguiça, arroz, fritas, farofa, salada de repolho. SMALL: never render wider than ~340px CSS. | Cardápio: Churrasco |
| `prato-costela.webp` | 880x1140 | Real client photo: costela assada, linguiça, fritas, farofa, couve. | Cardápio: Costela |
| `prato-frango-assado.webp` | 485x593 | Real client photo: frango assado (coxa), carnes, linguiça, macarrão, farofa. Chicken is on the right: `object-[70%_center]`. SMALL: ≤ ~480px CSS. | Cardápio: Frango assado |
| `feijoada-stock-pexels.webp` | 1200x1400 | **TEMPORARY STOCK**, user asked for a generic but tasty feijoada until they send a real one. Pexels photo 34234283 by Beatriz Haiana, Pexels License (free commercial use, no attribution required). Must carry that license comment next to its import and a `// TODO: trocar pela foto real da feijoada do R1000` note. | Cardápio: Feijoada |
| `logo-r1000.png` | 150x150 | Real logo, round badge on WHITE square background, low-res. Render only small (≤ 56px), inside a `rounded-full bg-white` circle with `object-contain` so the white square reads as their round badge. | Nav, Footer |

## Design Tokens
```css
@import url('https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@600;700&family=DM+Sans:wght@400;500;700&display=swap');
@import "tailwindcss";

@theme {
  --color-bg: #161412;
  --color-bg-panel: #211d1a;
  --color-bg-raised: #2b2622;
  --color-fg: #f5ede1;
  --color-fg-muted: #b9ada0;
  --color-accent: #e83a04;
  --color-accent-hover: #ff5a1f;
  --color-accent-fg: #ffffff;
  --color-ember: #f3a64b;
  --font-display: 'Zilla Slab', Georgia, serif;
  --font-sans: 'DM Sans', system-ui, sans-serif;
  --radius-card: 1.25rem;
}
```
- `font-display` (Zilla Slab) is loaded at 600 and 700, so `font-bold` /
  `font-semibold` on display headings is fine (it's NOT single-weight). Use
  `leading-[1.1]` or looser on display headings.
- `--color-ember` is a warm amber for secondary emphasis only (gradient
  text `from-accent to-ember`, small highlights). Accent stays reserved for
  CTAs and one focal point per section. Eyebrow labels use `text-fg-muted`
  or `text-ember`, not accent.
- Section padding: `py-16 sm:py-20`. Backgrounds in order: Hero (photo) →
  Cardapio `bg-bg` → Pedir `bg-bg-panel` → OndeEstamos `bg-bg` → Footer
  `bg-bg-panel` with `border-t border-white/5`.
- Every `<button>` and click target: `cursor-pointer`.
- No em dash (—) in any rendered copy.

## Shared contracts (every section)
- Anchor ids: `#cardapio` (Cardapio), `#pedir` (Pedir), `#onde-estamos`
  (OndeEstamos). Hero has id `inicio`.
- WhatsApp link: `https://wa.me/5543991383162?text=Ol%C3%A1%2C%20R1000!%20Quero%20fazer%20um%20pedido.`
  Displayed number: `(43) 99138-3162`. Phone: `(43) 3066-2648`, link `tel:+554330662648`.
- iFood link: `https://www.ifood.com.br/delivery/londrina-pr/r1000-restaurante-jardim-imagawa/ab6a8ae3-794f-4a36-9d59-d9301bb9da2b`
- Instagram: `https://www.instagram.com/r1000restaurante/` · Facebook:
  `https://www.facebook.com/R1000restaurante/`
- Address: Av. José Del Ciel Filho, 750, Jardim Imagawa, Londrina, PR,
  CEP 86080-780. Maps directions:
  `https://www.google.com/maps/dir/?api=1&destination=Av.%20Jos%C3%A9%20Del%20Ciel%20Filho%2C%20750%2C%20Londrina%20PR`
- Hours: terça a domingo, 10h30 às 15h; segunda fechado.
- `--nav-height`: Nav publishes it on `document.documentElement` from a
  ResizeObserver on the bar row; Hero consumes `var(--nav-height,4.5rem)`.
- Icons: `react-icons` / `lucide-react` (install is done in Final Assembly;
  builders may import from `lucide-react` and `react-icons/fa6`).

## Motion Language Plan
| Section | Animation mechanism |
|---|---|
| Nav | Scroll-driven chrome: transparent at top, opaque `bg-bg/90 backdrop-blur` after scrolling (condition `scrolled \|\| menuOpen`); animated mobile menu open/close with AnimatePresence height |
| Hero | Ken Burns slow zoom on the photo + rising ember sparks (small orange/amber dots drifting upward and fading, like brasa, each with its own duration/delay/x); staggered mount entrance of text |
| Cardapio | Real mechanic: auto-advancing dish showcase. A big photo stage crossfades (AnimatePresence, slight scale) between the 4 dishes, with a selectable dish list whose active item shows a filling progress bar; clicking a dish selects it and pauses auto-advance |
| Pedir (CTA) | Measured marquee ticker strip (dish names, copies computed from viewport width) above a CTA panel; CTA button with a slow breathing accent glow |
| OndeEstamos | Live mechanic: real "Aberto agora / Fechado" status computed from the current time in `America/Sao_Paulo`, pulsing status dot, today's row highlighted in the hours list; map card idle float |
| Footer | Slow ambient ember glow pulse along the top edge; link hover underline slide |

## Final Section List
1. **Nav**: logo badge + links (Cardápio, Promoções → `#pedir`, Onde estamos) + "Pedir no WhatsApp" CTA. Needed on every page.
2. **Hero**: first impression, full-bleed real plate. Headline from their own bio: "Todo dia é dia de churrasco" (+ "e feijoada"). CTAs: WhatsApp (primary), iFood (secondary). Info line: marmitex de churrasco e prato feito, terça a domingo, 10h30 às 15h.
3. **Cardapio**: the user's main ask, "o cardápio bem bonito, tipo os principais pratos". 4 dishes: Churrasco, Costela, Frango assado, Feijoada. No prices. Note line: "Servimos marmitex e prato feito."
4. **Pedir**: the CTA section the user asked for, and the only place promotions are mentioned: "Tem promoção toda semana", without saying which or values; send to WhatsApp / Instagram to check.
5. **OndeEstamos**: user asked for "horário de funcionamento e local". Hours, live status, address, embedded Google Map, Como chegar, phones.
6. **Footer**: contacts, socials, iFood, small copyright.

No Testimonials (user: leave Google reviews aside), no About/team (no photos of people, no confirmed story), no Pricing (no prices).

## Open Questions
- Real feijoada photo (stock placeholder in the meantime).
- Larger logo file.
- Whether marmitex sizes (Mini/Média/Grande) are current: left OFF the page until confirmed.
