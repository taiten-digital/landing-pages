export const WHATSAPP_NUMBER = '5543984796609';
export const WHATSAPP_DISPLAY = '(43) 98479-6609';
export const INSTAGRAM_URL = 'https://www.instagram.com/estacaodochopplondrina';
export const INSTAGRAM_HANDLE = '@estacaodochopplondrina';

export const waLink = (msg = 'Olá! Vim pelo site e quero pedir chopp.') =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

// Cutouts live in public/ (not src/assets) so the Hero can preload them.
export const img = (name: string) => `${import.meta.env.BASE_URL}images/${name}.webp`;
