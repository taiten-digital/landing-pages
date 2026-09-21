# Design Brief — Jonatas Hotts (`jonatas-hotts`)

Filled live with the user during the Design Planning Interview (Phase 3 of
`.claude/skills/create-client/SKILL.md`), after `client-brief.md` is done.
Every decision here should trace back to something the client actually said
or approved — don't default to a generic template.

## Aesthetic Direction & References
**Revisão 2** (primeira versão rejeitada pelo cliente final: "as cores
ficaram uma bosta", achou a fonte genérica, e pediu Hero full-bleed igual
`talita-lopes`/`don-leon-barbearia-londrina`). Decisões abaixo substituem
a Revisão 1 por completo.
- Direction: tema **escuro** (navy quase-preto), destaque em **azul
  elétrico** — mais "premium/intenso" do que a Revisão 1's coral sobre
  fundo claro, que o cliente rejeitou.
- Azul-marinho exato amostrado do logo do cliente: `#1F2F53` — mantido,
  agora como o degrau mais claro da escada de tons escuros (não mais como
  "cor primária" isolada sobre fundo claro).
- Cor de destaque: **azul elétrico** `#2F6FED` → `#7DA6FF` (gradient-text).
  Escolhida com o cliente entre 3 direções (vermelho/crimson, azul
  elétrico, verde-lima) — azul elétrico venceu por ficar coeso com o navy
  de marca já existente.
- Tipografia: `Inter`/`system-ui` sozinho foi rejeitado como "genérico".
  Trocado para **Archivo Black** (display/headlines) + **Manrope** (corpo),
  carregadas via `@import url(fonts.googleapis.com)` — mesmo padrão exato
  usado por `talita-lopes` e `don-leon-barbearia-londrina`.
- Assets: a Revisão 1 não tinha nenhuma foto paisagem, então o Hero saiu
  em duas colunas com foto emoldurada em retrato — o cliente rejeitou isso
  também, querendo o mesmo Hero full-bleed dos outros clientes. Ele então
  arrumou e mandou uma foto nova, real, paisagem (1426x831,
  `jonatas-corrida-por-do-sol.png`), resolvendo o bloqueio. Ver
  `client-brief.md` para o inventário completo de assets.
- Movimento: intensidade **moderada** (mantida da Revisão 1) — movimento
  contínuo sutil (float, glow, hover, Ken Burns no Hero), sem exagero.

## Design Tokens
```css
@theme {
  --color-bg: #0B0F1A;
  --color-bg-alt: #10162B;
  --color-surface: #131A2B;
  --color-border: rgba(255, 255, 255, 0.08);

  --color-primary: #1F2F53;      /* navy exato do logo, topo da escada de tons */
  --color-primary-fg: #FFFFFF;

  --color-accent: #2F6FED;       /* azul elétrico */
  --color-accent-2: #7DA6FF;     /* azul claro, para gradient-text junto do accent */
  --color-accent-fg: #FFFFFF;

  --color-text: #F2F3F5;
  --color-text-muted: #9AA3B5;

  --font-display: 'Archivo Black', system-ui, sans-serif;
  --font-sans: 'Manrope', system-ui, sans-serif;

  --radius-card: 1rem;
  --radius-full: 999px;
}
```
Default section padding is `py-16 sm:py-20`. Escada de tons
`bg → bg-alt → surface → primary` (`#0B0F1A → #10162B → #131A2B →
#1F2F53`) dá um degrau visível entre seções vizinhas e cards, terminando
no navy de marca real do cliente.

**Background alternation (para respeitar a regra de nunca repetir bg entre
seções vizinhas):**
| # | Seção | bg |
|---|---|---|
| 1 | Nav | transparente/`--color-bg` com blur ao scroll |
| 2 | Hero | foto full-bleed com scrim sobre `--color-bg` |
| 3 | Sobre | `--color-bg-alt` |
| 4 | Serviços | `--color-bg` |
| 5 | Como Funciona | `--color-bg-alt` |
| 6 | Depoimentos | `--color-bg` |
| 7 | Contato | `--color-bg-alt` |
| 8 | Footer | `--color-primary` (degrau mais claro da escada) |

Nenhum par de seções vizinhas repete o mesmo fundo, então nenhuma precisa
de `border-t` divisor adicional.

## Motion Language Plan
| Section | Animation mechanism |
|---|---|
| Nav | Scroll-aware chrome: background/blur/shadow transitam suavemente ao passar de `y=0` (usar `useScroll`/`useMotionValueEvent`), nunca esconde conteúdo. Links com underline `whileHover`. |
| Hero | Foto full-bleed com Ken Burns contínuo (zoom lento em loop) + glow ambiente azul atrás do headline + entrada por montagem (stagger fade+slide, roda uma vez, não em scroll). |
| Sobre | Idle float contínuo e sutil na moldura da foto (amplitude pequena, ~6-8px), phase distinto de qualquer outro float na página. |
| Serviços | Dois cards (Presencial x Online) com interação `whileHover`/`whileTap` (lift + realce de borda azul) — sem float contínuo, motion nasce da interação. Card Presencial ganhou a foto real dele orientando uma aluna (antes só ícones). |
| Como Funciona | Stepper auto-avançante (o mecanismo real do processo carrega a animação — `AnimatePresence` + `useState`/timer), não uma fileira estática decorada. |
| Depoimentos | Marquee horizontal com largura medida (não 2 cópias fixas) dos 7 depoimentos com nome, com o selo "5.0★ · 50 avaliações no Google" fixo ao lado, fora do loop. |
| Contato | Gradient-text (`accent` → `accent-2`) no headline/CTA + `whileHover`/`whileTap` no botão de WhatsApp. Sem loop contínuo — seção de CTA direta, calma. |
| Footer | Estático, só hover states em links — sem animação contínua (fecha a página em tom sóbrio). |

Todos os 8 mecanismos são distintos entre si.

## Final Section List
1. **Nav** — logo + links + CTA WhatsApp.
2. **Hero** — headline (emagrecimento/hipertrofia + iniciantes), CTA
   WhatsApp, foto full-bleed dele correndo ao pôr do sol.
3. **Sobre** — quem é o Jonatas, diferencial (acompanhamento próximo,
   vídeos de execução, progressão individual) — confirmado no
   client-brief.
4. **Serviços** — Presencial (Londrina) x Consultoria Online — as duas
   modalidades reais que ele oferece.
5. **Como Funciona** — passo a passo do acompanhamento (avaliação inicial
   → plano → vídeos de execução → progressão), baseado no que os
   depoimentos descrevem de fato, não inventado.
6. **Depoimentos** — as 7 avaliações reais do Google com nome + selo
   agregado 5.0★/50 avaliações (única stat usada para o restante das 43
   avaliações sem texto coletado).
7. **Contato** — WhatsApp (43) 99981-3940, Instagram, endereço.
8. **Footer** — logo, links rápidos, WhatsApp/Instagram, copyright.

Nenhuma seção fora desse escopo foi adicionada — cliente não pediu
pricing/FAQ/gallery, e não há prova verificável para uma seção de
certificações ainda.

## Open Questions
- Tom de voz explícito ainda não confirmado — copy vai usar tom direto e
  motivacional (alinhado à bio do Instagram), mas sem inventar jargão que
  o cliente não usa.
- Se o cliente quiser incluir "Jesus é o caminho" (frase da bio do
  Instagram) em algum lugar da página, isso precisa ser pedido
  explicitamente — não foi assumido aqui.
- Se faltar alguma foto (ex. retrato mais "profissional", parado, sem
  ação) para a seção Sobre, pedir ao cliente antes do section-builder
  usar as fotos de ação como substituto.
