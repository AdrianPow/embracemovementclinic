export interface NavLink {
  label: string;
  href: string;
}

export const serviceLinks: NavLink[] = [
  { label: 'Musculoskeletal Physiotherapy', href: '/physiotherapy' },
  { label: 'Exercise Physiology', href: '/exercise-physiology' },
  { label: 'Pilates & Small Group Classes', href: '/pilates' },
  { label: 'Pelvic Floor Physiotherapy', href: '/pelvic-health-physiotherapy' },
  { label: 'Vestibular Physiotherapy', href: '/vestibular-physiotherapy' },
];

export const primaryLinks: NavLink[] = [
  { label: 'Classes & Timetable', href: '/classes' },
  { label: 'Team', href: '/team' },
  { label: 'Contact', href: '/contact' },
];

export const footerLinks: NavLink[] = [
  { label: 'All services', href: '/services' },
  { label: 'Classes & Timetable', href: '/classes' },
  { label: 'Meet the team', href: '/team' },
  { label: 'News', href: '/news' },
  { label: 'Book now', href: '/book-now' },
  { label: 'Contact', href: '/contact' },
];
