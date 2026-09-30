import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa6';
import { MapPin, Phone } from 'lucide-react';
import logo from '../assets/images/logo-consorcicred.png';
import { CONTATO, EMPRESA, PARCEIROS, waLink } from '../content';

const LINKS = [
  { href: '#solucoes', label: 'Soluções' },
  { href: '#sonhos', label: 'Sonhos' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#duvidas', label: 'Dúvidas' },
  { href: '#contato', label: 'Contato' },
];

const WA_MSG = 'Olá! Vim pelo site e quero saber mais sobre consórcio.';

// One ring burst every PING_CYCLE seconds (not continuous).
const PING_DURATION = 1.4;
const PING_CYCLE = 4;

function joinNames(names: string[]) {
  if (names.length <= 1) return names.join('');
  return `${names.slice(0, -1).join(', ')} e ${names[names.length - 1]}`;
}

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
      className={`fixed bottom-5 right-5 z-50 transition-[opacity,translate] duration-300 ${
        heroVisible ? 'pointer-events-none translate-y-4 opacity-0' : 'opacity-100'
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
        aria-label={`Falar no WhatsApp: ${CONTATO.whatsapp}`}
        title={`WhatsApp ${CONTATO.whatsapp}`}
        className="relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-whatsapp text-white shadow-lg shadow-black/40 outline-none focus-visible:ring-2 focus-visible:ring-accent-on-deep focus-visible:ring-offset-2 focus-visible:ring-offset-deep"
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

export default function Footer() {
  const representante = `Representante autorizado de ${joinNames(PARCEIROS.map((p) => p.nome))}.`;

  return (
    <footer className="bg-deep text-on-deep">
      <div className="mx-auto max-w-6xl px-4 pt-14 pb-24 sm:px-6 sm:pt-16 sm:pb-10">
        <div className="grid items-start gap-10 md:grid-cols-[1.3fr_1fr_1.4fr] md:gap-12">
          {/* Brand */}
          <div>
            <a
              href="#inicio"
              className="inline-block rounded-xl bg-white px-3 py-2"
              aria-label={`${EMPRESA.nome}, voltar ao início`}
            >
              <img src={logo} alt={EMPRESA.nome} className="h-10 w-auto" />
            </a>
            {/* Client's own claim. */}
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-on-deep-muted">{representante}</p>
            <a
              href={waLink(WA_MSG)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 font-display text-sm font-semibold text-deep transition-transform hover:-translate-y-0.5"
            >
              <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
              {CONTATO.whatsapp}
            </a>
          </div>

          {/* Links */}
          <nav aria-label="Rodapé">
            <p className="font-display text-xs uppercase tracking-[0.18em] text-on-deep-muted">Navegação</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 md:grid-cols-1">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-on-deep-muted transition-colors hover:text-on-deep">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="font-display text-xs uppercase tracking-[0.18em] text-on-deep-muted">Contato</p>
            <ul className="mt-4 space-y-3.5 text-sm text-on-deep-muted">
              <li>
                <a
                  href={waLink(WA_MSG)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 transition-colors hover:text-on-deep"
                >
                  <FaWhatsapp className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>WhatsApp: {CONTATO.whatsapp}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:+${CONTATO.telefoneFixoDigits}`}
                  className="flex items-start gap-3 transition-colors hover:text-on-deep"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Telefone: {CONTATO.telefoneFixo}</span>
                </a>
              </li>
              <li>
                <a
                  href={CONTATO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 transition-colors hover:text-on-deep"
                >
                  <FaInstagram className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{CONTATO.instagram}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://www.google.com/maps?q=${encodeURIComponent(CONTATO.mapsQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 transition-colors hover:text-on-deep"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>
                    {CONTATO.enderecoLinha1}
                    <br />
                    {CONTATO.enderecoLinha2}
                  </span>
                </a>
              </li>
              {/* TODO: e-mail and horário de atendimento UNKNOWN, intentionally not displayed. */}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-line-deep pt-6 text-xs text-on-deep-muted sm:pr-20">
          <p>
            © 2026 {EMPRESA.nome}. {EMPRESA.descricao}. {EMPRESA.cidade} - PR.
          </p>
        </div>
      </div>

      <FloatingWhatsApp />
    </footer>
  );
}
