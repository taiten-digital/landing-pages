// Single source of confirmed facts. Sections import from here, never hardcode.
export const EMPRESA = {
  nome: 'ConsorciCred',
  cidade: 'Londrina',
  tagline: 'Qual é o seu sonho? Nós temos um plano para você!',
  descricao: 'Consórcios e Financiamentos',
};

export const CONTATO = {
  whatsapp: '(43) 9103-2639',
  whatsappDigits: '554391032639',
  telefoneFixo: '(43) 3026-5235',
  telefoneFixoDigits: '554330265235',
  instagram: '@consorcicred',
  instagramUrl: 'https://www.instagram.com/consorcicred',
  // UNKNOWN: e-mail (not provided), horário (not provided). Do not show.
  endereco: 'Rua Piauí, 399, Sala 1403, São Paulo Towers, Centro, Londrina - PR, 86010-410',
  enderecoLinha1: 'Rua Piauí, 399, Sala 1403',
  enderecoLinha2: 'São Paulo Towers, Centro, Londrina - PR, 86010-410',
  mapsQuery: 'Rua Piauí, 399, São Paulo Towers, Londrina - PR, 86010-410',
};

export const waLink = (text: string) =>
  `https://wa.me/${CONTATO.whatsappDigits}?text=${encodeURIComponent(text)}`;

// Partners the user stated (2026-09-30): "representantes autorizados" (client's own claim).
// Confirmed name: "Acerte Consórcios". Logos: Acerte from its own site (acerteconsorcios.com.br),
// BV and Banco do Brasil from Wikimedia Commons. Trademarks of their owners, shown only to identify the partners.
export const PARCEIROS = [
  { id: 'bb', nome: 'BB Consórcios', papel: 'Consórcios' },
  { id: 'acerte', nome: 'Acerte Consórcios', papel: 'Consórcios' },
  { id: 'bv', nome: 'BV Financeira', papel: 'Financiamentos' },
];

// Client's own bio: "Consorcios novos e contemplados / Financiamentos / Empréstimos"
export const SOLUCOES = [
  { id: 'consorcio', titulo: 'Consórcio novo', texto: 'Planeje a compra do seu bem sem pagar juros, em parcelas que cabem no seu orçamento.' },
  { id: 'contemplado', titulo: 'Consórcio contemplado', texto: 'Cartas de crédito já contempladas, para quem não quer esperar a contemplação.' },
  { id: 'financiamento', titulo: 'Financiamento', texto: 'Quando você precisa do bem agora, com o crédito liberado após a aprovação.' },
  { id: 'emprestimo', titulo: 'Empréstimo', texto: 'Crédito para realizar o seu projeto. Fale com a gente para ver as opções disponíveis.' },
];

// Bens from the client's own Instagram bio emojis: caminhão, carro, trator, moto, casa, barco, viagem, serviços.
export const BENS = [
  { id: 'carro', nome: 'Carro' },
  { id: 'moto', nome: 'Moto' },
  { id: 'caminhao', nome: 'Caminhão' },
  { id: 'trator', nome: 'Trator' },
  { id: 'imovel', nome: 'Imóvel' },
  { id: 'barco', nome: 'Barco' },
  { id: 'viagem', nome: 'Viagem' },
  { id: 'servicos', nome: 'Serviços' },
];
