import type { LanguageCode } from './types';

export interface UITranslations {
  nav: {
    overview: string;
    fees: string;
    parking: string;
    bestTime: string;
    transport: string;
    food: string;
    nearby: string;
    gallery: string;
    faq: string;
    viewOnMap: string;
  };
  hero: {
    locationTag: string;
    title: string;
    subtitle: string;
    getDirections: string;
    buildChecklist: string;
    stats: {
      googleRating: string;
      rollingPark: string;
      aboveSeaLevel: string;
      fromManila: string;
    };
  };
  overview: {
    title: string;
    aboutTitle: string;
    p1: string;
    p2: string;
    features: {
      taalView: { title: string; desc: string };
      coolAir: { title: string; desc: string };
      bbqCulture: { title: string; desc: string };
      familyFriendly: { title: string; desc: string };
    };
    openInMaps: string;
    quickInfo: {
      title: string;
      address: string;
      hours: string;
      entrance: string;
      coordinates: string;
      operator: string;
    };
    disclaimer: string;
  };
  fees: {
    title: string;
    disclaimer: string;
    activities: {
      title: string;
      activity: string;
      referenceRate: string;
      notes: string;
    };
    payment: {
      label: string;
    };
  };
  parking: {
    title: string;
  };
  bestTime: {
    title: string;
    bySeason: string;
    byDay: string;
    byHour: string;
    suggestedStay: string;
    periodsToAvoid: string;
    season: {
      dry: string;
      rainy: string;
    };
  };
  transport: {
    title: string;
    subtitle: string;
    onTheMap: string;
    openLargerMap: string;
    fromAirports: string;
  };
  food: {
    title: string;
    subtitle: string;
    distance: string;
    openInMaps: string;
  };
  nearby: {
    title: string;
    subtitle: string;
    distance: string;
    drive: string;
    getDirections: string;
  };
  gallery: {
    title: string;
    subtitle: string;
    tapToOpen: string;
    close: string;
    previous: string;
    next: string;
  };
  itinerary: {
    title: string;
    subtitle: string;
    saved: string;
    clearAll: string;
    categories: {
      view: string;
      activity: string;
      food: string;
      nearby: string;
    };
  };
  souvenir: {
    title: string;
    subtitle: string;
    privacyBadge: string;
    steps: {
      photo: string;
      upload: string;
      camera: string;
      reset: string;
      size: string;
      square: string;
      postcard: string;
      story: string;
      style: string;
      ridgeGreen: string;
      sunsetGold: string;
      lakeBlue: string;
      filmNoir: string;
      text: string;
      titleLabel: string;
      subtitleLabel: string;
    };
    download: string;
  };
  faq: {
    title: string;
    subtitle: string;
  };
  footer: {
    tagline: string;
    unofficialGuide: string;
    backToTop: string;
    openGoogleMaps: string;
    sections: {
      planTrip: string;
      ticketsFees: string;
      explore: string;
      nearbyFood: string;
      nearbySpots: string;
      photoGallery: string;
      tripChecklist: string;
      contactPark: string;
      tagaytayTourism: string;
      cityTagaytay: string;
      googleMapsListing: string;
    };
    disclaimerTitle: string;
    disclaimerBody: string;
    madeFor: string;
  };
  language: {
    switcher: string;
  };
}

export interface DataTranslations {
  siteConfig: {
    name: string;
    title: string;
    description: string;
  };
  attraction: {
    name: string;
    alternateName: string;
    description: string;
    area: string;
    openingHours: {
      weekday: string;
      note: string;
    };
    address: {
      streetAddress: string;
      addressLocality: string;
      addressRegion: string;
    };
  };
  galleryImages: {
    alt: Record<string, string>;
    caption: Record<string, string>;
  };
  faq: { question: string; answer: string }[];
  fees: {
    entrance: { label: string; note: string };
    cottages: { label: string; note: string };
    activities: { label: string; note: string }[];
    payment: { label: string; bullets: string[] };
  };
  bestTime: {
    headline: string;
    season: { period: string; rating: string; points: string[] }[];
    weekday: { day: string; rating: string; point: string }[];
    hourly: { window: string; rating: string; point: string }[];
    stay: { headline: string; bullets: string[] };
    avoid: string[];
  };
  itinerary: {
      id: string; title: string; description: string; category: 'View' | 'Activity' | 'Food' | 'Nearby'; duration?: string }[];
  food: {
    name: string;
    type: string;
    distanceKm: string;
    direction: string;
    reason: string;
  }[];
  nearby: {
    name: string;
    type: string;
    distanceKm: string;
    driveMinutes: string;
    summary: string;
  }[];
  transport: {
    fromAirport: { title: string; icon: string; body: string[] }[];
    driving: { title: string; icon: string; body: string[] };
    commute: { title: string; icon: string; body: string[] };
    taxiRidehail: { title: string; icon: string; body: string[] };
    parking: { headline: string; bullets: string[] };
  };
}

export type FullTranslations = {
  ui: UITranslations;
  data: DataTranslations;
};
