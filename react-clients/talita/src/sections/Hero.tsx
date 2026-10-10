import { motion, useReducedMotion } from 'framer-motion';
import logoC40 from '../assets/images/logo-c40.webp';
import { diasParaLancamento } from '../data/datas';

const DATAS = [
  { rotulo: 'Início', valor: '09/10' },
  { rotulo: 'Página no ar', valor: '06/11' },
  { rotulo: 'Tudo aprovado', valor: '18/12' },
  { rotulo: 'Lançamento', valor: 'Jan/27', destaque: true },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const dias = diasParaLancamento();

  return (
    <section id="inicio" className="grain relative isolate overflow-hidden bg-ink text-white" style={{ minHeight: '100svh' }}>
      {/* Uma fonte de luz azul, atrás do logo do C40. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[52rem] w-[52rem] rounded-full blur-3xl lg:-right-20 lg:top-0"
        style={{ background: 'radial-gradient(closest-side, rgba(30,107,255,0.45), rgba(30,107,255,0.12) 55%, transparent 80%)' }}
        animate={reduce ? {} : { opacity: [0.75, 1, 0.75], scale: [1, 1.04, 1] }}
        transition={{ duration: 8, repeat: reduce ? 0 : Infinity, ease: 'easeInOut' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-60 -left-40 h-[36rem] w-[36rem] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgba(224,162,126,0.10), transparent 80%)' }}
      />

      {/* Linha com núcleo nítido e halo, desenhada no carregamento. */}
      <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="halo" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>
        <motion.path
          d="M700 960 C 940 860, 1140 740, 1500 640"
          fill="none" stroke="#1E6BFF" strokeWidth="10" opacity="0.5" filter="url(#halo)"
          initial={{ pathLength: reduce ? 1 : 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.2, ease: 'easeOut', delay: 0.3 }}
        />
        <motion.path
          d="M700 960 C 940 860, 1140 740, 1500 640"
          fill="none" stroke="#8DB3FF" strokeWidth="1.8"
          initial={{ pathLength: reduce ? 1 : 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.2, ease: 'easeOut', delay: 0.3 }}
        />
        <motion.path
          d="M790 980 C 1020 890, 1220 790, 1500 720"
          fill="none" stroke="#1E6BFF" strokeWidth="1.2" opacity="0.5"
          initial={{ pathLength: reduce ? 1 : 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.6, ease: 'easeOut', delay: 0.5 }}
        />
      </svg>

      <div
        className="relative mx-auto flex max-w-6xl flex-col justify-center px-4 pb-14 sm:px-6"
        style={{ minHeight: '100svh', paddingTop: 'calc(var(--nav-height, 4.5rem) + 2rem)' }}
      >
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-6">
          <div className="order-2 lg:order-1">
            <h1 className="font-display text-[2.6rem] font-medium leading-[1] sm:text-6xl lg:text-[4.6rem]">
              Bem-vindas ao <span className="text-accent">lançamento</span> do Método C40.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70 sm:text-xl">
              Esta é a página do projeto de vocês. Aqui fica o caminho até a estreia em janeiro, o que já foi feito e o que vem a seguir, sempre atualizado pela equipe da Taiten.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#acompanhamento"
                className="inline-flex cursor-pointer items-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-fg transition-colors hover:bg-accent-hover"
              >
                Ver o acompanhamento
              </a>
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/55">
                Faltam <span className="text-white">{dias} dias</span> para o lançamento
              </span>
            </div>
          </div>
          <motion.div
            className="order-1 flex justify-center lg:order-2 lg:justify-end"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            <img
              src={logoC40}
              alt="Método C40, corrida inteligente para mulheres 40+"
              width={900}
              height={582}
              className="w-[78%] max-w-[30rem] drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)] sm:w-[60%] lg:w-full"
            />
          </motion.div>
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-white/10 pt-8 sm:grid-cols-4 lg:mt-20">
          {DATAS.map((d) => (
            <div key={d.rotulo}>
              <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">{d.rotulo}</dt>
              <dd className={`font-display mt-2 text-3xl font-semibold sm:text-4xl ${d.destaque ? 'text-accent' : 'text-white'}`}>{d.valor}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
