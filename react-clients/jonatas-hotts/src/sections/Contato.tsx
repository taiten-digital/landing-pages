import { motion } from 'framer-motion';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa6';
import { MapPin } from 'lucide-react';

const WHATSAPP_URL = 'https://wa.me/5543999813940';
const WHATSAPP_DISPLAY = '(43) 99981-3940';
const INSTAGRAM_URL = 'https://www.instagram.com/jhotts/';
const INSTAGRAM_HANDLE = '@jhotts';
const ADDRESS = 'Av. Garibaldi Deliberador, Jardim Cláudia, Londrina - PR';
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

export function Contato() {
  return (
    <section id="contato" className="bg-bg-alt py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="font-[var(--font-display)] text-3xl font-bold text-text sm:text-4xl">
          Bora dar o{' '}
          <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
            primeiro passo
          </span>{' '}
          hoje mesmo
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-text-muted sm:text-lg">
          Chama no WhatsApp e conta seu objetivo. Presencial em Londrina ou
          consultoria online, é você quem escolhe.
        </p>

        <motion.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="mt-8 inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full bg-accent px-6 py-4 text-center text-sm font-semibold text-accent-fg shadow-lg shadow-accent/30 sm:px-8 sm:text-base"
        >
          <FaWhatsapp className="text-2xl" aria-hidden="true" />
          <span>Chamar no WhatsApp:</span>
          <span className="whitespace-nowrap">{WHATSAPP_DISPLAY}</span>
        </motion.a>

        <div className="mx-auto mt-12 grid max-w-2xl gap-4 sm:grid-cols-2">
          <motion.a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 rounded-[var(--radius-card)] border border-border bg-surface px-6 py-5 text-left"
          >
            <FaInstagram className="shrink-0 text-2xl text-text-muted" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-text">Instagram</p>
              <p className="text-sm text-text-muted">{INSTAGRAM_HANDLE}</p>
            </div>
          </motion.a>

          <motion.a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 rounded-[var(--radius-card)] border border-border bg-surface px-6 py-5 text-left"
          >
            <MapPin className="shrink-0 text-2xl text-text-muted" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-text">Endereço</p>
              <p className="text-sm text-text-muted">{ADDRESS}</p>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
