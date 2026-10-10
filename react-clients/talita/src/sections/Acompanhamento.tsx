import { motion, useReducedMotion } from 'framer-motion';
import Eyebrow from '../components/Eyebrow';
import { atualizacoes, atualizadoEm, etapas } from '../data/projeto';
import { diasDesdeInicio, diasParaLancamento, etapaAtual, progressoEtapas } from '../data/datas';

export default function Acompanhamento() {
  const reduce = useReducedMotion();
  const atual = etapaAtual();
  const progresso = progressoEtapas();
  const concluidas = etapas.filter((e) => e.status === 'concluida').length;

  return (
    <section id="acompanhamento" className="relative overflow-hidden bg-bg py-16 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgba(30,107,255,0.10), transparent 80%)' }}
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>00 · Acompanhamento</Eyebrow>
            <h2 className="font-display mt-4 text-4xl font-medium leading-[1.05] sm:text-5xl">Onde estamos agora.</h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-text-muted">Atualizado em {atualizadoEm}</p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.35fr_1fr]">
          <div className="relative overflow-hidden rounded-2xl bg-ink p-7 text-white sm:p-9">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full blur-3xl"
              style={{ background: 'radial-gradient(closest-side, rgba(30,107,255,0.45), transparent 80%)' }}
            />
            <div className="relative">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">Etapa atual · {atual.quando}</p>
              <p className="font-display mt-3 text-3xl font-medium sm:text-4xl">
                <span className="text-accent">{atual.numero}</span> {atual.titulo}
              </p>
              <p className="mt-3 max-w-lg leading-relaxed text-white/70">{atual.descricao}</p>

              <div className="mt-8">
                <div className="flex items-baseline justify-between font-mono text-xs uppercase tracking-[0.16em] text-white/55">
                  <span>Caminho até o lançamento</span>
                  <span className="text-white">{progresso}%</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-accent shadow-[0_0_18px_rgba(30,107,255,0.8)]"
                    initial={{ width: reduce ? `${Math.max(progresso, 3)}%` : '0%' }}
                    animate={{ width: `${Math.max(progresso, 3)}%` }}
                    transition={{ duration: 1.4, ease: 'easeOut', delay: 0.2 }}
                  />
                </div>
              </div>

              <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45 sm:text-[11px]">Etapas concluídas</dt>
                  <dd className="font-display mt-1 text-2xl font-semibold sm:text-3xl">{concluidas}/{etapas.length}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45 sm:text-[11px]">Dias de projeto</dt>
                  <dd className="font-display mt-1 text-2xl font-semibold sm:text-3xl">{diasDesdeInicio()}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45 sm:text-[11px]">Até a estreia</dt>
                  <dd className="font-display mt-1 text-2xl font-semibold text-accent sm:text-3xl">{diasParaLancamento()} dias</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-7 sm:p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted">Últimas atualizações</p>
            <ol className="mt-5 space-y-5">
              {atualizacoes.map((a, i) => (
                <li key={a.data + i} className="relative border-l border-line pl-5">
                  <span className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 ${i === 0 ? 'bg-accent' : 'bg-line'}`} />
                  <p className="font-mono text-xs text-text-muted">{a.data}</p>
                  <p className="mt-1 leading-relaxed text-text">{a.texto}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
