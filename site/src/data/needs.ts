// "What can we help with?" Groups the conditions the clinic already lists (on its
// service pages) into everyday needs, each pointing to the services that cover them.
// The grouping is new; the conditions are not. Changes are logged in docs/changes.md.
import type { IconName } from '../components/Icon.astro';

export interface Need {
  id: string;
  title: string;
  /** One-line label for the home page tiles. */
  short: string;
  icon: IconName;
  examples: string[];
  /** Service ids (file names in src/content/services), most relevant first. */
  services: string[];
}

export const needs: Need[] = [
  {
    id: 'injuries-and-pain',
    title: 'Injuries, aches and pain',
    short: 'Injuries & pain',
    icon: 'activity',
    examples: ['Sprains, strains and muscle tears', 'Back and neck pain', 'Joint pain and arthritis', 'Chronic pain', 'Recovery after surgery'],
    services: ['physiotherapy', 'exercise-physiology'],
  },
  {
    id: 'pregnancy-and-postnatal',
    title: 'Pregnancy and postnatal',
    short: 'Pregnancy & postnatal',
    icon: 'baby',
    examples: ['Pregnancy back and pelvic pain', 'Diastasis recti', 'Pelvic floor care before and after birth', 'Prenatal and postnatal exercise'],
    services: ['pelvic-health-physiotherapy', 'physiotherapy', 'exercise-physiology', 'pilates'],
  },
  {
    id: 'pelvic-health',
    title: 'Pelvic health',
    short: 'Pelvic health',
    icon: 'heart',
    examples: ['Incontinence (urine or bowel)', 'Prolapse', 'Pelvic pain', 'Sexual dysfunction', 'Menopause care'],
    services: ['pelvic-health-physiotherapy'],
  },
  {
    id: 'dizziness-and-balance',
    title: 'Dizziness and balance',
    short: 'Dizziness & balance',
    icon: 'spin',
    examples: ['Vertigo', 'Dizziness', 'Decreased balance', 'BPPV'],
    services: ['vestibular-physiotherapy'],
  },
  {
    id: 'ageing-and-chronic-conditions',
    title: 'Healthy ageing and chronic conditions',
    short: 'Healthy ageing',
    icon: 'sprout',
    examples: ['Osteoporosis', 'Arthritis, diabetes and cardiovascular disease', 'Neurological rehabilitation'],
    services: ['exercise-physiology', 'pilates'],
  },
  {
    id: 'strength-and-performance',
    title: 'Strength and performance',
    short: 'Strength & performance',
    icon: 'dumbbell',
    examples: ['Strength and conditioning', 'Athletic performance', 'Injury prevention'],
    services: ['exercise-physiology', 'pilates'],
  },
];
