export interface ItineraryItem {
  id: string;
  title: string;
  description: string;
  category: 'View' | 'Activity' | 'Food' | 'Nearby';
  duration?: string;
  maps?: string;
}

export const itineraryPool: ItineraryItem[] = [
  {
    id: 'taal-overlook',
    title: 'Taal Volcano View Deck',
    description:
      'Primary panoramic overlook. Head here first thing in the morning for clear light and fewer crowds.',
    category: 'View',
    duration: '20 min',
  },
  {
    id: 'sunset-deck',
    title: 'Golden-hour Sunset Terrace',
    description:
      'The western-facing terrace where the ridge catches the warmest late-afternoon light.',
    category: 'View',
    duration: '30 min',
  },
  {
    id: 'eco-trail',
    title: 'Eco-Trail Walk',
    description:
      'Short shaded forest loop with native trees, gentle slope, and occasional bird sightings.',
    category: 'Activity',
    duration: '30 min',
  },
  {
    id: 'cottage-bbq',
    title: 'Rent a Cottage & BBQ',
    description:
      'Pick a nipa hut near the overlook, fire up the grill, and enjoy a long Filipino-style picnic.',
    category: 'Activity',
    duration: '2–3 hr',
  },
  {
    id: 'zipline',
    title: 'Zipline Across the Ridge',
    description:
      'Short but scenic zipline with a bird\u2019s-eye view of the grove and Taal Lake.',
    category: 'Activity',
    duration: '15 min',
  },
  {
    id: 'cable-car',
    title: 'Cable Car Ride',
    description:
      'Slow aerial gondola ride across the picnic grounds — great for photos.',
    category: 'Activity',
    duration: '15 min',
  },
  {
    id: 'horseback',
    title: 'Horseback Riding',
    description:
      'Gentle guided horseback trail ride — beginner and child friendly.',
    category: 'Activity',
    duration: '1 hr',
  },
  {
    id: 'playground',
    title: 'Kids Playground',
    description:
      'Open lawn with swings, slides, and running space for younger children.',
    category: 'Activity',
    duration: '30 min',
  },
  {
    id: 'mahogany-bulalo',
    title: 'Mahogany Market — Bulalo Lunch',
    description:
      'Iconic local market serving authentic Tagaytay bulalo (beef marrow soup). Short drive from the park.',
    category: 'Food',
    duration: '1 hr',
    maps: 'https://www.google.com/maps/search/?api=1&query=Mahogany+Beef+Market+Tagaytay',
  },
  {
    id: 'mushroom-burger',
    title: 'Mushroomburger Quick Bite',
    description:
      'Tagaytay\u2019s quirky mushroom-patty burger institution — a fun roadside detour.',
    category: 'Food',
    duration: '30 min',
    maps: 'https://www.google.com/maps/search/?api=1&query=Mushroomburger+Tagaytay',
  },
  {
    id: 'peoples-park',
    title: "People\u2019s Park in the Sky",
    description:
      '2–3 km west along the same road. Former Marcos-era unfinished palace turned public viewpoint.',
    category: 'Nearby',
    duration: '1.5 hr',
    maps: 'https://www.google.com/maps/search/?api=1&query=People%27s+Park+in+the+Sky+Tagaytay',
  },
  {
    id: 'sky-ranch',
    title: 'Sky Ranch Tagaytay',
    description:
      'Open-air amusement park with the iconic Sky Eye Ferris wheel, near Olivarez Rotunda.',
    category: 'Nearby',
    duration: '2–3 hr',
    maps: 'https://www.google.com/maps/search/?api=1&query=Sky+Ranch+Tagaytay',
  },
];
