// Makes the share images for practitioner and service pages (what Facebook, LinkedIn and messaging
// apps show when a link is shared): 1200×630.
// - Landscape photos are cropped to that shape around the photo's focus point (set on /admin).
// - Portrait photos (most headshots and action shots here) would lose heads in a wide crop, so the
//   whole photo is shown beside the wordmark on the mist background instead.
// Runs before every build (package.json), so photos changed on /admin are picked up.
// Output: public/og/<collection>/<slug>.jpg (not in Git). Pages use them via BaseLayout's shareImage.
import sharp from 'sharp';
import { readFile, readdir, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const W = 1200;
const H = 630;
const colours = { bg: '#F2F8F8', top: '#3AB593', bottom: '#083D42' };
const collections = [
  { name: 'team', photoKey: 'photo', focusKey: 'photoPosition', defaultFocus: '50% 0%' },
  { name: 'services', photoKey: 'image', focusKey: 'imagePosition', defaultFocus: '50% 50%' },
];

const field = (text, key) => text.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))?.[1].trim().replace(/^['"]|['"]$/g, '');

// Photo paths are saved either from the project root ("/src/assets/…") or relative to the file ("../../assets/…").
const resolvePhoto = (dir, p) => (p.startsWith('/') ? path.join(root, p) : path.resolve(dir, p));

const wordmark = (await readFile(path.join(root, 'src/assets/brand/wordmark.svg'), 'utf8'))
  .replace('data-part="top"', `data-part="top" fill="${colours.top}"`)
  .replace('data-part="bottom"', `data-part="bottom" fill="${colours.bottom}"`);
const markWidth = 520;
const mark = await sharp(Buffer.from(wordmark)).resize({ width: markWidth }).png().toBuffer();
const markHeight = (await sharp(mark).metadata()).height;

/** Size as displayed (EXIF orientations 5–8 swap width and height). */
async function size(src) {
  const m = await sharp(src).metadata();
  return (m.orientation ?? 1) >= 5 ? { width: m.height, height: m.width } : { width: m.width, height: m.height };
}

/** Crops like CSS object-fit: cover with object-position "x% y%". */
async function coverCrop(src, focus) {
  const [fx = 50, fy = 50] = focus.split(/\s+/).map((v) => Number.parseFloat(v));
  const { width, height } = await size(src);
  const scale = Math.max(W / width, H / height);
  const sw = Math.round(width * scale);
  const sh = Math.round(height * scale);
  const left = Math.round(((sw - W) * Math.min(100, Math.max(0, fx))) / 100);
  const top = Math.round(((sh - H) * Math.min(100, Math.max(0, fy))) / 100);
  const scaled = await sharp(src).rotate().resize({ width: sw, height: sh }).toBuffer();
  return sharp(scaled).extract({ left, top, width: W, height: H });
}

/** The whole photo on the right, the wordmark centred in the space on the left. */
async function card(src) {
  const photo = await sharp(src).rotate().resize({ height: H, width: 600, fit: 'inside' }).toBuffer();
  const { width: pw } = await sharp(photo).metadata();
  return sharp({ create: { width: W, height: H, channels: 3, background: colours.bg } }).composite([
    { input: mark, left: Math.max(0, Math.round((W - pw - markWidth) / 2)), top: Math.round((H - markHeight) / 2) },
    { input: photo, left: W - pw, top: 0 },
  ]);
}

let made = 0;
for (const c of collections) {
  const dir = path.join(root, 'src/content', c.name);
  const outDir = path.join(root, 'public/og', c.name);
  await mkdir(outDir, { recursive: true });
  for (const file of (await readdir(dir)).filter((f) => f.endsWith('.md'))) {
    const text = await readFile(path.join(dir, file), 'utf8');
    const photo = field(text, c.photoKey);
    if (!photo) continue;
    const src = resolvePhoto(dir, photo);
    if (!existsSync(src)) {
      console.warn(`Share image skipped for ${c.name}/${file}: photo not found (${photo})`);
      continue;
    }
    const { width, height } = await size(src);
    const image = width / height >= 1.3 ? await coverCrop(src, field(text, c.focusKey) || c.defaultFocus) : await card(src);
    await image.jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(outDir, file.replace(/\.md$/, '.jpg')));
    made++;
  }
}
console.log(`Share images: ${made} made in public/og`);
