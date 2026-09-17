---
name: research
description: Research a client's business, market, audience, and public presence (site, social, reviews, news) before writing anything. Use when starting a new client project or when company-intelligence.md needs filling in.
---

Category: research · When to use: phase 3 of `/create-client`, or whenever a
claim about a client needs verifying · Inputs: client name, official site/social
handles from `discovery/questionnaire.md` · Outputs:
`research/company-intelligence.md` · Dependencies: WebSearch, WebFetch,
`mcp__claude-in-chrome__*` (for JS-heavy sites or screenshots) · Limitations:
can only use what's publicly accessible — never fabricate a fact that isn't
sourced.

## Method
1. Read the official site: offer, pricing, positioning, existing copy/CTAs.
2. Search for the company + reviews/complaints/forums/news to find customer
   language, recurring objections, and reputation signals.
3. Check social presence (Instagram/LinkedIn/Facebook/YouTube/TikTok/Google
   Maps) only where publicly reachable — note tone, content themes, engagement
   patterns, recurring visuals.
4. Log every source with URL + access date.
5. Fill `research/company-intelligence.md`, tagging each item as **Fact**
   (directly stated by the company), **Observation** (seen but not stated),
   **Inference** (your reasoned conclusion), **Hypothesis** (untested guess),
   or **Unknown** (flag for the questionnaire).
6. Never invent testimonials, stats, counts, awards, or certifications. If a
   source is unreachable or paywalled, record it as inaccessible — don't guess
   its content.
