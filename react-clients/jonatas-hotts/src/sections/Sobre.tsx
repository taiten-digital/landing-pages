import { motion, useReducedMotion } from 'framer-motion';
import { Video, CircleCheckBig, TrendingUp, LifeBuoy } from 'lucide-react';
import jonatasAbdominal from '../assets/images/jonatas-abdominal.png';

const differentiators = [
  {
    icon: Video,
    title: 'Vídeos de execução',
    description:
      'Vídeo explicando a execução de cada exercício, para treinar com segurança mesmo longe da academia.',
  },
  {
    icon: CircleCheckBig,
    title: 'Correção de execução',
    description:
      'Acompanhamento próximo, com correção da forma em cada movimento, não só um treino entregue e esquecido.',
  },
  {
    icon: TrendingUp,
    title: 'Progressão individual',
    description:
      'Evolução de carga e treino no ritmo de cada aluno, respeitando o ponto de partida de cada um.',
  },
  {
    icon: LifeBuoy,
    title: 'Suporte contínuo',
    description:
      'Suporte durante todo o processo, do primeiro treino até a mudança de rotina.',
  },
];

export default function Sobre() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="sobre" className="overflow-hidden bg-bg-alt py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 md:gap-16">
        <div className="order-last md:order-first">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            Sobre
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-text sm:text-4xl">
            Um acompanhamento que vai além da planilha
          </h2>
          <p className="mt-5 max-w-xl text-base text-text-muted sm:text-lg">
            Jonatas Hotts é personal trainer em Londrina, PR, com atendimento
            presencial e consultoria online para quem quer emagrecer, ganhar
            hipertrofia ou está começando a treinar do zero.
          </p>
          {/* TODO: tempo de experiência e certificações (CREF, cursos) - PROOF NEEDED, aguardando confirmação do cliente */}

          <ul className="mt-8 grid grid-cols-1 items-start gap-6 sm:grid-cols-2">
            {differentiators.map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                </span>
                <div>
                  <p className="font-semibold text-text">{item.title}</p>
                  <p className="mt-1 text-sm text-text-muted">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="order-first md:order-last">
          <div className="relative mx-auto w-full max-w-sm md:max-w-md">
            <div
              aria-hidden="true"
              className="absolute -inset-4 -z-10 rotate-3 rounded-card border-2 border-accent/30"
            />
            <motion.div
              animate={reduceMotion ? {} : { y: [0, -7, 0] }}
              transition={{
                duration: 5.5,
                delay: 0.3,
                repeat: reduceMotion ? 0 : Infinity,
                ease: 'easeInOut',
              }}
              className="relative aspect-square overflow-hidden rounded-card border border-border bg-surface shadow-xl shadow-primary/10"
            >
              <img
                src={jonatasAbdominal}
                alt="Jonatas Hotts fazendo abdominal ao ar livre, luz dourada de fim de tarde"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
