# Design Brief — Talita Lopes (`talita-lopes`)

**MIGRAÇÃO, não descoberta nova.** Paleta, tipografia e decisões de motion
abaixo vêm do `clients/talita-lopes/src/tokens.css` e
`design/design-direction.md` reais, já validados com a cliente ao longo de
14 rodadas de feedback — não são propostas novas.

## Aesthetic Direction & References
Rebuild de uma página já existente, mesmo objetivo/oferta, execução
melhorada — não é reposicionamento. Paleta **verificada via Playwright**
contra o site de referência da cliente (não é uma escolha estética livre,
é um dado factual a preservar). Tipografia deliberadamente diferente da
referência (Bricolage Grotesque + Hanken Grotesk, não Fraunces/Karla).
Linguagem de forma: contêineres com cantos quase retos (`--radius-sm/md`),
só os botões CTA são totalmente arredondados (pill) — contraste
deliberado, não um raio uniforme.

## Design Tokens
Ready to paste into `src/index.css`'s `@theme {}` block.
```css
@theme {
  --color-forest: #142016;
  --color-accent: #2f9e52;
  --color-accent-fg: #142016;
  --color-bg: #ffffff;
  --color-sage: #e4f2e8;
  --color-sage-alt: #eaf1ea;
  --color-cream: #fbf9f4;
  --color-muted: #4c5c4f;
  --color-muted-dark: #d7ded8;
  --color-border: #e1e6e2;
  --font-display: 'Bricolage Grotesque', system-ui, sans-serif;
  --font-sans: 'Hanken Grotesk', system-ui, sans-serif;
  --radius-sm: 2px;
  --radius-md: 6px;
  --radius-pill: 999px;
}
```
`--color-muted`/`--color-muted-dark`/`--color-border` acima são
aproximações sólidas dos originais `color-mix()` (Tailwind v4's `@theme`
não resolve `color-mix()` contra outro token na hora da build do jeito que
o CSS puro fazia) — os `section-builder` podem ajustar a opacidade via
Tailwind (`text-fg/70` etc.) quando fizer mais sentido que um token fixo.
`--color-accent-fg` é uma inversão proposital (texto escuro sobre fundo
verde) porque bate ~5.5:1 de contraste AA contra o ~3:1 de texto branco —
**nunca trocar para texto branco sobre `--color-accent`**.
Fontes via Google Fonts no `index.css` (mesma técnica do Don Leon):
`@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;700;800&family=Hanken+Grotesk:wght@400;700;800&display=swap');`

## Motion Language Plan
| Section | Animation mechanism |
|---|---|
| Nav | Sticky com blur/tingimento leve ao rolar (padrão já usado no Don Leon: `--nav-height` via `ResizeObserver`) |
| Hero | Ken Burns na foto de fundo (`scale` 1→1.08 em loop) + parallax de scroll (`useScroll`/`useTransform`, cap de 40px) + onda SVG estática na base + glass card flutuante (idle-float) + botão scroll-cue com bounce |
| Sobre | Módulo antes/depois: shimmer diagonal contínuo no painel "depois" (gradiente animado) + seta pulsante entre os painéis — **nenhuma foto**, decisão final após remoção deliberada |
| Depoimentos | Carrossel arrastável (padrão `Galeria.tsx` do Don Leon, deslocamento travado pela largura real medida) + contador "+10" com count-up ao montar |
| Serviços | Grid bento 6 células, idle-float independente por card (offset por índice) + ícone-marca-d'água com wobble sutil nas células sem foto |
| FAQ | Accordion em formato de thread de chat (padrão `AnimatePresence` do `Unidades.tsx` do Don Leon) — pergunta alinhada à direita, resposta à esquerda com avatar "T" |
| Contato | Stepper de 3 passos auto-avançando com barra de progresso real (`useState`+`setInterval`) + mockup de composer de chat com indicador de digitação (dots em loop) + cards sociais com idle-float (repetir o mecanismo de Serviços aqui é aceitável — não são seções vizinhas) |
| Footer | Rodapé simples, sem mecanismo de motion dedicado |

Cada seção mantém um mecanismo diferente da vizinha, replicando a mesma
distinção que já existia no Astro original (o design já satisfaz essa
regra estruturalmente, só a implementação técnica muda de CSS para Framer
Motion).

**Hero — preservar a matemática exata**: `min-height: calc(100svh -
var(--nav-height) + 80px)` (overshoot proposital de 80px porque a onda
SVG come parte visível da base — não é um erro, é ajuste fino já validado).

**Ícones reais** (troca do sprite SVG desenhado à mão do Astro original —
ver `.claude/agents/section-builder.md`):
| Ícone original | Biblioteca/componente novo |
|---|---|
| whatsapp | `react-icons/fa6` `FaWhatsapp` |
| instagram | `react-icons/fa6` `FaInstagram` |
| mail | `lucide-react` `Mail` |
| clipboard-check | `lucide-react` `ClipboardCheck` |
| dumbbell | `lucide-react` `Dumbbell` |
| monitor | `lucide-react` `Monitor` |
| heart | `lucide-react` `Heart` |
| activity | `lucide-react` `Activity` |
| chevron-right / chevron-left / chevron-down | `lucide-react` `ChevronRight`/`ChevronLeft`/`ChevronDown` |
| close (lista "antes") | `lucide-react` `X` |
| check (lista "depois", credenciais) | `lucide-react` `Check` |
| star (linha do Google) | `lucide-react` `Star` |
| quote (aspas do depoimento) | `lucide-react` `Quote` |

## Final Section List
Ordem exata a preservar (Depoimentos vem antes de Serviços — não inverter):
1. **Nav** — marca + navegação (Sobre/Serviços/Depoimentos/FAQ) + CTA WhatsApp sempre visível.
2. **Hero** — primeira impressão, foto real de fundo, headline com destaque em "você", CTA com pulse.
3. **Sobre** — módulo antes/depois + credenciais, sem foto (decisão final).
4. **Depoimentos** — prova social real (3 depoimentos verbatim + "10 anos" + linha do Google sem contagem).
5. **Serviços** — bento de 6 células (1 featured por posição/borda, não por tamanho).
6. **FAQ** — 6 perguntas reais em formato de chat.
7. **Contato** — stepper "como funciona" + composer de chat + contatos alternativos.
8. **Footer** — copyright simples em português.

## Open Questions
Nenhuma — brief consolidado a partir de decisões já validadas com a
cliente real. As 3 pendências de conteúdo (`PROOF NEEDED`) estão
documentadas no `client-brief.md` e devem ser preservadas como pendentes,
não resolvidas durante a migração.
