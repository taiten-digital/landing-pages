import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { FaInstagram } from 'react-icons/fa6';
import { AVALIACOES, CONTATO, EMPRESA } from '../content';
// Client-supplied photo (crop of her own Instagram post), 658x515, opaque, landscape.
import retrato from '../assets/images/cleo-retrato-bege.jpg';

const iniciais = (nome: string) =>
  nome
    .split(/\s+/)
    .map((p) => p[0])
    .join('')
    .toUpperCase();

export default function Sobre() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // Scroll-linked parallax: the photo card rises against the page while the gold
  // frame behind it sinks, and the image itself slides inside its own frame.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 });
  const cardY = useTransform(progress, [0, 1], [28, -28]);
  const frameY = useTransform(progress, [0, 1], [-28, 28]);
  const imgY = useTransform(progress, [0, 1], ['-6%', '6%']);

  return (
    <section id="sobre" ref={sectionRef} className="overflow-hidden bg-bg py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        {/* Portrait. Every node down to the absolute image layer has an explicit width
            (w-full + aspect), so the absolute children can't collapse the box. */}
        <div className="mx-auto w-full max-w-[560px] min-w-0 lg:mx-0">
          <div className="relative aspect-[658/515] w-full">
            <motion.div
              aria-hidden="true"
              className="absolute -bottom-3 -right-3 left-3 top-3 rounded-3xl border border-gold-ink/50 bg-surface/60 sm:-bottom-4 sm:-right-4 sm:left-4 sm:top-4"
              style={reduceMotion ? undefined : { y: frameY }}
            />
            <motion.div
              className="absolute inset-0 overflow-hidden rounded-3xl shadow-[0_24px_60px_-28px_rgba(43,20,23,0.45)]"
              style={reduceMotion ? undefined : { y: cardY }}
            >
              <motion.div
                className="absolute inset-x-0 -inset-y-[8%] will-change-transform"
                style={reduceMotion ? undefined : { y: imgY }}
              >
                <img
                  src={retrato}
                  alt="Cléo Bandeira sorrindo"
                  width={658}
                  height={515}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-center"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="min-w-0">
          <h2 className="font-display text-3xl leading-[1.15] text-ink sm:text-4xl lg:text-5xl">
            Prazer, sou a <span className="text-accent">Cléo</span>
          </h2>
          <div className="mt-5 space-y-4 text-ink-muted sm:text-lg">
            <p>
              Sou corretora de seguros e, desde {EMPRESA.desde}, estou à frente da {EMPRESA.nome}, aqui em
              Londrina. Atendo famílias, profissionais autônomos e empresas que querem se proteger sem
              complicação.
            </p>
            <p>
              Meu jeito de trabalhar é simples: ouvir primeiro, explicar tudo com clareza e continuar por perto
              depois que o contrato é assinado.
            </p>
          </div>

          <div className="mt-8 flex items-center gap-5">
            <span className="font-display text-6xl leading-[1.15] text-accent sm:text-7xl">{EMPRESA.desde}</span>
            <span className="h-12 w-px bg-gold-ink/40" aria-hidden="true" />
            <span className="text-sm uppercase tracking-[0.18em] text-ink-muted">
              Fundada
              <br />
              em Londrina
            </span>
          </div>

          <h3 className="mt-10 font-display text-xl leading-[1.15] text-ink">O que dizem no Google</h3>
          <div className="mt-4 grid items-start gap-4 sm:grid-cols-2">
            {AVALIACOES.map((a) => (
              <figure key={a.nome} className="relative rounded-2xl border border-line bg-card p-5">
                <Quote aria-hidden="true" className="absolute right-4 top-4 size-6 text-gold-ink/30" />
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="grid size-10 shrink-0 place-items-center rounded-full bg-surface text-sm font-semibold text-ink"
                  >
                    {iniciais(a.nome)}
                  </span>
                  <div className="min-w-0">
                    <figcaption className="text-sm font-semibold text-ink">{a.nome}</figcaption>
                    <div className="mt-0.5 flex items-center gap-1.5">
                      <span className="flex text-star" role="img" aria-label="5 estrelas">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star key={i} aria-hidden="true" className="size-3.5 fill-current" />
                        ))}
                      </span>
                      <FcGoogle aria-label="Google" className="size-4" />
                    </div>
                  </div>
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-ink">{a.texto}</blockquote>
              </figure>
            ))}
          </div>
          <p className="mt-3 text-xs text-ink-muted">Avaliações publicadas no Google Maps.</p>

          <a
            href={CONTATO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent"
          >
            <FaInstagram aria-hidden="true" className="size-4" />
            Acompanhe no Instagram {CONTATO.instagramHandle}
          </a>
        </div>
      </div>
    </section>
  );
}
