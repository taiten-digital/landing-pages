import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logo from '../assets/images/logo.png';

const NAV_LINKS = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Avaliações', href: '#avaliacoes' },
  { label: 'Unidades', href: '#unidades' },
  { label: 'Contato', href: '#contato' },
];

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  // Measure real rendered nav height so full-bleed sections (Hero) can size
  // themselves as calc(100svh - var(--nav-height)) without guessing a constant.
  useLayoutEffect(() => {
    const el = navRef.current;
    if (!el) return;

    const setHeight = () => {
      document.documentElement.style.setProperty(
        '--nav-height',
        `${el.getBoundingClientRect().height}px`
      );
    };

    setHeight();
    const observer = new ResizeObserver(setHeight);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu automatically once the viewport grows back to desktop.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  const logoHover = reduceMotion
    ? {}
    : { rotate: -10, scale: 1.06 };

  return (
    <header
      ref={navRef}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300 ${
        scrolled
          ? 'bg-bg/85 backdrop-blur-md border-b border-fg/10'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#top"
          className="flex items-center gap-3 shrink-0"
          aria-label="Don Leon Barbearia, início"
        >
          <motion.img
            src={logo}
            alt="Don Leon Barbearia"
            className="h-10 w-10 object-contain"
            whileHover={logoHover}
            transition={{ type: 'spring', stiffness: 320, damping: 14 }}
          />
          <span className="hidden font-display uppercase tracking-wide text-fg sm:block">
            <span className="text-lg leading-none">Don Leon</span>
            <span className="block text-[0.65rem] font-sans font-normal normal-case tracking-normal text-fg-muted">
              Barbearia · High Experience
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-sans text-sm text-fg-muted transition-colors duration-200 hover:text-fg"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <motion.a
            href="#contato"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="hidden rounded-card bg-accent px-5 py-2.5 font-display text-sm uppercase tracking-wide text-fg shadow-sm md:inline-block"
          >
            Agendar
          </motion.a>

          <button
            type="button"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center text-fg md:hidden"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-fg/10 bg-bg/95 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={handleLinkClick}
                    className="block py-2 font-sans text-base text-fg-muted transition-colors duration-200 hover:text-fg"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="#contato"
                  onClick={handleLinkClick}
                  className="block rounded-card bg-accent px-5 py-3 text-center font-display text-sm uppercase tracking-wide text-fg"
                >
                  Agendar
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
