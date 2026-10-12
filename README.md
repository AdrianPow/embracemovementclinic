# Embrace Movement Clinic — website rebuild

Working repo for rebuilding https://www.embracemovementclinic.com.au/ with Claude Code.

## Steps

### 1. Capture the current site (run on your Mac)

The live site blocks automated web tools, so this capture has to run from your own computer.

The easiest way is to open Terminal in this folder, start Claude Code (`claude`), and say:

> Run the site capture: follow the "Capture the current site" steps in README.md.

Or run it yourself:

```bash
node -v                      # needs Node 18 or later; if missing, install the LTS from nodejs.org
cd capture
npm run setup                # first time only: installs Playwright and a headless Chromium
npm run capture              # takes a few minutes
```

This fills `reference/` with:
- every page's text
- desktop and mobile screenshots
- images and PDFs
- forms and embeds (for example the booking widget and maps)
- fonts and colours
- SEO details

Open `reference/INVENTORY.md` to check it.

- **Pages missing?** Add them to the sitemap, or run `npm run capture -- https://www.embracemovementclinic.com.au/that-page` for each one.
- **Page blocked or blank?** Run `HEADLESS=false npm run capture` to watch it in a visible browser.

### 2. Fill in the docs (about 20 minutes, ideally with the business owner)

- `docs/decisions.md`: stack, hosting, who edits content
- `docs/functionality.md`: confirm what each form, button and embed must do
- `docs/changes.md`: what to change compared with the current site
- `docs/to-supply.md`: tick off assets and access as you get them

Put original logos and photos in `assets/brand/`.

### 3. Commit, then build

```bash
git add -A && git commit -m "Capture current site and complete brief"
claude
```

Then say:

> Read CLAUDE.md, review reference/ and docs/, and propose a build plan in plan mode.

### 4. Before go-live

- Every old URL either works or redirects
- Forms tested end to end
- Booking links tested
- Privacy policy live
- DNS change planned with the email (MX) records untouched
