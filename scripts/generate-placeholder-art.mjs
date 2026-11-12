// Generates illustrated stand-in artwork (SVG) for every photo slot into
// src/photos/. These are AI-generated illustrations for the prototype only;
// replace them with real photography by saving a jpg/png/webp of the same
// name (and deleting the .svg).   Run: node scripts/generate-placeholder-art.mjs
import { mkdirSync, writeFileSync } from 'node:fs';

const OUT = new URL('../src/photos/', import.meta.url);
const W = 1200, H = 900;

// a: backdrop centre, b: backdrop edge, d: dark, m: mid, l: light, x: accent
const T = {
  warm: { a: '#c8a27c', b: '#33251c', d: '#1d1612', m: '#7a5a43', l: '#f3e7d8', x: '#d9773f' },
  cool: { a: '#9db2b8', b: '#1c282d', d: '#12191c', m: '#4f6a72', l: '#e9f0f1', x: '#3f8f8a' },
  stone: { a: '#bdb6ab', b: '#292724', d: '#171615', m: '#6d675e', l: '#f3f0ea', x: '#b08d57' },
  ink: { a: '#5b5f66', b: '#101114', d: '#08090a', m: '#34373c', l: '#eceef0', x: '#c9a45c' },
  blush: { a: '#e3bfb2', b: '#4a2f2c', d: '#2a1a19', m: '#9a6a62', l: '#fbefe9', x: '#c4574a' },
};

const R = (x, y, w, h, f, rx = 0, o = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}" ${o}/>`;
const C = (cx, cy, r, f, o = '') => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${f}" ${o}/>`;
const E = (cx, cy, rx, ry, f, o = '') => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${f}" ${o}/>`;
const P = (d, f, o = '') => `<path d="${d}" fill="${f}" ${o}/>`;
const shadow = (cx, cy, rx) => E(cx, cy, rx, rx * 0.11, '#000', 'opacity=".35"');
const txt = (x, y, s, f, t, o = '') => `<text x="${x}" y="${y}" font-size="${s}" fill="${f}" text-anchor="middle" font-family="Georgia, serif" ${o}>${t}</text>`;

function wrap(t, body, { floor = 640 } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
<radialGradient id="bg" cx="50%" cy="38%" r="75%"><stop offset="0" stop-color="${t.a}"/><stop offset="1" stop-color="${t.b}"/></radialGradient>
<linearGradient id="fl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".28"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></linearGradient>
<radialGradient id="vg" cx="50%" cy="50%" r="72%"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></radialGradient>
<linearGradient id="sh" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".28"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient>
</defs>
<rect width="${W}" height="${H}" fill="url(#bg)"/>
${floor ? `<rect y="${floor}" width="${W}" height="${H - floor}" fill="url(#fl)"/>` : ''}
${body}
<rect width="${W}" height="${H}" fill="url(#vg)"/>
</svg>`;
}

// ── Landscapes (also used inside frames) ────────────────────────────────
const sea = `<linearGradient id="sk1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#27304f"/><stop offset=".55" stop-color="#c9695a"/><stop offset="1" stop-color="#f6c27a"/></linearGradient>
<rect width="1200" height="520" fill="url(#sk1)"/><circle cx="640" cy="520" r="95" fill="#ffe2a6"/><circle cx="640" cy="520" r="170" fill="#ffd28a" opacity=".25"/>
<rect y="520" width="1200" height="380" fill="#1d2a44"/>
${[0, 1, 2, 3, 4, 5, 6].map(i => `<rect x="${560 - i * 34}" y="${540 + i * 34}" width="${160 + i * 68}" height="${7 + i * 2}" rx="5" fill="#f6c27a" opacity="${0.6 - i * 0.07}"/>`).join('')}
<path d="M0 900V700q90-70 210-30t190 90q60 40 120 140z" fill="#0d1220"/><path d="M1200 900V740q-110-50-220 0t-200 160z" fill="#0d1220"/>`;
const peaks = `<linearGradient id="sk2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfd9dc"/><stop offset="1" stop-color="#f1ece2"/></linearGradient>
<rect width="1200" height="900" fill="url(#sk2)"/><circle cx="860" cy="210" r="70" fill="#fff" opacity=".7"/>
<path d="M0 520L170 330l120 110 150-210 170 230 130-150 180 190 130-120 150 140v380H0z" fill="#9fb0b6"/>
<path d="M0 620l200-150 160 120 190-190 210 210 180-130 260 170v250H0z" fill="#6f858d"/>
<rect y="600" width="1200" height="70" fill="#f1ece2" opacity=".45"/>
<path d="M0 730l230-120 220 110 250-150 240 150 260-90v270H0z" fill="#3e525a"/>
<path d="M0 820l300-90 300 80 320-100 280 90v100H0z" fill="#1f2c31"/>`;
const veld = `<linearGradient id="sk3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a2f2a"/><stop offset=".6" stop-color="#e58a3c"/><stop offset="1" stop-color="#f8cf7a"/></linearGradient>
<rect width="1200" height="900" fill="url(#sk3)"/><circle cx="420" cy="560" r="150" fill="#ffe6a8"/>
<path d="M0 690q300-50 600-20t600-10v240H0z" fill="#1a0f0c"/>
<rect x="772" y="430" width="22" height="270" fill="#1a0f0c"/><path d="M783 520l-90-90M783 500l100-80M783 560l-60-50" stroke="#1a0f0c" stroke-width="12"/>
<ellipse cx="770" cy="400" rx="250" ry="52" fill="#1a0f0c"/><ellipse cx="660" cy="430" rx="120" ry="30" fill="#1a0f0c"/><ellipse cx="900" cy="425" rx="130" ry="30" fill="#1a0f0c"/>
<path d="M150 690v-60l14-40 10 40v60zM230 690v-36l30-10 22 14v32zM232 646l-8-22 12 4z" fill="#1a0f0c"/>`;
const SCENES = { sea, peaks, veld };
const landscape = k => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><defs><radialGradient id="vg" cx="50%" cy="50%" r="72%"><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".45"/></radialGradient></defs>${SCENES[k]}<rect width="${W}" height="${H}" fill="url(#vg)"/></svg>`;
// A landscape inset: ids must stay unique per document, so suffix them.
const inset = (k, x, y, w, h, n = 0) => `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="0 0 1200 900" preserveAspectRatio="xMidYMid slice">${SCENES[k].replaceAll(/sk(\d)/g, `sk$1_${n}`)}</svg>`;

// ── People ───────────────────────────────────────────────────────────────
function person(cx, base, s, f, { cap = false, hair = null } = {}) {
  const k = n => n * s;
  return P(`M${cx - k(200)} ${base}Q${cx - k(190)} ${base - k(215)} ${cx - k(62)} ${base - k(240)}L${cx - k(44)} ${base - k(290)}h${k(88)}L${cx + k(62)} ${base - k(240)}Q${cx + k(190)} ${base - k(215)} ${cx + k(200)} ${base}z`, f)
    + E(cx, base - k(350), k(76), k(90), f)
    + (hair ? P(`M${cx - k(84)} ${base - k(350)}q0-${k(110)} ${k(84)}-${k(110)}t${k(84)} ${k(110)}q-${k(40)}-${k(60)}-${k(84)}-${k(60)}t-${k(84)} ${k(60)}z`, hair) : '')
    + (cap ? P(`M${cx - k(150)} ${base - k(440)}L${cx} ${base - k(490)}L${cx + k(150)} ${base - k(440)}L${cx} ${base - k(395)}z`, f) + R(cx + k(120), base - k(440), k(6), k(90), f) + C(cx + k(123), base - k(345), k(12), f) : '');
}
const studio = (t, people) => wrap(t, C(600, 330, 330, t.l, 'opacity=".22"') + C(600, 330, 210, t.l, 'opacity=".2"') + people, { floor: 760 });

// ── Objects ──────────────────────────────────────────────────────────────
const frame = (x, y, w, h, col, mat, pic, n) => R(x + 10, y + 14, w, h, '#000', 4, 'opacity=".3"') + R(x, y, w, h, col, 4) + R(x + 16, y + 16, w - 32, h - 32, mat) + inset(pic, x + 16 + mat_w(w), y + 16 + mat_w(w), w - 32 - 2 * mat_w(w), h - 32 - 2 * mat_w(w), n);
const mat_w = w => Math.round(w * 0.11);
const mug = (cx, by, s, body, mark) => shadow(cx, by, 170 * s)
  + `<path d="M${cx + 120 * s} ${by - 240 * s}q${120 * s} 0 ${120 * s} ${95 * s}t-${120 * s} ${95 * s}" fill="none" stroke="${body}" stroke-width="${34 * s}"/>`
  + R(cx - 130 * s, by - 300 * s, 260 * s, 300 * s, body, 22 * s) + R(cx - 130 * s, by - 300 * s, 260 * s, 300 * s, 'url(#sh)', 22 * s) + E(cx, by - 296 * s, 126 * s, 18 * s, '#000', 'opacity=".35"') + mark;
const camera = (cx, cy, s, t) => shadow(cx, cy + 190 * s, 300 * s)
  + R(cx - 150 * s, cy - 200 * s, 190 * s, 70 * s, t.d, 12 * s) + R(cx - 290 * s, cy - 150 * s, 580 * s, 330 * s, t.d, 34 * s) + R(cx - 290 * s, cy - 150 * s, 580 * s, 330 * s, 'url(#sh)', 34 * s)
  + R(cx - 290 * s, cy - 60 * s, 580 * s, 150 * s, t.m, 0, 'opacity=".35"') + R(cx + 170 * s, cy - 190 * s, 70 * s, 44 * s, t.d, 8 * s) + C(cx + 215 * s, cy - 100 * s, 16 * s, t.x)
  + C(cx, cy + 20 * s, 150 * s, '#0a0a0a') + C(cx, cy + 20 * s, 118 * s, t.m) + C(cx, cy + 20 * s, 86 * s, '#0a0a0a') + C(cx, cy + 20 * s, 50 * s, '#1c2b3a') + C(cx - 26 * s, cy - 6 * s, 16 * s, '#fff', 'opacity=".55"');
const pen = (cx, cy, s, t, rot = -24) => `<g transform="rotate(${rot} ${cx} ${cy})">` + R(cx - 300 * s, cy - 18 * s, 520 * s, 36 * s, t.d, 18 * s) + R(cx - 300 * s, cy - 18 * s, 520 * s, 14 * s, '#fff', 14 * s, 'opacity=".18"')
  + R(cx + 40 * s, cy - 20 * s, 26 * s, 40 * s, t.x) + R(cx - 250 * s, cy - 34 * s, 180 * s, 12 * s, t.x, 6 * s) + P(`M${cx + 220 * s} ${cy - 18 * s}l${90 * s} ${18 * s}l-${90 * s} ${18 * s}z`, t.x) + '</g>';
const book = (x, y, w, h, cover, band, label = '') => R(x + 12, y + 14, w, h, '#000', 10, 'opacity=".3"') + R(x, y, w, h, cover, 10) + R(x, y, 26, h, '#000', 10, 'opacity=".25"') + R(x + w - 70, y, 18, h, band) + (label ? txt(x + w / 2 - 20, y + h / 2 + 14, 44, band, label, 'letter-spacing="6"') : '');

const ART = {
  // people
  portrait: t => studio(t, person(600, 900, 1.45, t.d, { hair: '#000' })),
  heroPortrait: t => wrap(t, C(860, 360, 330, t.l, 'opacity=".22"') + C(860, 360, 210, t.l, 'opacity=".2"') + person(860, 900, 1.15, t.d, { hair: '#000' }), { floor: 780 }),
  family: t => studio(t, person(330, 900, 1.0, t.m) + person(870, 900, 1.05, t.m) + person(600, 900, 1.25, t.d, { hair: '#000' }) + person(470, 900, 0.62, '#000') + person(740, 900, 0.56, '#000')),
  grad: t => studio(t, person(600, 900, 1.4, t.d, { cap: true })),
  grads: t => studio(t, person(300, 900, 1.0, t.m, { cap: true }) + person(900, 900, 1.0, t.m, { cap: true }) + person(600, 900, 1.25, t.d, { cap: true })),
  team: t => studio(t, [180, 390, 810, 1020].map((x, i) => person(x, 900, 0.85, i % 2 ? t.m : '#000')).join('') + person(600, 900, 1.15, t.d)),
  // framing
  wall: t => wrap(t, frame(110, 190, 300, 380, t.d, t.l, 'veld', 1) + frame(450, 130, 330, 440, '#0b0b0b', t.l, 'sea', 2) + frame(820, 210, 270, 340, t.x, t.l, 'peaks', 3) + R(250, 660, 700, 26, t.d, 4) + R(300, 686, 24, 214, t.d) + R(876, 686, 24, 214, t.d), { floor: 700 }),
  shelf: t => wrap(t, [0, 1, 2, 3].map(i => frame(150 + i * 235, 300 + (i % 2) * 60, 200, 260 - (i % 2) * 60, [t.d, t.x, '#0b0b0b', t.m][i], t.l, ['sea', 'peaks', 'veld', 'sea'][i], i)).join('') + R(90, 560, 1020, 24, t.d, 4), { floor: 584 }),
  canvas: t => wrap(t, R(262, 172, 700, 500, '#000', 0, 'opacity=".35"') + P('M950 150l34 26v500l-34-26z', t.m) + inset('sea', 250, 150, 700, 500), { floor: 720 }),
  block: t => wrap(t, R(322, 192, 580, 440, '#000', 0, 'opacity=".4"') + R(300, 170, 580, 440, '#111') + inset('peaks', 306, 176, 568, 428), { floor: 720 }),
  snapper: t => wrap(t, R(392, 122, 440, 620, '#000', 0, 'opacity=".35"') + R(380, 110, 440, 620, '#c9ccd0', 6) + R(408, 138, 384, 564, t.l) + inset('veld', 430, 170, 340, 300, 1) + R(430, 500, 340, 26, t.d) + R(430, 546, 240, 16, t.m) + R(430, 580, 280, 16, t.m) + [[380, 110], [796, 110], [380, 706], [796, 706]].map(([x, y]) => R(x, y, 24, 24, '#8d9197')).join(''), { floor: 780 }),
  custom: t => wrap(t, R(140, 600, 920, 40, t.m, 6) + [0, 1, 2, 3, 4].map(i => P(`M${220 + i * 150} 600v-${330 + i * 22}h70v${330 + i * 22 - 70}h-70z`, [t.d, t.x, '#0b0b0b', t.l, t.m][i]) + R(220 + i * 150, 270 - i * 22, 16, 330 + i * 22, '#fff', 0, 'opacity=".15"')).join('') + frame(760, 250, 260, 330, t.x, t.l, 'sea', 1), { floor: 640 }),
  photobook: t => wrap(t, shadow(600, 700, 420) + P('M170 300q215-50 430 20v380q-215-70-430-20z', t.l) + P('M1030 300q-215-50-430 20v380q215-70 430-20z', '#fff') + inset('sea', 220, 350, 320, 220, 1) + inset('veld', 660, 350, 320, 220, 2) + R(596, 318, 8, 384, '#000', 0, 'opacity=".25"'), { floor: 680 }),
  prints: t => wrap(t, [-16, 9, -3].map((r, i) => `<g transform="rotate(${r} 600 450)">` + R(330 + i * 20, 220 + i * 10, 520, 420, '#000', 0, 'opacity=".25"') + R(320 + i * 20, 210 + i * 10, 520, 420, '#fff') + inset(['veld', 'peaks', 'sea'][i], 345 + i * 20, 235 + i * 10, 470, 320, i) + '</g>').join(''), { floor: 0 }),
  // camera shop
  camera: t => wrap(t, camera(600, 440, 1, t)),
  instax: t => wrap(t, shadow(600, 690, 280) + R(350, 200, 500, 480, t.l, 90) + R(350, 200, 500, 480, 'url(#sh)', 90) + C(600, 430, 150, '#fff') + C(600, 430, 118, t.d) + C(600, 430, 70, '#22303c') + C(575, 405, 18, '#fff', 'opacity=".6"') + R(420, 240, 110, 60, t.d, 14) + C(760, 270, 26, t.x) + R(520, 180, 160, 30, '#fff', 6)),
  film: t => wrap(t, shadow(600, 700, 360) + [0, 1].map(i => R(300 + i * 320, 300 - i * 40, 280, 390 + i * 40, i ? t.x : t.l, 14) + R(300 + i * 320, 300 - i * 40, 280, 390 + i * 40, 'url(#sh)', 14) + R(340 + i * 320, 360 - i * 40, 200, 150, '#fff', 4) + R(352 + i * 320, 372 - i * 40, 176, 104, t.d) + txt(440 + i * 320, 620, 40, i ? '#fff' : t.d, i ? '×20' : '×10', 'font-weight="700"')).join('')),
  tripod: t => wrap(t, shadow(600, 800, 300) + P('M585 330L330 800h44L600 380z', t.d) + P('M615 330L870 800h-44L600 380z', t.d) + R(586, 330, 28, 470, t.m) + R(540, 270, 120, 70, t.d, 12) + R(500, 240, 200, 36, t.x, 8) + camera(600, 170, 0.36, t), { floor: 790 }),
  backpack: t => wrap(t, shadow(600, 760, 300) + P('M470 230q0-110 130-110t130 110', 'none', `stroke="${t.d}" stroke-width="30"`) + R(360, 210, 480, 550, t.d, 110) + R(360, 210, 480, 550, 'url(#sh)', 110) + R(420, 470, 360, 230, t.m, 40) + R(420, 520, 360, 14, t.x) + R(470, 290, 260, 90, t.m, 30) + C(600, 335, 16, t.x), { floor: 740 }),
  // gifts & branded
  mug: t => wrap(t, mug(580, 700, 1.25, t.l, inset('veld', 470, 380, 220, 190, 1))),
  mugLogo: t => wrap(t, mug(580, 700, 1.25, t.d, C(580, 500, 70, 'none', `stroke="${t.x}" stroke-width="10"`) + txt(580, 524, 70, t.x, 'P', 'font-style="italic"'))),
  travelMug: t => wrap(t, shadow(600, 770, 190) + P('M470 250h260l-30 510H500z', t.d) + P('M470 250h260l-30 510H500z', 'url(#sh)') + R(455, 190, 290, 70, t.m, 20) + R(540, 160, 120, 40, t.d, 12) + R(486, 420, 228, 150, t.x, 0, 'opacity=".9"') + txt(600, 518, 60, '#fff', 'P', 'font-style="italic"'), { floor: 750 }),
  candle: t => wrap(t, C(600, 240, 150, '#ffd98a', 'opacity=".25"') + shadow(600, 720, 220) + R(430, 360, 340, 360, t.l, 18) + R(430, 360, 340, 360, 'url(#sh)', 18) + E(600, 362, 168, 22, '#fff') + R(596, 300, 8, 62, '#222') + P('M600 190q46 60 0 116q-46-56 0-116z', '#ffb347') + P('M600 232q20 30 0 62q-20-32 0-62z', '#fff3c4') + inset('sea', 480, 450, 240, 190, 1)),
  memory: t => wrap(t, shadow(600, 720, 300) + P('M330 280h440l60 50v400H390l-60-50z', t.m) + R(390, 330, 440, 400, t.l) + inset('veld', 420, 360, 380, 340, 1) + P('M330 280h440l60 50H390z', '#fff', 'opacity=".5"')),
  keychain: t => wrap(t, C(600, 230, 90, 'none', `stroke="${t.l}" stroke-width="18"`) + R(588, 310, 24, 110, t.l) + shadow(600, 770, 200) + R(450, 410, 300, 340, t.d, 40) + R(450, 410, 300, 340, 'url(#sh)', 40) + inset('sea', 485, 450, 230, 260, 1), { floor: 0 }),
  pen: t => wrap(t, R(250, 560, 700, 150, t.d, 14, 'opacity=".55"') + pen(600, 480, 1.2, t) + txt(600, 650, 36, t.l, 'engraved for you', 'font-style="italic" opacity=".7"'), { floor: 0 }),
  diary: t => wrap(t, book(390, 170, 420, 560, t.d, t.x, '2027'), { floor: 760 }),
  stationery: t => wrap(t, book(250, 250, 320, 430, t.m, t.l) + book(470, 200, 340, 460, t.d, t.x, '2027') + R(840, 300, 150, 380, t.l, 6) + R(860, 340, 110, 12, t.m) + R(860, 370, 80, 12, t.m) + pen(900, 560, 0.5, t, -70), { floor: 700 }),
  glass: t => wrap(t, shadow(600, 760, 190) + P('M450 200h300l-40 550H490z', '#fff', 'opacity=".22"') + P('M450 200h300l-40 550H490z', 'none', 'stroke="#fff" stroke-opacity=".7" stroke-width="6"') + P('M468 420h264l-24 330H492z', t.x, 'opacity=".35"') + C(600, 330, 60, 'none', 'stroke="#fff" stroke-opacity=".8" stroke-width="5"') + txt(600, 352, 62, '#fff', 'P', 'font-style="italic" opacity=".85"'), { floor: 740 }),
  bottle: t => wrap(t, shadow(600, 790, 330) + [[-190, t.d, 1], [0, t.x, 1.12], [190, t.l, 0.94]].map(([dx, f, s]) => R(600 + dx - 70 * s, 780 - 500 * s, 140 * s, 500 * s, f, 34 * s) + R(600 + dx - 70 * s, 780 - 500 * s, 140 * s, 500 * s, 'url(#sh)', 34 * s) + R(600 + dx - 44 * s, 780 - 560 * s, 88 * s, 70 * s, t.m, 12 * s)).join(''), { floor: 770 }),
  trophy: t => wrap(t, shadow(600, 780, 230) + P('M430 170h340q0 250-170 300q-170-50-170-300z', t.x) + P('M430 170h340q0 250-170 300q-170-50-170-300z', 'url(#sh)') + P('M430 210q-120 0-110 90t130 110', 'none', `stroke="${t.x}" stroke-width="26"`) + P('M770 210q120 0 110 90t-130 110', 'none', `stroke="${t.x}" stroke-width="26"`) + R(570, 460, 60, 150, t.x) + R(480, 600, 240, 50, t.x, 8) + R(440, 650, 320, 130, t.d, 10) + R(500, 690, 200, 50, t.x, 4, 'opacity=".8"'), { floor: 760 }),
  cards: t => wrap(t, [0, 1, 2, 3].map(i => `<g transform="rotate(${-14 + i * 9} 600 480)">` + R(350 + i * 14, 360 - i * 10, 500, 290, '#000', 8, 'opacity=".25"') + R(340 + i * 14, 350 - i * 10, 500, 290, i === 3 ? t.l : [t.d, t.m, t.x][i], 8) + '</g>').join('') + `<g transform="rotate(13 600 480)">` + txt(560, 470, 64, t.d, "Pollock's", 'font-style="italic"') + R(430, 510, 220, 10, t.m) + R(430, 540, 160, 10, t.m) + '</g>', { floor: 0 }),
  cap: t => wrap(t, shadow(620, 700, 360) + P('M330 600q0-330 280-330t280 330z', t.d) + P('M330 600q0-330 280-330t280 330z', 'url(#sh)') + P('M330 600q-150 10-190 80q260 50 480-20l270-60z', t.m) + C(610, 270, 22, t.x) + R(520, 420, 180, 110, t.x, 10) + txt(610, 500, 70, '#fff', 'P', 'font-style="italic"') + P('M610 290v310', 'none', 'stroke="#000" stroke-opacity=".3" stroke-width="4" stroke-dasharray="10 10"')),
  polo: t => wrap(t, P('M410 190l-230 110 70 170 110-50v400h480V420l110 50 70-170-230-110q-95 70-190 70t-190-70z', t.d) + P('M410 190q95 70 190 70t190-70l-60-40h-260z', t.m) + P('M560 250v170h80V250', 'none', `stroke="${t.m}" stroke-width="8"`) + R(660, 330, 90, 60, t.x, 6), { floor: 0 }),
  banner: t => wrap(t, shadow(600, 810, 300) + R(380, 110, 440, 690, t.l) + R(380, 110, 440, 250, t.x) + txt(600, 270, 90, '#fff', "Pollock's", 'font-style="italic"') + R(430, 420, 340, 22, t.d) + R(430, 470, 260, 16, t.m) + R(430, 505, 300, 16, t.m) + R(430, 600, 180, 60, t.d, 6) + R(350, 96, 500, 18, t.d, 6) + R(330, 800, 540, 20, t.d, 6), { floor: 800 }),
  flatlay: t => wrap(t, book(140, 200, 340, 460, t.d, t.x, '2027') + mug(700, 640, 0.95, t.l, C(700, 500, 44, 'none', `stroke="${t.x}" stroke-width="8"`) + txt(700, 516, 46, t.x, 'P', 'font-style="italic"')) + pen(830, 740, 0.7, t, -12) + R(900, 240, 210, 130, t.l, 6, 'transform="rotate(8 1000 300)"') + R(890, 290, 210, 130, t.x, 6, 'transform="rotate(-6 1000 350)"'), { floor: 0 }),
  // gallery & places
  sea: () => landscape('sea'), peaks: () => landscape('peaks'), veld: () => landscape('veld'),
  shop: t => wrap(t, R(140, 200, 920, 560, t.l) + R(140, 200, 920, 120, t.d) + txt(600, 285, 84, t.l, "Pollock's", 'font-style="italic"') + P('M120 320h960l40 90H80z', t.x) + [0, 1, 2, 3, 4, 5, 6, 7].map(i => P(`M${120 + i * 120} 320h60l5 90h-70z`, '#fff', 'opacity=".35"')).join('') + R(200, 450, 300, 250, '#1b2730') + R(700, 450, 300, 250, '#1b2730') + R(530, 450, 140, 310, t.d) + C(650, 610, 8, t.x) + frame(230, 480, 110, 140, t.x, '#fff', 'sea', 1) + frame(360, 480, 110, 140, '#111', '#fff', 'veld', 2) + camera(850, 590, 0.3, t), { floor: 760 }),
  // artwork library
  logoA: t => wrap(t, C(600, 400, 190, 'none', `stroke="${t.x}" stroke-width="16"`) + txt(600, 470, 230, t.x, 'P', 'font-style="italic"') + txt(600, 720, 60, t.d, 'MTHATHA ROAD DENTAL', 'letter-spacing="10"'), { floor: 0 }),
  doc: t => wrap(t, R(372, 92, 480, 700, '#000', 0, 'opacity=".3"') + R(360, 80, 480, 700, '#fff') + C(430, 150, 34, 'none', `stroke="${t.x}" stroke-width="6"`) + R(490, 130, 220, 16, t.d) + R(490, 160, 140, 10, t.m) + [0, 1, 2, 3, 4, 5, 6, 7].map(i => R(410, 260 + i * 52, i % 3 === 2 ? 240 : 380, 14, '#c9c9c9')).join('') + R(410, 700, 380, 6, t.x), { floor: 0 }),
  apptCard: t => wrap(t, R(232, 252, 760, 440, '#000', 16, 'opacity=".3"') + R(220, 240, 760, 440, '#fff', 16) + R(220, 240, 760, 110, t.x, 16) + txt(600, 318, 54, '#fff', 'Your next appointment') + [0, 1, 2].map(i => R(280, 420 + i * 70, 640, 4, '#bbb')).join('') + C(300, 400, 0, 'none'), { floor: 0 }),
};
const WHITE = { a: '#f4f4f1', b: '#c9c9c4', d: '#141414', m: '#6a6a66', l: '#fff', x: '#1e6f6a' };
const DARKT = { a: '#2a2d31', b: '#0b0c0e', d: '#f2f2f0', m: '#9a9a96', l: '#fff', x: '#f2f2f0' };

// slot id → [scene, theme]
const SLOTS = {
  'hero-0': ['heroPortrait', 'warm'], 'hero-1': ['wall', 'stone'], 'hero-2': ['flatlay', 'cool'],
  'pf-0': ['portrait', 'blush'], 'pf-1': ['grads', 'ink'], 'pf-2': ['canvas', 'stone'], 'pf-3': ['cards', 'cool'], 'pf-4': ['veld', 'warm'],
  'home-photo': ['family', 'warm'], 'home-copy': ['banner', 'cool'],
  'bs-0': ['portrait', 'stone'], 'bs-1': ['canvas', 'warm'], 'bs-2': ['mug', 'blush'], 'bs-3': ['pen', 'ink'], 'bs-4': ['film', 'blush'],
  'ig-0': ['grad', 'warm'], 'ig-1': ['sea', 'warm'], 'ig-2': ['mug', 'cool'], 'ig-3': ['wall', 'blush'], 'ig-4': ['camera', 'stone'], 'ig-5': ['family', 'ink'], 'ig-6': ['peaks', 'cool'], 'ig-7': ['trophy', 'ink'],
  'mega-photo-0': ['portrait', 'ink'], 'mega-photo-1': ['shelf', 'warm'], 'mega-photo-2': ['camera', 'cool'],
  'mega-copy-0': ['mugLogo', 'stone'], 'mega-copy-1': ['glass', 'ink'], 'mega-copy-2': ['doc', 'cool'],
  's1': ['family', 'stone'],
  's2-0': ['portrait', 'warm'], 's2-1': ['grads', 'cool'], 's2-2': ['prints', 'stone'], 's2-3': ['shelf', 'stone'], 's2-4': ['photobook', 'warm'], 's2-5': ['camera', 'ink'], 's2-6': ['candle', 'blush'],
  's3': ['family', 'blush'],
  's4-0': ['shelf', 'cool'], 's4-1': ['canvas', 'ink'], 's4-2': ['block', 'stone'], 's4-3': ['snapper', 'cool'], 's4-4': ['custom', 'warm'],
  'gear-canon-eos-r100-kit': ['camera', 'stone'], 'gear-fujifilm-instax-mini-12': ['instax', 'blush'], 'gear-manfrotto-tripod': ['tripod', 'cool'], 'gear-lowepro-backpack': ['backpack', 'warm'],
  's7': ['flatlay', 'stone'],
  's8-0': ['cards', 'stone'], 's8-1': ['stationery', 'cool'], 's8-2': ['bottle', 'ink'], 's8-3': ['trophy', 'warm'], 's8-4': ['cap', 'cool'], 's8-5': ['banner', 'ink'],
  'item-photo-mug': ['mug', 'warm'], 'item-candle': ['candle', 'ink'], 'item-memory-block': ['memory', 'stone'], 'item-keychain': ['keychain', 'cool'],
  'item-parker-pen': ['pen', 'stone'], 'item-travel-mug': ['travelMug', 'cool'], 'item-diary-2027': ['diary', 'warm'], 'item-glass': ['glass', 'cool'],
  's10-0': ['logoA', WHITE], 's10-1': ['logoA', DARKT], 's10-2': ['apptCard', 'cool'], 's10-3': ['doc', 'stone'],
  'art-nahoon-at-dawn': ['sea', 'warm'], 'art-drakensberg-mist': ['peaks', 'cool'],
  'about-shopfront': ['shop', 'stone'],
};

mkdirSync(OUT, { recursive: true });
for (const [id, [scene, theme]] of Object.entries(SLOTS)) {
  writeFileSync(new URL(id + '.svg', OUT), ART[scene](typeof theme === 'string' ? T[theme] : theme).replace(/\n\s*/g, ''));
}
console.log(`wrote ${Object.keys(SLOTS).length} images to src/photos/`);
