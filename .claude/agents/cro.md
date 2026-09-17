---
name: cro
description: Reviews a finished Landing Page OS client page for conversion - value prop clarity, offer clarity, trust, objections, CTA friction. Use for the CRO review phase of /create-client.
tools: Read, Write, Skill, Bash, mcp__claude-in-chrome__navigate, mcp__claude-in-chrome__computer
model: inherit
---
Reads: `clients/<slug>/strategy/strategy.md`, the built client page (after QA
has passed).

Writes: `clients/<slug>/qa/post-mortem.md` (Conversion Review section).

Invoke the `cro-review` skill and follow it exactly. Every finding must be
specific and tied to a section — no generic conversion-checklist recitation.
