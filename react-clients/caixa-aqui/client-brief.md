# Client Brief: Conquista CaixaAqui (`caixa-aqui`)

## Business & Services
Conquista Financiamentos (logo: "Conquista FINANCIAMENTOS"; Instagram posts
also use "Conquista Assessoria e Financiamentos"). Correspondente CAIXA Aqui
em Londrina: faz a assessoria e acompanha o processo de crédito junto à CAIXA.
Slogan: **"Facilitando suas conquistas!"**

Serviços (bio do cliente, exatos):
- Financiamento de imóveis na **compra**, na **construção** e **crédito com garantia** de imóvel
- **Consórcios**, **consignados** (post: "para servidores públicos e aposentados"), **seguros**
- Destaques do Instagram também citam "Refinanciamento"

Objetivo da página (pitch do usuário): "Uma página de vendas com simulação de
financiamento pode multiplicar essas histórias." O simulador é a peça central.

## Differentiators
Do que os próprios clientes dizem nas avaliações do Google: atendimento
rápido, claro e transparente, acompanhamento de todo o processo por uma
correspondente dedicada (Luana, Solange, Fernanda são citadas), "sem burocracia".
Escritório físico ao lado do eixo bancário do centro (Rua Pio XII).

## Target Audience
Famílias de Londrina e região buscando o primeiro imóvel ou construir;
proprietários querendo crédito com garantia; servidores públicos e aposentados
(consignado). UNKNOWN: faixa de renda predominante, se atendem MCMV.

## Social Media
UNKNOWN: @ do Instagram não confirmado. (`@conquistacaixa`, "Conquista Caixa
Aqui", aparece em busca, mas a bio não bate com a enviada; não usar até confirmar.)

## Contact Info
- WhatsApp: **(43) 99920-9408** (`5543999209408`)
- Endereço: **Rua Pio XII, 303, Sala 3 - Centro, Londrina - PR**
- Um post de fim de ano cita também (43) 99921-8108 (Fernando) para urgências; não usar sem confirmação.
- UNKNOWN: e-mail, horário de atendimento.

## Existing Brand Assets
All in `src/assets/images/`:
- `logo-conquista-original.png`: 400×400, sem alpha, fundo azul sólido `#185C90` (convertido do WebP enviado).
- `logo-conquista.png`: 328×175, **com alpha**, fundo azul recortado. Letras BRANCAS + casa dourada: **só sobre fundo escuro/azul**.
- `logo-caixa.svg`: logotipo CAIXA (Wikimedia Commons, "Caixa Econômica Federal logo 1997.svg"). Azul `#0066B3` + laranja: só sobre fundo branco/claro. Uso autorizado pelo usuário ("pode usar a imagem da caixa sim") como correspondente.
- `hero-casa-entardecer.jpg`: 2400×1600 paisagem, Pexels #31737859 por Sharath G. (dropshado), licença Pexels (uso comercial livre, sem atribuição obrigatória). Casa moderna ao entardecer, céu azul à esquerda, sem pessoas. Atmosférica: nunca legendar como imóvel do cliente/financiado por eles.
- Nenhuma foto de equipe, escritório ou clientes.

Estilo do Instagram (referência de design dada pelo usuário): azul royal
dominante, dourado/laranja de destaque, branco; tipografia geométrica bold em
caixa-alta com palavras em itálico de ênfase; cards brancos arredondados
sobre fundo azul; ícone de casa com cifrão.

## Tone & Voice
Próximo, acolhedor e confiante; linguagem simples (sem juridiquês bancário);
"a gente ajuda você a conquistar". Tratamento "você".

## Real Proof
- 4 avaliações reais do Google, 5 estrelas cada (textos literais em `src/content.ts` → `AVALIACOES`).
  Nomes: Paula Moraes, Taine Marino, Bruna Dias, Giuliano Martins. Avatares: **iniciais**, não fotos.
- PROOF NEEDED: total de avaliações e nota média no Google (não exibir número).
- PROOF NEEDED: tempo de mercado e número de contratos (pesquisado, não encontrado).
- Correspondente CAIXA Aqui: confirmado pelo usuário.
- Fatos publicados pelo próprio cliente: financiar até 80% do imóvel; teto do SFH R$ 2.250.000,00.

## Simulador
Decisão do usuário: **estimativa + WhatsApp**. Calcula SAC e PRICE com taxa de
referência, mostra aviso de estimativa e envia os dados ao WhatsApp para a
simulação oficial. Lógica pronta em `src/simulador.ts` (verificada com asserts).
PROOF NEEDED: taxa de referência (usando 11,19% a.a. + TR, taxa pública CAIXA SBPE 2026, até a Conquista confirmar).

## Open Questions
- Taxa de referência a exibir; @ do Instagram; e-mail; horário.
- Fotos reais (equipe, fachada, entrega de chaves com autorização) para uma próxima rodada.
