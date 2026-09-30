import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import logo from '../assets/images/logo-bandeira.png';
import { waLink } from '../content';

const LINKS = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Por que corretora', href: '#por-que' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Contato', href: '#contato' },
];

const WA_URL = waLink('Olá, Cléo! Vim pelo site e gostaria de uma consultoria.');

export default function Nav() {
  const barRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();

  // Publish the bar row's real height for Hero (pt-[var(--nav-height)]) and
  // section scroll-margin. Observes <nav>, not <header>, so the mobile
  // dropdown opening never changes the value.
  useLayoutEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const set = () =>
      document.documentElement.style.setProperty('--nav-height', `${el.getBoundingClientRect().height}px`);
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setOpen(false);
  // The bar is always opaque cream (the wine logo vanishes on the wine Hero);
  // scrolling (or an open menu) only adds the border + soft shadow. While the
  // menu is open the header goes fully bg-bg so bar and dropdown are one surface.
  const chrome = scrolled || open;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 backdrop-blur border-b transition-[border-color,box-shadow] duration-300 motion-reduce:transition-none ${
        open ? 'bg-bg' : 'bg-bg/95'
      } ${chrome ? 'border-line shadow-[0_8px_24px_rgba(43,20,23,0.08)]' : 'border-transparent shadow-none'}`}
    >
      <nav
        ref={barRef}
        aria-label="Navegação principal"
        className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3 sm:px-6"
      >
        <a
          href="#inicio"
          onClick={close}
          className="shrink-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <img src={logo} alt="C Bandeira Corretora de Seguros" className="h-9 w-auto sm:h-10" />
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-ink transition-colors hover:text-accent focus-visible:text-accent focus-visible:outline-none"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <motion.a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={reduceMotion ? undefined : { scale: 1.03 }}
          whileTap={reduceMotion ? undefined : { scale: 0.97 }}
          className="hidden shrink-0 items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-fg shadow-sm transition-colors hover:bg-accent-hover lg:inline-flex"
        >
          <FaWhatsapp className="h-4 w-4" aria-hidden />
          Falar no WhatsApp
        </motion.a>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="menu-mobile"
          className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-ink transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-accent lg:hidden"
        >
          {open ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
        </button>
      </nav>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="menu-mobile"
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden bg-bg lg:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col px-4 pb-5 pt-1 sm:px-6">
              {LINKS.map((l) => (
                <li key={l.href} className="border-b border-line/70">
                  <a
                    href={l.href}
                    onClick={close}
                    className="block py-3 text-base font-medium text-ink transition-colors hover:text-accent"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pt-4">
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  className="flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-fg shadow-sm transition-colors hover:bg-accent-hover"
                >
                  <FaWhatsapp className="h-4 w-4" aria-hidden />
                  Falar no WhatsApp
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
