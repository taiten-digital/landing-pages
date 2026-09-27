import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, Lock, ShieldCheck } from 'lucide-react';
import { CHECKOUT_URL, OFERTA } from '../content';

const INCLUSO = [
  'Aulas em vídeo sobre corrida: técnica, ritmo e progressão',
  'Treinos de força pensados para mulheres 40+',
  'Conteúdos de saúde e longevidade',
  'Dicas práticas da Talita para o dia a dia',
  `Garantia de ${OFERTA.garantiaDias} dias`,
];

// Seal ring geometry: text is laid out on this circle via <textPath>
// (text layout, not a drawn icon). textLength spreads it evenly around.
const SEAL_R = 46;
// Non-breaking spaces: SVG collapses the trailing space, gluing "·" to the next "7" at the seam.
const SEAL_TEXT = `${OFERTA.garantiaDias} dias de garantia · `.repeat(2).toUpperCase();

function GuaranteeSeal({ reduce }: { reduce: boolean | null }) {
  return (
    <div className="relative size-28 shrink-0 sm:size-32">
      <div aria-hidden className="absolute inset-3 rounded-full bg-blush/15 blur-xl" />
      <motion.div
        aria-hidden
        className="absolute inset-0"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 120 120" className="size-full text-cream/75">
          <defs>
            <path
              id="oferta-seal-ring"
              d={`M60,60 m-${SEAL_R},0 a${SEAL_R},${SEAL_R} 0 1,1 ${SEAL_R * 2},0 a${SEAL_R},${SEAL_R} 0 1,1 -${SEAL_R * 2},0`}
            />
          </defs>
          <circle cx="60" cy="60" r="57" fill="none" stroke="currentColor" strokeOpacity="0.2" />
          <circle cx="60" cy="60" r="35" fill="none" stroke="currentColor" strokeOpacity="0.2" />
          <text fill="currentColor" fontSize="9.5" fontWeight="700" className="font-sans">
            <textPath
              href="#oferta-seal-ring"
              textLength={2 * Math.PI * SEAL_R - 2}
              lengthAdjust="spacing"
            >
              {SEAL_TEXT}
            </textPath>
          </text>
        </svg>
      </motion.div>
      <div className="absolute inset-0 grid place-items-center">
        <ShieldCheck aria-hidden className="size-9 text-blush sm:size-10" strokeWidth={1.6} />
      </div>
    </div>
  );
}

export default function Oferta() {
  const reduce = useReducedMotion();

  return (
    <section id="oferta" className="relative overflow-hidden bg-deep py-16 text-cream sm:py-20">
      {/* ambient blush glow behind the price card */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/2 size-[36rem] -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--color-blush) 22%, transparent) 0%, transparent 65%)' }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-x-16 lg:gap-y-10">
        {/* Heading (mobile: first) */}
        <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cream/60">Investimento</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.1] text-cream sm:text-5xl lg:text-6xl">
            Comece o seu <em className="text-blush">novo ciclo</em> hoje.
          </h2>
        </div>

        {/* Price card (mobile: right after the heading) */}
        <div className="relative w-full max-w-md justify-self-center lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:max-w-none lg:self-center">
          <div aria-hidden className="absolute -inset-4 rounded-[2.5rem] bg-blush/10 blur-3xl" />

          <div className="relative overflow-hidden rounded-3xl bg-white/10 p-[2px]">
            {/* Oversized conic layer rotating behind the inset card = moving border */}
            <motion.div
              aria-hidden
              className="absolute left-1/2 top-1/2 aspect-square w-[260%]"
              style={{
                x: '-50%',
                y: '-50%',
                background:
                  'conic-gradient(from 0deg, var(--color-accent), var(--color-blush) 18%, transparent 34%, transparent 62%, var(--color-accent))',
              }}
              animate={reduce ? undefined : { rotate: 360 }}
              transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
            />

            <div className="relative rounded-[22px] bg-deep-2 px-6 py-8 sm:px-10 sm:py-10">
              <span className="inline-flex rounded-full border border-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cream/60">
                Curso online
              </span>

              <h3 className="mt-5 font-display text-4xl leading-[1.1] text-cream sm:text-5xl">{OFERTA.produto}</h3>
              <p className="mt-1 text-sm text-cream/60">com Talita Lopes</p>

              <div className="mt-8 border-t border-white/10 pt-8">
                <p className="bg-gradient-to-b from-cream to-blush bg-clip-text pb-2 font-display text-7xl leading-[1.1] text-transparent sm:text-8xl">
                  {OFERTA.preco}
                </p>
                <p className="mt-2 text-base text-cream/80">{OFERTA.parcelamento}</p>
                <p className="mt-1 text-sm text-cream/60">{OFERTA.modelo}</p>
              </div>

              {/* TODO: PROOF NEEDED, CHECKOUT_URL placeholder até a plataforma existir */}
              <div className="relative mt-8">
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-full bg-accent blur-xl"
                  initial={{ opacity: 0.35 }}
                  animate={reduce ? undefined : { opacity: [0.25, 0.7, 0.25], scale: [0.94, 1.05, 0.94] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.a
                  href={CHECKOUT_URL}
                  whileHover={reduce ? undefined : { scale: 1.02 }}
                  whileTap={reduce ? undefined : { scale: 0.98 }}
                  className="group relative flex w-full items-center justify-center gap-2 rounded-full bg-accent px-8 py-5 text-lg font-bold text-accent-fg transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blush"
                >
                  Quero meu acesso
                  <ArrowRight aria-hidden className="size-5 transition-transform group-hover:translate-x-1" />
                </motion.a>
              </div>

              <p className="mt-5 flex items-center justify-center gap-2 text-center text-sm text-cream/60">
                <Lock aria-hidden className="size-4 shrink-0" />
                Pagamento seguro. Acesso liberado após a confirmação.
              </p>
            </div>
          </div>
        </div>

        {/* What's included + guarantee (mobile: after the card) */}
        <div className="lg:col-start-1 lg:row-start-2 lg:self-start">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cream/60">O que está incluso</p>
          <ul className="mt-5 space-y-4">
            {INCLUSO.map((item) => (
              <li key={item} className="flex items-start gap-3 text-base text-cream/85 sm:text-lg">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-blush/15 text-blush">
                  <Check aria-hidden className="size-4" strokeWidth={2.5} />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col items-start gap-5 rounded-3xl bg-deep-2 p-6 sm:flex-row sm:items-center sm:p-7">
            <GuaranteeSeal reduce={reduce} />
            <div>
              <h3 className="font-display text-2xl leading-[1.1] text-cream sm:text-3xl">
                {OFERTA.garantiaDias} dias de garantia
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/70 sm:text-base">
                Se nos primeiros {OFERTA.garantiaDias} dias você sentir que o {OFERTA.produto} não é para você,
                devolvemos 100% do valor. Sem perguntas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
