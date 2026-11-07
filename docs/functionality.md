# Functionality inventory

Pre-filled from the Squarespace export (12 Oct 2026). Confirm each row against the screenshots and with the owner.

| Feature | Found on page(s) | Current behaviour | Keep / change / drop | Notes |
|---|---|---|---|---|
| Online booking (Nookal) | book-now; links on group-exercise-timetable and service pages | iframe embed `https://bookings.nookal.com/bookings/company/GNBYU`; text links to `https://bookings.nookal.com/bookings/location/GNBYU` | **Change (19 Oct 2026)** | "Book now" buttons in the header and on every page link straight to the owner's new Nookal booking page (`booking.url` in `site/src/data/site.ts`). `/book-now` redirects there. No embed, so no third-party content loads on the site. |
| Phone | contact-us-1 | Link `tel:61434686261` (0434 686 261) | Keep, fix | The link is missing the `+`, so it may not dial correctly. Use `tel:+61434686261`. |
| Email | contact-us-1 and others | `admin@embracemovementclinic.com.au` | Keep, fix | Two current mailto links are malformed (a trailing ` ?` and `&=undefined`). |
| Address & map | contact-us-1 | 33 Brynner Street, McDowall QLD 4053; Google Maps link (was the goo.gl short link; now the full listing link `https://maps.google.com/?cid=9375169901916606838`, as goo.gl is retired) plus a Squarespace map block | Keep, improved | The map block's settings weren't exported. The home page shows a static OpenStreetMap image (made once with `site/scripts/make-location-map.mjs`, credited under the map) that links to Google Maps, plus Get directions. No map script loads. |
| Instagram feed ("On the gram") | homepage | Section heading exported; feed contents missing (probably an Instagram or code block) | **Change** | New site: no feed (dropped in the 3 Nov 2026 home page tightening). The footer and home page link to Instagram once the URL is added on /admin. No third-party widget or tracking. |
| Homepage code block | homepage | Contents not exported | TBC | Not visible in the homepage screenshot and not reproduced. Check the Squarespace editor in case it's something that matters (e.g. a tracking script). |
| Patient feedback survey | clinic-updates | Link to Google Form `https://forms.gle/jxFKrfqM7K6sCzsw5` | **Drop** | The June 2025 update that linked to it was deleted on 8 Nov 2026 (owner's request). |
| Cancellation policy | group-exercise-timetable | Text: cancellations within 8 hours charged at 50% | **Keep** | Now on `/patient-information#cancellations` and `/pilates#cancellations`, from one source (`site/src/data/policies.json`, editable on /admin). |
| Group class timetable | group-exercise-timetable | Text plus a booking portal link | **Change** | Now at `/pilates#timetable`, with a "Check live availability" link to Nookal. The timetable itself needs supplying as text (on /admin: Clinic settings → Policies and timetable). |
| Contact / enquiry form | — | None found in the export | **None** | Decided 12 Oct 2026: phone, text, email and online booking only. |
| Header navigation | all | From screenshots: Meet The Team · Group Exercise Timetable · Our Services · Book Now · Contact us. Instagram and Facebook icons top-left; logo centred | Redesign | Social URLs needed (see to-supply) |
| Footer | all | Not captured yet | TBC | Screenshot needed |
| Analytics / cookie banner | — | Unknown (Squarespace analytics, built in) | TBC | Must match the privacy policy |
| Privacy policy page | — | None found in the export | **Added (draft)** | `/privacy`, marked DRAFT with TODOs for owner review. |
