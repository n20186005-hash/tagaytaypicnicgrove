function resolveSite(): string {
  const raw =
    (typeof process !== 'undefined' ? process.env.CURRENT_SITE_DOMAIN : undefined) ||
    (import.meta.env.CURRENT_SITE_DOMAIN as string | undefined) ||
    'tagaytaypicnicgrove.com';
  if (!raw) return '';
  const host = String(raw).replace(/^https?:\/\//, '').replace(/\/+$/, '');
  return `https://${host}`;
}

export const SITE_URL = resolveSite();

export const siteConfig = {
  name: 'Tagaytay Picnic Grove',
  // TDK：核心关键词（Entrance Fee / Opening Hours / Parking / Activities）前置，
  // 直接对应用户在 GSC 中最多的高意图查询，用于提升 SERP 点击率。
  title: 'Tagaytay Picnic Grove: Entrance Fee, Opening Hours, Parking & Activities (2026)',
  description:
    'Updated guide to Tagaytay Picnic Grove in Tagaytay City, Cavite: entrance fee, opening hours, parking rates, zipline, horseback riding, eco-trail and family activities — with map, weather and tips.',
  url: SITE_URL,
  lang: 'en',
  locale: 'en_PH',
  ga4Id: 'G-HXM22WWPKP',
};

export const mapsUrl = 'https://maps.app.goo.gl/oM7D9qUjFvZbXdNj8';

export const mapsEmbedSrc =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6892.000895515365!2d120.99521997701623!3d14.124716086307176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd7a1a6c9c60b7%3A0xf6fa7952c4afb554!2sTagaytay%20Picnic%20Grove!5e1!3m2!1sen!2sph!4v1786428741465!5m2!1sen!2sph';

/**
 * 单景点 SEO 实体绑定配置表
 * 变量与站点实体的对应关系集中在此，避免在各处硬编码。
 */
export const entity = {
  domainName: 'tagaytaypicnicgrove.com',
  fullName: 'Tagaytay Picnic Grove',
  shortName: 'Picnic Grove Tagaytay',
  cityName: 'Tagaytay City',
  stateProvince: 'Cavite',
  countryName: 'Philippines',
  countryCode: 'PH',
  postalCode: '4120',
  latitude: 14.1247161,
  longitude: 120.9977949,
  plusCode: '4XFX+V4 Tagaytay, Cavite',
  nearbyLandmark1: "People\u2019s Park in the Sky",
  nearbyLandmark2: 'Sky Ranch Tagaytay',
  govtTourismUrl: 'https://tagaytaycity.ph/picnic-grove/',
  govtTourismLabel: 'Tagaytay City / Cavite Official Tourism Portal',
  phivolcsUrl: 'https://www.phivolcs.dost.gov.ph/',
} as const;

/**
 * 谷歌地图评价同步信息
 * 说明：评分与评价数仅用于页面展示（E-E-A-T 引用来源），
 * 不写入 JSON-LD 结构化数据，以符合 Google 关于第三方评价内容的规定。
 */
export const googleReviews = {
  ratingValue: '4.4',
  ratingValueDisplay: '4.4',
  reviewCount: '12586',
  reviewCountDisplay: '12,586',
  /** 同步时间（中文标注，与页面来源说明保持一致） */
  syncedAt: '2026 年 9 月',
  syncedAtEn: 'September 2026',
  sourceName: 'Google Maps',
  sourceUrl: mapsUrl,
  /** 页面展示用的来源说明（页面可见，不入 JSON-LD） */
  attribution: '同步自 Google 地图用户评价，同步时间 2026 年 9 月；版权归原作者与 Google 地图所有',
  attributionShort:
    '评分与评价数同步自谷歌地图（Google Maps）用户评价 · 2026 年 9 月 · 点击查看谷歌地图全部评价↗',
  viewAllLabel: '在谷歌地图查看全部评价',
} as const;

export const attraction = {
  name: 'Tagaytay Picnic Grove',
  alternateName: 'Picnic Grove Tagaytay',
  description:
    'A scenic hilltop park on Tagaytay Ridge with panoramic views of Taal Lake and Taal Volcano, featuring picnic cottages, zipline, cable car, horseback riding, and eco-trails.',
  area: 'Approximately 13.5 hectares of rolling terrain',
  lat: 14.1247161,
  lng: 120.9977949,
  /** 与 googleReviews 保持一致；仅用于页面展示，不进 JSON-LD */
  ratingValue: '4.4',
  reviewCount: '12586',
  priceRange: '₱₱',
  isAccessibleForFree: false,
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
