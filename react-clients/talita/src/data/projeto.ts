// Única fonte de dados do acompanhamento. Para atualizar a página da Talita,
// edite só este arquivo (status das etapas, itens recebidos, novas
// atualizações e a data de atualização) e faça o deploy.

export const atualizadoEm = '10/10/2026';

// Datas usadas na contagem regressiva e na barra de progresso.
export const inicioProjeto = '2026-10-09';
export const dataLancamento = '2027-01-11';

export type Status = 'concluida' | 'andamento' | 'proxima';

export type Etapa = {
  numero: string;
  quando: string;
  mes: string;
  titulo: string;
  descricao: string;
  status: Status;
};

export const etapas: Etapa[] = [
  {
    numero: '01',
    quando: '13 a 23/10',
    mes: 'Outubro',
    titulo: 'Início do projeto',
    descricao: 'Reunião de kickoff, acessos às contas, materiais, textos da página e guia de fotos e vídeos.',
    status: 'andamento',
  },
  {
    numero: '02',
    quando: 'até 06/11',
    mes: 'Novembro',
    titulo: 'Página de vendas no ar',
    descricao: 'Fotos e vídeos novos aplicados, design do Método C40, SEO técnico, rastreamento de visitas e vendas e Perfil da Empresa no Google.',
    status: 'proxima',
  },
  {
    numero: '03',
    quando: 'até 27/11',
    mes: 'Novembro',
    titulo: 'Vendas e área de alunas',
    descricao: 'Pagamento por Pix, cartão e boleto, área de alunas com login, acesso entregue na hora, grupo de WhatsApp automático, 3 e-mails automáticos e página de obrigado com oferta extra. Tudo testado de ponta a ponta.',
    status: 'proxima',
  },
  {
    numero: '04',
    quando: 'até 11/12',
    mes: 'Dezembro',
    titulo: 'Criativos prontos',
    descricao: 'Roteiro, sessão de gravação e edição de 1 criativo de lançamento e 3 criativos de alta conversão.',
    status: 'proxima',
  },
  {
    numero: '05',
    quando: 'até 18/12',
    mes: 'Dezembro',
    titulo: 'Data definida e aprovação final',
    descricao: 'Data exata do lançamento combinada até 15/12, treinamento gravado de 1 hora para vocês usarem tudo com autonomia e aprovação final das entregas.',
    status: 'proxima',
  },
  {
    numero: '06',
    quando: '05 a 08/01',
    mes: 'Janeiro',
    titulo: 'Campanha montada',
    descricao: 'Campanha de anúncios na Meta configurada e revisada com vocês na semana anterior à estreia.',
    status: 'proxima',
  },
  {
    numero: '07',
    quando: '11 a 15/01',
    mes: 'Lançamento',
    titulo: 'Lançamento do Método C40',
    descricao: 'Estreia na 2ª semana de janeiro de 2027. Se precisarmos de folga, no máximo na semana de 18 a 22/01.',
    status: 'proxima',
  },
  {
    numero: '08',
    quando: '+15 dias',
    mes: 'Após a estreia',
    titulo: 'Acompanhamento e relatório final',
    descricao: 'Acompanhamento da campanha com até 3 ajustes por semana e relatório com vendas, custo por venda e o que repetir. Depois, 60 dias de ajustes sem custo.',
    status: 'proxima',
  },
];

// Mostrado entre a etapa 05 e a 06 do cronograma.
export const recesso = {
  quando: '24/12 a 04/01',
  texto: 'Recesso de fim de ano. Seguimos atentos a qualquer falha crítica, e esse período não conta nos prazos.',
};

// Mais recente primeiro.
export const atualizacoes: { data: string; texto: string }[] = [
  {
    data: '10/10/2026',
    texto: 'Boas-vindas enviadas e esta página de acompanhamento no ar. Próximo passo: combinar o horário da reunião de kickoff.',
  },
  {
    data: '09/10/2026',
    texto: 'Contrato assinado. O projeto do Método C40 começou oficialmente.',
  },
];

export type Passo = {
  numero: string;
  quando: string;
  titulo: string;
  texto?: string[];
  itens?: { texto: string; feito: boolean }[];
};

export const proximosPassos: Passo[] = [
  {
    numero: '01',
    quando: 'Semana de 13/10',
    titulo: 'Reunião de kickoff',
    texto: [
      'Uma conversa por vídeo de cerca de uma hora para alinhar público, oferta, preço de lançamento e a plataforma de vendas (Kiwify ou Hotmart).',
      'Mandamos as opções de horário no grupo.',
    ],
  },
  {
    numero: '02',
    quando: 'Após o kickoff',
    titulo: 'Acessos às contas',
    itens: [
      { texto: 'Instagram e Facebook, pelo Meta Business', feito: false },
      { texto: 'Conta de anúncios da Meta', feito: false },
      { texto: 'Domínio do site', feito: false },
      { texto: 'Conta Google (Analytics e Perfil da Empresa)', feito: false },
      { texto: 'Plataforma de vendas (ajudamos a criar)', feito: false },
    ],
  },
  {
    numero: '03',
    quando: 'Até 23/10',
    titulo: 'Materiais do método',
    itens: [
      { texto: 'Como funciona e o que a aluna recebe', feito: false },
      { texto: 'Depoimentos de alunas, com autorização', feito: false },
      { texto: 'Preço e condições de pagamento', feito: false },
      { texto: 'Fotos e vídeos atuais que vocês gostem', feito: false },
    ],
  },
  {
    numero: '04',
    quando: 'Enviar até 30/10',
    titulo: 'Fotos e vídeos novos',
    texto: [
      'Vocês produzem as fotos e vídeos da Talita para a página nova, com o fotógrafo de confiança de vocês.',
      'Até 16/10 mandamos um guia com tudo o que precisamos: enquadramentos, formatos e quantidade.',
    ],
  },
];

export const entregas = [
  { titulo: 'Página de vendas', texto: 'Design C40 com fotos novas, SEO técnico e rastreamento de cada venda.' },
  { titulo: 'Pagamento e área de alunas', texto: 'Pix, cartão e boleto, login das alunas e acesso entregue na hora.' },
  { titulo: 'Automações', texto: '3 e-mails automáticos, grupo de WhatsApp liberado e página de obrigado com oferta extra.' },
  { titulo: 'Criativos', texto: '1 criativo de lançamento e 3 de alta conversão, do roteiro à edição.' },
  { titulo: 'Campanha na Meta', texto: 'Anúncios montados e revisados com vocês antes da estreia.' },
  { titulo: 'Acompanhamento', texto: '15 dias de campanha, relatório final e 60 dias de ajustes sem custo.' },
];

export const combinados = [
  { titulo: 'Respostas em até 1 hora', texto: 'Estamos sempre por perto no grupo, em horário comercial.' },
  { titulo: 'Um só canal', texto: 'Tudo pelo grupo. Aprovações por lá ou por e-mail ficam registradas com a data.' },
  { titulo: 'Aprovação de cada entrega', texto: 'Até 3 dias úteis para aprovar, com até 2 rodadas de ajuste.' },
  { titulo: 'Tudo no nome da Talita', texto: 'Domínio, contas, anúncios e recebimentos são seus. Entramos só como colaboradores.' },
  { titulo: 'Prazos que andam juntos', texto: 'Se um material ou aprovação atrasar, o cronograma se ajusta pelo mesmo período.' },
  { titulo: 'Dados das alunas protegidos', texto: 'Seguimos a LGPD. Dados das alunas nunca são expostos.' },
];

export const contato = {
  email: 'suporte@taiten.com.br',
  telefone: '+55 43 98432-6248',
  whatsapp: 'https://wa.me/5543984326248',
};
