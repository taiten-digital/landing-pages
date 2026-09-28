import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { CONTATO, EMPRESA, waLink } from '../content';
// Wikimedia Commons, "Caixa Econômica Federal logo 1997.svg". CAIXA trademark, used
// because the client is an authorized Correspondente CAIXA Aqui (usage confirmed by the client).
import logoCaixa from '../assets/images/logo-caixa.svg';

const ENDERECO_COMPLETO = `${CONTATO.endereco}, Centro, ${CONTATO.cidade}`;
const MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(CONTATO.mapsQuery)}&output=embed`;
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTATO.mapsQuery)}`;

export default function Contato() {
  const reduce = useReducedMotion();

  return (
    <section id="contato" className="relative overflow-hidden bg-brand py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold leading-[1.1] text-on-dark sm:text-4xl lg:text-5xl">
            Vamos tirar seu <em className="italic text-accent">plano</em> do papel?
          </h2>
          <p className="mt-4 text-lg text-on-dark-muted">
            Fale com a Conquista pelo WhatsApp ou venha até o nosso escritório no centro de Londrina.
          </p>
        </div>

        <div className="mt-10 grid items-start gap-8 lg:mt-12 lg:grid-cols-[5fr_7fr] lg:gap-10">
          {/* Contact card + breathing gold glow behind it */}
          <div className="relative min-w-0">
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -inset-10 rounded-full blur-3xl"
              style={{
                background:
                  'radial-gradient(closest-side, color-mix(in srgb, var(--color-accent) 55%, transparent) 0%, transparent 72%)',
              }}
              initial={{ opacity: 0.7, scale: 1 }}
              animate={reduce ? { opacity: 0.7, scale: 1 } : { opacity: [0.45, 0.95, 0.45], scale: [0.94, 1.06, 0.94] }}
              transition={reduce ? { duration: 0 } : { duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="relative rounded-3xl bg-surface p-6 text-text shadow-2xl shadow-deep/30 sm:p-8">
              <h3 className="font-display text-2xl font-extrabold leading-[1.1]">Fale com a gente</h3>

              <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-text-muted">WhatsApp</p>
              <a
                href={waLink('Olá! Vim pelo site e quero falar com a Conquista.')}
                target="_blank"
                rel="noopener"
                aria-label={`Falar no WhatsApp: ${CONTATO.whatsappDisplay}`}
                className="mt-2 inline-flex items-center gap-3 rounded-full bg-whatsapp px-6 py-3.5 font-display text-lg font-bold text-deep shadow-lg shadow-whatsapp/30 transition hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <FaWhatsapp aria-hidden className="size-6 shrink-0" />
                {CONTATO.whatsappDisplay}
              </a>

              <div className="mt-8 border-t border-text/10 pt-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-text-muted">Escritório</p>
                <p className="mt-2 flex items-start gap-2.5 text-lg leading-snug">
                  <MapPin aria-hidden className="mt-0.5 size-5 shrink-0 text-text-muted" />
                  <span>{ENDERECO_COMPLETO}</span>
                </p>
                {/* TODO: horário de atendimento e e-mail são UNKNOWN (client-brief), não exibir até confirmar. */}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-white px-3 py-1.5 ring-1 ring-text/10">
                  <img src={logoCaixa} alt="CAIXA" className="h-5 w-auto" />
                </span>
                <span className="text-sm font-semibold text-text-muted">{EMPRESA.correspondente}</span>
              </div>
            </div>
          </div>

          {/* Map with pulsing marker */}
          <div className="min-w-0">
            <div className="relative h-[320px] overflow-hidden rounded-3xl bg-deep-2 shadow-2xl shadow-deep/30 ring-1 ring-white/10 sm:h-[420px] lg:h-[460px]">
              <iframe
                src={MAP_EMBED}
                loading="lazy"
                title="Mapa: Conquista Financiamentos, Rua Pio XII, 303, Londrina"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
              />

              {/* Decorative marker: sits over the embed's own pin (map center), click-through. */}
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-[calc(50%+18px)] items-center justify-center"
              >
                {!reduce &&
                  [0, 1.2].map((delay) => (
                    <motion.span
                      key={delay}
                      className="absolute size-12 rounded-full border-2 border-brand bg-brand/25"
                      initial={{ scale: 0.8, opacity: 0.7 }}
                      animate={{ scale: [0.8, 2.8], opacity: [0.7, 0] }}
                      transition={{ duration: 2.4, delay, repeat: Infinity, ease: 'easeOut' }}
                    />
                  ))}
                <span className="relative flex size-12 items-center justify-center rounded-full bg-deep text-on-dark shadow-xl ring-4 ring-white">
                  <MapPin className="size-6" />
                </span>
                <span className="absolute top-full mt-2 whitespace-nowrap rounded-full bg-deep px-3 py-1 text-xs font-bold text-on-dark shadow-lg">
                  {EMPRESA.nome}
                </span>
              </div>
            </div>

            <a
              href={MAP_LINK}
              target="_blank"
              rel="noopener"
              className="mt-4 inline-flex items-center gap-1.5 font-semibold text-on-dark underline-offset-4 hover:underline"
            >
              Abrir no Google Maps
              <ArrowUpRight aria-hidden className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
