import { Fragment, useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { GiHops } from 'react-icons/gi';

const PX_PER_SECOND = 70;
const WORDS = ['Chopp gelado', 'Barris de 30 e 50 litros', 'Entrega em Londrina', 'Desde 2014', 'Peça pelo WhatsApp'];

function Track({ trackRef }: { trackRef?: React.Ref<HTMLDivElement> }) {
  return (
    <div ref={trackRef} className="flex shrink-0 items-center">
      {WORDS.map((w) => (
        <Fragment key={w}>
          <span className="font-display whitespace-nowrap px-6 text-3xl text-accent-fg sm:text-4xl">{w}</span>
          <GiHops className="h-7 w-7 shrink-0 text-accent-fg/70" aria-hidden />
        </Fragment>
      ))}
    </div>
  );
}

export default function Marquee() {
  const reduce = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const [copies, setCopies] = useState(2);

  useLayoutEffect(() => {
    const measure = () => {
      if (!trackRef.current || !viewportRef.current) return;
      const w = trackRef.current.getBoundingClientRect().width;
      const vw = viewportRef.current.getBoundingClientRect().width;
      if (!w) return;
      setTrackWidth(w);
      setCopies(Math.max(2, Math.ceil(vw / w) + 1));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    <div className="relative z-10 overflow-hidden py-3">
    <div
      ref={viewportRef}
      aria-hidden
      className="-rotate-1 overflow-hidden bg-gradient-to-r from-accent via-accent-2 to-accent py-3 shadow-[0_0_60px_rgba(244,168,29,0.35)]"
    >
      <motion.div
        className="flex w-max"
        animate={reduce || !trackWidth ? {} : { x: [0, -trackWidth] }}
        transition={{ duration: trackWidth / PX_PER_SECOND || 1, repeat: Infinity, ease: 'linear' }}
      >
        {Array.from({ length: copies }, (_, i) => (
          <Track key={i} trackRef={i === 0 ? trackRef : undefined} />
        ))}
      </motion.div>
    </div>
    </div>
  );
}
