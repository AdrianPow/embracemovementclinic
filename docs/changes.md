# Changes from the current site

Anything not listed here stays as it is on the current site.

## URL clean-up (decided 12 Oct 2026: clean URLs with 301 redirects)

| Current URL | Content | Suggested new URL | Decision |
|---|---|---|---|
| /homepage | Home | / | **Change** (301) |
| /old-services | "Our Services" overview of all services | /services | **Change** (301) |
| /physiotherapy | Musculoskeletal Physiotherapy | keep | **Keep** |
| /exercise-physiology | Exercise Physiology | keep | **Keep** |
| /pilates | Pilates & Small Group Classes | keep | **Keep** |
| /womens-health-physio | Pelvic Floor Physiotherapy | /pelvic-health-physiotherapy | **Change** (301) |
| /pilates-1 | **Vestibular** Physiotherapy (the slug doesn't match the content) | /vestibular-physiotherapy | **Change** (301) |
| /team | Meet The Team | keep, plus /team/nicole-saxby and /team/laura-bradford | **Keep** |
| /contact-us-1 | Contact | /contact | **Change** (301) |
| /book-now | Nookal booking embed | keep | **Keep** |
| /group-exercise-timetable | Class timetable and cancellation policy | /classes | **Change** (301) |
| /clinic-updates | Clinic news | /news/clinic-update-june-2025 | **Change** (301) |
| /xmas-2024 | Christmas 2024 newsletter | /news/christmas-2024 | **Change** (301) |
| /baby-news | July 2026 update | /news/july-2026-update | **Change** (301) |
| /blog-posts/* | Linked from homepage and team images, but not in the export | /news | **Change** (301). The image links aren't carried over. |

## Content changes

- **Time-sensitive content:** Team page says "Currently on maternity leave until Jan 2027". This now shows as a status on the team cards (set in each practitioner's file), plus a site-wide notice banner. Someone needs to turn both off when the clinic reopens (`site/src/data/site.ts` → `notice`).
- **Temporary closure (new):** a site-wide notice says the clinic is temporarily closed and plans to reopen in January 2027 (source: the July 2026 update).

## Wording change log (clinical copy, for owner approval before launch)

Each change to what a service involves, conditions treated, or examination or consent wording is listed here as it's made.

| Page | Original | New | Why | Approved |
|---|---|---|---|---|

## Design changes

**Full redesign** to modernise the site, with a modern, sleek feel. Brand identity:
- **Logo:** the plain "embrace / MOVEMENT CLINIC" wordmark only. The teal brush-stroke circle is dropped (owner decision, 12 Oct 2026).
- **Palette:** moving away from teal and aqua (owner decision, 12 Oct 2026). Choose from the options on `/styleguide`.
- **Tagline:** "Accept . Support . Challenge ." is kept.
- **Type:** Red Hat Display + Red Hat Text.

Don't copy the Squarespace layout. Use the screenshots only for content, menu items and brand cues. See "Design direction" in CLAUDE.md.

## Compliance flags

From a first pass of the exported text. Re-check after the build.

- No patient testimonials or outcome guarantees found in the exported page text. The Instagram feed and any images with text overlays weren't checked.
- **No privacy policy page found.** One is needed.
- Clinic Updates mentions using AI tools to reduce admin, reviewed by the practitioner. Make sure the privacy policy (and patient consent processes) cover this.
- The pelvic health page describes possible internal examinations. Keep the consent wording as is, and have a clinician approve any edits.
