// Procedural hop-cone illustration (overlapping bracts, shaded by code) used as
// react-clients/estacao-do-chopp-londrina/public/images/lupulo.webp. The client-sent hops PNG was
// cut off at the bottom, so this replaces it. Run from a folder with sharp installed; writes
// hop-render.png (transparent), then trim + resize to 900px wide WebP.
import sharp from 'sharp';
import fs from 'fs';

// Deterministic PRNG
let seed = 7; const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

const H = 560, RM = 190, ROWS = 14;
const R = (v) => RM * Math.pow(Math.sin(Math.PI * Math.pow(v, 0.72)), 0.85);
const hex = (r, g, b) => '#' + [r, g, b].map((c) => Math.max(0, Math.min(255, Math.round(c))).toString(16).padStart(2, '0')).join('');
const mix = (a, b, t) => a.map((c, i) => c + (b[i] - c) * t);

let defs = '';
let gid = 0;

function cone() {
  const items = [];
  for (let k = 0; k < ROWS; k++) {
    const v = (k + 0.5) / ROWS;                      // 0 top .. 1 tip
    const r = R(v), y = v * H;
    const n = Math.max(4, Math.round(3 + 5.2 * (r / RM) + 1));
    const slope = (R(Math.min(1, v + 0.03)) - R(Math.max(0, v - 0.03))) / (0.06 * H);
    for (let j = 0; j < n; j++) {
      const th = ((j + (k % 2) * 0.5) / n) * Math.PI * 2 + (rand() - 0.5) * 0.12;
      const z = Math.cos(th), sx = Math.sin(th);
      if (z < -0.35) continue;
      items.push({ k, v, r, y, n, th, z, sx, slope });
    }
  }
  // bottom rows first (upper rows overlap lower ones); inside a row back to front
  items.sort((a, b) => (b.k - a.k) || (a.z - b.z));
  let out = '';
  for (const it of items) {
    const { r, y, n, z, sx, k, v, slope } = it;
    const x = r * sx;
    const fore = Math.max(0.3, z);                       // foreshortening of width
    const w = (2 * Math.PI * Math.max(r, 40) / n) * 1.04 * (0.55 + 0.45 * fore) * (1.05 + (1 - v) * 0.15);
    const h = (H / ROWS) * (2.05 + 0.5 * (r / RM)) * (0.92 + rand() * 0.16);
    // lighting: light from upper left-front
    const light = Math.max(0, Math.min(1, 0.5 + 0.35 * z - 0.3 * sx + 0.12 * (1 - v)));
    const rowShade = 0.85 + 0.15 * (1 - k / ROWS);
    const dark = [22, 52, 10], mid = [84, 128, 26], lite = [176, 208, 64];
    const base = light < 0.5 ? mix(dark, mid, light / 0.5) : mix(mid, lite, (light - 0.5) / 0.5);
    const tipCol = mix(base, [214, 232, 110], 0.4), rootCol = mix(base, [14, 34, 6], 0.7);
    const id = 'g' + gid++;
    defs += `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${hex(...rootCol.map(c=>c*rowShade))}"/><stop offset=".45" stop-color="${hex(...base.map(c=>c*rowShade))}"/><stop offset="1" stop-color="${hex(...tipCol)}"/></linearGradient>`;
    const rot = sx * 38 + slope * -20 + (rand() - 0.5) * 7;
    const flare = 6 + 10 * Math.abs(sx);                 // tips curl outward near the silhouette
    const p = `M0,0 C${(w * 0.6).toFixed(1)},${(h * 0.04).toFixed(1)} ${(w * 0.42).toFixed(1)},${(h * 0.72).toFixed(1)} ${(flare * Math.sign(sx || 1) * 0.4).toFixed(1)},${h.toFixed(1)} C${(-w * 0.42).toFixed(1)},${(h * 0.72).toFixed(1)} ${(-w * 0.6).toFixed(1)},${(h * 0.04).toFixed(1)} 0,0 Z`;
    const vein = `M0,${(h * 0.06).toFixed(1)} Q${(flare * 0.2).toFixed(1)},${(h * 0.5).toFixed(1)} ${(flare * Math.sign(sx || 1) * 0.35).toFixed(1)},${(h * 0.93).toFixed(1)}`;
    out += `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${rot.toFixed(1)})" filter="url(#sh)">` +
      `<path d="${p}" fill="url(#${id})" stroke="${hex(...mix(base, [18, 36, 6], 0.7))}" stroke-opacity=".75" stroke-width="1.6"/>` +
      `<path d="${vein}" fill="none" stroke="${hex(...mix(base, [240, 248, 170], 0.55))}" stroke-opacity=".5" stroke-width="2.2" stroke-linecap="round"/>` +
      `<path d="M${(-w * 0.28).toFixed(1)},${(h * 0.18).toFixed(1)} Q${(-w * 0.2).toFixed(1)},${(h * 0.5).toFixed(1)} ${(-w * 0.05).toFixed(1)},${(h * 0.78).toFixed(1)}" fill="none" stroke="#fff" stroke-opacity=".12" stroke-width="3" stroke-linecap="round"/>` +
      `</g>`;
  }
  // stalk + tiny top bracts
  const stalk = `<path d="M0,-70 C6,-40 -4,-16 0,14" fill="none" stroke="#6b5a24" stroke-width="10" stroke-linecap="round"/>` +
    `<path d="M0,-70 C6,-40 -4,-16 0,14" fill="none" stroke="#9aa04a" stroke-width="4" stroke-linecap="round" stroke-opacity=".7"/>`;
  return stalk + out;
}

const coneA = cone(); seed = 99; const coneB = cone(); seed = 1234; const coneC = cone();

const W = 1200, Hh = 1200;
const place = (inner, x, y, rot, s) => `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s}) translate(0,${-H / 2})">${inner}</g>`;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${Hh}" viewBox="0 0 ${W} ${Hh}">
<defs>${defs}
<filter id="sh" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="1" dy="6" stdDeviation="4.5" flood-color="#050c02" flood-opacity=".8"/></filter>
</defs>
${place(coneB, 770, 430, 28, 0.86)}
${place(coneC, 420, 500, -34, 0.9)}
${place(coneA, 600, 800, 168, 1.0)}
</svg>`;
fs.writeFileSync('hop.svg', svg);
await sharp(Buffer.from(svg), { density: 96 }).png().toFile('hop-render.png');
const meta = await sharp('hop-render.png').trim({ threshold: 2 }).toBuffer({ resolveWithObject: true });
console.log(meta.info.width, meta.info.height);
await sharp('hop-render.png').trim({ threshold: 2 }).flatten({ background: '#3a2a10' }).resize({ height: 800 }).png().toFile('hop-gen-prev.png');
