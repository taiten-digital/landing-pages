# Design brief: Estação do Chopp Londrina
Direção: cervejaria noturna e vintage, preto quente + âmbar/dourado + creme. Hero sem foto de fundo: composição em camadas dos PNGs (caneca, barril, trigo, lúpulo, malte) com parallax de mouse, raios de luz, bolhas, grãos caindo e palavra CHOPP em contorno.
Tokens em `src/index.css` (`--color-bg #0b0906`, `--color-accent #f4a81d`, `--color-accent-2 #ffd56a`). Fontes (auto-hospedadas via @fontsource): Bebas Neue (display, peso único) + Barlow.

| Seção | id | Mecanismo |
|---|---|---|
| Nav | | chrome por scroll, publica `--nav-height` |
| Hero | inicio | parallax de ponteiro em camadas + partículas + entrada da caneca após load |
| Marquee | | faixa contínua com cópias medidas |
| Sobre | sobre | ingredientes com parallax ligado ao scroll |
| Barris | barris | cards 3D com tilt + brilho |
| Marcas | marcas | linhas com preenchimento dourado no hover |
| Como pedir | pedido | stepper automático, caneca enche a cada passo |
| Avaliação | | estrelas em cascata |
| Contato | contato | raios girando + botão WhatsApp flutuante (oculto no Hero) |

Sem depoimentos inventados. Sem preços.
