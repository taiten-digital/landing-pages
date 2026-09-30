import abacaxi from './assets/images/abacaxi.webp'
import chimichurri from './assets/images/chimichurri.webp'
import saladinha from './assets/images/saladinha.webp'

// Número como enviado pelo cliente: +55 43 9160-0338. Tem 8 dígitos após o DDD,
// confirmar se falta um 9 antes de publicar (muda só aqui).
export const WA_NUMBER = '554391600338'
export const WA_DISPLAY = '+55 43 9160-0338'
export const INSTAGRAM_URL = 'https://www.instagram.com/dyess.conservasfinas'
export const INSTAGRAM_HANDLE = '@dyess.conservasfinas'

export const waLink = (message: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`

export const WA_GENERIC = waLink('Olá, Dyess! Vi o site e quero fazer um pedido.')

export type FlavorId = 'chimichurri' | 'saladinha' | 'abacaxi'

export interface Flavor {
  id: FlavorId
  name: string
  short: string
  // Textos adaptados do post "Conheça nossos sabores" do Instagram da própria marca.
  description: string
  pairs: string[]
  glow: string
  // Imagens: renders PNG enviados pelo cliente (recortados, com alpha real).
  image: string
  ratio: number
}

export const FLAVORS: Flavor[] = [
  {
    id: 'chimichurri',
    name: 'Chimichurri',
    short: 'Clássico e aromático',
    description:
      'Clássico e aromático, feito com salsinha, cebolinha e temperos especiais. Perfeito para carnes, legumes e muito mais.',
    pairs: ['Carnes', 'Legumes'],
    glow: '#6aa32c',
    image: chimichurri,
    ratio: 827 / 1100,
  },
  {
    id: 'saladinha',
    name: 'Saladinha de Pimenta',
    short: 'Sabor marcante e equilibrado',
    description:
      'Sabor marcante e equilibrado, com pimenta dedo-de-moça, cebola e ervas. Ideal para dar aquele toque especial em qualquer prato.',
    pairs: ['Qualquer prato'],
    glow: '#e0321f',
    image: saladinha,
    ratio: 763 / 1073,
  },
  {
    id: 'abacaxi',
    name: 'Abacaxi com Pimenta',
    short: 'Doce com toque picante',
    description:
      'Doce na medida certa com um toque picante irresistível. Combina com queijos, carnes e aperitivos.',
    pairs: ['Queijos', 'Carnes', 'Aperitivos'],
    glow: '#f2a31b',
    image: abacaxi,
    ratio: 659 / 939,
  },
]

export const flavorById = (id: FlavorId) => FLAVORS.find((f) => f.id === id)!

export const SECTION_IDS = {
  hero: 'inicio',
  sabores: 'sabores',
  combina: 'combina',
  pedido: 'pedido',
  artesanal: 'artesanal',
  contato: 'contato',
} as const
