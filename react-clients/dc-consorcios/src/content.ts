// Single source for real, confirmed client facts. Sections import from here, never duplicate.

export const EMPRESA = {
  nome: 'DC Consórcios',
  representante: 'Representante exclusiva Consórcio União',
  desde: 2020, // DC opened 19/09/2020 (confirmed by the user).
};

export const CONTATO = {
  // The user confirmed this number opens WhatsApp ("ao clicar em fazer contato vai
  // para o WhatsApp nesse número mesmo").
  telefoneDisplay: '(43) 3017-3315',
  whatsappNumber: '554330173315',
  email: 'atendimento@dcconsorcios.com.br',
  instagramHandle: '@dc.consorcioslondrina',
  instagramUrl: 'https://www.instagram.com/dc.consorcioslondrina/',
  endereco: 'Av. Alziro Zarur, 401',
  bairro: 'Vitória Régia',
  cidade: 'Londrina - PR',
  cep: '86038-130', // From the Google Business listing screenshot.
  mapsQuery: 'DC Consórcios, Av. Alziro Zarur, 401, Vitória Régia, Londrina - PR',
  // UNKNOWN: horário de atendimento. Never display one.
};

export const waLink = (text: string) =>
  `https://wa.me/${CONTATO.whatsappNumber}?text=${encodeURIComponent(text)}`;

// Confirmed by the user: casa, carro, moto, "em geral"; no flagship modality.
export const MODALIDADES = [
  {
    id: 'imovel',
    titulo: 'Consórcio de imóvel',
    texto: 'Planeje a casa própria ou um imóvel para investir, com parcelas sem juros.',
    mensagem: 'Olá! Vim pelo site e quero saber sobre consórcio de imóvel.',
  },
  {
    id: 'carro',
    titulo: 'Consórcio de carro',
    texto: 'O primeiro carro ou a troca pelo próximo, sem pagar juros de financiamento.',
    mensagem: 'Olá! Vim pelo site e quero saber sobre consórcio de carro.',
  },
  {
    id: 'moto',
    titulo: 'Consórcio de moto',
    texto: 'Para o dia a dia ou para o trabalho, com uma parcela que cabe no seu planejamento.',
    mensagem: 'Olá! Vim pelo site e quero saber sobre consórcio de moto.',
  },
] as const;

// Google Business listing, verified from the user's screenshots on 2026-09-28.
export const GOOGLE = {
  nota: '5,0',
  total: 9,
  verificadoEm: '2026-09-28',
};

// Real Google reviews, transcribed verbatim (typos included) from screenshots the user
// sent on 2026-09-28. Only 6 of the 9 reviews were visible. Names shortened to first
// name + surname initial. PROOF NEEDED: client authorization to reproduce them.
// `contemplacao: true` = the review itself mentions contemplação/resgate.
export const AVALIACOES = [
  {
    nome: 'Rodrigo T.',
    contemplacao: true,
    texto:
      'Fui contemplado no consórcio e queria agradecer demais a Ana Paula pelo atendimento! Desde o começo ela sempre foi super atenciosa, explicou tudo direitinho e tirou todas as minhas dúvidas. Recomendo demais.',
  },
  {
    nome: 'Raquel U.',
    contemplacao: true,
    texto:
      'Gostaria de agradecer muito Diego Soares pelo gentileza, simpatia, disponibilidade, eficiencia e capacidade de comunicação e acao, ao resolver meu caso, no resgate da minha contemplação, sendo que moro fora do pais. Um profissional responsável ao qual agradeço muito.',
  },
  {
    nome: 'Simone L.',
    contemplacao: false,
    texto:
      'Foi uma excelente experiência...\nAtendeu totalmente minhas expectativas..\nSuper recomendo\nObrigada Ana Paula',
  },
  {
    nome: 'Gedimar M.',
    contemplacao: false,
    texto: 'Tive uma ótima experiência com a Dc consórcio, agradeço a Ana pelo atendimento, recomendo!',
  },
  {
    nome: 'Mikaelle C.',
    contemplacao: false,
    texto: 'Fui muito bem atendida. Super atenciosos 🥰',
  },
  {
    nome: 'Marcos B.',
    contemplacao: false,
    texto: 'Atendimento profissional e personalizado.',
  },
] as const;
