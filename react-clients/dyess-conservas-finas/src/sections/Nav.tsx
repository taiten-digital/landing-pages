import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa6'
import { WA_GENERIC } from '../config'

const LINKS = [
  { href: '#sabores', label: 'Sabores' },
  { href: '#combina', label: 'Combina com' },
  { href: '#pedido', label: 'Monte seu pedido' },
  { href: '#artesanal', label: 'Artesanal' },
]

export default function Nav() {
  const barRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Publica a altura real da barra (não do header inteiro, o dropdown mobile fica dentro dele).
  useLayoutEffect(() => {
    const el = barRef.current
    if (!el) return
    const set = () =>
      document.documentElement.style.setProperty('--nav-height', `${el.getBoundingClientRect().height}px`)
    set()
    const ro = new ResizeObserver(set)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const solid = scrolled || menuOpen

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? 'bg-bg/95 backdrop-blur-md border-b border-white/10' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div ref={barRef} className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-8">
        <a href="#inicio" className="flex items-baseline gap-2" aria-label="Dyess Conservas Finas, início">
          <span className="font-script text-4xl leading-none text-paper sm:text-5xl">Dyess</span>
          <span className="hidden text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-muted sm:inline">
            Conservas Finas
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-semibold text-paper/80 transition-colors hover:text-gold"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={WA_GENERIC}
            target="_blank"
            rel="noreferrer"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-wa px-4 py-2.5 text-sm font-extrabold text-[#06301a] transition-transform hover:scale-105 active:scale-95 sm:px-5"
          >
            <FaWhatsapp className="text-lg" aria-hidden />
            <span className="hidden min-[420px]:inline">Pedir no WhatsApp</span>
            <span className="min-[420px]:hidden">Pedir</span>
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-white/15 text-paper lg:hidden"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            key="drawer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden bg-bg lg:hidden"
            aria-label="Menu mobile"
          >
            <div className="flex flex-col px-5 pb-5 pt-1">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-t border-white/10 py-4 text-lg font-semibold text-paper"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
