# Client Brief: JEA Imóveis (`jea-imoveis`)

Source: the user's message and 5 phone screenshots (Instagram profile, Google reviews, profile photo, JEA logo post). No live interview happened: the user asked to proceed and fill gaps with stock. Everything not stated below is `UNKNOWN`.

## Business & Services
Imobiliária in Londrina (PR), Instagram name "JEA IMÓVEIS/ IMOBILIARIA". Story highlights on the Instagram: "imobiliária", "investimentos" (a "JEA CONSULTORIA" post: "IMÓVEL: INVESTIMENTO CERTO"), "Londrina", "Viva Sabedoria".
- ASSUMED (confirm with the client): the three paths Comprar / Vender / Investir. Investir is backed by the Instagram highlight; Comprar and Vender are the standard imobiliária scope. Alugar was NOT included because nothing confirms it.
- UNKNOWN: property inventory, neighborhoods served, property types, rental management, financing help, commission/fees.

## Differentiators
UNKNOWN in the client's own words. Verifiable only: registered with CRECI and CREA (below), and a founder who shows his face in all his content (Instagram reels).

## Target Audience
UNKNOWN. Assumed: people in Londrina buying, selling or investing in real estate.

## Social Media
- Instagram: https://www.instagram.com/jeaimoveisldn (@jeaimoveisldn). 47 posts, 189 followers (do NOT show these numbers: too small to help).
- A Facebook chip "José Eduardo Almeida" and a related handle "@eduardoalmeida.jea" appear on screen. A "JEA Consultoria" brand (@jeaconsultoriaimobiliaria) appears in a reel. Not used as links (not confirmed).

## Contact Info
- Phone/WhatsApp: **(43) 9914-6230** (given as +55 43 9914-6230). UNKNOWN: whether the mobile is missing the leading 9 (43 9 9914-6230). WhatsApp link built from the number exactly as given.
- UNKNOWN: address, e-mail, opening hours. Do not render a map, an address or hours.

## Existing Brand Assets
All in `src/assets/images/` unless noted.
- `logo-jea-escuro.png` 986x260, transparent, near-black `#231F20`. Keyed from the logo post on Instagram (black on white). Use on LIGHT backgrounds.
- `logo-jea-claro.png` 986x260, transparent, white (same shape, recolored). Use on DARK backgrounds. Wordmark is a heavy extended sans with a dot above the A. No favicon-ready logomark exists.
- `jose-eduardo-retrato.png` 800x800, circle with transparent corners, hasAlpha. José Eduardo Almeida (grey beard, glasses, camel velvet blazer, white shirt), taken from the circular Instagram profile photo of @jeaimoveisldn. The same man appears in the account's reels. Show ONLY as a circle; low-res source, never display wider than ~420px css. Identification is strong (own business profile photo) but confirm with the client.
- Stock (no people, atmospheric, never captioned as a JEA property). No stock host was reachable from this environment (Pexels, Unsplash, Wikimedia, Pixabay blocked), so these are photos ALREADY LICENSED in sibling clients of this repo:
  - `public/images/hero-casa-entardecer-{1200,2400,mobile}.jpg`: Pexels #31737859 by Sharath G. (free commercial, no attribution). Modern house at night with warm lights. Also the Hero of `caixa-aqui` (swap when a new photo is available).
  - `card-comprar.jpg` 900x1202: crop of Pexels #4933643 by Deepak DK (house at dusk, pink sky), also in `baldon-corretora`.
  - `card-vender.jpg` 640x800: crop of an Unsplash photo by Avi Werde (modern house with pool), also in `consorcicred-londrina`.
  - `card-investir.jpg` 900x1200: crop (entrance, stone, wood door) of the same Pexels #31737859.
- ASSET NEEDED: a landscape photo of Londrina or of real JEA properties; a landscape or half-body photo of José Eduardo for Sobre/Contato; the other three reels' stills are too low-res to use.

## Tone & Voice
UNKNOWN (never asked). Assumed from his Instagram: serious, trustworthy, human, wise ("Viva Sabedoria"). Warm, direct Portuguese, no real-estate cliché, no "oportunidade imperdível".

## Real Proof
- Credentials displayed in his own Instagram bio: **CRECI F-44892** and **CREA 23113-D**. Always footnoted as the client's own claims (`NOTA_CREDENCIAIS` in `src/content.ts`).
- Google: 26 reviews, 4.5 average (given by the user). Cited once, in the reviews section only.
- 4 real Google reviews transcribed in `AVALIACOES`. Caveats the user should know: they are old (about 4 to 8 years) and read as being about a condominium/stay, not about the agency's service (one, about building an aquarium, was left out). They are shown verbatim, labeled "Avaliações públicas no Google", with no profile photos.
- PROOF NEEDED: years in the market, deals closed, properties sold, clients served, awards. None is stated anywhere, so none appears.

## Open Questions
1. Confirm the WhatsApp number (leading 9?).
2. Address, e-mail, opening hours, neighborhoods served?
3. Confirm Comprar / Vender / Investir (and whether Alugar exists) and the 5-step process.
4. Confirm the portrait is José Eduardo; ask for a landscape photo of him and real property photos.
5. Fresh Google reviews about the service itself.
