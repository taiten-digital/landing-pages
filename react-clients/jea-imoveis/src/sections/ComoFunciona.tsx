import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { PASSOS, WA_PADRAO, waLink } from '../content';

// TODO: the 5-step flow in PASSOS is an assumed, generic imobiliaria flow (client-brief: UNKNOWN).
// Confirm it with José Eduardo before publishing. No durations, fees or guarantees are stated on purpose.

type Metrics = { centers: number[]; height: number };

export default function ComoFunciona() {
  const reduceMotion = useReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const metrics = useRef<Metrics>({ centers: [], height: 0 });
  const [line, setLine] = useState({ top: 0, height: 0 });
  const [lit, setLit] = useState(0);

  // Scroll progress of the list itself: the fill tip sits at 60% of the viewport height.
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 60%', 'end 60%'],
  });
  const tip = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.0005 });

  const litFor = (p: number) => {
    const { centers, height } = metrics.current;
    const px = p * height;
    return centers.filter((c) => c <= px).length;
  };

  const scaleY = useTransform(tip, (p) => {
    const { centers, height } = metrics.current;
    if (centers.length < 2) return 0;
    const first = centers[0];
    const span = centers[centers.length - 1] - first;
    if (span <= 0) return 0;
    return Math.min(1, Math.max(0, (p * height - first) / span));
  });

  useMotionValueEvent(tip, 'change', (p) => {
    const next = litFor(p);
    setLit((prev) => (prev === next ? prev : next));
  });

  const measure = useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    const listRect = list.getBoundingClientRect();
    const centers = nodeRefs.current.map((el) => {
      if (!el) return 0;
      const r = el.getBoundingClientRect();
      return r.top - listRect.top + r.height / 2;
    });
    metrics.current = { centers, height: listRect.height };
    if (centers.length > 1) {
      setLine({ top: centers[0], height: centers[centers.length - 1] - centers[0] });
    }
    tip.jump(scrollYProgress.get());
    setLit(litFor(scrollYProgress.get()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tip, scrollYProgress]);

  useLayoutEffect(() => {
    measure();
    const list = listRef.current;
    window.addEventListener('resize', measure);
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (list && ro) ro.observe(list);
    return () => {
      window.removeEventListener('resize', measure);
      ro?.disconnect();
    };
  }, [measure]);

  const litCount = reduceMotion ? PASSOS.length : lit;
  const activeIndex = Math.min(PASSOS.length - 1, Math.max(0, litCount - 1));

  return (
    <section id="como-funciona" className="bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-medium leading-[1.12] text-ink sm:text-4xl lg:text-5xl">
            Do primeiro &lsquo;oi&rsquo; às <span className="text-accent-ink">chaves</span>
          </h2>
          <p className="mt-4 text-base text-ink-muted sm:text-lg">
            Cinco passos simples, da primeira mensagem à entrega do imóvel.
          </p>
        </div>

        <div className="relative mx-auto mt-12 max-w-4xl sm:mt-14">
          {/* Track + scroll-linked fill */}
          <div
            aria-hidden="true"
            className="absolute left-6 w-0.5 -translate-x-1/2 bg-line md:left-1/2"
            style={{ top: line.top, height: line.height }}
          >
            <motion.div
              className="absolute inset-0 origin-top bg-accent-ink will-change-transform"
              style={{ scaleY: reduceMotion ? 1 : scaleY }}
            />
          </div>

          <ol ref={listRef} className="relative grid gap-6 sm:gap-8">
            {PASSOS.map((passo, i) => {
              const isLit = i < litCount;
              const isActive = i === activeIndex;
              const leftOnDesktop = i % 2 === 1;
              return (
                <li
                  key={passo.n}
                  className="grid grid-cols-[3rem_1fr] items-start gap-x-4 md:grid-cols-[1fr_3.5rem_1fr] md:gap-x-8"
                >
                  <div
                    ref={(el) => {
                      nodeRefs.current[i] = el;
                    }}
                    className="relative col-start-1 row-start-1 h-12 w-12 md:col-start-2 md:h-14 md:w-14"
                  >
                    {isActive && !reduceMotion && (
                      <motion.span
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full border-2 border-accent-ink"
                        initial={{ scale: 1, opacity: 0.55 }}
                        animate={{ scale: [1, 1.55], opacity: [0.55, 0] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                      />
                    )}
                    <div
                      className={`relative flex h-full w-full items-center justify-center rounded-full border-2 font-display text-lg transition-colors duration-500 md:text-xl ${
                        isLit
                          ? 'border-deep bg-deep text-sand'
                          : 'border-line bg-card text-ink-muted'
                      }`}
                    >
                      {passo.n}
                    </div>
                  </div>

                  <div
                    className={`col-start-2 row-start-1 rounded-2xl border bg-card p-5 transition-colors duration-500 sm:p-6 ${
                      leftOnDesktop ? 'md:col-start-1' : 'md:col-start-3'
                    } ${isLit ? 'border-accent-ink/40' : 'border-line'}`}
                  >
                    <h3 className="font-display text-xl font-medium leading-[1.2] text-ink sm:text-2xl">
                      {passo.titulo}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted sm:text-base">
                      {passo.texto}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-12 flex justify-center sm:mt-14">
          <motion.a
            href={waLink(WA_PADRAO)}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={reduceMotion ? undefined : { scale: 1.03 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            className="inline-flex items-center gap-2.5 rounded-full bg-deep px-7 py-3.5 text-base font-semibold text-sand transition-colors duration-300 hover:bg-accent-ink"
          >
            <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
            Começar a conversa
          </motion.a>
        </div>
      </div>
    </section>
  );
}
