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
    reviews: string;
    sources: string;
    weather: string;
    services: string;
    routes: string;
    science: string;
    viewOnMap: string;
  };
  breadcrumb: {
    label: string;
    home: string;
  };
  hero: {
    locationTag: string;
    title: string;
    subtitle: string;
    getDirections: string;
    buildChecklist: string;
    stats: {
      googleRating: string;
      googleReviews: string;
      rollingPark: string;
      aboveSeaLevel: string;
      fromManila: string;
    };
  };
  overview: {
    title: string;
    aboutTitle: string;
    p0: string;
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
    gettingThere: string;
    subtitle: string;
    onTheMap: string;
    openLargerMap: string;
    fromAirports: string;
  };
  transportGuide: {
    title: string;
    subtitle: string;
    stepsLabel: string;
    timeLabel: string;
    costLabel: string;
    notesLabel: string;
    tipsTitle: string;
  };
  weather: {
    title: string;
    subtitle: string;
    currentTitle: string;
    forecastTitle: string;
    feelsLike: string;
    humidity: string;
    wind: string;
    gust: string;
    rain: string;
    rainChance: string;
    sunrise: string;
    sunset: string;
    uv: string;
    uvHigh: string;
    uvModerate: string;
    uvLow: string;
    updated: string;
    umbrellaYes: string;
    umbrellaNo: string;
    note: string;
    adviceTitle: string;
    alertsTitle: string;
    noAlerts: string;
    outfitTitle: string;
    planTitle: string;
    packingTitle: string;
    ridgeTitle: string;
    windLevelLabel: string;
    gustShort: string;
    levelUnit: string;
    visibilityLabel: string;
    visibilityGood: string;
    visibilityFair: string;
    visibilityPoor: string;
    elevationLabel: string;
    elevationValue: string;
    trailLabel: string;
    trailDry: string;
    trailWet: string;
  };
  seasonStrategy: {
    title: string;
    subtitle: string;
    colSeason: string;
    colWeather: string;
    colVolcano: string;
    colNature: string;
    colAdvice: string;
  };
  services: {
    title: string;
    subtitle: string;
    whereLabel: string;
    tipsLabel: string;
  };
  routes: {
    title: string;
    subtitle: string;
    audienceTitle: string;
    suggestedTitle: string;
    paceLabel: string;
    stopsLabel: string;
    tipsLabel: string;
    durationLabel: string;
  };
  science: {
    title: string;
    subtitle: string;
    geologyTitle: string;
    volcanoTitle: string;
    ecologyTitle: string;
    responsibilityTitle: string;
  };
  legends: {
    title: string;
    subtitle: string;
    note: string;
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
  reviews: {
    title: string;
    subtitle: string;
    fromGoogle: string;
    ratingLabel: string;
    countLabel: string;
    viewAll: string;
    sourceNote: string;
    syncLine: string;
    authorLabel: string;
    positiveLabel: string;
    criticalLabel: string;
  };
  history: {
    title: string;
    subtitle: string;
    milestonesTitle: string;
  };
  sources: {
    title: string;
    subtitle: string;
    reviewsEntry: string;
    reviewsNote: string;
    outboundTitle: string;
    outboundLead: string;
    outboundLink: string;
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
  reviews: {
    positive: { title: string; text: string }[];
    critical: { title: string; text: string }[];
  };
  history: {
    paragraphs: string[];
    milestones: { year: string; text: string }[];
  };
  legends: { title: string; kind: string; text: string }[];
  weatherCodes: Record<string, { label: string; icon: string }>;
  weatherAdvice: Record<string, string>;
  seasonStrategy: {
    season: string;
    months: string;
    weather: string;
    volcano: string;
    nature: string;
    advice: string;
  }[];
  services: { type: string; icon: string; what: string; where: string; tips: string }[];
  audienceRoutes: {
    audience: string;
    icon: string;
    summary: string;
    pace: string;
    stops: string[];
    tips: string[];
  }[];
  suggestedRoutes: { name: string; duration: string; summary: string; steps: string[] }[];
  science: {
    geology: string[];
    volcano: string[];
    ecology: string[];
    responsibility: string[];
  };
  transportGuide: {
    routes: {
      mode: string;
      icon: string;
      from: string;
      steps: string[];
      time: string;
      cost: string;
      notes: string;
    }[];
    tips: string[];
  };
  sources: { name: string; url: string; note: string }[];
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
