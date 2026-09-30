import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import logo from '../assets/images/logo-dc.png';
import { waLink } from '../content';

const NAV_LINKS = [
  { label: 'Contemplados', href: '#contemplados' },
  { label: 'Consórcios', href: '#modalidades' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Por que consórcio', href: '#comparativo' },
  { label: 'Contato', href: '#contato' },
];

const CTA_URL = waLink('Olá! Vim pelo site e quero saber mais sobre consórcio.');

export default function Nav() {
  const barRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  // Publish the bar row's real height as --nav-height (Hero consumes it).
  // Observe the <nav> row, not the <header>, so the mobile dropdown opening
  // does not change the value.
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

  // Scroll-driven chrome + active-section tracking.
  const { scrollY } = useScroll();
  const updateFromScroll = (y: number) => {
    setScrolled(y > 24);
    const offset = (barRef.current?.getBoundingClientRect().height ?? 72) + window.innerHeight * 0.3;
    let current: string | null = null;
    for (const link of NAV_LINKS) {
      const el = document.querySelector<HTMLElement>(link.href);
      if (el && el.getBoundingClientRect().top - offset <= 0) current = link.href;
    }
    setActive(current);
  };
  useMotionValueEvent(scrollY, 'change', updateFromScroll);
  useEffect(() => {
    updateFromScroll(window.scrollY);
  }, []);

  // Close the mobile menu on Escape or when the viewport grows to lg.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    const mq = window.matchMedia('(min-width: 1024px)');
    const onMq = () => mq.matches && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => {
      window.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
    };
  }, [menuOpen]);

  const scrollToTarget = (href: string) => {
    const target = document.querySelector(href);
    if (!target) return;
    const offset = barRef.current?.getBoundingClientRect().height ?? 0;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    scrollToTarget(href);
  };

  const handleLogoClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  // One condition drives the whole header background, so the bar and the
  // mobile dropdown always read as a single panel (no seam at scrollY=0).
  const opaque = scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
        opaque
          ? 'border-line/70 bg-deep/90 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] backdrop-blur-md'
          : 'border-transparent bg-transparent'
      }`}
    >
      <nav
        ref={barRef}
        aria-label="Navegação principal"
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 transition-[padding] duration-300 sm:px-6 ${
          scrolled ? 'py-3' : 'py-4 sm:py-5'
        }`}
      >
        <a
          href="#inicio"
          onClick={handleLogoClick}
          className="shrink-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <img src={logo} alt="DC Consórcios" width={277} height={58} className="h-9 w-auto sm:h-10" />
        </a>

        <ul className="hidden items-center gap-5 lg:flex xl:gap-7">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.href;
            return (
              <li key={link.href}>
                <motion.a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  aria-current={isActive ? 'location' : undefined}
                  initial="rest"
                  animate={isActive ? 'hover' : 'rest'}
                  whileHover="hover"
                  className={`relative inline-block whitespace-nowrap py-1.5 text-sm font-medium transition-colors duration-200 hover:text-text focus-visible:text-text focus-visible:outline-none ${
                    isActive ? 'text-text' : 'text-silver'
                  }`}
                >
                  {link.label}
                  <motion.span
                    aria-hidden
                    className="absolute -bottom-0.5 left-0 h-[2px] w-full origin-left rounded-full bg-accent"
                    variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                    transition={{ duration: reduceMotion ? 0 : 0.25, ease: 'easeOut' }}
                  />
                </motion.a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <motion.a
            href={CTA_URL}
            target="_blank"
            rel="noreferrer"
            whileHover={reduceMotion ? undefined : { scale: 1.04 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            className="hidden items-center gap-2 whitespace-nowrap rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-fg shadow-[0_8px_24px_-10px_var(--color-accent)] transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:inline-flex"
          >
            <FaWhatsapp className="h-4 w-4" aria-hidden />
            Falar no WhatsApp
          </motion.a>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            className="relative inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/10 text-text transition-colors hover:border-white/25 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? 'close' : 'open'}
                initial={reduceMotion ? false : { rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={reduceMotion ? undefined : { rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="flex"
              >
                {menuOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            id="menu-mobile"
            key="menu-mobile"
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0, y: -8, transition: { duration: 0 } } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden lg:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col gap-1 border-t border-line/70 px-4 pb-5 pt-3 sm:px-6">
              {NAV_LINKS.map((link, i) => {
                const isActive = active === link.href;
                return (
                  <motion.li
                    key={link.href}
                    initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: reduceMotion ? 0 : 0.05 + i * 0.04, duration: 0.25 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      aria-current={isActive ? 'location' : undefined}
                      className={`flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium transition-colors hover:bg-white/5 ${
                        isActive ? 'bg-white/5 text-text' : 'text-silver'
                      }`}
                    >
                      {link.label}
                      {isActive && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />}
                    </a>
                  </motion.li>
                );
              })}
              <motion.li
                className="pt-3"
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduceMotion ? 0 : 0.28, duration: 0.25 }}
              >
                <a
                  href={CTA_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3.5 text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover"
                >
                  <FaWhatsapp className="h-4 w-4" aria-hidden />
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
