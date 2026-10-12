# Embrace Movement Clinic — website rebuild

Brief for Claude Code. Read this file in full before doing any work in this repo.

## Goal

Rebuild https://www.embracemovementclinic.com.au/ as a new site that:

- keeps all current content, services and contact details (unless `docs/changes.md` says otherwise)
- keeps existing page URLs, or adds 301 redirects for any that change
- is fast, mobile-first and accessible (WCAG 2.2 AA)
- needs minimal ongoing maintenance

## Repo layout

| Folder | What's in it |
|---|---|
| `reference/` | Snapshot of the current site. **Source of truth for existing content.** Start with `reference/INVENTORY.md`. Each page has `pages/<slug>/` containing `content.md` (text in page order, with section markers), `meta.json` (structure, images, links, embeds) and `export.html` (raw Squarespace markup). Screenshots go in `reference/screenshots/` as `<slug>-desktop.png` and are the **source of truth for look and layout**. `images.json` lists all images with full-resolution URLs. If the live-site capture script has been run, pages also have `desktop.png`, `mobile.png` and `page.html`, and there's a site-wide `styles.json`. |
| `source/` | Original Squarespace XML export (12 Oct 2026) |
| `assets/brand/` | Original brand files supplied by the owner (logo, photos, fonts). Prefer these over images in `reference/images/`. |
| `docs/` | `decisions.md` (stack, hosting, editing), `functionality.md` (what must work), `changes.md` (what to change vs keep), `to-supply.md` (outstanding items) |
| `capture/` | `convert_squarespace_export.py` (export → `reference/`) and `capture.mjs` (live-site capture, needs a non-locked-down PC). Don't edit unless asked. |
| `site/` | The new website. All build work happens here. |

## Known gaps in `reference/`

The Squarespace export doesn't include:
- header, navigation or footer
- button labels and links
- code blocks
- map settings
- fonts and colours

Use the screenshots for these. Where a screenshot is missing, leave a `TODO:` rather than guessing.

## Design direction (full redesign)

**Feel**
- Modern, warm, calm and confident: a premium boutique clinic, not a template.
- Photography-led, with generous white space.

**Brand to keep**
- Logo: teal watercolour circle with "embrace / movement clinic". Use files from `assets/brand/`.
- Tagline: "Accept . Support . Challenge ."

**Palette**
- Sampled from screenshots; confirm against the logo files.
- Brand teal `#38B090`, light teal `#88D8C0`, mist `#A8E0D0`, near-black text, white and `#FAFAFA` backgrounds.
- Check all text and button colour combinations for AA contrast. Teal on white will likely need a darker shade for text.

**Type**
- The current site uses a humanist sans for headings. Choose a modern, legible pairing, self-hosted, with no Google Fonts call at runtime.

**Must-haves**
- A persistent "Book now" call to action (Nookal) in the header and on every service page.
- Click-to-call on mobile.
- Service pages with a consistent structure: who it's for, conditions treated, what to expect, book.
- Team cards with a modal or detail page for each practitioner.
- A clear location and parking section.
- A footer with hours, address, phone, email, socials and the privacy policy link.

**Information architecture**
- Propose a simplified menu in plan mode, for example: Services (dropdown), Classes & Timetable, Team, Contact, Book Now.

**Performance target**
- Lighthouse 95+ on mobile for Performance, Accessibility, Best Practices and SEO.

## How to work

1. Read `docs/decisions.md`. If the stack is still marked "recommended — confirm", confirm it with the owner in plan mode before building.
2. Use plan mode first. Propose the page list, the components and the content model, then wait for approval.
3. Build one page at a time. After each page, compare it with its screenshot in `reference/screenshots/` and list the differences.
4. Keep every fact from `content.md`. You may tighten wording, add headings or restructure copy to suit the new design. Log each wording change to clinical copy (what a service involves, conditions treated, the examination or consent wording) in `docs/changes.md` for owner approval before launch.
5. Never invent facts: practitioners, qualifications, services, prices, fees, rebates, opening hours, addresses or phone numbers. If something is missing, leave a visible `TODO:` and add it to `docs/to-supply.md`.
6. Write in Australian English.

## Health advertising and privacy rules (non-negotiable)

This is a registered health practice, so the site is regulated health advertising.

- **AHPRA / National Law s133.** No testimonials or reviews about clinical aspects of care. No misleading claims, guarantees of outcomes, or wording that creates unreasonable expectations of benefit. No offers or gifts without clear terms. Practitioner titles and qualifications must match their AHPRA registration.
- If any current content looks non-compliant (for example patient testimonials about treatment results), **flag it in `docs/changes.md` rather than copying it**.
- **Privacy Act 1988 (Australian Privacy Principles).** Health service providers are covered regardless of turnover. The site needs a privacy policy and a privacy collection notice on any form. Forms must not ask for clinical details unless there's a clear need; booking happens in the practice management system.
- The cookie and analytics setup must match what the privacy policy says.

## Technical defaults (unless decisions.md overrides)

- Static output, no server to maintain
- Semantic HTML, a single shared layout, responsive images (`srcset`, WebP/AVIF), lazy loading below the fold
- Unique `<title>` and meta description per page (start from `meta.json`), plus Open Graph tags, `sitemap.xml`, `robots.txt` and LocalBusiness / MedicalBusiness structured data
- A redirect map (`site/redirects` or the host's equivalent) for every old URL in `reference/inventory.json` that changes
- No new third-party scripts without approval

## Never

- Change anything about the domain's DNS or email (MX) records
- Commit passwords, API keys or account logins
- Deploy to production without explicit approval
