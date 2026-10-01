import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import logo from '../assets/images/logo-baldon-icon.png';
import { waLink } from '../content';

const NAV_LINKS = [
  { label: 'Início', href: '#inicio' },
  { label: 'Proteção', href: '#protecao' },
  { label: 'Seguros', href: '#seguros' },
  { label: 'Avaliações', href: '#avaliacoes' },
  { label: 'Contato', href: '#contato' },
];

const CTA_LABEL = 'Falar no WhatsApp';
const CTA_HREF = waLink('Olá! Vim pelo site e quero falar sobre seguros.');

export default function Nav() {
  const barRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  // Publish the bar row height (not the header, so the open dropdown never
  // shrinks the Hero) for Hero's pt-[var(--nav-height)].
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

  const solid = scrolled || menuOpen;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        aria-hidden
        className="absolute inset-0 border-b border-line bg-deep/90 backdrop-blur-md"
        initial={false}
        animate={{ opacity: solid ? 1 : 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.3, ease: 'easeOut' }}
      />

      <nav
        ref={barRef}
        aria-label="Navegação principal"
        className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6"
      >
        <a
          href="#inicio"
          onClick={() => setMenuOpen(false)}
          className="flex shrink-0 items-center gap-3"
          aria-label="Voltar ao topo, Baldon Corretora de Seguros"
        >
          <img
            src={logo}
            alt="Baldon Corretora de Seguros"
            className="h-9 w-auto shrink-0 sm:h-10"
          />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-lg font-semibold text-text sm:text-xl">Baldon</span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted sm:text-[11px]">
              Corretora de Seguros
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-6 lg:flex xl:gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <motion.a
                href={link.href}
                className="relative inline-block py-1 text-sm font-medium text-text"
                initial="rest"
                whileHover="hover"
                animate="rest"
              >
                {link.label}
                <motion.span
                  aria-hidden
                  className="absolute -bottom-0.5 left-0 h-[2px] w-full origin-left rounded-full bg-accent"
                  variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                />
              </motion.a>
            </li>
          ))}
        </ul>

        <motion.a
          href={CTA_HREF}
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="hidden items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-sm font-semibold text-deep shadow-sm lg:inline-flex"
        >
          <FaWhatsapp className="h-4 w-4" aria-hidden />
          {CTA_LABEL}
        </motion.a>

        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-text lg:hidden"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.25, ease: 'easeOut' }}
            className="relative border-b border-line bg-deep/95 backdrop-blur-md lg:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-lg px-2 py-2.5 text-base font-medium text-text"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2 pb-1">
                <a
                  href={CTA_HREF}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3 text-sm font-semibold text-deep shadow-sm"
                >
                  <FaWhatsapp className="h-4 w-4" aria-hidden />
                  {CTA_LABEL}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
