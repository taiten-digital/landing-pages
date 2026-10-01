# Design Brief: Baldon Corretora de Seguros (`baldon-corretora-de-seguros`)

## Aesthetic Direction & References
The client's own look: deep navy, gold linework, serif headlines, a glowing blue shield
(Instagram posts). Page: dark navy, gold as the single accent, shield blue only as soft
glow. **One light cream section** (Avaliações) for contrast. Serious, reflective, warm.

Type: **Playfair Display** (display, 500-700: `font-semibold`/`font-bold` OK, multi-weight)
+ **Source Sans 3** (body/UI). Display headings `leading-[1.15]` or more. Emphasis in a
heading: one phrase in `text-accent` max per heading.

Logo: `logo-baldon-stacked.png` (Hero/Footer, dark bg only) and `logo-baldon-icon.png`
(Nav, `h-9 sm:h-10`, next to the text "Baldon" in `font-display` + small caps line
"Corretora de Seguros"). Low-res: never enlarge past source size (stacked max ~h-28).
`alt="Baldon Corretora de Seguros"`.

**Hero has NO photo** (none exists; user chose): navy full-bleed with a big shield made of
a `react-icons` shield icon (check `lucide-react` `ShieldCheck`, or react-icons Pi/Tb/Fa6
shield) with gold outline feel, radial blue glow + gold glow behind it. Do not hand-draw
SVG icons. Do not show a person. This deviation from the house "photo Hero" is flagged to
the client; section builders must not invent a photo.

Accent (`--color-accent`) ONLY on: primary CTAs, focus/active, one emphasized phrase per
heading, max 1 focal detail per section. Eyebrows/icons/secondary: `text-text-muted`
(dark) or `text-ink-muted` (light). Text on accent is `text-accent-fg`, never white.
WhatsApp buttons with TEXT: `bg-whatsapp text-deep`. Icon-only FAB: white icon OK.
Stars: `text-star`.

House rules: no eyebrow/chip above the Hero H1. **Never an em dash** in rendered text.
Never invent numbers, prazos, valores, coberturas, insurers, awards. Never state the
number of Google reviews. Every `<button>` gets `cursor-pointer`. Variable-height card
grids: `items-start`. Forbidden promise words: "garantido", "o melhor", "mais barato".

## Design Tokens
Already applied in `src/index.css` (do not edit): `--color-bg #081028`, `surface #0E1A3A`,
`surface-2 #152349`, `deep #050A1A`, `text #F4F1E8`, `text-muted #A9B3CC`, `line #22305A`,
`light #F5F1E8`, `light-card #FFF`, `ink #0E1630`, `ink-muted #4A5370`, `accent #C9A55C`,
`accent-hover #DDBB74`, `accent-fg #0A1226`, `accent-ink #7A5A12`, `shield #2F6BDB`,
`star #FBBC04`, `whatsapp #25D366`, `--font-display`, `--font-sans`.
Backgrounds (none repeats back to back): Hero `bg-bg` → Proteção `bg-surface` → Seguros
`bg-bg` → Avaliações `bg-light` → Contato `bg-surface` → Footer `bg-deep`.
Padding `py-16 sm:py-20`. Container `max-w-6xl mx-auto px-4 sm:px-6`. Cards
`rounded-2xl`, buttons `rounded-full`, borders `border-line`.

## Shared files (import, never duplicate)
`src/content.ts`: `EMPRESA`, `CONTATO`, `waLink(text)`, `GOOGLE`, `SEGUROS`, `AVALIACOES`.
Logos in `src/assets/images/`.

## Cross-section contracts
- Ids: Hero `inicio`, Proteção `protecao`, Seguros `seguros`, Avaliações `avaliacoes`,
  Contato `contato`. Nav links: Início(#inicio), Proteção(#protecao), Seguros(#seguros),
  Avaliações(#avaliacoes), Contato(#contato) + WhatsApp CTA button.
- Nav is `fixed`, transparent at the top; opaque `bg-deep/90 backdrop-blur` when
  `scrolled || menuOpen`. Nav publishes `--nav-height` on `document.documentElement` from
  a `ResizeObserver` on the bar row (reference: `react-clients/jonatas-hotts/src/sections/Nav.tsx`).
  Mobile dropdown animates opacity + y only, NEVER height.
- Hero consumes it: `min-h-screen supports-[height:100svh]:min-h-svh` and
  `pt-[var(--nav-height,4.5rem)]`. On mobile (375x812 and 390x700) the whole Hero,
  main CTA included, fits in the first screen.
- Footer owns the floating WhatsApp FAB; hides (opacity-0, pointer-events-none, `inert`)
  while `#inicio` is >=30% visible (IntersectionObserver). Reference: `dc-consorcios/src/sections/Footer.tsx`.
- WhatsApp: always `waLink(msg)` from content.ts, `target="_blank" rel="noreferrer"`.
- `font-display` on every section's main heading; the display font MAY be bold here.

## Motion Language Plan
| Section | Animation mechanism |
|---|---|
| Nav | Scroll-driven chrome (transparent → `bg-deep/90`) + mobile menu via `AnimatePresence` (opacity + y); hamburger below `md`/`lg` as the width needs |
| Hero | Headline lines entering on mount + big shield with breathing blue/gold ambient glow and scroll-linked parallax drift/scale (`useScroll` + stiff `useSpring`); content visible immediately |
| Proteção | **Scroll-linked list**: heading "Você trabalha todos os dias para construir uma vida melhor" with 5 rows (Sua casa, Seu carro, Sua família, Sua renda, Seu patrimônio) each lighting up (gold) as scroll passes, a gold vertical line filling with `scaleY`; all rows visible from the start; closing question "Se algo inesperado acontecesse amanhã, como ficaria tudo isso?" |
| Seguros | Idle float on the 8 cards with different phase per card (first card "Vida e proteção de renda" larger/featured); each card has its own WhatsApp link; icon lifts on hover |
| Avaliações | Auto-rotating **spotlight** of the 3 real reviews (crossfade `AnimatePresence`, ~6s, progress bar, pause on hover, dots to pick); stars + "Nota 5,0 no Google" header; source footnote |
| Contato | Pulsing ring around a map pin over the embedded Google map + slow breathing glow behind the contact card |
| Footer | Floating WhatsApp FAB with periodic "ping" ring (every ~4s) |

## Final Section List
1. **Nav**: logo + anchors + always-at-hand WhatsApp CTA.
2. **Hero** (`#inicio`): the offer ("Proteja o que você levou anos para construir"), WhatsApp CTA, Google 5,0.
3. **Proteção** (`#protecao`): the client's own storytelling (what you built vs. the unexpected); sells the need before the product.
4. **Seguros** (`#seguros`): the 8 protections the client really lists, vida/renda first.
5. **Avaliações** (`#avaliacoes`): 3 real Google reviews, no count; replaces a testimonials block that cannot be bigger.
6. **Contato** (`#contato`): WhatsApp, call, address + map, Instagram. No hours.
7. **Footer**: brand, links, floating WhatsApp.
No Sobre/Equipe (no photos, no facts), no Planos/prices (none given), no FAQ (none given).

## Open Questions
See client-brief.md. Hero is shield-art instead of a photo until the client sends one.
