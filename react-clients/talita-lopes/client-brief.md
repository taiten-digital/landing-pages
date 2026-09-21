# Client Brief — Talita Lopes (`talita-lopes`)

**MIGRAÇÃO, não descoberta nova.** Este é o segundo cliente do sistema
Astro legado (`clients/talita-lopes/`), já validado com a cliente real ao
longo de 17 fases + 14 rodadas de feedback direto pós-entrega. Este brief
foi sintetizado a partir dos documentos reais existentes
(`discovery/questionnaire.md`, `brand/brand-dna.md`, `copy/*.md`,
`project-state.md`), não de uma nova entrevista — nada aqui foi inventado
ou redecidido.

## Business & Services
Personal trainer (presencial + consultoria online) em Londrina/PR,
especializada em saúde da coluna vertebral e público 50+. 6 serviços:
Avaliação física (gratuita, ponto de entrada), Atendimento presencial,
Consultoria online, Treino de hipertrofia, Treino para emagrecimento,
Planilha de treino para corredores. **Sem preços publicados em lugar
nenhum** (nem faixas como "a partir de R$X") — decisão deliberada e
consistente em todos os canais da cliente, não uma lacuna a preencher.

## Differentiators
+10 anos de experiência em Londrina/PR, CREF 019973-G/PR, Educação Física
(UNOPAR), especialização em coluna vertebral, atendimento verdadeiramente
individualizado (avaliação antes de qualquer prescrição). Ambiente físico:
em domicílio, condomínio ou estúdio parceiro — sem endereço fixo.

## Target Audience
Pessoas 50+ com queixas de coluna/dor ciática que já tentaram outros
profissionais sem resultado ou sem se sentir ouvidas, mais público geral de
hipertrofia/emagrecimento/corrida.

## Social Media
- Instagram real/oficial: `@talitalopes.personal` — **nunca** usar
  `@talitaapersonal` (handle não confirmado, sem CREF/localização/links
  cruzados que provem ser a mesma marca).

## Contact Info
- WhatsApp: `(43) 98479-5883`, link `https://wa.me/5543984795883?text=`
  com a mensagem pré-preenchida exata:
  `Olá, Talita! Vi sua página e quero marcar uma avaliação gratuita.`
  (usar `encodeURIComponent` nessa string, igual ao original).
- E-mail: `talitalopes.personal@gmail.com`
- Sem endereço físico fixo (atendimento é em domicílio/condomínio/estúdio
  parceiro, conforme conveniência do aluno).

## Existing Brand Assets
Logo real em `src/assets/images/logo.webp`. Fotos reais já copiadas para
`src/assets/images/`:
- `hero-bg-jogging.jpg` — foto de fundo do Hero, genérica/atmosférica
  (pessoa correndo, paisagem), licença Pexels (uso comercial livre, sem
  atribuição), **não** apresentada como sendo a Talita ou uma aluna
  específica — landscape 3:2, já testada e aprovada nessa função após 4
  rodadas de troca de foto de fundo.
- `hero-treino.webp` — foto real de treino funcional, usada na seção
  Serviços.
- `diferenciais-forca.webp` — foto real, célula "Avaliação física" do
  bento.
- `testimonial-1.webp`, `testimonial-2.webp`, `testimonial-3.webp` — fotos
  reais das 3 alunas que deram os depoimentos (avatares circulares).
- `consultoria-online.jpg`, `treino-emagrecimento.jpg` — **stock genérico**
  (licença Unsplash, uso comercial livre, sem atribuição), usadas só nessas
  2 células porque não existe foto real da cliente para essas categorias —
  não apresentar como sendo a Talita ou uma aluna real.

**Fotos reais que existem mas foram deliberadamente removidas ao longo das
rodadas de feedback — NÃO trazer de volta nesta migração**:
`hero-senhora.webp` (retrato real da cliente, testado e removido do Hero 3
vezes), `sobre-instrutora-aluna.webp` (removida da seção Sobre),
`caminhada-acompanhada.webp` (removida do Contato), `treino-alongamento.webp`
(removida do FAQ). Ficam só no projeto Astro legado.

## Tone & Voice
Registro médio-formal, tratamento por "você", sem gíria de academia, sem
urgência/escassez artificial, sem linguagem de garantia, credenciais
sempre ditas sem superlativos. Convenção de CTA: sempre em primeira pessoa
relacional ("Fale com a Talita" / "Marcar avaliação"), nunca transacional
genérico ("Agende agora", "Compre já"). Um único CTA em toda a página —
nunca introduzir uma segunda chamada (newsletter, "siga no Instagram").

**Proibições explícitas e permanentes** (guardrails da cliente real):
- Nunca mencionar "gerontologia" (não confirmado em nenhuma fonte primária).
- Nunca transformar a especialização em coluna numa promessa médica/de cura.
- Nunca usar `@talitaapersonal`.

## Real Proof
- Depoimentos: 3 reais, devem ser reproduzidos **palavra por palavra**, sem
  parafrasear (texto exato no design-brief.md / prompts dos section-builder).
  Nenhuma foto/nome de avaliador deve ser trocado ou inventado.
- `PROOF NEEDED: número de avaliações/nota do Google` — nunca foi
  encontrada uma fonte verificável. A página deve dizer só "Avaliação
  verificada no Google", sem contagem nem nota numérica, exatamente como
  no Astro original.
- `PROOF NEEDED: CREF 019973-G/PR` — nunca foi conferido contra o registro
  oficial do CREF-PR. Exibir o número como já é exibido (é o que a própria
  cliente informou), mas isso segue como pendência de verificação, não
  como fato 100% confirmado — mencionar isso ao usuário no relatório final,
  não silenciar.
- `PROOF NEEDED: resposta do FAQ sobre consultoria online para 50+` — a
  resposta atual (ver design-brief.md, FAQ #4) foi escrita pela copywriter
  sem fonte real da cliente, aguardando aval dela. Migrar o texto
  verbatim (não reescrever), mas mencionar a pendência no relatório final.

## Open Questions
Nenhuma — este brief consolida decisões já tomadas com a cliente real ao
longo de 17 fases + 14 rodadas de revisão. As únicas pendências reais são
as 3 marcadas `PROOF NEEDED` acima, que continuam pendentes por decisão
explícita do usuário (não resolver nem inventar durante a migração).
