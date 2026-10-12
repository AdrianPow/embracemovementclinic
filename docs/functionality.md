# Functionality inventory

Pre-filled from the Squarespace export (12 Oct 2026). Confirm each row against the screenshots and with the owner.

| Feature | Found on page(s) | Current behaviour | Keep / change / drop | Notes |
|---|---|---|---|---|
| Online booking (Nookal) | book-now; links on group-exercise-timetable and service pages | iframe embed `https://bookings.nookal.com/bookings/company/GNBYU`; text links to `https://bookings.nookal.com/bookings/location/GNBYU` | Keep | Confirm whether the company or location URL is preferred, and whether to embed or link out. Most "Book" buttons didn't come through in the export (check screenshots). |
| Phone | contact-us-1 | Link `tel:61434686261` (0434 686 261) | Keep, fix | The link is missing the `+`, so it may not dial correctly. Use `tel:+61434686261`. |
| Email | contact-us-1 and others | `admin@embracemovementclinic.com.au` | Keep, fix | Two current mailto links are malformed (a trailing ` ?` and `&=undefined`). |
| Address & map | contact-us-1 | 33 Brynner Street, McDowall QLD 4053; Google Maps link `https://goo.gl/maps/8KggSs4E8G9w1cxL6` plus a Squarespace map block | Keep | The map block's settings weren't exported. Embed a Google Maps iframe or use a static map with a link. |
| Instagram feed ("On the gram") | homepage | Section heading exported; feed contents missing (probably an Instagram or code block) | TBC | A live feed needs a third-party widget. Consider a static "Follow us" link instead (simpler, no tracking scripts). |
| Homepage code block | homepage | Contents not exported | TBC | Check the screenshot or the Squarespace editor to see what it is |
| Patient feedback survey | clinic-updates | Link to Google Form `https://forms.gle/jxFKrfqM7K6sCzsw5` | TBC | Is it still active? |
| Cancellation policy | group-exercise-timetable | Text: cancellations within 8 hours charged at 50% | Keep | Consider a dedicated policies page |
| Group class timetable | group-exercise-timetable | Text plus a booking portal link | Keep | How often does it change? If often, link to Nookal rather than hard-coding it. |
| Contact / enquiry form | — | None found in the export | TBC | Is a form wanted, or are phone, email and booking enough? |
| Header navigation | all | From screenshots: Meet The Team · Group Exercise Timetable · Our Services · Book Now · Contact us. Instagram and Facebook icons top-left; logo centred | Redesign | Social URLs needed (see to-supply) |
| Footer | all | Not captured yet | TBC | Screenshot needed |
| Analytics / cookie banner | — | Unknown (Squarespace analytics, built in) | TBC | Must match the privacy policy |
| Privacy policy page | — | None found in the export | Add | Required; see CLAUDE.md |
