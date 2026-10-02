import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaInstagram, FaLocationDot, FaPhone, FaWhatsapp } from 'react-icons/fa6';
import logo from '../assets/images/logo-flavio-claro.png';
import { CONTATO, EMPRESA, NOTA_CREDENCIAIS, WA_PADRAO, waLink } from '../content';

// Only ids that exist on the page (design-brief contract).
const LINKS = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#contato', label: 'Contato' },
];

// Ping cadence: one ripple burst every PING_CYCLE seconds (not continuous).
const PING_DURATION = 1.4;
const PING_CYCLE = 4;

function FloatingWhatsApp() {
  const reduceMotion = useReducedMotion();
  // Starts hidden so it never flashes over the Hero on first paint; the observer
  // fires right after observe() and settles to the real state immediately.
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const hero = document.getElementById('inicio');
    if (!hero) {
      setHidden(false);
      return;
    }
    const io = new IntersectionObserver(([entry]) => setHidden(entry.intersectionRatio >= 0.3), {
      threshold: 0.3,
    });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <div
      inert={hidden}
      className={`fixed bottom-4 right-4 z-40 transition-[opacity,translate] duration-300 sm:bottom-6 sm:right-6 ${
        hidden ? 'pointer-events-none translate-y-4 opacity-0' : 'opacity-100'
      }`}
    >
      {!reduceMotion &&
        // Two staggered rings so each burst reads as a ripple, then silence.
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
        href={waLink(WA_PADRAO)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-deep shadow-lg shadow-black/40 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-deep"
        whileHover={reduceMotion ? undefined : { scale: 1.08 }}
        whileTap={reduceMotion ? undefined : { scale: 0.94 }}
      >
        <FaWhatsapp className="h-7 w-7" aria-hidden="true" />
      </motion.a>
    </div>
  );
}

const linkClass =
  'rounded-sm text-sm text-sand-muted transition-colors hover:text-accent focus-visible:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent';

const labelClass = 'text-xs font-semibold uppercase tracking-[0.18em] text-sand-muted';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-deep text-sand">
      <div className="mx-auto max-w-6xl px-4 pt-12 pb-24 sm:px-6 sm:pt-14 sm:pb-10">
        <div className="grid items-start gap-10 md:grid-cols-[1.3fr_0.8fr_1.4fr] md:gap-12">
          {/* Brand */}
          <div>
            <a href="#inicio" className="inline-block" aria-label="Flávio Ferreira Negócios Imobiliários, voltar ao início">
              <img
                src={logo}
                alt="Flávio Ferreira Negócios Imobiliários"
                width={433}
                height={165}
                className="h-14 w-auto"
              />
            </a>
            <p className="mt-6 text-sm font-medium tracking-wide text-sand">
              {EMPRESA.cargo} · {EMPRESA.creci}
            </p>
            <p className="mt-2 max-w-xs text-xs leading-relaxed text-sand-muted">{NOTA_CREDENCIAIS}</p>
          </div>

          {/* Links */}
          <nav aria-label="Rodapé">
            <p className={labelClass}>Navegação</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-1">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={linkClass}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className={labelClass}>Contato</p>
            <ul className="mt-4 space-y-3.5">
              <li>
                <a href={`tel:+${CONTATO.whatsapp}`} className={`flex items-center gap-3 ${linkClass}`}>
                  <FaPhone className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{CONTATO.telefone}</span>
                </a>
              </li>
              <li>
                <a
                  href={CONTATO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 ${linkClass}`}
                >
                  <FaInstagram className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="break-all">{CONTATO.instagram}</span>
                </a>
              </li>
              <li>
                <a
                  href={CONTATO.instagramPessoalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 ${linkClass}`}
                >
                  <FaInstagram className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="break-all">
                    {CONTATO.instagramPessoal} <span className="text-xs opacity-70">(Flávio)</span>
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm leading-relaxed text-sand-muted">
                <FaLocationDot className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                <address className="not-italic">
                  {CONTATO.endereco}
                  <br />
                  {CONTATO.bairro}, {CONTATO.cidadeUf}
                  <br />
                  CEP {CONTATO.cep}
                </address>
              </li>
              {/* UNKNOWN: e-mail and opening hours not provided by the client. Intentionally not displayed. */}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-deep-line pt-6 text-xs text-sand-muted sm:flex-row sm:items-center sm:justify-between sm:pr-20">
          <p>
            © {new Date().getFullYear()} {EMPRESA.razaoSocial}
          </p>
          <p>Imagem de capa ilustrativa, banco de imagens</p>
        </div>
      </div>

      <FloatingWhatsApp />
    </footer>
  );
}
