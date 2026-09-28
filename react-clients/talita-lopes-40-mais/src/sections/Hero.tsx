import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion';
import { ArrowRight, ChevronDown, Pause, Play } from 'lucide-react';
// Real footage of a runner in a street race in the rain (sent by the client's team).
// NOT Talita (confirmed by the user): atmospheric only, never caption it as her. 1280x720, 10s, HAS audio: always muted.
import heroVideo from '../assets/video/hero.mp4';
// First frame of the same video, 1280x720.
import heroPoster from '../assets/images/hero-poster.webp';

// H1 is the logo's tagline (says what it is at a glance); Talita's own phrase
// follows as an italic quote. Two lines on purpose.
const TITLE_A = 'Corrida inteligente'.split(' ');
const TITLE_B = 'para mulheres 40+'.split(' ');
const STAGGER = 0.08;
const H1_START = 0.25;
// When the last word lands; everything below the H1 enters after it.
const H1_END = H1_START + (TITLE_A.length + TITLE_B.length) * STAGGER;

const h1Variants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER, delayChildren: H1_START } },
};
const wordVariants: Variants = {
  hidden: { opacity: 0, y: '0.45em', filter: 'blur(12px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  // Scroll-linked parallax on the video layer only: small cap so it never
  // reveals an edge (the layer is also extended 3rem above the section).
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const videoY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  // Loop progress for the ring around the pause/play button.
  const progress = useMotionValue(0);
  useAnimationFrame(() => {
    const v = videoRef.current;
    if (v && v.duration) progress.set(v.currentTime / v.duration);
  });

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true; // React doesn't always reflect `muted` as an attribute; autoplay needs it.
    if (reduceMotion) v.pause();
    else v.play().catch(() => {}); // autoplay blocked (e.g. low-power mode): button shows Play.
  }, [reduceMotion]);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  const rise = (delay: number) =>
    reduceMotion
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  const word = (w: string, key: string, className = '') => (
    <span key={key}>
      <motion.span variants={wordVariants} className={`inline-block ${className}`}>
        {w}
      </motion.span>{' '}
    </span>
  );

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-screen flex-col justify-end overflow-hidden bg-deep pt-[var(--nav-height,4.5rem)] supports-[height:100svh]:min-h-svh"
    >
      {/* Video layer: decorative background, scroll parallax */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 -top-12 bottom-0 -z-20 will-change-transform"
        style={reduceMotion ? undefined : { scale: videoScale, y: videoY }}
      >
        <video
          ref={videoRef}
          src={heroVideo}
          poster={heroPoster}
          autoPlay={!reduceMotion}
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          className="h-full w-full object-cover"
          style={{ objectPosition: '40% 30%' }}
        />
      </motion.div>

      {/* Scrims: neutral black, not plum. Plum over green footage turned into muddy grey
          and left the headline on mid-tone video. Darkest behind the text (bottom + left),
          the runner's face at the top stays clear. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black/75 via-black/25 via-40% to-transparent to-70%" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-black/45 via-black/10 via-35% to-transparent to-60% lg:block" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-black/40 to-transparent" />

      <div className="mx-auto w-full max-w-6xl px-4 pb-24 pt-16 sm:px-6 sm:pb-28 [@media(max-height:760px)]:pb-20">
        <motion.h1
          variants={h1Variants}
          initial={reduceMotion ? false : 'hidden'}
          animate="show"
          className="font-display text-cream [text-shadow:0_1px_2px_rgb(0_0_0/0.35),0_2px_24px_rgb(0_0_0/0.5)]"
        >
          <span className="block text-[clamp(2.6rem,min(8.5vw,12vh),7rem)] leading-[1.05]">
            <span className="block">{TITLE_A.map((w, i) => word(w, `a${i}`))}</span>
            <span className="block">
              {word(TITLE_B[0], 'b0')}
              {/* "mulheres 40+" never splits: "40+" alone on a line read as an orphan on mobile */}
              <span className="whitespace-nowrap">
              {TITLE_B.slice(1).map((w, i) =>
                w === '40+' ? (
                  <span key={`c${i}`}>
                    {/* Copper marker swipe behind "40+": accent + cream reads on any frame
                        of the footage (a pale colored word vanished on the grey-green video). */}
                    <motion.span variants={wordVariants} className="relative isolate inline-block px-[0.12em] text-cream [text-shadow:none]">
                      40+
                      <motion.span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-[0.1em] top-[0.26em] -z-10 origin-left -skew-x-6 rounded-[0.1em] bg-accent"
                        initial={reduceMotion ? false : { scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.7, delay: H1_END + 0.1, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </motion.span>{' '}
                  </span>
                ) : (
                  word(w, `c${i}`)
                ),
              )}
              </span>
            </span>
          </span>
        </motion.h1>

        {/* Talita's phrase as a quote, then what the product is, CTAs and credentials */}
        <motion.div {...rise(H1_END - 0.2)} className="mt-6 max-w-4xl sm:mt-8">
          <div className="[text-shadow:0_1px_3px_rgb(0_0_0/0.6),0_2px_16px_rgb(0_0_0/0.55)]">
            <blockquote className="max-w-xl border-l-2 border-blush/80 pl-4 font-display text-xl italic leading-[1.3] text-cream sm:pl-5 sm:text-2xl lg:text-[1.75rem]">
              “Depois dos 40, não é sobre voltar no tempo. É sobre ficar forte para viver bem o futuro.”
            </blockquote>
            <p className="mt-4 font-sans text-base font-medium text-cream/90 sm:text-lg">
              O curso online da treinadora Talita Lopes.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center [@media(max-height:760px)]:mt-5">
            <motion.a
              href="#oferta"
              whileHover={reduceMotion ? undefined : { scale: 1.03 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 font-sans text-base font-bold text-accent-fg shadow-lg shadow-deep/40 transition-colors hover:bg-accent-hover [text-shadow:none]"
            >
              Quero meu acesso
              <ArrowRight
                size={18}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </motion.a>
            <motion.a
              href="#lista"
              whileHover={reduceMotion ? undefined : { scale: 1.03 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              className="inline-flex items-center justify-center rounded-full border border-cream/40 bg-black/25 px-7 py-4 font-sans text-base font-semibold text-cream backdrop-blur-md transition-colors hover:border-cream/70 hover:bg-cream/10"
            >
              Entrar na lista de espera
            </motion.a>
          </div>
          <div className="mt-7 [@media(max-height:760px)]:mt-4 [text-shadow:0_1px_3px_rgb(0_0_0/0.6),0_2px_16px_rgb(0_0_0/0.55)]">
            <p className="flex flex-col gap-1 font-sans text-sm font-medium text-cream/90 sm:flex-row sm:items-center sm:gap-3">
              <span>16 anos de treinamento</span>
              <span aria-hidden="true" className="hidden h-1 w-1 rounded-full bg-blush sm:block" />
              <span>Especialista em Gerontologia</span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#para-quem"
        aria-label="Ir para a próxima seção"
        className="absolute bottom-6 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full text-cream/70 transition-colors hover:text-cream"
        {...rise(H1_END + 0.3)}
      >
        <motion.span
          className="flex"
          animate={reduceMotion ? undefined : { y: [0, 7, 0] }}
          transition={reduceMotion ? undefined : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={26} aria-hidden="true" />
        </motion.span>
      </motion.a>

      {/* Pause/play (WCAG 2.2.2) with a ring tracing the loop's progress */}
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? 'Pausar vídeo' : 'Reproduzir vídeo'}
        className="absolute bottom-6 right-4 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-deep/40 text-cream backdrop-blur-md transition-colors hover:bg-deep/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blush sm:right-6"
      >
        <svg aria-hidden="true" viewBox="0 0 48 48" className="absolute inset-0 h-full w-full -rotate-90">
          <circle cx="24" cy="24" r="22" fill="none" strokeWidth="2" className="stroke-cream/20" />
          <motion.circle
            cx="24"
            cy="24"
            r="22"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            className="stroke-blush"
            style={{ pathLength: progress }}
          />
        </svg>
        {playing ? <Pause size={18} aria-hidden="true" /> : <Play size={18} aria-hidden="true" className="translate-x-px" />}
      </button>
    </section>
  );
}
