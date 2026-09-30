import { useState, type CSSProperties, type SyntheticEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { CONTATO, waLink } from '../content';

// Client's own portrait (656x505, opaque, studio wine backdrop), cropped from her Instagram.
// Lives in public/ so index.html can preload it by a stable URL. Low resolution: the box
// below never renders it wider than 780px.
const PHOTO = `${import.meta.env.BASE_URL}images/cleo-hero.jpg`;

const EASE = [0.22, 1, 0.36, 1] as const;

// H1 split into words so each one rises out of its own mask on mount and still wraps
// naturally at every width (fixed line breaks would overflow the 343px mobile column).
const H1_WORDS = ['Proteção', 'sob', 'medida', 'para', 'sua', 'família,', 'sua', 'saúde', 'e', 'seu'];
const WORD_START = 0.15;
const WORD_STAGGER = 0.06;
// When the last word (the emphasis) starts; the rest of the copy follows it.
const H1_END = WORD_START + H1_WORDS.length * WORD_STAGGER;

const CREDENCIAIS = ['Desde 2017', 'Londrina - PR', 'Seguros, saúde e consórcios'];

// Photo edges melt into bg-wine (the photo's own backdrop color), so there is no visible
// rectangle. Two gradients intersected, one per axis.
const photoMasks = {
  // below lg: soft top and sides, long bottom fade under the text
  '--mask-sm':
    'linear-gradient(to bottom, transparent 0%, #000 12%, #000 45%, transparent 96%), linear-gradient(to right, transparent 0%, #000 10%, #000 90%, transparent 100%)',
  // lg+: strong left and top fade, light bottom fade, soft right edge
  '--mask-lg':
    'linear-gradient(to right, transparent 0%, #000 38%, #000 86%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 28%, #000 90%, transparent 100%)',
} as CSSProperties;

export default function Hero() {
  const reduceMotion = useReducedMotion();

  // The reveal only starts once the photo is downloaded and decoded; otherwise, on a slow
  // connection, it would play over an empty box and the photo would pop in afterwards.
  const [photoReady, setPhotoReady] = useState(false);
  const onPhotoLoad = (e: SyntheticEvent<HTMLImageElement>) =>
    e.currentTarget
      .decode()
      .catch(() => {})
      .finally(() => setPhotoReady(true));
  const shown = photoReady || !!reduceMotion;

  const word = (i: number) =>
    reduceMotion
      ? { initial: false as const }
      : {
          initial: { y: '115%' },
          animate: { y: '0%' },
          transition: { duration: 0.8, delay: WORD_START + i * WORD_STAGGER, ease: EASE },
        };

  const rise = (delay: number) =>
    reduceMotion
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: EASE },
        };

  const press = reduceMotion ? {} : { whileHover: { scale: 1.03 }, whileTap: { scale: 0.97 } };

  // overflow-hidden is the mask; the padding keeps descenders and the cedilla unclipped.
  const wordMask = 'inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom';

  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-screen flex-col overflow-hidden bg-wine pt-[var(--nav-height,4.5rem)] text-cream supports-[height:100svh]:min-h-svh"
    >
      {/* Photo zone. Below lg: top ~48% of the Hero, centered, capped at 780px wide.
          lg+: anchored bottom-right, width min(780px, 56vw, 78vh at the photo's 656/505 ratio). */}
      <div
        style={photoMasks}
        className="pointer-events-none absolute inset-x-0 top-[var(--nav-height,4.5rem)] mx-auto h-[48%] w-full max-w-[780px] lg:inset-x-auto lg:top-auto lg:right-[max(0px,calc(50vw-40rem))] lg:bottom-0 lg:mx-0 lg:aspect-[656/505] lg:h-auto lg:w-[min(780px,56vw,101vh)] lg:max-w-none"
      >
        {/* Breathing gold backlight behind her head. It sits under the photo and shows through
            the masked edges as a halo; the gradient is fully transparent well before its edge. */}
        <motion.div
          aria-hidden="true"
          className="absolute top-[-20%] left-1/2 aspect-square w-[95%] -translate-x-1/2 rounded-full blur-3xl lg:top-[-28%] lg:w-[85%]"
          style={{
            background:
              'radial-gradient(closest-side, color-mix(in oklab, var(--color-gold) 38%, transparent) 0%, color-mix(in oklab, var(--color-gold) 14%, transparent) 42%, transparent 68%)',
          }}
          initial={false}
          animate={reduceMotion ? { opacity: 0.8 } : { opacity: [0.5, 1, 0.5], scale: [0.94, 1.06, 0.94] }}
          transition={reduceMotion ? { duration: 0 } : { duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Entrance, gated on load: a curtain opening from the right while the photo settles
            from a slight zoom. */}
        <motion.div
          className="absolute inset-0 [mask-composite:intersect] [mask-image:var(--mask-sm)] lg:[mask-image:var(--mask-lg)]"
          initial={reduceMotion ? false : { clipPath: 'inset(0% 0% 0% 100%)' }}
          animate={{ clipPath: shown ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 0% 100%)' }}
          transition={{ duration: 1.3, ease: EASE }}
        >
          <motion.img
            src={PHOTO}
            alt="Cléo Bandeira, corretora de seguros"
            width={656}
            height={505}
            fetchPriority="high"
            onLoad={onPhotoLoad}
            onError={() => setPhotoReady(true)}
            initial={reduceMotion ? false : { scale: 1.08 }}
            animate={{ scale: shown ? 1 : 1.08 }}
            transition={{ duration: 1.8, ease: EASE }}
            className="h-full w-full object-cover object-[50%_35%] lg:object-center"
          />
        </motion.div>
      </div>

      {/* Text. Below lg it is anchored to the bottom and overlaps the photo's faded blazer;
          lg+ it is a vertically centered left column (~52%). */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end px-4 pt-[22svh] pb-6 sm:px-6 sm:pb-12 lg:justify-center lg:py-16">
        <div className="max-w-xl lg:w-[52%] lg:max-w-none">
          <h1 className="font-display text-[2rem] leading-[1.15] text-cream [text-shadow:0_2px_20px_color-mix(in_oklab,var(--color-wine)_75%,transparent)] sm:text-5xl xl:text-6xl">
            {H1_WORDS.map((w, i) => (
              <span key={i}>
                <span className={wordMask}>
                  <motion.span className="inline-block" {...word(i)}>
                    {w}
                  </motion.span>
                </span>{' '}
              </span>
            ))}
            <span className={wordMask}>
              <motion.span className="inline-block" {...word(H1_WORDS.length)}>
                <span className="text-gold">patrimônio</span>.
              </motion.span>
            </span>
          </h1>

          <motion.p
            {...rise(H1_END + 0.15)}
            className="mt-4 text-sm leading-relaxed text-cream/85 sm:mt-6 sm:text-lg"
          >
            Sou a Cléo Bandeira, corretora de seguros em Londrina. Comparo as opções, explico cada
            cobertura sem letra miúda e sigo com você depois da contratação.
          </motion.p>

          <motion.div
            {...rise(H1_END + 0.3)}
            className="mt-5 flex flex-wrap items-center gap-2.5 sm:mt-8 sm:gap-3"
          >
            <motion.a
              href={waLink('Olá, Cléo! Vim pelo site e quero pedir uma cotação.')}
              target="_blank"
              rel="noopener"
              {...press}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-base font-semibold text-gold-fg shadow-lg shadow-black/25 transition-colors hover:bg-gold-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:py-3.5"
            >
              <FaWhatsapp size={20} aria-hidden="true" />
              Pedir uma cotação
            </motion.a>
            <motion.a
              href={CONTATO.telefoneHref}
              {...press}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-cream/30 px-5 py-2.5 text-[0.95rem] font-medium text-cream transition-colors hover:border-cream/60 hover:bg-cream/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:px-6 sm:py-3.5 sm:text-base"
            >
              <Phone size={18} aria-hidden="true" className="text-cream-muted" />
              Ligar {CONTATO.telefoneDisplay}
            </motion.a>
          </motion.div>

          {/* Below sm the third item takes its own row (no separator), so no line ever starts
              with a stray divider. */}
          <motion.ul
            {...rise(H1_END + 0.45)}
            className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-cream-muted sm:mt-8 sm:gap-x-4 sm:text-sm"
          >
            {CREDENCIAIS.map((item, i) => (
              <li
                key={item}
                className={`inline-flex items-center gap-3 sm:gap-4 ${i === 2 ? 'max-sm:w-full' : ''}`}
              >
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    className={`h-3.5 w-px bg-gold/30 ${i === 2 ? 'max-sm:hidden' : ''}`}
                  />
                )}
                {item}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
