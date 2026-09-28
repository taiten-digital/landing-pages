# Design Brief: Conquista CaixaAqui (`caixa-aqui`)

## Aesthetic Direction & References
Referência dada pelo usuário: o Instagram do cliente ("com design para você
seguir"). Azul royal dominante, dourado de destaque, branco; tipografia
geométrica bold, headings em caixa-alta ou peso 800 com UMA palavra de ênfase
em itálico dourado (como "*organizar*", "*rápida*" nos posts); cards brancos
bem arredondados sobre azul. Clima: confiável, bancário sem ser frio, otimista.

Tipografia: **Montserrat** (display, 600-800 + itálico 700/800, multi-peso:
`font-bold`/`font-extrabold` são permitidos) + **Nunito Sans** (corpo/UI).
Headings `leading-[1.1]` ou mais (acentos em caixa-alta: "CONSTRUÇÃO").

Logo: `src/assets/images/logo-conquista.png` (328×175, transparente, letras
BRANCAS + casa dourada): só sobre fundo `bg-deep`/`bg-brand`/foto escura.
Selo CAIXA: `src/assets/images/logo-caixa.svg` (logotipo azul+laranja): só
dentro de um chip BRANCO (`bg-white rounded-full px-3 py-1.5`), ao lado do
texto "Correspondente CAIXA Aqui". Import de cada asset com comentário de
origem (ver client-brief.md).

Accent dourado (`--color-accent`) SÓ em: botões CTA, foco/ativo, a palavra
em itálico do heading e no máximo 1 detalhe focal por seção. Texto sobre
dourado é sempre `text-accent-fg` (navy), nunca branco. Eyebrows e ícones
secundários: `text-text-muted` (claro) / `text-on-dark-muted` (escuro).
Botões WhatsApp com TEXTO: `bg-whatsapp text-deep` (branco sobre `#25D366`
não passa AA). Só ícone (FAB): ícone branco sobre `bg-whatsapp` é ok.

Sem eyebrow/chip acima do H1 do Hero (regra da casa). Nunca travessão (—)
em texto renderizado. Nunca inventar números, prazos ou taxas: taxa só a de
`src/simulador.ts`.

## Design Tokens
Já aplicados em `src/index.css` (não editar):
```css
@theme {
  --color-bg: #F3F7FB;  --color-surface: #FFFFFF;
  --color-text: #0B2440;  --color-text-muted: #4A5F76;
  --color-brand: #185C90;  /* fundo exato do logo */
  --color-deep: #0B2A47;  --color-deep-2: #12395E;
  --color-on-dark: #FFFFFF;  --color-on-dark-muted: #C3D4E6;
  --color-accent: #F5A623;  --color-accent-hover: #FFB940;  --color-accent-fg: #0B2440;
  --color-star: #FBBC04;  --color-whatsapp: #25D366;
  --font-display: 'Montserrat', system-ui, sans-serif;
  --font-sans: 'Nunito Sans', system-ui, sans-serif;
}
```
Fundo por seção (nenhum repetido em sequência, sem divisória necessária):
Hero (foto) → Simulador `bg-brand` → Serviços `bg-bg` → Como funciona
`bg-deep` → Avaliações `bg-bg` → Contato `bg-brand` → Footer `bg-deep`.
Padding `py-16 sm:py-20`. Container `max-w-6xl mx-auto px-4 sm:px-6`.
Cards: `rounded-3xl`; botões `rounded-full`. Todo `<button>` com `cursor-pointer`.
Grids com cards de altura variável: `items-start`.

## Shared files (importar, nunca duplicar)
- `src/content.ts`: `EMPRESA`, `CONTATO`, `waLink(text)`, `SERVICOS`, `AVALIACOES`, `DESTAQUES`.
- `src/simulador.ts`: `simular()`, `brl()`, `TAXA_ANUAL_REFERENCIA`, `COTA_MAXIMA`, `PRAZO_MAXIMO_MESES`, `COMPROMETIMENTO_RENDA`.

## Cross-section contracts
- Ids: Hero `inicio`, Simulador `simulador`, Serviços `servicos`, Como funciona
  `como-funciona`, Avaliações `avaliacoes`, Contato `contato`.
- Nav é `fixed`, transparente no topo sobre a foto; opaca `bg-deep/90 backdrop-blur`
  quando `scrolled || menuOpen`. Nav publica `--nav-height` em
  `document.documentElement` via `ResizeObserver` na linha da barra (`<nav>`),
  não no `<header>` (referência: `react-clients/jonatas-hotts/src/sections/Nav.tsx`).
- Hero consome: `min-h-screen supports-[height:100svh]:min-h-svh` com
  `pt-[var(--nav-height,4.5rem)]` (a Nav fica por cima da foto).
- Botão WhatsApp flutuante fixo (canto inferior direito) mora no Footer.tsx.

## Motion Language Plan
| Section | Animation mechanism |
|---|---|
| Nav | Chrome por scroll (transparente → `bg-deep/90`) + menu mobile com `AnimatePresence` (altura/opacidade); abaixo de `lg` vira hambúrguer |
| Hero | Ken Burns lento na foto (scale 1 → 1.08, alternando) + H1 entrando linha a linha no mount (não scroll) |
| Simulador | Números do resultado em tween animado (`useSpring`/`animate` de motion value) a cada mudança de input + barras SAC vs PRICE com largura animada por `layout`/spring |
| Serviços | Idle float nos 6 cards com fase diferente por item + ícone que gira/levanta no hover |
| Como funciona | Stepper com avanço automático (~3,5s) e barra de progresso real por etapa; painel troca com `AnimatePresence`; clique fixa a etapa |
| Avaliações | Marquee infinito horizontal de cards (cópias medidas, não fixas em 2), pausa no hover; reduced motion = grid estático |
| Contato | Anel pulsando em volta de um pino sobre o mapa + glow dourado respirando atrás do card de contato |
| Footer | Botão WhatsApp flutuante com anel de "ping" periódico (a cada ~4s, não contínuo) |

## Final Section List
1. **Nav**: logo + âncoras numa página longa, CTA de simulação sempre à mão.
2. **Hero** (`#inicio`): o slogan real deles, o selo CAIXA Aqui e o CTA para simular.
3. **Simulador** (`#simulador`): a razão da página (pitch: "página de vendas com simulação"). Converte em conversa no WhatsApp.
4. **Serviços** (`#servicos`): eles vendem 6 linhas de crédito; quem não vai financiar imóvel também precisa se achar.
5. **Como funciona** (`#como-funciona`): tira o medo da burocracia, que é exatamente o que os clientes elogiam ("sem burocracia", "acompanhou todo o processo").
6. **Avaliações** (`#avaliacoes`): a única prova real: 4 avaliações do Google.
7. **Contato** (`#contato`): escritório físico no centro de Londrina, WhatsApp, mapa.
8. **Footer**: marca, contato, crédito CAIXA, ©, botão WhatsApp flutuante.

Sem FAQ (as respostas exigiriam regras/prazos que o cliente não confirmou) e sem "Sobre" (nenhuma foto nem história confirmada da equipe).

### Copy por seção (base aprovada: o builder ajusta microcopy, mas NÃO inventa fatos, números, prazos ou promessas)

**Nav**: logo (h-9 a h-11). Links: Simulador `#simulador`, Serviços `#servicos`,
Como funciona `#como-funciona`, Avaliações `#avaliacoes`, Contato `#contato`.
CTA: "Simular agora" → `#simulador`.

**Hero** (`#inicio`)
- Foto: `public/images/hero-casa-entardecer-{1200,2400,mobile}.jpg` (srcset + `<picture>` com recorte retrato 900×1600 para celular + preload no index.html; fade-in quando carrega; original 2400×1600 paisagem; céu azul escuro à esquerda, casa iluminada à direita). `object-cover object-[70%_center]`. Scrim preto neutro localizado: `bg-gradient-to-t from-black/70 via-black/20 via-40% to-transparent` + no `lg` um lateral `bg-gradient-to-r from-black/55 via-black/20 to-transparent`. Confirmar que a casa continua visível. Sem filtros na foto.
- Texto à esquerda, empilhado: H1, sub, CTAs, linha de credencial.
- H1: "Facilitando suas *conquistas*." ("conquistas" em itálico dourado `text-accent`).
- Sub: "Correspondente CAIXA Aqui em Londrina. Simule seu financiamento em segundos e conte com a gente em todo o processo, da simulação à assinatura."
- CTA primário "Simular meu financiamento" → `#simulador`; secundário ghost (borda branca) "Falar no WhatsApp" → `waLink('Olá! Vim pelo site e quero falar sobre financiamento.')` (target _blank, rel noopener).
- Credencial: chip branco com `logo-caixa.svg` + "Correspondente CAIXA Aqui" · "Rua Pio XII, 303 · Centro de Londrina".

**Simulador** (`#simulador`, `bg-brand`, texto branco)
- H2: "Simule seu *financiamento*". Sub: "Descubra quanto fica a parcela do seu imóvel. Depois, receba a simulação oficial no WhatsApp."
- Chips de fatos (de `DESTAQUES`): "Financie até 80% do valor do imóvel" · "Teto do SFH: R$ 2.250.000,00". (Pode reescrever curto, sem mudar o fato.)
- Formulário (card `bg-deep-2` ou branco): Objetivo (chips: Comprar imóvel / Construir), Valor do imóvel (input R$ + slider, 100.000 a 2.250.000, padrão 300.000), Entrada (input R$ + slider, mínimo `entradaMinima`, padrão 20%), Prazo (slider em anos, 5 a 35, padrão 30). Se a entrada for menor que o mínimo, avisar "A CAIXA financia até 80%: a entrada mínima para esse imóvel é X" (o cálculo já usa o mínimo).
- Resultado (card branco, texto navy): Valor financiado; **Tabela PRICE** parcela fixa; **Tabela SAC** primeira parcela → última parcela; barras comparando PRICE vs SAC 1ª parcela; "Renda familiar indicada: a partir de X" (parcela / 30%).
- Aviso obrigatório, visível (não em tooltip): "Estimativa com taxa de referência de 11,19% a.a. + TR (CAIXA SBPE). Não inclui TR, seguros obrigatórios e tarifas. Condições reais dependem da análise de crédito da CAIXA." (formatar a taxa a partir de `TAXA_ANUAL_REFERENCIA`).
- CTA (dourado): "Quero a simulação oficial no WhatsApp" → `waLink` com mensagem montada: objetivo, valor do imóvel, entrada, prazo, parcela estimada PRICE e SAC.
- Inputs acessíveis: `<label>` real, `inputMode="numeric"`, formatação BRL.

**Serviços** (`#servicos`, `bg-bg`)
- H2: "Crédito para cada *conquista*". Sub: "Do primeiro imóvel ao consignado, a gente cuida do processo com você."
- 6 cards de `SERVICOS` (título + texto), ícone literal por serviço (pesquisar lucide/react-icons, comparar candidatos: compra = casa com chave; construção = capacete/tijolos; garantia = casa com cifrão ou escudo; consórcios = grupo/calendário; consignado = carteira/contracheque; seguros = escudo). Ícone em `text-brand`, não dourado.
- Cada card: link "Quero saber mais" → `waLink('Olá! Quero saber mais sobre ' + titulo + '.')`.

**Como funciona** (`#como-funciona`, `bg-deep`)
- H2: "Do sonho à *assinatura*, com você em cada etapa".
- Etapas (sem prazos):
  1. Simulação: "Você simula aqui no site ou fala com a gente pelo WhatsApp."
  2. Documentação: "A gente orienta quais documentos separar e confere tudo com você."
  3. Análise e avaliação: "Seu crédito passa pela análise da CAIXA e o imóvel pela avaliação de engenharia."
  4. Assinatura: "Com tudo aprovado, você assina o contrato e a conquista é sua."
- Fecho + CTA: "Começar pela simulação" → `#simulador`.

**Avaliações** (`#avaliacoes`, `bg-bg`)
- H2: "Quem conquistou com a gente *recomenda*". Sub: "Avaliações reais de clientes no Google."
- Cards de `AVALIACOES`: avatar de INICIAIS (nunca foto), nome, 5 estrelas `text-star`, ícone Google (react-icons `FcGoogle`), texto literal completo (não resumir, não corrigir). Largura de card fixa (~w-[320px] sm:w-[360px]) e `items-start`.
- NÃO mostrar total de avaliações nem nota média.

**Contato** (`#contato`, `bg-brand`)
- H2: "Vamos tirar seu *plano* do papel?". Sub: "Fale com a Conquista pelo WhatsApp ou venha até o nosso escritório no centro de Londrina."
- Card: WhatsApp com o número REAL visível "(43) 99920-9408" (botão), endereço completo "Rua Pio XII, 303, Sala 3, Centro, Londrina - PR", chip CAIXA Aqui. Horário: não exibir (UNKNOWN).
- Mapa: `<iframe src={"https://www.google.com/maps?q=" + encodeURIComponent(CONTATO.mapsQuery) + "&output=embed"} loading="lazy" title="Mapa: Conquista Financiamentos, Rua Pio XII, 303, Londrina">` em `rounded-3xl`, + link "Abrir no Google Maps".

**Footer** (`bg-deep`)
- Logo, slogan "Facilitando suas conquistas!", WhatsApp (número real), endereço, "Correspondente CAIXA Aqui", links de âncora, "© 2026 Conquista Financiamentos".
- Botão WhatsApp flutuante fixo `bottom-5 right-5`, `aria-label="Falar no WhatsApp: (43) 99920-9408"`, ícone `FaWhatsapp` branco sobre `bg-whatsapp`.

## Open Questions
- Taxa de referência (PROOF NEEDED), @ do Instagram, e-mail, horário.
