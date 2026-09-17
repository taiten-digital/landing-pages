---
name: ux-architecture
description: Run the minimum-necessary-page audit and define information architecture (section order, user journey) for a landing page. Use after strategy is set, before copy or visual design.
---

Category: ux · When to use: phase 8 of `/create-client` · Inputs:
`strategy/strategy.md` · Outputs: `strategy/page-architecture.md` ·
Dependencies: none · Limitations: this decides structure, not wording or
visuals.

## Method
1. Propose candidate sections from the messaging hierarchy — do not start from
   a generic template (Hero → Features → Testimonials → FAQ is not a default).
2. For every candidate section, fill the audit table: purpose, objection
   addressed, is it necessary, is it duplicated elsewhere, would removing it
   materially harm the page.
3. Cut anything that fails the audit. Fewer, stronger sections beats
   comprehensive coverage.
4. Order the surviving sections into a user journey that matches the buyer's
   sophistication and traffic context from `strategy.md`.
5. For each surviving section, note what it communicates and what breaks if
   it's removed — this becomes the developer's build list and the QA/CRO
   agents' checklist.
