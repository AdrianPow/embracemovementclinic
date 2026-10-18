// Practical facts used on several pages (classes, patient information, booking).
// Keep each fact here only, so pages can't disagree. Sources are noted per item;
// conflicts between old pages are flagged in docs/changes.md.

export const cancellationPolicy = {
  // Source: Group Exercise Timetable page (updated Aug 2025).
  summary: 'Cancellations within 8 hours of your booking are charged at 50% of the applicable price.',
  paragraphs: [
    'Given there is a waitlist for many classes, please provide as much notice as possible if you need to cancel or reschedule your booking so the time can be offered to another client.',
    'All bookings that are cancelled within 8 hours or less of the scheduled appointment or class will be charged at 50% of the applicable price.',
  ],
};

// Source: Group Exercise Timetable (Aug 2025) and Pilates (Mar 2025) pages.
export const classFacts = [
  { label: 'Class size', value: 'A maximum of 4–5 people' },
  { label: 'Length', value: '45 minutes' },
  { label: 'Before you start', value: 'A once-off pre-class assessment' },
  { label: 'Private health', value: 'Exercise sessions may be claimable, depending on your level of cover' },
];

// Union of the equipment lists on the Pilates and Timetable pages and the June 2025 update.
export const equipment = [
  'Reformer',
  'Reformer-trapeze combo',
  'Wunda Chair',
  'Trapeze Table',
  'CoreAlign',
  'Barbells and dumbbells',
  'Free weights',
  'Concept2 SkiErg',
];

// Source: Clinic Update June 2025 and Christmas 2024 newsletter.
export const studioEtiquette = [
  { name: 'Grip socks, please', detail: 'Grip socks are preferred on the equipment for hygiene and to help it last. Grip socks are available in the studio, or bring your hospital or trampoline socks.' },
  { name: 'No sneakers on the equipment', detail: 'Preferably no sneakers on the equipment. There’s a shoe rack outside to keep the dirt out.' },
  { name: 'Wearing orthotics?', detail: 'Sneakers are fine. Just let us know so we can adjust the setup for you.' },
];

export const booking = {
  // Source: Group Exercise Timetable page and Clinic Update June 2025.
  classes:
    'Check availability and book classes in the online booking portal. When booking, select the relevant practitioner. If your preferred class time isn’t showing, it’s at full capacity, but please get in touch if you’d like to be added to the waitlist.',
  bookingCode:
    'Want to save time and avoid creating a new profile every time you book? Ask Nicole or Laura for your unique online booking code.',
  waitlistText: 'To join the cancellation waitlist, text us on',
};

// TODO: the current class timetable as text (docs/to-supply.md).
export const timetable: { day: string; time: string; class: string; with?: string }[] | null = null;
