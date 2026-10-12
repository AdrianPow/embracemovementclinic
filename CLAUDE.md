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
| `reference/` | Snapshot of the current live site from `capture/`. **Source of truth for existing content and look.** Start with `reference/INVENTORY.md`. Each page has `pages/<slug>/` containing `content.md` (text), `desktop.png` and `mobile.png` (screenshots), `meta.json` (SEO, images, forms, embeds) and `page.html` (rendered HTML). Site-wide fonts and colours are in `styles.json`. |
| `assets/brand/` | Original brand files supplied by the owner (logo, photos, fonts). Prefer these over images in `reference/images/`. |
| `docs/` | `decisions.md` (stack, hosting, editing), `functionality.md` (what must work), `changes.md` (what to change vs keep), `to-supply.md` (outstanding items) |
| `capture/` | Script that produced `reference/`. Don't edit unless asked. |
| `site/` | The new website. All build work happens here. |

## How to work

1. Don't start building until `docs/decisions.md` has the stack and hosting filled in. If it's blank, ask.
2. Use plan mode first. Propose the page list, the components and the content model, then wait for approval.
3. Build one page at a time. After each page, compare it with `reference/pages/<slug>/desktop.png` and `mobile.png` and list the differences.
4. Copy text from `content.md` exactly. Don't rewrite, shorten or "improve" clinical or business copy unless `docs/changes.md` asks for it.
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
