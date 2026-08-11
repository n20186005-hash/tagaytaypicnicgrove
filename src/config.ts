function resolveSite(): string {
  const raw =
    (typeof process !== 'undefined' ? process.env.CURRENT_SITE_DOMAIN : undefined) ||
    (import.meta.env.CURRENT_SITE_DOMAIN as string | undefined) ||
    '';
  if (!raw) return '';
  const host = String(raw).replace(/^https?:\/\//, '').replace(/\/+$/, '');
  return `https://${host}`;
}

export const SITE_URL = resolveSite();

export const siteConfig = {
  name: 'Tagaytay Picnic Grove',
  title: 'Tagaytay Picnic Grove — Taal Volcano View Park & Family Picnic Destination',
  description:
    'Plan your visit to Tagaytay Picnic Grove. Enjoy panoramic views of Taal Volcano, zipline, horseback riding, cottage BBQ picnics — just 1.5 hours from Manila. Get directions, fees, and best times.',
  url: SITE_URL,
  lang: 'en',
  locale: 'en_PH',
  ga4Id: 'G-HXM22WWPKP',
};

export const mapsUrl = 'https://maps.app.goo.gl/oM7D9qUjFvZbXdNj8';

export const mapsEmbedSrc =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6892.000895515365!2d120.99521997701623!3d14.124716086307176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd7a1a6c9c60b7%3A0xf6fa7952c4afb554!2sTagaytay%20Picnic%20Grove!5e1!3m2!1sen!2sph!4v1786428741465!5m2!1sen!2sph';

export const attraction = {
  name: 'Tagaytay Picnic Grove',
  alternateName: 'Picnic Grove Tagaytay',
  description:
    'A scenic hilltop park on Tagaytay Ridge with panoramic views of Taal Lake and Taal Volcano, featuring picnic cottages, zipline, cable car, horseback riding, and eco-trails.',
  area: 'Approximately 13.5 hectares of rolling terrain',
  lat: 14.1247161,
  lng: 120.9977949,
  ratingValue: '4.3',
  reviewCount: '10000',
  priceRange: '₱₱',
  address: {
    streetAddress: 'Tagaytay-Calamba Road, Barangay Sungay South',
    addressLocality: 'Tagaytay City',
    addressRegion: 'Cavite',
    postalCode: '4120',
    addressCountry: 'PH',
  },
  openingHours: {
    weekday: 'Monday–Sunday',
    opens: '07:00',
    closes: '20:00',
    note: 'Hours may change; check Google Maps for latest.',
  },
};
