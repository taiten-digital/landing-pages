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
import logoMark from '../assets/images/logo-mark.png';

const CALENDLY_URL = 'https://calendly.com/vinimarianofranco';

const NAV_LINKS = [
  { label: 'Diagnóstico', href: '#diagnostico' },
  { label: 'Método CAFÉ', href: '#metodo' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Contato', href: '#contato' },
];

export default function Nav() {
  const reduceMotion = useReducedMotion();
  const barRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(() => typeof window !== 'undefined' && window.scrollY > 24);

  // Publish the bar row's real height for Hero (calc(100svh - var(--nav-height))).
  // Observes the <nav> row, not the <header>, so the open mobile dropdown doesn't count.
  // The bar height is constant on scroll on purpose: shrinking it would resize the Hero mid-scroll.
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
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 });

  // Opaque whenever scrolled OR the menu is open, so the bar and dropdown read as one panel.
  const solid = scrolled || menuOpen;
  const close = () => setMenuOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
        solid ? 'border-line bg-deep/90 backdrop-blur-md' : 'border-transparent bg-transparent'
      }`}
    >
      <nav
        ref={barRef}
        aria-label="Navegação principal"
        className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 sm:px-8"
      >
        <a href="#inicio" onClick={close} className="flex shrink-0 items-center gap-3">
          <img src={logoMark} alt="" className="h-9 w-auto sm:h-10" />
          <span className="font-display text-lg font-semibold tracking-tight text-text sm:text-xl">
            Vini Mariano
          </span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative inline-block py-1 text-sm font-medium text-text-muted transition-colors hover:text-text"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-text/50 transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <motion.a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={reduceMotion ? undefined : { scale: 1.03 }}
          whileTap={reduceMotion ? undefined : { scale: 0.97 }}
          className="hidden shrink-0 rounded-full bg-cta px-5 py-2.5 text-sm font-semibold text-cta-fg transition-colors hover:bg-cta-hover lg:inline-flex"
        >
          Agendar conversa
        </motion.a>

        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          aria-controls="menu-mobile"
          className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-text lg:hidden"
        >
          {menuOpen ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
        </button>
      </nav>

      {/* Dropdown animates opacity + y only, never height (height:auto cancels the link's smooth scroll on mobile).
          No own background: it sits inside the header, which is already solid while the menu is open. */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="menu-mobile"
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="lg:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-5 pb-5 sm:px-8">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={close}
                    className="block border-b border-line py-3 text-base font-medium text-text"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-4">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  className="flex items-center justify-center rounded-full bg-cta px-5 py-3 text-sm font-semibold text-cta-fg transition-colors hover:bg-cta-hover"
                >
                  Agendar conversa
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll-progress hairline along the bottom edge, only once the chrome is solid. */}
      <motion.div
        aria-hidden
        className={`absolute inset-x-0 -bottom-px h-px origin-left bg-accent/70 transition-opacity duration-300 ${
          solid ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ scaleX: reduceMotion ? scrollYProgress : smoothProgress }}
      />
    </header>
  );
}
