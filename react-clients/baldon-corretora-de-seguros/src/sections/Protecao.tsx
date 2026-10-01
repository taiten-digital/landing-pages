import { useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion';
import { House, Car, Wallet, Landmark, MessageCircle } from 'lucide-react';
import { MdOutlineFamilyRestroom } from 'react-icons/md';
import { waLink } from '../content';

// Literal-match icons: lucide House / Car / Wallet / Landmark, Material "family_restroom" for family.
const ITENS = [
  { label: 'Sua casa', Icon: House },
  { label: 'Seu carro', Icon: Car },
  { label: 'Sua família', Icon: MdOutlineFamilyRestroom },
  { label: 'Sua renda', Icon: Wallet },
  { label: 'Seu patrimônio', Icon: Landmark },
];

export default function Protecao() {
  const reduceMotion = useReducedMotion();
  const listRef = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState(0);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 75%', 'end 55%'],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  useMotionValueEvent(fill, 'change', (v) => {
    const n = ITENS.filter((_, i) => v >= (i + 0.35) / ITENS.length).length;
    setLit((prev) => (prev === n ? prev : n));
  });

  const count = reduceMotion ? ITENS.length : lit;

  return (
    <section id="protecao" className="bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <h2 className="font-display text-3xl font-semibold leading-[1.2] text-text sm:text-4xl lg:sticky lg:top-28 lg:text-5xl lg:leading-[1.15]">
            Você trabalha todos os dias para construir{' '}
            <span className="text-accent">uma vida melhor.</span>
          </h2>

          <div ref={listRef} className="relative pl-14 sm:pl-16">
            <div className="absolute bottom-6 left-[1.35rem] top-6 w-px bg-line sm:left-[1.6rem]" />
            <motion.div
              className="absolute bottom-6 left-[1.35rem] top-6 w-0.5 origin-top bg-accent sm:left-[1.6rem]"
              style={{ scaleY: reduceMotion ? 1 : fill, marginLeft: -0.5 }}
            />
            <ul className="space-y-5 sm:space-y-6">
              {ITENS.map(({ label, Icon }, i) => {
                const on = i < count;
                return (
                  <li key={label} className="relative flex items-center">
                    <span
                      className={`absolute -left-14 flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-500 sm:-left-16 sm:h-12 sm:w-12 ${
                        on
                          ? 'border-accent bg-surface-2 text-accent'
                          : 'border-line bg-surface text-text-muted'
                      }`}
                    >
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
                    </span>
                    <span
                      className={`font-display text-2xl transition-colors duration-500 sm:text-3xl ${
                        on ? 'text-text' : 'text-text-muted'
                      }`}
                    >
                      {label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-14 rounded-2xl border border-line bg-surface-2 p-6 sm:mt-16 sm:p-10">
          <p className="text-base text-text-muted sm:text-lg">
            Mas existe uma pergunta importante:
          </p>
          <p className="mt-3 max-w-3xl font-display text-2xl font-semibold leading-[1.25] text-text sm:text-3xl">
            Se algo inesperado acontecesse amanhã, como ficaria tudo isso?
          </p>
          <motion.a
            href={waLink('Olá! Vim pelo site e quero conversar sobre proteção.')}
            target="_blank"
            rel="noreferrer"
            whileHover={reduceMotion ? undefined : { scale: 1.03 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-accent-fg transition-colors hover:bg-accent-hover"
          >
            <MessageCircle className="h-5 w-5" aria-hidden />
            Quero conversar sobre proteção
          </motion.a>
        </div>
      </div>
    </section>
  );
}
