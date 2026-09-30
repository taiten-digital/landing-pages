import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
// Client's Método C40 logo, green background keyed to transparent (no tagline, for the bar).
import logo from '../assets/images/logo-c40-nav.png';

const NAV_LINKS = [
  { label: 'Para quem é', href: '#para-quem' },
  { label: 'O curso', href: '#curso' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Investimento', href: '#oferta' },
  { label: 'Dúvidas', href: '#faq' },
];

export default function Nav() {
  const barRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  // Publish the bar row's real height for Hero (calc(100svh - var(--nav-height))).
  // Observes the <nav> row, not the <header>, so the mobile dropdown opening
  // doesn't shrink the Hero.
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
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // scrolled || menuOpen: header bar and dropdown share one opaque panel, no seam at scrollY=0.
  const solid = scrolled || menuOpen;
  const close = () => setMenuOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 motion-reduce:transition-none ${
        solid ? 'border-white/10 bg-deep/90 backdrop-blur-md' : 'border-transparent bg-transparent'
      }`}
    >
      <nav
        ref={barRef}
        aria-label="Navegação principal"
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6"
      >
        <a href="#" onClick={close} className="flex shrink-0 items-center" aria-label="Método C40, voltar ao topo">
          <img src={logo} alt="Método C40" width={600} height={329} className="h-12 w-auto sm:h-14" />
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative py-1 font-sans text-sm font-medium text-cream/85 transition-colors hover:text-cream"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-blush transition-transform duration-300 group-hover:scale-x-100 motion-reduce:transition-none" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <motion.a
            href="#oferta"
            onClick={close}
            whileHover={reduceMotion ? undefined : { scale: 1.03 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            className="hidden rounded-full bg-accent px-5 py-2.5 font-sans text-sm font-semibold text-accent-fg shadow-sm transition-colors hover:bg-accent-hover sm:inline-flex"
          >
            Quero meu acesso
          </motion.a>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-cream transition-colors hover:bg-white/10 lg:hidden"
          >
            {menuOpen ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
          </button>
        </div>
      </nav>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            id="menu-mobile"
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.28, ease: 'easeOut' }}
            className="overflow-hidden lg:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 pb-5 sm:px-6">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reduceMotion ? 0 : 0.05 + i * 0.04, duration: 0.25 }}
                >
                  <a
                    href={link.href}
                    onClick={close}
                    className="block rounded-xl px-3 py-3 font-sans text-base font-medium text-cream/90 transition-colors hover:bg-white/5 hover:text-cream"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <li className="pt-2 sm:hidden">
                <a
                  href="#oferta"
                  onClick={close}
                  className="flex items-center justify-center rounded-full bg-accent px-5 py-3 font-sans text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover"
                >
                  Quero meu acesso
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
