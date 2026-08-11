export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

function img(prompt: string, size: 'landscape_16_9' | 'square' | 'landscape_4_3' = 'landscape_16_9'): string {
  const encoded = encodeURIComponent(prompt);
  return `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encoded}&image_size=${size}`;
}

export const gallery: GalleryImage[] = [
  {
    id: 'taal-panorama',
    src: img('Panoramic view of Taal Lake and Taal Volcano island from Tagaytay Ridge viewing deck, clear blue sky, lush green foreground, realistic travel photography, wide angle, natural daylight, no watermark'),
    alt: 'Panoramic view of Taal Lake and Taal Volcano from Tagaytay Ridge',
    caption: 'Taal Volcano &amp; Taal Lake — the iconic ridge-top view.',
  },
  {
    id: 'picnic-cottages',
    src: img('Rows of nipa thatched roof Filipino picnic cottages bahay kubo on a grassy hill, families gathering with BBQ grills, cheerful Filipino family picnic scene, realistic photo, natural light, no watermark'),
    alt: 'Rows of thatched picnic cottages on a grassy hill',
    caption: 'Thatched cottages (bahay kubo) for rent — BBQ with family and barkada.',
  },
  {
    id: 'zipline-ridge',
    src: img('People riding a zipline suspended high above green forested ridge, Taal Lake visible below, adventure park atmosphere, realistic photo, daytime, no watermark'),
    alt: 'Riders on zipline with Taal Lake below',
    caption: 'Zipline across the ridge — sail with Taal Lake beneath you.',
  },
  {
    id: 'horseback-trail',
    src: img('Filipino guide and children riding horses along a shaded grass trail in Tagaytay picnic park, green surroundings, realistic equestrian travel photo, natural light, no watermark'),
    alt: 'Horseback riding on shaded grass trail',
    caption: 'Horseback riding — gentle guided trail, beginner-friendly.',
  },
  {
    id: 'eco-trail',
    src: img('Shady forested eco trail walkway with dirt path flanked by tall tropical trees and lush foliage, sunlight filtering through canopy, realistic nature hiking photo, no watermark'),
    alt: 'Shaded forest eco-trail',
    caption: 'Eco-trail — a cool, shaded walk among native trees.',
  },
  {
    id: 'cable-car',
    src: img('Small red and white cable car gondola suspended above green picnic grounds and rolling hills in Tagaytay, scenic aerial view, realistic amusement park photo, no watermark'),
    alt: 'Cable car gondola above picnic grounds',
    caption: 'Scenic cable car ride — see the grove from above.',
  },
  {
    id: 'bbq-picnic',
    src: img('Filipino style charcoal BBQ with skewers of pork inihaw and hotdogs cooking outdoors beside wooden picnic table, halo halo dessert and drinks on side, realistic outdoor food photography, no watermark'),
    alt: 'Filipino BBQ skewers cooking outdoors',
    caption: 'DIY BBQ picnic — the heart of the Tagaytay family tradition.',
  },
  {
    id: 'golden-hour',
    src: img('Warm golden hour sunset light over Taal Lake with volcano island glowing orange before dusk, view from Tagaytay ridge terrace, realistic landscape travel photography, no watermark'),
    alt: 'Golden hour sunset over Taal Lake and Volcano',
    caption: 'Golden Hour at the overlook — the park\u2019s most photogenic moment.',
  },
  {
    id: 'kids-playground',
    src: img('Happy Filipino children playing on colorful swings and slides in open green grass playground surrounded by trees, cheerful family park atmosphere, realistic photo, no watermark'),
    alt: 'Children on playground swings in the park',
    caption: 'Kids\u2019 playground — open space for the little ones to run.',
  },
  {
    id: 'misty-morning',
    src: img('Misty foggy morning view of Tagaytay Ridge with Taal Volcano island gently shrouded in low clouds and mist, cool atmospheric landscape, realistic early morning travel photo, no watermark'),
    alt: 'Misty morning over Tagaytay Ridge',
    caption: 'Early mist over the ridge — arrive at 7:00 AM for the quietest hours.',
  },
  {
    id: 'sunset-terrace',
    src: img('Sunset viewing terrace with silhouettes of people watching the sky turn orange and pink, Taal Lake in background, cool breeze vibe, realistic travel photo, no watermark'),
    alt: 'Silhouettes of people watching sunset from terrace',
    caption: 'Sunset viewing terrace — wind, cool air, amber sky.',
  },
  {
    id: 'park-entrance',
    src: img('Tree-lined park entrance of Tagaytay Picnic Grove with signage, visitors walking toward the ticket booth, tropical landscaping, realistic daytime entrance photo, no watermark'),
    alt: 'Tree-lined park entrance with ticket booth',
    caption: 'Park entrance — tickets in hand, ridge walk begins.',
  },
];

export const heroImage = img(
  'Ultra wide panoramic landscape photo of Taal Volcano island in Taal Lake, viewed from Tagaytay Picnic Grove overlook on a clear cool morning, lush green pine trees and grass picnic ground in foreground, partly cloudy blue sky, cinematic natural lighting, ultra high resolution, no watermark, realistic travel photography',
  'landscape_16_9'
);

export const heroImageOg = img(
  'Open graph preview image of Tagaytay Picnic Grove with scenic view of Taal Volcano and Lake, green pine trees, picnic huts, clean composition, 1200x630 social media size, realistic photo, no watermark',
  'landscape_16_9'
);
