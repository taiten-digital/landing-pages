import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa6';
import { MapPin } from 'lucide-react';
import { CONTATO, EMPRESA, waLink } from '../content';
// Client's own logo (WebP they sent, background keyed to alpha). White letters: dark bg only.
import logo from '../assets/images/logo-conquista.png';
// CAIXA logotype, Wikimedia Commons "Caixa Econômica Federal logo 1997.svg". Use approved by the
// user as correspondent. Only inside a white chip.
import logoCaixa from '../assets/images/logo-caixa.svg';

const LINKS = [
  { href: '#simulador', label: 'Simulador' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#avaliacoes', label: 'Avaliações' },
  { href: '#contato', label: 'Contato' },
];

const WA_MSG = 'Olá! Vim pelo site e quero falar sobre financiamento.';

// Ping: ring expands and fades in ~1.2s, then waits, so one beat every ~4s (not constant).
// Two rings offset a little give a "double pulse" like a notification.
const PING = { duration: 1.2, ease: 'easeOut' as const, repeat: Infinity, repeatDelay: 2.8 };

export default function Footer() {
  const reduceMotion = useReducedMotion();
  // The floating button hides while the Hero is on screen: the Hero has its own WhatsApp CTA.
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    const hero = document.getElementById('inicio');
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setHeroVisible(e.intersectionRatio >= 0.3), {
      threshold: 0.3,
    });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <footer className="relative overflow-hidden bg-deep text-on-dark">
      {/* Soft brand-blue light from the top edge so the footer doesn't read as a flat slab. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[48rem] max-w-[140%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--color-brand),transparent)] opacity-60 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1.2fr] items-start">
          {/* Brand */}
          <div>
            <a href="#inicio" aria-label={`${EMPRESA.nome}, voltar ao início`} className="inline-block">
              <img src={logo} alt={EMPRESA.nome} width={328} height={175} className="h-16 w-auto sm:h-20" />
            </a>
            <p className="mt-6 font-display text-2xl font-extrabold leading-[1.15] sm:text-3xl">
              Facilitando suas <em className="font-extrabold italic text-accent">conquistas!</em>
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-white px-3 py-1.5">
                <img src={logoCaixa} alt="CAIXA" className="h-4 w-auto" />
              </span>
              <span className="text-sm font-semibold text-on-dark-muted">{EMPRESA.correspondente}</span>
            </div>
          </div>

          {/* Anchors */}
          <nav aria-label="Rodapé">
            <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-on-dark-muted">Navegação</p>
            <ul className="mt-5 space-y-3">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="group inline-flex items-center gap-2 text-on-dark transition-colors hover:text-accent"
                  >
                  
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-on-dark-muted">Contato</p>
            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href={waLink(WA_MSG)}
                  target="_blank"
                  rel="noopener"
                  className="group flex items-start gap-3"
                >
                  <FaWhatsapp aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-whatsapp" />
                  <span>
                    <span className="block text-sm text-on-dark-muted">WhatsApp</span>
                    <span className="font-display text-lg font-bold transition-colors group-hover:text-whatsapp">
                      {CONTATO.whatsappDisplay}
                    </span>
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-on-dark-muted" />
                <address className="not-italic text-on-dark">
                  {CONTATO.endereco}
                  <br />
                  Centro, {CONTATO.cidade}
                </address>
              </li>
            </ul>
            {/* TODO: e-mail, horário de atendimento e @ do Instagram (UNKNOWN, não confirmados pelo cliente). */}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-on-dark-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {EMPRESA.nome}</p>
          <p>{EMPRESA.correspondente} em Londrina</p>
        </div>
      </div>

      {/* Floating WhatsApp button: fixed once past the Hero, lives here per design-brief. */}
      <motion.a
        href={waLink(WA_MSG)}
        target="_blank"
        rel="noopener"
        inert={heroVisible}
        aria-label={`Falar no WhatsApp: ${CONTATO.whatsappDisplay}`}
        className={`fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-white shadow-lg shadow-black/30 transition-[opacity,translate] duration-300 ${
          heroVisible ? 'pointer-events-none translate-y-4 opacity-0' : 'opacity-100'
        }`}
        whileHover={reduceMotion ? undefined : { scale: 1.08 }}
        whileTap={reduceMotion ? undefined : { scale: 0.94 }}
      >
        {!reduceMotion &&
          [0, 0.35].map((delay) => (
            <motion.span
              key={delay}
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full border-2 border-whatsapp"
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: [1, 1.9], opacity: [0.7, 0] }}
              transition={{ ...PING, delay: 1.5 + delay }}
            />
          ))}
        <FaWhatsapp aria-hidden className="relative h-7 w-7" />
      </motion.a>
    </footer>
  );
}
