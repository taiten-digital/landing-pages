# Design Brief: ConsorciCred Londrina (`consorcicred-londrina`)

Decisions made with the user on 2026-09-30 ("use as cores mas deve ficar bonito", "evite ficar idêntico ao dc-consorcios", "coloque o que você acha" for the offer). The Instagram is explicitly NOT a design base.

## Aesthetic Direction & References
Warm, light, optimistic page that keeps the logo's two colors: **brand red #B73037** and **logo navy**. Opposite mood to `dc-consorcios` (dark navy + steel blue + Sora): this one is an off-white page with navy bands and red as the single accent. Theme is the client's own tagline: "Qual é o seu sonho? Nós temos um plano para você!" Type: **Bricolage Grotesque** (display, variable 500-800, `font-semibold`/`font-bold` OK) + **DM Sans** (body). Headings `leading-[1.1]` or more. One emphasis word per heading: `text-accent` on light, `text-accent-on-deep` on navy.

Logo: `src/assets/images/logo-consorcicred.png` (512x222, transparent, keyed from a white JPG). ONLY on light backgrounds, max `h-12` (low-res). On navy it must sit on a `bg-white rounded-xl px-3 py-2` plate. `alt="ConsorciCred Consórcios e Financiamentos"`.

**Hero deviation from house style (flag to client):** no landscape photo of the client exists and stock sites were unreachable from the build environment, so the Hero is a **typographic/graphic two-column Hero with no photo**: text left, a stack of "dream cards" (real icons) right. Honest by design: no fake people, no fake storefront. Replace with a full-bleed photo when the client sends a real one (ASSET NEEDED).

Accent rules: `--color-accent` ONLY on primary CTAs, focus/active states, the heading emphasis word, at most 1 focal detail per section. Eyebrows/icons/secondary labels: `text-text-muted` or navy. WhatsApp buttons WITH text: `bg-whatsapp text-deep`. Icon-only FAB: white icon on `bg-whatsapp`.

House rules: no eyebrow/chip above the Hero H1. **Never an em dash** in rendered text. Never invent numbers, prazos, taxas, valores, years, reviews, ratings, team names or promises. Every `<button>` gets `cursor-pointer`. Variable-height card grids: `items-start`. Content visible immediately (no whileInView hiding). `useReducedMotion()` zeroes motion.

## Design Tokens
Already applied in `src/index.css` (do not edit): `bg`, `surface`, `surface-2`, `line`, `text`, `text-muted`, `deep`, `navy`, `on-deep`, `on-deep-muted`, `line-deep`, `accent`, `accent-hover`, `accent-fg`, `accent-on-deep`, `star`, `whatsapp`, fonts `font-display`, `font-sans`. Use as Tailwind classes (`bg-bg`, `text-text-muted`, `border-line`, `bg-deep`, `text-on-deep`...).
Section backgrounds (no two equal back to back, so no divider needed):
Nav `bg-bg`/blur → Hero `bg-bg` → Parceiros `bg-deep` → Solucoes `bg-bg` → Sonhos `bg-surface-2` → ComoFunciona `bg-deep` → Duvidas `bg-bg` → Contato `bg-surface-2` → Footer `bg-deep`.
Padding `py-16 sm:py-20`. Container `max-w-6xl mx-auto px-4 sm:px-6`. Cards `rounded-2xl`/`rounded-3xl`, buttons `rounded-full`.

## Shared files (import, never duplicate)
`src/content.ts`: `EMPRESA`, `CONTATO`, `waLink(text)`, `PARCEIROS`, `SOLUCOES`, `BENS`. Always show the REAL phone numbers from `CONTATO`. There is NO e-mail and NO business hours: do not show either.

## Cross-section contracts
- Ids: Hero `inicio`, Parceiros `parceiros`, Solucoes `solucoes`, Sonhos `sonhos`, ComoFunciona `como-funciona`, Duvidas `duvidas`, Contato `contato`.
- Nav links: Soluções `#solucoes`, Seu sonho `#sonhos`, Como funciona `#como-funciona`, Dúvidas `#duvidas`, Contato `#contato`. Nav is `fixed`, transparent at top, `bg-bg/90 backdrop-blur` + bottom border when `scrolled || menuOpen`. Nav publishes `--nav-height` on `document.documentElement` from a `ResizeObserver` on the bar row (reference: `react-clients/jonatas-hotts/src/sections/Nav.tsx`; `react-clients/dc-consorcios/src/sections/Nav.tsx` has the same pattern). Hero consumes `var(--nav-height, 4.5rem)`.
- Sections' root element gets its `id` and `scroll-mt-[var(--nav-height,4.5rem)]`.
- Floating WhatsApp FAB lives in `Footer.tsx`, hides while `#inicio` is on screen (IntersectionObserver threshold 0.3, `opacity-0 translate-y-4 pointer-events-none` + `inert`; reference `dc-consorcios/src/sections/Footer.tsx`).
- No photos are used anywhere. No people imagery. Partner names are plain text wordmarks, never invented logos.
- Icons: literal, compared across lucide-react / react-icons (fa6, md, tb, pi, gi); motorcycle, truck, tractor, boat, house, plane must be unmistakable at 28px.

## Motion Language Plan
| Section | Animation mechanism |
|---|---|
| Nav | Scroll-driven chrome (transparent, then `bg-bg/90` blur) + mobile menu via `AnimatePresence` height/opacity; hamburger below `lg` |
| Hero | Rotating dream word in the H1 (AnimatePresence, vertical slide, ~2.6s) synced with a stack of dream cards on the right that fans/shuffles to bring the matching card to the front; subtle ambient red glow behind |
| Parceiros | Pointer-follow spotlight on the navy band (radial gradient tracks the mouse via `useMotionValue`, static soft glow on touch) + partner tiles lift on hover |
| Solucoes | Idle float on the 4 cards, different duration/delay per card; icon tilts on hover |
| Sonhos | Tabs with a `layoutId` sliding pill; the panel for the selected bem swaps with AnimatePresence, big icon morphs/slides in |
| ComoFunciona | Auto-advancing stepper (AnimatePresence) with a progress bar per step, pause on hover, click a step to jump |
| Duvidas | Chat-bubble thread: user question bubbles and answer bubbles with a short typing-dots indicator when a question is opened (all questions visible, answers revealed on tap, first one open) |
| Contato | Card with a slow-rotating conic-gradient border + map embed; copy-number button with animated check feedback |
| Footer | Floating WhatsApp FAB with a periodic "ping" ring (every ~4s), hides over the Hero |

## Final Section List
1. **Nav**: logo + anchors + WhatsApp CTA.
2. **Hero** (`#inicio`): H1 "Qual é o seu *sonho*?" style built on the client's own tagline; paragraph, CTAs, real representation line.
3. **Parceiros** (`#parceiros`): "Representantes autorizados" of BB Consórcios, Acerte Consórcios and BV Financeira (the ONLY real proof the client has). Footnote: "Informações divulgadas pelo próprio ConsorciCred." No testimonials exist, none invented.
4. **Soluções** (`#solucoes`): the four things they sell (consórcio novo, contemplado, financiamento, empréstimo).
5. **Sonhos** (`#sonhos`): the client's own list of bens (carro, moto, caminhão, trator, imóvel, barco, viagem, serviços) as an interactive picker, each with a WhatsApp CTA prefilled for that bem.
6. **Como funciona** (`#como-funciona`): honest explanation of how a consórcio works, no guaranteed date.
7. **Dúvidas** (`#duvidas`): chat-style answers to common consórcio questions, general and honest.
8. **Contato** (`#contato`): office on Rua Piauí, map, both real phone numbers, Instagram.
9. **Footer**.

No About, no Testimonials, no stats block, no pricing (nothing verified).

## Copy notes (builders may adjust microcopy, NEVER invent facts)
- Hero H1: "Qual é o seu *sonho*?" with a rotating word is NOT the H1 emphasis: H1 = "Qual é o seu sonho? Nós temos um plano para você." where the word after "plano" or the rotating word is the one emphasis. Paragraph: "Consórcios novos e contemplados, financiamentos e empréstimos, em Londrina. Representante autorizado de BB Consórcios, Acerte Consórcios e BV Financeira." Primary CTA "Falar no WhatsApp" (`waLink('Olá! Vim pelo site da ConsorciCred e quero saber qual plano serve para mim.')`), secondary "Ver soluções" `#solucoes`. Small line: "Rua Piauí, 399, Centro, Londrina".
- Como funciona steps (generic, same honest mechanic as a consórcio): 1 Você escolhe o objetivo e o plano; 2 Paga parcelas mensais sem juros, junto com o grupo (taxa de administração conforme o plano); 3 Contemplação por sorteio ou lance, sem data garantida; 4 Usa a carta de crédito para comprar o bem. Mention "cartas contempladas" as the option for who does not want to wait for the draw.
- Dúvidas (general, hedge plan-specific facts with "varia conforme o plano/administradora, consulte"): "Consórcio tem juros?", "Como sou contemplado?", "Posso dar lance?", "Qual a diferença entre consórcio e financiamento?", "O que é carta contemplada?", "Posso consorciar outros bens além de carro e casa?" (say: fale com a gente para ver o que está disponível), "Como faço para simular?" (WhatsApp). No rates, no prazos, no valores.
- Never write "entrada a partir de R$ 5.000" or any old Instagram price.

## Open Questions
- Acerte Consórcios: confirmed by the user (name) and logo taken from acerteconsorcios.com.br. Partner logos are real trademarks shown only to identify the partners; client must confirm the authorization.
- Authorization of "representante autorizado" (shown as the client's own claim).
- Two phone numbers confirmed by the user; e-mail and hours unknown.
- Real photos of the office/team (would replace the Hero graphic).
