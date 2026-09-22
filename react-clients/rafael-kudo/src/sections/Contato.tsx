import { motion } from 'framer-motion';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa6';

const WHATSAPP_URL = 'https://wa.me/5543991720681';
const WHATSAPP_DISPLAY = '(43) 99172-0681';
const INSTAGRAM_URL = 'https://www.instagram.com/eurafakudo';
const INSTAGRAM_HANDLE = '@eurafakudo';

export function Contato() {
  return (
    <section id="contato" className="relative overflow-hidden bg-bg-alt py-16 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-text-muted">
          Vamos conversar
        </p>
        <h2 className="mt-3 font-display text-3xl uppercase leading-[1.15] tracking-tight text-text sm:text-4xl md:text-5xl">
          Dê o primeiro passo rumo ao seu{' '}
          <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
            próximo nível
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-text-muted sm:text-lg">
          Chame o Rafael direto no WhatsApp e conte seu objetivo, emagrecimento,
          performance ou os dois. Presencial ou online, o programa é montado
          pra você.
        </p>

        <motion.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="mt-8 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-full bg-accent px-8 py-4 text-base font-semibold text-accent-fg shadow-lg shadow-accent/30"
        >
          <FaWhatsapp className="text-2xl" aria-hidden="true" />
          <span>Chamar no WhatsApp</span>
          <span className="whitespace-nowrap">{WHATSAPP_DISPLAY}</span>
        </motion.a>

        <div className="mt-6 flex justify-center">
          <motion.a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 rounded-[var(--radius-card)] border border-border bg-surface px-6 py-4 text-left"
          >
            <FaInstagram className="shrink-0 text-2xl text-text-muted" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-text">Instagram</p>
              <p className="text-sm text-text-muted">{INSTAGRAM_HANDLE}</p>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
