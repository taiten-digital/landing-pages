# Plugin / MCP Registry

External tools/services available to agents, distinct from skills (skills are
knowledge/process; this is capability). Use the smallest set needed for a
given phase.

| Capability | Tool | Use for |
|---|---|---|
| Web search | `WebSearch` | Market/competitor/reputation research; sourcing free-license stock photography (Unsplash, Pexels) when a section genuinely needs an image and no client photo fits — see "Sourcing stock photography" below |
| Web fetch | `WebFetch` | Reading a specific known URL (site page, article); previewing a candidate stock photo before downloading it — see below; browsing [inspora.design](https://www.inspora.design/) and [styles.refero.design](https://styles.refero.design/) for current visual reference during the Design Planning Interview |
| Browser automation | `mcp__claude-in-chrome__*` (navigate, computer, read_page, screenshot, console, network) | JS-heavy sites, social profiles, competitor screenshots, visual QA at breakpoints. **In practice this has not connected once in this environment** — always try it first, but don't block on it. |
| Browser automation (fallback) | Playwright (`npm install -D playwright && npx playwright install chromium`, then a one-off script via `node`) | Confirmed working in this environment when `claude-in-chrome` isn't connected. Use for real screenshots and for reproducing client-side bugs (write a small script that navigates, scrolls/interacts, and screenshots or dumps console/`pageerror` events). Point it at `react-clients/<slug>/dist/` (via `npm run preview`). Don't commit the script; it's a diagnostic tool, not project infrastructure. |
| Design / Figma | Figma MCP (`figma-use`, `figma-design-to-code`, `figma-generate-design`) | Client-provided Figma files, pushing/pulling design assets |
| File storage | Google Drive MCP | Client-provided source documents (briefs, decks, photos) shared via Drive |

Not currently wired in, by design (YAGNI — add only when a real client needs
it): dedicated analytics API access, a CMS, a database, automated visual
regression/Lighthouse CI, the Refero MCP (Refero also offers a connectable
MCP server for programmatic style/pattern search — plain `WebFetch` against
`styles.refero.design` already covers the actual need, so there's nothing
to gain from the extra connection yet). If a project genuinely needs one of
these, note it in that client's `qa/post-mortem.md` first so the need is
documented before adding a dependency.

## Sourcing stock photography
No dedicated stock-photo MCP/plugin exists — this is done with `WebSearch` +
`WebFetch` directly against Unsplash/Pexels, which works but has a real
failure mode worth knowing before relying on it:

1. `WebSearch` for the subject (e.g. "unsplash mature woman outdoor
   exercise landscape photo") and again narrowed by orientation/setting if
   the first pass doesn't turn up a fit — don't settle for the first result
   if it's the wrong orientation (see `CLAUDE.md`'s "Full-bleed hero
   sections": matching aspect ratio to the container matters more than the
   subject matching on keywords alone).
2. `WebFetch` the *listing* page (e.g. a `/s/photos/...` search results
   page) with a prompt asking for direct `images.unsplash.com` /
   `images.pexels.com` URLs and orientation per photo — the tool's text
   summary of a listing page is usually reliable.
3. **`WebFetch` on a direct image URL will claim it "cannot describe" the
   image (it sees raw binary, not a photo) — but it still saves the file
   to a local cache path in its own response, and that path is directly
   viewable with the `Read` tool.** Use that to actually look at a
   candidate photo (composition, whether it reads as intended, who/what is
   in frame) before spending a download on it — don't pick a photo from a
   text description alone.
4. Only after visually confirming the photo fits: download it at a large
   width via `curl` (Unsplash/Pexels both support `?w=<px>` resize params)
   into `react-clients/<slug>/src/assets/images/`, and note the license
   inline as a code comment next to its import (see `CLAUDE.md`'s "Content
   integrity").
5. Delete an asset you sourced but didn't end up using — don't leave
   rejected candidates in the repo (a real client photo that's just
   temporarily unused is different: keep that, it's not yours to delete).

## Rules
- Never fabricate having accessed a source that was actually unreachable.
- Don't invoke browser automation for something `WebFetch`/`WebSearch`
  already answers.
- No moodboard step in this pipeline (the lean 3-role pipeline has no
  dedicated visual-research phase) — reference screenshots, if needed, are
  described inline during the Design Planning Interview instead.
