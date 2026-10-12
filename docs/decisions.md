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
| Online booking | Nookal (current) | Every "Book now" goes to `/book-now`, which keeps the current embed (`bookings.nookal.com/bookings/company/GNBYU`) plus a plain link to `.../location/GNBYU` as a fallback. |
| Contact form destination | **No contact form (confirmed 12 Oct 2026)** | Enquiries go through phone, email and Nookal, so the site collects no personal data. |
| Analytics | **None at launch** | Cloudflare Web Analytics (cookie-free) can be switched on later, with approval. The privacy policy must match. |
| Blog / news | **Archive under `/news` (confirmed 12 Oct 2026)** | The three update pages become dated posts. Non-compliant parts are removed and logged in `changes.md`. |
| Goal | **Complete rebuild to modernise and refresh the online presence** | Full redesign, not a copy of the Squarespace layout |
| URLs | **Clean URLs with 301 redirects (confirmed 12 Oct 2026)** | See the URL table in `changes.md`. |
| Temporary closure | **Site-wide notice banner (confirmed 12 Oct 2026)** | Set in `site/src/data/site.ts` (`notice`). Also noted on Book Now, Contact and the team cards. |
| Fonts | TBC: pairing A (Fraunces + Figtree) or B (Red Hat Display + Red Hat Text) | Both self-hosted. Compare them on `/styleguide`. |
| Launch target | TBC | |
| Sign-off | TBC | Who approves content and go-live |
