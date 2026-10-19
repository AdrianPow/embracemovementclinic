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
- [ ] **Colour palette (again):** choose an anchor colour and an accent on `/palette` (logo-based). Forest was dropped on 18 Oct 2026 because it's too close to a local competitor.
- [x] Font choice: Red Hat Display + Red Hat Text (open licence, self-hosted)
- [x] Clinic, team and treatment photos: 16 received on 19 Oct 2026. 14 are on the site (`site/src/assets/photos/`): headshots, the team photo with Jeff, the home page, every service page and the studio gallery.
- [ ] **Guardian consent for the two photos of children** (`PXL_20220610_235914156`, a child using a wheelchair beside the reformer, and `PXL_20220611_052505665`, a child on the treatment table). They're held back until you confirm a parent or guardian agreed to their use on the website.
- [ ] **Photo of the front of the clinic** (or the driveway and parking) for the location section on the home and Contact pages
- [ ] **Two photos of baby Imogen** for the archived July 2026 update (`DSC_6425.JPG` and `DSC_6872.JPG` on the old site), if you'd like them kept
- [ ] Photo permissions confirmed for everyone pictured (clients as well as staff)
- [ ] Check the alt text (the description read out by screen readers) for each photo. They're listed in `docs/changes.md` under "Photos".

## Content

- [ ] Practitioner bios, qualifications and AHPRA registration numbers or names as registered
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
- [ ] **Fees** for initial and follow-up appointments, pre-class assessments and classes
- [ ] **Class packages:** are they still offered, and at what price?
- [ ] **Funding:** do you accept Medicare (GP care plan) referrals, DVA, NDIS or WorkCover?
- [ ] **What to bring** to a first appointment
- [ ] **Accessibility** of the clinic (steps, wheelchair access)
- [ ] **Confirm class facts:** a maximum of 4–5 people, 45 minutes, and the 8-hour / 50% cancellation policy (older pages said 4 people, 40 minutes and 24 hours)
- [ ] **Grip socks:** still sold in the studio? (The June 2025 price was $15; it isn't shown on the new pages)
- [x] A photo of Jeff, the clinic dog (the team photo with Laura and Nicole)
- [ ] **Privacy policy details:** a privacy contact, whether data is stored overseas (e.g. by Nookal), whether AI admin tools are still used, and your record retention period. Then approve the draft at `/privacy`.
- [ ] Approve the wording changes in `docs/changes.md`

## Access (confirm who has it; don't store it here)

- [ ] Current website platform admin, plus a content export if it offers one
- [ ] Domain registrar / DNS
- [ ] Nookal online booking URL or widget code
- [ ] Google Business Profile (to update the website link and check the details match)
- [ ] Analytics / Search Console
- [ ] New hosting account
