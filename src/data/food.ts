export interface FoodSpot {
  name: string;
  type: string;
  distanceKm: string;
  direction: string;
  budget: '₱' | '₱₱' | '₱₱₱' | '₱₱₱₱' | '₱₱₱₱₱';
  reason: string;
  mapsQuery: string;
}

export const nearbyFood: FoodSpot[] = [
  {
    name: 'Mahogany Beef Market & Bulalohan',
    type: 'Local market eats — Bulalo & Tawilis',
    distanceKm: '3–4 km',
    direction: 'NE toward Olivarez Rotunda',
    budget: '₱₱',
    reason:
      'The most authentic Tagaytay bulalo (beef marrow soup) experience. Multiple stalls, fresh meat upstairs, cheap and cheerful. Many visitors buy raw beef here and bring it to Picnic Grove for BBQ.',
    mapsQuery: 'Mahogany+Beef+Market+Bulalohan+Tagaytay',
  },
  {
    name: 'Balay Dako (Antonio\u2019s Group)',
    type: 'Upscale Filipino — relaxed fine dining',
    distanceKm: '5–6 km',
    direction: 'NE, near Aguinaldo Highway',
    budget: '₱₱₱₱',
    reason:
      'Top-tier Filipino cooking with a sweeping Taal Volcano view. Famous for weekend breakfast buffets. Reservations are strongly recommended.',
    mapsQuery: 'Balay+Dako+Tagaytay',
  },
  {
    name: 'Leslie\u2019s Ridge & Restaurant',
    type: 'Classic Tagaytay Filipino cuisine',
    distanceKm: '6–7 km',
    direction: 'NE along the main ridge road',
    budget: '₱₱₱',
    reason:
      'Long-standing Tagaytay institution with a wide, family-friendly menu, solid bulalo, and a large open-air terrace with volcano views.',
    mapsQuery: 'Leslies+Ridge+Restaurant+Tagaytay',
  },
  {
    name: 'Josephine Restaurant',
    type: 'Filipino buffet & a la carte',
    distanceKm: '5–6 km',
    direction: 'NE toward the city proper',
    budget: '₱₱₱',
    reason:
      'Spacious indoor and outdoor seating, a dependable buffet spread, and a dependable Taal vista for groups.',
    mapsQuery: 'Josephine+Restaurant+Tagaytay',
  },
  {
    name: 'Mushroomburger',
    type: 'Novelty fast food — mushroom patties',
    distanceKm: '≈5 km',
    direction: 'NE along Aguinaldo Highway',
    budget: '₱',
    reason:
      'A Tagaytay original since the 1970s. Cheap, fun, and deeply nostalgic for Filipino families passing through town.',
    mapsQuery: 'Mushroomburger+Tagaytay+Aguinaldo',
  },
  {
    name: "Antonio\u2019s Tagaytay (Flagship)",
    type: 'Destination fine dining',
    distanceKm: '≈8 km',
    direction: 'NE, past the city center',
    budget: '₱₱₱₱₱',
    reason:
      'One of the country\u2019s most awarded restaurants. Reserve weeks in advance and dress smartly — for special occasions only.',
    mapsQuery: 'Antonios+Restaurant+Tagaytay',
  },
];
