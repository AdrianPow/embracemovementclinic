// Full-page screenshots of built pages at desktop and mobile widths.
// Usage: node scripts/screenshot.mjs <baseUrl> <outDir> /path [/path ...]
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const [baseUrl, outDir, ...paths] = process.argv.slice(2);
if (!baseUrl || !outDir || paths.length === 0) {
  console.error('Usage: node scripts/screenshot.mjs <baseUrl> <outDir> /path [/path ...]');
  process.exit(1);
}

const viewports = [
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'mobile', width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
];

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();
for (const vp of viewports) {
  const { name, ...options } = vp;
  const context = await browser.newContext({ viewport: { width: options.width, height: options.height }, ...options });
  const page = await context.newPage();
  for (const p of paths) {
    await page.goto(new URL(p, baseUrl).href, { waitUntil: 'networkidle' });
    // Load lazy images below the fold before capturing (capture only; the site keeps lazy loading).
    await page.evaluate(async () => {
      const imgs = [...document.images];
      imgs.forEach((img) => (img.loading = 'eager'));
      const settle = (img) =>
        img.complete ? null : new Promise((r) => { img.addEventListener('load', r, { once: true }); img.addEventListener('error', r, { once: true }); });
      await Promise.race([Promise.all(imgs.map(settle)), new Promise((r) => setTimeout(r, 5000))]);
      await document.fonts.ready;
    });
    const slug = p === '/' ? 'home' : p.replace(/^\//, '').replace(/[^a-z0-9]+/gi, '-');
    const file = path.join(outDir, `${slug}-${name}.png`);
    await page.screenshot({ path: file, fullPage: true });
    console.log(file);
  }
  await context.close();
}
await browser.close();
