// "What can we help with?" Groups the conditions the clinic already lists (on its
// service pages) into everyday needs, each pointing to the services that cover them.
// The grouping is new; the conditions are not. Changes are logged in docs/changes.md.

export interface Need {
  id: string;
  title: string;
  examples: string[];
  /** Service ids (file names in src/content/services), most relevant first. */
  services: string[];
}

export const needs: Need[] = [
  {
    id: 'injuries-and-pain',
    title: 'Injuries, aches and pain',
    examples: ['Sprains, strains and muscle tears', 'Back and neck pain', 'Joint pain and arthritis', 'Chronic pain', 'Recovery after surgery'],
    services: ['physiotherapy', 'exercise-physiology'],
  },
  {
    id: 'pregnancy-and-postnatal',
    title: 'Pregnancy and postnatal',
    examples: ['Pregnancy back and pelvic pain', 'Diastasis recti', 'Pelvic floor care before and after birth', 'Prenatal and postnatal exercise'],
    services: ['pelvic-health-physiotherapy', 'physiotherapy', 'exercise-physiology', 'pilates'],
  },
  {
    id: 'pelvic-health',
    title: 'Pelvic health',
    examples: ['Incontinence (urine or bowel)', 'Prolapse', 'Pelvic pain', 'Sexual dysfunction', 'Menopause care'],
    services: ['pelvic-health-physiotherapy'],
  },
  {
    id: 'dizziness-and-balance',
    title: 'Dizziness and balance',
    examples: ['Vertigo', 'Dizziness', 'Decreased balance', 'BPPV'],
    services: ['vestibular-physiotherapy'],
  },
  {
    id: 'ageing-and-chronic-conditions',
    title: 'Healthy ageing and chronic conditions',
    examples: ['Osteoporosis', 'Arthritis, diabetes and cardiovascular disease', 'Neurological rehabilitation'],
    services: ['exercise-physiology', 'pilates'],
  },
  {
    id: 'strength-and-performance',
    title: 'Strength and performance',
    examples: ['Strength and conditioning', 'Athletic performance', 'Injury prevention'],
    services: ['exercise-physiology', 'pilates'],
  },
];
