import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check, Copy, ExternalLink } from 'lucide-react';
import { FaInstagram, FaLocationDot, FaPhone, FaWhatsapp } from 'react-icons/fa6';
import { CONTATO, waLink } from '../content';

const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(CONTATO.mapsQuery)}&output=embed`;
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTATO.mapsQuery)}`;

export default function Contato() {
  const reduceMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(CONTATO.whatsapp);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard unavailable (insecure context or denied): stay silent, the number is visible and selectable.
      setCopied(false);
    }
  };

  return (
    <section
      id="contato"
      className="scroll-mt-[var(--nav-height,4.5rem)] bg-surface-2 py-16 sm:py-20"
    >
      {/* TODO: e-mail and horario unknown */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold leading-[1.1] text-text sm:text-4xl lg:text-5xl">
            Vamos conversar sobre o seu <span className="text-accent">plano</span>
          </h2>
          <p className="mt-4 text-lg text-text-muted">
            Pelo WhatsApp, por telefone ou no nosso escritório em Londrina.
          </p>
        </div>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-2">
          {/* Card with rotating conic border */}
          <div className="relative min-w-0 overflow-hidden rounded-3xl p-[3px] shadow-xl shadow-navy/10">
            <motion.div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 aspect-square w-[220%] -translate-x-1/2 -translate-y-1/2"
              style={{
                background:
                  'conic-gradient(from 0deg, var(--color-accent) 0deg, transparent 90deg, var(--color-navy) 180deg, transparent 270deg, var(--color-accent) 360deg)',
                transformOrigin: 'center',
              }}
              animate={reduceMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            />
            <div className="relative rounded-[1.375rem] bg-surface p-6 sm:p-8">
              <p className="text-sm font-medium text-text-muted">WhatsApp</p>
              <p className="mt-1 font-display text-3xl font-bold text-text sm:text-4xl">
                {CONTATO.whatsapp}
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <motion.a
                  href={waLink('Olá! Vim pelo site da ConsorciCred e quero falar sobre um plano.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 font-semibold text-deep"
                >
                  <FaWhatsapp className="size-5" aria-hidden="true" />
                  Falar no WhatsApp
                </motion.a>
                <motion.button
                  type="button"
                  onClick={copyNumber}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  aria-live="polite"
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-line bg-surface px-5 py-3.5 font-semibold text-text hover:border-navy"
                >
                  <span className="relative grid size-5 place-items-center">
                    <AnimatePresence mode="wait" initial={false}>
                      {copied ? (
                        <motion.span
                          key="check"
                          initial={{ scale: 0, rotate: -90, opacity: 0 }}
                          animate={{ scale: 1, rotate: 0, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                          className="absolute text-whatsapp"
                        >
                          <Check className="size-5" strokeWidth={3} aria-hidden="true" />
                        </motion.span>
                      ) : (
                        <motion.span
                          key="copy"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="absolute"
                        >
                          <Copy className="size-5" aria-hidden="true" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                  {copied ? 'Número copiado' : 'Copiar número'}
                </motion.button>
              </div>

              <ul className="mt-7 space-y-4 border-t border-line pt-6 text-text">
                <li className="flex items-start gap-3">
                  <FaPhone className="mt-1 size-4 shrink-0 text-text-muted" aria-hidden="true" />
                  <div>
                    <p className="text-sm text-text-muted">Telefone fixo</p>
                    <a
                      href={`tel:+${CONTATO.telefoneFixoDigits}`}
                      className="font-semibold hover:text-accent"
                    >
                      {CONTATO.telefoneFixo}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FaInstagram className="mt-1 size-4 shrink-0 text-text-muted" aria-hidden="true" />
                  <div>
                    <p className="text-sm text-text-muted">Instagram</p>
                    <a
                      href={CONTATO.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold hover:text-accent"
                    >
                      {CONTATO.instagram}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FaLocationDot className="mt-1 size-4 shrink-0 text-text-muted" aria-hidden="true" />
                  <div>
                    <p className="text-sm text-text-muted">Escritório</p>
                    <p className="font-semibold">{CONTATO.enderecoLinha1}</p>
                    <p className="text-text-muted">{CONTATO.enderecoLinha2}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Map */}
          <div className="min-w-0">
            <div className="overflow-hidden rounded-3xl border border-line bg-surface shadow-xl shadow-navy/10">
              <iframe
                src={mapsEmbed}
                title="Mapa: ConsorciCred, Rua Piauí, 399, Londrina"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-[320px] w-full border-0 sm:h-[420px] lg:h-[480px]"
              />
            </div>
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 font-semibold text-text hover:text-accent"
            >
              Abrir no Google Maps
              <ExternalLink className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
