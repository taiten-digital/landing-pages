# Design Brief: JEA Imóveis (`jea-imoveis`)

## Aesthetic Direction & References
Premium, calm, trustworthy; "arquitetura + conversa". Warm ink (`deep`) and bone (`bg`) with a camel/bronze accent taken from José Eduardo's blazer. Hero follows the house look: full-bleed photo, slow Ken Burns, gradient scrim, left-aligned stacked text (see `react-clients/caixa-aqui/src/sections/Hero.tsx`, which uses the same photo and the portrait `<picture>` crop). Fonts: Fraunces (display, 400-600, editorial serif that suits a founder-led practice) + Manrope (body/UI). Fraunces is a variable font, so `font-medium` is fine (not a single-weight font); keep headings `leading-[1.12]` or more. No eyebrow/chip/badge above the Hero H1. Never an em dash in rendered text. Every `<button>` has `cursor-pointer`. Grids with variable cards: `items-start`.
Accent: on DARK use `text-accent`/`bg-accent` ONLY for the primary CTA, ONE emphasis word per heading and one focal detail per section. On LIGHT use `text-accent-ink` for that same role. Eyebrows, icons, secondary labels: `text-sand-muted` (dark) / `text-ink-muted` (light). Stars: `text-star`. Plain WhatsApp-colored buttons: `bg-whatsapp text-deep`.
Logo: `logo-jea-claro.png` on dark, `logo-jea-escuro.png` on light. Aspect 986:260 (3.8:1). Nav height `h-7 sm:h-8`. alt="JEA Imóveis".
José Eduardo's portrait is a real circle photo: never stretch, never put a light box behind it; on dark sections use a thin accent ring + soft radial halo of `accent` (large blur, transparent well before the edge).

## Design Tokens
Already applied in `src/index.css` (do not edit): `bg #F6F1E9`, `surface #EDE5D8`, `card #fff`, `ink #1A1612`, `ink-muted #675F55`, `line #DDD2C0`, `deep #14110D`, `deep-2 #1E1A15`, `deep-line #34302A`, `sand #F1E7D6`, `sand-muted #B9AE9C`, `accent #D2A15F`, `accent-hover #E0B476`, `accent-fg #14110D`, `accent-ink #8A5A22`, `star #FBBC04`, `whatsapp #25D366`, `--font-display` Fraunces, `--font-sans` Manrope. Use them as Tailwind utilities (`bg-deep`, `text-sand`, `border-deep-line`, `font-display`).
Section padding `py-16 sm:py-20`. Container `max-w-6xl mx-auto px-4 sm:px-6`. Cards `rounded-2xl`/`rounded-3xl`, buttons `rounded-full`.
Background per section: Nav `deep` → Hero photo+deep → Serviços `bg` → Sobre `deep` → Como funciona `surface` → Avaliações `bg` → Contato `deep` → Footer `deep` (same as Contato: Footer root gets `border-t border-white/5`).

## Shared files (import, never duplicate)
`src/content.ts`: `EMPRESA`, `CONTATO`, `waLink(text)`, `WA_PADRAO`, `CREDENCIAIS`, `NOTA_CREDENCIAIS`, `GOOGLE`, `SERVICOS`, `PASSOS`, `AVALIACOES`. Display the phone as `CONTATO.telefone`. Icons from `lucide-react` / `react-icons` (`FaWhatsapp`, `FaInstagram`, `FcGoogle`); never hand-draw SVGs.

## Cross-section contracts
- Section ids: Hero `inicio`, Serviços `servicos`, Sobre `sobre`, Como funciona `como-funciona`, Avaliações `avaliacoes`, Contato `contato`. Nav and Footer link ONLY to these (`#servicos`, `#sobre`, `#como-funciona`, `#avaliacoes`, `#contato`).
- Nav: `fixed top-0 inset-x-0 z-50`, white logo. Transparent at `scrollY=0`; header background is opaque `bg-deep/95 backdrop-blur` when `scrolled || menuOpen`. Publishes `--nav-height` on `document.documentElement` from a `ResizeObserver` on the bar row (not the header); reference `react-clients/jonatas-hotts/src/sections/Nav.tsx`. Mobile dropdown animates opacity + y only (NEVER height auto).
- Hero consumes `var(--nav-height, 4.5rem)`: `min-height: calc(100svh - var(--nav-height))` with a `vh` fallback, and the Hero begins under the fixed nav (so total = one viewport). Mobile: photo-led, text anchored to the bottom, the primary CTA's `getBoundingClientRect().bottom <= innerHeight` at 375x812 and 390x700. Hero photos in `public/images/` (reference with `${import.meta.env.BASE_URL}images/hero-casa-entardecer-{1200,2400,mobile}.jpg`): 1200w, 2400w and a 900x1600 portrait crop served via `<picture><source media="(max-aspect-ratio: 3/5)">`. Photo: modern house at night, house on the RIGHT, dark lawn and trees on the left (good for text), mobile uses `object-[70%_center]`.
- Floating WhatsApp button lives in `Footer.tsx`; hides (opacity-0, translate, `inert`) while `#inicio` is intersecting (IntersectionObserver, threshold 0.3). Reference `react-clients/dc-consorcios/src/sections/Footer.tsx`.
- Card photos (import from `../assets/images/`): `card-comprar.jpg` (dusk house, pink sky), `card-vender.jpg` (white modern house, pool, daytime), `card-investir.jpg` (night entrance, stone, wood door). Order matches `SERVICOS`. Opaque JPG, portrait ~3:4. Stock only: never caption them as a JEA property. Each import carries a license comment (see client-brief).
- No stats block, no counters, no addresses, no map, no hours.

## Motion Language Plan
| Section | Animation mechanism |
|---|---|
| Nav | Scroll-driven chrome (transparent → opaque) + mobile dropdown via `AnimatePresence` (opacity + y) |
| Hero | Photo entrance gated on image load (`onLoad` → `decode()`: curtain/clip reveal + scale 1.08 → 1) then continuous slow Ken Burns; headline lines stagger in on mount (not on scroll); gradient-text emphasis on one word |
| Serviços | Expanding photo accordion: 3 tall panels, the active one grows (`flex-grow`/layout) and reveals title + checklist + CTA; others show a vertical title; desktop hover/focus/click, mobile tap, stacked vertically on mobile |
| Sobre | Circular portrait with a slowly rotating dashed accent ring, a soft breathing halo, and credential cards with idle float (per-item phase offsets); no scroll-hiding |
| Como funciona | Scroll-linked vertical timeline: `useScroll` on the section drives a line fill (`scaleY`) and lights each step's node as the line passes it; all text visible from the start |
| Avaliações | Auto-scrolling marquee of review cards, seamless loop with measured copies (`Math.ceil(viewport / track) + 1`), pause on hover/focus, static grid under `prefers-reduced-motion` |
| Contato | Short form (name, interest, message) that opens WhatsApp with a composed message; pulsing ring around the WhatsApp icon + slow breathing ambient glow behind the card |
| Footer | Floating WhatsApp FAB with a periodic ping ring (about every 4s); hides while `#inicio` is on screen |

## Final Section List
1. **Nav**: logo + anchors + WhatsApp always at hand.
2. **Hero** (`#inicio`): the promise ("Você faz os planos. A gente cuida do imóvel."), WhatsApp CTA, CRECI/CREA line.
3. **Serviços** (`#servicos`): Comprar / Vender / Investir, each with its own prefilled WhatsApp message and a photo.
4. **Sobre** (`#sobre`): José Eduardo Almeida (real portrait) and his registered credentials, footnoted as his own claims. No years/numbers.
5. **Como funciona** (`#como-funciona`): lowers the barrier to the first message (assumed flow, flagged).
6. **Avaliações** (`#avaliacoes`): 4 real Google reviews + 4,5 / 26 cited once, honestly labeled.
7. **Contato** (`#contato`): WhatsApp form + Instagram + phone.
8. **Footer**: brand, contacts, links, floating WhatsApp.
Not included: property listings (none provided), Alugar, FAQ, stats, map/address (UNKNOWN), Londrina section.

## Copy direction (builders may adjust microcopy, NEVER invent facts, numbers, neighborhoods, prices, years or promises)
- Hero H1: "Você faz os planos. A gente cuida do imóvel." (emphasis word: "planos" or "imóvel", one only). Paragraph: "Compra, venda e investimento em imóveis em Londrina, com José Eduardo Almeida à frente da JEA." CTAs: "Falar no WhatsApp" (primary) and "Como funciona" (secondary, anchor). Credentials line under the CTAs: "CRECI F-44892 · CREA 23113-D".
- Serviços H2: "Por onde você quer começar?"
- Sobre H2: "Quem cuida do seu imóvel". Facts only: José Eduardo Almeida, JEA Imóveis, Londrina, CRECI F-44892, CREA 23113-D, active on Instagram @jeaimoveisldn. Credential footnote required.
- Como funciona H2: "Do primeiro 'oi' às chaves".
- Avaliações H2: "O que dizem no Google". Show "4,5 · 26 avaliações no Google" once. Sub-note: "Avaliações públicas no Google, transcritas como publicadas." Initials avatars only.
- Contato H2: "Vamos conversar sobre o seu imóvel?" Show the phone and Instagram. Do NOT show an address, e-mail or hours.
