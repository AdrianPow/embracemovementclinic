// Single source of truth for clinic details used across the site.
// Facts come from reference/pages/*/content.md. Anything not yet supplied is
// `null` and renders as a visible TODO (see docs/to-supply.md).

export const site = {
  name: 'Embrace Movement Clinic',
  tagline: 'Accept . Support . Challenge .',
  url: 'https://www.embracemovementclinic.com.au',

  phone: {
    display: '0434 686 261',
    href: 'tel:+61434686261',
  },

  email: {
    address: 'admin@embracemovementclinic.com.au',
    href: 'mailto:admin@embracemovementclinic.com.au',
  },

  address: {
    street: '33 Brynner Street',
    suburb: 'McDowall',
    state: 'QLD',
    postcode: '4053',
    country: 'AU',
    mapUrl: 'https://goo.gl/maps/8KggSs4E8G9w1cxL6',
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=33+Brynner+Street%2C+McDowall+QLD+4053',
  },

  booking: {
    page: '/book-now',
    embedUrl: 'https://bookings.nookal.com/bookings/company/GNBYU',
    portalUrl: 'https://bookings.nookal.com/bookings/location/GNBYU',
  },

  // TODO: profile URLs (docs/to-supply.md)
  socials: {
    instagram: null as string | null,
    facebook: null as string | null,
  },

  // TODO: opening hours, e.g. [{ days: 'Monday', hours: '6am – 3pm' }]
  hours: null as { days: string; hours: string }[] | null,

  // TODO: ABN
  abn: null as string | null,

  // Site-wide notice banner. Source: reference/pages/baby-news/content.md.
  // Set `until` (YYYY-MM-DD) to hide the banner automatically after that date.
  notice: {
    enabled: true,
    message:
      'The clinic is temporarily closed. We plan to reopen in January 2027 with set days and opening hours.',
    link: { href: '/news/july-2026-update', label: 'Read the latest update' },
    until: null as string | null,
  },
} as const;

export const fullAddress = `${site.address.street}, ${site.address.suburb} ${site.address.state} ${site.address.postcode}`;
