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
- [x] **Colour palette:** Petrol + Teal (petrol chosen 19 Oct 2026; accent changed from coral to teal on 20 Oct). `/palette` stays for trying other combinations later.
- [x] Font choice: Red Hat Display + Red Hat Text (open licence, self-hosted)
- [x] Clinic, team and treatment photos: 16 received on 19 Oct 2026. 13 are on the site (`site/src/assets/photos/`): headshots, the team photo with Jeff, the home page and every service page. More can be added on /admin.
- [ ] **Guardian consent for the two photos of children** (`PXL_20220610_235914156`, a child using a wheelchair beside the reformer, and `PXL_20220611_052505665`, a child on the treatment table). They're held back until you confirm a parent or guardian agreed to their use on the website.
- [ ] **Photo of the front of the clinic** (or the driveway and parking). Optional now: Home and Contact show a street map, but a photo of the entrance would still help on Contact
- [ ] **Two photos of baby Imogen** for the archived July 2026 update (`DSC_6425.JPG` and `DSC_6872.JPG` on the old site), if you'd like them kept
- [ ] Photo permissions confirmed for everyone pictured (clients as well as staff)
- [ ] Check the alt text (the description read out by screen readers) for each photo. They're listed in `docs/changes.md` under "Photos".

## Content

Many of these can now be filled in directly on the website editor (`/admin`): opening hours, parking and accessibility (Clinic details), fees, what to bring, Medicare/DVA/NDIS/WorkCover (Pages → Patient information), the class timetable (Policies and timetable), and the Instagram, Facebook and ABN details. See `docs/editing.md`.

- [ ] Practitioner bios, qualifications and AHPRA registration numbers or names as registered
- [ ] Instagram and Facebook profile URLs (the footer shows icons once they're added on /admin: Clinic settings → Clinic details)
- [ ] Any new content for the refresh (new services, updated bios, new photos)
- [ ] Current services list and fees, plus any rebate or funding info (to confirm accuracy)
- [ ] **Opening hours** (from the January 2027 reopening). Address, phone and email are already in the export.
- [ ] **ABN** (footer)
- [ ] **Parking details** for the location section (street parking, driveway, accessibility)
- [x] **Reopening date**: Monday 4 January 2027 (Nicole, 7 Nov 2026). The banner and closure notes hide after 3 January. Previously: so the closure banner can hide itself automatically (on /admin: Clinic settings → Clinic details → Notice banner → Hide automatically after)
- [ ] **Current class timetable as text** (days, times, class type). The current timetable is an image of the July 2025 timetable, which isn't accessible.
- [x] **Which practitioner provides which service:** Nookal is right; Laura isn't seeing pelvic health clients for now (Nicole, 7 Nov 2026). Previously: Nookal (6 Nov 2026) matches the site except Pelvic Health: bookable online with Nicole only, while the site lists Nicole and Laura. Confirm which is right
- [ ] **Privacy contact** (name or role, plus email) for the privacy policy
- [ ] Are the **Google Forms** (feedback survey, SMS list, home program request) still active? They're linked from the archived June 2025 update.
- [ ] Any pages not linked from the menu (old landing pages, campaign pages)
- [ ] Existing privacy policy, terms or cancellation policy
- [x] **Fees**: taken from the Nookal booking page on 6 Nov 2026 (15 prices, GST included where it applies). Keep the site and Nookal in step: on /admin, Pages → Patient information → Fees
- [ ] **Class packages:** are they still offered, and at what price?
- [x] **Funding:** Nookal's appointment descriptions say private health, Medicare, DVA, NDIS and WorkCover are welcome, and out-of-pocket costs vary by payer. Now on Patient information; Nicole to confirm the wording
- [ ] **What to bring** to a first appointment
- [ ] **Accessibility** of the clinic (steps, wheelchair access)
- [x] **Class facts:** 4–5 people and 45 minutes (Nookal); cancellation is at least 8 hours' notice or the full cost is charged (Nicole, 7 Nov 2026). Confirm it covers one-on-one appointments too
- [x] **Grip socks:** available to buy in the clinic; no price on the site (Nicole, 7 Nov 2026)
- [x] A photo of Jeff, the clinic dog (the team photo with Laura and Nicole)
- [ ] **Privacy policy details:** a privacy contact, whether data is stored overseas (e.g. by Nookal), whether AI admin tools are still used, and your record retention period. Then approve the draft at `/privacy`.
- [ ] Approve the wording changes in `docs/changes.md`

## Access (confirm who has it; don't store it here)

- [ ] Current website platform admin, plus a content export if it offers one
- [ ] Domain registrar / DNS: login for Web Address Registration (the registrar), or whoever manages the domain's DNS, for go-live
- [ ] Is Google Workspace (the clinic's email) billed through Squarespace? Check before cancelling Squarespace
- [ ] Free GitHub accounts for anyone who'll use the admin page (e.g. Nicole)
- [ ] For the admin demo: a GitHub fine-grained access token (Adrian makes it; never stored in the project). See `docs/editing.md`
- [ ] At launch: a GitHub OAuth app and the free Cloudflare login helper for "Sign in with GitHub" (Adrian, with Claude's help)
- [x] Nookal online booking URL (supplied 19 Oct 2026; test a booking from the preview site before launch)
- [ ] Google Business Profile (to update the website link and check the details match)
- [ ] Analytics / Search Console
- [ ] New hosting account
