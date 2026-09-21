# Design Brief — Don Leon Barbearia Londrina (`don-leon-barbearia-londrina`)

## Aesthetic Direction & References
Cliente confirmou: usar a identidade visual **real** da marca (preto +
branco + azul, do logo/"High Experience"), não inventar uma nova. Direção
pedida: "clássico moderno e estiloso, sem se afeminar muito" — masculino,
confiante, robusto. Referência visual real do próprio ambiente físico
(`interior-lounge-couch.jpg`, `interior-barber-portrait.png`): industrial-
vintage, tijolo aparente, couro, madeira, memorabilia esportiva (NBA,
boxe) — usar essa linguagem como norte em vez de um "barbershop genérico"
de banco de imagens.

## Design Tokens
```css
@theme {
  --color-bg: #0b0c0f;
  --color-bg-panel: #16181d;
  --color-fg: #f2efe9;
  --color-fg-muted: #a8a9ad;
  --color-accent: #2f5fd6;
  --color-accent-2: #6f95f2;
  --color-leather: #a9713f;
  --font-display: 'Oswald', 'Arial Narrow', sans-serif;
  --font-sans: 'Inter', system-ui, sans-serif;
  --radius-card: 1rem;
}
```
`--color-accent`/`--color-accent-2` vêm do azul real do script "High
Experience" do logo. `--color-leather` é um tom de couro/madeira extraído
do ambiente real (sofá, marcenaria) para dar profundidade além do
preto/branco/azul plano — usar com moderação (detalhes, não fundo).
`Oswald` (condensado, forte, maiúsculas robustas) para títulos — ecoa a
tipografia clássica/carimbo do logo sem cair em serifado delicado; `Inter`
para corpo de texto.

**Espaçamento (decisão final pós-feedback):** `py-16 sm:py-20` em toda
seção (o `py-24 sm:py-32` inicial deixava até 256px de vazio entre duas
seções). Divisória `border-t border-white/5` nas transições onde o fundo
repete (Serviços→Galeria, Avaliações→Unidades, ambas `bg-bg`), já que
cor igual sozinha não dá nenhuma pista visual de que uma seção nova
começou.

## Motion Language Plan
| Section | Animation mechanism |
|---|---|
| Nav | Sticky com blur sutil ao rolar; ícone do leão com micro-rotação só no hover (sem animação contínua, pra não competir com o Hero) |
| Hero | Glow ambiente azul atrás do headline + gradient-text no nome "Don Leon"; foto `interior-lounge-couch.jpg` com leve Ken Burns (zoom lento contínuo) |
| Serviços | Cards (Corte/Barba/Sobrancelha/Combo) com idle-float phase-offset, um ícone por serviço |
| Galeria de cortes | Carrossel arrastável/auto-avançável das 6 fotos reais de corte — o mecanismo real (carrossel) carrega o movimento, não decoração ao lado |
| Sobre/Ambiente | Split-layout com a foto do interior em Ken Burns próprio (zoom/pan lento distinto do Hero) + texto sobre a experiência física |
| Avaliações | Número "4,9" em gradient-text com count-up de 0 a 4,9 uma vez ao montar (mecanismo real: é literalmente a nota subindo) — sem inventar contagem de reviews |
| Unidades | As 4 unidades como cards expansíveis (accordion) — toca/clica pra abrir endereço+horário+telefone, com a própria foto da fachada real daquela unidade |
| Contato/Agendar | Anel de glow pulsante ao redor do CTA principal (App Store/Google Play + telefone), distinto do glow difuso do Hero por ser justado ao botão |
| Footer | Marquee horizontal lento com nome das 4 unidades + redes sociais |

Nenhum mecanismo se repete entre seções vizinhas. Ver `motion-playbook`
para as receitas exatas de cada um (idle-float com offset, glow com blur
grande, gradient-text, `useReducedMotion`, etc.).

## Final Section List
1. **Nav** — identidade + navegação + link de agendamento sempre visível.
2. **Hero** — primeira impressão, usa a foto real do lounge, nome da marca,
   CTA principal.
3. **Serviços** — corte, barba, sobrancelha (e derivados), combo — sem
   preços, conforme pedido do cliente.
4. **Galeria de cortes** — prova visual do trabalho real (6 fotos reais).
5. **Sobre/Ambiente** — por que a experiência física importa (lounge,
   "High Experience"), não só o corte em si.
6. **Avaliações** — prova social real (4,9★ Google, verificado).
7. **Unidades** — as 4 unidades como detalhe/lista, conforme pedido do
   cliente (não é o foco principal da página).
8. **Contato/Agendar** — CTA final: app iOS/Android + telefone por unidade.
9. **Footer** — reforço de marca + redes sociais + unidades.

## Open Questions
Nenhuma pendente para iniciar a Fase 4 — cliente confirmou paleta e lista
de seções.
