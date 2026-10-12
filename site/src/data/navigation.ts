export interface NavLink {
  label: string;
  href: string;
}

// The services menu is built from src/content/services (see Header.astro).

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
