import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa6';
import { CONTATO, EMPRESA, waLink } from '../content';

// Contato: pulsing gold rings around a map-pin badge over the embedded map +
// a slow breathing gold ambient glow behind the contact card. Under reduced
// motion both are static.
// No office/facade photo exists (client-brief.md: confirmed), so the live map is
// the section's visual. Weekdays are UNKNOWN: only the hours are shown.

const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(CONTATO.mapsQuery)}&output=embed`;
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTATO.mapsQuery)}`;
const [EMAIL_USER, EMAIL_DOMAIN] = CONTATO.email.split('@');

function Row({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <li className="flex items-start gap-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-wine-line bg-wine text-cream-muted">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-wider text-cream-muted">{label}</p>
        <div className="mt-0.5 text-cream">{children}</div>
      </div>
    </li>
  );
}

const linkCls = 'underline-offset-4 transition-colors hover:text-gold-hover hover:underline';

export default function Contato() {
  const reduce = useReducedMotion();

  return (
    <section id="contato" className="relative overflow-hidden bg-wine py-16 text-cream sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="max-w-2xl">
          <h2 className="font-display text-3xl leading-[1.15] text-cream sm:text-4xl lg:text-5xl">
            Vamos conversar sobre a sua <span className="text-gold">proteção</span>?
          </h2>
          <p className="mt-4 text-base text-cream-muted sm:text-lg">
            Chame no WhatsApp, ligue, mande um e‑mail ou venha até o escritório, em Londrina.
          </p>
        </header>

        <div className="mt-10 grid items-start gap-8 lg:mt-12 lg:grid-cols-2 lg:gap-10">
          {/* Contact card with a breathing gold glow behind it */}
          <div className="relative min-w-0">
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -inset-8 rounded-[3rem] blur-3xl sm:-inset-14"
              style={{
                background:
                  'radial-gradient(closest-side, color-mix(in oklab, var(--color-gold) 30%, transparent) 0%, color-mix(in oklab, var(--color-gold) 10%, transparent) 45%, transparent 72%)',
              }}
              initial={false}
              animate={reduce ? { opacity: 0.6, scale: 1 } : { opacity: [0.35, 0.85, 0.35], scale: [0.95, 1.05, 0.95] }}
              transition={reduce ? { duration: 0 } : { duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="relative rounded-3xl border border-wine-line bg-wine-2 p-6 shadow-2xl shadow-black/30 sm:p-8">
              <p className="text-sm font-medium text-cream-muted">Atendimento pelo WhatsApp</p>
              <motion.a
                href={waLink('Olá, Cléo! Vim pelo site e gostaria de conversar.')}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Falar no WhatsApp: ${CONTATO.whatsappDisplay}`}
                className="mt-3 flex w-full items-center justify-center gap-3 rounded-full bg-whatsapp px-6 py-4 text-lg font-semibold text-ink shadow-lg shadow-black/25 transition-[filter] hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:text-xl"
                whileHover={reduce ? undefined : { scale: 1.02 }}
                whileTap={reduce ? undefined : { scale: 0.98 }}
              >
                <FaWhatsapp className="h-6 w-6 shrink-0" aria-hidden />
                <span>{CONTATO.whatsappDisplay}</span>
              </motion.a>

              <ul className="mt-8 space-y-5 border-t border-wine-line pt-6">
                <Row icon={<Phone className="h-5 w-5" aria-hidden />} label="Telefone">
                  <a href={CONTATO.telefoneHref} className={linkCls}>
                    {CONTATO.telefoneDisplay}
                  </a>
                </Row>
                <Row icon={<Mail className="h-5 w-5" aria-hidden />} label="E-mail">
                  <a href={`mailto:${CONTATO.email}`} className={`${linkCls} text-sm [overflow-wrap:anywhere] sm:text-base`}>
                    {EMAIL_USER}@<wbr />
                    {EMAIL_DOMAIN}
                  </a>
                </Row>
                <Row icon={<FaInstagram className="h-5 w-5" aria-hidden />} label="Instagram">
                  <a href={CONTATO.instagramUrl} target="_blank" rel="noopener noreferrer" className={linkCls}>
                    {CONTATO.instagramHandle}
                  </a>
                </Row>
                <Row icon={<MapPin className="h-5 w-5" aria-hidden />} label="Escritório">
                  <address className="not-italic">
                    {CONTATO.endereco}
                    <br />
                    {CONTATO.cidade}, CEP {CONTATO.cep}
                  </address>
                </Row>
                <Row icon={<Clock className="h-5 w-5" aria-hidden />} label="Horário de atendimento">
                  {/* UNKNOWN: weekdays. Hours only, never "segunda a sexta". */}
                  {CONTATO.horario}
                </Row>
              </ul>
            </div>
          </div>

          {/* Map with pulsing gold rings around the pin badge (the section's focal gold detail) */}
          <div className="flex min-w-0 flex-col">
            <div className="relative h-80 overflow-hidden rounded-3xl border border-wine-line bg-wine-2 sm:h-96 lg:h-[30rem]">
              <iframe
                src={MAP_SRC}
                loading="lazy"
                title="Mapa: C Bandeira Corretora de Seguros, Rua João Alves da Rocha Loures, 454, Londrina"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
              />

              {/* Centered ~20px above the map center, over the embed's own marker body. */}
              <div aria-hidden className="pointer-events-none absolute left-1/2 top-[calc(50%-20px)]">
                {reduce ? (
                  <span className="absolute -left-10 -top-10 h-20 w-20 rounded-full border-2 border-gold/60 bg-gold/15" />
                ) : (
                  [0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="absolute -left-10 -top-10 h-20 w-20 rounded-full border-2 border-gold bg-gold/20"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: [0.5, 2.8], opacity: [0.9, 0] }}
                      transition={{ duration: 3, delay: i, repeat: Infinity, ease: 'easeOut' }}
                    />
                  ))
                )}
                <span className="absolute -left-7 -top-7 grid h-14 w-14 place-items-center rounded-full bg-gold text-gold-fg shadow-xl shadow-black/40 ring-4 ring-wine/70">
                  <MapPin className="h-7 w-7" strokeWidth={2.2} />
                </span>
              </div>

              <div className="pointer-events-none absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4">
                <div className="inline-flex max-w-full rounded-2xl border border-wine-line bg-wine/90 px-4 py-2.5 text-sm text-cream backdrop-blur">
                  <span className="truncate">{EMPRESA.nome}</span>
                </div>
              </div>
            </div>

            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 inline-flex items-center gap-2 self-start rounded-full border border-cream/30 px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:border-cream/60 hover:bg-cream/5"
            >
              Abrir no Google Maps
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
