# Design brief: Dyess Conservas Finas

## Direção
Deli premium, quente e apetitoso: fundo quase preto de tom vinho, papel kraft
creme (cor do rótulo) nas seções de conteúdo, potes PNG como protagonistas com
glow da cor do sabor. Conversão: WhatsApp em todas as seções.

Desvio do padrão da casa: sem foto de fundo full-bleed (não existe foto paisagem). Hero
de produto com palco interativo.

## Tokens
- bg #120908 · surface #1d100d · paper #f3e7d3 · ink #2a1410 · muted (no escuro) #c9b8a6
- accent #e0321f (pimenta) · gold #d9a441 (detalhes) · wa #25d366 (botões WhatsApp)
- Glow por sabor: abacaxi #f2a31b · chimichurri #6aa32c · saladinha #e0321f
- Fontes: display Fraunces (lining-nums), sans Manrope, script Allura (wordmark provisório)

## Seções e mecanismos
| id | Seção | Mecanismo |
|---|---|---|
| (fixo) | Nav | barra que fica opaca ao rolar, publica --nav-height |
| inicio | Hero | palco de potes com parallax de ponteiro, troca de sabor com spring, glow que muda de cor, entrada após load |
| sabores | Sabores (papel) | cards com tilt 3D no ponteiro + float com fase |
| combina | Combina (escuro) | chips com pílula compartilhada (layoutId) + AnimatePresence |
| pedido | Monte seu pedido | comanda ao vivo com contador animado, gera mensagem de WhatsApp |
| artesanal | Artesanal | faixa inclinada em marquee medido + ícones com float |
| contato | Contato + rodapé | botão magnético + glow pulsante |
| (fixo) | Botão WhatsApp flutuante | esconde enquanto o Hero está visível |

## Regras
Sem em dash. Sem eyebrow acima do H1. Hero cabe na primeira tela no mobile (CTA incluído).
