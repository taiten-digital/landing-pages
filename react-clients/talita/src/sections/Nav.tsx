import { useLayoutEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import TaitenSignature from '../components/TaitenSignature';

const LINKS = [
  { label: 'Acompanhamento', href: '#acompanhamento' },
  { label: 'Cronograma', href: '#cronograma' },
  { label: 'Próximos passos', href: '#proximos-passos' },
  { label: 'Entregas', href: '#entregas' },
  { label: 'Combinados', href: '#combinados' },
];

export default function Nav() {
  const barRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 40));

  // Publica a altura real da barra para o Hero e o scroll-margin das seções.
  useLayoutEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const set = () => document.documentElement.style.setProperty('--nav-height', `${el.getBoundingClientRect().height}px`);
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const go = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    const target = document.querySelector(href);
    if (!target || !barRef.current) return;
    const top = target.getBoundingClientRect().top + window.scrollY - barRef.current.getBoundingClientRect().height;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const solid = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        aria-hidden
        className={`absolute inset-0 border-b transition-all duration-300 ${solid ? 'border-white/10 bg-ink/85 backdrop-blur-xl' : 'border-transparent bg-transparent'}`}
      />
      <div ref={barRef} className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <a href="#inicio" onClick={(e) => go(e, '#inicio')} aria-label="Voltar ao topo" className="cursor-pointer">
          <TaitenSignature tone="light" />
        </a>
        <nav aria-label="Seções" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={(e) => go(e, l.href)} className="cursor-pointer text-sm text-white/70 transition-colors hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <span className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-white/50 xl:block">Projeto Método C40</span>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          className="cursor-pointer rounded-lg p-2 text-white lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Seções"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="relative border-b border-white/10 bg-ink/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="mx-auto max-w-6xl px-4 pb-5 sm:px-6">
              {LINKS.map((l) => (
                <li key={l.href} className="border-t border-white/5">
                  <a href={l.href} onClick={(e) => go(e, l.href)} className="block cursor-pointer py-3.5 text-base text-white/85">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
