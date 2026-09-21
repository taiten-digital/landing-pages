# Skills Registry

Category → skill lookup for the Landing Page OS. New skills live under
`.claude/skills/<name>/SKILL.md` and are auto-discovered by Claude Code based
on their `description`; this table adds the category grouping native
discovery doesn't have. "→ global: X" means an already-installed skill covers
this category — don't duplicate it.

| Category | Skill | When to use |
|---|---|---|
| animation | `motion-playbook` | Framer Motion recipes for React client sections — load alongside `animate` for every new-client section |
| animation | → global: `animate` | Any motion/transition work |
| (meta) | `create-client` | The lean `/create-client` pipeline: client interview → design interview → parallel React section builders |
| accessibility | → global: `impeccable` | UI/accessibility critique and polish |

Legacy (Astro clients only — `talita-lopes`, `jonatas-hotts`; do not use for
new clients, see root `CLAUDE.md`):

| Category | Skill | When to use |
|---|---|---|
| copywriting | `conversion-copywriting` | Section copy from strategy + real customer language (legacy Astro clients only) |
| ui | `visual-direction` | Client design tokens; delegates taste judgment to `design-taste-frontend` (legacy Astro clients only) |
| frontend | `astro-client-integration` | Wire a client's Astro components into shared routing/tokens (legacy Astro clients only) |
| seo | `seo-technical` | Meta/OG/canonical/heading/alt-text checklist (legacy Astro clients only) |
| performance | `performance-budget` | Image/font/JS budget using Astro's built-ins (legacy Astro clients only) |
| analytics | `analytics-setup` | Minimal, vendor-agnostic event tracking, only if required (legacy Astro clients only) |
| testing | `qa-checklist` | Full technical/visual QA pass (legacy Astro clients only) |

Also relevant, used across multiple phases, not tied to one category:
- `design-taste-frontend` — anti-slop frontend design judgment (final say on visual direction and implementation)
- `mobile-native` — mobile-specific correctness (viewport bugs, tap targets, safe areas)
- `claude-in-chrome` — browser automation for research, screenshots, visual QA
- `run` — launch and screenshot the app for verification
- `code-review` / `security-review` — general code quality/security passes if ever needed

New React clients: section implementation itself is
`.claude/agents/section-builder.md` (an agent, not a skill), invoked once per
section by the rewritten `create-client` skill.

## When no skill fits
If a phase in `.claude/skills/create-client/SKILL.md` needs a capability not
covered above or by an installed skill, say so explicitly to the user rather
than improvising a low-quality workaround silently — this is how the
registry grows over time.
