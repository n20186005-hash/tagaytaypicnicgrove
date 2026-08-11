export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

function localImg(filename: string): string {
  return `/gallery/${filename}`;
}

export const gallery: GalleryImage[] = [
  {
    id: 'taal-panorama',
    src: localImg('tagaytay-picnic-grove-1.jpg'),
    alt: 'Panoramic view of Taal Lake and Taal Volcano from Tagaytay Ridge',
    caption: 'Taal Volcano &amp; Taal Lake — the iconic ridge-top view.',
  },
  {
    id: 'picnic-cottages',
    src: localImg('tagaytay-picnic-grove-2.jpg'),
    alt: 'Rows of thatched picnic cottages on a grassy hill',
    caption: 'Thatched cottages (bahay kubo) for rent — BBQ with family and barkada.',
  },
  {
    id: 'zipline-ridge',
    src: localImg('tagaytay-picnic-grove-3.jpg'),
    alt: 'Riders on zipline with Taal Lake below',
    caption: 'Zipline across the ridge — sail with Taal Lake beneath you.',
  },
  {
    id: 'horseback-trail',
    src: localImg('tagaytay-picnic-grove-4.jpg'),
    alt: 'Horseback riding on shaded grass trail',
    caption: 'Horseback riding — gentle guided trail, beginner-friendly.',
  },
  {
    id: 'eco-trail',
    src: localImg('tagaytay-picnic-grove-5.jpg'),
    alt: 'Shaded forest eco-trail',
    caption: 'Eco-trail — a cool, shaded walk among native trees.',
  },
  {
    id: 'cable-car',
    src: localImg('tagaytay-picnic-grove-6.jpg'),
    alt: 'Cable car gondola above picnic grounds',
    caption: 'Scenic cable car ride — see the grove from above.',
  },
  {
    id: 'bbq-picnic',
    src: localImg('tagaytay-picnic-grove-7.jpg'),
    alt: 'Filipino BBQ skewers cooking outdoors',
    caption: 'DIY BBQ picnic — the heart of the Tagaytay family tradition.',
  },
  {
    id: 'golden-hour',
    src: localImg('tagaytay-picnic-grove-8.jpg'),
    alt: 'Golden hour sunset over Taal Lake and Volcano',
    caption: 'Golden Hour at the overlook — the park\u2019s most photogenic moment.',
  },
  {
    id: 'kids-playground',
    src: localImg('tagaytay-picnic-grove-9.jpg'),
    alt: 'Children on playground swings in the park',
    caption: 'Kids\u2019 playground — open space for the little ones to run.',
  },
  {
    id: 'misty-morning',
    src: localImg('tagaytay-picnic-grove-10.jpg'),
    alt: 'Misty morning over Tagaytay Ridge',
    caption: 'Early mist over the ridge — arrive at 7:00 AM for the quietest hours.',
  },
  {
    id: 'sunset-terrace',
    src: localImg('tagaytay-picnic-grove-11.jpg'),
    alt: 'Silhouettes of people watching sunset from terrace',
    caption: 'Sunset viewing terrace — wind, cool air, amber sky.',
  },
  {
    id: 'park-entrance',
    src: localImg('tagaytay-picnic-grove-12.jpg'),
    alt: 'Tree-lined park entrance with ticket booth',
    caption: 'Park entrance — tickets in hand, ridge walk begins.',
  },
];

export const heroImage = localImg('tagaytay-picnic-grove-13.jpg');

export const heroImageOg = localImg('tagaytay-picnic-grove-14.jpg');
