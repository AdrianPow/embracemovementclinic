// Captures the current live website into ../reference so Claude Code can rebuild it.
// Run on your own computer:  npm install && npx playwright install chromium && npm run capture
// Optional:  npm run capture -- https://other-start-url/   |  MAX_PAGES=200  |  HEADLESS=false

import { chromium, devices } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const START = process.argv[2] || 'https://www.embracemovementclinic.com.au/';
const MAX_PAGES = Number(process.env.MAX_PAGES || 100);
const HEADLESS = process.env.HEADLESS !== 'false';
const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(HERE, '..', 'reference');

const startUrl = new URL(START);
const siteHost = startUrl.hostname.replace(/^www\./, '');
const SKIP_EXT = /\.(jpe?g|png|gif|webp|svg|ico|mp4|mov|zip|css|js|xml|json)$/i;
const DOC_EXT = /\.(pdf|docx?|xlsx?|pptx?)$/i;

const isSameSite = (u) => u.hostname.replace(/^www\./, '') === siteHost;
const normalise = (href) => {
  const u = new URL(href);
  u.hash = '';
  u.search = '';
  if (u.pathname.length > 1) u.pathname = u.pathname.replace(/\/+$/, '');
  return u.toString();
};
const slugFor = (url) => {
  const p = new URL(url).pathname.replace(/^\/|\/$/g, '');
  return p ? p.replace(/[^a-z0-9]+/gi, '_').toLowerCase() : 'home';
};
const safeName = (url) => {
  const u = new URL(url);
  const base = path.basename(u.pathname).replace(/[^a-z0-9._-]+/gi, '_') || 'file';
  const hash = crypto.createHash('md5').update(url).digest('hex').slice(0, 8);
  return `${hash}-${base}`.slice(0, 120);
};

async function ensureDir(d) { await fs.mkdir(d, { recursive: true }); }
async function writeJson(f, data) { await fs.writeFile(f, JSON.stringify(data, null, 2)); }

async function fetchText(request, url) {
  try {
    const r = await request.get(url, { timeout: 20000 });
    return r.ok() ? await r.text() : null;
  } catch { return null; }
}

async function sitemapUrls(request) {
  const found = new Set();
  const queue = [new URL('/sitemap.xml', startUrl).toString()];
  const seen = new Set();
  while (queue.length) {
    const sm = queue.shift();
    if (seen.has(sm)) continue;
    seen.add(sm);
    const xml = await fetchText(request, sm);
    if (!xml) continue;
    await fs.writeFile(path.join(OUT, `sitemap_${seen.size}.xml`), xml);
    for (const m of xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)) {
      const loc = m[1].replace(/&amp;/g, '&');
      if (/\.xml($|\?)/i.test(loc)) queue.push(loc);
      else found.add(loc);
    }
  }
  return [...found];
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0;
      const step = () => {
        window.scrollBy(0, 600);
        y += 600;
        if (y < document.body.scrollHeight && y < 30000) setTimeout(step, 150);
        else { window.scrollTo(0, 0); resolve(); }
      };
      step();
    });
  });
}

async function load(page, url) {
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
  } catch {
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
  }
  await autoScroll(page);
  await page.waitForTimeout(1200);
}

function extract() {
  const abs = (u) => { try { return new URL(u, location.href).toString(); } catch { return null; } };
  const meta = (sel) => document.querySelector(sel)?.getAttribute('content') || null;
  const labelFor = (el) => {
    if (el.id) { const l = document.querySelector(`label[for="${CSS.escape(el.id)}"]`); if (l) return l.innerText.trim(); }
    return el.closest('label')?.innerText.trim() || el.getAttribute('aria-label') || null;
  };
  const bestSrc = (img) => {
    const set = img.getAttribute('srcset') || img.getAttribute('data-srcset');
    if (set) {
      const parts = set.split(',').map((s) => s.trim().split(/\s+/)).filter((p) => p[0]);
      parts.sort((a, b) => parseFloat(b[1] || 0) - parseFloat(a[1] || 0));
      return abs(parts[0][0]);
    }
    return abs(img.currentSrc || img.src || img.getAttribute('data-src'));
  };
  const bgImages = [...document.querySelectorAll('*')]
    .map((el) => getComputedStyle(el).backgroundImage)
    .filter((b) => b && b.startsWith('url('))
    .map((b) => abs(b.slice(4, -1).replace(/["']/g, '')))
    .filter(Boolean);

  const colourCounts = {};
  const fonts = new Set();
  for (const el of document.querySelectorAll('body *')) {
    const cs = getComputedStyle(el);
    for (const c of [cs.color, cs.backgroundColor]) {
      if (c && c !== 'rgba(0, 0, 0, 0)') colourCounts[c] = (colourCounts[c] || 0) + 1;
    }
    if (el.innerText && el.children.length === 0) fonts.add(cs.fontFamily);
  }
  const styleOf = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const cs = getComputedStyle(el);
    return { fontFamily: cs.fontFamily, fontSize: cs.fontSize, fontWeight: cs.fontWeight, color: cs.color, background: cs.backgroundColor };
  };

  return {
    title: document.title,
    description: meta('meta[name="description"]'),
    canonical: document.querySelector('link[rel="canonical"]')?.href || null,
    ogTitle: meta('meta[property="og:title"]'),
    ogDescription: meta('meta[property="og:description"]'),
    ogImage: meta('meta[property="og:image"]'),
    generator: meta('meta[name="generator"]'),
    lang: document.documentElement.lang,
    headings: [...document.querySelectorAll('h1,h2,h3,h4')].map((h) => ({ level: h.tagName, text: h.innerText.trim() })).filter((h) => h.text),
    text: document.body.innerText,
    links: [...document.querySelectorAll('a[href]')].map((a) => ({ text: a.innerText.trim(), href: abs(a.getAttribute('href')) || a.getAttribute('href') })),
    images: [...document.querySelectorAll('img')].map((img) => ({ src: bestSrc(img), alt: img.alt || '', width: img.naturalWidth, height: img.naturalHeight })).filter((i) => i.src),
    backgroundImages: [...new Set(bgImages)],
    forms: [...document.querySelectorAll('form')].map((f) => ({
      action: f.getAttribute('action') ? abs(f.getAttribute('action')) : null,
      method: (f.getAttribute('method') || 'get').toLowerCase(),
      fields: [...f.querySelectorAll('input,select,textarea')].filter((el) => el.type !== 'hidden').map((el) => ({
        tag: el.tagName.toLowerCase(), type: el.type || null, name: el.name || null, label: labelFor(el), placeholder: el.placeholder || null, required: el.required,
      })),
    })),
    iframes: [...document.querySelectorAll('iframe')].map((f) => abs(f.src)).filter(Boolean),
    scripts: [...document.querySelectorAll('script[src]')].map((s) => abs(s.src)).filter(Boolean),
    styles: {
      body: styleOf('body'), h1: styleOf('h1'), h2: styleOf('h2'), link: styleOf('a'), button: styleOf('button, .button, .btn, a[class*="button"]'), header: styleOf('header'), footer: styleOf('footer'),
      topColours: Object.entries(colourCounts).sort((a, b) => b[1] - a[1]).slice(0, 15),
      fonts: [...fonts],
    },
  };
}

function toMarkdown(url, d) {
  const lines = [`# ${d.title || url}`, '', `- URL: ${url}`, `- Meta description: ${d.description || '(none)'}`, `- Canonical: ${d.canonical || '(none)'}`, '', '## Heading outline', ''];
  for (const h of d.headings) lines.push(`${'  '.repeat(Number(h.level[1]) - 1)}- ${h.level}: ${h.text}`);
  lines.push('', '## Visible text (in page order)', '', d.text.trim(), '');
  if (d.forms.length) {
    lines.push('## Forms', '');
    d.forms.forEach((f, i) => {
      lines.push(`### Form ${i + 1} — ${f.method.toUpperCase()} ${f.action || '(no action / handled by script)'}`);
      for (const fl of f.fields) lines.push(`- ${fl.label || fl.placeholder || fl.name || '(unlabelled)'} [${fl.type || fl.tag}]${fl.required ? ' *required' : ''}`);
      lines.push('');
    });
  }
  if (d.iframes.length) lines.push('## Embedded iframes', '', ...d.iframes.map((s) => `- ${s}`), '');
  return lines.join('\n');
}

async function download(request, url, dir, done) {
  if (!url || done.has(url) || url.startsWith('data:')) return done.get(url) || null;
  try {
    const r = await request.get(url, { timeout: 30000 });
    if (!r.ok()) return null;
    const file = path.join(dir, safeName(url));
    await fs.writeFile(file, await r.body());
    const rel = path.relative(OUT, file);
    done.set(url, rel);
    return rel;
  } catch { return null; }
}

const cell = (v) => String(v || '').replace(/\|/g, '\\|').replace(/\s+/g, ' ');

async function main() {
  await ensureDir(OUT);
  const browser = await chromium.launch({ headless: HEADLESS });
  const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const mobile = await browser.newContext({ ...devices['iPhone 13'] });
  const page = await desktop.newPage();
  const mPage = await mobile.newPage();
  const request = desktop.request;

  const robots = await fetchText(request, new URL('/robots.txt', startUrl).toString());
  if (robots) await fs.writeFile(path.join(OUT, 'robots.txt'), robots);

  const fromSitemap = await sitemapUrls(request);
  const queue = [normalise(START), ...fromSitemap.map(normalise)];
  const seen = new Set();
  const inventory = [];
  const thirdParty = new Set();
  const outbound = new Set();
  const contactLinks = new Set();
  const documents = [];
  const assetMap = new Map();
  const imgDir = path.join(OUT, 'images');
  const docDir = path.join(OUT, 'documents');
  await ensureDir(imgDir);
  await ensureDir(docDir);
  let siteStyles = null;

  while (queue.length && inventory.length < MAX_PAGES) {
    const url = queue.shift();
    if (seen.has(url)) continue;
    seen.add(url);
    const slug = slugFor(url);
    const dir = path.join(OUT, 'pages', slug);
    process.stdout.write(`[${inventory.length + 1}] ${url} ... `);
    try {
      await load(page, url);
      const finalUrl = normalise(page.url());
      const data = await page.evaluate(extract);
      await ensureDir(dir);
      await page.screenshot({ path: path.join(dir, 'desktop.png'), fullPage: true });
      await load(mPage, url);
      await mPage.screenshot({ path: path.join(dir, 'mobile.png'), fullPage: true });
      await fs.writeFile(path.join(dir, 'page.html'), await page.content());
      await fs.writeFile(path.join(dir, 'content.md'), toMarkdown(url, data));

      const localImages = [];
      for (const img of data.images) localImages.push({ ...img, local: await download(request, img.src, imgDir, assetMap) });
      const localBg = [];
      for (const bg of data.backgroundImages) localBg.push({ src: bg, local: await download(request, bg, imgDir, assetMap) });
      if (data.ogImage) await download(request, data.ogImage, imgDir, assetMap);

      const { text, styles, ...rest } = data;
      await writeJson(path.join(dir, 'meta.json'), { url, finalUrl, ...rest, images: localImages, backgroundImages: localBg });
      if (!siteStyles) { siteStyles = styles; await writeJson(path.join(OUT, 'styles.json'), styles); }

      for (const s of [...data.scripts, ...data.iframes, ...data.forms.map((f) => f.action).filter(Boolean)]) {
        try { if (!isSameSite(new URL(s))) thirdParty.add(new URL(s).origin + new URL(s).pathname); } catch {}
      }
      for (const l of data.links) {
        const href = l.href || '';
        if (/^(mailto|tel|sms):/i.test(href)) { contactLinks.add(href); continue; }
        let u; try { u = new URL(href); } catch { continue; }
        if (!/^https?:$/.test(u.protocol)) continue;
        if (!isSameSite(u)) { outbound.add(`${l.text || '(no text)'} -> ${u.toString()}`); continue; }
        if (DOC_EXT.test(u.pathname)) {
          if (!documents.find((d) => d.url === u.toString())) documents.push({ url: u.toString(), text: l.text, local: await download(request, u.toString(), docDir, assetMap) });
          continue;
        }
        if (SKIP_EXT.test(u.pathname)) continue;
        const n = normalise(u.toString());
        if (!seen.has(n)) queue.push(n);
      }

      inventory.push({
        url, finalUrl, slug, title: data.title, h1: data.headings.find((h) => h.level === 'H1')?.text || null,
        description: data.description, forms: data.forms.length, iframes: data.iframes.length, images: data.images.length,
        generator: data.generator,
      });
      console.log('ok');
    } catch (err) {
      inventory.push({ url, slug, error: String(err.message || err).split('\n')[0] });
      console.log('FAILED:', err.message?.split('\n')[0]);
    }
  }

  await writeJson(path.join(OUT, 'inventory.json'), { capturedAt: new Date().toISOString(), start: START, pages: inventory, thirdParty: [...thirdParty].sort(), contactLinks: [...contactLinks].sort(), outbound: [...outbound].sort(), documents });

  const md = [
    '# Site capture inventory', '', `Captured ${new Date().toISOString()} from ${START}`, '',
    `Pages captured: ${inventory.filter((p) => !p.error).length}  ·  Failed: ${inventory.filter((p) => p.error).length}  ·  Images: ${assetMap.size}  ·  Documents: ${documents.length}`,
    queue.length ? `\n⚠️ Stopped at MAX_PAGES=${MAX_PAGES}; ${queue.length} URLs still queued. Re-run with a higher MAX_PAGES.` : '', '',
    '## Pages', '', '| Page folder | URL | Title | H1 | Forms | Embeds |', '|---|---|---|---|---|---|',
    ...inventory.map((p) => p.error ? `| ${p.slug} | ${p.url} | **FAILED: ${cell(p.error)}** | | | |` : `| ${p.slug} | ${p.url} | ${cell(p.title)} | ${cell(p.h1)} | ${p.forms} | ${p.iframes} |`),
    '', '## Third-party services detected (scripts, iframes, form endpoints)', '', ...[...thirdParty].sort().map((s) => `- ${s}`),
    '', '## Phone / email / SMS links', '', ...[...contactLinks].sort().map((s) => `- ${s}`),
    '', '## Outbound links', '', ...[...outbound].sort().map((s) => `- ${s}`),
    '', '## Documents', '', ...documents.map((d) => `- ${d.text || ''} — ${d.url} → ${d.local || 'download failed'}`),
    '', `Platform hint (meta generator): ${inventory.find((p) => p.generator)?.generator || 'none found — check third-party list for wix/squarespace/wordpress'}`, '',
  ].join('\n');
  await fs.writeFile(path.join(OUT, 'INVENTORY.md'), md);

  await browser.close();
  console.log(`\nDone. Open reference/INVENTORY.md for the summary.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
