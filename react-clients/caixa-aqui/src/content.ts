// Single source for real, confirmed client facts. Sections import from here, never duplicate.

export const EMPRESA = {
  nome: 'Conquista Financiamentos',
  slogan: 'Facilitando suas conquistas!',
  correspondente: 'Correspondente CAIXA Aqui',
};

export const CONTATO = {
  whatsappDisplay: '(43) 99920-9408',
  whatsappNumber: '5543999209408',
  endereco: 'Rua Pio XII, 303, Sala 3',
  cidade: 'Londrina - PR',
  mapsQuery: 'Rua Pio XII, 303, Londrina - PR',
  // UNKNOWN: horário de atendimento, e-mail e @ do Instagram não confirmados.
};

export const waLink = (text: string) =>
  `https://wa.me/${CONTATO.whatsappNumber}?text=${encodeURIComponent(text)}`;

// From the client's own bio ("Financiamentos de Imóveis na Compra | Construção |
// Crédito Garantia • Consórcios | Consignados | Seguros").
export const SERVICOS = [
  { id: 'compra', titulo: 'Financiamento para compra', texto: 'Imóvel novo ou usado, com o crédito imobiliário da CAIXA.' },
  { id: 'construcao', titulo: 'Financiamento para construção', texto: 'Crédito para adquirir o terreno e também construir.' },
  { id: 'garantia', titulo: 'Crédito com garantia de imóvel', texto: 'Use o imóvel que você já tem como garantia para conseguir crédito.' },
  { id: 'consorcios', titulo: 'Consórcios', texto: 'Planeje a compra do seu bem sem pressa.' },
  { id: 'consignados', titulo: 'Crédito consignado', texto: 'Para servidores públicos e aposentados.' },
  { id: 'seguros', titulo: 'Seguros', texto: 'Proteção para você e para o seu patrimônio.' },
] as const;

// Real Google reviews, transcribed verbatim from screenshots the user sent (2026-09-28).
// No aggregate count/rating is known: never display one.
export const AVALIACOES = [
  {
    nome: 'Paula Moraes',
    texto:
      'Ótimo atendimento com a Luana. Atendimento rápido e muito educada, sempre foi clara e transparente nas informações e nos andamentos de todo o processo. São de confiança. Ficamos muito confortáveis e felizes com o atendimento. Recomendamos.',
  },
  {
    nome: 'Taine Marino',
    texto:
      'Eu fiz o processo do meu financiamento com a correspondente Solange. Sempre foi muito solícita e atenciosa, me respondendo prontamente e tirando todas as minhas dúvidas. Recomendo!',
  },
  {
    nome: 'Bruna Dias',
    texto:
      'Eu e meu marido fizemos todo o processo de financiamento da nossa casa com a correspondente Fernanda! Foi tudo muito rápido, simples e sem burocracia. Ela nos atendeu muito bem, sempre solícita, transparente, rápida e educada. Foi uma ótima experiência!',
  },
  {
    nome: 'Giuliano Martins',
    texto:
      'Realizei com a Conquista todo processo de financiamento de meu imóvel, sendo acompanhando pela Solange. Sempre muito bem atendido e assessorado por eles em relação a todas as dúvidas e processo. Obrigado time Conquista pela realização deste sonho!!!! Recomendo 100%!!!!',
  },
] as const;

// Facts the client published on their own Instagram posts.
export const DESTAQUES = [
  'Agora é possível financiar até 80% do valor do imóvel',
  'Teto do SFH ampliado para R$ 2.250.000,00',
];
