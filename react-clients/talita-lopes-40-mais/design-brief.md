# Design Brief: Talita Lopes 40 Mais (`talita-lopes-40-mais`)

## Aesthetic Direction & References
**Paleta remapeada para o logo "Método C40"** (2026-09-28, pedido do
usuário; a primeira versão ameixa/terracota foi substituída). Cores
amostradas do arquivo do logo: verde `#05402C` (fundo do logo, exato),
cobre `#E3A47F` (média), creme `#F8F3EA`. Editorial, elegante e adulto:
base creme, seções escuras no verde do logo, cobre como único accent.

Tipografia: **Cormorant Garamond** (display, 400-600 + itálico, escolhida
pelo usuário para casar com o "C40" do logo; peso base 500 e
`lining-nums` via `@layer base` no index.css, porque a Cormorant usa
numerais old-style por padrão e o "4" de "40" descia da linha) +
**Manrope** (corpo/UI). Rótulos em caixa-alta espaçada ecoam o "MÉTODO"
do logo. Headings display com `leading-[1.1]` ou mais.

Logo: `logo-c40-nav.png` (sem slogan) na Nav e `logo-c40.png` (completo)
no Footer, ambos com o verde recortado para transparente. Só sobre fundo
escuro (vídeo ou `bg-deep`): as letras creme somem no creme.

Forma: cantos generosos (`rounded-3xl` em cards, `rounded-full` em botões e
chips). Grão/ruído não; glows suaves em blush são bem-vindos (blur 40-70px,
gradiente transparente bem antes da borda).

Accent (`--color-accent`, cobre profundo) SÓ em: botões CTA, estado ativo/foco,
e no máximo 1 detalhe focal por seção. Eyebrows e ícones secundários em
`text-text-muted` (seções claras) ou `text-cream/60` (seções escuras).
Blush (`--color-blush`) para glows, halos e itálicos de ênfase em seções escuras.

## Design Tokens
```css
@theme {
  --color-bg: #F8F3EA;        /* creme do logo, fundo padrão */
  --color-surface: #EFE6D8;   /* cards e seção Lista */
  --color-text: #10261C;      /* tinta verde-escura */
  --color-text-muted: #55665C;
  --color-deep: #05402C;      /* verde exato do fundo do logo, seções escuras */
  --color-deep-2: #0B5039;    /* superfícies dentro de seções escuras */
  --color-cream: #F8F3EA;     /* texto em seções escuras */
  --color-accent: #A95A37;    /* cobre profundo: CTAs/foco. Branco ~4.9:1 (o cobre do logo #E3A47F não passa AA com branco) */
  --color-accent-hover: #8F4A2C;
  --color-accent-fg: #FFFFFF;
  --color-blush: #E9B08C;     /* cobre claro: glows, itálicos em fundo verde (~6.7:1) */
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-sans: 'Manrope', system-ui, sans-serif;
}
```
Nunca texto escuro sobre `bg-accent`: o contraste fica abaixo de AA.

Fundo por seção (sem duas iguais em sequência, então não precisa de divisória):
Hero (vídeo) → Para quem é `bg-bg` → O curso `bg-deep` → Sobre `bg-bg` →
Oferta `bg-deep` → FAQ `bg-bg` → Lista de espera `bg-surface` → Footer `bg-deep`.
Padding padrão `py-16 sm:py-20`. Container `max-w-6xl mx-auto px-4 sm:px-6`.

## Shared content file
`src/content.ts` (já existe, escrito pelo orquestrador). Importar dali,
nunca duplicar:
`OFERTA` (produto, preco, parcelamento, modelo, garantiaDias),
`CHECKOUT_URL` e `LINKS` (privacidade, termos).

## Motion Language Plan
| Section | Animation mechanism |
|---|---|
| Nav | Barra fixa: transparente no topo sobre o vídeo, opaca `bg-deep/90 backdrop-blur` com `scrolled \|\| menuOpen`; publica `--nav-height` via `ResizeObserver` na linha da barra; menu mobile com `AnimatePresence` |
| Hero | Vídeo full-bleed + reveal palavra por palavra no H1 (mount, não scroll) + parallax leve do vídeo com `useScroll` + botão pausar/reproduzir |
| Para quem é | Checklist com destaque cíclico automático: um item por vez acende (check preenche, card levanta, glow), avança sozinho ~2,6s, clique fixa |
| O curso | Abas dos 4 pilares com avanço automático e barra de progresso real por aba (`useState` + intervalo); o painel troca com `AnimatePresence` |
| Sobre | Retrato com halo blush respirando + count-up "16" ao montar + marquee infinito das formações (cópias medidas, não fixas em 2) |
| Oferta | Card de preço com borda em conic-gradient girando continuamente + selo "7 dias" circular com texto em rotação lenta + CTA com pulse de sombra |
| FAQ | Accordion com `AnimatePresence` (altura) + ícone girando 45° (+ vira ×) |
| Lista de espera | Campos com glow animado no foco + botão com shimmer + troca animada formulário → estado de sucesso (check desenhando com `pathLength`, via ícone lucide dentro de `motion`) |
| Footer | Nenhum mecanismo dedicado |

## Final Section List
Ordem exata:
1. **Nav**: wordmark e navegação para uma página longa de venda, CTA sempre à mão.
2. **Hero** (sem id, topo): prova viva. A Talita correndo de verdade, a frase dela e o CTA.
3. **Para quem é** (`#para-quem`): identificação. A compradora precisa se ver ali antes do preço.
4. **O curso** (`#curso`): o que ela vai aprender, organizado nos 4 pilares do texto da Talita.
5. **Sobre** (`#sobre`): autoridade. Sem depoimentos, a prova são as credenciais dela.
6. **Oferta** (`#oferta`): preço, o que está incluso, garantia de 7 dias, CTA de compra.
7. **FAQ** (`#faq`): derruba objeções (nunca corri, menos de 40, garantia, saúde).
8. **Lista de espera** (`#lista`): captação de leads (RF01) com consentimento LGPD.
9. **Footer**: marca, CREF, links legais, ©.

### Copy por seção (base aprovada. O builder pode ajustar microcopy, mas NÃO inventar fatos, números ou promessas)

**Nav**: wordmark "Novo Ciclo" (font-display) + "com Talita Lopes" pequeno.
Links: Para quem é `#para-quem`, O curso `#curso`, Sobre `#sobre`,
Investimento `#oferta`, Dúvidas `#faq`. CTA: "Quero meu acesso" → `#oferta`.

**Hero**
- SEM eyebrow/tag acima do H1 (removida a pedido do cliente; regra da casa daqui em diante).
- H1 = slogan do logo em duas linhas: "Corrida inteligente" / "para mulheres *40+*" ("40+" sobre marca-texto `bg-accent`; "mulheres 40+" nunca quebra). Escolha do usuário em 2026-09-28.
- Abaixo, a frase da Talita como citação em itálico (borda esquerda cobre): "Depois dos 40, não é sobre voltar no tempo. É sobre ficar forte para viver bem o futuro."
- Depois: "O curso online da treinadora Talita Lopes.", CTAs, credenciais só em sans ("16 anos de treinamento · Especialista em Gerontologia").
- Tudo alinhado à esquerda e empilhado.
- Scrim preto neutro localizado (baixo + esquerda no lg), vídeo sem filtro.
- Sub: "Novo Ciclo é o curso online da treinadora Talita Lopes para você começar ou voltar a correr, ganhar força e cuidar do corpo com segurança, no seu ritmo."
- CTA primário "Quero meu acesso" → `#oferta`; secundário (ghost) "Entrar na lista de espera" → `#lista`.
- Linha de credencial: "16 anos de treinamento · Especialista em Gerontologia"

**Para quem é**
- Eyebrow "Para quem é". H2: "Feito para você que sente que *chegou a hora* de cuidar de si."
- Itens:
  1. "Quer começar a correr, mas não sabe por onde começar sem se machucar."
  2. "Já corre e quer somar treino de força para correr com mais firmeza."
  3. "Sente que perdeu força e disposição e quer recuperar autonomia no dia a dia."
  4. "Procura um treino pensado para o corpo depois dos 40, não uma planilha genérica."
  5. "Quer envelhecer se movimentando, com saúde e qualidade de vida."
- Fecho: "Se você se reconheceu em pelo menos uma dessas frases, o Novo Ciclo foi pensado para você."

**O curso** (fundo escuro)
- Eyebrow "O curso". H2: "Quatro pilares para um *novo ciclo*."
- Sub: "Aulas em vídeo, treinos e dicas práticas da Talita, organizados em quatro pilares."
- Pilares (título + texto + 3 tópicos curtos cada):
  - Corrida: "Do primeiro trote aos seus próximos quilômetros, com técnica, ritmo e progressão no seu tempo." Tópicos: Como começar do zero · Técnica e respiração · Progressão segura
  - Força: "Treino de força para sustentar a corrida e o dia a dia, com orientação clara em cada exercício." Tópicos: Força para correr melhor · Postura e estabilidade · Treinos orientados
  - Saúde: "Cuidados que fazem diferença para treinar sem se machucar e respeitar os sinais do corpo." Tópicos: Aquecimento e recuperação · Cuidados com as articulações · Ouvir o próprio corpo
  - Longevidade: "Movimento como hábito para a vida toda: autonomia, equilíbrio e qualidade de vida em todas as fases." Tópicos: Autonomia no dia a dia · Equilíbrio e mobilidade · Constância que dura
- Ícones: pesquisar ícones literais (corrida: pessoa correndo; força: halter/kettlebell; saúde: coração com pulso; longevidade: algo como broto/infinito/ampulheta, comparar candidatos).

**Sobre**
- Retrato: `src/assets/images/sobre-talita.webp` (840×1120, sem alpha, retrato real da Talita confirmado pelo usuário). Alt: "Talita Lopes, treinadora, de braços cruzados". Moldura `rounded-3xl`, largura explícita, máx. ~420px.
- Eyebrow "Quem conduz". H2: "Eu sou *Talita Lopes*."
- Corpo (verbatim, pode quebrar em parágrafos): "Treinadora, apaixonada por movimento, corrida e por ajudar pessoas a cuidarem do corpo em todas as fases da vida. Sou profissional de Educação Física e atuo há 16 anos com treinamento. Sou especialista em Gerontologia e sigo estudando para oferecer um treinamento cada vez mais seguro, inteligente e individualizado."
- Citação destacada: "Envelhecer não significa parar. É sobre continuar se movimentando, ficando mais forte e cuidando do corpo para viver com saúde, autonomia e qualidade de vida."
- Stat: "16" + "anos de treinamento" (count-up).
- Marquee de formações: Corrida · Treinamento funcional · Treinamento com kettlebell · Avaliação física · Distúrbios da coluna · Gerontologia
- Nota pequena: "CREF 019973-G/PR" (TODO no código: PROOF NEEDED, não verificado).

**Oferta** (fundo escuro)
- Eyebrow "Investimento". H2: "Comece o seu *novo ciclo* hoje."
- Card: nome `OFERTA.produto`, preço `OFERTA.preco` grande, `OFERTA.parcelamento`, `OFERTA.modelo`.
- Incluso (check):
  - Aulas em vídeo sobre corrida: técnica, ritmo e progressão
  - Treinos de força pensados para mulheres 40+
  - Conteúdos de saúde e longevidade
  - Dicas práticas da Talita para o dia a dia
  - Garantia de 7 dias
- CTA "Quero meu acesso" → `CHECKOUT_URL`. Abaixo: "Pagamento seguro. Acesso liberado após a confirmação."
- Selo: "7 dias de garantia". Texto: "Se nos primeiros 7 dias você sentir que o Novo Ciclo não é para você, devolvemos 100% do valor. Sem perguntas."

**FAQ** (6 perguntas, exatas):
1. "Nunca corri. O curso serve para mim?" → "Serve. O Novo Ciclo foi pensado tanto para quem está começando do zero quanto para quem já corre e quer evoluir, sempre com progressão no seu ritmo."
2. "Preciso de academia?" → "Não necessariamente. Os treinos de força podem ser adaptados para fazer em casa, com materiais simples, ou na academia." (TODO no código: PROOF NEEDED, validar com a cliente)
3. "Tenho menos de 40 anos. Posso participar?" → "Pode. O conteúdo foi pensado para o corpo da mulher depois dos 40, mas as orientações de corrida, força e saúde fazem sentido para qualquer mulher que queira começar a se cuidar."
4. "Tenho alguma dor ou condição de saúde. Posso fazer?" → "Antes de começar qualquer programa de exercícios, o ideal é ter a liberação do seu médico. O curso traz orientações para respeitar os sinais do corpo, mas não substitui um acompanhamento individual."
5. "E se eu não gostar?" → "Você tem 7 dias de garantia a partir da compra. Se sentir que não é para você, é só pedir o reembolso e devolvemos 100% do valor."
6. "Como recebo o acesso?" → "Assim que o pagamento for confirmado, você recebe por e-mail o acesso à plataforma do Novo Ciclo." (TODO: PROOF NEEDED, plataforma ainda não existe)

**Lista de espera** (`bg-surface`)
- Eyebrow "Lista de espera". H2: "Quer ser *avisada primeiro*?"
- Sub: "Deixe seu contato e receba as novidades do Novo Ciclo e o aviso de lançamento direto no seu e-mail."
- Campos: Nome (obrigatório), E-mail (obrigatório, `type="email"`), WhatsApp (opcional, `type="tel"`, `inputMode="tel"`).
- Checkbox obrigatório: "Aceito receber comunicações do Novo Ciclo e li a [Política de Privacidade]. Posso cancelar quando quiser." (link `LINKS.privacidade`)
- Botão: "Quero ser avisada". Sucesso: "Pronto, {primeiro nome}! Você está na lista. Vamos te avisar por e-mail."
- Sem backend: validação nativa HTML (`required`), `onSubmit` com `preventDefault` e troca para sucesso. Comentário `// ponytail: sem backend, ligar ao CRM/plataforma quando existir (RF01)`.

**Footer** (`bg-deep`): "Novo Ciclo" (font-display) + "com Talita Lopes"; "Profissional de Educação Física · CREF 019973-G/PR"; links "Política de Privacidade" e "Termos de Uso" (`LINKS`); "© 2026 Talita Lopes. Todos os direitos reservados."

## Open Questions
Ver `client-brief.md` → Open Questions. Nenhuma bloqueia o build.
