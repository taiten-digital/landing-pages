# Design Brief — Vinicius Mariano Franco (`vinicius-mariano`)

The user said "o resto deduz" (2026-10-05): design decisions below are
deduced from the client's own Instagram carousel series (Método CAFÉ,
"Você ganha bem..."), which is a strong, consistent visual system. Flag any
deviation in the final report.

## Aesthetic Direction & References
Copy the carousel language, not a generic finance template:
- Alternating **near-black** (#121413) and **off-white cream** (#F7F6F2)
  panels, one **green** for emphasis. No gold in UI (gold only in the logo
  files). No blue, no glossy "fintech" gradients, no stock charts.
- **Headline signature**: a heavy grotesk statement (Inter Tight 800,
  tight but `leading-[1.05]` minimum, `tracking-tight`) followed by a
  light continuation (Inter Tight 300), with the key phrase in green.
  Example from his post: **"Você ganha bem."** (800) / "Mas quanto da sua
  vida ainda" (300) / "depende da próxima renda?" (green 800 or 600).
- **Eyebrow signature** (sections only, NEVER above the Hero H1):
  `text-xs uppercase tracking-[0.3em]` label + a short 40px green rule
  under it (`h-px w-10 bg-accent` / `bg-accent-ink` on cream).
- **Footer-rule signature**: a thin line row "VINÍCIUS MARIANO ——— 0X/06"
  (letterspaced small caps, `h-px flex-1` line, a section counter) at the
  bottom of content sections, echoing his carousel page footer. Optional
  per section, counters: Liberdade 01, Diagnóstico 02, Método 03, Sobre 04,
  Contato 05.
- Generous whitespace, left-aligned, editorial. Calm, confident, didático.
- Café is a motif (Método CAFÉ, coffee in every photo of him): Hero photo
  is steaming coffee.

## Assets (exact files)
- `public/images/hero-1200.jpg`, `hero-2000.jpg` (landscape, ~1.6:1, mug
  sits right of center, left ~40% is dark and empty for text),
  `hero-mobile.jpg` (900×1600 portrait crop: steam top, mug rim ~55%,
  dark mug body bottom). Pexels #39529656 by "Irbaf photo", Pexels License
  (free commercial use, no attribution required). Atmospheric, no person.
  Reference in code as `${import.meta.env.BASE_URL}images/hero-...`.
  `index.html` already preloads them (mobile with `media="(max-aspect-ratio: 3/5)"`).
- `src/assets/images/vini-perfil.jpg`: 640×641, opaque JPEG. Vinicius
  himself (same face as his LinkedIn/Instagram/WhatsApp), olive shirt, laptop,
  coffee, seaside café. Small: never render wider than ~440 CSS px. Possibly
  AI-styled (unconfirmed); it's still him, OK as his portrait.
- `src/assets/images/logo-mark.png`: 89×151, transparent. Gold crown + "V"
  logomark (with small teal accents), cropped from the lockup. Reads well on
  dark. Use in Nav (h-9/h-10) next to a text wordmark.
- `src/assets/images/logo-vini-saron-xp.png`: 440×218, transparent. Full
  lockup "VINI•MARIANO / SARON INVESTMENTS | XP". Dark green text + black XP
  box: **only usable on a light/cream background** (Footer). Render at
  most ~260px wide.

## Design Tokens
Already pasted into `src/index.css` (`@theme`). Summary:
```css
@theme {
  --color-bg: #121413;  --color-surface: #181B19;  --color-deep: #0C0E0D;
  --color-forest: #0F2419;
  --color-text: #F7F6F2; --color-text-muted: #A7ABA6; --color-line: #2A2F2B;
  --color-light: #F7F6F2; --color-light-card: #FFFFFF;
  --color-ink: #1A1C1A; --color-ink-muted: #565B56; --color-line-light: #E2E0D8;
  --color-accent: #4FAE76;     /* emphasis on DARK */
  --color-accent-ink: #1E7754; /* emphasis on CREAM */
  --color-cta: #2E7D52; --color-cta-hover: #35905E; --color-cta-fg: #F7F6F2;
  --color-whatsapp: #25D366;
  --font-display: 'Inter Tight';  /* variable 300-800: font-bold/extrabold/light ARE fine */
  --font-sans: 'Inter';
}
```
Rules:
- Buttons: `bg-cta text-cta-fg hover:bg-cta-hover`, `rounded-full`, `cursor-pointer`.
  Secondary: outline (`border border-text/25` on dark, `border-ink/20` on cream).
- Accent green only for the emphasis phrase of a heading, the eyebrow rule,
  and CTAs. Body text never green. Icons neutral (`text-text-muted` / `text-ink-muted`).
- Headings on dark: `text-text`; on cream: `text-ink`. Body on dark:
  `text-text-muted`; on cream: `text-ink-muted`.
- Section padding `py-16 sm:py-20` (Hero excepted). Container `mx-auto max-w-6xl px-5 sm:px-8`.
- No em dash (—) anywhere in rendered copy. pt-BR copy.
- Icons: `lucide-react` / `react-icons` only (installed? if not, ask main
  session; check `package.json`). Never hand-drawn SVG.

## Anchor ids (cross-section contract)
| Section | root element id | background |
|---|---|---|
| Nav | (header, no id) | transparent at top → `bg-deep/90 backdrop-blur` |
| Hero | `inicio` | bg + photo |
| Liberdade | `liberdade` | cream `bg-light` |
| Diagnostico | `diagnostico` | dark `bg-bg` |
| Metodo | `metodo` | cream `bg-light` |
| Sobre | `sobre` | dark `bg-bg` |
| Contato | `contato` | `bg-forest` |
| Footer | (footer) | cream `bg-light` |

Nav/Footer links: `#diagnostico` "Diagnóstico", `#metodo` "Método CAFÉ",
`#sobre` "Sobre", `#contato` "Contato". Primary CTA everywhere:
"Agendar uma conversa" → `https://calendly.com/vinimarianofranco`
(`target="_blank" rel="noopener noreferrer"`). WhatsApp:
`https://wa.me/554388503078`, displayed "(43) 98850-3078".

## Motion Language Plan
| Section | Animation mechanism |
|---|---|
| Nav | Scroll-driven chrome (transparent → `bg-deep/90` after scrollY>24, `scrolled \|\| menuOpen`); mobile dropdown animates `opacity` + `y` ONLY (never height). Publishes `--nav-height` from a ResizeObserver on the bar row. |
| Hero | Photo entrance gated on `onLoad` → `decode()` (fade from opacity 0 + scale 1.08 → 1), then slow continuous Ken Burns (scale 1 → 1.06, 20s, mirror). Text enters on mount (staggered y 16 → 0, opacity), not waiting for the photo. |
| Liberdade | Auto-alternating comparison: the two columns ("Renda alta" / "Liberdade") trade emphasis every ~3.5s, a green underline bar slides between the column labels with `layoutId`; hover/focus on a column pins it. Both columns always fully readable (emphasis = opacity 1 vs 0.55 min, never hidden). |
| Diagnostico | Real mechanic: interactive checklist of the 3 sinais. Tap a row → spring checkmark pop (`scale` 0 → 1 with overshoot) + a counter "x de 3" that springs; result line gains emphasis once ≥1 checked. Plus "Dias / Meses / Anos" chips (the test question) with a sliding `layoutId` pill. |
| Metodo | Auto-advancing stepper through the pillars, `AnimatePresence` crossfade of the detail panel + progress bar filling per step (pause on hover, click to jump). |
| Sobre | Ambient glow (blur-3xl green radial, slow opacity pulse) behind the portrait + idle float on credential items (per-item duration/delay offsets). |
| Contato | Gradient-sweep emphasis: the green word "calma." has an animated `background-position` sweep (bg-clip-text, linear loop ~6s) + the primary CTA has a soft breathing ring (box-shadow pulse). |
| Footer | Floating WhatsApp button that hides while `#inicio` is on screen (IntersectionObserver, threshold 0.3; `opacity-0 translate-y-4 pointer-events-none` + `inert` when hidden), `whileHover` lift. Rest static. |

All: `useReducedMotion()` → no continuous motion. Content visible immediately (no whileInView hiding).

## Final Section List
1. **Nav**: logomark + "Vini Mariano" wordmark, 4 links, CTA. Persistent route to booking.
2. **Hero**: his own core message ("Você ganha bem. Mas quanto da sua vida ainda depende da próxima renda?") + Calendly CTA + WhatsApp + credential line. Converts on first screen.
3. **Liberdade**: "Ganhar bem e ser livre não são a mesma coisa." His central idea (carousel slides 2, 3, 6): renda alta vs liberdade. Frames the problem for the alta-renda audience.
4. **Diagnóstico**: "Se sua renda parasse hoje, por quanto tempo sua vida seguiria igual?" + the 3 sinais de dependência da renda (slides 4, 5). Lets the visitor self-qualify; interactive.
5. **Método CAFÉ**: his named method, the differentiator. Pillars exactly as his bio lists them (Clareza, Alocação consciente, Eficiência Tributária) + "Assessor com foco no cliente, não no produto" + LinkedIn's "governança, coerência de alocação e proteção de longo prazo". Do NOT spell out C-A-F-É letter by letter (F is unknown).
6. **Sobre**: real portrait + bio + verifiable credentials as the proof section (no testimonials exist). Footnote "Informações divulgadas pelo próprio Vinicius em seus perfis profissionais."
7. **Contato**: "Faça este teste com calma." (slide 7) → Calendly, WhatsApp, email, Instagram, Londrina-PR.
8. **Footer**: lockup logo on cream, links, compliance disclaimer, floating WhatsApp.

Dropped: Depoimentos (none exist), FAQ, services grid (no confirmed service list), pricing.

## Open Questions
- Meaning of the "F" in CAFÉ.
- New logo files ("Vini Mariano" chess-king wordmark and "Café Método" mark seen on the carousels) as SVG/PNG; currently using the older crown-V lockup.
- Higher-res photos of him (only a 640px one exists).
- Disclaimer wording for Saron/XP compliance review.
- WhatsApp display format (shown with the 9th digit).
