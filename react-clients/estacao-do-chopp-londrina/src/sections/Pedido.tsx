import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa6';
import { img, waLink } from '../lib/site';

const STEPS = [
  { t: 'Chame no WhatsApp', d: 'Mande uma mensagem com a data e o tipo de evento.' },
  { t: 'Escolha o chopp', d: 'Defina a marca e o tamanho do barril: 30 ou 50 litros.' },
  { t: 'Combine a entrega', d: 'Entregamos em Londrina. Acerte endereço e horário com a gente.' },
  { t: 'Brinde', d: 'Com o chopp na mão, é só aproveitar o momento.' },
];
const STEP_MS = 4200;

export default function Pedido() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduce || paused || !inView) return;
    const id = window.setTimeout(() => setStep((s) => (s + 1) % STEPS.length), STEP_MS);
    return () => window.clearTimeout(id);
  }, [step, paused, reduce, inView]);

  const fill = ((step + 1) / STEPS.length) * 100;

  return (
    <section id="pedido" ref={sectionRef} className="relative overflow-hidden border-t border-white/5 bg-bg py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-text-muted">Como pedir</p>
          <h2 className="font-display mt-3 text-5xl leading-[1.05] text-text sm:text-6xl">
            Do pedido ao brinde em <span className="text-accent">4 passos</span>
          </h2>

          <ol className="mt-8 space-y-3">
            {STEPS.map((s, i) => {
              const active = i === step;
              return (
                <li key={s.t}>
                  <button
                    type="button"
                    onClick={() => setStep(i)}
                    aria-current={active}
                    className={`relative flex w-full cursor-pointer items-start gap-4 overflow-hidden rounded-2xl border p-4 text-left transition-colors sm:p-5 ${
                      active ? 'border-accent/70 bg-surface-2' : 'border-border bg-surface/50 hover:border-accent/30'
                    }`}
                  >
                    <span
                      className={`font-display grid h-11 w-11 shrink-0 place-items-center rounded-full text-2xl transition-colors ${
                        active ? 'bg-accent text-accent-fg' : 'bg-border text-text-muted'
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="min-w-0">
                      <span className={`font-display block text-2xl sm:text-3xl ${active ? 'text-text' : 'text-text-muted'}`}>{s.t}</span>
                      <span
                        className={`grid transition-[grid-template-rows,opacity] duration-300 ${active ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                      >
                        <span className="block min-h-0 overflow-hidden text-text/80">
                          <span className="block pt-1">{s.d}</span>
                        </span>
                      </span>
                    </span>
                    {active && !reduce && !paused && inView && (
                      <motion.span
                        key={`${step}-bar`}
                        aria-hidden
                        className="absolute bottom-0 left-0 h-[3px] w-full origin-left bg-accent"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: STEP_MS / 1000, ease: 'linear' }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ol>

          <a
            href={waLink()}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-semibold text-accent-fg transition-transform hover:scale-105"
          >
            <FaWhatsapp className="h-5 w-5" aria-hidden />
            Começar meu pedido
          </a>
        </div>

        {/* the mug fills as the steps advance */}
        <div className="relative mx-auto h-[380px] w-full max-w-sm sm:h-[460px]">
          <div aria-hidden className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(244,168,29,0.28),transparent_65%)]" />
          <img src={img('chopp')} alt="" aria-hidden loading="lazy" className="absolute inset-0 m-auto h-full w-auto object-contain opacity-15" />
          <motion.img
            src={img('chopp')}
            alt="Caneca enchendo conforme o pedido avança"
            loading="lazy"
            className="absolute inset-0 m-auto h-full w-auto object-contain"
            initial={false}
            animate={{ clipPath: `inset(${100 - fill}% 0% 0% 0%)` }}
            transition={{ duration: reduce ? 0 : 1.1, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
    </section>
  );
}
