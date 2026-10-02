import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { FaStar, FaWhatsapp } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import retrato from '../assets/images/flavio-retrato.jpg'; // Real studio portrait of Flávio Ferreira, client-supplied (906x916, opaque)
import { EMPRESA, GOOGLE, NOTA_CREDENCIAIS, QUEM_SOMOS, VALORES, WA_PADRAO, waLink } from '../content';

export default function Sobre() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax: the portrait drifts slower than the page, the frame and halo at their own rates.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 });
  const photoY = useTransform(progress, [0, 1], [-48, 48]);
  const frameY = useTransform(progress, [0, 1], [-90, 90]);
  const haloY = useTransform(progress, [0, 1], [40, -40]);

  // Rotating values line, one word every 2.5s.
  const [valor, setValor] = useState(0);
  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => setValor((v) => (v + 1) % VALORES.length), 2500);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <section id="sobre" ref={sectionRef} className="relative overflow-hidden bg-deep py-16 text-sand sm:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        {/* Portrait column */}
        <div className="flex justify-center lg:justify-start">
          <div className="relative w-[min(100%,300px)] sm:w-[380px] lg:w-[440px] xl:w-[460px]">
            {/* Breathing gold halo: radial gradient fully transparent at 65%, heavy blur */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -inset-12 blur-3xl sm:-inset-16"
              style={{
                y: reduceMotion ? 0 : haloY,
                background:
                  'radial-gradient(circle at 50% 45%, color-mix(in oklab, var(--color-accent) 45%, transparent) 0%, color-mix(in oklab, var(--color-accent) 14%, transparent) 40%, transparent 65%)',
              }}
              animate={reduceMotion ? undefined : { opacity: [0.55, 1, 0.55], scale: [0.96, 1.04, 0.96] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Offset hairline frame, moves faster than the photo for depth */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 translate-x-4 translate-y-4 rounded-2xl border border-deep-line sm:translate-x-6 sm:translate-y-6"
              style={{ y: reduceMotion ? 0 : frameY }}
            />
            <motion.img
              src={retrato}
              alt="Flávio Ferreira, corretor de imóveis"
              width={906}
              height={916}
              loading="lazy"
              className="relative block aspect-[906/916] w-full rounded-2xl object-cover shadow-2xl shadow-black/40"
              style={{ y: reduceMotion ? 0 : photoY }}
            />
          </div>
        </div>

        {/* Text column */}
        <div className="min-w-0">
          <h2 className="font-display text-3xl leading-[1.15] text-sand sm:text-4xl lg:text-5xl">
            Prazer, Flávio Ferreira
          </h2>
          <p className="mt-3 text-sm tracking-wide text-sand-muted">
            {EMPRESA.cargo} · {EMPRESA.creci}
          </p>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-sand/85">
            {QUEM_SOMOS.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          {/* Values: rotating word (the section's one accent focal detail) */}
          <div className="mt-8 border-l border-deep-line pl-5">
            <p className="text-xs uppercase tracking-[0.2em] text-sand-muted">O que guia cada negócio</p>
            {reduceMotion ? (
              <p className="mt-2 font-display text-xl leading-[1.3] text-sand sm:text-2xl">
                {VALORES.join(' · ')}
              </p>
            ) : (
              <>
                <span className="sr-only">{VALORES.join(', ')}</span>
                <div aria-hidden className="relative mt-2 h-[1.4em] font-display text-2xl leading-[1.4] sm:text-3xl">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={valor}
                      className="absolute left-0 top-0 whitespace-nowrap text-accent"
                      initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -14, filter: 'blur(6px)' }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {VALORES[valor]}.
                    </motion.span>
                  </AnimatePresence>
                </div>
                <div aria-hidden className="mt-3 flex gap-1.5">
                  {VALORES.map((v, i) => (
                    <span
                      key={v}
                      className={`h-0.5 rounded-full transition-all duration-500 ${
                        i === valor ? 'w-8 bg-sand' : 'w-3 bg-deep-line'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* The one Google rating on the page: rating line only, no review texts */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <div className="inline-flex items-center gap-3 rounded-full border border-deep-line bg-deep-2 px-4 py-2">
              <FcGoogle className="size-5 shrink-0" aria-hidden />
              <span className="flex gap-0.5 text-star" aria-hidden>
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar key={i} className="size-3.5" />
                ))}
              </span>
              <span className="text-sm text-sand">
                {GOOGLE.nota} no Google · {GOOGLE.total} avaliações
              </span>
            </div>
            <a
              href={waLink(WA_PADRAO)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-sm font-medium text-deep transition-transform hover:scale-[1.03] active:scale-[0.97]"
            >
              <FaWhatsapp className="size-4" aria-hidden />
              Conversar com o Flávio
            </a>
          </div>

          <p className="mt-6 text-xs text-sand-muted">{NOTA_CREDENCIAIS}</p>
        </div>
      </div>
    </section>
  );
}
