import { motion } from 'framer-motion';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa6';

const WHATSAPP_URL =
  'https://api.whatsapp.com/send?phone=5543991167030&text=Oi%20Fabiana%2C%20vim%20pelo%20site%20e%20quero%20saber%20mais%20sobre%20os%20treinos!';
const INSTAGRAM_URL = 'https://www.instagram.com/personalfabianateixeira';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-bg-alt py-16 sm:py-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 text-center">
        <span className="font-display text-3xl tracking-wide text-text">
          Fabiana Teixeira
        </span>

        <p className="max-w-md text-sm text-text-muted">
          Personal trainer em Londrina, PR. Treinos presenciais e consultoria
          online focados em emagrecimento e evolução física.
        </p>

        <div className="flex items-center gap-4">
          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar no WhatsApp com Fabiana Teixeira"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-surface px-5 py-2.5 text-sm font-medium text-text transition-colors hover:border-accent/40 hover:text-accent"
          >
            <FaWhatsapp className="text-lg" aria-hidden="true" />
            (43) 99116-7030
          </motion.a>

          <motion.a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Perfil de Fabiana Teixeira no Instagram"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-surface text-lg text-text transition-colors hover:border-accent/40 hover:text-accent"
          >
            <FaInstagram aria-hidden="true" />
          </motion.a>
        </div>

        <p className="text-xs text-text-muted">
          &copy; {year} Fabiana Teixeira. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
