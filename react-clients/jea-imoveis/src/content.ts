// Single source of truth for every real fact on the page. Sections import from here
// and never retype a number, name or credential.

export const EMPRESA = {
  nome: 'JEA Imóveis',
  responsavel: 'José Eduardo Almeida',
  cidade: 'Londrina',
  uf: 'PR',
};

export const CONTATO = {
  // UNKNOWN: confirm with the client whether the mobile has the leading 9 (43 9 9914-6230).
  // Displayed exactly as the client sent it; change `whatsapp` and `telefone` together.
  telefone: '(43) 9914-6230',
  whatsapp: '554399146230',
  instagram: '@jeaimoveisldn',
  instagramUrl: 'https://www.instagram.com/jeaimoveisldn',
  // UNKNOWN: street address, e-mail and opening hours were not provided.
};

export function waLink(text: string) {
  return `https://wa.me/${CONTATO.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const WA_PADRAO = 'Olá! Vim pelo site da JEA Imóveis e gostaria de conversar sobre um imóvel.';

// Registros publicados pelo próprio José Eduardo no Instagram da JEA (bio). Mostrar sempre com a nota de rodapé.
export const CREDENCIAIS = [
  { sigla: 'CRECI', numero: 'F-44892' },
  { sigla: 'CREA', numero: '23113-D' },
];
export const NOTA_CREDENCIAIS = 'Registros divulgados pelo próprio José Eduardo Almeida no Instagram da JEA Imóveis.';

// Nota e contagem informadas pelo cliente (Google). Citar uma única vez, na seção de avaliações.
export const GOOGLE = { nota: '4,5', total: 26 };

export const SERVICOS = [
  {
    id: 'comprar',
    titulo: 'Comprar',
    resumo: 'Do primeiro contato às chaves: o imóvel que cabe na sua vida e no seu orçamento.',
    itens: [
      'Conversa para entender o que você precisa',
      'Seleção de imóveis alinhada ao seu perfil',
      'Acompanhamento até a assinatura',
    ],
    msg: 'Olá! Quero comprar um imóvel em Londrina e gostaria de conversar com a JEA.',
  },
  {
    id: 'vender',
    titulo: 'Vender',
    resumo: 'Avaliação, divulgação e negociação do seu imóvel, com orientação em cada etapa.',
    itens: [
      'Avaliação do imóvel e conversa sobre preço',
      'Divulgação para quem procura o seu perfil de imóvel',
      'Negociação e orientação até o fechamento',
    ],
    msg: 'Olá! Quero vender meu imóvel em Londrina e gostaria de conversar com a JEA.',
  },
  {
    id: 'investir',
    titulo: 'Investir',
    resumo: 'Imóvel como patrimônio: análise antes de decidir, pensando no longo prazo.',
    itens: [
      'Conversa sobre objetivo, prazo e perfil',
      'Análise do imóvel e da região antes da compra',
      'Visão de futuro, sem promessa de ganho fácil',
    ],
    msg: 'Olá! Tenho interesse em investir em imóveis e gostaria de conversar com a JEA.',
  },
];

// UNKNOWN: process steps are a generic, assumed flow for an imobiliária. Confirm with José Eduardo.
export const PASSOS = [
  { n: '01', titulo: 'Conversa', texto: 'Você conta pelo WhatsApp o que procura ou o que quer vender. Sem compromisso e sem formulário longo.' },
  { n: '02', titulo: 'Entendimento', texto: 'Objetivo, prazo e orçamento ficam claros antes de qualquer visita. Menos tempo perdido, mais acerto.' },
  { n: '03', titulo: 'Busca e análise', texto: 'Imóveis alinhados ao seu perfil, com análise do imóvel e da região antes de você decidir.' },
  { n: '04', titulo: 'Visita e negociação', texto: 'Você visita, compara e negocia com orientação em cada ponto da conversa.' },
  { n: '05', titulo: 'Fechamento', texto: 'Documentação conferida e acompanhamento até a entrega das chaves.' },
];

// Avaliações públicas do Google, transcritas exatamente como publicadas (prints enviados pelo cliente).
// Deixadas de fora de propósito: a de "Pedroso Dos Aquários" (fala de montar um aquário, não de imóveis).
// Datas omitidas porque são relativas ("8 anos atrás") e envelhecem; sem fotos de perfil dos autores.
export const AVALIACOES = [
  { nome: 'Tiago Pontes', estrelas: 5, texto: 'Condomínio muito bom , com um lugar lindo pra festas na sua cobertura.' },
  { nome: 'Carla Mancebo Esteves', estrelas: 4, texto: 'Bom condomínio, com bom espaço de lazer' },
  { nome: 'Adriano Sato', estrelas: 5, texto: 'Excelente estadia' },
  { nome: 'Sandra Maria Bottacin Mendes', estrelas: 5, texto: 'Próximo do centro. Ônibus na porta.' },
];
