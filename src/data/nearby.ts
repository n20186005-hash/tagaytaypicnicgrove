export interface NearbySpot {
  name: string;
  type: string;
  distanceKm: string;
  driveMinutes: string;
  summary: string;
  mapsQuery: string;
}

export const nearbySpots: NearbySpot[] = [
  {
    name: "People\u2019s Park in the Sky",
    type: 'Public scenic park & historic viewpoint',
    distanceKm: '2–3 km',
    driveMinutes: '5–8 min',
    summary:
      'Formerly the unfinished Marcos guest mansion (Palace in the Sky) on Mount Sungay. Higher elevation = even wider Taal views. Combine easily with Picnic Grove on the same road.',
    mapsQuery: 'Peoples+Park+in+the+Sky+Tagaytay',
  },
  {
    name: 'Sky Ranch Tagaytay',
    type: 'Open-air amusement park & Ferris wheel',
    distanceKm: '5–6 km',
    driveMinutes: '10–15 min',
    summary:
      'Family amusement park with the 63-meter Sky Eye, rides, games, and food stalls. Good complement for a full day with kids.',
    mapsQuery: 'Sky+Ranch+Tagaytay',
  },
  {
    name: 'Twin Lakes Shopping Village',
    type: 'Lifestyle mall, restaurants, vineyard view',
    distanceKm: '8–9 km',
    driveMinutes: '15–20 min',
    summary:
      'Open-air mall built around a small man-made lake and vineyard. Cafes, coffee chains, and groceries for supplies.',
    mapsQuery: 'Twin+Lakes+Tagaytay',
  },
  {
    name: 'Museo Orlina',
    type: 'Contemporary glass-art museum & gallery',
    distanceKm: '6–7 km',
    driveMinutes: '10–12 min',
    summary:
      'Private museum of sculptor Ramon Orlina, with multiple levels of polished-glass works and a roof-deck volcano view.',
    mapsQuery: 'Museo+Orlina+Tagaytay',
  },
  {
    name: 'Crosswinds Resort Suites',
    type: 'Swiss-style pine resort, cafes & photo walks',
    distanceKm: '9–10 km',
    driveMinutes: '20–25 min',
    summary:
      'Chalet-style buildings among pine trees, coffee shops, and a quiet walking strip. Good for a laid-back afternoon detour.',
    mapsQuery: 'Crosswinds+Tagaytay',
  },
  {
    name: 'Taal Vista Hotel (Heritage)',
    type: 'Historic 1939 hotel, tea & views',
    distanceKm: '7–8 km',
    driveMinutes: '15 min',
    summary:
      'The original Tagaytay grand hotel built by President Quezon. Drop by for afternoon tea or a walk through the heritage gardens if you appreciate old-world atmosphere.',
    mapsQuery: 'Taal+Vista+Hotel+Tagaytay',
  },
];
