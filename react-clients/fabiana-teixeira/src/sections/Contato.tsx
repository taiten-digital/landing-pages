import { motion, useReducedMotion } from 'framer-motion';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa6';

const WHATSAPP_MESSAGE =
  'Oi Fabiana! Vi seu site e quero saber mais sobre treino (presencial ou online) para emagrecimento.';
const WHATSAPP_URL = `https://api.whatsapp.com/send?phone=5543991167030&text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;
const WHATSAPP_TEL = 'tel:+5543991167030';
const WHATSAPP_DISPLAY = '+55 43 99116-7030';
const INSTAGRAM_URL = 'https://www.instagram.com/personalfabianateixeira';

export default function Contato() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="contato" className="relative overflow-hidden bg-bg py-16 sm:py-20">
      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-text-muted">
          Vamos treinar juntas
        </span>
        <h2 className="mt-4 font-display text-4xl leading-tight text-text sm:text-5xl">
          Seu emagrecimento começa com uma mensagem
        </h2>
        <p className="mt-5 max-w-xl text-base text-text-muted sm:text-lg">
          Presencial em Londrina ou online, de onde você estiver, me chama no WhatsApp e
          vamos montar juntas o treino ideal para o seu objetivo.
        </p>

        <div className="relative mt-10 flex flex-col items-center">
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-accent/50 via-accent-2/30 to-transparent blur-3xl"
            animate={
              reduceMotion
                ? {}
                : { opacity: [0.55, 1, 0.55], scale: [1, 1.12, 1] }
            }
            transition={{
              duration: 5,
              repeat: reduceMotion ? 0 : Infinity,
              ease: 'easeInOut',
            }}
          />

          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="relative z-10 inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-base font-bold text-accent-fg shadow-lg shadow-accent/30 sm:text-lg"
          >
            <FaWhatsapp className="h-6 w-6" aria-hidden="true" />
            Chamar no WhatsApp
          </motion.a>

          <a
            href={WHATSAPP_TEL}
            className="relative z-10 mt-4 text-lg font-semibold tracking-wide text-text transition-colors hover:text-accent-2"
          >
            {WHATSAPP_DISPLAY}
          </a>
        </div>

        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="relative z-10 mt-10 inline-flex items-center gap-2 text-sm font-medium text-text-muted transition-colors hover:text-accent-2"
        >
          <FaInstagram className="h-5 w-5" aria-hidden="true" />
          @personalfabianateixeira
        </a>
      </div>

      {/* Diagonal cut into Footer (bg-alt), same direction as Sobre's for a
          consistent zigzag rhythm down the page. */}
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] block h-12 w-full sm:h-14"
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polygon points="0,56 1440,0 1440,56" className="fill-bg-alt" />
        <line x1="0" y1="56" x2="1440" y2="0" className="stroke-accent/60" strokeWidth={2} />
      </svg>
    </section>
  );
}
