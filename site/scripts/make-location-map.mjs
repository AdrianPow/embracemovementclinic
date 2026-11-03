// Builds the static location map (src/assets/maps/clinic-map.png) from OpenStreetMap tiles:
// greyscale streets with a petrol pin on the clinic. A one-off job: run it again only if the
// address or the look changes. The site credits "© OpenStreetMap contributors" under the map.
//
// Usage: node scripts/make-location-map.mjs [--tiles <dir>]
//   --tiles  read already-downloaded tiles named <z>-<x>-<y>.png instead of fetching them
// Respect the OSM tile usage policy: this fetches ~42 tiles once, with an identifying User-Agent.
import sharp from 'sharp';
import { readFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

// 33 Brynner Street, McDowall QLD 4053 (OpenStreetMap/Nominatim, house-level match).
const lat = -27.3852709;
const lon = 152.9925605;
const zoom = 17;
const width = 1200;
const height = 1500;
const pin = { fill: '#083D42', dot: '#3AB593' };

const tilesArg = process.argv.indexOf('--tiles');
const tilesDir = tilesArg > -1 ? process.argv[tilesArg + 1] : null;
const out = path.resolve('src/assets/maps/clinic-map.png');

// Web Mercator pixel position of the clinic at this zoom.
const scale = 2 ** zoom * 256;
const px = ((lon + 180) / 360) * scale;
const latRad = (lat * Math.PI) / 180;
const py = ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * scale;
const left = Math.round(px - width / 2);
const top = Math.round(py - height / 2);

async function tile(x, y) {
  if (tilesDir) return readFile(path.join(tilesDir, `${zoom}-${x}-${y}.png`));
  const res = await fetch(`https://tile.openstreetmap.org/${zoom}/${x}/${y}.png`, {
    headers: { 'User-Agent': 'EmbraceMovementClinic-website-build/1.0 (one-off static location map)' },
  });
  if (!res.ok) throw new Error(`Tile ${x},${y}: HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

const layers = [];
for (let x = Math.floor(left / 256); x <= Math.floor((left + width - 1) / 256); x++) {
  for (let y = Math.floor(top / 256); y <= Math.floor((top + height - 1) / 256); y++) {
    layers.push({ input: await tile(x, y), left: x * 256 - left, top: y * 256 - top });
  }
}

// Stitch onto a canvas with a 256px margin, then crop, so partly visible edge tiles fit.
const margin = 256;
const stitched = await sharp({ create: { width: width + 2 * margin, height: height + 2 * margin, channels: 3, background: '#ffffff' } })
  .composite(layers.map((l) => ({ ...l, left: l.left + margin, top: l.top + margin })))
  .png()
  .toBuffer();
const base = await sharp(stitched)
  .extract({ left: margin, top: margin, width, height })
  .grayscale()
  .linear(0.7, 76) // lift and soften: quieter streets so the pin stands out
  .png()
  .toBuffer();

const cx = width / 2;
const cy = height / 2;
const marker = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="${cx}" cy="${cy + 4}" rx="22" ry="8" fill="rgb(0 0 0 / 0.22)"/>
  <g transform="translate(${cx - 36} ${cy - 96}) scale(3)">
    <path d="M24 10c0 7.5-12 21.5-12 21.5S0 17.5 0 10a12 12 0 0 1 24 0Z" fill="${pin.fill}" stroke="#ffffff" stroke-width="1.5"/>
    <circle cx="12" cy="10" r="4.5" fill="${pin.dot}" stroke="#ffffff" stroke-width="1"/>
  </g>
</svg>`;

await mkdir(path.dirname(out), { recursive: true });
await sharp(base).composite([{ input: Buffer.from(marker) }]).png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(out);
console.log(`Wrote ${path.relative(process.cwd(), out)} (${width}×${height}, zoom ${zoom})`);
