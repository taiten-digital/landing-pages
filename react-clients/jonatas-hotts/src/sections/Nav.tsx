import { useLayoutEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import logo from '../assets/images/logo.png';

const WHATSAPP_URL = 'https://wa.me/5543999813940';

const NAV_LINKS = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Como Funciona', href: '#como-funciona' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'Contato', href: '#contato' },
];

const linkUnderline = {
  rest: { scaleX: 0 },
  hover: { scaleX: 1 },
};

export default function Nav() {
  const headerRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Measure the real rendered nav height so full-bleed sections (Hero) can
  // size themselves as calc(100svh - var(--nav-height)) without guessing a
  // constant.
  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const setHeight = () => {
      document.documentElement.style.setProperty('--nav-height', `${el.getBoundingClientRect().height}px`);
    };
    setHeight();
    const observer = new ResizeObserver(setHeight);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { scrollY } = useScroll();
  const scrollChromeOpacity = useTransform(scrollY, [0, 80], [0, 1], { clamp: true });
  // Force the chrome fully opaque while the mobile menu is open — otherwise
  // at scrollY=0 the header row stays transparent (showing the Hero photo)
  // while the opaque dropdown panel sits right below it, a visible seam.
  const chromeOpacity = mobileOpen ? 1 : scrollChromeOpacity;
  const chromeBlurPx = useTransform(scrollY, [0, 80], [0, 14], { clamp: true });
  const chromeBackdrop = useTransform(chromeBlurPx, (b) => `blur(${b}px)`);
  const shadowAlpha = useTransform(scrollY, [0, 80], [0, 0.1], { clamp: true });
  const chromeShadow = useTransform(shadowAlpha, (a) => `0 8px 24px rgba(20, 33, 61, ${a})`);
  const rowPaddingY = useTransform(scrollY, [0, 80], [18, 10], { clamp: true });

  const scrollToTarget = (href: string) => {
    const target = document.querySelector(href);
    if (!target || !headerRef.current) return;
    const offset = headerRef.current.getBoundingClientRect().height;
    const top = target.getBoundingClientRect().top + window.scrollY - offset - 8;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToTarget(href);
    setMobileOpen(false);
  };

  const handleLogoClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50">
      <motion.div
        aria-hidden
        className="absolute inset-0 border-b border-border"
        style={{
          opacity: chromeOpacity,
          backdropFilter: chromeBackdrop,
          WebkitBackdropFilter: chromeBackdrop,
          backgroundColor: 'var(--color-bg)',
          boxShadow: chromeShadow,
        }}
      />

      <motion.nav
        aria-label="Navegação principal"
        className="relative mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6"
        style={{ paddingTop: rowPaddingY, paddingBottom: rowPaddingY }}
      >
        <a
          href="#"
          onClick={handleLogoClick}
          className="flex items-center gap-3"
          aria-label="Voltar ao topo, Jonatas Hotts Personal Trainer"
        >
          <span className="h-10 w-10 shrink-0 overflow-hidden rounded-xl shadow-sm ring-1 ring-white/10 sm:h-11 sm:w-11">
            <img src={logo} alt="Jonatas Hotts" className="h-full w-full object-cover" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-base font-bold text-text sm:text-lg">
              Jonatas Hotts
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted sm:text-[11px]">
              Personal Trainer
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-6 lg:flex xl:gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <motion.a
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="relative inline-block py-1 text-sm font-medium text-text"
                initial="rest"
                whileHover="hover"
                animate="rest"
              >
                {link.label}
                <motion.span
                  className="absolute -bottom-0.5 left-0 h-[2px] w-full origin-left rounded-full bg-accent"
                  variants={linkUnderline}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                />
              </motion.a>
            </li>
          ))}
        </ul>

        <motion.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="hidden items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-fg shadow-sm lg:inline-flex"
        >
          <FaWhatsapp className="h-4 w-4" aria-hidden />
          Agendar no WhatsApp
        </motion.a>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={mobileOpen}
          className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-text lg:hidden"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative overflow-hidden border-b border-border bg-bg shadow-md lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 py-3 sm:px-6">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="block rounded-lg px-2 py-2.5 text-sm font-medium text-text"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-fg shadow-sm"
                >
                  <FaWhatsapp className="h-4 w-4" aria-hidden />
                  Agendar no WhatsApp
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
