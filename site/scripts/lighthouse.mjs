// Lighthouse (mobile preset) against built pages. Target: 95+ in every category.
// Usage: node scripts/lighthouse.mjs <baseUrl> /path [/path ...]
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { chromium } from 'playwright';

const [baseUrl, ...paths] = process.argv.slice(2);
if (!baseUrl || paths.length === 0) {
  console.error('Usage: node scripts/lighthouse.mjs <baseUrl> /path [/path ...]');
  process.exit(1);
}

const chrome = await chromeLauncher.launch({
  chromePath: process.env.CHROME_PATH || chromium.executablePath(),
  chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu'],
});
let failed = false;
for (const p of paths) {
  const result = await lighthouse(new URL(p, baseUrl).href, {
    port: chrome.port,
    output: 'json',
    logLevel: 'error',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  });
  const cats = result.lhr.categories;
  const scores = Object.fromEntries(Object.entries(cats).map(([k, v]) => [k, Math.round((v.score ?? 0) * 100)]));
  const low = Object.entries(scores).filter(([, s]) => s < 95);
  if (low.length) failed = true;
  console.log(`${low.length ? '✗' : '✓'} ${p}`, scores);
  for (const [k] of low) {
    const audits = cats[k].auditRefs
      .map((r) => result.lhr.audits[r.id])
      .filter((a) => a.score !== null && a.score < 0.9 && a.scoreDisplayMode !== 'informative')
      .slice(0, 6);
    for (const a of audits) console.log(`    [${k}] ${a.id}: ${a.title}${a.displayValue ? ` (${a.displayValue})` : ''}`);
  }
}
await chrome.kill();
process.exit(failed ? 1 : 0);
