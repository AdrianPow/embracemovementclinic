// Practical facts used on several pages (classes, patient information, booking).
// Keep each fact here only, so pages can't disagree. The values live in policies.json,
// which staff can edit on /admin ("Policies and timetable"). Sources and conflicts between
// old pages are noted in docs/changes.md (cancellation and class facts: Group Exercise
// Timetable, Aug 2025; equipment: Pilates and Timetable pages and the June 2025 update;
// studio etiquette: June 2025 update and Christmas 2024 newsletter).
import policiesJson from './policies.json';

export interface TimetableRow {
  day: string;
  time: string;
  class: string;
  with?: string;
}

// The editor leaves out optional fields that are blank, so lists may be missing.
interface PoliciesData {
  cancellation: { paragraphs: string[] };
  classFacts: { label: string; value: string }[];
  equipment: string[];
  studioEtiquette: { name: string; detail: string }[];
  booking: { classes: string; bookingCode: string; waitlistText: string };
  timetable?: TimetableRow[];
}
const data = policiesJson as PoliciesData;

export const cancellationPolicy = data.cancellation;
export const classFacts = data.classFacts;
export const equipment = data.equipment;
export const studioEtiquette = data.studioEtiquette;
export const booking = data.booking;

/** The class timetable as text. Empty until supplied, which shows a TODO (docs/to-supply.md). */
export const timetable: TimetableRow[] | null = data.timetable?.length ? data.timetable : null;
