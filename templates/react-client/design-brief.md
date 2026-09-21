# Design Brief — {{CLIENT_NAME}} (`{{SLUG}}`)

Filled live with the user during the Design Planning Interview (Phase 3 of
`.claude/skills/create-client/SKILL.md`), after `client-brief.md` is done.
Every decision here should trace back to something the client actually said
or approved — don't default to a generic template.

## Aesthetic Direction & References
What the client likes/dislikes visually, references shown and their
reaction, existing brand colors/fonts if any.

## Design Tokens
Ready to paste into `src/index.css`'s `@theme {}` block.
```css
@theme {
  /* --color-*, --font-*, --radius-*, --spacing-* etc. */
}
```
Default section padding is `py-16 sm:py-20` unless there's a specific
reason to go bigger — `py-24 sm:py-32` on every section stacks into
200px+ of dead space between them with nothing to justify it. When two
consecutive sections share a background color, note it here so the
section-builder for the later one adds a `border-t border-white/5`
divider instead of leaving a boundary-less gap.

## Motion Language Plan
One row per section. Each section's mechanism must be genuinely distinct
from every other row — no two sections reading as the same decoration with
different content. See the `motion-playbook` skill for the Framer Motion
recipes behind each mechanism.

| Section | Animation mechanism |
|---|---|
| Hero | |
| Nav | |
| Footer | |
| Contact | |

## Final Section List
One line of justification per section — why the business actually needs it,
not a default template. Add rows above for anything beyond Hero/Nav/Footer/
Contact (Services, Pricing, Testimonials, FAQ, Gallery, About, etc.) only if
justified here.

## Open Questions
Anything still unresolved before Phase 4 (parallel section builders) starts.
