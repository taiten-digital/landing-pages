# Design Brief: Cléo Bandeira Seguros (`c-bandeira-corretora`)

## Aesthetic Direction & References
Reference: the client's own brand (logo + Instagram). Logo = wine "BANDEIRA" in a
Trajan-style serif + cream/gold arcs. The Instagram posts use a wine studio backdrop,
beige/champagne backdrops and bold sans captions. Approved by the user:
- **Base: cream + wine.** Cream page, deep-wine blocks (Hero, Por que corretora,
  Contato), thin gold details. Elegant, warm, trustworthy.
- **Hero: Cléo on the wine backdrop** (approved deviation from the house full-bleed
  stock photo: no landscape photo exists, and her face is the brand). The Hero
  background is `bg-wine`, the exact studio color behind her portrait, and the photo
  melts into it with masked edges, so the Hero still reads as one full-bleed wine scene.
- **Type: Marcellus + Poppins.** Marcellus (Trajan-inspired, echoes the logo) for
  headings. It is **single weight: never `font-bold`/`font-semibold` on
  `font-display`**. Headings `leading-[1.15]` or more (accented caps). Poppins (same as
  the Instagram posts) for body/UI, 400-700.
- Tone: first person when Cléo speaks ("eu", "comparo", "sigo com você"), warm, plain
  language, nothing of apólice jargon without an explanation.

Logo: `src/assets/images/logo-bandeira.png` (420x93, transparent, wine + cream).
**Only on light backgrounds** (wine on wine is invisible). `h-9 sm:h-10`,
`alt="C Bandeira Corretora de Seguros"`.

Accent use:
- On LIGHT sections, `text-accent`/`bg-accent` (logo wine) ONLY for: primary CTA,
  the heading's single emphasis word, focus/active states, max 1 focal detail.
- On WINE sections, `text-gold`/`bg-gold` for the same roles (text on gold is
  `text-gold-fg`).
- Eyebrows, icons and secondary labels: `text-ink-muted` (light) / `text-cream-muted`
  (wine). Decorative thin rules: `bg-gold-ink/40` (light) or `bg-gold/30` (wine).
- Stars: `text-star`. WhatsApp-green buttons with text: `bg-whatsapp text-ink`
  (white on #25D366 fails AA). Icon-only FAB: white icon is OK.

House rules: no eyebrow/chip/badge above the Hero H1. **Never an em dash (—)** in
rendered text (copy, alt, aria-label). Never invent numbers, ratings, review counts,
insurer names, SUSEP, prices or promises. Every `<button>` gets `cursor-pointer`.
Grids with variable-height cards: `items-start`. Content is visible on mount: no
`whileInView` hiding, no `initial={{opacity:0}}` tied to scroll.
`useReducedMotion()` zeroes all motion.

## Design Tokens
Already applied in `src/index.css` (do not edit):
```css
@theme {
  --color-bg: #FBF6EE;  --color-surface: #F3E9D9;  --color-card: #FFFFFF;
  --color-ink: #2B1417;  --color-ink-muted: #6E5558;  --color-line: #E4D4BD;
  --color-wine: #5A1D19;  --color-wine-2: #6B2621;  --color-wine-line: #7E3A33;
  --color-cream: #F7ECDD;  --color-cream-muted: #D9BFB2;
  --color-accent: #8A2030;  --color-accent-hover: #A12839;  --color-accent-fg: #FFF7EA;
  --color-gold: #E8D2A6;  --color-gold-hover: #F2E0BC;  --color-gold-fg: #4A1714;
  --color-gold-ink: #9A7440;
  --color-star: #FBBC04;  --color-whatsapp: #25D366;
  --font-display: 'Marcellus', Georgia, serif;
  --font-sans: 'Poppins', system-ui, sans-serif;
}
```
Background per section (none repeats back to back, no divider needed):
Nav `bg-bg` → Hero `bg-wine` → Serviços `bg-bg` → Por que corretora `bg-wine` →
Como funciona `bg-surface` → Sobre `bg-bg` → Contato `bg-wine` → Footer `bg-surface`.
Padding `py-16 sm:py-20`. Container `max-w-6xl mx-auto px-4 sm:px-6`.
Cards `rounded-2xl`/`rounded-3xl`, buttons `rounded-full`. Text on wine: `text-cream`
(headings/body) and `text-cream-muted` (secondary). Text on light: `text-ink` and
`text-ink-muted`.

## Shared files (import, never duplicate)
`src/content.ts`: `EMPRESA`, `CONTATO`, `waLink(text)`, `SERVICOS`, `AVALIACOES`.
Real numbers are displayed as-is: phone `(43) 3351-4860`, WhatsApp `(43) 99846-0643`.
Icons: `lucide-react` and `react-icons` are installed (`FaWhatsapp`, `FcGoogle`,
`FaInstagram`...). Never hand-draw an SVG icon.

## Cross-section contracts
- Section ids: Hero `inicio`, Serviços `servicos`, Por que corretora `por-que`,
  Como funciona `como-funciona`, Sobre `sobre`, Contato `contato`.
- Nav is `fixed top-0 inset-x-0 z-50` and **always opaque cream** (`bg-bg/95
  backdrop-blur`), because the logo is illegible on wine. Scroll-driven chrome only
  adds a bottom border + soft shadow once `scrollY > 8`. The mobile dropdown uses the
  same `bg-bg` so header and panel are one surface.
- Nav publishes `--nav-height` on `document.documentElement` from a `ResizeObserver`
  on the **bar row** (`<nav>`), not the `<header>` (reference:
  `react-clients/jonatas-hotts/src/sections/Nav.tsx`). Hero consumes it:
  `pt-[var(--nav-height,4.5rem)]` and a min-height of one viewport
  (`min-h-screen supports-[height:100svh]:min-h-svh`).
- The floating WhatsApp button lives in `Footer.tsx` and hides while `#inicio` is on
  screen.
- Hero photo: `/images/cleo-hero.jpg` (public folder, 656x505, preloaded in
  `index.html`; reference it as `${import.meta.env.BASE_URL}images/cleo-hero.jpg`).
  Opaque JPG, studio wine backdrop sampled `#5A1D19` to `#713431` (lighter glare at
  the top-left corner), Cléo centered (face at x≈50%, y≈45%), black blazer, hand on
  chin; the bottom edge is her blazer (dark). Low resolution: never display wider
  than ~780px.
- Sobre photo: `src/assets/images/cleo-retrato-bege.png` (import it), 658x515,
  opaque, LANDSCAPE, Cléo smiling in a caramel top on a beige/gold studio backdrop,
  face centered. Low resolution: never display wider than ~560px.

## Motion Language Plan
| Section | Animation mechanism |
|---|---|
| Nav | Scroll-driven chrome (border + shadow appear after scroll) + mobile menu via `AnimatePresence` (height/opacity); hamburger below `lg` |
| Hero | Photo **entrance gated on image load** (`onLoad` → `decode()`: scale 1.08 → 1 + mask/clip reveal from the right) + slow **breathing gold ambient glow** behind Cléo + H1 lines entering on mount (staggered y/opacity, runs on mount, not on scroll) |
| Serviços | **Pillar selector**: 3 tabs with a `layoutId` sliding highlight; the detail panel swaps with `AnimatePresence` (slide + fade) and its checklist items stagger in on every swap |
| Por que corretora | **Idle float** on the 4 cards, different duration/delay per card; icon tilts/lifts on hover |
| Como funciona | **Auto-advancing stepper**: 4 steps, the active one expands (`AnimatePresence`), a progress bar fills over ~6s then advances; pause on hover/focus; clickable steps. Every step title is always visible |
| Sobre | **Scroll-linked parallax portrait**: the photo drifts slower than the page (`useScroll` + `useTransform` y) while a gold offset frame behind it drifts the opposite way |
| Contato | **Pulsing ring** around a map pin over the embedded map + slow breathing ambient glow behind the contact card |
| Footer | Floating WhatsApp button with a periodic **ping ring** (every ~4s, not continuous); hides while the Hero is on screen |

## Final Section List
1. **Nav**: logo + anchors on a long page; WhatsApp always at hand.
2. **Hero** (`#inicio`): Cléo's real face opens the page, like her Instagram. The three things she sells, the WhatsApp CTA and "Desde 2017".
3. **Serviços** (`#servicos`): the three pillars from her bio, each with its own WhatsApp message.
4. **Por que corretora** (`#por-que`): the real sales argument of a broker (compares insurers, tailors coverage, stays with you in a claim), which the user asked for in the interview.
5. **Como funciona** (`#como-funciona`): the consultative process; lowers the barrier to asking for a quote.
6. **Sobre** (`#sobre`): "Prazer, sou a Cléo" (her own pinned-post line) + the 2 real Google reviews. The reviews live here because 2 alone are too thin for their own section.
7. **Contato** (`#contato`): physical office in Londrina, map, every real channel and the hours.
8. **Footer**: brand, contacts, links, floating WhatsApp.

Not included: FAQ (would need product rules not confirmed), insurer logos (not
confirmed), stats block (no numbers exist besides 2017), SUSEP (not provided).

### Copy per section (approved base: builders may adjust microcopy but NEVER invent facts, numbers, insurers, ratings or promises)

**Nav** (`bg-bg/95 backdrop-blur`, fixed)
- Logo left (links to `#inicio`). Links: Serviços `#servicos`, Por que corretora `#por-que`, Como funciona `#como-funciona`, Sobre `#sobre`, Contato `#contato`. Text `text-ink`, hover `text-accent`.
- CTA (`bg-accent text-accent-fg`, `FaWhatsapp` icon): "Falar no WhatsApp" → `waLink('Olá, Cléo! Vim pelo site e gostaria de uma consultoria.')`, target _blank. On narrow screens inside the menu.
- Hamburger below `lg` (lucide `Menu`/`X`, `cursor-pointer`, `aria-expanded`, aria-label "Abrir menu"/"Fechar menu"). Test in the 800-950px band: 5 links + CTA must not crowd (they're hidden below `lg`).

**Hero** (`#inicio`, `bg-wine`, text `text-cream`)
- `lg+`: two zones inside the container. Text column left (~52%), vertically centered. Photo right: anchored to the bottom-right of the Hero, height ~ `min(78vh, 600px)`, `object-cover`, edges melted into the wine with `mask-image` (left edge and top fade strongly, bottom fades lightly), so there is no visible rectangle. A large blurred `bg-gold/20` radial glow behind her head, breathing slowly.
- below `lg`: photo on top (~52% of the Hero height, `object-cover object-[50%_35%]`, bottom mask fade into wine), text anchored below it. **Whole Hero, main CTA included, must fit in 100svh at 375x812 and 390x700** (H1 `text-[2rem]`, tight `mt-4`/`mt-6`).
- `alt="Cléo Bandeira, corretora de seguros"`, `fetchPriority="high"`, `onLoad` gating per motion-playbook.
- Text left-aligned, stacked: H1, paragraph, CTAs, credentials. No chip above the H1.
- H1 (`font-display`, ~`text-[2rem]` → `sm:text-5xl` → `lg:text-6xl`, `leading-[1.15]`): "Proteção sob medida para sua família, sua saúde e seu *patrimônio*." (emphasis `patrimônio` in `text-gold`).
- Paragraph (`text-cream/85`): "Sou a Cléo Bandeira, corretora de seguros em Londrina. Comparo as opções, explico cada cobertura sem letra miúda e sigo com você depois da contratação."
- CTA primary (`bg-gold text-gold-fg hover:bg-gold-hover`, `FaWhatsapp`): "Pedir uma cotação" → `waLink('Olá, Cléo! Vim pelo site e quero pedir uma cotação.')`, target _blank. Secondary ghost (`border border-cream/30 text-cream`, lucide `Phone`): "Ligar (43) 3351-4860" → `CONTATO.telefoneHref`.
- Credentials row (small, `text-cream-muted`, thin `bg-gold/30` separators, wraps nicely on mobile): "Desde 2017" | "Londrina - PR" | "Seguros, saúde e consórcios".

**Serviços** (`#servicos`, `bg-bg`)
- H2: "Tudo para você se *proteger*, em um só lugar" (`text-accent` on the emphasis word). Sub (`text-ink-muted`): "Seguros para pessoa física e jurídica, planos de saúde e odonto e consórcios, com a mesma atenção em cada um."
- Selector: the 3 `SERVICOS` as tabs (`role="tablist"`, buttons with `role="tab"`, `aria-selected`, `cursor-pointer`), label `curto` + a literal icon each (compare candidates at 24px: seguros = shield, e.g. lucide `ShieldCheck`; saúde = heart with pulse, e.g. lucide `HeartPulse`; consórcios = something readable as "conquest via planned payments", e.g. lucide `KeyRound` or `HandCoins`). Desktop: vertical list left, panel right (`lg:grid-cols-[18rem_1fr]`). Mobile: horizontal row of 3 (scrollable if needed, `min-w-0` on grid items), panel below. Sliding highlight uses `layoutId`.
- Panel (`bg-card border border-line rounded-3xl`): `titulo` (font-display), `texto`, `itens` as a checklist (lucide `Check` in `text-gold-ink`), CTA "Pedir cotação pelo WhatsApp" (`bg-accent text-accent-fg`) → `waLink(servico.mensagem)`, target _blank.
- Default tab: `seguros`.

**Por que corretora** (`#por-que`, `bg-wine`, text `text-cream`)
- H2: "Por que contratar com uma *corretora*" (emphasis `text-gold`). Sub (`text-cream-muted`): "A diferença aparece na hora de escolher e, principalmente, na hora de usar o seguro."
- 4 cards (`bg-wine-2 border border-wine-line rounded-3xl`, `sm:grid-cols-2 lg:grid-cols-4 items-start`), literal icons in `text-gold` at most on the icon only (not titles):
  1. **Mais de uma opção** (icon: scales/compare, e.g. lucide `Scale` or `ArrowLeftRight`): "Comparo coberturas e preços entre seguradoras, em vez de oferecer um único produto."
  2. **Cobertura sob medida** (icon: ruler/tailoring, e.g. lucide `Ruler` or `SlidersHorizontal`): "Analiso seu perfil e sua rotina para indicar só o que faz sentido, como home office no seguro residencial ou doenças graves no seguro de vida."
  3. **Do seu lado no sinistro** (icon: helping hand/handshake, e.g. lucide `Handshake` or `LifeBuoy`): "Se algo acontecer, cuido da burocracia com a seguradora e acompanho o seu processo até o fim."
  4. **Atendimento de gente** (icon: chat, e.g. lucide `MessagesSquare`): "Você fala comigo e com a minha equipe pelo WhatsApp, pelo telefone ou no escritório, em Londrina."
- NO claims about banks, no insurer names, no "mais de 40".

**Como funciona** (`#como-funciona`, `bg-surface`)
- H2: "Como funciona o *atendimento*". Sub: "Do primeiro contato ao dia em que você precisar usar o seguro."
- Steps (number in `font-display`, title, text):
  1. **Você conta o que precisa**: "Pelo WhatsApp, por telefone ou no escritório. Pode ser uma dúvida ou um pedido de cotação."
  2. **Entendo o seu perfil**: "Converso sobre a sua rotina, a sua família ou a sua empresa, e quais riscos precisam de cobertura."
  3. **Comparo as opções**: "Apresento as alternativas lado a lado e explico cada cobertura, sem letra miúda."
  4. **Sigo com você**: "Depois da contratação, continuo por perto nas renovações, nas dúvidas e em caso de sinistro."
- Layout: `lg:grid-cols-2` (heading + CTA left, stepper right). Stepper = list of 4 buttons (`cursor-pointer`, `aria-current` on active); the active one expands its text; thin progress bar (`bg-accent`) under the active title.
- CTA: "Começar pelo WhatsApp" (`bg-accent text-accent-fg`) → `waLink('Olá, Cléo! Vim pelo site e quero começar um atendimento.')`.

**Sobre** (`#sobre`, `bg-bg`)
- `lg:grid-cols-2 items-center`: portrait left, text right. Portrait in `rounded-3xl overflow-hidden`, width capped (`max-w-[560px] w-full`, explicit width, aspect `658/515`), a gold offset frame behind it (`border border-gold-ink/50 rounded-3xl`, offset ~16px down/right) for the parallax pair. `alt="Cléo Bandeira sorrindo"`.
- H2: "Prazer, sou a *Cléo*". Paragraphs (`text-ink-muted`):
  - "Sou corretora de seguros e, desde 2017, estou à frente da C Bandeira Corretora de Seguros, aqui em Londrina. Atendo famílias, profissionais autônomos e empresas que querem se proteger sem complicação."
  - "Meu jeito de trabalhar é simples: ouvir primeiro, explicar tudo com clareza e continuar por perto depois que o contrato é assinado."
- Highlight line: big "2017" (`font-display`, `text-accent`) + label "Desde 2017 em Londrina" (text-ink-muted). No other numbers.
- "O que dizem no Google" (small heading): the 2 `AVALIACOES` as quote cards (`bg-card border-line`, `sm:grid-cols-2 items-start`): initials avatar (NEVER a photo; e.g. "WP", "MA" in `bg-surface text-accent`), `nome`, 5 stars `text-star`, `FcGoogle` icon, literal `texto` (do not fix punctuation, do not summarize).
- Footnote (`text-xs text-ink-muted`): "Avaliações publicadas no Google Maps." NO rating number, NO review count.
- Link: "Acompanhe no Instagram @cbandeiraseguros" (`FaInstagram`) → `CONTATO.instagramUrl`, target _blank.

**Contato** (`#contato`, `bg-wine`, text `text-cream`)
- H2: "Vamos conversar sobre a sua *proteção*?" (emphasis `text-gold`). Sub: "Chame no WhatsApp, ligue, mande um e-mail ou venha até o escritório, em Londrina."
- Card (`bg-wine-2 border border-wine-line rounded-3xl`): WhatsApp button `bg-whatsapp text-ink` showing the real number "(43) 99846-0643" → `waLink('Olá, Cléo! Vim pelo site e gostaria de conversar.')`; rows with lucide icons (`text-cream-muted`): Telefone "(43) 3351-4860" (tel link), E-mail `bandeira@bandeiracorretora.com.br` (mailto, must wrap without overflow at 375px: `break-all` or smaller text), Instagram `@cbandeiraseguros`, Endereço "Rua João Alves da Rocha Loures, 454, Londrina - PR, 86041-271", Horário "Das 8h30 às 12h e das 13h às 17h30" (NO weekdays).
- Map: `<iframe src={"https://www.google.com/maps?q=" + encodeURIComponent(CONTATO.mapsQuery) + "&output=embed"} loading="lazy" title="Mapa: C Bandeira Corretora de Seguros, Rua João Alves da Rocha Loures, 454, Londrina">` in `rounded-3xl overflow-hidden` + "Abrir no Google Maps" link (`https://www.google.com/maps/search/?api=1&query=` + encoded query), target _blank.

**Footer** (`bg-surface`, `text-ink`)
- Logo (light background, OK), one line "Seguros, planos de saúde e odonto e consórcios em Londrina desde 2017.", phone, WhatsApp (real numbers), e-mail, Instagram, address, hours, anchor links (same 5 as Nav), "© 2026 C Bandeira Corretora de Seguros".
- Floating WhatsApp button `fixed bottom-5 right-5 z-50`, `aria-label="Falar no WhatsApp: (43) 99846-0643"`, `FaWhatsapp` white on `bg-whatsapp`, `cursor-pointer`, periodic ping ring. Hidden while `#inicio` intersects (IntersectionObserver, threshold 0.3): `opacity-0 translate-y-4 pointer-events-none` + `inert`. Reference: `react-clients/dc-consorcios/src/sections/Footer.tsx`.

## Open Questions
- Lojacorr / "mais de 40 seguradoras": not confirmed, kept off the page.
- A higher-resolution Hero portrait (the current one is a 656px crop of an Instagram post).
- SUSEP number, Google rating/count: not available.
