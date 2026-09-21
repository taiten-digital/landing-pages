import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import backWorkout from '../assets/images/back-workout.png';

const WHATSAPP_HREF =
  'https://api.whatsapp.com/send?phone=5543991167030&text=Ol%C3%A1%2C%20Fabiana%21%20Quero%20come%C3%A7ar%20meu%20acompanhamento.';

export default function Sobre() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-32, 32]);

  return (
    <section id="sobre" ref={sectionRef} className="relative bg-bg py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:items-center">
        <div className="mx-auto w-full max-w-sm md:max-w-none">
          {/* Organic blob mask instead of a straight rectangle, per client
              request to break from the boxy card-grid look shared with
              other clients. Border-radius itself slowly morphs between two
              blob shapes so it reads as alive, not a static cutout. */}
          <motion.div
            className="relative aspect-[3/4] w-full overflow-hidden border border-border"
            initial={{ borderRadius: '63% 37% 54% 46% / 43% 37% 63% 57%' }}
            animate={
              reduceMotion
                ? undefined
                : {
                    borderRadius: [
                      '63% 37% 54% 46% / 43% 37% 63% 57%',
                      '38% 62% 63% 37% / 41% 44% 56% 59%',
                      '63% 37% 54% 46% / 43% 37% 63% 57%',
                    ],
                  }
            }
            transition={
              reduceMotion ? undefined : { duration: 14, repeat: Infinity, ease: 'easeInOut' }
            }
          >
            <motion.img
              src={backWorkout}
              alt="Fabiana de costas, em plena execução de um exercício de puxada nas costas"
              className="absolute -inset-y-[10%] inset-x-0 h-[120%] w-full object-cover"
              style={{ y }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/85 via-bg/0 to-transparent" />
          </motion.div>
          <p className="mt-4 text-center text-sm text-text-muted md:text-left">
            Disciplina no treino, todos os dias.
          </p>
        </div>

        <div>
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-text-muted">
            Sobre
          </span>
          <h2 className="mt-3 font-display text-4xl text-text sm:text-5xl">Fabiana Teixeira</h2>
          <p className="mt-6 text-lg leading-relaxed text-text-muted">
            Personal trainer em Londrina, PR,{' '}
            <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text font-semibold text-transparent">
              especializada em emagrecimento
            </span>
            , com atenção também à hipertrofia e à composição corporal, atendendo alunas
            presencial e online.
          </p>
          <p className="mt-4 leading-relaxed text-text-muted">
            Cada corpo pede um caminho diferente. Seja no treino presencial ou na consultoria
            online, o acompanhamento é pensado no seu ritmo, com constância e sem fórmula pronta,
            para que você chegue onde quer chegar e se sinta apoiada em cada etapa.
          </p>
          {/* TODO: CREF, tempo de experiência e nome da academia são UNKNOWN — não afirmar sem confirmação do cliente */}
          <motion.a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-accent-fg"
          >
            Comece sua transformação
          </motion.a>
        </div>
      </div>

      {/* Diagonal cut into Serviços (bg-alt), breaking the flat horizontal
          section-stack look shared with other clients on this page. */}
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] block h-12 w-full sm:h-14"
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polygon points="0,56 1440,0 1440,56" className="fill-bg-alt" />
        <line x1="0" y1="56" x2="1440" y2="0" className="stroke-accent/60" strokeWidth={2} />
      </svg>
    </section>
  );
}
