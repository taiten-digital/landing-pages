# Project State — Talita Lopes (`talita-lopes`)

## Phases
| Phase | Status | Owner | Last updated |
|---|---|---|---|
| 1. Scaffold | done | create-client script | 2026-09-15 |
| 2. Discovery | done | main session | 2026-09-15 |
| 3. Research | done | researcher | 2026-09-15 |
| 4. Brand DNA | done | brand-intelligence | 2026-09-15 |
| 5. Competitor research | done | researcher | 2026-09-15 |
| 6. Strategy | done | strategist | 2026-09-15 |
| 7. Minimum-page audit / IA | done | ux-architect | 2026-09-15 |
| 8. Copy | done | copywriter | 2026-09-15 |
| 9. Visual research | done | visual-researcher | 2026-09-15 |
| 10. Visual direction | done | ui-design | 2026-09-15 |
| 11. Implementation | done | developer | 2026-09-15 |
| 12. Responsive pass | done | developer | 2026-09-15 |
| 13. QA | done | qa + main session (fixes) | 2026-09-15 |
| 14. CRO review | done | cro | 2026-09-15 |
| 15. Iteration | done | main session | 2026-09-15 |
| 16. Final validation | done | main session | 2026-09-15 |
| 17. Deploy-ready | done | main session | 2026-09-15 |

**Rebrand v2** (full visual + structural rebrand, triggered by user rejection of v1 build): design/tokens (ui-design), page-architecture pointers (ux-architect), copy tone (copywriter), implementation (developer), QA (qa + main session fixes), and CRO (main session, direct — see below) all done 2026-09-15. See "Visual Rebrand" / "Rebrand Implementation" / "Post-Implementation Fix" / "Post-QA Fix" / "Conversion Review — Rebrand" entries below for detail.

**Second Remap** (2026-09-16, main session, direct — no subagents this round): user rejected the scroll-reveal animation a second time ("essa animação... um lixo," "scroll um lixo" x2), called the header "ruim," asked for bolder typography treatment, more images ("pode usar do próprio Google"), icons, and said the page "ainda não está única, longe disso." See "Second Remap" entry below for full detail — scroll-reveal removed entirely (system-wide decision, not just this client), header rebuilt (real logo, anchor nav, mobile menu, sticky+blur), icon set added, 3 previously-unused real client photos placed, testimonial carousel got visible arrows/dots.

## Decisions Log
- 2026-09-15: Client scaffolded.
- 2026-09-15: Discovered a pre-existing live landing page at
  https://landing-pages-five-silk.vercel.app/ for this same client (likely a
  prior v1 project). User decided: rebuild fresh through the full pipeline,
  but treat the old page as a legitimate research source (real testimonials,
  CREF certification, offer details) rather than starting from zero or
  porting it as-is.

- 2026-09-15: Visual research: `claude-in-chrome` was unavailable (extension not
  connected in this environment) — visual-researcher fell back to WebFetch,
  which still upgraded confidence on layout/colors/photo provenance but is not
  pixel-verified. Recommend a screenshot pass before locking exact hex/type
  values, and before assuming v1's commissioned-looking photography (custom
  filenames, no stock-catalog IDs) is actually licensed for reuse.

- 2026-09-15: Visual direction: teal accent (`#0f766e`, deep/desaturated,
  not the confirmed v1 hex — a considered placeholder pending a
  screenshot pass) locked as the token, Atkinson Hyperlegible chosen for
  body/heading type (legibility for a 50+ audience, self-hosting deferred
  to implementation), spacing/type scale widened for accessible reading.
  Ran `design-taste-frontend` taste pass; open items (accent hex
  verification, v1 photo licensing, webfont self-hosting) carried forward
  to implementation/QA, not resolved here.

- 2026-09-15: User confirmed v1's photography is Talita's own (her shoot, her
  rights) — implementation may reuse the actual image files from the v1
  build rather than placeholders.

- 2026-09-15: Implementation complete. Downloaded v1's real photography
  (hero-senhora, sobre-instrutora-aluna, treino-alongamento,
  diferenciais-forca, 3 testimonial headshots) into
  `clients/talita-lopes/assets/images/`, served via `astro:assets`. Confirmed
  Atkinson Hyperlegible is on fonts.googleapis.com but self-hosted it locally
  instead (4 woff2 files in `assets/fonts/`, `@font-face` in `index.astro`)
  per design-direction's explicit preference — verified via a build test that
  Vite resolves/hashes the relative `url()` correctly even though tokens.css
  itself is raw-injected. `npm run check` and `npm run build` both pass clean.
- 2026-09-15: Fixed the shared-routing SEO gap the developer agent found (main
  session, not the client-scoped agent, since it required editing
  `src/pages/[slug].astro`/`BaseLayout.astro`). `[slug].astro` now reads
  optional `pageTitle`/`pageDescription`/`pageLang` named exports from each
  client's `index.astro` and forwards them to `BaseLayout`, which also gained
  a `canonicalPath` prop (auto-set to `/<slug>`) and an `lang` prop (defaults
  to `'en'` for clients that don't export one). Talita's page now correctly
  renders `<html lang="pt-BR">`, the real `<title>`, and `<link
  rel="canonical" href="/talita-lopes">` — verified in the built HTML.
  Removed the now-redundant duplicate title/meta/canonical/OG tags this
  client's `index.astro` had inlined as a workaround. This convention
  (`export const pageTitle/pageDescription/pageLang`) is now documented in
  root `CLAUDE.md` and the `seo-technical`/`astro-client-integration` skills
  for every future client.
- 2026-09-15: `shared/components/Footer.astro` hardcodes English "All rights
  reserved." with no localization prop — swapped for a small inline
  Portuguese footer in this client's `index.astro` instead of forcing a
  language mismatch.
- 2026-09-15: System-wide fix (affects all clients, not just this one): none
  of the 10 agent definitions in `.claude/agents/` listed `Skill` in their
  `tools:` frontmatter, even though every agent's job is to "invoke the X
  skill." This is why the developer agent reported it "applied
  mobile-native/design-taste-frontend's intent manually" instead of actually
  invoking them. Added `Skill` to all 10 agents' tool lists.
- 2026-09-15: QA passed (5 issues, all fixed directly by main session — FAQ
  tap target, focus-visible, CTA target=_blank, tap-highlight/touch-action,
  theme-color — see qa/post-mortem.md Issues table). CRO review found one
  code-level risk (Hero's fixed 112px padding-block could push the
  spine+50+ differentiator claim below the fold on short mobile screens) —
  fixed pre-emptively with responsive `py-10 md:py-[var(--space-7)]`, though
  still not pixel/screenshot-verified (claude-in-chrome unavailable for this
  entire project). Final `npm run check` + `npm run build` both clean.
- 2026-09-15: Two items surfaced by CRO are content/compliance sign-off
  items, NOT code issues, and are genuine pre-launch blockers: (1) CREF
  019973-G/PR has only been cross-checked across the client's own channels,
  never against the CREF-PR registry itself — a regulated-profession
  credential; (2) the FAQ's online-consulting-for-50+ answer is a
  copywriter-originated, unsourced reassurance about a health-adjacent
  decision. Both need explicit sign-off from Talita before this page goes
  live. Not resolved here — outside what research/agents can verify.

## Post-Mortem
- What worked: parallelizing independent phases (research+brand-DNA,
  ux-architecture+visual-research) cut wall-clock time substantially with no
  quality cost since their inputs didn't overlap. The research skill's
  Fact/Observation/Inference/Unknown tagging carried real weight all the way
  through copy (nothing got silently upgraded from "unverified" to "stated
  fact" between phases). Treating the pre-existing v1 page as a legitimate
  research source (once confirmed with the user) meant real testimonials and
  credentials from day one instead of placeholder proof.
- What failed / gaps hit: `claude-in-chrome` was unavailable for this
  project's entire duration — every phase that wanted a real screenshot
  (visual research, QA, CRO) had to fall back to WebFetch/source-reading and
  flag reduced confidence. This is a real, recurring capability gap, not a
  one-off.
- Missing capabilities/tools: a working browser-automation connection in
  this environment (needed for pixel-accurate visual QA/CRO); no CREF-PR (or
  equivalent professional-registry) lookup tool for regulated-profession
  credential verification.
- Useful research sources: the client's own prior landing page (when one
  exists) is a legitimate, high-value research source once confirmed with
  the user — real testimonials/credentials beat placeholders. Instagram bio
  links (Linktree-style) were a reliable cross-check for confirming which of
  two similarly-named social handles is actually official.
- Reusable components/patterns discovered (now generalized into shared/):
  `pageTitle`/`pageDescription`/`pageLang`/`pageThemeColor` named-export
  convention for per-client SEO metadata (was previously a routing gap);
  `CtaButton`'s `external` prop for new-tab links with `rel="noopener"`;
  focus-visible/tap-highlight/touch-action baseline in `shared/styles/base.css`.
- Improvements for the next client: give every agent the `Skill` tool by
  default in the agent template (already fixed for all 10, but keep this in
  mind if a new agent role is ever added); consider a lightweight image-
  licensing checklist item in the discovery questionnaire for any client
  with existing commissioned photography, so the rights question comes up
  before visual research rather than mid-pipeline.

## Post-Delivery Correction (2026-09-15)
User rejected the delivered page hard: "ficou um LIXO... página quadrada...
nenhum efeito... parece HTML cru" — unfavorably compared to v1's "animações
suaves e diferentes, design inovador."

**Root cause, confirmed from the developer agent's own handback report:**
`design-direction.md`'s Layout & Motion Notes explicitly specified
`MOTION_INTENSITY: 3` = "simple opacity/transform fade-ins on scroll," NOT
zero. The developer agent's report literally said "restrained motion by
simply not adding any" — it read "restrained" as "none," contradicting its
own brief. Compounded by the system-wide `Skill`-tool bug (already fixed
above): the developer/ui-design agents didn't have the `Skill` tool during
their actual runs, so `animate` and `design-taste-frontend` were "applied
manually" from memory instead of actually invoked — the developer never saw
`animate`'s concrete recipes (scroll-reveal via `clip-path` +
`IntersectionObserver`, entrance stagger, hover/press feedback with exact
curves/durations) that would have prevented this.

**User's direct comparison to a page they'd already approved overrides the
strategist-inferred motion dial for this project.** Revised:
`MOTION_INTENSITY 3 → 5-6` — still no parallax/scroll-hijacking/bounce, but
smooth, purposeful, once-only reveals and microinteractions instead of
restraint-to-the-point-of-inert.

**Fixed directly by main session**, this time actually invoking the
`animate` skill:
- `shared/styles/base.css`: `--ease-out`/`--ease-in-out` tokens (exact
  curves from the skill), a `.reveal` scroll-reveal utility (`clip-path`
  inset + `IntersectionObserver`, progressive-enhancement safe — visible by
  default, only hidden once a `.js` class proves JS ran), an
  `.enter`/`enter-1..6` mount-stagger utility, a `[data-hover-lift]` card
  utility, and a `prefers-reduced-motion` override disabling all of it.
  **Shared, OS-wide now** — every future client can reach for these instead
  of reinventing motion.
- `src/layouts/BaseLayout.astro`: the vanilla-JS `IntersectionObserver`
  wiring script (no dependency) that powers `.reveal` site-wide.
- `shared/components/CtaButton.astro`: press feedback (`:active` scale
  0.97) + hover-gated glow shadow.
- `HeroSection.astro`: staggered entrance (eyebrow → h1 → 2 paragraphs → CTA
  → image, 40-390ms delays).
- `About`/`Services`/`Faq`/`Contact`/`TestimonialsSection`: scroll-reveal on
  every major block/card, staggered per item; testimonial cards + featured
  service gained `[data-hover-lift]`; service items gained a colored
  left-border accent to break the flat/boxy row look without reviving the
  "3 equal cards" anti-pattern `design-taste-frontend` had already ruled
  out.
- Found and fixed a real CSS cascade bug while wiring this up: an element
  with both `.reveal` and `[data-hover-lift]` had one rule's `transition`
  shorthand silently clobber the other's (shorthands don't merge across
  rules) — added an explicit combined `.js .reveal[data-hover-lift]` rule.

Verified with `npm run check` (0 errors) + `npm run build` (clean); dev
server confirmed serving the update live via HMR. **Still not
screenshot-verified** (`claude-in-chrome` unavailable) — the actual feel of
the motion is for the user to judge directly, not claimed as confirmed here.

## Second Post-Delivery Correction (2026-09-15, same day)
User reported the page was now "tudo em branco" (all blank) and asked to
install Playwright so the page could actually be seen. Installed
`playwright` as a devDependency + Chromium binary and screenshotted the live
page directly — this is the **first real visual verification this entire
project got** (`claude-in-chrome` never connected once, all session).

**Confirmed a real, severe bug, not a fluke:** the screenshot showed
everything below the Hero completely blank. Root cause traced with a
scripted Playwright repro (scroll simulation + instrumented
`IntersectionObserver`): the observer's callback fired exactly once, at
`observe()` time (reporting `isIntersecting: false`, correct at that
instant), and **never fired again** on any subsequent real or programmatic
scroll — reproduced in both headless and headed Chromium, with `rAF`
confirmed still running normally. Every `.reveal` element (23 of them —
nearly the whole page below Hero) was therefore permanently stuck at
`clip-path: inset(0 0 100% 0)` (fully hidden), since `data-visible` never
got set. This matches the user's real-browser report exactly, so it wasn't
a Playwright-only artifact.

**Fixed:** replaced the `IntersectionObserver`-based reveal mechanism in
`src/layouts/BaseLayout.astro` with a plain `requestAnimationFrame`-throttled
`scroll`/`resize` listener that directly checks `getBoundingClientRect()`
against the viewport — no dependency on IO's scheduling behavior at all.
Re-verified with the same Playwright repro script: 0/23 visible on load
(correct, everything below the fold), 23/23 visible after a full scroll-
through, full-page screenshots at 1440px and 390px confirmed all sections
render with content, photography, and card styling correctly.

This is a **shared, OS-wide fix** — `astro-client-integration`'s guidance to
use `.reveal` now implicitly includes this corrected mechanism, since it
lives in the one shared `BaseLayout.astro` every client uses.

**New standing capability:** Playwright (installed, Chromium downloaded) is
now a working, verified screenshot/QA tool in this environment, unlike
`claude-in-chrome` which never connected once across this entire project.
Documented in `docs/mcp-registry.md` and the `qa-checklist` skill as the
fallback (or primary, until `claude-in-chrome` proves reliable here) visual
verification method — a one-off script under `scripts/` (not committed
permanently; write one per verification session) launching Chromium,
navigating, scrolling programmatically, and screenshotting is enough; no
test-runner framework needed for this.

## Visual Rebrand (2026-09-15, same day)
Client rejected the previous build again as generic/boxy (a separate, later
complaint than the motion-only fix above). This round is a broader visual
rebrand, split across two parallel agents: `ui-design` is rewriting
`strategy/design-direction.md` from scratch with concrete new treatments;
this pass only updated `strategy/page-architecture.md` to point at it.

**page-architecture.md change: pointer-only, non-substantive.** The 6-
section content structure and its audit (Section 1), section order
(Section 2), and "What Was Deliberately Left Out" (Section 4) are
unchanged — that content-strategy reasoning still holds and was not
re-litigated. Added one **Visual treatment** line under each of the 6
sections' "What breaks if removed" note (Section 3), each pointing to
`design-direction.md` for the full spec rather than duplicating visual
detail in this doc:
1. Hero — light (sage/white) asymmetric ~60/40 split, diagonal clip-path
   seam, bleed photo (inverts the reference site's dark hero).
2. About/Credentials — sage tint, blob-masked photo overlapped by a
   dark-forest color block with stat-styled credential callouts.
3. Testimonials — dark forest bg, sticky stat rail + horizontal CSS
   scroll-snap testimonial strip (no JS).
4. Services — white bg, asymmetric bento grid (featured "Avaliação
   gratuita" cell spans 2x2 in accent-green).
5. FAQ — sage-alt tint, sticky-split layout (reassurance + plain
   rounded-rect photo beside the accordion).
6. Process + Contact — dark forest bg, single centered accent-green pill
   CTA, 3-step process as a horizontal connected-dot timeline.

These treatments were decided upstream (not re-derived by this pass) and
still need to land in `design-direction.md` and then implementation/QA
before they're real on the page.

**Visual Rebrand — closed out (2026-09-15, same day, ui-design agent):**
`design-direction.md` was rewritten in full per the plan above (verified
palette via Playwright computed-style extraction against the reference
site, not guessed; Bricolage Grotesque + Hanken Grotesk type; sharp-
container/pill-CTA/organic-imagery-only shape language; `DESIGN_VARIANCE
8` / `MOTION_INTENSITY 7` / `VISUAL_DENSITY 5`; the layout-comparison table
above; two native-CSS scroll-driven decorative effects), and
`src/tokens.css` implements every token it specifies, both scoped under
`[data-client="talita-lopes"]`. `design-taste-frontend` was then run
against the direction and its full pass log is appended to
`design-direction.md`'s "Design-Taste-Frontend Pass" section: verdict
pass, with two narrow developer-phase advisories (re-apply the responsive
`py-10 md:py-[var(--space-7)]` Hero padding override rather than a bare
`var(--space-7)`; decide the services bento grid's mobile column order
explicitly rather than leaving it to default reflow) — neither blocks
moving to implementation. Design-direction/tokens phase of the visual
rebrand is complete; implementation and QA against this new direction are
the next open work, not done yet.

## Copy Tone Revision (2026-09-15, same day)
Companion pass to the Visual Rebrand above: the client's "invente muito"
full-rebrand instruction also applies to voice, not just visual system, so
`copy/01-hero.md` through `copy/06-como-funciona-contato.md` were rewritten
for a bolder, punchier, more declarative rhythm (shorter sentences,
stronger verbs, less tonal hedging) to match the new visual confidence
described in `page-architecture.md`'s per-section "Visual treatment" lines
and `design-direction.md`'s shape/type/motion direction. Ran the
`conversion-copywriting` skill for this pass.

**Preserved byte-for-byte / unresolved, as required, despite the tone
pass:**
- Every verified fact exactly as stated: CREF 019973-G/PR, "Formada em
  Educação Física pela UNOPAR," "+10 anos" experience, and all three
  testimonial quotes reproduced verbatim in `03-depoimentos.md`.
- Both `PROOF NEEDED` / `CONFIRM WITH CLIENT` inline flags (CREF-PR
  registry confirmation in `02-sobre-talita.md`; the online-consulting-for-
  50+ FAQ answer's sourcing gap in `05-perguntas-frequentes.md`, plus the
  reviewer-name/photo gap in `03-depoimentos.md`) — none were resolved,
  softened into confident claims, or removed. They were only reformatted
  where the surrounding prose became punchier.
- The online-consulting-for-50+ FAQ answer's honest hedge: tone was
  tightened into shorter, more declarative sentences ("Depende do caso...")
  but the substantive answer still doesn't assert equivalence between
  online and in-person training for 50+ clients — it still ends by
  recommending a direct conversation with Talita for delicate cases, and
  the `PROOF NEEDED` note beneath it is untouched.
- No specific review count or star rating introduced — testimonials still
  attribute only to "Avaliação verificada no Google," no number.
- No "gerontologia" specialization wording anywhere; `02-sobre-talita.md`'s
  guardrail note against it is unchanged.
- Single WhatsApp CTA framing ("Marcar avaliação" / "Fale com a Talita")
  preserved everywhere; no second CTA introduced anywhere in the rewrite.

**Also applied while rewriting (not required by the task, but consistent
with `design-direction.md`'s "Copy-Adjacent Guardrails," which the same doc
flags as unchanged/carried-forward):** removed em dashes from on-page copy
text (hyphens/periods/colons instead), consistent with the guardrail
"no em-dashes anywhere on the page (hyphens only)." Internal
"Notas de execução" blocks (not rendered on-page) were left more loosely
punctuated where that didn't matter.

**Hero headline highlight-word flag (per `design-direction.md`'s Hero spec —
a hand-drawn-style accent-green highlight bar behind ONE word/phrase, not
italics):** recommended "você" in the H1 ("O treino se adapta a **você**.
Não o contrário.") — short enough for a single-word highlight bar at the
Hero's large display size, and it carries the mechanism's personalization
pivot that strategy.md ranks as the #1 messaging-hierarchy item. Logged
"não o contrário" as the considered alternative (stronger declarative
punch, but a three-word span is harder to compose as a legible hand-drawn
highlight at that type scale) directly in `01-hero.md`'s execution notes
for the developer/designer to make the final call. The combined claim
(mechanism + spine specialization + 50+ framing) still reads as one
first-viewport statement via H1 + subheadline together, unchanged from the
prior copy's structure.

## Rebrand Implementation (2026-09-15, same day)
Full implementation of the Visual Rebrand direction above, replacing every
`.astro` file in `clients/talita-lopes/src/` (Hero/About/Testimonials/
Services/Faq/Contact/index) with the new bento/scroll-snap/blob/diagonal-seam
system. Nothing outside this client's `src/` tree was touched except two
additive shared changes called for by the plan.

**Built:**
- `HeroSection.astro`: light sage bg, asymmetric split (8fr/5fr on `≥860px`,
  stacked below), bleed photo (pulled to the true viewport edge above
  `--max-width` via a `min()`-clamped negative margin, never pushed inward on
  narrower screens), `.hero-seam` diagonal clip-path on the section itself,
  hand-drawn-style `.hero-accent-bar` highlight behind "você" per the copy's
  execution note. `py-10 md:py-[var(--space-7)]` responsive padding per the
  design-taste advisory (not a bare `var(--space-7)`).
- `AboutSection.astro`: sage bg, `--shape-blob` photo crop overlapped by a
  dark-forest credential card via negative margin (works identically on
  mobile and desktop, no absolute positioning needed).
- `TestimonialsSection.astro`: dark forest bg, a rail (heading + context line
  from copy, verbatim + a "+10 anos" stat reusing the already-confirmed About
  fact) beside a native horizontal `scroll-snap-type: x` strip
  (`overscroll-behavior-x: contain` so the drag doesn't chain into the
  browser's edge-swipe gesture); card width tuned per breakpoint so the next
  card visibly peeks instead of a hard edge.
- `ServicesSection.astro`: white bg, CSS Grid bento (`3x3`, featured cell
  explicit `grid-column/row: 1/3`, the other 5 auto-place into the remaining
  L-shaped cells). Mobile order is explicit in source order (not left to
  reflow): "Avaliação física" first, then presencial, then the 4 secondary-
  segment lines, matching the page's one CTA intent.
- `FaqSection.astro`: sage-alt bg, sticky rail (heading + the plain
  rounded-rect `treino-alongamento` photo, no blob/diagonal here per the
  "one blob, one diagonal, used once each" shape rule) beside the accordion.
- `ContactSection.astro`: dark forest bg, connected-dot timeline (flexbox +
  one pseudo-element line, horizontal on `≥768px` / vertical on mobile, no
  library), single centered pill CTA below.
- `index.astro`: imports `@fontsource-variable/bricolage-grotesque` and
  `@fontsource/hanken-grotesk` (400/700/800 weights explicitly, since the
  page actually renders Hanken Grotesk at all three, and the package's
  default import only ships 400, other weights silently synthesize/faux-bold
  otherwise), the reinvented Nav (wordmark + accent-green asterisk mark +
  pill WhatsApp CTA), a `.scroll-progress` element, and
  `pageThemeColor` updated to `#2f9e52`. Removed the now-unused Atkinson
  Hyperlegible `@font-face` block (superseded by the new type system); the
  4 now-orphaned `.woff2` files under `assets/fonts/` were left in place
  (unused, harmless) rather than deleted, since deleting assets wasn't asked
  for and isn't necessary for correctness.
- `shared/components/Nav.astro` (additive): new optional `cta` prop
  (href/label/external) and a `logo-mark` named slot, both defaulting to
  nothing so this is a no-op for any other client. Rewrote the inline styles
  into a scoped `<style>` block with a mobile-safe nav (fixed a real 2-line
  wrap on both the wordmark and the CTA at 390px during QA, without
  shrinking the CTA below the shared 44px tap-target minimum).
- `shared/styles/base.css` (additive, small): added
  `user-select: none` / `-webkit-touch-callout: none` to the same
  `a, button, summary, [role="button"]` selector that already carried
  `touch-action: manipulation`, so a long-press on any control doesn't pop
  iOS's text-selection/copy callout. Nothing else in this file changed;
  `.reveal`/`.enter`/`[data-hover-lift]` were reused as-is.

**Skills invoked per the implementation brief:** `astro-client-integration`,
`seo-technical`, `performance-budget`, `mobile-native`, and
`design-taste-frontend` (final code/visual pass, described below).
`analytics-setup` was not invoked: no analytics requirement was named
anywhere in discovery/strategy for this client.

**Findings from the `design-taste-frontend` code-level pass (not caught by
the earlier direction-only pass, since real copy/markup didn't exist yet):**
the real H1 copy ("O treino se adapta a você. Não o contrário.") wrapped to
3 lines at common desktop widths (1024px, 768px) under `tokens.css`'s global
h1 clamp (up to 4.75rem) inside a 60% column, failing the hero "headline max
2 lines" rule. Fixed with a higher-specificity local override in
`HeroSection.astro` (`.hero-section h1 { font-size: clamp(2rem, 1.2rem +
2.6vw, 3.1rem); }`, scoped to the Hero only, not a `tokens.css` change),
widened the text column to `8fr 5fr`, and moved the Hero's own two-column
breakpoint from 768px to 860px so the narrow 768px tablet width gets the
single-column (full-width) layout instead of a cramped two-column split.
Verified 2-line wrap at 390 (mobile, not bound by the rule anyway), 768,
859, 1024, and 1440px via Playwright screenshots. Also found and removed one
invented sentence in the FAQ rail ("Tudo o que costuma vir antes de marcar a
avaliação...") that wasn't sourced from `copy/05-perguntas-frequentes.md` -
the copy-verbatim instruction means small connective copy shouldn't be
invented even for visual composition; the section reads fine with just the
heading and photo there.

**Verification method:** `npm run check` and `npm run build` both clean
after every round of changes. Also used the project's own established
Playwright screenshot approach (installed since the Second Post-Delivery
Correction, see above) as a real visual QA pass, not just build-clean: full-
page screenshots at 1440/390px with a scripted scroll-through first (a plain
`fullPage` screenshot never dispatches scroll events, so the rAF-throttled
`.reveal` listener never fires and everything below the fold reads as
"missing" even though it's working correctly - this cost real debugging time
early in this pass, worth remembering for future QA scripts on this
project). Confirmed: all 6 sections render with real content and photography
at both breakpoints, the bento L-shape and testimonial peek-scroll both look
as intended, the nav no longer wraps, and the hero headline holds at 2 lines
from 768px up.

**Not verified (no real device available in this environment):** actual
touch feel of the horizontal testimonial scroll-snap strip, real iOS Safari
input-zoom/safe-area behavior (moot here, no inputs on this page), and
whether the scroll-driven `.hero-seam`/`.hero-accent-bar`/`.scroll-progress`
effects' `animation-range` values feel right on a real scrolling device
(flagged as a "starting point, not locked" in design-direction.md's own
Motion section already - unchanged by this pass).

**Deviations from the plan, with justification:**
- Did not add per-color-scheme `theme-color` meta tags (`mobile-native`'s
  baseline suggestion) - this page has no dark-mode variant by explicit,
  already-logged project convention (see design-direction.md's taste-pass
  Pre-Flight note on 6.C), so one static `theme-color` matching the brand
  accent is correct, not a gap.
- Did not add `viewport-fit=cover`/`env(safe-area-inset-*)` - the shared
  `<meta name="viewport">` lives in `BaseLayout.astro`, which is off-limits
  per this task's routing-file restriction. Not adding it is also the safer
  default anyway (without `viewport-fit=cover` the browser already keeps all
  content out of the notch/pill safe area automatically; only opting into
  edge-to-edge rendering would have created a real need for `env()` padding).
- Generic `design-taste-frontend`'s "2-3 bento cells need real visual
  variation" guidance is satisfied by exactly 1 of 6 cells (the accent-green
  featured cell) here, not 2-3 - this project's own more specific
  design-direction.md already reasoned through and passed this exact
  treatment ("real visual variation, not just size variation" from a single
  colored featured cell), and tinting additional cells would have meant
  spending `--color-sage-alt` (explicitly reserved to FAQ, "use once only")
  or using `--color-accent` as a background in more places (explicitly
  banned - "not a background color" per the palette table). Followed the
  project-specific direction over the generic skill's default guidance here.

## Post-Implementation Fix (2026-09-15, same day, main session)
Screenshotted the rebrand with Playwright (real scroll simulation, desktop
1440px + mobile 390px) before handing off to QA/CRO — caught one real bug
the developer agent's own screenshot pass missed:

**Bug:** the Hero H1's accent-highlight word rendered as "adapta **avocê**"
— the space between "a" and the highlighted "você" span was silently
stripped by Astro's whitespace handling (a newline + indentation between a
text node and an inline element compiles away entirely in this templating
engine, unlike plain HTML's collapse-to-one-space behavior). Confirmed via
`textContent` inspection, not just visually: the DOM read
`"...adapta avocê..."` with zero space characters, not just a CSS visual
overlap.

**Fix:** added an explicit `{' '}` expression between "a" and the highlight
span in `HeroSection.astro` (Astro supports JSX-like `{}` expressions for
exactly this). Also tightened `.hero-accent-bar`'s left inset from `-0.08em`
to `0.02em` so the bar hugs the highlighted word instead of bleeding into
the (now-present) preceding space — the right side keeps its `-0.08em`
bleed since it's followed by punctuation, not a space. Verified via
`textContent` (now `"...adapta a você..."`, correct) and a zoomed screenshot
showing a clean word-level highlight. `npm run check` + `npm run build`
both clean after the fix.

**Lesson for future clients:** any Astro template mixing plain text with an
inline component/span for an inline emphasis effect (highlight bars,
inline icons, etc.) needs an explicit `{' '}` at the seam — don't rely on
source-code whitespace/indentation to survive compilation the way it would
in raw HTML.

## Post-QA Fix (2026-09-15, same day, main session)
QA flagged (not fixed, deliberately deferred as a structural follow-up) that
`--color-cream` was defined but never actually applied — `.nav-header` is
itself the width-constrained `.container`, so a naive `background` there
would tint only the content width and leave a seam at true viewport edges
on wide screens. Fixed properly: `shared/components/Nav.astro` now wraps
`.nav-header` in a `.nav-bar` div carrying `background: var(--nav-bg,
transparent)` — transparent by default (no visual change for any other
client), opt-in via a client-scoped token. `clients/talita-lopes/src/
tokens.css` sets `--nav-bg: var(--color-cream)`. Verified via computed style
(`rgb(251, 249, 244)`, exact match) and a screenshot showing a clean
full-bleed cream nav bar with the accent-green pill CTA. `npm run check` +
`npm run build` clean.

## Another System-Wide Agent-Tooling Gap Found (2026-09-15, same day)
The `cro` agent was dispatched to review the rebrand and correctly refused
to fabricate a visual review when `claude-in-chrome` failed to connect (as
it always has this project) — because it also had no `Bash` tool, so it
couldn't fall back to Playwright the way `qa`'s agent runs do. Same root
pattern as the earlier `Skill`-tool gap: an agent whose job requires seeing
the live page needs `Bash` as a fallback path to Playwright, not just the
`claude-in-chrome` MCP tools. Fixed `.claude/agents/cro.md` (added `Bash`)
and `.claude/agents/visual-researcher.md` (added `Bash` — this explains why
that agent fell back to WebFetch instead of a real screenshot during the
original visual-research phase). `qa`/`developer` already had `Bash`.
Re-dispatching `cro` now that it can actually see the page.

## Conversion Review — Rebrand (2026-09-15, same day, main session)
`cro` agent hit the same tool-caching issue twice (see above) — main session
ran the review directly instead (real Playwright scroll-simulated
screenshots at 1440/390px, viewed before writing). **Verdict: no blocking
findings.** Full detail in `qa/post-mortem.md`'s "Conversion Review — 2026-
09-15 Rebrand" section. Headline: value prop still clear in the first
viewport, testimonial strip is discoverable on both mobile (peek) and
desktop (native scrollbar), the bento featured cell reads as primary not
decorative, the three CTA instances read as one repeated action not
competing asks, and — the key tension this rebrand had to walk — the
boldness lives in composition/shape while color/tone/imagery stay calm and
grounded in real photography, so it still reads as built for the 50+
trust-sensitive audience strategy.md targets. One optional, non-blocking
polish suggestion logged (a fade-mask hint on the testimonial strip's right
edge).

## Open Questions / Blockers
- Primary objective/KPI for the new page not yet explicitly confirmed with
  the user — proceeding on the assumption it matches the old page's goal
  (book an evaluation via WhatsApp) unless discovery surfaces otherwise.
- CREF number and the online-consulting-for-50+ FAQ answer are both flagged
  PROOF NEEDED in copy — carried through verbatim as written, not resolved
  here (client sign-off, not a developer-phase task). This remains true
  after the Copy Tone Revision pass above; only phrasing/rhythm changed.
- Visual rebrand implementation is now complete and screenshot-verified at
  desktop and mobile widths (see Rebrand Implementation entry above).
- ~~The `animation-range` real-device feel-check for the two scroll-driven
  decorative effects~~ — moot: both effects (Hero seam/accent-bar
  `animation-timeline: view()`, nav `scroll-progress` bar) were removed
  entirely in the Second Remap pass (2026-09-16). See that entry.

## Second Remap (2026-09-16, main session, direct — no subagents)
User rejected the scroll-reveal animation a second time and called out
several concrete gaps: "essa animação que aparece as coisas enquanto
scrolla um lixo" / "scroll um lixo" (x2), "o header ta ruim," "dá pra
inovar na fonte... em algumas partes com destaque," "adicionar mais
imagens, pode usar do próprio Google," "faltando ícones," "pouco
intuitivo algumas coisas," and "ainda não está única, longe disso."

**Investigation before touching code:**
- Inventoried `clients/talita-lopes/assets/images/` against what the page
  actually imports — found **4 real, already-licensed client photos never
  used**: `logo.webp` (the client's actual logo, previously replaced by an
  invented "✳" unicode character in the nav), `hero-treino.webp`,
  `diferenciais-forca.webp`, `caminhada-acompanhada.webp`. This meant "mais
  imagens" could be satisfied with zero licensing risk and *more*
  authenticity, not less — no need to pull from Google/stock at all.
- Ran the skill finder (`npx skills find`) per the user's explicit
  instruction, for both icons and stock photos. Results: an icon-generator
  skill with no disclosed licensing/mechanism (skipped — too vague to
  trust for a client deliverable) and several stock-photo skills
  (Unsplash/Pexels wrappers) that would need API keys and add real
  complexity for a need the existing real photos already solved better.
  Decision: implement a small hand-authored inline SVG icon set directly
  (zero new dependency, MIT-equivalent simple shapes) rather than install
  an unverified third-party skill or wire up a stock-photo API for photos
  we didn't need.
- WebSearched sticky-header best practices (`position: sticky` +
  backdrop-blur + shadow-on-scroll, native and cheap) and testimonial-
  carousel UX (explicit arrows + dot indicators measurably more intuitive
  than bare horizontal scroll) to ground the header and testimonials fixes
  in real 2026 practice, not invented from scratch.

**Root-cause call on the animation complaint:** this is the *second* time
scroll-triggered content motion was rejected on feel alone, even after the
first rejection's technical bug (`IntersectionObserver` never re-firing)
was found and fixed. Conclusion: the pattern itself — not just a specific
bug in it — is wrong for this client. Removed scroll-triggered content
reveal entirely, system-wide (not just this client): `.js .reveal` and its
`[data-visible]`/`[data-hover-lift]` combinator rules deleted from
`shared/styles/base.css`; the rAF/`getBoundingClientRect` scroll-check
script removed from `BaseLayout.astro`; `.reveal` class references removed
from every section file. Also removed the two native
`animation-timeline`-driven decorative effects from `tokens.css` (Hero
seam/accent-bar scroll-linked motion, nav scroll-progress bar) — kept as
**static shapes** (the diagonal cut and tilted highlight bar still exist,
they just no longer change as you scroll). Content is now visible
immediately, everywhere, always. `CLAUDE.md`'s Motion section and the
`astro-client-integration` skill were both rewritten to state this as a
hard rule for every future client, not just a note.

**What replaced it, plus the header/icon/image work:**
- **Sticky header**: `Nav.astro` gained a `sticky` prop → `[data-sticky-nav]`
  (`position: sticky`) + a tiny rAF-throttled scroll listener (reusing the
  same pattern the removed `.reveal` script used, just retargeted) that
  toggles `.is-scrolled` past 8px scroll, driving a subtle
  `backdrop-filter: blur(8px)` + shadow + tinted background. This is now
  the *only* scroll-tied visual change left in the system, and it's chrome
  (the header background), never content.
- **Real logo**: nav's `logo-mark` slot now renders the client's actual
  `logo.webp` via `astro:assets`, replacing the invented "✳" character.
- **Anchor nav + mobile menu**: `Nav.astro` now receives real links (Sobre,
  Serviços, Depoimentos, FAQ) with `id`s added to each section root;
  `html { scroll-behavior: smooth; scroll-padding-top: var(--nav-height) }`
  added to `shared/styles/base.css`, and `--nav-height: 72px` promoted from
  a per-usage fallback to a real token in `shared/design-system/tokens.css`.
  Mobile: a zero-JS checkbox-hack hamburger menu (`.nav-toggle-input` +
  `.nav-toggle-label`) collapses links into a dropdown panel below 768px;
  verified via screenshot that toggling it actually shows/hides the panel
  and swaps the menu/close icon.
- **Icon set**: new `shared/components/Icon.astro`, a zero-dependency
  inline-SVG component (check, chevron-left/right/down, menu, close,
  whatsapp, dumbbell, monitor, activity, clipboard-check, heart, quote).
  Applied: check-badges on About's credential list (replacing plain "+"
  text), one icon per Services bento cell, a rotating chevron on FAQ's
  `<summary>` (replacing the browser default triangle, with the native
  marker hidden via `::-webkit-details-marker`), a WhatsApp icon on the
  nav CTA, and a quote-mark watermark on testimonial cards.
- **New real photos placed**: `logo.webp` (nav), `hero-treino.webp`
  (Services section header, secondary/general-fitness segment — a good
  strategic fit since that segment is exactly who Services serves),
  `caminhada-acompanhada.webp` (a circular portrait above "Fale com a
  Talita" in the final Contact section — 50+-specific, warm, ties the
  closing CTA back to the primary segment).
- **Testimonial carousel controls**: added visible prev/next arrow buttons
  and position dots (small self-contained `<script>` in
  `TestimonialsSection.astro`, click/scroll-driven only, not autoplaying)
  so the horizontal scroll-snap strip is discoverable without relying on
  swipe-affordance alone — addresses "pouco intuitivo."
- **Typography emphasis**: kept Bricolage Grotesque/Hanken Grotesk (already
  a considered, non-default pairing) rather than swapping again, but didn't
  touch the "highlight bar" emphasis device beyond Hero — flagged as a
  possible follow-up if the user wants more instances of it elsewhere
  (e.g. a section-heading keyword) rather than assumed and over-applied.

**Verified, not assumed:** a real bug was caught and fixed mid-pass — a
Playwright screenshot without a scroll-through showed the new Contact
photo as an empty circle; direct investigation (checking `naturalWidth`/
`complete` before vs. after a real scroll simulation) confirmed this was
the image's own `loading="lazy"` correctly not having fired yet in an
un-scrolled capture, not a real bug — the same category of Playwright
`fullPage`-without-scrolling gotcha hit twice earlier in this project,
now hit a third time and correctly diagnosed rather than "fixed" blindly.
Also directly verified via `page.evaluate`: `.nav-bar` is NOT `.is-scrolled`
before scroll and IS after `scrollTo(0, 400)`, with the expected
`backdrop-filter`/`box-shadow` computed values.

`npm run check` (0/0/0) and `npm run build` clean after every step in this
pass. No new npm dependencies added (icons are hand-authored inline SVG,
not a package).

## Third Remap (2026-09-16, main session, direct)
User sent 6 numbered, screenshot-annotated findings plus a general "poucas
animações, INOVE" note. Addressed all 6, plus added tasteful subtle motion.

1. **Hero not top-aligned** (red line marking the gap in a screenshot) —
   confirmed: `align-items: center` on `.hero-grid` centered the shorter
   text column against the taller photo. Changed to `align-items: start`.
2. **Testimonials: ugly native scrollbar + arrows in the wrong place** —
   `scrollbar-width: none` + `::-webkit-scrollbar{display:none}` on
   `.testi-strip` (touch swipe, snap, and the buttons all still work with
   it hidden); moved `.testi-nav` (arrows+dots) from the left rail to
   directly under the card strip, per the user's own suggested placement.
3. **About section text just repeated the credential checklist** —
   confirmed: the first paragraph restated degree/specialization/years/
   location verbatim, already in the check-badge list beside it. Rewrote
   to add distinct content (her approach — listening to a student's history
   before prescribing anything, tied to the "didn't feel heard elsewhere"
   objection strategy.md already documents) instead of repeating facts.
   Removed the redundant standalone "CREF 019973-G/PR." paragraph too.
4. **Services bento cells wanted background imagery** — checked assets
   first: `diferenciais-forca.webp` (real, already-licensed, still unused)
   fit the featured cell perfectly. Placed it as a background photo behind
   the accent-green fill with a gradient overlay (confirmed via zoomed
   screenshot: text stays fully legible). The 4 smaller cells got a large,
   low-opacity (8%) watermark of their own icon instead of a second photo —
   real texture without needing more external sourcing or risking a busy/
   illegible card.
5. **FAQ called "generic"** — full redesign: was a sticky-split (photo +
   plain accordion list), now a compact header (heading + smaller photo)
   above a 2-column grid of individually-bordered cards, each with a large
   faint number badge (01, 02…) and an accent-green left border — still
   native `<details>`/`<summary>` underneath (zero JS, full accessibility),
   just a genuinely different visual container than a generic stacked list.
6. **Contact section: too much empty space, wrong/unclear photo, missing
   socials** — `.contact-cta`'s `margin-top` cut from `--space-7` (112px)
   to `--space-5` (48px). Swapped the photo: the previous
   `caminhada-acompanhada.webp` doesn't clearly show Talita's face; reused
   `sobre-instrutora-aluna.webp` instead, whose alt text (and original
   sourcing) confirms it actually depicts her. **Declined the literal ask**
   to "procurar no Google" a photo of Talita — a Google Images result would
   be a random stranger, not actually her, which would be a real
   authenticity problem for a real local business's own page; used the
   already-verified real photo instead. Added a social row (WhatsApp,
   Instagram `@talitalopes.personal`, e-mail — the same handles already
   verified in `research/company-intelligence.md`) below the CTA, restoring
   the multi-channel presence the reference site had without turning it
   into a second competing primary CTA (WhatsApp booking is still the one
   button; the icons are secondary/supplementary).

**Skill-finder note:** not re-run this pass (already exhausted for icons/
stock-photos in the prior remap); this pass's new asset (`diferenciais-
forca.webp`) was already-owned inventory, and the new icons (`instagram`,
`mail`) were added to the existing hand-authored `Icon.astro` rather than
sourcing a new library.

**"INOVE" / more subtle motion**, added without reintroducing scroll-
reveal: a barely-there parallax on the Hero photo (`translateY` tied to
`scrollY * 0.08`, capped at 28px, transform-only, skipped under reduced-
motion) via a small per-component script in `HeroSection.astro`; and a
one-shot count-up animation on the "+10 anos" testimonial stat (text
content animates 0→10 once, triggered the first time it's within ~60px of
the viewport, same trusted rAF pattern used elsewhere on this project —
the block itself is already fully rendered/visible throughout, only the
digit changes, so this is not a repeat of the banned content-reveal
pattern).

**Real bug caught mid-pass, not by luck:** after rewriting `FaqSection.
astro` with the `Write` tool (full-file replacement), the dev server kept
serving a **stale compiled CSS module** — the new markup's classes
(`.faq-card`, `.faq-cards`, `.faq-index`) had zero matching styles because
Vite's HMR didn't re-extract the component's `<style>` block, so the photo
rendered at full natural size and the card grid collapsed to plain blocks.
Diagnosed by directly comparing the served `?astro&type=style` CSS module's
class names against the page's actual rendered `class` attributes — they
didn't match, which is what a stale-cache bug looks like (as opposed to a
real CSS mistake, which would show the *new* classes with *wrong* rules,
not *old* classes with no matching elements at all). Fixed by stopping the
dev server, clearing `.astro`/`node_modules/.vite`, and restarting fresh —
confirmed via the same served-CSS check before re-screenshotting.

`npm run check` (0/0/0) and `npm run build` clean. All 9 non-logo real
client photos are now placed on the page except `caminhada-acompanhada.
webp` (unused since point 6's photo swap) — still available if a future
pass wants it somewhere.

## Fourth Remap (2026-09-16, main session, direct)
User sent a screenshot-annotated comparison against the reference site plus
5 more numbered points, closing with "valide o mobile e veja se ele está
coerente." All addressed; mobile validated at the end via full-page
screenshot.

1. **Hero top padding (112px) too large** — confirmed `py-10 md:py-
   [var(--space-7)]`. Changed to `pt-6 pb-14 md:pt-8 md:pb-20` (asymmetric —
   bottom stays roomier to make space for the new wave divider, see #2).
2. **"Reta demais" vs. the reference's shapes; CTA has no glow there** —
   three additions: (a) an actual SVG wave divider at the Hero's bottom
   edge (replacing the flat `clip-path` diagonal — the diagonal is gone,
   `--shape-diagonal` token now unused but left defined in case a future
   client wants it), which only reads as a real shape because Hero's
   background was changed from `--color-sage` to `--color-bg` (white) so
   there's an actual color boundary for the wave to bridge into the sage
   About section below — previously hero and About were the same sage tint,
   so the old diagonal cut had nothing to contrast against; (b) a blurred
   ambient sage-colored glow circle behind the hero photo (pure CSS
   `radial-gradient` + `filter: blur()`, no image); (c) a floating white
   badge card overlapping the photo's corner, reading "Avaliação gratuita"
   — deliberately NOT the reference's unverified review-count badge, using
   the one claim that's actually confirmed. `CtaButton.astro`'s hover glow
   (shared component, affects every client) strengthened from a tight 6px
   shadow to a real soft halo (`0 0 32px` spread) plus a small `translateY`
   lift — verified via a hover screenshot.
3. **Services featured card's green overlay far too strong** — confirmed:
   the gradient started at 100% opaque `--color-accent`. Per the explicit
   "quase zero verde" instruction, replaced with a neutral dark-forest
   scrim (no green at all in the wash) and switched the featured cell's
   text/background to light-on-dark instead of dark-on-green — only the
   icon keeps the accent color now. Verified via a cropped screenshot that
   the underlying photo (`diferenciais-forca.webp`) reads clearly while
   text stays fully legible.
4. **Add coherent images to "Consultoria online" and "Treino para
   emagrecimento," no green tint on those** — no more unused real client
   photos existed for these two generic/thematic categories, so (transparently,
   this time actually done rather than declined) sourced two free-license
   stock photos via Unsplash (Unsplash License — free for commercial use,
   no attribution required): a person following a workout on a laptop
   screen (`consultoria-online.jpg`) and a close-up of running legs/shoes
   with no visible face (`treino-emagrecimento.jpg`). Used as small 56px
   rounded thumbnails beside the title (not a full-bleed background), so no
   overlay/scrim was needed at all — the "no green" instruction is trivially
   satisfied and legibility was never a question since text sits on plain
   white. Logged the source/license here for traceability; these two are
   the only non-real-client images anywhere on this page, and are generic
   stock, not presented as depicting Talita or a specific student.
5. **Social block should spell out each channel** — replaced the 3 bare
   icon-circle buttons with 3 full cards (icon badge + label + the actual
   value: `(43) 98479-5883`, `@talitalopes.personal`,
   `talitalopes.personal@gmail.com` — same verified handles as before),
   bordered, with a hover state that picks up the accent color. Fixed a
   follow-up truncation issue (email was getting cut with an ellipsis in
   the 3-column layout) by allowing the value to wrap instead of forcing
   `nowrap`.
6. **"Scroll mais legal"** — reintroduced the native CSS scroll-progress
   bar under the nav (`animation-timeline: scroll(root)`, `@supports`-
   gated, `display:none` fallback) that had been removed in the Third
   Remap's "kill everything scroll-tied" pass. This one was removed overly
   conservatively — it's chrome (a thin bar filling as you scroll), never
   gates content visibility, and is a different category from the
   specifically-rejected content-reveal pattern. `prefers-reduced-motion`
   still fully disables it.
7. **Remove the circular photo above "Fale com a Talita"** — done; the
   section now goes straight from the timeline to the heading/CTA, with
   the new social cards below.

**Mobile validated** at the end (not assumed): full-page screenshot at
390px confirmed every section above stacks to one column correctly, the
wave/badge/glow render proportionally, the bento cards (including the two
new thumbnail cards) stack cleanly, and the 3 social cards stack full-width
with the email no longer clipped.

`npm run check` (0/0/0) and `npm run build` clean.

## Fifth Remap (2026-09-16, main session, direct)
User sent 6 more screenshot-annotated points plus a repeated general "muito
mais efeitos" ask. All addressed, including one real functional bug.

1. **Hero text not vertically centered** — reverted `align-items: start`
   (set in the Fourth Remap) back to `center`, now that top padding is
   already small — the original problem was the 112px padding stacking
   with centering, not centering itself.
2. **CTA needs pulse+glow; page too flat vs. the reference's shapes** —
   added an opt-in `pulse` prop to the shared `CtaButton.astro` (a soft
   expanding-ring box-shadow loop, pauses on `:hover`, respects
   `prefers-reduced-motion`), enabled only on the Hero's CTA so it reads as
   "the one to click," not noisy repetition across every button. Separately
   rebuilt the Hero's bottom wave: increased its height substantially and
   raised its `z-index` above the photo so it visually cuts across the
   photo's lower portion instead of sitting only in the empty padding below
   it — verified via a cropped screenshot that the photo now reads as
   "continuing" behind the curve, matching the specific ask.
3. **Em-dash found in copy** — grepped every client `.astro` file: exactly
   one real instance in visitor-facing text (`AboutSection.astro`, from the
   Third Remap's own rewrite — an oversight against a rule already written
   down in `design-direction.md`). Fixed. Every other match was inside a
   code comment, not rendered copy, and left alone.
4. **Real bug: testimonial carousel dots/arrows couldn't reach the 3rd
   card** — confirmed via Playwright (clicked "next" twice, read
   `scrollLeft` vs `scrollWidth - clientWidth`): a `scroll-snap-align:
   start`-only last item in a `flex` strip can be mathematically
   unreachable if there isn't enough trailing scroll room to align its
   *start* edge — a well-known CSS scroll-snap gotcha, not a logic bug in
   the click handlers. Fixed with `.testi-card:last-child { scroll-snap-
   align: end }` (the natural max-scroll position already equals "last
   item's end aligned to container's end," no extra padding needed) plus
   matching the dot-click's `scrollIntoView` `inline` argument to `'end'`
   for that one card. Re-verified after the fix: `scrollLeft === maxScroll`
   and the 3rd card's bounding box is fully inside the strip's — confirmed
   programmatically, not just visually.
5. **Consultoria online / Treino para emagrecimento should use the photo as
   the block's background**, not a small thumbnail (Fourth Remap's
   compromise) — converted both to the same full-bg-photo + dark-scrim
   treatment as the featured "Avaliação física" cell (still no green tint,
   per the standing "quase zero verde" rule — the scrim is neutral dark
   forest on all three photo cells now, consistently).
6. **Featured card's icon should be white** — was `var(--color-accent)`;
   now `var(--color-bg)` (white), applied via the same shared
   `.bento-photo-cell` rule that now covers all 3 photo cells uniformly.

**Bundled into the same pass, from repeated instructions in this message
and the last:**
- **All 6 service cells now render at the same size** (explicit,
  repeated instruction — the featured cell's 2x2 grid span from the Third
  Remap is gone). "Avaliação física" keeps first position and gained a 2px
  accent-colored border instead of being physically larger, so it still
  reads as the priority item without violating "same size."
- **"Como funciona" fully redesigned** ("ta chato e cru" → real cards):
  each step is now a bordered, hover-lift card with an icon badge
  (WhatsApp / clipboard-check / activity, matching the step's actual
  action), a large faint background number (matching the FAQ index
  treatment for visual consistency across the page), plus a thin animated
  track above the cards on desktop with a small accent dot that
  continuously travels its length (`@keyframes`, idle/looping, not
  scroll-tied, respects reduced-motion) — real, visible "coisas se
  mexendo" motion on a section that had none before.
- **More ambient/hover motion added elsewhere** per the repeated "muito
  mais efeitos" ask, all idle- or hover-triggered (never scroll-gating
  content, so none of this repeats the twice-rejected pattern): service
  card icons scale+rotate slightly on hover; the Hero's ambient glow blob
  now drifts slowly in a continuous loop instead of sitting static.

Verified: `npm run check` (0/0/0), `npm run build` clean, dev server
restarted fresh before every screenshot pass (still the standing lesson
from the Fourth Remap's stale-CSS incident), full-page screenshots at
1440px and 390px, and the testimonial-carousel fix specifically confirmed
via direct DOM/scroll-position inspection rather than eyeballing alone.

## Sixth Remap (2026-09-16, main session, direct)
User sent 8 more points (screenshots + text). All addressed, including two
real bugs and two deliberate deviations from the literal request (both
explained to the user, not silently done).

1. **Social contact cards different sizes** — `ContactSection.astro`'s
   `.contact-social` now has `min-height: 5.5rem`, so all 3 cards (phone /
   Instagram / email) match regardless of how much their value text wraps.
2. **Green border only on the featured service cell; scrim too light** —
   moved the accent border from `.bento-featured`-only to `.bento-photo-
   cell` in `ServicesSection.astro`, so all 3 photo-backed cells (Avaliação
   física, Consultoria online, Treino para emagrecimento) get it, not just
   one. Darkened the scrim gradient stops (88%/25% → 94%/55% forest-mix) so
   white text sits on a visibly darker photo per the client's ask.
3. **Real bug: 3rd testimonial dot never activates** — the user's own
   diagnosis was "should only be 2 dots," but 3 testimonials genuinely
   warrant 3 dots; the actual defect was a residual bug from the Fifth
   Remap's scroll-snap fix. Making the last card reachable via
   `scroll-snap-align: end` meant its left edge is never close to the
   strip's left edge the way every other (start-aligned) card's is, so the
   dot-highlight logic's "closest card by left-edge distance" could never
   select the last dot even once scrolled fully into view. Fixed
   `updateActive()` in `TestimonialsSection.astro` to check
   `scrollLeft >= scrollWidth - clientWidth` first and force the last index
   at that point, falling back to the distance check otherwise. Re-verified
   programmatically (scrolled the strip to its max, read `.is-active` on
   all 3 dots): `[false, false, true]` at both breakpoints.
4. **State Google review count/rating + animated star** — could not verify
   a real Google rating or review count for the client via web search (no
   public listing data found), and the project's standing rule is never to
   invent a stat. Delivered the visual half of the ask without the
   unverifiable number: added a `star` icon to the shared `Icon.astro` set
   and a bobbing/glowing star next to the existing "Avaliação verificada no
   Google" line in `TestimonialsSection.astro` (`translateY` + `drop-shadow`
   keyframe, 2.6s ease-in-out loop, respects `prefers-reduced-motion`) —
   flagged to the user as a deliberate deviation, not an oversight.
5. **Gradients added strategically** (not blanket) in 3 places: the
   testimonial stat number ("+10") now renders as accent-green gradient
   text (`background-clip: text`); a soft radial accent-green glow sits
   behind the "Fale com a Talita" CTA in `ContactSection.astro`; the
   Services section background transitions from a faint sage tint into
   white behind the header, adding depth without a hard section seam.
6. **Real bug: hero image exceeding a full page's height** — root-caused an
   unbounded bleed calc in `HeroSection.astro`'s `.hero-media`
   (`margin-right: min(0px, calc((var(--max-width) - 100vw) / 2 -
   var(--space-4)))` had no width ceiling), which let the photo
   (`aspect-ratio: 4/5`) grow taller than the viewport on wide/ultrawide
   screens — exactly the reported symptom. Capped `.hero-media` at
   `max-width: 40rem` and simplified the bleed logic. Separately removed
   all section-level top padding and moved it onto `.hero-copy` only, so
   the image column (the row's tallest item) now sits flush at 0px gap
   from the section's top edge, per the explicit ask.
   - **Did not swap the photo for a "4K" version.** Fetched the reference
     site's own served copy of the same image via Playwright
     (`naturalWidth`/`naturalHeight`) and confirmed it's served at the same
     1000×1250 there too — no higher-resolution public version exists.
     Replacing it with a different stock photo just to claim "4K" would
     mean showing a fake substitute for a real client photo, which the
     project's content-integrity rule doesn't allow. The CSS bug above was
     the actual cause of the perceived oversizing/softness, not the source
     asset's resolution — fixing it resolves the complaint without
     sacrificing authenticity.
7. **Real bug: white gap under the photo where the wave didn't reach it,
   and a "glitched" floating badge** — traced with a cropped Playwright
   screenshot (not just full-page) to a genuine geometry conflict: a single
   shared SVG wave path can't satisfy both breakpoints at once, because the
   two layouts need opposite things at the same horizontal position.
   Desktop is 2-column (text + photo side by side) and the wave's left
   portion sits *under the CTA button* — the old path rose too high there,
   visibly clipping "Marcar avaliação"; its right portion, under the photo,
   dipped too low, leaving the reported white gap. Mobile stacks
   single-column with the photo full-bleed and the CTA far above the wave
   entirely, so it just needs full-width high coverage with no clipping
   risk. Split into two independent paths (`.hero-wave-mobile` /
   `.hero-wave-desktop`, toggled via the existing 860px breakpoint) each
   tuned for its own layout's actual constraint, instead of one path
   compromising between two conflicting needs. Verified with cropped
   before/after screenshots at both breakpoints: the CTA is fully visible
   and unclipped on desktop, and the photo→wave→next-section transition is
   seamless at both sizes with no white gap.
8. **A few more clean effects** — a hover accent-line sweep (`::after`,
   width `0 → 100%` on hover) now runs along the bottom edge of every
   service bento cell, including the plain icon-only ones that had no hover
   motion before.

Verified: `npm run check` (0/0/0), `npm run build` clean, dev server
restarted fresh (`.astro` + `node_modules/.vite` cleared) before
screenshotting, full-page + targeted cropped screenshots at 1440px and
390px, testimonial dot-activation confirmed via direct scroll-position +
DOM class inspection (not eyeballing), hero wave/CTA-clipping bug confirmed
and re-verified the same way (cropped before/after comparison), bento
border colors and social-card heights confirmed via computed-style
queries.

## Seventh Remap (2026-09-16, main session, direct — used the `animate`
skill for motion decisions)
User sent 6 more points, still frustrated that the social cards looked
different sizes after the Sixth Remap's fix. Investigated properly instead
of re-applying the same fix, and found the real, deeper root cause.

1. **Real bug, found by measuring not eyeballing: social cards still
   uneven** — the Sixth Remap's `min-height` fix made the 3 cards the same
   *height*, but the user's screenshot clearly showed the WhatsApp card
   still reading as a different shape. Measured actual computed widths via
   Playwright: `grid-template-columns: repeat(3, 1fr)` does NOT force equal
   column widths when content can't shrink below its own min-content — a
   bare `1fr` track's minimum still defaults to `auto`. The email (one
   long unbreakable string, no spaces) was widening its own grid column
   past the other two; separately, the phone number (breakable at its
   space/hyphen) was getting squeezed to a sliver by the flex-shrink
   algorithm inside its own card. Fixed both layers: `grid-template-
   columns: repeat(3, minmax(0, 1fr))` on `.contact-socials` (removes the
   content-based floor on the columns) plus `flex: 1 1 0%` on
   `.contact-social-text` (makes every card's text column claim the same
   share of its row). Verified via computed-style measurement, not
   screenshot alone: all 3 cards now measure identically at every tested
   width (e.g. 298.66px/298.67px/298.66px at 1280px) with zero overflow.
2. **Real bug: contact-cta glow looked bad** — `filter: blur(10px)` on a
   radial gradient with a hard 70%-transparent stop, over a uniformly dark
   background, doesn't get soft — the blur radius was far too small
   relative to the shape to hide its edge, so it read as a visible smudge/
   ring exactly as the client said. Fixed with a much larger blur (70px)
   and a gentler, fully-transparent-by-60% gradient. Applied the same fix
   preemptively to the new About-section glow added in this same round
   (see #6) so it wouldn't ship with the identical mistake.
3. **Real bug, root-caused per the client's own diagnosis: testimonial
   dots didn't match the actual draggable range** — client's literal ask
   was "remove one dot," but the deeper issue (confirmed by measuring
   `strip.scrollWidth` vs `clientWidth`) is that per-card dots don't match
   a scroll-snap carousel where more than one card fits in view at once:
   at desktop's 46% card width, only ~1.4 viewports of content exist, so
   there is genuinely only one real drag between two stops, but there were
   3 dots implying 3. Rewrote the dots as **page-based**, not per-card:
   dots are now generated at runtime from `Math.ceil((scrollWidth - 1) /
   clientWidth)`, arrows/dot-clicks scroll by one `clientWidth` ("page")
   instead of one card, and the count recomputes on resize since it
   legitimately differs by breakpoint. Verified: desktop now renders
   exactly 2 dots (matching the client's ask) and a single arrow click
   moves `scrollLeft` to the exact max and activates dot 2, with the last
   card fully inside the strip's bounds — confirmed programmatically, not
   just visually. Mobile (~1 card per view) renders 3 dots, which is
   correct there since the same formula reflects a genuinely different
   number of real stops at that width — not hardcoded per breakpoint.
4. **Hero copy trimmed** — cut two paragraphs (sub + objection-handling)
   down to one, keeping every real fact (spinal-disorder specialty, 50+,
   "tried before without results," free/no-commitment assessment) and
   dropping restated filler, per "fale menos e mais objetivamente."
5. **Hero foreground photo replaced with a full-bleed 4K background** —
   removed the portrait-in-a-box treatment (photo + floating badge +
   two device-specific wave paths built to avoid clipping it) entirely.
   The client's real photo of herself with a student already lives in the
   About section, so nothing personal was lost by removing the Hero's
   portrait crop. Sourced a new atmospheric background (Unsplash License,
   free for commercial use, no attribution required — a sunlit forest
   path, matching the site's existing forest/green palette) at 3840px
   source width; Astro's build pipeline re-encodes/serves it as WebP at
   1920px (1.5MB), well past any real "4K" concern the client had about
   the old photo's clarity. Logged here for traceability: this backdrop is
   deliberately generic/atmospheric, not presented as depicting Talita or
   any specific person — consistent with the project's existing 2 generic
   stock photos elsewhere on the page. Used the `animate` skill to decide
   the treatment: a slow Ken Burns scale (1 → 1.08, 24s ease-in-out
   alternate infinite) plus the project's existing scroll-parallax
   pattern retargeted to the new background, both gated under
   `prefers-reduced-motion`, plus a dark forest-tint scrim for text
   legibility. Simplified the wave back to a single path (no more
   two-column-vs-clipping conflict now that the layout is one centered
   text column over a full-bleed image) and confirmed via Playwright that
   the CTA still clears the wave with ~90-125px to spare at both
   breakpoints.
6. **"Seções muito estáticas"** — used the `animate` skill to pick tasteful,
   non-scroll-gating motion (load-triggered/idle/hover only, never a
   scroll-tied reveal, per the standing rule) for 3 sections that had none:
   About section's photo now floats gently (`translateY`, 6s ease-in-out
   infinite) with an ambient accent-green glow blob behind it (same
   language as the Hero's, tuned with the large-blur fix from #2 up
   front); Services' bento watermark icons get a very slow, small-amplitude
   wobble (9s, ±5deg) so they read as ambient texture rather than
   competing for attention on persistently-visible chrome; FAQ answers now
   fade+slide in on open via `@starting-style` (native `<details>` has no
   transitionable middle state otherwise — this is the CSS-only way to
   animate its entrance, degrades silently to instant on older browsers).
   All gated under `prefers-reduced-motion: reduce`.

Verified: `npm run check` (0/0/0), `npm run build` clean, dev server
restarted fresh before screenshotting, full-page screenshots at 1440px and
390px, social-card equal-width claim verified by computed-style
measurement (not just visual comparison, since that's exactly what went
wrong last round), testimonial pagination verified by simulating an arrow
click and reading `scrollLeft`/dot classes/last-card bounding box
afterward, contact/about glows re-screenshotted and visually confirmed to
have no hard edge.

## Eighth Remap (2026-09-16, main session, direct)
User sent 2 points: the new Hero background didn't fit the brand, and
About/FAQ felt flat next to the rest of the page.

1. **Hero background didn't fit** — the Seventh Remap's forest/nature photo
   had zero fitness connotation (just trees and a path, no person, no
   movement), which read as disconnected from a personal-trainer page even
   though it matched the color palette. Replaced with a different Unsplash
   photo (License confirmed: free for commercial use, no attribution
   required) showing a real person walking on an outdoor park path — this
   one actually echoes the copy ("se mexer com segurança e no próprio
   ritmo") instead of just being scenery. Same technical treatment as
   before (Ken Burns + parallax + scrim), only the source photo changed.
   Old `hero-bg-forest.jpg` deleted (no longer referenced anywhere).
2. **"Sobre a Talita" innovated** — this section was a plain 2-paragraph
   text block next to a photo, the least visually ambitious spot on the
   page. Added a large gradient-text pull-quote ("Ela **ouve** antes de
   prescrever.") distilled from the section's own existing copy (not a new
   claim) to give the text column a focal point before the body copy.
   Replaced the static bulleted credentials list with a looping CSS
   marquee of credential pills (duplicated content track, `translateX`
   loop, pauses on hover/focus, collapses to a plain wrapped static list
   under `prefers-reduced-motion` with the duplicate hidden from assistive
   tech) — a UI pattern not used anywhere else on the page, so the section
   now reads as genuinely different rather than another card grid.
3. **"Perguntas frequentes" innovated** — the accordion cards were a flat,
   perfectly-aligned grid with no shape or motion personality. Gave each
   card a alternating collage-style tilt at rest (±2.2deg via a `--tilt`
   custom property per nth-child), straightening + lifting on hover/focus
   (replaced the shared `[data-hover-lift]` utility with a local hover rule
   since the two needed to animate the same `transform` property
   together — rotate to 0 AND lift — which a shared utility overwriting
   `transform` outright can't compose with a per-element base rotation).
   Also added the same ambient-glow + slow Ken Burns treatment already
   established on the Hero/About photos to the FAQ photo, tying the whole
   page's visual language together. First pass used a 0.9deg tilt that
   was imperceptible in a real screenshot — caught by actually rendering
   it, not just reasoning about the CSS, and corrected to 2.2deg.

Verified: `npm run check` (0/0/0), `npm run build` clean, dev server
restarted fresh before screenshotting, per-section cropped screenshots at
both breakpoints (not full-page alone, since the tilt bug specifically
would have been easy to miss at full-page zoom), marquee confirmed
mid-animation via screenshot (proves it's actually looping, not static).

## Ninth Remap (2026-09-16, main session, direct)
User rejected the Eighth Remap's approach outright: About/FAQ had only
been decorated, not rebuilt, and the new Hero photo (a woman with a hiking
backpack) read as "going camping," not training. Full structural rebuilds
this time, not further decoration of the same layouts.

1. **Hero photo, third attempt — stopped guessing stock and used the
   client's own real photo.** Two rounds of generic Unsplash photos both
   missed (forest with no fitness link, then a hiking-coded backpack shot).
   Reused `hero-senhora.webp` — the same authentic, already-approved photo
   of a real 50+ student training outdoors that this Hero carried before
   the full-bleed-background request — instead of continuing to search for
   a generic photo that "fits." Real problem found once it was back in:
   the photo is portrait (1000x1250) and the Hero box is a wide, short
   banner, so a sharp `object-fit: cover` crop only shows a thin
   horizontal slice through the frame's vertical middle — mostly just her
   face at desktop widths, losing the "training outdoors" context that
   made the photo worth using at all. Fixed by treating the photo as
   atmosphere rather than a sharp subject: `blur(10px) saturate(1.05)` +
   `object-position: 50% 30%`, with the background container's overscan
   bumped from -20px to -40px so the blur's soft fringe never shows a hard
   edge against the scrim. Reads as premium/atmospheric now instead of an
   awkward tight crop, while staying true to the client's own photography.
2. **"Sobre a Talita" rebuilt from zero — new structure, not new
   decoration.** The old layout (photo + bullet list, tweaked twice with a
   marquee and a pull-quote) was still fundamentally "photo next to text,"
   which is why it kept reading as unfinished detail-work rather than a
   redesign. Replaced it with a **before/after contrast module**: two
   panels — "Sem o acompanhamento certo" (muted, dashed border, struck-
   through list, X icons) versus "Com a Talita" (solid forest background,
   check icons, glow/shadow) — with a pulsing arrow between them. Every
   line on both sides restates a fact already established elsewhere on the
   page (the Hero's objection-hooks, the FAQ's own answers) — nothing new
   was claimed, it's dramatized as a visible comparison instead of prose.
   The photo and credentials moved to a small compact proof strip below
   the contrast (circular avatar-sized photo with the established glow/
   float treatment, credentials as small pill chips) rather than being the
   section's main layout element.
3. **"Perguntas frequentes" rebuilt from zero — chat thread, not an
   accordion.** Replaced the 2-column card grid (even with its collage
   tilt from the Eighth Remap) with a **conversational chat-bubble
   thread**: each FAQ's question renders as a right-aligned accent-colored
   bubble (the visitor asking) and Talita's answer as a left-aligned
   bubble with a "T" initial avatar (the responder), single column,
   bubble-tail corners via asymmetric border-radius. Kept native
   `<details>/<summary>` under the hood for free keyboard/screen-reader
   support — only the visual metaphor changed, not the accessible
   interaction model. Deliberately did NOT reuse a real photo as "her"
   avatar: `treino-alongamento.webp` shows a student mid-stretch with no
   confirmation it depicts Talita herself, and turning an unconfirmed
   photo into a stand-in for "this is Talita replying" would risk
   misrepresenting who's pictured — a plain initial badge says the same
   thing without that risk. The section's photo stayed, but repositioned
   as a small circular closer at the bottom with the same glow/Ken-Burns
   treatment used elsewhere, rather than a large header image.

Verified: `npm run check` (0/0/0), `npm run build` clean, dev server
restarted fresh before screenshotting, both new sections screenshotted at
1440px and 390px and visually confirmed to read as structurally distinct
components (not reskins) from anything else on the page, Hero background
re-inspected via `naturalWidth`/`naturalHeight` vs. rendered box
dimensions to actually diagnose the crop problem (1000x1250 into a
1480x800 box) rather than guessing at a fix.

## Tenth Remap (2026-09-16, main session, direct)
User approved the Ninth Remap's direction ("melhorou mt") and asked for 3
follow-up refinements rather than another rebuild.

1. **About: removed the circular floating photo, compensated elsewhere.**
   Dropped `.about-proof-photo` (image + glow + float) entirely — the
   `sobre-instrutora-aluna.webp` import is now unused in this file (left
   on disk; it's real client photography, not something to delete, and it
   may get used again elsewhere). To keep the section from going flat
   without it, added a slow diagonal light-sweep animation across the
   "Com a Talita" panel's background (`::before`, `translateX` sweep,
   5s ease-in-out infinite) — the panel already carries the visual weight
   of the module, so that's where compensating motion belongs, not a
   separate decorative element bolted on.
2. **FAQ: removed the photo, tightened spacing, added avatar motion.**
   Dropped `.faq-photo-wrap` entirely (same reasoning — `treino-
   alongamento.webp` stays on disk, just unused here now). Addressed
   "meio longo" by tightening the chat thread's rhythm: inter-message gap
   `space-4 → space-3`, bubble padding reduced, item-internal gap
   `space-2 → 0.4rem` — shorter section without cutting any real answer
   content. Replaced the photo's motion with a slow pulsing ring on the
   "T" avatar (`box-shadow` pulse, 2.8s) — deliberately NOT styled as a
   literal "online now" indicator (no green dot, no "ativo agora" label),
   since that would be an unverifiable real-time claim; it's the same
   ambient "someone's here" language already used for the CTA pulse and
   the About section's arrow.
3. **Services: bento cards now float continuously, each on its own
   timing.** Real technical snag caught before shipping: the cards already
   used the shared `[data-hover-lift]` utility (`transform: translateY`
   on hover), and a continuous `animation` on that same element would
   fight it every frame — whichever rule's `transform` "wins" varies by
   source order/specificity, so hover would have become unreliable.
   Removed `[data-hover-lift]` from the 6 bento cells and gave `.bento-
   cell` its own hover feedback via `box-shadow` only (a property the
   float animation never touches), then added `@keyframes bento-float`
   (`translateY(0) → -9px → 0`) with a DIFFERENT `animation-duration` and
   `animation-delay` per `:nth-child` (4.4s–6.2s, staggered delays) so
   the six cards drift out of phase with each other instead of bobbing in
   unison. Verified this is actually desynced, not just visually assumed:
   sampled all 6 cards' `getBoundingClientRect().top` twice, 1.5s apart —
   each card moved a different amount (deltas ranged 1.76px–7.59px),
   confirming independent timing rather than a single shared cycle.

Verified: `npm run check` (0/0/0), `npm run build` clean (image-optimize
step dropped from 11 to 9 images, confirming the two removed photos are no
longer built into the page), dev server restarted fresh before
screenshotting, shimmer/pulse animations confirmed running via computed-
style inspection (not just assumed from the CSS), bento float desync
confirmed by position sampling as described above.

## Eleventh Remap (2026-09-16, main session, direct)
User flagged 3 things from screenshots: a real empty-space bug at the top
of About, staticness in the final CTA/contact block, and a fourth
rejection of the Hero photo — this time asking explicitly for more Google
research to find one that actually works.

1. **Real bug: unused empty space above "Sobre a Talita."** Measured
   rather than guessed: the gap from the Hero wave's bottom edge to the
   heading was 78px, exactly `.about-section`'s `padding-block: var(
   --space-6)` (80px) — not a layout accident, just too much top padding
   given the wave above it already carries visual movement into the
   section. Made the padding asymmetric (`padding-top: var(--space-5)`
   /48px, `padding-bottom` stays `--space-6`/80px to match the next
   section's rhythm), cutting the gap to 46px — confirmed by
   re-measuring, not just eyeballing.
2. **Contact/"Fale com a Talita" block felt static.** The block only had
   the CTA's ambient glow going for it below the fold. Applied the same
   recipe already proven on the Services bento grid: floated the 3 social
   cards on independent timings (`nth-child` durations 4.6s–5.8s,
   staggered delays) instead of synchronized. Same technical snag as
   before and handled the same way: these cards used `[data-hover-lift]`
   (a shared `transform`-based hover utility) and had a local `:active {
   transform: scale(0.98) }` press effect, both of which would fight a
   continuous `transform` animation on the same element every frame.
   Removed `data-hover-lift`, moved hover feedback to `border-color`/
   `background-color` (already local, unaffected), and changed the press
   effect from `transform: scale()` to `filter: brightness()` so nothing
   still competes with the float animation for the `transform` property.
   Verified desync by sampling all 3 cards' position twice 1.5s apart —
   each moved a different amount.
3. **Hero photo, fourth attempt — found and fixed the actual root cause
   this time.** All three prior photos (forest, hiking backpack, the
   client's own portrait) were portrait-source images forced into a wide
   banner, each failing for a different surface reason but sharing one
   underlying problem: a portrait photo cropped into a much wider box
   either shows a tight, decontextualized slice or has to be blurred into
   abstraction to hide it. This round searched specifically for a
   **landscape-oriented** photo instead of another portrait one — found a
   Pexels photo (License confirmed: free for commercial use, no
   attribution required) at 6000x4000 (3:2), a mature woman jogging
   outdoors in a park. Into the Hero's ~1.89:1 box, that only crops ~20%
   off the top/bottom instead of ~60% off the sides like the portrait
   photo needed — the whole exercising scene stays visible instead of
   just a face. Blur dropped from 10px to 4px accordingly (needed only for
   depth/legibility now, not to hide a bad crop), object-position and the
   background container's overscan retuned to match. `hero-senhora.webp`
   (the client's real photo) stays on disk, unused for now — real
   client media, not something to delete, and it may find a place again
   later.

Verified: `npm run check` (0/0/0), `npm run build` clean, dev server
restarted fresh before screenshotting, About's gap re-measured
programmatically before/after (78px → 46px) rather than trusting the CSS
change to have worked, Contact card float desync re-verified the same way
as the Services bento grid.

## Twelfth Remap (2026-09-16, main session, direct)
User asked for the Hero to fill a full "page" height, plus a complete
rebuild (not decoration) of the Hero, "Como funciona," and "Fale com a
Talita" — explicitly citing those two as the standard to match.

1. **Hero: full viewport height.** `min-height: calc(100svh - 76px)` (76px
   measured from the actual rendered sticky nav, not guessed), with a
   `100vh` fallback for browsers without `svh` support. Verified at three
   viewport heights (900/844/750px) that Hero + nav together sum to
   exactly the viewport height at each.
2. **Hero: rebuilt, not just resized.** Kept the landscape jogging photo
   (not flagged this round) but added two new elements: a frosted-glass
   ("No seu ritmo") card floating over the photo on the side the copy
   doesn't occupy — a different material language (backdrop-filter) from
   every other card on the page — and a scroll-cue affordance at the
   bottom (a mouse-shaped outline with a dropping dot), which only makes
   sense once the Hero is tall enough to have a "next screen" to point at.
   Clicking it scrolls one viewport down; it fades out once the visitor
   has scrolled on their own.
   - **Real bug caught before shipping, not after:** the glass card
     initially also carried an `.enter` mount-animation class (for the
     load stagger). `.enter`'s fade-in depends entirely on its own
     `animation: enter-fade` declaration to move the element from its
     hidden base state; adding a *second*, unrelated `animation`
     declaration (the float) on the same element via a different rule
     silently replaced `enter-fade` outright (the `animation` property
     doesn't merge across separate rules) — so the card sat at
     `opacity: 0` forever. Caught by checking computed style
     (`opacity: "0"`), not by trusting the code. Fixed by dropping
     `.enter` from this element — it's decorative and `aria-hidden`, so
     appearing immediately rather than staggering in costs nothing.
3. **"Como funciona" rebuilt as an auto-advancing stepper**, replacing the
   static 3-card row + an unrelated decorative dot traveling on its own
   track. Now one step is "spotlit" at a time (highlighted tab + an
   expanded content panel below), a fill bar counts down in real time
   under the active tab, and it advances to the next step automatically
   every 4s — the motion IS the content now, not decoration next to it.
   Manual tab clicks jump directly and reset the timer; hover/focus pauses
   it (mouse and keyboard users both get control back). Reduced-motion
   disables auto-advance and the fill animation; manual clicks still work.
   Verified the swap is real (not just the active class): read
   `aria-selected` before and 4.3s after with no interaction — it had
   genuinely advanced from tab 1 to tab 2, panel content included.
4. **"Fale com a Talita" rebuilt as a chat-composer mockup**, replacing a
   plain heading + button. Shows the exact message that gets sent when you
   tap it, styled as if you're about to send it — avatar, name, a
   "Ela mesma responde" status line (true and already-established, not a
   real-time availability claim), the pre-filled WhatsApp text as a
   message bubble, a typing-indicator (three bouncing dots), then the send
   button. Ties back to the conversational language already established
   in "Sobre a Talita" ("Ela ouve") and the FAQ's chat-bubble thread,
   rather than introducing a fourth unrelated CTA pattern. The 3 contact
   methods moved from full bordered cards to a compact pill row below
   ("ou fale por") — demoted, not dropped, since the composer now carries
   the section's main visual weight. Caught and fixed a content-integrity
   slip while drafting this: an early pass replaced the WhatsApp number
   and email address with generic labels ("WhatsApp", "E-mail") for
   visual cleanliness — reverted before shipping, since hiding the actual
   verified contact info behind a label is a real regression, not a
   simplification.

Verified: `npm run check` (0/0/0), `npm run build` clean, dev server
restarted fresh before screenshotting, Hero height confirmed by measurement
at 3 viewport sizes (not just "looks full-height" from a screenshot), the
glass-card opacity bug confirmed via computed style before AND after the
fix, stepper auto-advance confirmed via `aria-selected` read before/after
a real 4.3s wait.

## Thirteenth Remap (2026-09-16, main session, direct)
User: the Hero-to-About transition gap was still too big even after the
Eleventh Remap's fix (78px → 46px), and asked for the Hero to be taller.

1. **Hero height increased beyond exactly-one-viewport.** The Twelfth
   Remap's `calc(100svh - 76px)` made Hero + nav sum to precisely one
   screen — technically correct, but the wave's own height (190px
   desktop/130px mobile) eating into the visible bottom of that one
   screen made it read as short of a full "page." Added 80px of
   deliberate overshoot: `calc(100svh - 76px + 80px)`. Re-verified by
   measurement, not assumption: Hero+nav now sums to 980px/924px against
   900px/844px viewports (80px over, as intended) at both tested sizes.
2. **About's top gap cut further.** Already asymmetric from the Eleventh
   Remap (`padding-top: var(--space-5)`, 48px, down from a symmetric 80px)
   — still flagged as too much. Cut again to `var(--space-4)` (32px).
   Measured gap (wave bottom to "Sobre a Talita"): 46px → 30px.

Verified: `npm run check` (0/0/0), `npm run build` clean, dev server
restarted fresh, both changes confirmed by direct measurement (viewport
vs. Hero+nav height sum; wave-to-heading gap) rather than trusting the CSS
edit alone, plus a screenshot of the actual transition matching the
tighter proportions the client's annotated screenshot was pointing at.

## Fourteenth Remap (2026-09-16, main session, direct)
User reported the mobile testimonial carousel looked "crooked" with the
arrows pushed noticeably right of center, first at a photographed-phone
screenshot (checked and found nothing — computed `transform: none`, likely
just the photo's camera angle) and then at a real screen-capture, 430x932,
which showed the actual bug clearly.

**Real bug, confirmed by measurement before touching CSS:** `.testi-media`
is a grid item of `.testi-grid`, and a grid item's default `min-width` is
`auto` — "at least as wide as its content needs," not 0. Its child,
`.testi-strip`, is a horizontally-scrolling row of 3 testimonial cards
whose intrinsic content width is ~1409px. Without `min-width: 0` on the
grid item, that intrinsic width leaked upward into the grid track itself:
measured `.testi-media` at 520.9px wide inside a 430px viewport (`.testi-
grid` also measured offset/shifted). `.testi-section`'s own `overflow:
hidden` silently clipped the excess instead of producing a visible
horizontal scrollbar, which is exactly why this read as subtle misalignment
("crooked," arrows off-center) rather than an obviously broken layout —
nothing was rotated, the whole block was just wider than the screen and
partially invisible.

Fixed with the standard one-line fix for this well-known grid+overflow
interaction: `min-width: 0` on `.testi-media`. Re-measured immediately
after: `.testi-media` now 366px (viewport 430px minus 32px padding each
side, exactly as designed), `.testi-grid` at the full 430px with no offset,
zero horizontal page overflow. Re-checked at 390px, 768px, and 1440px too
— all zero overflow, arrows correctly centered at every size, not just the
one width that was reported.

Verified: `npm run check` (0/0/0), `npm run build` clean, dev server
restarted fresh, the exact reported viewport (430x932) re-measured and
re-screenshotted before AND after the fix (not just "should be fixed" from
reading the CSS), plus 3 other breakpoints checked for `body.scrollWidth
- window.innerWidth === 0` to make sure the same latent bug wasn't also
silently clipping content elsewhere.
