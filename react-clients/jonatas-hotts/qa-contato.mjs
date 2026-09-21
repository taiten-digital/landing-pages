import { chromium } from 'playwright';
const OUT = 'C:\Users\enzor\AppData\Local\Temp\claude\E--taiten-projetos-landing-pages-v2\e4951f6b-0fde-4a7a-ab72-f44ef0d103c7\scratchpad';
const browser = await chromium.launch();
const page = await browser.newPage();
for (const w of [320, 360, 375, 414]) {
  await page.setViewportSize({ width: w, height: 700 });
  await page.goto('http://localhost:4321/#contato', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.getElementById('contato')?.scrollIntoView({ block: 'start' }));
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}\fix-contato-${w}.png`, clip: { x: 0, y: 0, width: w, height: 500 } });
}
await browser.close();
