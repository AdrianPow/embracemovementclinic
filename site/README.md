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
| Menu and footer links | `src/data/navigation.ts` |
| Colours, type sizes, spacing | `src/styles/tokens.css` |
| Logo files used on the site | `src/assets/brand/` (originals in `../assets/brand/`) |
| Fonts | `astro.config.mjs` (`fonts`), self-hosted from `@fontsource-variable/*` |
| Page shell (head, header, footer) | `src/layouts/BaseLayout.astro` |
| Style tile for sign-off | `/styleguide` (not indexed) |

## Checks

```bash
npm run build && npm run preview
node scripts/a11y.mjs http://127.0.0.1:4321 /styleguide        # axe-core, WCAG 2.2 AA
node scripts/screenshot.mjs http://127.0.0.1:4321 <outDir> /    # desktop and mobile screenshots
npx astro check                                                 # types
```

## Hosting (Cloudflare Pages)

Root directory `site`, build command `npm run build`, output directory `dist`. Pages are built as `/<page>.html` and served without a trailing slash, which matches the old Squarespace URLs. Don't deploy to production without explicit approval.
