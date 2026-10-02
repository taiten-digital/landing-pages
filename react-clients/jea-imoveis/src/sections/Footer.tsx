import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa6';
import logo from '../assets/images/logo-jea-claro.png';
import { CONTATO, CREDENCIAIS, EMPRESA, NOTA_CREDENCIAIS, WA_PADRAO, waLink } from '../content';

// Only ids that exist on the page.
const LINKS = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#avaliacoes', label: 'Avaliações' },
  { href: '#contato', label: 'Contato' },
];

// Ping cadence: one ripple burst every PING_CYCLE seconds (not continuous).
const PING_DURATION = 1.4;
const PING_CYCLE = 4;

function FloatingWhatsApp() {
  const reduceMotion = useReducedMotion();
  // Starts hidden so it never flashes over the Hero on first paint. The observer
  // callback fires right after observe(), so it settles to the real state immediately.
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
      className={`fixed bottom-4 right-4 z-40 transition-[opacity,translate] duration-300 ${
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
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg shadow-black/40 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-deep"
        whileHover={reduceMotion ? undefined : { scale: 1.08 }}
        whileTap={reduceMotion ? undefined : { scale: 0.94 }}
      >
        <FaWhatsapp className="h-7 w-7" aria-hidden="true" />
      </motion.a>
    </div>
  );
}

const linkClass =
  'rounded-sm text-sm text-sand-muted transition-colors hover:text-sand focus-visible:text-sand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-deep text-sand">
      <div className="mx-auto max-w-6xl px-4 pt-14 pb-24 sm:px-6 sm:pt-16 sm:pb-10">
        <div className="grid items-start gap-10 md:grid-cols-[1.4fr_1fr_1.2fr] md:gap-12">
          {/* Brand */}
          <div>
            <a href="#inicio" className="inline-block" aria-label="JEA Imóveis, voltar ao início">
              <img src={logo} alt="JEA Imóveis" width={986} height={260} className="h-8 w-auto" />
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-sand-muted">
              Imobiliária em {EMPRESA.cidade}, {EMPRESA.uf}
            </p>
            <p className="mt-6 text-sm font-medium tracking-wide text-sand">
              {CREDENCIAIS.map((c) => `${c.sigla} ${c.numero}`).join(' · ')}
            </p>
            <p className="mt-2 max-w-xs text-xs leading-relaxed text-sand-muted">{NOTA_CREDENCIAIS}</p>
          </div>

          {/* Links */}
          <nav aria-label="Rodapé">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sand-muted">Navegação</p>
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
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sand-muted">Contato</p>
            <ul className="mt-4 space-y-3.5">
              <li>
                <a
                  href={waLink(WA_PADRAO)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 ${linkClass}`}
                >
                  <FaWhatsapp className="h-4 w-4 shrink-0 text-sand-muted" aria-hidden="true" />
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
                  <FaInstagram className="h-4 w-4 shrink-0 text-sand-muted" aria-hidden="true" />
                  <span>{CONTATO.instagram}</span>
                </a>
              </li>
              {/* TODO: address, e-mail and opening hours are UNKNOWN (not provided by the client). Intentionally not displayed. */}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-deep-line pt-6 text-xs text-sand-muted sm:flex-row sm:items-center sm:justify-between sm:pr-20">
          <p>
            © {new Date().getFullYear()} {EMPRESA.nome}. Todos os direitos reservados.
          </p>
          <p>Fotos ilustrativas de banco de imagens</p>
        </div>
      </div>

      <FloatingWhatsApp />
    </footer>
  );
}
