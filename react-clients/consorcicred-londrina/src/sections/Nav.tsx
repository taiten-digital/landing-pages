import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import logo from '../assets/images/logo-consorcicred.png';
import { waLink } from '../content';

const NAV_LINKS = [
  { label: 'Soluções', href: '#solucoes' },
  { label: 'Seu sonho', href: '#sonhos' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Dúvidas', href: '#duvidas' },
  { label: 'Contato', href: '#contato' },
];

const WA_URL = waLink('Olá! Vim pelo site da ConsorciCred e gostaria de falar com um consultor.');

export default function Nav() {
  const barRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>('');

  // Publish the real bar-row height for the Hero (observe <nav>, not <header>,
  // so the mobile dropdown does not change it).
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

  // Scroll-driven chrome flag + thin progress line.
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 35, restDelta: 0.001 });
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active link tracking: the last section whose top passed the bar.
  useEffect(() => {
    const onScroll = () => {
      const barH = barRef.current?.getBoundingClientRect().height ?? 72;
      let current = '';
      for (const l of NAV_LINKS) {
        const el = document.querySelector(l.href);
        if (el && el.getBoundingClientRect().top <= barH + 120) current = l.href;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the menu when the viewport grows to desktop.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const h = () => mq.matches && setMenuOpen(false);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);

  const goTo = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (!target) return;
    const offset = barRef.current?.getBoundingClientRect().height ?? 72;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  const goTop = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  const opaque = scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
        opaque
          ? 'border-line bg-bg/90 shadow-[0_8px_24px_-12px_rgba(26,33,51,0.18)] backdrop-blur'
          : 'border-transparent bg-bg/0'
      }`}
    >
      <nav
        ref={barRef}
        aria-label="Navegação principal"
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 transition-[padding] duration-300 sm:px-6 ${
          scrolled ? 'py-2' : 'py-3 sm:py-4'
        }`}
      >
        <a href="#inicio" onClick={goTop} aria-label="ConsorciCred, voltar ao topo" className="shrink-0">
          <img src={logo} alt="ConsorciCred" className="h-11 w-auto rounded-md sm:h-12" />
        </a>

        <ul className="hidden items-center gap-5 lg:flex xl:gap-8">
          {NAV_LINKS.map((l) => {
            const isActive = active === l.href;
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => goTo(e, l.href)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`group relative inline-block whitespace-nowrap py-1 text-sm font-medium transition-colors ${
                    isActive ? 'text-text' : 'text-text-muted hover:text-text'
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-[2px] w-full origin-left rounded-full bg-accent transition-transform duration-300 ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <motion.a
          href={WA_URL}
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="hidden shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-whatsapp px-4 py-2.5 text-sm font-semibold text-deep shadow-sm lg:inline-flex xl:px-5"
        >
          <FaWhatsapp className="h-4 w-4" aria-hidden />
          <span className="xl:hidden">WhatsApp</span>
          <span className="hidden xl:inline">Falar no WhatsApp</span>
        </motion.a>

        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg text-text lg:hidden"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-accent"
        style={{ scaleX: reduceMotion ? 0 : progress, opacity: scrolled ? 1 : 0 }}
      />

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 pb-4 pt-1 sm:px-6">
              {NAV_LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.25 }}
                >
                  <a
                    href={l.href}
                    onClick={(e) => goTo(e, l.href)}
                    className={`flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium ${
                      active === l.href ? 'bg-surface-2 text-text' : 'text-text'
                    }`}
                  >
                    {l.label}
                    {active === l.href && <span className="h-2 w-2 rounded-full bg-accent" />}
                  </a>
                </motion.li>
              ))}
              <motion.li
                className="pt-2"
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.25 }}
              >
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3 text-base font-semibold text-deep"
                >
                  <FaWhatsapp className="h-5 w-5" aria-hidden />
                  Falar no WhatsApp
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
