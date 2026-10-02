import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import logo from '../assets/images/logo-flavio-claro.png';
import { CONTATO, EMPRESA, WA_PADRAO, waLink } from '../content';

const NAV_LINKS = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Contato', href: '#contato' },
];

export default function Nav() {
  const reduceMotion = useReducedMotion() ?? false;
  const barRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('');
  const { scrollYProgress } = useScroll();

  // Opaque when scrolled OR menu open, so bar and dropdown always read as one surface.
  const opaque = scrolled || menuOpen;

  // Publish the bar-row height for Hero (calc(100svh - var(--nav-height))).
  // Observes the <nav> row, not the <header>, so the open dropdown never shrinks the Hero.
  useLayoutEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const root = document.documentElement;
    const set = () => root.style.setProperty('--nav-height', `${el.getBoundingClientRect().height}px`);
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => {
      ro.disconnect();
      root.style.removeProperty('--nav-height');
    };
  }, []);

  // Scroll-driven chrome + scroll-spy for the active link.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const navH = barRef.current?.getBoundingClientRect().height ?? 0;
      const line = window.scrollY + navH + window.innerHeight * 0.35;
      let current = '';
      for (const link of NAV_LINKS) {
        const el = document.querySelector(link.href);
        if (!el) continue;
        if (el.getBoundingClientRect().top + window.scrollY <= line) current = link.href;
      }
      setActiveHref(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Close the mobile menu on Escape or when growing into the desktop layout.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    const mq = window.matchMedia('(min-width: 1024px)');
    const onMq = () => {
      if (mq.matches) setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => {
      window.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
    };
  }, []);

  const scrollToTarget = useCallback(
    (href: string) => {
      const target = document.querySelector(href);
      if (!target) return;
      const navH = barRef.current?.getBoundingClientRect().height ?? 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navH + 1;
      window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
    },
    [reduceMotion],
  );

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToTarget(href);
    setMenuOpen(false);
  };

  const handleLogoClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    setMenuOpen(false);
  };

  const waHref = waLink(WA_PADRAO);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        ref={barRef}
        aria-label="Navegação principal"
        className={`relative border-b transition-colors duration-300 ${
          opaque ? 'bg-deep/95 backdrop-blur' : 'bg-transparent'
        } ${scrolled && !menuOpen ? 'border-deep-line' : 'border-transparent'}`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a
            href="#inicio"
            onClick={handleLogoClick}
            aria-label={`Voltar ao topo, ${EMPRESA.nome}`}
            className="flex shrink-0 items-center"
          >
            <img src={logo} alt={EMPRESA.nome} width={433} height={165} className="h-10 w-auto sm:h-12" />
          </a>

          <ul className="hidden items-center gap-7 lg:flex xl:gap-9">
            {NAV_LINKS.map((link) => {
              const active = activeHref === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    aria-current={active ? 'true' : undefined}
                    className={`relative inline-block whitespace-nowrap py-1 text-sm font-medium transition-colors duration-200 hover:text-sand ${
                      active ? 'text-sand' : 'text-sand-muted'
                    }`}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-active-underline"
                        aria-hidden
                        className="absolute -bottom-0.5 left-0 h-px w-full bg-sand/70"
                        transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            {/* Icon-only below lg so the bar never crowds in the 800-950px band. */}
            <motion.a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              aria-label={`Falar no WhatsApp, ${CONTATO.telefone}`}
              whileHover={reduceMotion ? undefined : { scale: 1.04 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              className="inline-flex h-10 w-10 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-accent text-sm font-semibold text-accent-fg shadow-sm transition-colors hover:bg-accent-hover lg:w-auto lg:px-5"
            >
              <FaWhatsapp className="h-5 w-5 shrink-0 lg:h-4 lg:w-4" aria-hidden />
              <span className="hidden lg:inline">WhatsApp</span>
              <span className="hidden xl:inline">{CONTATO.telefone}</span>
            </motion.a>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuOpen}
              aria-controls="flavio-mobile-menu"
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-sand lg:hidden"
            >
              {menuOpen ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
            </button>
          </div>
        </div>

        {!reduceMotion && (
          <motion.span
            aria-hidden
            style={{ scaleX: scrollYProgress }}
            animate={{ opacity: scrolled && !menuOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-none absolute inset-x-0 -bottom-px h-px origin-left bg-accent/70"
          />
        )}
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="flavio-mobile-menu"
            initial={reduceMotion ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: reduceMotion ? 0 : 0.25, ease: 'easeOut' }}
            className="border-b border-deep-line bg-deep/95 backdrop-blur lg:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 pb-4 pt-1 sm:px-6">
              {NAV_LINKS.map((link) => {
                const active = activeHref === link.href;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      aria-current={active ? 'true' : undefined}
                      className={`block rounded-lg px-2 py-3 text-base font-medium transition-colors hover:text-sand ${
                        active ? 'text-sand' : 'text-sand-muted'
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
              <li className="pt-2">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-fg shadow-sm transition-colors hover:bg-accent-hover"
                >
                  <FaWhatsapp className="h-4 w-4" aria-hidden />
                  WhatsApp {CONTATO.telefone}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
