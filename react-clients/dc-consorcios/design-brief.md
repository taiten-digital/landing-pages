# Design Brief: DC Consórcios (`dc-consorcios`)

## Aesthetic Direction & References
Reference given by the user: the client's own brand (logo + storefront). The
storefront has a **black sign band** with a **steel-blue diamond** and **silver
"DC"** lettering. The page picks that up: dark, near-black navy surfaces, silver
secondary tone, diamond blue as the single accent. **One light section** (Contemplados)
brings in warmth, matching the provisional tone: close and welcoming, simple language,
financial planning, **never promising guaranteed contemplação**.

Type: **Sora** (display, multi-weight 500-800: `font-semibold`/`font-bold` OK) +
**Manrope** (body/UI). Headings `leading-[1.1]` or more. Emphasis word in a heading
is `text-accent` (on dark) or `text-accent-ink` (on light): max ONE per heading.

Logo: `src/assets/images/logo-dc.png` (277×58, transparent, silver/blue): ONLY on dark
backgrounds, `h-9 sm:h-10` (low-res source, never bigger than h-11). `alt="DC Consórcios"`.

Accent (`--color-accent`) ONLY on: primary CTAs, focus/active states, the heading's
emphasis word, max 1 focal detail per section. Text on accent is `text-accent-fg`,
never white. Eyebrows, icons and secondary labels: `text-text-muted` or `text-silver`
(dark) / `text-ink-muted` (light). Stars: `text-star`. WhatsApp buttons with TEXT:
`bg-whatsapp text-deep` (white on #25D366 fails AA). Icon-only FAB: white icon OK.

House rules: no eyebrow/chip above the Hero H1. **Never an em dash (—)** in rendered
text. Never invent numbers, prazos, valores, taxas, roles or promises. Every `<button>`
gets `cursor-pointer`. Grids with variable-height cards: `items-start`.

## Design Tokens
Already applied in `src/index.css` (do not edit):
```css
@theme {
  --color-bg: #0A0F17;  --color-surface: #111926;  --color-surface-2: #1A2433;
  --color-deep: #06090F;  --color-text: #EEF2F6;  --color-text-muted: #9AA8B8;
  --color-silver: #C9D1DA;  --color-line: #243044;
  --color-light: #F3F5F8;  --color-light-card: #FFFFFF;  --color-ink: #0E1622;  --color-ink-muted: #4B5868;
  --color-accent: #5B9BE0;  --color-accent-hover: #7AB0EA;  --color-accent-fg: #06111F;
  --color-accent-ink: #1F5FA8;  /* accent text on the light section */
  --color-star: #FBBC04;  --color-whatsapp: #25D366;
  --font-display: 'Sora', system-ui, sans-serif;
  --font-sans: 'Manrope', system-ui, sans-serif;
}
```
Background per section (none repeats back to back, no divider needed):
Hero `bg-bg` + photo → Contemplados `bg-light` → Modalidades `bg-bg` → Como funciona
`bg-surface` → Comparativo `bg-bg` → Contato `bg-surface` → Footer `bg-deep`.
Padding `py-16 sm:py-20`. Container `max-w-6xl mx-auto px-4 sm:px-6`.
Cards `rounded-2xl`/`rounded-3xl`, buttons `rounded-full`.

## Shared files (import, never duplicate)
`src/content.ts`: `EMPRESA`, `CONTATO`, `waLink(text)`, `MODALIDADES`, `GOOGLE`, `AVALIACOES`.

## Cross-section contracts
- Ids: Hero `inicio`, Contemplados `contemplados`, Modalidades `modalidades`,
  Como funciona `como-funciona`, Comparativo `comparativo`, Contato `contato`.
- Nav is `fixed`, transparent at the top; opaque `bg-deep/90 backdrop-blur` when
  `scrolled || menuOpen`. Nav publishes `--nav-height` on `document.documentElement`
  from a `ResizeObserver` on the bar row (`<nav>`), not the `<header>` (reference:
  `react-clients/jonatas-hotts/src/sections/Nav.tsx`).
- Hero consumes it: `min-h-screen supports-[height:100svh]:min-h-svh` and
  `pt-[var(--nav-height,4.5rem)]` (the Nav sits on top of the Hero).
- The floating WhatsApp button lives in `Footer.tsx`.

## Motion Language Plan
| Section | Animation mechanism |
|---|---|
| Nav | Scroll-driven chrome (transparent → `bg-deep/90`) + mobile menu via `AnimatePresence` (height/opacity); hamburger below `lg` |
| Hero | Photo opens like a curtain on mount (clip-path, bottom to top) + scroll-linked "photo becomes a card" (scale 1 → 0.8, rounded corners, parallax drift, dim) + H1 lines entering on mount |
| Contemplados | Auto-rotating **spotlight**: the 2 contemplação stories take turns as a big featured quote (crossfade via `AnimatePresence`, ~7s, thin progress bar under it, pause on hover, dots to pick); the 4 short reviews sit static in a grid below |
| Modalidades | Idle float on the 3 cards, different phase per card; icon lifts/tilts on hover |
| Como funciona | **Scroll-linked timeline**: a vertical line fills with `useScroll` + `scaleY` as the section passes; each step's dot lights up when the fill reaches it. All steps visible from the start (nothing hidden) |
| Comparativo | **Segmented toggle** (Consórcio / Financiamento) with a `layoutId` sliding pill; the answer column swaps with `AnimatePresence` per row, staggered |
| Contato | Pulsing ring around a map pin over the embedded map + slow breathing ambient glow behind the contact card |
| Footer | Floating WhatsApp button with a periodic "ping" ring (every ~4s, not continuous) |

## Final Section List
1. **Nav**: logo + anchors on a long page; WhatsApp CTA always at hand.
2. **Hero** (`#inicio`): the real storefront (user asked for this photo), the offer (casa, carro, moto, sem juros), the WhatsApp CTA and the 5,0 Google proof.
3. **Contemplados** (`#contemplados`): the reason the page exists ("histórias de contemplação vendem"): real Google reviews, contemplation stories first.
4. **Modalidades** (`#modalidades`): the 3 things they sell, each with its own WhatsApp message.
5. **Como funciona** (`#como-funciona`): consórcio is misunderstood; explain the real mechanic honestly (no guaranteed date), which the reviews show is exactly what the team does ("explicou tudo direitinho").
6. **Comparativo** (`#comparativo`): the core sales argument of consórcio vs financiamento, told honestly both ways.
7. **Contato** (`#contato`): physical office in Londrina, map, all real channels.
8. **Footer**: brand, contacts, links, floating WhatsApp.

No About (no team photos or confirmed roles), no FAQ (would need plan rules not confirmed), no stats block (no DC numbers exist).

### Copy per section (approved base: builders may adjust microcopy but NEVER invent facts, numbers, prazos, valores or promises)

**Nav**: logo left. Links: Contemplados `#contemplados`, Consórcios `#modalidades`, Como funciona `#como-funciona`, Consórcio x Financiamento `#comparativo` (label it "Por que consórcio" to keep it short), Contato `#contato`. CTA button (accent): "Falar no WhatsApp" → `waLink('Olá! Vim pelo site e quero saber mais sobre consórcio.')`, target _blank. Hamburger below `lg`.

**Hero** (`#inicio`, `bg-bg`)
- Photo `public/images/fachada-dc-{1200,2000}.jpg` (srcset + preload in index.html; curtain waits for load; 2000×1500, AI upscale supplied by the user of their real 680×510 front photo at dusk, sign lit; DC logo at x≈51-70%, y≈30-37%; parked car plate blurred). Full-bleed house hero: round 2 (client disliked the mobile band layout).
  - `lg+`: photo covers the whole hero, `object-[50%_30%]`, left scrim `from-bg/95 via-bg/75 via-35% to-transparent to-62%` (text column stays readable, DC sign stays clear), light bottom fade.
  - below `lg`: photo covers the top 72% (`object-[62%_50%]`, sign centered), text anchored to the bottom over a `from-bg via-bg/70` fade; whole hero incl. CTA and credentials fits in 100svh at 375×812. Floating WhatsApp (Footer) hides while the Hero is on screen.
  - No color filters on the photo.
  - `alt="Fachada da DC Consórcios na Av. Alziro Zarur, em Londrina"`.
- Text left-aligned, stacked: H1, paragraph, CTAs, credentials row.
- H1 (`font-display`, ~text-4xl → lg:text-6xl): "Casa, carro ou moto: sua próxima *conquista* começa com planejamento." (emphasis `conquista` in `text-accent`).
- Paragraph: "Consórcio sem juros, com atendimento próximo do começo ao fim. A DC é representante exclusiva do Consórcio União em Londrina."
- CTA primary (`bg-whatsapp text-deep`, WhatsApp icon): "Quero fazer meu plano" → `waLink('Olá! Vim pelo site e quero montar meu plano de consórcio.')`. Secondary ghost (border `border-line`/white/20): "Ver histórias de contemplação" → `#contemplados`.
- Credentials row (small, `text-text-muted`): ★ (text-star) **5,0 no Google** · 9 avaliações | Desde 2020 em Londrina | Representante exclusiva Consórcio União. (Wrap nicely on mobile.)

**Contemplados** (`#contemplados`, `bg-light`, text `text-ink`)
- H2: "Quem já foi *contemplado* conta como foi" (`text-accent-ink` on the emphasis word).
- Sub: "Avaliações reais de clientes da DC no Google."
- Rating strip: Google "G" icon (react-icons `FcGoogle`), "5,0", 5 stars `text-star`, "9 avaliações no Google".
- Spotlight: the 2 reviews with `contemplacao: true` (Rodrigo T., Raquel U.) rotate as a large quote card (white card, big quotation mark icon in `text-accent-ink`/20, text ~text-xl/2xl, name + small "Contemplado(a) · avaliação no Google" label: Rodrigo = "Contemplado", Raquel = "Contemplada"). Dots/buttons to pick (with `cursor-pointer`, aria-label), progress bar, pause on hover/focus.
- Below: the other 4 reviews in a grid (`sm:grid-cols-2 lg:grid-cols-4 items-start`), each: initials avatar (NEVER a photo), name, 5 stars, `FcGoogle` icon, full literal text (preserve `\n` line breaks with `whitespace-pre-line`; do not fix typos, do not summarize).
- Footnote (text-xs `text-ink-muted`): "Avaliações publicadas no Google Maps. Nota e total conferidos em setembro de 2026."
- CTA at the end: "Quero ser o próximo contemplado" (accent-ink button or bg-ink with white text) → `waLink('Olá! Vi as histórias de contemplação no site e quero começar meu consórcio.')`.

**Modalidades** (`#modalidades`, `bg-bg`)
- H2: "Um consórcio para cada *objetivo*". Sub: "Imóvel, carro ou moto. A gente monta com você o plano que cabe no seu orçamento."
- 3 cards from `MODALIDADES` (`bg-surface-2`, `border-line`): literal icon per card (compare candidates across lucide/react-icons: imóvel = house (e.g. lucide `House`/`HousePlus`), carro = car (`CarFront`), moto = motorcycle (react-icons `FaMotorcycle` / `MdTwoWheeler` / Tabler `TbMotorbike`; pick the one clearly readable as a motorcycle at 28px). Icons `text-silver`, not accent.
- Each card link: "Simular pelo WhatsApp" → `waLink(mensagem)`, target _blank.
- Below the grid, one line: "Tem outro objetivo em mente? Fale com a gente e veja os planos disponíveis." with inline link to WhatsApp (`waLink('Olá! Vim pelo site e quero saber quais planos de consórcio vocês têm.')`).

**Como funciona** (`#como-funciona`, `bg-surface`)
- H2: "Como funciona o *consórcio*". Sub: "Sem letras miúdas: é assim que você chega ao seu bem."
- 4 steps (vertical timeline, text left-aligned, on `lg` can be two columns: heading/sub sticky left, timeline right):
  1. **Você escolhe o plano**: "Conta o seu objetivo e a gente apresenta as opções de crédito e de parcela que cabem no seu bolso."
  2. **Entra em um grupo**: "Você paga parcelas mensais sem juros, junto com outras pessoas que também estão planejando uma conquista."
  3. **Contemplação por sorteio ou lance**: "Todo mês há assembleia. Você pode ser contemplado por sorteio ou antecipar ofertando um lance. Não existe data garantida, por isso o planejamento faz diferença."
  4. **Usa sua carta de crédito**: "Contemplado, você usa o crédito para comprar o seu bem. E a DC segue com você até o fim."
- CTA: "Tirar minhas dúvidas no WhatsApp" → `waLink('Olá! Quero entender melhor como funciona o consórcio.')`.

**Comparativo** (`#comparativo`, `bg-bg`)
- H2: "Consórcio ou *financiamento*?". Sub: "Os dois levam ao mesmo bem, por caminhos diferentes. Veja qual combina com o seu momento."
- Toggle: "Consórcio" | "Financiamento" (buttons, `cursor-pointer`, `aria-pressed`). Default Consórcio.
- Rows (label → consórcio / financiamento):
  - Juros → "Não tem juros. Você paga uma taxa de administração diluída nas parcelas." / "Tem juros sobre o valor financiado, durante todo o contrato."
  - Entrada → "Não exige entrada." / "Normalmente exige uma entrada."
  - Quando você recebe → "Depois da contemplação, por sorteio ou lance." / "Logo após a aprovação do crédito."
  - Custo total → "Tende a ser menor, por não ter juros." / "Tende a ser maior, por causa dos juros."
  - Ideal para → "Quem pode planejar e quer pagar menos no total." / "Quem precisa do bem agora."
  - Mark consórcio answers with a subtle check icon; financiamento answers neutral (no red X: it's an honest comparison, not an attack).
- Footnote: "Comparação geral entre as modalidades. Taxa de administração, fundo de reserva e seguro variam conforme o grupo: consulte as condições do seu plano."
- CTA: "Ver qual faz sentido para mim" → `waLink('Olá! Quero comparar consórcio e financiamento para o meu caso.')`.

**Contato** (`#contato`, `bg-surface`)
- H2: "Fale com a *DC*". Sub: "Pelo WhatsApp, por e-mail ou pessoalmente, no nosso escritório em Londrina."
- Card (`bg-surface-2`): WhatsApp button showing the REAL number "(43) 3017-3315"; e-mail (mailto) atendimento@dcconsorcios.com.br; Instagram @dc.consorcioslondrina (link); address "Av. Alziro Zarur, 401, Vitória Régia, Londrina - PR, 86038-130". No hours (UNKNOWN).
- Map: `<iframe src={"https://www.google.com/maps?q=" + encodeURIComponent(CONTATO.mapsQuery) + "&output=embed"} loading="lazy" title="Mapa: DC Consórcios, Av. Alziro Zarur, 401, Londrina">` in `rounded-3xl` + "Abrir no Google Maps" link.

**Footer** (`bg-deep`)
- Logo, one line "Representante exclusiva Consórcio União em Londrina.", phone/WhatsApp (real number), e-mail, Instagram, address, anchor links, "© 2026 DC Consórcios".
- Floating WhatsApp button `fixed bottom-5 right-5 z-50`, `aria-label="Falar no WhatsApp: (43) 3017-3315"`, `FaWhatsapp` white on `bg-whatsapp`, `cursor-pointer`.

## Open Questions
- Facade photo is an AI upscale: building faithful, but the totem lettering is garbled by the upscaler (small, low in frame). A real high-res photo would still be better.
- Review authorization; roles/photos of Ana Paula and Diego; hours; vector logo.
