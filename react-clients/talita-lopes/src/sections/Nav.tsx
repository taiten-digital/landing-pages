import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logo from '../assets/images/logo.webp';

const NAV_LINKS = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'FAQ', href: '#faq' },
];

const WHATSAPP_URL =
  'https://wa.me/5543984795883?text=' +
  encodeURIComponent('Olá, Talita! Vi sua página e quero marcar uma avaliação gratuita.');

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

  const logoHover = reduceMotion ? {} : { rotate: -6, scale: 1.05 };

  return (
    <header
      ref={navRef}
      className={`fixed inset-x-0 top-0 z-50 bg-cream transition-[background-color,backdrop-filter,box-shadow,border-color] duration-300 ${
        scrolled
          ? 'bg-cream/90 backdrop-blur-md border-b border-border shadow-sm'
          : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-3 shrink-0" aria-label="Talita Lopes, início">
          <motion.img
            src={logo}
            alt="Talita Lopes"
            className="h-9 w-9 object-contain"
            whileHover={logoHover}
            transition={{ type: 'spring', stiffness: 320, damping: 14 }}
          />
          <span className="font-display text-lg font-bold uppercase tracking-wide text-forest">
            Talita Lopes
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative font-sans text-sm text-muted transition-colors duration-200 hover:text-forest"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="hidden rounded-pill bg-accent px-5 py-2.5 font-sans text-sm font-bold text-accent-fg shadow-sm md:inline-block"
          >
            Marcar avaliação
          </motion.a>

          <button
            type="button"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center text-forest md:hidden"
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
            className="overflow-hidden border-t border-border bg-cream/95 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={handleLinkClick}
                    className="block py-2 font-sans text-base text-muted transition-colors duration-200 hover:text-forest"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  className="block rounded-pill bg-accent px-5 py-3 text-center font-sans text-sm font-bold text-accent-fg"
                >
                  Marcar avaliação
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
