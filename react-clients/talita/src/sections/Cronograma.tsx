import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import Eyebrow from '../components/Eyebrow';
import { etapas, recesso } from '../data/projeto';
import type { Status } from '../data/projeto';

const ROTULO: Record<Status, string> = { concluida: 'Concluída', andamento: 'Em andamento', proxima: 'Próxima' };

export default function Cronograma() {
  const reduce = useReducedMotion();
  // A linha acende até a etapa em andamento (ou a última concluída).
  const idxAtual = Math.max(
    etapas.findIndex((e) => e.status === 'andamento'),
    etapas.map((e) => e.status).lastIndexOf('concluida'),
  );
  const fill = idxAtual < 0 ? 0 : ((idxAtual + 0.5) / etapas.length) * 100;

  return (
    <section id="cronograma" className="grain relative isolate overflow-hidden bg-ink py-16 text-white sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/3 -top-60 h-[46rem] w-[46rem] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgba(30,107,255,0.28), transparent 80%)' }}
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Eyebrow>01 · Cronograma</Eyebrow>
        <h2 className="font-display mt-4 text-4xl font-medium leading-[1.05] sm:text-5xl">Do primeiro acesso à estreia.</h2>
        <p className="mt-4 max-w-2xl text-lg text-white/65">Tudo pronto e aprovado antes do Natal, para janeiro começar com a campanha no ar.</p>

        <ol className="relative mt-12">
          <div aria-hidden className="absolute bottom-3 left-[7px] top-3 w-px bg-white/10 sm:left-[151px]" />
          <motion.div
            aria-hidden
            className="absolute left-[7px] top-3 w-px bg-accent shadow-[0_0_14px_rgba(30,107,255,0.9)] sm:left-[151px]"
            initial={{ height: reduce ? `${fill}%` : '0%' }}
            whileInView={{ height: `${fill}%` }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
          />
          {etapas.map((e, i) => (
            <li key={e.numero}>
              {i === 5 && (
                <div className="relative grid grid-cols-[16px_1fr] gap-x-5 py-3 sm:grid-cols-[128px_16px_1fr] sm:gap-x-4">
                  <p className="hidden pt-0.5 text-right font-mono text-sm text-white/40 sm:block">{recesso.quando}</p>
                  <span className="relative z-10 mt-1.5 h-3 w-3 justify-self-center border border-dashed border-white/40 bg-ink" />
                  <p className="rounded-xl border border-dashed border-white/15 px-5 py-3 text-sm text-white/55">
                    <span className="font-mono text-white/70 sm:hidden">{recesso.quando} · </span>
                    {recesso.texto}
                  </p>
                </div>
              )}
              <div className="relative grid grid-cols-[16px_1fr] gap-x-5 py-3 sm:grid-cols-[128px_16px_1fr] sm:gap-x-4">
                <div className="hidden text-right sm:block">
                  <p className={`font-mono text-base font-medium ${e.status === 'andamento' || e.numero === '07' ? 'text-accent' : 'text-white'}`}>{e.quando}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">{e.mes}</p>
                </div>
                <span
                  className={`relative z-10 mt-1.5 grid h-4 w-4 place-items-center justify-self-center ${
                    e.status === 'concluida'
                      ? 'bg-accent'
                      : e.status === 'andamento'
                        ? 'bg-accent shadow-[0_0_0_5px_rgba(30,107,255,0.25),0_0_24px_rgba(30,107,255,0.9)]'
                        : 'border-2 border-white/35 bg-ink'
                  }`}
                >
                  {e.status === 'concluida' && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                </span>
                <div
                  className={`rounded-xl border px-5 py-4 sm:px-6 ${
                    e.numero === '07'
                      ? 'border-accent/50 bg-accent/10'
                      : e.status === 'andamento'
                        ? 'border-accent/40 bg-white/[0.04]'
                        : 'border-white/10 bg-white/[0.02]'
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-mono text-xs text-accent">{e.numero}</span>
                    <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">{e.titulo}</h3>
                    <span
                      className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] ${
                        e.status === 'andamento'
                          ? 'bg-accent text-white'
                          : e.status === 'concluida'
                            ? 'bg-white/15 text-white'
                            : 'border border-white/15 text-white/50'
                      }`}
                    >
                      {ROTULO[e.status]}
                    </span>
                  </div>
                  <p className="mt-1 font-mono text-xs text-white/60 sm:hidden">{e.quando}</p>
                  <p className="mt-2 leading-relaxed text-white/65">{e.descricao}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
