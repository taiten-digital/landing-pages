import { motion, useReducedMotion } from 'framer-motion';
import Eyebrow from '../components/Eyebrow';
import { entregas } from '../data/projeto';

export default function Entregas() {
  const reduce = useReducedMotion();
  return (
    <section id="entregas" className="relative border-t border-line bg-surface-2 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-14">
          <div>
            <Eyebrow>03 · O que vamos entregar</Eyebrow>
            <h2 className="font-display mt-4 text-4xl font-medium leading-[1.05] sm:text-5xl">Plano 3 · Lançamento Completo.</h2>
            <p className="mt-5 text-lg leading-relaxed text-text-muted">
              A Taiten cuida de toda a parte digital do lançamento. Vocês seguem com o que fazem de melhor, que é o método e o cuidado com cada aluna.
            </p>
            <div className="mt-8 flex items-center gap-4 border-t border-line pt-6">
              <div className="flex">
                {['T', 'I', 'E'].map((l, i) => (
                  <span
                    key={l}
                    className={`-ml-2 grid h-11 w-11 place-items-center rounded-full border-2 border-surface-2 text-sm font-semibold text-white first:ml-0 ${
                      i === 0 ? 'bg-ink' : i === 1 ? 'bg-graphite' : 'bg-accent'
                    }`}
                  >
                    {l}
                  </span>
                ))}
              </div>
              <p className="text-sm leading-snug text-text-muted">
                <span className="font-semibold text-text">Tarik, Ithallo e Enzo</span>
                <br />
                Estratégia, tecnologia e criação, do primeiro acesso ao relatório final.
              </p>
            </div>
          </div>
          <div className="grid items-start gap-x-8 sm:grid-cols-2">
            {entregas.map((e, i) => (
              <motion.div
                key={e.titulo}
                className="border-t border-line py-6"
                animate={reduce ? {} : { y: [0, -4, 0] }}
                transition={{ duration: 5 + i * 0.45, delay: i * 0.35, repeat: reduce ? 0 : Infinity, ease: 'easeInOut' }}
              >
                <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-display mt-2 text-xl font-semibold tracking-[-0.02em]">{e.titulo}</h3>
                <p className="mt-2 leading-relaxed text-text-muted">{e.texto}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
