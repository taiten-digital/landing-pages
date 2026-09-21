import { motion, useReducedMotion } from 'framer-motion';

// Deliberately quiet: no continuous motion, no dedicated mechanism (see
// design-brief.md's Motion Language Plan). Every other section already
// carries strong continuous motion; a plain, calm footer is the intended
// contrast, not an oversight. Matches the original Astro
// `clients/talita-lopes/src/index.astro` `<footer class="site-footer">`
// block verbatim: dark forest background, muted centered copyright line,
// dynamic year via `new Date().getFullYear()`.
export default function Footer() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.footer
      initial={reduceMotion ? undefined : { opacity: 0 }}
      animate={reduceMotion ? undefined : { opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-forest py-4 text-center"
    >
      <p className="text-muted-dark text-sm">
        &copy; {new Date().getFullYear()} Talita Lopes. Todos os direitos reservados.
      </p>
    </motion.footer>
  );
}
