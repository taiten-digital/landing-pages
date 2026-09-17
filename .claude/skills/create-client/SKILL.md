---
name: create-client
description: Run the full lifecycle for a new client landing page - from intake through research, strategy, copy, design, implementation, QA, CRO, and deploy-ready. Use when the user asks to create a landing page for a new client/company, or invokes /create-client.
---

Category: workflow (meta-skill) · This is the orchestrator's playbook — the
main Claude Code session follows it directly and drives the specialist
subagents in `.claude/agents/` via the Task tool. No separate "Orchestrator"
subagent exists: subagents run in fresh, isolated context per call and can't
hold state across 15+ phases, so the main session (this one) is the
orchestrator, and `project-state.md` is the persistent memory across turns.

## Before starting
Read `CLAUDE.md` at the repo root if you haven't already this session — it
has the folder map, routing mechanism, and full skill/agent roster. Check
`docs/skills-registry.md` and `docs/mcp-registry.md` if a phase below needs a
capability not listed here.

## Phase 1 — Intake
Get the client name and a one-line objective from the user if not already
given. Don't ask more than that up front — research fills most gaps.

## Phase 2 — Scaffold (deterministic, do this before any agent work)
Run: `npm run create-client -- "<Client Name>"`
This creates `clients/<slug>/` with the full folder tree and filled
templates, and marks Phase 1 done in that client's `project-state.md`.
If the script reports the slug already exists, stop and ask the user whether
this is an update to an existing client instead of a new one.

## Phase 3 — Discovery
Fill `clients/<slug>/discovery/questionnaire.md` directly with the user —
but first skim what phase 4 (research) will likely answer, and only ask what
research can't reliably resolve. Adapt questions to the business type (a
SaaS ≠ a restaurant ≠ a clinic ≠ a personal brand).

## Phase 4 — Research
Task → `researcher` agent, skill: `research`. Output:
`research/company-intelligence.md`.

## Phase 5 — Brand DNA
Task → `brand-intelligence` agent, skill: `brand-dna`. Output:
`brand/brand-dna.md`.

## Phase 6 — Competitor / market research
Task → `researcher` agent again, same skill, target
`research/competitor-analysis.md`.

## Phase 7 — Strategy
Task → `strategist` agent, skill: `content-strategy`. Output:
`strategy/strategy.md`. This includes the page-length rationale — don't skip
it.

## Phase 8 — Minimum-necessary-page audit + IA
Task → `ux-architect` agent, skill: `ux-architecture`. Output:
`strategy/page-architecture.md`. Every section must survive the audit table
or get cut.

## Phase 9 — Visual research
Task → `visual-researcher` agent, skill: `visual-research`. Output:
`design/visual-research.md`, `assets/moodboard/`.

## Phase 10 — Copy
Task → `copywriter` agent, skill: `conversion-copywriting`. Output:
`copy/*.md`. Any missing proof is marked `PROOF NEEDED`, never fabricated.

## Phase 11 — Visual direction
Task → `ui-design` agent, skill: `visual-direction` (which itself invokes
`design-taste-frontend` for the taste pass). Output:
`design/design-direction.md`, `clients/<slug>/src/tokens.css`.

## Phase 12 — Implementation + responsive + SEO + performance + analytics
Task → `developer` agent, skills: `astro-client-integration`,
`seo-technical`, `performance-budget`, `analytics-setup` (only if required),
and `mobile-native` for the responsive pass. Output: `clients/<slug>/src/*`.
Run `npm run check` and `npm run build` before calling this phase done.

## Phase 13 — QA
Task → `qa` agent, skill: `qa-checklist`. Output: `qa/post-mortem.md`
(Breakpoint + Technical sections filled).

## Phase 14 — CRO review
Task → `cro` agent, skill: `cro-review`. Output: `qa/post-mortem.md`
(Conversion Review section filled).

## Phase 15 — Iteration
Fix issues raised in phases 13-14 by re-invoking the relevant agent. Cap at 3
iterations unless the user asks for more — each iteration must target
specific findings, not a vague "polish pass."

## Phase 16 — Final validation
`npm run check && npm run build`. Confirm `dist/<slug>/index.html` exists.
Re-view the page once more end to end.

## Phase 17 — Deploy-ready
Report the page as ready: static output in `dist/`, deployable to any static
host or path-based behind a reverse proxy at `/<slug>` (see root `CLAUDE.md`
"Deployment"). No CI/deploy config is written unless the user names a
specific target.

## Phase 18 — Post-mortem
Append to `qa/post-mortem.md`: what worked, what failed, missing
capabilities/tools hit during this project, reusable patterns found. This is
what makes the next client faster — don't skip it.

## Throughout
After every phase, update the phase table and Decisions Log in
`clients/<slug>/project-state.md` — status, owner, date. If a phase reveals a
problem in an earlier decision (e.g. implementation exposes a strategy gap),
go back and fix that earlier phase's doc rather than patching around it in
code.
