# Client Brief: Talita Lopes 40 Mais (`talita-lopes-40-mais`)

Página de venda de um **infoproduto novo**, separada do site de personal
(`react-clients/talita-lopes`, que não muda). Fontes: texto de apresentação
escrito pela própria Talita (colado pelo usuário em 26/09/2026), respostas
do usuário na entrevista e `2026-09-26-talita-onboarding-e-plano.md`
(reunião de onboarding).

**Este brief substitui duas regras do brief antigo, por decisão explícita
do usuário:** "Gerontologia" agora PODE ser citada (a Talita escreveu
"Sou especialista em Gerontologia" no próprio texto), e o tempo de carreira
é **16 anos** (não mais "+10").

## Business & Services
Curso online de **corrida, força, saúde e longevidade para mulheres 40+**,
conduzido pela Talita. Formato: curso com aulas em vídeo, treinos e dicas
práticas. Venda por **compra única** (preferência registrada no onboarding,
ainda não formalizada). Entrega por uma **plataforma própria que ainda não
existe**, então o link de checkout é placeholder.

Nome do produto: **"Novo Ciclo"**. PROPOSTA nossa, tirada do texto dela
("Um novo espaço. Um novo ciclo."), a validar com a cliente.

Conteúdo do curso (PROPOSTA, o usuário delegou; validar com a cliente, e
nunca inventar número de aulas, horas ou módulos):
- **Corrida**: começar ou voltar a correr, técnica, ritmo, progressão no seu tempo.
- **Força**: treino de força para sustentar a corrida e o dia a dia.
- **Saúde**: recuperação, cuidados para treinar sem se machucar, ouvir os sinais do corpo.
- **Longevidade**: movimento como hábito, autonomia e qualidade de vida em todas as fases.

Preço (PROPOSTA, o usuário delegou): **R$ 297 à vista ou em até 12x no
cartão**. Não mostrar valor de parcela (depende das taxas da plataforma) e
nunca um "de R$ X por R$ Y" falso. Valores ficam em `src/content.ts` para
troca fácil (RF03: preço editável, oferta de Black Friday depois).

Garantia: **7 dias** (direito de arrependimento, art. 49 do CDC), confirmada.

## Differentiators
Da própria Talita (usar essas palavras):
- Treinadora, profissional de Educação Física, **16 anos** com treinamento.
- **Especialista em Gerontologia**, "e sigo estudando para oferecer um
  treinamento cada vez mais seguro, inteligente e individualizado."
- Formações e cursos em corrida, treinamento funcional, treinamento com
  kettlebell, avaliação física e distúrbios da coluna, "entre outros".
- CREF 019973-G/PR: é o que a cliente informou no projeto antigo.
  `PROOF NEEDED: nunca conferido no registro oficial do CREF-PR`. Pode ser
  exibido, mas continua pendente.

Frases-âncora dela (verbatim):
- "Depois dos 40, não é sobre voltar no tempo. É sobre ficar forte para viver bem o futuro."
- "Acredito que envelhecer não significa parar."
- "É sobre continuar se movimentando, ficando mais forte e cuidando do corpo para viver com saúde, autonomia e qualidade de vida."
- "Um novo espaço. Um novo ciclo."

## Target Audience
Mulheres 40+ que querem começar ou voltar a correr, ganhar força e cuidar
da saúde e da longevidade. **Sem régua de idade**: a comunicação é para
mulheres 40+, mas nada na página pode excluir ou desencorajar quem é mais
nova ("vai que alguém mais nova quer comprar", disse o usuário).

## Social Media
`UNKNOWN: handle do novo perfil` (o texto dela fala de um perfil novo
nascendo, o @ não foi informado). Não linkar rede social nenhuma por enquanto.

## Contact Info
Nenhum contato na página por enquanto. O CTA é a compra e o formulário de
lista de espera. Não reaproveitar o WhatsApp do site de personal aqui.

## Existing Brand Assets
Sem logo para o projeto novo (usar wordmark tipográfico). Assets em
`src/assets/`:
- `video/hero.mp4`: vídeo real de uma corredora numa prova (chuva,
  arvoredo, grade e público desfocados ao fundo). H.264 1280×720 (16:9
  paisagem), 10 s, 7,4 MB, **tem faixa de áudio**: sempre `muted`. Enviado
  pelo usuário. **A corredora NÃO é a Talita** (confirmado pelo usuário; usa
  a camiseta da marca dela, mas não é ela). Fundo atmosférico: nunca
  legendar nem sugerir que é a Talita, e nunca recortar frames dele como
  retrato dela. A corredora fica com centro horizontal por volta de 40% da
  largura, rosto no terço superior, e a câmera acompanha.
- `images/hero-poster.webp`: 1280×720, primeiro frame do vídeo, usar como
  `poster`.
- `images/sobre-talita.webp`: **retrato real da Talita**, confirmado pelo
  usuário (fonte `talita-foto.jpg` 1448×1931, convertida para 840×1120,
  3:4, sem alpha). Braços cruzados, camiseta preta da marca, fundo claro.
  Usada no Sobre.

**Proibido**: banco de imagem/stock genérico (decisão do onboarding), e as
fotos antigas do site de personal (`hero-treino`, `diferenciais-forca` etc.).

## Tone & Voice
Acolhedor, confiante, adulto, tratamento por "você" no feminino ("você está
pronta", "avisada"). Energia de começo ("novo ciclo") sem culto à juventude:
nunca "rejuvenescer", "voltar no tempo", "corpo de 20 anos". Sem promessa
médica, sem "cura", sem números de resultado. CTAs transacionais liberados
pelo usuário: "Quero meu acesso", "Garantir minha vaga" etc., mas **sem
escassez ou contagem regressiva falsas**. Nunca usar travessão (em dash).

## Real Proof
- Sem depoimentos por enquanto (decisão do usuário). Não criar seção de
  depoimentos nem avaliações do Google.
- Prova = credenciais que ela mesma declara (acima) mais o retrato real dela.

## Open Questions (pendências a levar para a cliente)
- Nome "Novo Ciclo", pilares, lista do que está incluso e preço: propostas.
- `PROOF NEEDED: CHECKOUT_URL` (a plataforma própria não existe).
- `UNKNOWN: tempo de acesso ao curso` (não citar na página).
- `UNKNOWN: se os treinos de força podem ser feitos em casa` (FAQ escrito como proposta).
- Formulário de lista de espera sem backend (a submissão só mostra o estado de sucesso).
- Política de Privacidade e Termos de Uso: páginas não existem (links `#`).
- CREF não verificado.
- Handle do Instagram novo. Vídeo da própria Talita para o Hero (opcional).
