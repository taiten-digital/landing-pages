# Skills Registry

Category → skill lookup for the Landing Page OS. New skills live under
`.claude/skills/<name>/SKILL.md` and are auto-discovered by Claude Code based
on their `description`; this table adds the category grouping native
discovery doesn't have. "→ global: X" means an already-installed skill covers
this category — don't duplicate it.

| Category | Skill | When to use |
|---|---|---|
| research | `research` | Company/market/social research before writing anything |
| visual-research | `visual-research` | Gather visual references before design direction |
| branding | `brand-dna` | Extract visual/verbal/commercial brand DNA |
| content | `content-strategy` | Objective, positioning, messaging hierarchy, page-length rationale |
| copywriting | `conversion-copywriting` | Section copy from strategy + real customer language |
| ux | `ux-architecture` | Minimum-necessary-page audit + information architecture |
| ui | `visual-direction` | Client design tokens; delegates taste judgment to `design-taste-frontend` |
| frontend | `astro-client-integration` | Wire a client's Astro components into shared routing/tokens |
| seo | `seo-technical` | Meta/OG/canonical/heading/alt-text checklist |
| performance | `performance-budget` | Image/font/JS budget using Astro's built-ins |
| accessibility | → global: `impeccable` | UI/accessibility critique and polish |
| animation | → global: `animate` | Any motion/transition work |
| conversion | `cro-review` | Post-QA conversion-focused review |
| analytics | `analytics-setup` | Minimal, vendor-agnostic event tracking, only if required |
| testing | `qa-checklist` | Full technical/visual QA pass before CRO |
| (meta) | `create-client` | The end-to-end `/create-client` orchestration playbook |

Also relevant, used across multiple phases, not tied to one category:
- `design-taste-frontend` — anti-slop frontend design judgment (final say on visual direction and implementation)
- `mobile-native` — mobile-specific correctness (viewport bugs, tap targets, safe areas)
- `claude-in-chrome` — browser automation for research, screenshots, visual QA
- `run` — launch and screenshot the app for verification
- `code-review` / `security-review` — general code quality/security passes if ever needed

## When no skill fits
If a phase in `.claude/skills/create-client/SKILL.md` needs a capability not
covered above or by an installed skill, record the gap in the client's
`qa/post-mortem.md` under "Missing capabilities/tools" rather than
improvising a low-quality workaround silently — this is how the registry
grows over time.
