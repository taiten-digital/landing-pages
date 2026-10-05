import { useState } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa6';

// Pexels photo #39529656 by "Irbaf photo" (steaming white coffee mug on dark).
// Pexels License: free for commercial use, no attribution required. Atmospheric
// stock, no person in it: never caption it as Vinicius or his office.
// Lives in public/ so index.html can preload it; keep these URLs in sync with the
// <link rel="preload"> tags there. -mobile is a 900x1600 portrait crop (steam top,
// mug rim ~55%) served when the screen is narrower than 3:5.
const PHOTO = `${import.meta.env.BASE_URL}images/hero-`;
const PHONE = '(max-aspect-ratio: 3/5)';

const CALENDLY = 'https://calendly.com/vinimarianofranco';
const WHATSAPP = 'https://wa.me/554388503078';

const EASE = [0.22, 1, 0.36, 1] as const;
const PHOTO_IN = 1.6;

export default function Hero() {
  const reduceMotion = useReducedMotion();

  // The photo entrance waits for the image to be decoded, so it never plays over
  // an empty box on a slow network. The text does not wait for it.
  const [photoReady, setPhotoReady] = useState(false);
  const onPhotoLoad = (e: React.SyntheticEvent<HTMLImageElement>) =>
    e.currentTarget
      .decode()
      .catch(() => {})
      .finally(() => setPhotoReady(true));

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };
  const press = reduceMotion ? {} : { whileHover: { scale: 1.03 }, whileTap: { scale: 0.97 } };
  const shadow = '[text-shadow:0_2px_20px_rgb(0_0_0/0.45)]';

  return (
    // Nav is fixed over the Hero, so the photo runs under it. box-content makes
    // min-height exclude the nav-height top padding: padding + min-height = 1 screen.
    <section
      id="inicio"
      className="relative isolate box-content flex min-h-[100vh] min-h-[calc(100vh-var(--nav-height,4.5rem))] min-h-[100svh] min-h-[calc(100svh-var(--nav-height,4.5rem))] flex-col justify-end overflow-hidden bg-bg pt-[var(--nav-height,4.5rem)] lg:justify-center"
    >
      {/* Photo: fades/settles in once decoded, then a slow continuous Ken Burns. */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-20 overflow-hidden"
        initial={reduceMotion ? false : { opacity: 0, scale: 1.08 }}
        animate={reduceMotion || photoReady ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.08 }}
        transition={{ duration: PHOTO_IN, ease: EASE }}
      >
        <picture className="block h-full w-full">
          <source media={PHONE} srcSet={`${PHOTO}mobile.jpg`} />
          <motion.img
            src={`${PHOTO}2000.jpg`}
            srcSet={`${PHOTO}1200.jpg 1200w, ${PHOTO}2000.jpg 2000w`}
            sizes="100vw"
            alt=""
            fetchPriority="high"
            onLoad={onPhotoLoad}
            onError={() => setPhotoReady(true)}
            className="h-full w-full origin-[70%_55%] object-cover object-center will-change-transform [@media(min-aspect-ratio:3/5)]:object-[70%_center]"
            animate={reduceMotion || !photoReady ? undefined : { scale: [1, 1.06] }}
            transition={{
              duration: 20,
              delay: PHOTO_IN,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
            }}
          />
        </picture>
      </motion.div>

      {/* Scrims: light, bottom + left on lg, plus a short top fade behind the nav.
          The photo is already dark; the mug and steam must stay visible. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-bg/85 via-bg/50 via-35% to-transparent to-60% lg:block"
      />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-bg/50 to-transparent" />

      <motion.div
        className="mx-auto w-full max-w-6xl px-5 pb-8 pt-10 sm:px-8 sm:pb-16 lg:py-20"
        variants={container}
        initial={reduceMotion ? false : 'hidden'}
        animate="show"
      >
        <h1
          className={`max-w-[44rem] font-display text-[2rem] leading-[1.08] tracking-tight text-text sm:text-5xl lg:text-6xl ${shadow}`}
        >
          <motion.span variants={item} className="block font-extrabold">
            Você ganha bem.
          </motion.span>
          <motion.span variants={item} className="mt-2 block text-[0.82em] font-light sm:mt-3">
            Mas quanto da sua vida ainda
          </motion.span>
          <motion.span variants={item} className="block text-[0.82em] font-semibold text-accent">
            depende da próxima renda?
          </motion.span>
        </h1>

        <motion.div variants={item} className={`mt-4 max-w-xl sm:mt-7 ${shadow}`}>
          <p className="font-sans text-base font-medium text-text/90 sm:text-lg">
            Renda alta pode trazer conforto. Liberdade exige estrutura.
          </p>
          <p className="mt-2 font-sans text-sm text-text/75 sm:text-base">
            Planejamento patrimonial com o Método CAFÉ, por Vinicius Mariano, economista e assessor de
            investimentos em Londrina.
          </p>
        </motion.div>

        <motion.div variants={item} className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center">
          <motion.a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            {...press}
            className="inline-flex cursor-pointer items-center justify-center rounded-full bg-cta px-7 py-3.5 font-sans text-base font-semibold text-cta-fg shadow-lg shadow-black/30 transition-colors hover:bg-cta-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Agendar uma conversa
          </motion.a>
          <motion.a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            {...press}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-text/25 bg-bg/30 px-7 py-3.5 font-sans text-base font-semibold text-text backdrop-blur-md transition-colors hover:border-text/50 hover:bg-text/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <FaWhatsapp size={19} aria-hidden="true" className="text-text-muted" />
            Falar no WhatsApp
          </motion.a>
        </motion.div>

        <motion.p
          variants={item}
          className={`mt-5 max-w-2xl font-sans text-xs leading-relaxed text-text/70 sm:mt-7 sm:text-sm ${shadow}`}
        >
          Economista CORECON-PR 9366 · Assessor de investimentos certificado ANCORD · Saron Investments | XP
        </motion.p>
      </motion.div>
    </section>
  );
}
