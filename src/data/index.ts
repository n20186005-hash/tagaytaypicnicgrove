import type { LanguageCode } from '../i18n/types';
import { getTranslations } from '../i18n';
import { gallery as galleryBase, heroImage, heroImageOg } from './gallery';
import type { GalleryImage } from './gallery';
import { DEFAULT_LANGUAGE } from '../i18n/types';

export function getLocalizedData(lang: LanguageCode = DEFAULT_LANGUAGE) {
  const t = getTranslations(lang);
  const data = t.data;

  const gallery: GalleryImage[] = galleryBase.map((g) => ({
    ...g,
    alt: data.galleryImages.alt[g.id] || g.alt,
    caption: data.galleryImages.caption[g.id] || g.caption,
  }));

  const faqJsonLd = {
    '@type': 'FAQPage' as const,
    mainEntity: data.faq.map(({ question, answer }) => ({
      '@type': 'Question' as const,
      name: question,
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: answer,
      },
    })),
  };

  const feesAndTickets = {
    disclaimer: t.ui.fees.disclaimer,
    entrance: {
      ...data.fees.entrance,
      range: 'PHP 50 – 75',
    },
    cottages: {
      ...data.fees.cottages,
      range: 'PHP 100 – 500',
    },
    activities: [
      { label: data.fees.activities[0].label, range: 'PHP 200 – 300', note: data.fees.activities[0].note },
      { label: data.fees.activities[1].label, range: t.ui.fees.activities.notes ? 'Varies' : 'Varies', note: data.fees.activities[1].note },
      { label: data.fees.activities[2].label, range: 'PHP 150 – 250', note: data.fees.activities[2].note },
      { label: data.fees.activities[3].label, range: lang === 'fil' ? 'Kasama' : 'Included', note: data.fees.activities[3].note },
    ],
    payment: data.fees.payment,
  };

  return {
    t,
    ui: t.ui,
    data,
    gallery,
    heroImage,
    heroImageOg,
    faqJsonLd,
    feesAndTickets,
    itineraryPool: data.itinerary,
    nearbyFood: data.food,
    nearbySpots: data.nearby,
    transport: data.transport,
    bestTime: data.bestTime,
    siteConfigData: data.siteConfig,
    attractionData: data.attraction,
  };
}

export { heroImage, heroImageOg };
