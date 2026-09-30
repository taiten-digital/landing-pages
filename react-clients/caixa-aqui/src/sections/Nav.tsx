import { useLayoutEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion';
import { Menu, X } from 'lucide-react';
// Client's own logo (white letters + gold house on transparent), supplied by the client.
import logo from '../assets/images/logo-conquista.png';

const LINKS = [
  { label: 'Simulador', href: '#simulador' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Avaliações', href: '#avaliacoes' },
  { label: 'Contato', href: '#contato' },
];

export default function Nav() {
  const barRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(() => window.scrollY > 24);
  const reduceMotion = useReducedMotion();

  // Publish the bar row's real height (not the header's, so the mobile dropdown
  // doesn't shrink the Hero). Hero reads var(--nav-height, 4.5rem).
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

  const { scrollY, scrollYProgress } = useScroll();
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24));
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  const solid = scrolled || menuOpen;
  const close = () => setMenuOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        solid ? 'bg-deep/90 shadow-lg shadow-black/20 backdrop-blur' : 'bg-transparent'
      }`}
    >
      <nav
        ref={barRef}
        aria-label="Navegação principal"
        className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3 sm:px-6"
      >
        <a href="#inicio" onClick={close} aria-label="Conquista Financiamentos, voltar ao início" className="shrink-0">
          <img src={logo} alt="Conquista Financiamentos" className="h-9 w-auto sm:h-10 lg:h-11" />
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative inline-block py-1 font-display text-sm font-semibold text-on-dark/90 transition-colors hover:text-on-dark"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 h-0.5 w-full origin-left scale-x-0 rounded-full bg-on-dark transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <motion.a
            href="#simulador"
            whileHover={reduceMotion ? undefined : { scale: 1.04 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            className="hidden rounded-full bg-accent px-5 py-2.5 font-display text-sm font-bold text-accent-fg shadow-md shadow-black/20 transition-colors hover:bg-accent-hover sm:inline-flex"
          >
            Simular agora
          </motion.a>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-on-dark transition-colors hover:bg-white/10 lg:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? 'x' : 'menu'}
                initial={reduceMotion ? false : { rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={reduceMotion ? undefined : { rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="flex"
              >
                {menuOpen ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            id="menu-mobile"
            initial={reduceMotion ? false : { y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { y: -8, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.28, ease: 'easeOut' }}
            className="overflow-hidden border-t border-white/10 lg:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col px-4 py-3 sm:px-6">
              {LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={reduceMotion ? false : { x: -12, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: reduceMotion ? 0 : 0.04 * i + 0.06, duration: 0.22 }}
                >
                  <a
                    href={link.href}
                    onClick={close}
                    className="block rounded-xl px-3 py-3 font-display text-base font-semibold text-on-dark transition-colors hover:bg-white/5"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <li className="pt-3 pb-2">
                <a
                  href="#simulador"
                  onClick={close}
                  className="flex items-center justify-center rounded-full bg-accent px-5 py-3 font-display text-sm font-bold text-accent-fg transition-colors hover:bg-accent-hover"
                >
                  Simular agora
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll progress hairline: only visible once the chrome is solid. */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className={`absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent transition-opacity duration-300 ${
          scrolled ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </header>
  );
}
