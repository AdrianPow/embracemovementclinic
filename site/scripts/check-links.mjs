// Checks the built site (dist/): every internal link and #anchor resolves, and every
// redirect in public/_redirects points at a page that exists.
// Usage: node scripts/check-links.mjs
import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (p.endsWith('.html')) out.push(p);
  }
  return out;
}

const fileFor = (urlPath) => {
  const clean = urlPath.replace(/\/$/, '') || '/';
  if (clean === '/') return path.join(dist, 'index.html');
  const candidates = [path.join(dist, `${clean}.html`), path.join(dist, clean, 'index.html'), path.join(dist, clean)];
  return candidates.find((c) => existsSync(c) && !c.endsWith(path.sep));
};

const idsCache = new Map();
async function idsIn(file) {
  if (!idsCache.has(file)) {
    const html = await readFile(file, 'utf8');
    idsCache.set(file, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  }
  return idsCache.get(file);
}

const problems = [];
const pages = await walk(dist);
for (const page of pages) {
  const html = await readFile(page, 'utf8');
  const rel = '/' + path.relative(dist, page).replace(/\.html$/, '').replace(/index$/, '');
  for (const [, href] of html.matchAll(/<a\s[^>]*href="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:|sms:)/.test(href)) continue;
    const [withQuery, hash] = href.split('#');
    const p = withQuery.split('?')[0];
    const target = p ? fileFor(p) : page;
    if (!target) {
      problems.push(`${rel}: broken link ${href}`);
      continue;
    }
    if (hash && target.endsWith('.html') && !(await idsIn(target)).has(hash)) {
      problems.push(`${rel}: missing anchor ${href}`);
    }
  }
}

const redirects = await readFile(path.resolve('public/_redirects'), 'utf8');
for (const line of redirects.split('\n')) {
  if (!line.trim() || line.startsWith('#')) continue;
  const [from, to] = line.trim().split(/\s+/);
  const [p, hash] = to.split('#');
  const target = fileFor(p);
  if (!target) problems.push(`_redirects: ${from} → ${to} (target missing)`);
  else if (hash && !(await idsIn(target)).has(hash)) problems.push(`_redirects: ${from} → ${to} (anchor missing)`);
  if (fileFor(from.replace('/*', ''))) problems.push(`_redirects: ${from} is shadowed by a real page`);
}

if (problems.length) {
  console.log(`✗ ${problems.length} problem(s):`);
  for (const p of problems) console.log('  ' + p);
  process.exit(1);
}
console.log(`✓ ${pages.length} pages: all internal links, anchors and redirects resolve`);
