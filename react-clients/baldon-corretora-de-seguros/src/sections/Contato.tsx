import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, Phone, ArrowUpRight } from 'lucide-react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa6';
import { CONTATO, waLink } from '../content';

// Contato: pulsing rings around a map pin over the embedded map + slow breathing
// glow behind the contact card. Static under prefers-reduced-motion.
// Business hours and email are UNKNOWN: intentionally not displayed.

const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(CONTATO.mapsQuery)}&output=embed`;
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTATO.mapsQuery)}`;
const ENDERECO_COMPLETO = `${CONTATO.endereco}, ${CONTATO.bairro}, ${CONTATO.cidade}, CEP ${CONTATO.cep}`;

const iconBox =
  'grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-surface text-text-muted';
const label = 'text-xs font-semibold uppercase tracking-wider text-text-muted';
const linkCls =
  'mt-0.5 block break-words text-text underline-offset-4 transition-colors hover:text-accent-hover hover:underline';

export default function Contato() {
  const reduce = useReducedMotion();

  return (
    <section id="contato" className="relative overflow-hidden bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="max-w-2xl">
          <h2 className="font-display text-3xl leading-[1.15] text-text sm:text-4xl lg:text-5xl">
            Vamos conversar sobre o que você quer <span className="text-accent">proteger</span>?
          </h2>
          <p className="mt-4 text-base text-text-muted sm:text-lg">
            Chame no WhatsApp, ligue ou venha até o nosso escritório em Londrina.
          </p>
        </header>

        <div className="mt-10 grid items-start gap-6 lg:mt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-8">
          {/* Contact card with breathing glow */}
          <div className="relative min-w-0">
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -inset-10 rounded-[3rem] blur-3xl sm:-inset-14"
              style={{
                background:
                  'radial-gradient(closest-side, color-mix(in oklab, var(--color-shield) 40%, transparent) 0%, color-mix(in oklab, var(--color-accent) 14%, transparent) 45%, transparent 75%)',
              }}
              initial={false}
              animate={reduce ? { opacity: 0.7, scale: 1 } : { opacity: [0.45, 0.95, 0.45], scale: [0.94, 1.04, 0.94] }}
              transition={reduce ? { duration: 0 } : { duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="relative rounded-3xl border border-line bg-surface-2 p-6 shadow-2xl shadow-black/30 sm:p-8">
              <p className="text-sm font-medium text-text-muted">Atendimento pelo WhatsApp</p>
              <motion.a
                href={waLink('Olá! Vim pelo site e quero conversar sobre um seguro.')}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Falar no WhatsApp: ${CONTATO.whatsappDisplay}`}
                className="mt-3 flex w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-whatsapp px-6 py-4 font-display text-lg text-deep transition-[filter] hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:text-xl"
                whileHover={reduce ? undefined : { scale: 1.02 }}
                whileTap={reduce ? undefined : { scale: 0.98 }}
              >
                <FaWhatsapp className="h-6 w-6 shrink-0" aria-hidden />
                <span>{CONTATO.whatsappDisplay}</span>
              </motion.a>

              <ul className="mt-8 space-y-5 border-t border-line pt-6">
                <li className="flex items-start gap-4">
                  <span className={iconBox}>
                    <Phone className="h-5 w-5" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className={label}>Ligar</p>
                    <a href={CONTATO.telefoneHref} className={linkCls}>
                      {CONTATO.telefoneDisplay}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <span className={iconBox}>
                    <FaInstagram className="h-5 w-5" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className={label}>Instagram</p>
                    <a href={CONTATO.instagramUrl} target="_blank" rel="noopener noreferrer" className={linkCls}>
                      {CONTATO.instagramHandle}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <span className={iconBox}>
                    <MapPin className="h-5 w-5" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className={label}>Escritório</p>
                    <address className="mt-0.5 not-italic text-text">
                      {CONTATO.endereco}
                      <br />
                      {CONTATO.bairro}
                      <br />
                      {CONTATO.cidade}, CEP {CONTATO.cep}
                    </address>
                    {/* TODO: horário de atendimento */}
                    {/* TODO: email */}
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Map with pulsing rings around a pin */}
          <div className="flex min-w-0 flex-col">
            <div className="relative h-80 overflow-hidden rounded-3xl border border-line bg-surface-2 sm:h-96 lg:h-[30rem]">
              <iframe
                src={MAP_SRC}
                loading="lazy"
                title="Mapa: Baldon Corretora de Seguros, R. Figueira, 689, Londrina"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
              />

              <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2">
                {reduce ? (
                  <span className="absolute left-0 top-0 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent/60 bg-accent/10" />
                ) : (
                  [0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="absolute -left-8 -top-8 h-16 w-16 rounded-full border-2 border-accent bg-accent/15"
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: [0.4, 2.6], opacity: [0.85, 0] }}
                      transition={{ duration: 3, delay: i, repeat: Infinity, ease: 'easeOut' }}
                    />
                  ))
                )}
                <span className="absolute left-0 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_0_4px_rgba(5,10,26,0.55)]" />
                <motion.span
                  className="absolute -left-6 -top-[3.75rem] grid h-12 w-12 place-items-center rounded-full bg-accent text-accent-fg shadow-lg shadow-black/40 ring-4 ring-deep/60"
                  animate={reduce ? undefined : { y: [0, -5, 0] }}
                  transition={reduce ? undefined : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <MapPin className="h-6 w-6" strokeWidth={2.4} />
                </motion.span>
              </div>

              <div className="pointer-events-none absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4">
                <div className="inline-flex max-w-full items-center rounded-2xl border border-line bg-deep/85 px-4 py-2.5 text-sm text-text backdrop-blur">
                  <span className="truncate">{ENDERECO_COMPLETO}</span>
                </div>
              </div>
            </div>

            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 inline-flex items-center gap-2 self-start rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-text transition-colors hover:border-accent hover:text-accent-hover"
            >
              Abrir no Google Maps · Como chegar
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
