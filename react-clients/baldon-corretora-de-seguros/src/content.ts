// Single source for real, confirmed client facts. Sections import from here, never duplicate.

export const EMPRESA = {
  nome: 'Baldon Corretora de Seguros',
  curto: 'Baldon',
  cidade: 'Londrina - PR',
};

export const CONTATO = {
  // The user confirmed this is the WhatsApp number: "+55 43 8815-7631".
  // NOTE: Brazilian mobiles normally have a 9 after the DDD; wa.me uses it exactly as given.
  whatsappDisplay: '+55 43 8815-7631',
  whatsappNumber: '554388157631',
  // Phone for calls, from the Google Business listing screenshot.
  telefoneDisplay: '(43) 98815-7631',
  telefoneHref: 'tel:+5543988157631',
  instagramHandle: '@baldoncorretoradeseguros',
  instagramUrl: 'https://www.instagram.com/baldoncorretoradeseguros/',
  endereco: 'R. Figueira, nº 689, Sl 02',
  bairro: 'Santa Rita I',
  cidade: 'Londrina - PR',
  cep: '86072-160', // From the Google Business listing screenshot.
  mapsQuery: 'Baldon Corretora de Seguros, R. Figueira, 689, Santa Rita I, Londrina - PR',
  // UNKNOWN: full horário de atendimento (Google only showed "Aberto, fecha 18:00" for one day). Never display one.
  // UNKNOWN: número de registro SUSEP. Never display one.
};

export const waLink = (text: string) =>
  `https://wa.me/${CONTATO.whatsappNumber}?text=${encodeURIComponent(text)}`;

// Google Business listing: nota 5,0. The user asked NOT to mention the review count.
export const GOOGLE = {
  nota: '5,0',
};

// Protections listed in the client's own Instagram post (5/6 of the carousel of Sep 10).
export const SEGUROS = [
  { id: 'vida', titulo: 'Vida e proteção de renda', texto: 'E se, por algum motivo, você precisasse parar de trabalhar por um período? Seguro de vida pensado para quem é a própria fonte de renda da família.', mensagem: 'Olá! Vim pelo site e quero saber sobre seguro de vida e proteção de renda.' },
  { id: 'casa', titulo: 'Casa', texto: 'Proteção para o lugar onde a sua vida acontece.', mensagem: 'Olá! Vim pelo site e quero saber sobre seguro residencial.' },
  { id: 'auto', titulo: 'Automóvel', texto: 'Seguro para o carro que leva você e a sua família todos os dias.', mensagem: 'Olá! Vim pelo site e quero saber sobre seguro de automóvel.' },
  { id: 'responsabilidade-civil', titulo: 'Responsabilidade civil', texto: 'Proteção para quando um imprevisto causa prejuízo a terceiros.', mensagem: 'Olá! Vim pelo site e quero saber sobre seguro de responsabilidade civil.' },
  { id: 'empresas', titulo: 'Empresas', texto: 'Proteção para o negócio que você construiu.', mensagem: 'Olá! Vim pelo site e quero saber sobre seguro para empresas.' },
  { id: 'cargas', titulo: 'Cargas', texto: 'Proteção para o que é transportado.', mensagem: 'Olá! Vim pelo site e quero saber sobre seguro de cargas.' },
  { id: 'animais', titulo: 'Animais', texto: 'Proteção também para os animais.', mensagem: 'Olá! Vim pelo site e quero saber sobre seguro para animais.' },
  { id: 'riscos-digitais', titulo: 'Riscos digitais e muito mais', texto: 'Riscos digitais e outras necessidades: conte o que você precisa proteger.', mensagem: 'Olá! Vim pelo site e quero saber sobre seguro contra riscos digitais.' },
] as const;

// Real Google reviews, transcribed verbatim from screenshots sent by the user on 2026-10-01.
// Only the REVIEWER's text is here. The owner's replies ("Baldon Corretora de Seguros (proprietário)")
// are NOT reviews and must never be shown as one.
// PROOF NEEDED: client authorization to reproduce them.
export const AVALIACOES = [
  { nome: 'Carlos Teixeira', texto: 'Excelente! Super recomendo! Agilidade e respeito com o cliente, é o que mais me chamou a atenção.' },
  { nome: 'Vania Maria Oliveira', texto: 'Ótimo atendimento' },
  { nome: 'leonardo jafel', texto: 'Facilidade no atendimento, corretora de confiança.' },
] as const;
