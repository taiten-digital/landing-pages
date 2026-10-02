# Design Brief: Flávio Ferreira Negócios Imobiliários (`flavio-ferreira`)

## Aesthetic Direction & References
Premium, calm, investment-minded. Navy + gold taken from the agency's own Instagram posts ("Soluções Inteligentes em Investimentos Imobiliários": navy background with a thin gold roof line; "Quem somos?" in gold). Off-white light sections for breathing room. Hero follows the house look: full-bleed photo, gated entrance, slow Ken Burns, gradient scrim, left-aligned stacked text (reference `react-clients/jea-imoveis/src/sections/Hero.tsx`). Fonts: **Tenor Sans** (display; thin high-contrast sans that echoes the "FERREIRA" wordmark; SINGLE-WEIGHT, never `font-bold`/`font-semibold`/`font-medium` on `font-display`) + **Poppins** 400/500/600 (body/UI; same family as his Instagram posts). Headings `leading-[1.15]` or more, uppercase only for small labels. No eyebrow/chip/badge above the Hero H1. Never an em dash in rendered text. Every `<button>` has `cursor-pointer`. Grids with variable cards: `items-start`.
Accent: on DARK use `text-accent`/`bg-accent` ONLY for the primary CTA, ONE emphasis word per heading, and one focal detail per section. On LIGHT use `text-accent-ink` for that same role. Eyebrows, icons, secondary labels: `text-sand-muted` (dark) / `text-ink-muted` (light). Stars: `text-star`. WhatsApp-colored buttons: `bg-whatsapp text-deep`.
Logo: `logo-flavio-claro.png` (white) on dark, `logo-flavio-escuro.png` (navy) on light. Aspect 433:165 (2.62:1), thin strokes: never render it shorter than `h-10` (40px) or it becomes illegible. alt="Flávio Ferreira Negócios Imobiliários".

## Design Tokens
Already applied in `src/index.css` (do not edit): `bg #F7F4EE`, `surface #EEE8DC`, `card #fff`, `ink #0E1A2E`, `ink-muted #5A6375`, `line #DCD4C4`, `deep #0A1530`, `deep-2 #12213F`, `deep-line #26385C`, `sand #F3EEE4`, `sand-muted #A9B2C3`, `accent #D4A853`, `accent-hover #E2BC6E`, `accent-fg #0A1530`, `accent-ink #8A6420`, `star #FBBC04`, `whatsapp #25D366`, `--font-display` Tenor Sans, `--font-sans` Poppins. Use as Tailwind utilities (`bg-deep`, `text-sand`, `border-deep-line`, `font-display`).
Section padding `py-16 sm:py-20`. Container `max-w-6xl mx-auto px-4 sm:px-6`. Cards `rounded-2xl`, buttons `rounded-full`.
Background per section: Nav `deep` → Hero photo + deep → Serviços `bg` → Sobre `deep` → Como funciona `surface` → Contato `deep` → Footer `deep` (same as Contato: Footer root gets `border-t border-white/5`).

## Shared files (import, never duplicate)
`src/content.ts`: `EMPRESA`, `CONTATO`, `waLink(text)`, `WA_PADRAO`, `GOOGLE`, `QUEM_SOMOS`, `VALORES`, `NOTA_CREDENCIAIS`, `SERVICOS`, `PASSOS`. Display the phone as `CONTATO.telefone`. Icons from `lucide-react` / `react-icons` (`FaWhatsapp`, `FaInstagram`, `FcGoogle`); never hand-draw SVGs.

## Cross-section contracts
- Section ids: Hero `inicio`, Serviços `servicos`, Sobre `sobre`, Como funciona `como-funciona`, Contato `contato`. Nav and Footer link ONLY to these (`#servicos`, `#sobre`, `#como-funciona`, `#contato`).
- Nav: `fixed top-0 inset-x-0 z-50`, white logo. Transparent at `scrollY=0`; header background opaque `bg-deep/95 backdrop-blur` when `scrolled || menuOpen`. Publishes `--nav-height` on `document.documentElement` from a `ResizeObserver` on the bar row (not the header); reference `react-clients/jea-imoveis/src/sections/Nav.tsx`. Mobile dropdown animates opacity + y only (NEVER height auto).
- Hero consumes `var(--nav-height, 4.5rem)`: `min-height: calc(100svh - var(--nav-height))` with a `vh` fallback; the Hero begins under the fixed nav (padding-top = nav height), so total = one viewport. Mobile: photo-led, text anchored to the bottom (`justify-end`) over a `from-deep via-deep/70` fade, mobile H1 about `text-[2rem]`; the primary CTA's `getBoundingClientRect().bottom <= innerHeight` at 375x812 and 390x700. Photos in `public/images/` via `${import.meta.env.BASE_URL}images/hero-torres-{1200,2400,mobile}.jpg`: `srcSet` 1200w/2400w, plus the 900x1600 portrait crop through `<picture><source media="(max-aspect-ratio: 3/5)">` (must match the preloads in `index.html`). Photo: three residential towers centered, navy sky with an orange/gold horizon. On desktop the left scrim must reach past the text column (`from-deep/95 via-deep/75 via-35% to-transparent to-62%`) plus a light bottom fade; check the towers stay visible on the right. Stock: never caption it as a real property.
- Floating WhatsApp button lives in `Footer.tsx`; hides (opacity-0, translate-y-4, pointer-events-none, `inert`) while `#inicio` is intersecting (IntersectionObserver, threshold 0.3). Reference `react-clients/jea-imoveis/src/sections/Footer.tsx`.
- Sobre uses `flavio-retrato.jpg` (opaque, 906x916, grey studio background): rounded-2xl rectangle, never a light box behind it, never wider than ~460px css.
- Google rating appears ONCE on the page, in Sobre: "5,0 no Google · 2 avaliações" with 5 `text-star` stars and `FcGoogle`. No review texts anywhere.
- Map appears ONCE, in Contato (Google Maps embed with `CONTATO.mapsQuery`, `loading="lazy"`, plus a "Como chegar" link). Footer shows the address as text only.
- No stats block, no counters, no years, no listings, no construtora/partner names, no hours, no e-mail.

## Motion Language Plan
| Section | Animation mechanism |
|---|---|
| Nav | Scroll-driven chrome (transparent → opaque) + mobile dropdown via `AnimatePresence` (opacity + y) |
| Hero | Photo entrance gated on image load (`onLoad` → `decode()`: clip curtain + scale 1.08 → 1), then continuous slow Ken Burns; headline lines stagger in on mount; gradient-text (accent → accent-hover) on one word |
| Serviços | Pointer-follow spotlight: each card has a soft gold radial glow that tracks the cursor (`useMotionValue` + `useMotionTemplate`), plus a gold top border that draws in (`scaleX`) on hover/focus; on touch the glow rests centered. Cards are always visible |
| Sobre | Scroll-linked parallax: the portrait drifts slower than the page (`useScroll` + `useTransform` y, spring-smoothed) over a breathing gold halo; the value words (`VALORES`) cross-fade one at a time in a rotating line |
| Como funciona | Auto-advancing stepper: `useState` + interval (~5s) with a progress bar on the active step, `AnimatePresence` swaps the detail text; clicking/tapping a step selects it and pauses auto-advance; all step titles always visible; static under reduced motion |
| Contato | Breathing ambient glow behind the WhatsApp card + pulsing ring around the WhatsApp icon; short form (nome, interesse select from `SERVICOS`, mensagem) that opens WhatsApp with a composed message |
| Footer | Floating WhatsApp FAB with a periodic ping ring (about every 4s); hides while `#inicio` is on screen |

## Final Section List
1. **Nav**: logo + anchors + WhatsApp always at hand.
2. **Hero** (`#inicio`): positioning + WhatsApp CTA + CRECI line.
3. **Serviços** (`#servicos`): the four confirmed lines of work, each with its own prefilled WhatsApp message.
4. **Sobre** (`#sobre`): Flávio's real portrait, the agency's own "Quem somos" text, CRECI, the one Google rating line, footnote.
5. **Como funciona** (`#como-funciona`): lowers the barrier to the first message; covers credit approval to keys (assumed flow, flagged in `content.ts`).
6. **Contato** (`#contato`): WhatsApp form, phone, Instagram, address + map.
7. **Footer**: brand, contacts, links, floating WhatsApp.
Not included: testimonials (only 2 Google ratings, no texts), listings, partners, FAQ, stats.

## Copy direction (builders may adjust microcopy, NEVER invent facts, numbers, neighborhoods, prices, years, partners or promises)
- Hero H1: "Lançamentos e imóveis prontos em Londrina, com assessoria segura." (emphasis word: "segura"). Paragraph: "Imóveis novos e recém-construídos de médio e alto padrão, consórcio imobiliário e áreas para incorporação, com atendimento personalizado do primeiro contato à entrega das chaves." CTAs: "Falar no WhatsApp" (primary, `WA_PADRAO`) and "Ver serviços" (secondary, `#servicos`). Line under CTAs: "Flávio Ferreira · CRECI-PR 49593 · Gleba Palhano, Londrina".
- Serviços H2: "Como posso te ajudar?" (his own welcome phrase). Each card CTA: "Conversar sobre isso" → `waLink(s.msg)`.
- Sobre H2: "Prazer, Flávio Ferreira". Body: `QUEM_SOMOS`. Show `EMPRESA.cargo` and `EMPRESA.creci`. Footnote `NOTA_CREDENCIAIS`.
- Como funciona H2: "Do primeiro contato às chaves".
- Contato H2: "Vamos encontrar o seu imóvel?" Show the phone, Instagram (imobiliária) and address with the map.
