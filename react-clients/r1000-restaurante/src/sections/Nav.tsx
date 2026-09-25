import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import logo from '../assets/images/logo-r1000.png';

const WHATSAPP_URL =
  'https://wa.me/5543991383162?text=Ol%C3%A1%2C%20R1000!%20Quero%20fazer%20um%20pedido.';

const NAV_LINKS = [
  { label: 'Cardápio', href: '#cardapio' },
  { label: 'Promoções', href: '#pedir' },
  { label: 'Onde estamos', href: '#onde-estamos' },
];

const SCROLL_THRESHOLD = 24;

export default function Nav() {
  const barRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  // Contract: publish the BAR ROW height (not the whole header, since the
  // mobile dropdown lives inside the header) as --nav-height. Hero reads
  // var(--nav-height, 4.5rem).
  useLayoutEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const set = () =>
      document.documentElement.style.setProperty(
        '--nav-height',
        `${el.getBoundingClientRect().height}px`,
      );
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu if the viewport grows past the lg breakpoint.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = () => mq.matches && setMenuOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Thin ember "brasa" line on the bottom edge that fills with page progress.
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  // Opaque whenever scrolled OR the menu is open, so the bar and the
  // dropdown are always one consistent panel (no seam at scrollY=0).
  const solid = scrolled || menuOpen;
  const t = reduceMotion ? { duration: 0 } : { duration: 0.28, ease: 'easeOut' as const };

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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
        solid
          ? 'border-white/10 bg-bg/90 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] backdrop-blur-md'
          : 'border-transparent bg-transparent'
      }`}
    >
      {/* Soft top shade while transparent so links stay legible over the photo */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 h-full bg-gradient-to-b from-bg/60 to-transparent transition-opacity duration-300 ${
          solid ? 'opacity-0' : 'opacity-100'
        }`}
      />

      <nav
        ref={barRef}
        aria-label="Navegação principal"
        className={`relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 sm:py-4`}
      >
        <a
          href="#inicio"
          onClick={handleLogoClick}
          className="flex shrink-0 items-center gap-3"
          aria-label="R1000 Restaurante, voltar ao topo"
        >
          <span
            className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-md ring-2 ring-white/10 h-12 w-12 sm:h-[52px] sm:w-[52px]`}
          >
            <img
              src={logo}
              alt="Logo R1000 Restaurante"
              width={150}
              height={150}
              className="h-full w-full object-contain"
            />
          </span>
          <span className="hidden font-display text-2xl leading-[1.1] font-bold tracking-wide text-fg min-[360px]:inline">
            R1000
          </span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="group relative inline-block py-1 text-sm font-medium whitespace-nowrap text-fg/90 transition-colors hover:text-fg"
              >
                {link.label}
                <span
                  aria-hidden
                  className="absolute -bottom-0.5 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-ember transition-transform duration-300 group-hover:scale-x-100"
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={reduceMotion ? undefined : { scale: 1.04 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            className="hidden items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold whitespace-nowrap text-accent-fg shadow-lg shadow-accent/25 transition-colors hover:bg-accent-hover md:inline-flex"
          >
            <FaWhatsapp className="h-4 w-4" aria-hidden />
            Pedir no WhatsApp
          </motion.a>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-fg transition-colors hover:bg-white/10 lg:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? 'close' : 'open'}
                initial={reduceMotion ? false : { rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={reduceMotion ? undefined : { rotate: 90, opacity: 0 }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.18 }}
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
            key="menu-mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={t}
            className="relative overflow-hidden border-t border-white/5 lg:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 pt-2 pb-5 sm:px-6">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={reduceMotion ? { duration: 0 } : { delay: 0.05 + i * 0.05, duration: 0.25 }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="block rounded-xl px-3 py-3 font-display text-lg leading-[1.1] font-semibold text-fg transition-colors hover:bg-white/5 hover:text-ember"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <li className="pt-3 md:hidden">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3.5 text-base font-bold whitespace-nowrap text-accent-fg shadow-lg shadow-accent/25 transition-colors hover:bg-accent-hover"
                >
                  <FaWhatsapp className="h-5 w-5" aria-hidden />
                  Pedir no WhatsApp
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ember progress line: fills as the page is read, only shown once the chrome is solid */}
      <motion.div
        aria-hidden
        className={`absolute inset-x-0 bottom-[-1px] h-[2px] origin-left bg-gradient-to-r from-accent to-ember transition-opacity duration-300 ${
          scrolled ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ scaleX: reduceMotion ? scrollYProgress : progress }}
      />
    </header>
  );
}
