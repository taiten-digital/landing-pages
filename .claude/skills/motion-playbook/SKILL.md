---
name: motion-playbook
description: Framer Motion recipes translating this repo's hard-won motion lessons (idle float, ambient glow, gradient-text emphasis, real-mechanic-carries-motion, no scroll-triggered content-hiding, measured-width carousels and marquees, hero photo entrance gated on image load, spring-smoothed scroll-linked hero) for React client sections. Use when building or assigning motion for a Landing Page OS React section.
---

Category: animation, React-specific. These recipes encode design rules
learned from real, repeated client-rejection rounds on earlier builds — the
underlying rules didn't change, only the implementation mechanism (Framer
Motion, not CSS). Every new React section must follow these.

## Non-negotiable: content is visible immediately
Never pair `initial={{ opacity: 0 }}` with `whileInView` on primary content —
that's the "parece que não carregou" failure mode that got the old scroll-
reveal system removed entirely. Use `initial`/`animate` (runs once on mount,
not on scroll) for entrances. `whileInView` is only for a *non-hiding*
embellishment on something already visible — never for something that starts
hidden.

## Idle float (cards, grid items, icons)
Give every item in a grid/row a continuous idle float, but with a different
duration/delay per item so they drift out of phase — synchronized motion
across a whole grid reads as robotic:
```tsx
<motion.div
  animate={{ y: [0, -8, 0] }}
  transition={{
    duration: 4 + index * 0.4,
    delay: index * 0.3,
    repeat: Infinity,
    ease: 'easeInOut',
  }}
/>
```
Never the same `duration`/`delay` across a mapped list.

## Ambient glow (blurred light behind a photo/CTA/card)
Plain Tailwind (`blur-3xl`, a radial/linear gradient background) on an
absolutely-positioned div, large relative to its size (40–70px equivalent,
not a tight 10px smudge) with the gradient reaching full transparency well
before its own edge — a small blur on a hard-stopped gradient reads as a
visible ring, not soft light. Optionally add a slow pulse:
```tsx
<motion.div
  className="absolute inset-0 blur-3xl bg-gradient-to-br from-accent/40 to-transparent"
  animate={{ opacity: [0.6, 1, 0.6] }}
  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
/>
```

## Gradient-text emphasis (stat numbers, section leads)
Pure Tailwind, no Framer Motion needed:
```tsx
<span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
```

## Let the real mechanic carry the motion
When a section's own content is inherently sequential/timed (a numbered
process, an FAQ), animate the real mechanic instead of decorating a static
layout beside it — e.g. an auto-advancing stepper with `AnimatePresence` +
`useState`, or an FAQ rendered as a chat-bubble thread, not a static 3-card
row with an unrelated decorative dot traveling nearby.

## Distinct mechanism per section
Every section in `design-brief.md`'s Motion Language Plan gets a mechanism
none of its neighbors use — repeating the same recipe (idle float everywhere,
gradient-text everywhere) reads as a tell, the same way a repeated color or
font would. A `section-builder` agent is always told which mechanisms
siblings already took; never override that assignment.

## Interaction feedback (hover/press)
Use `whileHover`/`whileTap` props — they compose cleanly with a separate
continuous `animate` on the same element (unlike the old CSS system, where
two `animation` shorthand rules on one element silently overwrote each
other; that specific pitfall does not exist in Framer Motion and is not
something to guard against here).
```tsx
<motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} />
```

## Reduced motion
Use the `useReducedMotion()` hook to zero out `repeat`/disable idle
animations entirely under `prefers-reduced-motion: reduce` — zero motion for
that preference, not just "gentler":
```tsx
const reduceMotion = useReducedMotion();
<motion.div animate={reduceMotion ? {} : { y: [0, -8, 0] }} transition={{ repeat: reduceMotion ? 0 : Infinity }} />
```

## Carousels: clamp to measured width, never `index * itemWidth` alone
Snapping strictly by index overshoots near the end of the list once fewer
items remain than fit in one viewport width, scrolling past the last real
item into blank space. Measure both the item step and the real viewport
width, then clamp the target:
```tsx
const viewportRef = useRef<HTMLDivElement>(null);
const itemRef = useRef<HTMLDivElement>(null);
const [itemStep, setItemStep] = useState(0);
const [maxScroll, setMaxScroll] = useState(0);
const x = useMotionValue(0);

const measure = useCallback(() => {
  if (!itemRef.current || !viewportRef.current) return;
  const step = itemRef.current.getBoundingClientRect().width + GAP_PX;
  const trackWidth = step * items.length;
  const viewportWidth = viewportRef.current.getBoundingClientRect().width;
  setItemStep(step);
  setMaxScroll(Math.max(0, trackWidth - viewportWidth - GAP_PX));
}, []);
useLayoutEffect(() => { measure(); window.addEventListener('resize', measure); return () => window.removeEventListener('resize', measure); }, [measure]);

const snapTo = (targetIndex: number) => {
  const target = Math.min(maxScroll, Math.max(0, targetIndex * itemStep));
  animate(x, -target, { type: 'spring', stiffness: 260, damping: 32 });
};
```
Use the same `maxScroll` as the `dragConstraints.left` value for a
drag-enabled carousel, and put the measuring `ref` on the *actual clipping
container* (the one with `overflow-hidden`) — not a wider ancestor — or the
measured viewport width won't match what's really visible.

## Marquees: render enough copies to exceed the viewport, not a fixed 2
Two copies of a short track can together be narrower than a wide desktop
viewport — the loop math (`x: [0, -trackWidth]`) is correct but the content
still runs dry mid-frame before repeating. Measure and compute the copy
count instead of assuming 2 is enough:
```tsx
const trackRef = useRef<HTMLDivElement>(null);
const viewportRef = useRef<HTMLDivElement>(null);
const [trackWidth, setTrackWidth] = useState(0);
const [copies, setCopies] = useState(2);

useLayoutEffect(() => {
  const measure = () => {
    if (!trackRef.current || !viewportRef.current) return;
    const width = trackRef.current.getBoundingClientRect().width;
    const viewportWidth = viewportRef.current.getBoundingClientRect().width;
    if (!width) return;
    setTrackWidth(width);
    setCopies(Math.max(2, Math.ceil(viewportWidth / width) + 1));
  };
  measure();
  window.addEventListener('resize', measure);
  return () => window.removeEventListener('resize', measure);
}, []);

// render `copies` <Track key={i} ref={i === 0 ? trackRef : undefined} /> back to back
<motion.div animate={{ x: [0, -trackWidth] }} transition={{ duration: trackWidth / PX_PER_SECOND, repeat: Infinity, ease: 'linear' }} />
```
Animate by the measured pixel width, not a `%` of the whole (now
variable-length) multi-copy track, so the loop point stays exact regardless
of how many copies were needed.

## Hero photo: entrance waits for the image
Any entrance on the photo (a curtain with `clipPath`, a fade, a zoom) only
starts once the image has loaded and decoded. Started on mount, it plays
over an empty box on a slow network (`dc-consorcios`: the curtain ran from
2.1 to 3.2s, the photo arrived at 4.4s). The text keeps entering on mount
without waiting:
```tsx
const [photoReady, setPhotoReady] = useState(false);
const onPhotoLoad = (e: React.SyntheticEvent<HTMLImageElement>) =>
  e.currentTarget.decode().catch(() => {}).finally(() => setPhotoReady(true));

<motion.div
  initial={reduceMotion ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
  animate={{ clipPath: photoReady || reduceMotion ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)' }}
  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
>
  <img onLoad={onPhotoLoad} onError={() => setPhotoReady(true)} fetchPriority="high" /* srcSet... */ />
</motion.div>
```

## Scroll-linked hero: the photo becomes a card (alternative to Ken Burns)
As the Hero leaves the screen, the photo layer shrinks, rounds its
corners, drifts down more slowly than the page (parallax) and dims. It
hides nothing: the text scrolls normally. Pass `scrollYProgress` through a
**stiff `useSpring`** so mouse-wheel steps become one continuous motion,
without visible lag on touch:
```tsx
const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 });
const scale = useTransform(progress, [0, 1], [1, 0.8]);
const y = useTransform(progress, [0, 1], ['0%', '22%']);
const radius = useTransform(progress, [0, 0.3], [0, 28]);
const dim = useTransform(progress, [0, 1], [0, 0.55]); // opacity of a bg-bg overlay

<motion.div className="absolute inset-x-0 top-0 -z-10 overflow-hidden will-change-transform"
  style={reduceMotion ? undefined : { scale, y, borderRadius: radius }} />
```
The section needs `overflow-hidden` and a page background behind it so the
card's edges show. On mobile the effect is subtler (the nav covers the
top), so use a noticeable range (0.8, not 0.9). Reference:
`dc-consorcios/src/sections/Hero.tsx`.

## Full-bleed hero sizing (still applies, different measurement mechanism)
The `min-height: calc(100svh - <nav height>)` rule from root `CLAUDE.md`'s
"Full-bleed hero sections" is unchanged — measure the nav's real rendered
height, don't assume a constant. In React, do it with a ref instead of a
`<script>` island:
```tsx
const navRef = useRef<HTMLElement>(null);
const [navHeight, setNavHeight] = useState(0);
useLayoutEffect(() => {
  if (navRef.current) setNavHeight(navRef.current.getBoundingClientRect().height);
}, []);
```
That recipe only works when one component owns both the nav and the hero. In
this repo Nav and Hero are separate files built by parallel agents, so Nav
publishes the measurement as a CSS variable and Hero consumes it:
```tsx
// Nav.tsx: observe the bar row (<nav>), not the <header>, so the mobile
// dropdown opening doesn't shrink the Hero.
useLayoutEffect(() => {
  const el = barRef.current;
  if (!el) return;
  const set = () =>
    document.documentElement.style.setProperty('--nav-height', `${el.getBoundingClientRect().height}px`);
  set();
  const ro = new ResizeObserver(set);
  ro.observe(el);
  return () => ro.disconnect();
}, []);
// Hero.tsx: className="min-h-[100vh] min-h-[calc(100vh-var(--nav-height,4.5rem))] min-h-[100svh] min-h-[calc(100svh-var(--nav-height,4.5rem))]"
```
Both halves must exist; if Nav never sets it, Hero silently uses the 4.5rem
fallback and looks fine at only one nav height.
