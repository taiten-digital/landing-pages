// Single source of truth for every real fact on the page. Sections import from here
// and never retype a number, name, address or credential.

export const EMPRESA = {
  nome: 'Flávio Ferreira Negócios Imobiliários',
  nomeCurto: 'Flávio Ferreira',
  razaoSocial: 'Flávio Ferreira Negócios Imobiliários Ltda.',
  responsavel: 'Flávio Ferreira',
  cargo: 'Corretor de Imóveis',
  creci: 'CRECI-PR 49593',
  cidade: 'Londrina',
  uf: 'PR',
};

export const CONTATO = {
  telefone: '(43) 98849-8353',
  whatsapp: '5543988498353',
  instagram: '@flavioferreira.imobiliaria',
  instagramUrl: 'https://www.instagram.com/flavioferreira.imobiliaria',
  // Perfil pessoal do Flávio (bio: "Founder @flavioferreira.imobiliaria"), print enviado pelo cliente.
  instagramPessoal: '@flavioferreira.imoveis',
  instagramPessoalUrl: 'https://www.instagram.com/flavioferreira.imoveis',
  endereco: 'Av. Ayrton Senna da Silva, 1055, Sala 1007',
  bairro: 'Gleba Palhano',
  cidadeUf: 'Londrina/PR',
  cep: '86050-460',
  mapsQuery: 'Flávio Ferreira Negócios Imobiliários, Av. Ayrton Senna da Silva, 1055, Londrina - PR',
  // UNKNOWN: e-mail and full opening hours (Google only shows "Fecha 18:00"). Do not render them.
};

export function waLink(text: string) {
  return `https://wa.me/${CONTATO.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const WA_PADRAO = 'Olá, Flávio! Vim pelo site e gostaria de conversar sobre um imóvel.';

// Nota pública do perfil no Google (print enviado pelo cliente). Citar UMA vez, sem textos de avaliação.
export const GOOGLE = { nota: '5,0', total: 2 };

// Texto do próprio cliente (story "Quem somos?" e descrição do perfil no Google), levemente encurtado.
export const QUEM_SOMOS = [
  'Somos uma imobiliária inovadora que intermedia imóveis novos e recém-construídos de médio e alto padrão.',
  'O propósito é realizar os melhores negócios para os nossos clientes, com segurança, transparência, profissionalismo, investimento e rentabilidade.',
];
export const VALORES = ['Segurança', 'Transparência', 'Profissionalismo', 'Rentabilidade'];
export const NOTA_CREDENCIAIS = 'Informações divulgadas pela própria Flávio Ferreira Negócios Imobiliários.';

// Linhas de atuação confirmadas: bio do Instagram (Lançamentos | Imóveis prontos | Consórcio imobiliário)
// e descrição do Google (lançamentos de construtoras, imóveis novos de alto padrão, áreas para incorporação).
export const SERVICOS = [
  {
    id: 'lancamentos',
    titulo: 'Lançamentos',
    resumo: 'Empreendimentos de construtoras em Londrina, com proposta personalizada e simulação do fluxo de pagamento direto com a construtora.',
    msg: 'Olá, Flávio! Tenho interesse em lançamentos de construtoras em Londrina.',
  },
  {
    id: 'prontos',
    titulo: 'Imóveis prontos',
    resumo: 'Imóveis novos e recém-construídos de médio e alto padrão, prontos para morar ou investir.',
    msg: 'Olá, Flávio! Procuro um imóvel pronto em Londrina.',
  },
  {
    id: 'consorcio',
    titulo: 'Consórcio imobiliário',
    resumo: 'Uma forma planejada de chegar à casa própria, com orientação para escolher o plano que faz sentido para você.',
    msg: 'Olá, Flávio! Quero entender melhor o consórcio imobiliário.',
  },
  {
    id: 'incorporacao',
    titulo: 'Áreas para incorporação',
    resumo: 'Intermediação de áreas destinadas à incorporação, para quem desenvolve novos empreendimentos.',
    msg: 'Olá, Flávio! Tenho interesse em áreas para incorporação.',
  },
];

// ASSUMED flow (confirm with the client): built from "assessoria completa, desde a aprovação de crédito
// até a entrega das chaves" (client-supplied text) and his posts ("proposta personalizada",
// "simular um fluxo de pagamento direto com a construtora").
export const PASSOS = [
  { n: '01', titulo: 'Conversa', texto: 'Você conta pelo WhatsApp o que procura: região, tamanho, momento de vida e orçamento.' },
  { n: '02', titulo: 'Crédito e simulação', texto: 'Análise do seu perfil, aprovação de crédito e simulação do fluxo de pagamento.' },
  { n: '03', titulo: 'Seleção e visitas', texto: 'Opções alinhadas ao que você precisa, na planta ou prontas, e visitas aos empreendimentos.' },
  { n: '04', titulo: 'Proposta personalizada', texto: 'Proposta montada para o seu caso e negociação com a construtora ou o proprietário.' },
  { n: '05', titulo: 'Entrega das chaves', texto: 'Acompanhamento da documentação e do contrato até o imóvel ser seu.' },
];
