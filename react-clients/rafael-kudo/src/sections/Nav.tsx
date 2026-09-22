import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useReducedMotion,
} from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import logo from '../assets/images/logo-rafael-kudo.png';

const WHATSAPP_URL = 'https://wa.me/5543991720681';

const LINKS = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Método', href: '#metodo' },
  { label: 'Números', href: '#numeros' },
  { label: 'Planos', href: '#planos' },
  { label: 'Contato', href: '#contato' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const barRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const reduceMotion = useReducedMotion();

  // Publish the real rendered bar height (not the dropdown, which would shrink
  // Hero while the mobile menu is open) so Hero can size itself as
  // calc(100svh - var(--nav-height)) without a guessed constant.
  useLayoutEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const setHeight = () => {
      document.documentElement.style.setProperty(
        '--nav-height',
        `${el.getBoundingClientRect().height}px`,
      );
    };
    setHeight();
    const observer = new ResizeObserver(setHeight);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 8);
  });

  // close mobile menu on any breakpoint jump to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const chromeActive = scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        chromeActive
          ? 'bg-bg/90 backdrop-blur-md border-b border-border'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav ref={barRef} className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16 sm:h-20">
        <a href="#" className="shrink-0 flex items-center" aria-label="Rafael Kudo, início">
          <img
            src={logo}
            alt="Rafael Kudo, Alta Performance"
            className="h-10 sm:h-12 w-auto object-contain"
          />
        </a>

        <ul className="hidden md:flex items-center gap-6 lg:gap-8">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative py-1 text-sm font-medium text-text-muted transition-colors hover:text-text"
              >
                <span className="relative">
                  {link.label}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-px w-full origin-left bg-accent"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: reduceMotion ? 0 : 0.25, ease: 'easeOut' }}
                  />
                </span>
              </a>
            </li>
          ))}
        </ul>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-fg transition-transform hover:scale-[1.03] active:scale-[0.97]"
        >
          <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
          Fale comigo
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          className="md:hidden cursor-pointer text-text p-2 -mr-2"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-bg/90 backdrop-blur-md border-t border-border"
          >
            <ul className="flex flex-col gap-1 px-4 py-4 sm:px-6">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-2.5 text-base font-medium text-text-muted transition-colors hover:text-text"
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
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-fg cursor-pointer"
                >
                  <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
                  Fale comigo
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
