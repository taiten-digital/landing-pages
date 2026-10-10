# Design Brief — Talita (`talita`)

## Aesthetic Direction & References
Identidade da **Taiten** (manual oficial): preto fosco #0A0A0A, azul elétrico
#1E6BFF, grafite #2A2D31, branco, fundo claro off-white. Space Grotesk
(títulos e texto) e IBM Plex Mono (datas e etiquetas). Acabamento no nível da
proposta comercial do C40: uma fonte de luz azul por seção escura, linha com
núcleo nítido e halo, granulação. O C40 entra só pelo logo, grande, sobre luz
azul no Hero. O usuário aprovou essa "pegada" no PDF v3 e pediu sem foto da
Talita.

## Design Tokens
```css
@theme {
  --color-bg: #F8F8F6;
  --color-surface: #FFFFFF;
  --color-surface-2: #EFEFEB;
  --color-ink: #0A0A0A;
  --color-graphite: #2A2D31;
  --color-text: #0A0A0A;
  --color-text-muted: #5E6168;
  --color-line: #E2E2DE;
  --color-accent: #1E6BFF;
  --color-accent-hover: #1757D6;
  --color-accent-fg: #FFFFFF;
  --font-display: 'Space Grotesk', system-ui, sans-serif;
  --font-sans: 'Space Grotesk', system-ui, sans-serif;
  --font-mono: 'IBM Plex Mono', ui-monospace, monospace;
}
```

## Motion Language Plan
| Section | Animation mechanism |
|---|---|
| Nav | Header ganha fundo ao rolar; menu mobile com opacity + y |
| Hero | Linha de luz desenhada no carregamento (pathLength) + brilho ambiente pulsando atrás do logo |
| Acompanhamento | Barra de progresso preenchendo no carregamento + contagem de dias |
| Cronograma | Linha vertical do tempo preenchida até a etapa atual (real mechanic) |
| Próximos passos | Cartões com elevação no hover |
| Entregas | Idle float com fase diferente por item |
| Combinados | Cartão de contato com halo pulsando |
| Footer | Estático |

## Final Section List
- Nav: navegação entre partes do acompanhamento.
- Hero: boas-vindas, logo C40, datas principais.
- Acompanhamento: etapa atual, progresso e últimas atualizações. É o motivo
  da página existir (a Taiten atualiza `src/data/projeto.ts`).
- Cronograma: as 8 etapas com status.
- Próximos passos: o que a Talita precisa fazer agora, com itens marcados
  como recebidos conforme chegam.
- Entregas: o escopo do Plano 3.
- Combinados: regras de trabalho e contato.
- Footer.

Atualizar a página: editar só `src/data/projeto.ts` (status das etapas,
itens recebidos, atualizações e data) e fazer o deploy.

## Open Questions
Nenhuma bloqueante.
