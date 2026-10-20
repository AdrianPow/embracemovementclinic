# New site (Astro)

Static site for Embrace Movement Clinic. See `../CLAUDE.md` for the brief and `../docs/` for decisions.

## Run it

```bash
cd site
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs dist/
npm run preview    # serves dist/
```

Needs Node 22.12 or later.

## Where things live

| What | Where |
|---|---|
| Clinic details (phone, email, address, booking links, hours, socials, notice banner) | `src/data/site.ts` |
| Services, practitioners and news (one Markdown file each) | `src/content/services/`, `src/content/team/`, `src/content/news/` (schema in `src/content.config.ts`) |
| "What can we help with?" groups | `src/data/needs.ts` |
| Cancellation policy, class facts, equipment, studio rules, timetable | `src/data/policies.ts` |
| Old URL redirects | `public/_redirects` |
| Menu and footer links | `src/data/navigation.ts` |
| Colours (Petrol + Teal) | `src/data/palette.ts`: change `sitePalette` to switch combination; preview the options on `/palette` (not indexed) |
| Type sizes, spacing, what each colour token is for | `src/styles/tokens.css` |
| Online booking link | `booking.url` in `src/data/site.ts`, plus the `/book-now` line in `public/_redirects` (the link checker flags them if they differ) |
| Photos | `src/assets/photos/`. A service sets `image`, `imageAlt` and (optionally) `imagePosition` in its Markdown file; a practitioner sets `photo`; a news post lists `images`; home page photos are imported at the top of `src/pages/index.astro`. `imagePosition` / `position` picks which part of the photo is kept when it's cropped, e.g. `'50% 30%'`. The build makes the AVIF/WebP sizes. Placements and alt text are logged in `docs/changes.md`. |
| Wordmark (SVG, takes the text colour) | `src/assets/brand/wordmark.svg` via `src/components/Wordmark.astro` (originals in `../assets/brand/`) |
| Fonts | `astro.config.mjs` (`fonts`), self-hosted from `@fontsource-variable/*` |
| Page shell (head, header, footer) | `src/layouts/BaseLayout.astro` |
| Style tile (palette, contrast checks, type, components) | `/styleguide` (not indexed) |

## Checks

```bash
npm run build && npm run preview
node scripts/a11y.mjs http://127.0.0.1:4321 /styleguide        # axe-core, WCAG 2.2 AA
node scripts/screenshot.mjs http://127.0.0.1:4321 <outDir> /    # desktop and mobile screenshots
node scripts/lighthouse.mjs http://127.0.0.1:4321 /             # Lighthouse mobile, target 95+
node scripts/check-links.mjs                                    # internal links, anchors and redirects
npx astro check                                                 # types
```

## Hosting (Cloudflare Pages)

Root directory `site`, build command `npm run build`, output directory `dist`. Pages are built as `/<page>.html` and served without a trailing slash, which matches the old Squarespace URLs. Don't deploy to production without explicit approval.
