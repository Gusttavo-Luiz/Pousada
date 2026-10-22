/**
 * Gera favicons PNG e a imagem de compartilhamento (og-image.jpg) a partir
 * da marca provisória. Rode com `node scripts/generate-brand-assets.mjs`
 * sempre que a marca mudar (requer o Chromium do Playwright).
 */
import { chromium } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const font = (pkg, file) =>
  `data:font/woff2;base64,${readFileSync(fileURLToPath(new URL(`node_modules/@fontsource-variable/${pkg}/files/${file}`, root))).toString('base64')}`;

const fonts = `
  @font-face { font-family: Playfair; src: url(${font('playfair-display', 'playfair-display-latin-wght-normal.woff2')}); font-weight: 400 900; }
  @font-face { font-family: Playfair; font-style: italic; src: url(${font('playfair-display', 'playfair-display-latin-wght-italic.woff2')}); font-weight: 400 900; }
  @font-face { font-family: Manrope; src: url(${font('manrope', 'manrope-latin-wght-normal.woff2')}); font-weight: 200 800; }
`;

const ridges = `
  <path d="M0 560 70 532l60 16 90-62 70 30 64-40 96 58 70-24 110 36 84-70 74 44 66-12 100 52 92-60 84 42 76-26 94 46 82-32 108 40 110-18V900H0Z" fill="#30483b"/>
  <path d="M0 640c120-38 210-70 330-46s200 52 320 18 210-70 340-40 220 64 330 36 170-46 280-30v322H0Z" fill="#263d32"/>
  <path d="M0 724c150-40 280-58 420-30s240 40 380 4 260-46 400-14 280 38 400 14v202H0Z" fill="#1c2f26"/>
  <path d="M0 812c200-30 360-44 560-18s340 26 520 2 360-22 520 0v104H0Z" fill="#14211b"/>`;

const og = `<!doctype html><html><head><style>${fonts}
  body{margin:0;width:1200px;height:630px;overflow:hidden;background:#14211b;font-family:Manrope}
  svg{position:absolute;inset:0;width:100%;height:100%}
  .t{position:absolute;left:84px;top:150px;color:#fcfaf6}
  .e{font-size:18px;letter-spacing:.32em;text-transform:uppercase;color:#d8c49e;font-weight:600}
  h1{font-family:Playfair;font-weight:400;font-size:88px;line-height:1.02;margin:22px 0 0}
  h1 em{color:#d8c49e}
  p{font-size:24px;margin-top:26px;color:rgba(252,250,246,.8)}
</style></head><body>
<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice">
  <defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#101b16"/><stop offset=".55" stop-color="#1b2c24"/><stop offset="1" stop-color="#33493d"/></linearGradient>
  <radialGradient id="h"><stop offset="0" stop-color="#d8c49e" stop-opacity=".35"/><stop offset=".35" stop-color="#d8c49e" stop-opacity=".12"/><stop offset="1" stop-color="#d8c49e" stop-opacity="0"/></radialGradient></defs>
  <rect width="1600" height="900" fill="url(#s)"/><circle cx="1260" cy="250" r="300" fill="url(#h)"/><circle cx="1260" cy="250" r="70" fill="#f3eee5"/>${ridges}
</svg>
<div class="t"><div class="e">Lavras Novas · Minas Gerais</div><h1>Luar de Minas<br><em>Suítes</em></h1><p>Desacelere. Respire. Viva Minas.</p></div>
</body></html>`;

const icon = (size) => `<!doctype html><html><body style="margin:0">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}"><rect width="64" height="64" fill="#263d32"/><path d="M40 14a19 19 0 1 0 8.6 24.4A16 16 0 0 1 40 14Z" fill="#d8c49e"/></svg></body></html>`;

const browser = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH || undefined });
const page = await browser.newPage();
const out = (name) => fileURLToPath(new URL(`public/${name}`, root));

await page.setViewportSize({ width: 1200, height: 630 });
await page.setContent(og);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: out('og-image.jpg'), type: 'jpeg', quality: 86 });

for (const [name, size] of [['favicon-32.png', 32], ['apple-touch-icon.png', 180], ['icon-192.png', 192], ['icon-512.png', 512]]) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(icon(size));
  await page.screenshot({ path: out(name), type: 'png' });
}

await browser.close();
console.log('Imagens da marca geradas em public/.');
