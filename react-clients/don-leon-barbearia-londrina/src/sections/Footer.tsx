import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaInstagram } from 'react-icons/fa6';
import logo from '../assets/images/logo.png';

const UNITS = ['Matriz', 'Bosque', 'Faria Lima', 'San Fernando'];
const INSTAGRAM_URL = 'https://www.instagram.com/donleonbarbearia/';
const PX_PER_SECOND = 45;

function MarqueeTrack() {
  return (
    <div className="flex shrink-0 items-center gap-8 pr-8">
      {UNITS.map((unit) => (
        <span key={unit} className="font-display text-2xl uppercase tracking-wide text-fg-muted md:text-3xl">
          {unit}
        </span>
      ))}
      <span className="text-accent-2">&#9670;</span>
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="font-display text-2xl uppercase tracking-wide text-accent-2 transition-colors hover:text-accent md:text-3xl"
      >
        @donleonbarbearia
      </a>
      <span className="text-accent-2">&#9670;</span>
    </div>
  );
}

export default function Footer() {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const [copies, setCopies] = useState(2);

  // A marquee only reads as continuous if there's always enough repeated
  // content to cover the visible bar — on a wide screen, two copies of a
  // short track (4 unit names + a handle) can be narrower than the viewport,
  // so the content runs out mid-loop and a blank gap shows before it
  // "spawns" again. Measure one track's real width and render enough
  // copies (plus one spare) to exceed the viewport at any width, instead of
  // assuming two copies are always enough.
  useLayoutEffect(() => {
    const measure = () => {
      if (!trackRef.current || !viewportRef.current) return;
      const width = trackRef.current.getBoundingClientRect().width;
      const viewportWidth = viewportRef.current.getBoundingClientRect().width;
      if (width === 0) return;
      setTrackWidth(width);
      setCopies(Math.max(2, Math.ceil(viewportWidth / width) + 1));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const duration = trackWidth ? trackWidth / PX_PER_SECOND : 20;

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-bg-panel pt-14 pb-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6">
        <img src={logo} alt="Don Leon Barbearia" className="h-16 w-auto object-contain" />

        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-fg-muted transition-colors hover:border-accent-2 hover:text-accent-2"
        >
          <FaInstagram className="h-5 w-5" aria-hidden="true" />
          @donleonbarbearia
        </a>
      </div>

      {/* Marquee: unit names + social handle, looping continuously. Fully static under reduced motion. */}
      <div ref={viewportRef} className="mt-10 w-full overflow-hidden border-y border-white/10 py-4">
        {reduceMotion ? (
          <div className="flex flex-wrap items-center justify-center gap-8 px-6">
            <MarqueeTrack />
          </div>
        ) : (
          <motion.div
            className="flex w-max items-center"
            animate={trackWidth ? { x: [0, -trackWidth] } : undefined}
            transition={{ duration, repeat: Infinity, ease: 'linear' }}
          >
            {Array.from({ length: copies }).map((_, i) => (
              <div key={i} ref={i === 0 ? trackRef : undefined} aria-hidden={i > 0}>
                <MarqueeTrack />
              </div>
            ))}
          </motion.div>
        )}
      </div>

      <p className="mt-8 text-center text-xs text-fg-muted">
        &copy; {new Date().getFullYear()} Don Leon Barbearia. High Experience. Todos os direitos reservados.
      </p>
    </footer>
  );
}
