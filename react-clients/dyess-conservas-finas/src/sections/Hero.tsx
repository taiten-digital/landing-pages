import { useCallback, useEffect, useState } from 'react'
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { MapPin } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa6'
import { GiChiliPepper, GiGarlic, GiHerbsBundle, GiPineapple } from 'react-icons/gi'
import { FLAVORS, waLink, type Flavor } from '../config'

const AUTOPLAY_MS = 5500

const DRIFT = [
  { Icon: GiChiliPepper, cls: 'left-[4%] top-[14%] text-7xl', depth: 0.6, dur: 9, rot: 18 },
  { Icon: GiPineapple, cls: 'right-[6%] top-[10%] text-8xl', depth: 1.1, dur: 11, rot: -12 },
  { Icon: GiGarlic, cls: 'left-[8%] bottom-[16%] text-7xl', depth: 0.9, dur: 10, rot: 10 },
  { Icon: GiHerbsBundle, cls: 'right-[10%] bottom-[12%] text-8xl', depth: 0.7, dur: 12, rot: -16 },
  { Icon: GiChiliPepper, cls: 'left-[46%] top-[4%] hidden text-6xl lg:block', depth: 1.3, dur: 8, rot: 24 },
]

function useSpread() {
  const [spread, setSpread] = useState(44)
  useEffect(() => {
    const set = () => setSpread(window.innerWidth < 640 ? 36 : window.innerWidth < 1024 ? 42 : 40)
    set()
    window.addEventListener('resize', set)
    return () => window.removeEventListener('resize', set)
  }, [])
  return spread
}

function Drift({
  Icon,
  cls,
  depth,
  dur,
  rot,
  mx,
  my,
  reduce,
}: (typeof DRIFT)[number] & { mx: MotionValue<number>; my: MotionValue<number>; reduce: boolean | null }) {
  const x = useTransform(mx, (v) => v * 50 * depth)
  const y = useTransform(my, (v) => v * 36 * depth)
  return (
    <motion.div aria-hidden className={`pointer-events-none absolute ${cls}`} style={{ x, y }}>
      <motion.div
        className="text-paper/[0.09]"
        animate={reduce ? undefined : { y: [0, -18, 0], rotate: [rot, rot + 8, rot] }}
        transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Icon />
      </motion.div>
    </motion.div>
  )
}

function Jar({
  flavor,
  offset,
  index,
  spread,
  mx,
  my,
  reduce,
  onSelect,
  onLoaded,
}: {
  flavor: Flavor
  offset: number
  index: number
  spread: number
  mx: MotionValue<number>
  my: MotionValue<number>
  reduce: boolean | null
  onSelect: () => void
  onLoaded: () => void
}) {
  const center = offset === 0
  const depth = center ? 1 : 0.5
  const px = useTransform(mx, (v) => v * -30 * depth)
  const py = useTransform(my, (v) => v * -18 * depth)
  const ry = useTransform(mx, (v) => v * 16 * depth)

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 flex items-end justify-center"
      style={{ zIndex: center ? 20 : 10, transformOrigin: '50% 100%' }}
      initial={false}
      animate={{
        x: `${offset * spread}%`,
        scale: center ? 1 : 0.6,
        rotate: offset * 7,
        opacity: center ? 1 : 0.9,
        filter: center ? 'brightness(1)' : 'brightness(0.55)',
      }}
      transition={{ type: 'spring', stiffness: 130, damping: 20, mass: 0.9 }}
    >
      <motion.div className="h-[88%]" style={{ x: px, y: py, rotateY: ry, transformPerspective: 900 }}>
        <motion.div
          className="relative h-full"
          animate={reduce ? undefined : { y: [0, -12, 0] }}
          transition={{ duration: 5 + index * 0.8, delay: index * 0.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <button
            type="button"
            onClick={onSelect}
            disabled={center}
            aria-label={`Ver ${flavor.name}`}
            className={`pointer-events-auto relative block h-full ${center ? 'cursor-default' : 'cursor-pointer'}`}
            style={{ aspectRatio: flavor.ratio }}
          >
            <img
              src={flavor.image}
              alt={`Pote de ${flavor.name} Artesanal, Dyess Conservas Finas`}
              className="h-full w-full select-none object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)]"
              draggable={false}
              fetchPriority="high"
              onLoad={(e) => e.currentTarget.decode().catch(() => {}).finally(onLoaded)}
              onError={onLoaded}
            />
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

function RotatingBadge({ reduce }: { reduce: boolean | null }) {
  return (
    <motion.div
      aria-hidden
      className="absolute right-0 top-0 z-30 h-24 w-24 sm:h-32 sm:w-32"
      animate={reduce ? undefined : { rotate: 360 }}
      transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
    >
      <svg viewBox="0 0 120 120" className="h-full w-full">
        <defs>
          <path id="dyess-badge" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
        </defs>
        <circle cx="60" cy="60" r="58" fill="#1d100d" stroke="#d9a441" strokeOpacity="0.5" />
        <text fill="#f3e7d3" fontSize="10.5" fontWeight="700" letterSpacing="3.2" fontFamily="Manrope, sans-serif">
          <textPath href="#dyess-badge">ARTESANAL · PREMIUM · LONDRINA · PR ·</textPath>
        </text>
        <circle cx="60" cy="60" r="6" fill="#d9a441" />
      </svg>
    </motion.div>
  )
}

export default function Hero() {
  const reduce = useReducedMotion()
  const spread = useSpread()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [loaded, setLoaded] = useState(0)
  const [ready, setReady] = useState(false)

  const mxRaw = useMotionValue(0)
  const myRaw = useMotionValue(0)
  const mx = useSpring(mxRaw, { stiffness: 70, damping: 16 })
  const my = useSpring(myRaw, { stiffness: 70, damping: 16 })

  const onLoaded = useCallback(() => setLoaded((n) => n + 1), [])
  useEffect(() => {
    if (loaded >= FLAVORS.length) setReady(true)
  }, [loaded])
  // Fallback: nunca deixar o palco escondido se alguma imagem demorar ou falhar.
  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 2500)
    return () => window.clearTimeout(t)
  }, [])

  useEffect(() => {
    if (reduce || paused) return
    const t = window.setTimeout(() => setActive((a) => (a + 1) % FLAVORS.length), AUTOPLAY_MS)
    return () => window.clearTimeout(t)
  }, [active, paused, reduce])

  const choose = (i: number) => {
    setActive(i)
    setPaused(true)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return
    mxRaw.set(e.clientX / window.innerWidth - 0.5)
    myRaw.set(e.clientY / window.innerHeight - 0.5)
  }
  const onPointerLeave = () => {
    animate(mxRaw, 0, { duration: 0.6 })
    animate(myRaw, 0, { duration: 0.6 })
  }

  const current = FLAVORS[active]
  const offsetOf = (i: number) => ((i - active + 4) % 3) - 1

  const outlineX = useTransform(mx, (v) => v * 40)

  return (
    <section
      id="inicio"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative isolate box-border overflow-hidden pt-[var(--nav-height,4.5rem)] min-h-[100vh] min-h-[100svh]"
    >
      {/* Glow por sabor: um por sabor, em crossfade (gradiente chega a transparente antes da borda). */}
      {FLAVORS.map((f, i) => (
        <motion.div
          key={f.id}
          aria-hidden
          className="pointer-events-none absolute -z-10 h-[120vmax] w-[120vmax] rounded-full lg:-right-[35vmax] lg:top-[-25vmax]"
          style={{
            background: `radial-gradient(closest-side, ${f.glow}55 0%, ${f.glow}22 40%, transparent 100%)`,
          }}
          initial={false}
          animate={{ opacity: active === i ? 1 : 0 }}
          transition={{ duration: 0.9 }}
        />
      ))}

      {DRIFT.map((d, i) => (
        <Drift key={i} {...d} mx={mx} my={my} reduce={reduce} />
      ))}

      <div className="mx-auto grid min-h-[calc(100svh-var(--nav-height,4.5rem))] max-w-7xl content-center gap-x-6 gap-y-3 px-5 pb-6 pt-3 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:gap-y-0 lg:pb-10 lg:pt-6">
        {/* A: título */}
        <div className="relative z-10 lg:col-start-1 lg:row-start-1 lg:self-end">
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[2rem] font-black leading-[1.08] tracking-tight text-paper sm:text-6xl lg:text-[4.4rem]"
          >
            Sabor que{' '}
            <span className="bg-gradient-to-r from-gold via-[#f2a31b] to-accent bg-clip-text pl-[0.04em] pr-[0.2em] -mr-[0.2em] italic text-transparent">
              transforma
            </span>{' '}
            momentos.
          </motion.h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 max-w-md text-base leading-relaxed text-muted [@media(max-height:740px)]:hidden sm:mt-5 sm:text-lg lg:[@media(max-height:740px)]:block"
          >
            Conservas artesanais premium, direto de Londrina. Escolha seu sabor e faça o pedido pelo WhatsApp.
          </motion.p>
        </div>

        {/* B: palco dos potes */}
        <div className="relative lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <motion.div
            className="relative mx-auto h-[33svh] min-h-[210px] w-full max-w-[560px] lg:h-[min(72vh,640px)] lg:max-w-none"
            initial={reduce ? false : { opacity: 0, y: 70, scale: 0.94 }}
            animate={ready || reduce ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 70, scale: 0.94 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => setPaused(false)}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            dragSnapToOrigin
            style={{ touchAction: 'pan-y' }}
            onDragEnd={(_, info) => {
              if (info.offset.x < -40) choose((active + 1) % FLAVORS.length)
              else if (info.offset.x > 40) choose((active + FLAVORS.length - 1) % FLAVORS.length)
            }}
          >
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-[2%] z-0 select-none text-center font-display text-[30vw] font-black uppercase leading-none tracking-tighter text-transparent sm:text-[17rem] lg:text-[10rem] xl:text-[12rem]"
              style={{ x: outlineX, WebkitTextStroke: '1.5px rgba(243,231,211,0.14)' }}
            >
              Dyess
            </motion.div>
            <RotatingBadge reduce={reduce} />
            {FLAVORS.map((f, i) => (
              <Jar
                key={f.id}
                flavor={f}
                offset={offsetOf(i)}
                index={i}
                spread={spread}
                mx={mx}
                my={my}
                reduce={reduce}
                onSelect={() => choose(i)}
                onLoaded={onLoaded}
              />
            ))}
          </motion.div>
        </div>

        {/* C: seletor de sabor + CTA */}
        <div className="relative z-10 lg:col-start-1 lg:row-start-2 lg:mt-8 lg:self-start">
          <div className="grid grid-cols-3 gap-2 lg:max-w-lg" role="tablist" aria-label="Escolha um sabor">
            {FLAVORS.map((f, i) => {
              const on = i === active
              return (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => choose(i)}
                  className={`relative cursor-pointer overflow-hidden rounded-2xl border px-2 py-2.5 text-center text-[0.8rem] font-bold leading-tight transition-colors sm:text-sm ${
                    on ? 'border-paper bg-paper text-ink' : 'border-white/15 bg-white/5 text-paper hover:border-white/40'
                  }`}
                >
                  {f.id === 'saladinha' ? 'Saladinha' : f.id === 'abacaxi' ? 'Abacaxi' : 'Chimichurri'}
                  {on && !paused && !reduce && (
                    <motion.span
                      key={`bar-${active}`}
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-accent"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 sm:mt-5">
            <motion.a
              href={waLink(`Olá, Dyess! Quero pedir ${current.name} Artesanal.`)}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-wa px-6 py-3.5 text-base font-extrabold text-[#06301a] shadow-[0_10px_40px_-8px_rgba(37,211,102,0.65)] sm:px-8 sm:py-4 sm:text-lg"
            >
              <FaWhatsapp className="text-2xl" aria-hidden />
              Pedir pelo WhatsApp
            </motion.a>
            <a
              href="#sabores"
              className="cursor-pointer text-sm font-bold text-paper underline decoration-gold decoration-2 underline-offset-[6px] hover:text-gold"
            >
              Ver os sabores
            </a>
          </div>
          <p className="mt-3 hidden items-center gap-1.5 text-xs font-semibold text-muted sm:flex">
            <MapPin size={14} aria-hidden /> Londrina, PR · Pedidos direto no WhatsApp
          </p>
        </div>
      </div>
    </section>
  )
}
