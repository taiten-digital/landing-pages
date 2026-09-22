import { motion, useReducedMotion } from 'framer-motion';
import retrato from '../assets/images/rafael-kudo-retrato.png';

export default function Sobre() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="sobre" className="relative bg-bg-alt py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:items-center md:gap-16">
        <div className="relative mx-auto w-full max-w-sm md:max-w-none">
          {/* Ambient glow behind the photo card: large blur radius, gradient
              fully transparent well before its own edge, slow opacity pulse. */}
          <motion.div
            aria-hidden="true"
            className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-accent/35 via-accent/5 to-transparent blur-3xl sm:-inset-10"
            animate={reduceMotion ? undefined : { opacity: [0.55, 1, 0.55] }}
            transition={
              reduceMotion ? undefined : { duration: 6, repeat: Infinity, ease: 'easeInOut' }
            }
          />

          {/* Photo card: continuous idle float on the frame, small amplitude,
              own distinct phase/duration (assigned mechanism for this
              section; every sibling uses a different one: Hero = Ken Burns,
              Método = stepper, Números = marquee, Planos = hover/tap,
              Contato = gradient-text). The <img> itself stays in normal
              flow (no absolute inset layer, no forced aspect-ratio box)
              since it's a studio cutout meant to show the whole figure, not
              a crop, this sidesteps the width-collapse gotcha entirely. */}
          <motion.div
            className="relative w-full overflow-hidden rounded-[2rem] border border-accent/15 shadow-2xl shadow-black/50"
            animate={reduceMotion ? undefined : { y: [0, -7, 0], rotate: [-0.6, 0.6, -0.6] }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 5.5, delay: 0.4, repeat: Infinity, ease: 'easeInOut' }
            }
          >
            {/* The portrait is a transparent cutout; the green halo behind the
                torso keeps his black tank top readable against the dark page. */}
            <div
              style={{
                background:
                  'radial-gradient(ellipse 75% 65% at 50% 42%, color-mix(in srgb, var(--color-accent) 55%, transparent) 0%, color-mix(in srgb, var(--color-accent) 16%, transparent) 50%, transparent 78%), linear-gradient(to bottom, #10261A, var(--color-surface))',
              }}
            >
              <img
                src={retrato}
                alt="Rafael Kudo, coach de alta performance, sorrindo em foto de estúdio"
                className="block h-auto w-full"
              />
            </div>
            <div className="bg-primary px-5 py-3 sm:px-6 sm:py-4">
              <p className="font-display text-lg tracking-wide text-text">RAFAEL KUDO</p>
              <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
                Coach de Alta Performance
              </p>
            </div>
          </motion.div>
        </div>

        <div>
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-text-muted">
            Sobre
          </span>
          <h2 className="mt-3 font-display text-4xl text-text sm:text-5xl">
            Quem é o Rafael Kudo
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-text-muted">
            Formado em Educação Física, atualmente cursando Nutrição e com formação avançada em
            Hipnose Clínica, Rafael também atua como psicoterapeuta: uma combinação pouco comum
            para um personal trainer.
          </p>
          <p className="mt-4 leading-relaxed text-text-muted">
            É essa formação multidisciplinar que sustenta o método dele, alinhar{' '}
            <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text font-semibold text-transparent">
              corpo, mente e nutrição
            </span>{' '}
            em um único programa de desenvolvimento, em vez de tratar treino, cabeça e alimentação
            como coisas separadas.
          </p>
          {/* TODO: público-alvo prioritário (emagrecimento vs. alta performance
              geral vs. ambos) é UNKNOWN em client-brief.md — copy abaixo
              mantida propositalmente geral até confirmação do cliente. */}
          <p className="mt-4 leading-relaxed text-text-muted">
            O acompanhamento é pensado para quem quer evoluir de verdade, presencial ou online,
            com um plano estruturado em cima da sua realidade física, mental e nutricional.
          </p>
        </div>
      </div>
    </section>
  );
}
