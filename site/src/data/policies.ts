// Practical facts used on several pages (classes, patient information, booking).
// Keep each fact here only, so pages can't disagree. The values live in policies.json,
// which staff can edit on /admin ("Policies and timetable"). Sources and conflicts between
// old pages are noted in docs/changes.md (cancellation and class facts: Group Exercise
// Timetable, Aug 2025; equipment: Pilates and Timetable pages and the June 2025 update;
// studio etiquette: June 2025 update and Christmas 2024 newsletter).
import policiesJson from './policies.json';

/** One class: its time, who runs it (a team file name, e.g. "nicole-saxby") and, if it isn't
 *  a small group exercise class, what it is. */
export interface TimetableClass {
  time: string;
  with?: string;
  class?: string;
}

/** One entry per day, with that day's classes in order. */
export interface TimetableDay {
  day: string;
  classes: TimetableClass[];
}

// The editor leaves out optional fields that are blank, so lists may be missing.
interface PoliciesData {
  cancellation: { paragraphs: string[] };
  classFacts: { label: string; value: string }[];
  equipment: string[];
  studioEtiquette: { name: string; detail: string }[];
  booking: { classes: string; bookingCode: string; waitlistText: string; portalUrl?: string };
  timetable?: TimetableDay[];
  classSteps: string[];
}
const data = policiesJson as PoliciesData;

export const cancellationPolicy = data.cancellation;
export const classFacts = data.classFacts;
export const equipment = data.equipment;
export const studioEtiquette = data.studioEtiquette;
export const booking = data.booking;
/** The booking code tip, split so the words "patient portal" can link to the Nookal patient portal. */
export const bookingTip = (() => {
  const phrase = 'patient portal';
  const text = data.booking.bookingCode;
  const at = text.indexOf(phrase);
  if (at < 0 || !data.booking.portalUrl) return { before: text, link: null, after: '' };
  return { before: text.slice(0, at), link: { text: phrase, href: data.booking.portalUrl }, after: text.slice(at + phrase.length) };
})();
/** "How to start classes" on the Pilates page, one line per step. */
export const classSteps = data.classSteps;

/** The class timetable as text. Empty until supplied, which shows a TODO (docs/to-supply.md). */
export const timetable: TimetableDay[] | null = data.timetable?.some((d) => d.classes?.length) ? data.timetable : null;
