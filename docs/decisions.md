# Decisions

Fill these in before the build starts. Claude Code will ask about anything left as `TBC`.

| Decision | Choice | Notes |
|---|---|---|
| Who edits content after launch? | **Adrian, using Claude Code** | No CMS needed. Content lives in Markdown files in the repo. |
| How often does content change? | TBC | For example: rarely (team, hours), or regularly (blog, news, classes) |
| Site framework / stack | **Astro 7, static output (confirmed 12 Oct 2026)** | Content collections in Markdown (services, team, news); no server or database to maintain. Project lives in `site/`. |
| Hosting | **Cloudflare Pages (confirmed 12 Oct 2026)** | Auto-deploys from GitHub on every commit, free tier. Redirects in `site/public/_redirects`. Project settings: root `site`, build `npm run build`, output `dist`. Cancel Squarespace only after launch. |
| Current platform & login | Squarespace | Adrian has admin access. Keep the Squarespace site live until the new site launches. |
| Domain registrar | TBC | Who holds the domain and where DNS is managed. Don't touch the MX (email) records. |
| Online booking | Nookal. **Updated 19 Oct 2026:** owner supplied a new booking link | Every "Book now" links straight to `https://book.nookal.com/bookings/book/EE4e4bFE-aEC6-E51D-2cda-aE95ddcBeb3E/location` (`booking.url` in `site/src/data/site.ts`). The old `/book-now` URL redirects there (302 in `public/_redirects`, so browsers don't cache it if the link changes again). The previous `/book-now` page with the embedded calendar (`company/GNBYU`) is gone. |
| Contact form destination | **No contact form (confirmed 12 Oct 2026)** | Enquiries go through phone, email and Nookal, so the site collects no personal data. |
| Analytics | **None at launch** | Cloudflare Web Analytics (cookie-free) can be switched on later, with approval. The privacy policy must match. |
| Blog / news | **Archive under `/news` (confirmed 12 Oct 2026)** | The three update pages become dated posts. Non-compliant parts are removed and logged in `changes.md`. |
| Goal | **Complete rebuild to modernise and refresh the online presence** | Full redesign, not a copy of the Squarespace layout |
| URLs | **Clean URLs with 301 redirects (confirmed 12 Oct 2026)** | See the URL table in `changes.md`. Classes and timetable merged at `/pilates` (18 Oct 2026). |
| Site structure | **Redesigned from first principles (owner request, 18 Oct 2026)** | Problem-first navigation, one classes page, a Patient information page, and a standard service page structure. Reasoning in `docs/site-strategy.md`. |
| Temporary closure | **Site-wide notice banner (confirmed 12 Oct 2026)** | Set in `site/src/data/site.ts` (`notice`). Also noted on Book Now, Contact and the team cards. |
| Fonts | **Red Hat Display (headings) + Red Hat Text (body), chosen 12 Oct 2026** | Self-hosted variable fonts, about 60 KB together. |
| Logo | **Plain wordmark only, chosen 12 Oct 2026** | The brush-stroke circle is dropped. `assets/brand/logo-wordmark.svg` was traced from the supplied black wordmark and takes any colour. |
| Colour palette | **Petrol + Coral, chosen 19 Oct 2026** (logo-based). Forest (chosen 12 Oct) was dropped on 18 Oct as too close to a local competitor | Petrol `#083D42` (buttons, links, dark sections), coral `#EB7660` (decorative) and light coral `#FEB3A4` (on petrol), logo teal `#3AB593` (wordmark) and teal 600 `#179677` (icons), mist `#F2F8F8`, ink `#161A18`, white header. All text pairings pass WCAG 2.2 AA. Values in `site/src/data/palette.ts` (`sitePalette`); see `/styleguide`. `/palette` stays so other combinations can be previewed later. |
| Launch target | TBC | |
| Sign-off | TBC | Who approves content and go-live |
