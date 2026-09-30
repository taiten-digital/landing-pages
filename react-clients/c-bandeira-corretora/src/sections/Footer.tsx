import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa6';
import logo from '../assets/images/logo-bandeira.png';
import { CONTATO, EMPRESA, waLink } from '../content';

const LINKS = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#por-que', label: 'Por que corretora' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#contato', label: 'Contato' },
];

const WA_MSG = 'Olá, Cléo! Vim pelo site e gostaria de uma consultoria.';
const ENDERECO = `${CONTATO.endereco}, ${CONTATO.cidade}, ${CONTATO.cep}`;
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTATO.mapsQuery)}`;

// Ping cadence: one ripple burst every PING_CYCLE seconds, then silence (not continuous).
const PING_DURATION = 1.4;
const PING_CYCLE = 4;

function FloatingWhatsApp() {
  const reduceMotion = useReducedMotion();
  // Hidden while the Hero is on screen: the Hero has its own WhatsApp CTA.
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    const hero = document.getElementById('inicio');
    if (!hero) {
      setHeroVisible(false);
      return;
    }
    const io = new IntersectionObserver(([e]) => setHeroVisible(e.intersectionRatio >= 0.3), {
      threshold: 0.3,
    });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <div
      inert={heroVisible}
      className={`fixed bottom-5 right-5 z-50 transition-[opacity,translate] duration-300 ease-out ${
        heroVisible ? 'pointer-events-none translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      {!reduceMotion &&
        [0, 0.35].map((offset) => (
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
      <motion.a
        href={waLink(WA_MSG)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Falar no WhatsApp: ${CONTATO.whatsappDisplay}`}
        title={`WhatsApp ${CONTATO.whatsappDisplay}`}
        className="relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-whatsapp text-white shadow-lg shadow-ink/30 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        animate={reduceMotion ? undefined : { scale: [1, 1.08, 1] }}
        transition={
          reduceMotion
            ? undefined
            : { duration: 0.5, delay: 1.2, repeat: Infinity, repeatDelay: PING_CYCLE - 0.5, ease: 'easeOut' }
        }
        whileHover={reduceMotion ? undefined : { scale: 1.1 }}
        whileTap={reduceMotion ? undefined : { scale: 0.94 }}
      >
        <FaWhatsapp className="h-7 w-7" aria-hidden="true" />
      </motion.a>
    </div>
  );
}

const rowClass = 'flex items-start gap-3 transition-colors hover:text-ink';
const iconClass = 'mt-0.5 h-4 w-4 shrink-0 text-ink-muted';
const labelClass = 'text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted';

export default function Footer() {
  return (
    <footer className="bg-surface text-ink">
      <div className="mx-auto max-w-6xl px-4 pt-14 pb-24 sm:px-6 sm:pt-16 sm:pb-10">
        <div className="grid items-start gap-10 md:grid-cols-[1.3fr_1fr_1.5fr] md:gap-12">
          {/* Brand */}
          <div>
            <a href="#inicio" className="inline-block" aria-label={`${EMPRESA.nome}, voltar ao início`}>
              <img src={logo} alt="C Bandeira Corretora de Seguros" width={420} height={93} className="h-10 w-auto" />
            </a>
            <span aria-hidden="true" className="mt-5 block h-px w-12 bg-gold-ink/40" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-muted">
              Seguros, planos de saúde e odonto e consórcios em Londrina desde {EMPRESA.desde}.
            </p>
            <a
              href={waLink(WA_MSG)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
            >
              <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
              {CONTATO.whatsappDisplay}
            </a>
          </div>

          {/* Links */}
          <nav aria-label="Rodapé">
            <p className={labelClass}>Navegação</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 md:grid-cols-1">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-ink-muted transition-colors hover:text-accent">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className={labelClass}>Contato</p>
            <ul className="mt-4 space-y-3.5 text-sm text-ink-muted">
              <li>
                <a href={CONTATO.telefoneHref} className={rowClass}>
                  <Phone className={iconClass} aria-hidden="true" />
                  <span>Telefone: {CONTATO.telefoneDisplay}</span>
                </a>
              </li>
              <li>
                <a href={waLink(WA_MSG)} target="_blank" rel="noopener noreferrer" className={rowClass}>
                  <FaWhatsapp className={iconClass} aria-hidden="true" />
                  <span>WhatsApp: {CONTATO.whatsappDisplay}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTATO.email}`} className={`${rowClass} break-all`}>
                  <Mail className={iconClass} aria-hidden="true" />
                  <span>{CONTATO.email}</span>
                </a>
              </li>
              <li>
                <a href={CONTATO.instagramUrl} target="_blank" rel="noopener noreferrer" className={rowClass}>
                  <FaInstagram className={iconClass} aria-hidden="true" />
                  <span>{CONTATO.instagramHandle}</span>
                </a>
              </li>
              <li>
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className={rowClass}>
                  <MapPin className={iconClass} aria-hidden="true" />
                  <span>{ENDERECO}</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className={iconClass} aria-hidden="true" />
                {/* UNKNOWN: weekdays. Only the hours are shown, never "segunda a sexta". */}
                <span>{CONTATO.horario}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between sm:pr-20">
          <p>© 2026 {EMPRESA.nome}</p>
          <p>Desde {EMPRESA.desde} em {EMPRESA.cidade}</p>
        </div>
      </div>

      <FloatingWhatsApp />
    </footer>
  );
}
