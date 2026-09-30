import { useLayoutEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { img, waLink } from '../lib/site';

const NAV_LINKS = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Barris', href: '#barris' },
  { label: 'Marcas', href: '#marcas' },
  { label: 'Como pedir', href: '#pedido' },
  { label: 'Contato', href: '#contato' },
];

export default function Nav() {
  const barRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  // Publish the bar row height (not the header: the mobile dropdown lives in
  // the header and would shrink the Hero while open). Hero reads --nav-height.
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

  const { scrollY } = useScroll();
  const scrollOpacity = useTransform(scrollY, [0, 80], [0, 1], { clamp: true });
  // Opaque while the menu is open, otherwise the bar is transparent over the
  // opaque dropdown panel at scrollY=0 (visible seam).
  const chromeOpacity = open ? 1 : scrollOpacity;

  const go = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    const target = document.querySelector(href);
    if (!target || !headerRef.current) return;
    const top = target.getBoundingClientRect().top + window.scrollY - (barRef.current?.getBoundingClientRect().height ?? 72) + 1;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50">
      <motion.div
        aria-hidden
        className="absolute inset-0 border-b border-border bg-bg/95"
        style={{ opacity: chromeOpacity }}
      />
      <nav
        ref={barRef}
        aria-label="Navegação principal"
        className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6"
      >
        <a
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            setOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3"
          aria-label="Voltar ao topo, Estação do Chopp Londrina"
        >
          <img src={img('logo')} alt="" aria-hidden className="h-11 w-11 shrink-0 rounded-full object-cover" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-2xl text-text">Estação do Chopp</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-text-muted">Londrina</span>
          </span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={(e) => go(e, l.href)}
                className="group relative inline-block py-1 text-sm font-medium text-text"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-accent transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <motion.a
          href={waLink()}
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="hidden items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-fg lg:inline-flex"
        >
          <FaWhatsapp className="h-4 w-4" aria-hidden />
          Pedir chopp
        </motion.a>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-text lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative overflow-hidden border-b border-border bg-bg lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 py-3 sm:px-6">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={(e) => go(e, l.href)} className="block rounded-lg px-2 py-2.5 text-base font-medium text-text">
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-fg"
                >
                  <FaWhatsapp className="h-4 w-4" aria-hidden />
                  Pedir chopp
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
