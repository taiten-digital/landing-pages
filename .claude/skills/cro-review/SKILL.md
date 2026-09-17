---
name: cro-review
description: Review a finished client landing page from a conversion perspective - value prop clarity, offer clarity, trust, objection coverage, CTA friction. Use after QA passes, before final validation.
---

Category: conversion · When to use: phase 14 of `/create-client`, after `qa`
agent's technical pass · Inputs: the built page (`npm run dev` or `preview`),
`strategy/strategy.md`, `strategy/page-architecture.md` · Outputs: findings
appended to `qa/post-mortem.md` under "Conversion Review" · Dependencies:
`mcp__claude-in-chrome__*` to actually view the rendered page · Limitations:
identifies concrete, actionable issues — not a generic conversion-checklist
recitation with nothing tied to this specific page.

## Method
1. View the built page (use the `run` skill or `claude-in-chrome` directly).
2. Check value proposition: is the core promise from `strategy.md` clear
   within the first viewport?
3. Check offer clarity: does the visitor know exactly what they get and what
   happens after the CTA?
4. Check trust/proof: is available proof placed where the relevant objection
   arises, not just dumped in one section?
5. Check objection coverage against `strategy.md`'s list — flag any that
   went unaddressed in the final copy.
6. Check CTA hierarchy: one primary action, no competing CTAs, no
   unnecessary friction (excess form fields, unclear next step).
7. Write findings as specific, prioritized fixes — each tied to a section and
   a reason, not a vague "improve trust" note.
