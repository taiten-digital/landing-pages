# Design Brief — Rafael Kudo (`rafael-kudo`)

## Aesthetic Direction & References
Direção extraída do material de marketing real do próprio cliente (3 slides
de credenciais enviados), não inventada: fundo **preto/quase-preto** com
texto de destaque em **verde vibrante**, títulos em fonte bold/blocky. Isso
diferencia visualmente de `jonatas-hotts` (navy + azul elétrico) mantendo o
mesmo espírito "alta performance/escuro/premium" da casa.

Hero: sem foto real em paisagem do cliente ainda (única foto real é um
recorte de estúdio em retrato, 576×641). Decisão tomada com o usuário: Hero
full-bleed usa uma foto de stock de academia vazia, escura/moody
(`src/assets/images/hero-gym-pexels.jpg`, Pexels, fotógrafo Leon Mart,
licença Pexels — grátis para uso comercial, sem necessidade de atribuição,
4288×2848, paisagem), sem pessoas nela, só ambiente — mantém o padrão
full-bleed dos irmãos sem implicar que a foto seja do Rafael. A foto real
dele (`rafael-kudo-retrato.png`) aparece em destaque na seção Sobre.

## Design Tokens
```css
@theme {
  --color-bg: #0A0B0C;
  --color-bg-alt: #131517;
  --color-surface: #1A1D1F;
  --color-border: rgba(255, 255, 255, 0.08);

  --color-primary: #16181B;
  --color-primary-fg: #F5F7F5;

  --color-accent: #3CFF7A;       /* verde vibrante, extraído do material real do cliente */
  --color-accent-2: #9CFFC2;     /* verde claro, para gradient-text junto do accent */
  --color-accent-fg: #06140A;    /* texto escuro sobre botões verdes, contraste melhor que branco */

  --color-text: #F2F3F2;
  --color-text-muted: #9AA39D;

  --font-display: 'Anton', system-ui, sans-serif;
  --font-sans: 'Inter', system-ui, sans-serif;

  --radius-card: 1rem;
  --radius-full: 999px;
}
```
Google Fonts: `Anton` (400, display/headlines) + `Inter` (400–800, corpo) —
importar via `@import url(...)` antes de `@import "tailwindcss";` em
`src/index.css`, mesmo padrão dos outros clientes. `--font-sans` precisa
manter esse nome exato (gotcha documentado no CLAUDE.md raiz — Tailwind v4
só lê o body font de um token literalmente chamado `--font-sans`).

Default section padding: `py-16 sm:py-20`.

**Background alternation** (nenhum par de vizinhas repete fundo, então
nenhuma precisa de `border-t` divisor):
| # | Seção | bg |
|---|---|---|
| 1 | Nav | transparente/`--color-bg` com blur ao scroll |
| 2 | Hero | foto full-bleed com scrim sobre `--color-bg` |
| 3 | Sobre | `--color-bg-alt` |
| 4 | Método | `--color-bg` |
| 5 | Números | `--color-bg-alt` |
| 6 | Planos | `--color-bg` |
| 7 | Contato | `--color-bg-alt` |
| 8 | Footer | `--color-primary` |

## Motion Language Plan
| Section | Animation mechanism |
|---|---|
| Nav | Scroll-aware chrome: background/blur transitam ao passar de `y=0`; header opaco quando `scrolled \|\| menuOpen` (nunca só `scrolled`, ver gotcha do CLAUDE.md raiz). Links com underline `whileHover`. |
| Hero | Foto full-bleed com Ken Burns contínuo (zoom lento em loop) + glow ambiente verde atrás do headline + entrada por montagem (stagger fade+slide, roda uma vez). |
| Sobre | Idle float contínuo e sutil na moldura da foto real dele (amplitude pequena, ~6-8px). |
| Método | As 3 frentes do método (Física, Mental, Nutricional) como stepper auto-avançante (`AnimatePresence` + timer) — o mecanismo real do processo carrega o motion, não decoração estática. |
| Números | Marquee horizontal com largura medida (não 2 cópias fixas) dos números/credenciais reais (20 anos, 300k alunos, 16 pós-graduações, 6 livros, etc.) em loop contínuo. |
| Planos | 4 cards (Basic, VIP, Mentor 1, Mentor Pleno) com `whileHover`/`whileTap` (lift + realce de borda verde) — motion nasce da interação, sem float contínuo. `items-start` no grid (conteúdo varia entre planos). |
| Contato | Gradient-text (`accent` → `accent-2`) no headline + `whileHover`/`whileTap` no botão de WhatsApp. Sem loop contínuo — seção de CTA direta. |
| Footer | Estático, só hover states em links. |

Todos os 8 mecanismos são distintos entre si.

## Final Section List
1. **Nav** — logo + links + CTA WhatsApp.
2. **Hero** — headline de autoridade/alta performance, CTA WhatsApp, foto
   full-bleed de stock (ambiente de academia).
3. **Sobre** — quem é o Rafael, foto real dele, resumo da formação
   multidisciplinar (Ed. Física + Nutrição + Hipnose Clínica + Psicoterapia).
4. **Método** — as 3 frentes reais do método dele (Física, Mental,
   Nutricional), do slide "Meu Método" que ele já usa.
5. **Números** — os números/credenciais reais dele (20 anos, 300k alunos, 16
   pós-graduações, 6 livros, centenas de certificados) — substitui a seção
   de Depoimentos, que não existe ainda (ver client-brief.md, PROOF NEEDED).
6. **Planos** — os 4 planos reais (Personal Basic, Personal VIP, Mentor 1,
   Mentor Pleno), confirmados no site atual dele.
7. **Contato** — WhatsApp (43) 99172-0681 + Instagram.
8. **Footer** — logo, links rápidos, WhatsApp/Instagram, copyright.

Nenhuma seção de Depoimentos/FAQ/Galeria foi adicionada — sem prova real
disponível para depoimentos, e nenhum outro pedido do cliente para as outras.

## Open Questions
- Confirmar tom de voz e público-alvo prioritário com o cliente antes de a
  copy final ser travada pelos `section-builder` agents (ver
  `client-brief.md`).
- Se o cliente mandar uma foto real em paisagem/ambiente no futuro, o Hero
  pode trocar o stock pela foto real dele — não bloqueante para este build.
- Nomes de veículos de mídia, se ele quiser citá-los na seção Números —
  hoje fica como "entrevistas na TV e matérias em jornais e revistas" sem
  nomear, para não inventar.
