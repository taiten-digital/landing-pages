import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { HandHelping, MessagesSquare, Ruler, Scale, type LucideIcon } from 'lucide-react';

// Icons picked for literal reading at ~28px (lucide-react, installed):
// Scale = weighing options side by side, Ruler = "sob medida" (made to measure),
// HandHelping = an offered hand (support in a claim; Handshake read as "closing a deal"),
// MessagesSquare = conversation.
const MOTIVOS: { titulo: string; texto: string; Icon: LucideIcon }[] = [
  {
    titulo: 'Mais de uma opção',
    texto: 'Comparo coberturas e preços entre seguradoras, em vez de oferecer um único produto.',
    Icon: Scale,
  },
  {
    titulo: 'Cobertura sob medida',
    texto:
      'Analiso seu perfil e sua rotina para indicar só o que faz sentido, como home office no seguro residencial ou doenças graves no seguro de vida.',
    Icon: Ruler,
  },
  {
    titulo: 'Do seu lado no sinistro',
    texto: 'Se algo acontecer, cuido da burocracia com a seguradora e acompanho o seu processo até o fim.',
    Icon: HandHelping,
  },
  {
    titulo: 'Atendimento de gente',
    texto: 'Você fala comigo e com a minha equipe pelo WhatsApp, pelo telefone ou no escritório, em Londrina.',
    Icon: MessagesSquare,
  },
];

const iconVariants: Variants = {
  rest: { rotate: 0, y: 0, scale: 1 },
  hover: { rotate: -10, y: -6, scale: 1.1, transition: { type: 'spring', stiffness: 320, damping: 14 } },
};

const ringVariants: Variants = {
  rest: { scale: 1, opacity: 0 },
  hover: { scale: 1.25, opacity: 1, transition: { duration: 0.35, ease: 'easeOut' } },
};

export default function PorQue() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="por-que" className="relative overflow-hidden bg-wine py-16 text-cream sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-12">
          <div>
            <span aria-hidden="true" className="mb-5 block h-px w-16 bg-gold/30" />
            <h2 className="font-display text-3xl leading-[1.15] text-cream sm:text-4xl lg:text-5xl">
              Por que contratar com uma <span className="text-gold">corretora</span>
            </h2>
          </div>
          <p className="max-w-md text-base text-cream-muted sm:text-lg lg:justify-self-end">
            A diferença aparece na hora de escolher e, principalmente, na hora de usar o seguro.
          </p>
        </div>

        <ul className="mt-12 grid items-start gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:pb-8">
          {MOTIVOS.map(({ titulo, texto, Icon }, i) => (
            // Staggered baseline on lg (odd cards sit lower) so the drifting row reads as a wave.
            <li key={titulo} className={i % 2 === 1 ? 'lg:mt-8' : undefined}>
              <motion.div
                animate={reduceMotion ? undefined : { y: [0, -10, 0], rotate: [0, i % 2 ? 0.6 : -0.6, 0] }}
                transition={
                  reduceMotion
                    ? undefined
                    : { duration: 4.6 + i * 0.7, delay: i * 0.45, repeat: Infinity, ease: 'easeInOut' }
                }
              >
                <motion.article
                  initial="rest"
                  animate="rest"
                  whileHover={reduceMotion ? undefined : 'hover'}
                  className="group relative rounded-3xl border border-wine-line bg-wine-2 p-6 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.6)] transition-colors duration-300 hover:border-gold/40 sm:p-7"
                >
                  <span
                    aria-hidden="true"
                    className="absolute right-6 top-5 font-display text-4xl leading-none text-cream/10 transition-colors duration-300 group-hover:text-gold/25"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="relative h-14 w-14">
                    <motion.span
                      aria-hidden="true"
                      variants={ringVariants}
                      className="absolute inset-0 rounded-2xl border border-gold/30"
                    />
                    <motion.span
                      variants={iconVariants}
                      className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-wine-line bg-wine"
                    >
                      <Icon aria-hidden="true" className="h-7 w-7 text-gold" strokeWidth={1.6} />
                    </motion.span>
                  </div>

                  <h3 className="mt-6 text-lg font-semibold leading-snug text-cream">{titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream-muted sm:text-[0.95rem]">{texto}</p>
                </motion.article>
              </motion.div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
