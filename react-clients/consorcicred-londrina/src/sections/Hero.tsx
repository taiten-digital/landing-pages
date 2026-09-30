import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FaCar, FaMotorcycle, FaTruck, FaHouse, FaPlane, FaSailboat } from 'react-icons/fa6';
import type { IconType } from 'react-icons';
import { CONTATO, waLink } from '../content';

// Literal icons (Font Awesome 6 via react-icons) for the bens in BENS (content.ts).
// Only bens the client actually lists are used. Word is what the rotating H1 line shows.
const SONHOS: { id: string; word: string; nome: string; Icon: IconType }[] = [
  { id: 'carro', word: 'Carro', nome: 'Carro', Icon: FaCar },
  { id: 'imovel', word: 'Imóvel', nome: 'Imóvel', Icon: FaHouse },
  { id: 'moto', word: 'Moto', nome: 'Moto', Icon: FaMotorcycle },
  { id: 'viagem', word: 'Viagem', nome: 'Viagem', Icon: FaPlane },
  { id: 'caminhao', word: 'Caminhão', nome: 'Caminhão', Icon: FaTruck },
  { id: 'barco', word: 'Barco', nome: 'Barco', Icon: FaSailboat },
];

const N = SONHOS.length;
const INTERVAL_MS = 2600;
const SPRING = { type: 'spring' as const, stiffness: 170, damping: 22 };

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const t = setInterval(() => setActive((a) => (a + 1) % N), INTERVAL_MS);
    return () => clearInterval(t);
  }, [reduceMotion]);

  // Position of card i relative to the front card: 0 = front, then fanned behind.
  const cardState = (i: number) => {
    const off = (i - active + N) % N;
    if (reduceMotion) {
      return off === 0
        ? { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }
        : { x: 0, y: 0, rotate: 0, scale: 0.9, opacity: 0 };
    }
    if (off === 0) return { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 };
    if (off <= 3) {
      return {
        x: off * 26,
        y: -off * 18,
        rotate: off * 4.5,
        scale: 1 - off * 0.05,
        opacity: 1 - off * 0.2,
      };
    }
    // Waiting / just-passed cards tuck away behind the stack.
    return { x: 20, y: -36, rotate: -6, scale: 0.85, opacity: 0 };
  };

  const current = SONHOS[active];

  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-bg scroll-mt-[var(--nav-height,4.5rem)] min-h-[100vh] min-h-[calc(100vh-var(--nav-height,4.5rem))] min-h-[100svh] min-h-[calc(100svh-var(--nav-height,4.5rem))] pt-[calc(var(--nav-height,4.5rem)+1.25rem)] pb-10 sm:pb-16 lg:pt-[calc(var(--nav-height,4.5rem)+2rem)] flex items-center"
    >
      {/* Ambient red glow: large blur, gradient fully transparent well before its edge */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full blur-3xl sm:-right-16 sm:h-[42rem] sm:w-[42rem]"
        style={{
          background:
            'radial-gradient(circle at center, rgb(183 48 55 / 0.28) 0%, rgb(183 48 55 / 0.12) 35%, transparent 65%)',
        }}
        animate={reduceMotion ? undefined : { opacity: [0.65, 1, 0.65], scale: [1, 1.06, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
        {/* Left: text, left aligned and stacked */}
        <div className="min-w-0">
          <h1 className="font-display text-[2.25rem] font-bold leading-[1.1] text-text lg:text-6xl">
            Qual é o seu sonho?
            <span className="relative mt-1 block h-[1.25em] overflow-hidden text-accent" aria-label={current.word}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={current.id}
                  className="block"
                  initial={reduceMotion ? false : { y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  exit={reduceMotion ? { opacity: 0 } : { y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                >
                  {current.word}.
                </motion.span>
              </AnimatePresence>
            </span>
            Nós temos um plano para você.
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-text-muted sm:mt-6 sm:text-lg">
            Consórcios novos e contemplados, financiamentos e empréstimos, em Londrina. Representante autorizado de BB
            Consórcios, Acerte e BV Financeira.
            {/* TODO: "representante autorizado" is the client's own claim, confirm authorization (design-brief Open Questions) */}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
            <motion.a
              href={waLink('Olá! Vim pelo site da ConsorciCred e quero saber qual plano serve para mim.')}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={reduceMotion ? undefined : { scale: 1.03 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              className="inline-flex cursor-pointer items-center justify-center rounded-full bg-whatsapp px-7 py-3.5 text-base font-semibold text-deep shadow-lg shadow-whatsapp/25"
            >
              Falar no WhatsApp
            </motion.a>
            <motion.a
              href="#solucoes"
              whileHover={reduceMotion ? undefined : { scale: 1.03 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              className="inline-flex cursor-pointer items-center justify-center rounded-full border border-line bg-surface/70 px-7 py-3.5 text-base font-semibold text-text transition-colors hover:border-navy hover:bg-surface"
            >
              Ver soluções
            </motion.a>
          </div>

          <p className="mt-5 text-sm text-text-muted">
            {CONTATO.enderecoLinha1.replace(', Sala 1403', '')}, Centro, Londrina
          </p>
        </div>

        {/* Right: stack of dream cards, front card matches the rotating word */}
        <div className="flex justify-center lg:justify-end" aria-hidden>
          <div className="relative h-52 w-60 sm:h-64 sm:w-72 lg:mr-10 lg:h-80 lg:w-80">
            {SONHOS.map((s, i) => {
              const off = (i - active + N) % N;
              const front = off === 0;
              return (
                <motion.div
                  key={s.id}
                  className={`absolute inset-0 flex flex-col justify-between rounded-3xl border p-5 shadow-xl shadow-navy/10 sm:p-6 ${
                    front ? 'border-line bg-surface' : 'border-line bg-surface-2'
                  }`}
                  style={{ zIndex: N - off, transformOrigin: 'bottom left' }}
                  initial={false}
                  animate={cardState(i)}
                  transition={SPRING}
                >
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl sm:h-20 sm:w-20 ${
                      front ? 'bg-deep text-on-deep' : 'bg-navy/80 text-on-deep'
                    }`}
                  >
                    <s.Icon size={48} />
                  </div>
                  <div>
                    <div className="font-display text-2xl font-bold text-text sm:text-3xl">{s.nome}</div>
                    <div className="mt-1 text-sm text-text-muted">Consórcio ou financiamento</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
