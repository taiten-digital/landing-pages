// Single source for real, confirmed client facts. Sections import from here, never duplicate.

export const EMPRESA = {
  nome: 'C Bandeira Corretora de Seguros',
  pessoa: 'Cléo Bandeira',
  desde: 2017, // Fundada em 09/11/2017 (dado cadastral informado pelo usuário).
  cidade: 'Londrina - PR',
};

export const CONTATO = {
  telefoneDisplay: '(43) 3351-4860',
  telefoneHref: 'tel:+554333514860',
  whatsappDisplay: '(43) 99846-0643',
  whatsappNumber: '5543998460643',
  email: 'bandeira@bandeiracorretora.com.br',
  instagramHandle: '@cbandeiraseguros',
  instagramUrl: 'https://www.instagram.com/cbandeiraseguros/',
  endereco: 'Rua João Alves da Rocha Loures, 454',
  cidade: 'Londrina - PR',
  cep: '86041-271',
  mapsQuery: 'Rua João Alves da Rocha Loures, 454, Londrina - PR, 86041-271',
  // UNKNOWN: dias da semana. Show only the hours, never "segunda a sexta".
  horario: 'Das 8h30 às 12h e das 13h às 17h30',
};

export const waLink = (text: string) =>
  `https://wa.me/${CONTATO.whatsappNumber}?text=${encodeURIComponent(text)}`;

// The three pillars from the Instagram bio, confirmed by the user. Sub-items come from
// the user's answers and the Instagram post topics; nothing beyond these.
export const SERVICOS = [
  {
    id: 'seguros',
    titulo: 'Seguros para você e sua empresa',
    curto: 'Seguros PF e PJ',
    texto:
      'Proteção para a sua vida, a sua casa, o seu carro e o seu negócio, com coberturas pensadas para a sua rotina.',
    itens: ['Seguro de vida', 'Seguro residencial', 'Seguro auto', 'Seguro empresarial'],
    mensagem: 'Olá, Cléo! Vim pelo site e quero uma cotação de seguro.',
  },
  {
    id: 'saude',
    titulo: 'Planos de saúde e odonto',
    curto: 'Saúde e Odonto',
    texto: 'Assistência médica e odontológica para a sua família ou para a equipe da sua empresa.',
    itens: ['Plano de saúde familiar', 'Plano de saúde empresarial', 'Plano odontológico'],
    mensagem: 'Olá, Cléo! Vim pelo site e quero saber sobre planos de saúde e odonto.',
  },
  {
    id: 'consorcios',
    titulo: 'Consórcios',
    curto: 'Consórcios',
    texto: 'Planejamento para conquistar um imóvel, um veículo ou um serviço, sem pagar juros de financiamento.',
    itens: ['Consórcio de imóvel', 'Consórcio de veículo', 'Consórcio de serviços'],
    mensagem: 'Olá, Cléo! Vim pelo site e quero saber sobre consórcio.',
  },
] as const;

// Real Google reviews, transcribed verbatim from a screenshot the user sent on 2026-09-30.
// Both 5 stars, "um ano atrás". Names shortened to first name + surname initial.
// No overall rating or review count is known: never display one.
export const AVALIACOES = [
  {
    nome: 'Wagner P.',
    texto: 'Foi ótima, corretora com pessoas competentes e atendimento rápido, super indico.',
  },
  {
    nome: 'Mario A.',
    texto: 'Melhor atendimento, equipe dedicada em oferecer as melhores soluções em seguros !!',
  },
] as const;
