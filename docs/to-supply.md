# Items to supply

## Screenshots

The redesign doesn't copy the old layout, so only a few more are needed, mainly for content the export missed.

- [x] homepage (desktop)
- [x] team (desktop, top of page)
- [ ] **Footer**: scroll to the bottom of any page (hours, address, social links, anything else there)
- [ ] **Our Services**, scrolled through, to show button labels
- [ ] **One service page** (e.g. Physiotherapy) and **Book Now**, to show what the code block is
- [ ] **Team page, scrolled to the end**, to show all practitioners
- [ ] Squarespace **Pages** panel, showing pages in and out of the menu

Save them in `reference/screenshots/` as `<page-folder>-desktop.png` (folder names are in `reference/INVENTORY.md`).

Tick items off as they arrive. Brand files go in `assets/brand/`; screenshots go in `reference/screenshots/`.

**Never put passwords or logins in this repo.** Keep them in a password manager.

## Brand assets

- [x] Logo: colour circle (500px transparent PNG) and black wordmark (1500px PNG), received 12 Oct 2026 and saved in `assets/brand/`. Favicons and a white footer wordmark were made from them.
- [x] Logo as SVG: traced from the black wordmark (`assets/brand/logo-wordmark.svg`). An original vector file from whoever designed it would still be ideal, if one exists.
- [x] Colour palette: Forest with a white header bar (chosen 12 Oct 2026)
- [x] Font choice: Red Hat Display + Red Hat Text (open licence, self-hosted)
- [ ] Original high-resolution photos (clinic, team, treatment). The export only links to images (`reference/images.json` has the full-resolution URLs). This environment's network policy blocks `images.squarespace-cdn.com`. Either allow that domain (Edit environment → Network access → Allowed domains) so Claude can download them, or drop the originals into `assets/brand/`. Until then, pages show `TODO: photo` placeholders.
- [ ] Photo permissions confirmed for anyone pictured
- [ ] When photos are added, check each photo's alt text against what's actually in it (placeholders name the intended file)

## Content

- [ ] Practitioner bios, headshots, qualifications and AHPRA registration numbers or names as registered
- [ ] Instagram and Facebook profile URLs (the header has icons, but the links weren't in the export)
- [ ] Any new content for the refresh (new services, updated bios, new photos)
- [ ] Current services list and fees, plus any rebate or funding info (to confirm accuracy)
- [ ] **Opening hours** (from the January 2027 reopening). Address, phone and email are already in the export.
- [ ] **ABN** (footer)
- [ ] **Parking details** for the location section (street parking, driveway, accessibility)
- [ ] **Reopening date**, so the closure banner can hide itself automatically (`notice.until` in `site/src/data/site.ts`)
- [ ] **Current class timetable as text** (days, times, class type). The current timetable is an image of the July 2025 timetable, which isn't accessible.
- [ ] **Which practitioner provides which service.** The draft mapping is inferred from qualifications, so it needs confirming.
- [ ] **Privacy contact** (name or role, plus email) for the privacy policy
- [ ] Are the **Google Forms** (feedback survey, SMS list, home program request) still active? They're linked from the archived June 2025 update.
- [ ] Any pages not linked from the menu (old landing pages, campaign pages)
- [ ] Existing privacy policy, terms or cancellation policy

## Access (confirm who has it; don't store it here)

- [ ] Current website platform admin, plus a content export if it offers one
- [ ] Domain registrar / DNS
- [ ] Nookal online booking URL or widget code
- [ ] Google Business Profile (to update the website link and check the details match)
- [ ] Analytics / Search Console
- [ ] New hosting account
