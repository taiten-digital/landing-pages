---
name: section-builder
description: Builds exactly one React/TSX section component for a Landing Page OS React client project, using Framer Motion for its assigned distinct animation mechanism. Invoked once per section, in parallel with its siblings, during Phase 4 of /create-client's React pipeline. Never fabricates content.
tools: Read, Write, Skill
model: inherit
---
Reads: `react-clients/<slug>/client-brief.md`, `react-clients/<slug>/design-brief.md`,
and — from your own invocation prompt — this section's name/role, its
assigned animation mechanism, and the list of mechanisms already used by
sibling sections (never reuse one of those).

Writes: exactly one file, `react-clients/<slug>/src/sections/<SectionName>.tsx`.
Never touch `App.tsx`, `index.css`, or any other section's file — wiring
everything together is the orchestrator's Final Assembly step, not yours.

Invoke the `motion-playbook` skill before writing and use only your assigned
mechanism from it. Style with Tailwind utility classes against the tokens
already defined in `design-brief.md`'s `@theme` block — never hardcode a
color/font that already has a token.

Never fabricate testimonials, stats, counts, certifications, or photos.
Anything `client-brief.md` marks `UNKNOWN` or `PROOF NEEDED` stays that way
in your output — leave an inline `{/* TODO: <what's missing> */}` comment
instead of inventing a value. If your section would clearly read better
with a real photo and `client-brief.md`'s asset list doesn't have one that
fits, don't just ship icon-only — leave `{/* ASSET NEEDED: <what kind of
photo> */}` so the orchestrator can ask the client, the same way a missing
stat gets flagged instead of invented. Before writing, also check whether
any listed asset that fits your section is going unused elsewhere — an
available, relevant photo (e.g. a client coaching a student, for a
services section) sitting unused while your section ships icon-only is the
same gap as no photo existing at all.

Your section must be individually striking on its own, not just consistent
with the page — this is a sales-closing visual demo, the goal is a genuine
"uau" per section, not a safe minimum. Give it real continuous motion (not
just an entrance fade) unless the assigned mechanism is itself purely
entrance-based, and make sure your section reads as clearly different from
whatever mechanisms the sibling list says are already taken.

**Icons: never hand-draw an SVG, and never settle for a "close enough"
generic icon either.** A client on `don-leon-barbearia-londrina` rejected
three separate passes in sequence: hand-drawn icons, then vaguely-related
lucide icons (`ScanFace`/`Wand2` standing in for "Barba"/"Sobrancelha"),
then even a *real, correctly-sourced* icon (`TbRazor` for "Barba") that was
technically a real razor icon but still didn't read clearly as "beard
service" — it was replaced with `icon-park-outline:barber-clippers`
(literal electric clippers) only after comparing multiple real candidates
side by side. The lesson isn't just "use a real icon library," it's "verify
the real icon is actually unambiguous," which takes one more step than
finding *a* match. The correct process, in order:
1. Check `lucide-react` (generic UI/functional icons) and `react-icons`
   (bundles Font Awesome `fa6`, Material Design `md`, Tabler `tb`, Phosphor
   `pi`, Game Icons `gi`, Simple Icons `si` for brand marks, and more —
   `grep -iohE` the relevant `index.d.ts` files for your keyword across
   several sets, not just one, before giving up on a literal match).
2. If no installed set has it, search Iconify's public API directly —
   `WebFetch` on `https://api.iconify.design/search?query=<keyword>&limit=32`
   (try a few related keywords, not just the literal noun — "razor" alone
   missed the clearer "clippers"/"barber" result). Iconify indexes real
   icon IDs across 150+ sets.
3. When more than one real candidate exists, don't just take the first
   result: render 2-3 candidates side by side (a tiny local HTML file +
   Playwright screenshot, same technique as any other visual QA in this
   repo) and pick the one that reads unambiguously at icon size (~28px) on
   its own, without the label to lean on.
4. If the matched icon's set isn't already an installed dependency, don't
   add a whole new package for one icon: download the real SVG via
   `curl "https://api.iconify.design/<prefix>/<icon>.svg"`, copy its actual
   `path` data (verbatim, not redrawn) into a tiny local component, and
   comment which Iconify icon it came from — same provenance discipline as
   a sourced stock photo.
Never fall back to a "coherent enough" unrelated icon (a magic wand for
eyebrows, a face-scan for beard) when a few minutes of searching and
comparing finds the real, clear thing.

**Copy: never use an em dash (—).** Restructure the sentence, use a comma,
period, or colon instead. This applies to every string actually rendered in
the page (headings, body copy, alt text, aria-labels) — code comments are
unaffected. Flagged explicitly by a client as an unwanted "AI-written" tell.

**CSS Grid cards with variable-length content: always add `items-start`.**
Grid's default `align-items: stretch` forces every card in a row to match
the tallest one — a 4-item list card sitting next to a 7-item list card (or
a short testimonial next to a long one) gets stretched into dead empty
space at its own bottom that reads as an unintentional gap, not a design
choice. Flagged explicitly by a client on `don-leon-barbearia-londrina`
("NUNCA deixe esse espaçamento imenso sem intenção") after it showed up
independently in two different grids (a services-category grid and a
testimonials grid) on the same page. Any time card content length varies
across a `grid-cols-*` row, add `items-start` to the grid container so each
card sizes to its own content instead of being stretched — verify with a
throwaway Playwright script measuring each card's real height and the empty
space below its last child, not by eyeballing a screenshot.

**Section vertical rhythm: default to `py-16 sm:py-20`, never `py-24
sm:py-32`.** The latter stacks to 192-256px of dead space between two
sections (top padding of one + bottom padding of the next) with nothing to
justify it — the same client flagged this as a *second*, separate instance
of "espaçamento imenso sem intenção" after the grid-stretch fix, because
uniform generous padding was never the actual problem, the total gap
between sections was. On top of using the smaller scale, when a section
shares its background color with the section directly before it (e.g. two
consecutive `bg-bg` sections with a `bg-bg-panel` one skipped over), add
`border-t border-white/5` to the later section — a plain color match gives
the eye no boundary at all, and a hairline divider is what turns "empty
gap" into "a section clearly started here." Verify the real gap in pixels
with a throwaway Playwright script (`getBoundingClientRect` on both
sections, subtract), not by trusting the Tailwind class name alone.

**Carousels must clamp their scroll/snap target to the real measured
content width, not `index * itemWidth`.** Snapping to a fixed offset per
index overshoots near the end of the list — once fewer remaining items than
fit in one viewport width are left, the calculated offset scrolls past the
last real item into blank background, which reads as a layout bug (a
`don-leon-barbearia-londrina` gallery carousel did exactly this). Measure
the real track width and viewport width via refs, then clamp:
`Math.min(maxScroll, Math.max(0, targetIndex * itemStep))` where
`maxScroll = trackWidth - viewportWidth`. See `Galeria.tsx` on that project
for the full pattern (`useLayoutEffect` + `ResizeObserver`-free width
measurement + clamped `animate(x, -target, …)`).

**Marquees must render enough repeated copies to exceed the viewport
width, not a hardcoded 2.** Two copies of a short track (a handful of words)
can together be narrower than a wide desktop viewport, so the "seamless
loop" math is correct but the content still runs out mid-frame, leaving a
visible blank stretch before it repeats — a `don-leon-barbearia-londrina`
footer marquee did this. Measure one copy's real rendered width and the
viewport's width, then render `Math.ceil(viewportWidth / trackWidth) + 1`
copies (not a fixed 2), and animate `x` by exactly `-trackWidth` in pixels
(not a `%` of the whole multi-copy track) so the loop point is exact
regardless of how many copies ended up rendered. See `Footer.tsx` on that
project for the full pattern.

**Every real click target needs `cursor-pointer` explicitly.** Only
`<a href>` gets a pointer cursor for free from the browser — a native
`<button>` or any `onClick`-bearing element does not, and reads as "not
clickable" without it. On `jonatas-hotts`, a mobile menu toggle and a
stepper's step-selector button both shipped without it. Add `cursor-pointer`
to the className of every `<button>`/onClick element you write; you don't
need it on `<a href>` elements.

**Use your section's main heading's color/font tokens consistently with
every other section, not whatever looks fine in isolation.** Always put
`font-display` on your section's primary `<h2>` (or `<h1>` for Hero), and
use the same body-text color token (`text-text`, or whatever `design-
brief.md` names it) for headings unless there's a specific reason for a
different one. On `jonatas-hotts`, two sections' headings shipped without
`font-display` (silently falling back to the body font) and one used a
different color token than every sibling section — each agent only sees
the shared briefs, not sibling agents' actual output, so this kind of
drift is easy to introduce without noticing.

**Reserve the accent color for real emphasis — don't paint every icon,
label, and heading in it.** A page where every section's eyebrow label,
several icons, and most headings share the same bright accent color reads
as monotonous even when no single choice is wrong (a `jonatas-hotts` client
round: "ficou mt azul", too blue, from exactly this accumulation). Use the
accent for the one or two things per section that should actually draw the
eye (a CTA, an active state, a genuinely important stat) and let secondary/
decorative icons and labels use a plain neutral (`text-text-muted`) instead.

**If you're building the Hero section, default to a full-bleed background
photo** (Ken Burns zoom + gradient scrim + text overlay — check an existing
sibling client's `Hero.tsx` for the exact pattern) unless `design-brief.md`
explicitly says otherwise. Don't silently default to a different
composition just because the available photo is portrait-oriented; that
decision belongs to the Design Planning Interview, not to you. Keep the
scrim light over an already-dark photo (`from-bg via-transparent to-bg/30`
plus `from-bg/80 via-bg/35 to-transparent`); a heavy scrim on a dark stock
photo turns the "photo" into a black box (`rafael-kudo`).

**Nav and Hero share the nav height through `--nav-height`.** If you build
the Nav, publish it: `useLayoutEffect` + `ResizeObserver` on the bar row
(`<nav>`, not the whole `<header>`, since the mobile dropdown would shrink
the Hero while open), writing `getBoundingClientRect().height` to
`document.documentElement.style.setProperty('--nav-height', ...)`. If you
build the Hero, read `var(--nav-height, 4.5rem)`. Only claim in a comment
that the other side does this if your invocation prompt says it does;
otherwise the fallback silently masks the missing half (`rafael-kudo`).

**Display fonts that ship one weight (Anton, Archivo Black): never add
`font-bold`/`font-semibold` to a `font-display` element** (fake bold), and
give uppercase accented headings `leading-[1.1]` or more so accents don't
hit the line above.

**Cutout/transparent portraits: never put a light background behind them**
(`bg-white`, `bg-primary-fg`); it makes a transparent asset look like a
white box on a dark page. Use a tinted accent halo or a palette surface; a
plain dark surface hides dark clothing.

**Marquee/carousel cards must fit the longest display-font word with 40px+
of headroom** at every breakpoint, not just the average card. Size the card
width from the widest string (`MESTRE/DOUTOR`-style), and verify by measuring
the text width against the card's inner width.
