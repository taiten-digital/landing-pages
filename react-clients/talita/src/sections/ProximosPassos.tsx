import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Eyebrow from '../components/Eyebrow';
import { proximosPassos } from '../data/projeto';

export default function ProximosPassos() {
  return (
    <section id="proximos-passos" className="relative overflow-hidden bg-bg py-16 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgba(30,107,255,0.09), transparent 80%)' }}
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Eyebrow>02 · Próximos passos</Eyebrow>
        <h2 className="font-display mt-4 text-4xl font-medium leading-[1.05] sm:text-5xl">O que vem agora.</h2>
        <p className="mt-4 max-w-2xl text-lg text-text-muted">Quanto antes os acessos e materiais chegarem, mais folga o projeto ganha. Marcamos aqui cada item assim que recebemos.</p>

        <div className="mt-10 grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {proximosPassos.map((p, i) => {
            const escuro = i === 0;
            const total = p.itens?.length ?? 0;
            const feitos = p.itens?.filter((it) => it.feito).length ?? 0;
            return (
              <motion.article
                key={p.numero}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className={`rounded-2xl border p-6 shadow-[0_30px_60px_-45px_rgba(10,10,10,0.35)] ${
                  escuro ? 'border-ink bg-ink text-white' : 'border-line bg-surface'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-display text-5xl font-semibold leading-none tracking-[-0.04em] text-accent">{p.numero}</span>
                  <span
                    className={`rounded-full border px-3 py-1 text-right font-mono text-[10px] uppercase tracking-[0.12em] ${
                      escuro ? 'border-white/20 text-white/65' : 'border-line bg-bg text-text-muted'
                    }`}
                  >
                    {p.quando}
                  </span>
                </div>
                <h3 className="font-display mt-6 text-2xl font-semibold tracking-[-0.025em]">{p.titulo}</h3>
                {p.texto?.map((t) => (
                  <p key={t} className={`mt-3 leading-relaxed ${escuro ? 'text-white/70' : 'text-text-muted'}`}>
                    {t}
                  </p>
                ))}
                {p.itens && (
                  <>
                    <ul className="mt-4 space-y-3">
                      {p.itens.map((it) => (
                        <li key={it.texto} className="flex gap-3 leading-snug">
                          <span
                            className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center ${it.feito ? 'bg-accent' : 'border-2 border-ink'}`}
                            aria-hidden
                          >
                            {it.feito && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                          </span>
                          <span className={it.feito ? 'text-text-muted line-through' : 'text-text'}>{it.texto}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-text-muted">
                      {feitos} de {total} recebidos
                    </p>
                  </>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
