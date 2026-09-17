---
name: analytics-setup
description: Add minimal, vendor-agnostic event tracking and consent handling to a client landing page - only what's needed to measure the primary CTA. Use during implementation if the client has an analytics requirement.
---

Category: analytics · When to use: phase 12 of `/create-client`, only if
`discovery/questionnaire.md` names an analytics requirement · Inputs:
`strategy/strategy.md` (primary CTA) · Outputs: a small `<script>` snippet in
`clients/<slug>/src/index.astro`, or none if not required · Dependencies:
whatever vendor the client already uses (GA4, Meta Pixel, Plausible, etc.) —
do not introduce a new analytics vendor unasked · Limitations: collect only
what's needed to measure the primary CTA; no unnecessary personal data.

## Method
1. Skip entirely if no analytics requirement was named — most clients don't
   need this at landing-page-launch time (YAGNI).
2. If required, add the vendor's snippet as a single `<script>` tag scoped to
   that client's page only — never global across all clients.
3. Track the primary CTA click as the one event that matters; add secondary
   events only if the client asked for a specific funnel view.
4. If the vendor requires consent (e.g. EU traffic), note the requirement in
   `qa/post-mortem.md` rather than silently skipping it.
