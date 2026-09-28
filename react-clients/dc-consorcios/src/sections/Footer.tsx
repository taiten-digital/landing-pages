import { motion, useReducedMotion } from 'framer-motion';
import { Mail, MapPin } from 'lucide-react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa6';
import logo from '../assets/images/logo-dc.png';
import { CONTATO, EMPRESA, waLink } from '../content';

const LINKS = [
  { href: '#inicio', label: 'Início' },
  { href: '#contemplados', label: 'Contemplados' },
  { href: '#modalidades', label: 'Consórcios' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#comparativo', label: 'Por que consórcio' },
  { href: '#contato', label: 'Contato' },
];

const WA_MSG = 'Olá! Vim pelo site e quero saber mais sobre consórcio.';

// Ping cadence: one ring burst every PING_CYCLE seconds (not continuous).
const PING_DURATION = 1.4;
const PING_CYCLE = 4;

function FloatingWhatsApp() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {!reduceMotion && (
        <>
          {/* Two staggered rings so each burst reads as a ripple, then silence. */}
          {[0, 0.35].map((offset) => (
            <motion.span
              key={offset}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full bg-whatsapp"
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: [1, 1.9], opacity: [0.5, 0] }}
              transition={{
                duration: PING_DURATION,
                delay: 1.2 + offset,
                repeat: Infinity,
                repeatDelay: PING_CYCLE - PING_DURATION,
                ease: 'easeOut',
              }}
            />
          ))}
        </>
      )}
      <motion.a
        href={waLink(WA_MSG)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Falar no WhatsApp: ${CONTATO.telefoneDisplay}`}
        title={`WhatsApp ${CONTATO.telefoneDisplay}`}
        className="relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-whatsapp text-white shadow-lg shadow-black/40 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-deep"
        animate={reduceMotion ? undefined : { scale: [1, 1.08, 1] }}
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 0.5,
                delay: 1.2,
                repeat: Infinity,
                repeatDelay: PING_CYCLE - 0.5,
                ease: 'easeOut',
              }
        }
        whileHover={reduceMotion ? undefined : { scale: 1.1 }}
        whileTap={reduceMotion ? undefined : { scale: 0.94 }}
      >
        <FaWhatsapp className="h-7 w-7" aria-hidden="true" />
      </motion.a>
    </div>
  );
}

export default function Footer() {
  const enderecoCompleto = `${CONTATO.endereco}, ${CONTATO.bairro}, ${CONTATO.cidade}, ${CONTATO.cep}`;

  return (
    <footer className="bg-deep text-text">
      <div className="mx-auto max-w-6xl px-4 pt-14 pb-24 sm:px-6 sm:pt-16 sm:pb-10">
        <div className="grid items-start gap-10 md:grid-cols-[1.3fr_1fr_1.4fr] md:gap-12">
          {/* Brand */}
          <div>
            <a href="#inicio" className="inline-block" aria-label="DC Consórcios, voltar ao início">
              <img src={logo} alt="DC Consórcios" width={277} height={58} className="h-9 w-auto sm:h-10" />
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-text-muted">
              {EMPRESA.representante} em Londrina.
            </p>
            <a
              href={waLink(WA_MSG)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 font-display text-sm font-semibold text-deep transition-transform hover:-translate-y-0.5"
            >
              <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
              {CONTATO.telefoneDisplay}
            </a>
          </div>

          {/* Links */}
          <nav aria-label="Rodapé">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-silver">
              Navegação
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 md:grid-cols-1">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-text-muted transition-colors hover:text-text">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-silver">
              Contato
            </p>
            <ul className="mt-4 space-y-3.5 text-sm text-text-muted">
              <li>
                <a
                  href={waLink(WA_MSG)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 transition-colors hover:text-text"
                >
                  <FaWhatsapp className="mt-0.5 h-4 w-4 shrink-0 text-silver" aria-hidden="true" />
                  <span>Telefone e WhatsApp: {CONTATO.telefoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTATO.email}`}
                  className="flex items-start gap-3 break-all transition-colors hover:text-text"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-silver" aria-hidden="true" />
                  <span>{CONTATO.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={CONTATO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 transition-colors hover:text-text"
                >
                  <FaInstagram className="mt-0.5 h-4 w-4 shrink-0 text-silver" aria-hidden="true" />
                  <span>{CONTATO.instagramHandle}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://www.google.com/maps?q=${encodeURIComponent(CONTATO.mapsQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 transition-colors hover:text-text"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-silver" aria-hidden="true" />
                  {/* TODO: CEP pending confirmation with the client (86038-130 vs 86083-130). */}
                  <span>{enderecoCompleto}</span>
                </a>
              </li>
              {/* TODO: horário de atendimento UNKNOWN, intentionally not displayed. */}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between sm:pr-20">
          <p>© 2026 {EMPRESA.nome}</p>
          <p>Desde {EMPRESA.desde} em Londrina</p>
        </div>
      </div>

      <FloatingWhatsApp />
    </footer>
  );
}
