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
| /group-exercise-timetable | Class timetable and cancellation policy | /pilates#timetable (merged with the Pilates page, 18 Oct 2026) | **Change** (301) |
| /clinic-updates | Clinic news | /news/clinic-update-june-2025 | **Change** (301) |
| /xmas-2024 | Christmas 2024 newsletter | /news/christmas-2024 | **Change** (301) |
| /baby-news | July 2026 update | /news/july-2026-update | **Change** (301) |
| /blog-posts/* | Linked from homepage and team images, but not in the export | /news | **Change** (301). The image links aren't carried over. |

New pages with no old URL: `/patient-information`, `/privacy`, `/news`, and `/team/nicole-saxby` and `/team/laura-bradford`. See `docs/site-strategy.md` for why.

## Structure changes (18 Oct 2026, first-principles redesign)

The owner asked for the site to be rethought rather than copied (see `docs/site-strategy.md`):
- **Problem-first navigation.** A "What can we help with?" finder groups the clinic's existing conditions into six needs (injuries and pain, pregnancy and postnatal, pelvic health, dizziness and balance, healthy ageing and chronic conditions, strength and performance), each linking to the right services. The grouping is new; every condition comes from the current pages. Data: `site/src/data/needs.ts`.
- **One classes page.** The Pilates and Group Exercise Timetable pages are merged at `/pilates`.
- **Patient information page.** Booking, cancellations, fees and rebates, class rules and the clinic dog move out of old newsletters into one evergreen page.
- **Standard service page structure:** hero → is this for you → what to expect → treatment → who you'll see → good to know → related → book.
- **Practitioner profiles** with qualifications, training and experience pulled out of the bios into lists.

## Content changes

- **Time-sensitive content:** Team page says "Currently on maternity leave until Jan 2027". This now shows as a status on the team cards (set in each practitioner's file), plus a site-wide notice banner. Someone needs to turn both off when the clinic reopens (`site/src/data/site.ts` → `notice`).
- **Temporary closure (new):** a site-wide notice says the clinic is temporarily closed and plans to reopen in January 2027 (source: the July 2026 update).

## Wording change log (clinical copy, for owner approval before launch)

Each change to what a service involves, conditions treated, or examination or consent wording is listed here as it's made.

| Page | Original | New | Why | Approved |
|---|---|---|---|---|
| Home (intro) | "We embrace everyone in their health journey, with **specialist** services in musculoskeletal physiotherapy, exercise physiology/exercise prescription and clinical pilates including group classes." | "We embrace everyone in their health journey, with services in musculoskeletal physiotherapy, exercise physiology/exercise prescription and clinical pilates including group classes." | "Specialist" is a protected title. Physiotherapists here aren't registered specialists, so it could mislead (National Law s133 and s118). | TBC |
| Home and menu (service card summary): Musculoskeletal Physiotherapy | Conditions list on /physiotherapy | "Assessment and treatment for sporting injuries, back and neck pain, joint pain, chronic pain, pregnancy and postnatal aches and pains, and post-surgical care." | New short summary for cards, condensed from the conditions list | TBC |
| Home (card summary): Exercise Physiology | Conditions list on /exercise-physiology | "Tailored exercise for injury rehabilitation and prevention, chronic pain and disease management, osteoporosis and healthy ageing, and athletic performance." | New short summary for cards | TBC |
| Home (card summary): Pilates & Small Group Classes | Equipment and "We see all clients of all ages and exercise ability" on /pilates | "Clinical pilates and small group classes on the Reformer, Wunda Chair, Trapeze Table and CoreAlign, for all ages and exercise abilities." | New short summary for cards | TBC |
| Home (card summary): Pelvic Floor Physiotherapy | Conditions list on /womens-health-physio | "Assessment and treatment for incontinence, prolapse, pelvic pain, diastasis recti, pre- and postnatal care, sexual dysfunction and menopause care." | New short summary for cards | TBC |
| Home (card summary): Vestibular Physiotherapy | Intro on /pilates-1 | "Assessment and treatment for vertigo, dizziness and decreased balance, including Benign Paroxysmal Positional Vertigo (BPPV)." | New short summary for cards | TBC |
| Home (classes) | "A once off pre-class assessment is required prior to commencing classes." / "Healthy Aging" | "A once-off pre-class assessment is required before commencing classes." / "Healthy ageing" | Australian spelling and punctuation only | TBC |
| Physiotherapy (Joint pain) | "Whether arthritis, auto-immue, or another issue, we help restore mobility and reduce inflammation." | "Including arthritis, autoimmune conditions and other causes of joint pain." | Removes an outcome claim; fixes a typo | TBC |
| Physiotherapy (Chronic pain) | "Our holistic approach manages pain and empowers you to take control of your life." | "A holistic approach to managing pain, with tools to help you take control day to day." | Softens an implied outcome | TBC |
| Physiotherapy (Comprehensive assessments) | "…to craft the perfect treatment plan." | "We take the time to understand your unique needs and goals, so we can develop your treatment plan." | "Perfect" is a superlative claim | TBC |
| Physiotherapy (Manual therapy) | "…to address muscle tension and improve joint range of motion." | "…to address muscle tension and joint range of motion." | Removes an outcome claim | TBC |
| Physiotherapy (Dry needling) | "Precisely target trigger points for pain relief and muscle activation." | "Targeting trigger points to help relieve pain and activate muscles." | Softens an outcome claim | TBC |
| Physiotherapy (Taping) | "Support your body and enhance athletic performance or move with less discomfort" | "To support your body during sport and everyday movement." | Removes performance and comfort claims | TBC |
| Physiotherapy (Personalised exercise programs) | "Strengthen, stabilize, and improve flexibility with tailored exercises." | "Tailored exercises to build strength, stability and flexibility." | Tightened; Australian spelling | TBC |
| Physiotherapy (Education) | "Empower yourself to maintain optimal health and prevent future issues." | "To help you look after your health and reduce the risk of future issues." | "Prevent" overstates the benefit | TBC |
| Physiotherapy (what to expect) | (none on page) | Three steps from the "Services we offer" list: comprehensive assessment, treatment tailored to you, tools to self-manage | Restructured into a "what to expect" sequence | TBC |
| Exercise Physiology (What to expect) | "This thorough approach ensures that we develop a safe and effective exercise plan just for you." | "This thorough approach means we can develop a safe exercise plan suited to you." | "Ensures… effective" is a guarantee | TBC |
| Exercise Physiology (Injury rehabilitation) | "…to aid recovery and prevent future injuries." | "…to aid recovery and reduce the risk of future injuries." | "Prevent" overstates the benefit | TBC |
| Exercise Physiology (Osteoporosis) | "Exercises to strengthen bones, improve balance, and promote healthy ageing." | "Exercises for bone strength, balance and healthy ageing." | Removes outcome wording | TBC |
| Exercise Physiology (Coaching) | "…to help you achieve your fitness and health goals." | "…to help you work towards your fitness and health goals." | Softens an implied outcome | TBC |
| Exercise Physiology (treatments) | Two lists (EP page and Our Services) | Merged into one list, keeping "Exercise guidelines" and "Injury prevention" from Our Services | Removes duplication, keeps every item | TBC |
| Pelvic Floor Physiotherapy (What to expect) | Consent and examination wording | **Unchanged, verbatim** | Consent wording must not change | n/a |
| Pelvic Floor Physiotherapy (conditions) | "Pelvic pain (such as endometriosis, vaginismus etc )" | "Pelvic pain: such as endometriosis, vulvodynia and vaginismus." | Adds "vulvodynia" from the Our Services list (existing fact) | TBC |
| Pelvic Floor Physiotherapy (treatments) | "Education about pelvic floor anatomy and function", etc. | Same items, split into a name and a detail (e.g. "Biofeedback: to improve muscle awareness") | Formatting only | TBC |
| Pelvic Floor Physiotherapy (who you'll see) | (none) | "Both of our physiotherapists have completed Women’s Pelvic Health Physiotherapy training with the APA." | New sentence from the team page facts | TBC |
| Vestibular Physiotherapy (evidence) | "…evidence-based and has been shown to be effective in managing and improving symptoms…, helping patients regain functional independence and confidence in their daily lives." | "Vestibular physiotherapy is an evidence-based approach to managing the symptoms of vestibular disorders." | Removes outcome and effectiveness claims that need substantiation | TBC |
| Vestibular Physiotherapy (treatments) | Four descriptions without names | Same descriptions with names added: "Repositioning movements", "Gaze stabilisation", "Habituation exercises", "Education" | Easier to scan; names describe the existing techniques | TBC |
| Pilates (What to expect) | "…we will make sure you are comfortable yet challenged to improve." | "…we aim to keep you comfortable yet challenged to improve." | "Make sure" is a guarantee | TBC |
| Pilates and Patient information (private health) | "All exercise sessions are claimable with private health." / "Claimable with private health." | "Exercise sessions may be claimable with private health, depending on your level of cover." | A blanket claim could mislead people whose cover doesn't include it | TBC |
| Nicole's bio | "Nicole’s patients love her vibrant and enthusiastic approach…" | "Nicole brings a vibrant and enthusiastic approach…" | Implied patient testimonial (s133) | TBC |
| Nicole's bio | "…she has the confidence to tailor and adapt any treatment plan to meet the needs of each and every person regardless of…" | "She tailors and adapts each treatment plan to the needs of the person in front of her, whatever their…" | Could create unreasonable expectations | TBC |
| Laura's bio | "…alongside a team of esteemed Physiotherapists" / "Laura's expertise in exercise prescription enriches her approach…" / "equips her with invaluable insight" | "…alongside a team of physiotherapists" / "Laura’s background in exercise prescription shapes her approach…" / "gives her valuable insight" | Tightened; avoids superlatives | TBC |
| Home (how it works) | (new) | Three steps: start with an assessment, a plan tailored to you, keep moving | New copy built from existing facts (initial consultation, pre-class assessment, tailored programs, classes) | TBC |
| Home and Services ("What can we help with?") | Conditions spread across five pages | Grouped into six everyday needs (`site/src/data/needs.ts`) | New grouping; conditions unchanged | TBC |
| Christmas 2024 (archived) | "These classes are designed to enhance your recovery and promote overall strength…" | "…designed to support your recovery and overall strength…" | Softens an outcome claim | TBC |

Mechanical edits across all pages (one entry): Australian spelling (customised, stabilise, mobilisation, specialised, personalised, ageing), "Dumbells" → "dumbbells", `tel:` link fixed to `+61`, malformed `mailto:` links fixed.

### Conflicting facts: most recent page used, please confirm

| Fact | Older version | Used on the new site (newest source) |
|---|---|---|
| Class size | "maximum of 4 people" (Our Services, Jun 2024) | "a maximum of 4–5 people" (Pilates, Mar 2025, and Timetable, Aug 2025) |
| Class length | "40mins" (Pilates, Mar 2025) | "45 minutes" (Timetable, Aug 2025, and Our Services) |
| Cancellation notice | "24 hours notice" (Christmas 2024) | "within 8 hours… charged at 50%" (Timetable, Aug 2025) |
| Equipment | Different lists on three pages | One combined list (`site/src/data/policies.ts`) |

## Design changes

**Full redesign** to modernise the site, with a modern, sleek feel. Brand identity:
- **Logo:** the plain "embrace / MOVEMENT CLINIC" wordmark only. The teal brush-stroke circle is dropped (owner decision, 12 Oct 2026).
- **Palette:** Forest was chosen on 12 Oct 2026, then reopened on 18 Oct 2026 because it's too close to a local competitor. A logo-based palette (logo teal + a non-green anchor + an accent) is being chosen on `/palette`.
- **Wordmark colours:** with a logo-based palette, the header wordmark uses the logo's own colours (teal “embrace”, grey “MOVEMENT CLINIC”). The brush circle stays dropped.
- **Tagline:** "Accept . Support . Challenge ." is kept.
- **Type:** Red Hat Display + Red Hat Text.

Don't copy the Squarespace layout. Use the screenshots only for content, menu items and brand cues. See "Design direction" in CLAUDE.md.

## Compliance flags

**Removed from the archived news posts (not republished):**
- Christmas 2024: the "Refer a friend in January… you'll receive a free group class" offer. It's an offer with no clear terms (s133).
- Christmas 2024: "10 x small group exercise classes = $350" and "save money". The price is out of date and unconfirmed.
- Christmas 2024: "Please remember to give us 24 hours notice for any cancellations". This contradicts the current 8-hour policy, so the archived post now links to the current policy instead.


From a first pass of the exported text. Re-check after the build.

- No patient testimonials or outcome guarantees found in the exported page text. The Instagram feed and any images with text overlays weren't checked.
- **"Specialist services" (home page).** "Specialist" implies specialist registration, which physiotherapy doesn't have. The new home page says "services" instead (see the wording log).
- **No privacy policy page found.** One is needed.
- Clinic Updates mentions using AI tools to reduce admin, reviewed by the practitioner. Make sure the privacy policy (and patient consent processes) cover this.
- The pelvic health page describes possible internal examinations. Keep the consent wording as is, and have a clinician approve any edits.
