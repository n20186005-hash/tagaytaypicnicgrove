export const bestTime = {
  headline:
    'The ridge is open year-round, but your experience changes sharply with the season, the day of the week, and the hour.',
  season: [
    {
      period: 'Dry Season — December to May',
      rating: '★★★★★ Best',
      points: [
        'Mostly sunny skies, lowest rainfall, and the clearest views of Taal Volcano.',
        'December–February are the coolest months (overnight lows around 18–22 °C); bring a jacket, especially after 5:00 PM.',
        'March–May are warmer but still 3–5 °C cooler than Manila.',
      ],
    },
    {
      period: 'Rainy Season — June to November',
      rating: '★★★ Moderate',
      points: [
        'Short afternoon downpours are typical; mornings can still be clear.',
        'Taal Volcano is often hidden by low clouds or rain — the photo view is unreliable.',
        'Zipline, cable car, and horseback riding may be suspended during storms or strong wind.',
        'Typhoon season peaks August–October; check weather forecasts and PAGASA bulletins.',
      ],
    },
  ],
  weekday: [
    { day: 'Tuesday – Thursday', rating: '★★★★★ Best crowd levels', point: 'Lowest footfall, easiest parking, unrushed cottage choices, shortest ride lines.' },
    { day: 'Monday, Friday', rating: '★★★★ Good', point: 'Light to moderate; manageable for most visitors.' },
    { day: 'Saturday', rating: '★★★ Busy', point: 'Parking can fill before 10:00 AM; arrive early to secure a cottage.' },
    { day: 'Sunday & Philippine public holidays', rating: '★★ Avoid if possible', point: 'Expect large crowds, long entrance queues, very limited parking, and significant SLEX traffic going home. Highly experienced visitors often skip Sundays entirely.' },
  ],
  hourly: [
    { window: '7:00 – 10:00 AM', rating: '★★★★★', point: 'Crisp cool air, soft side-light on Taal Volcano for photographs, and a nearly empty park.' },
    { window: '10:00 AM – 3:00 PM', rating: '★★★', point: 'Bright overhead sun, strong UV, and the highest human noise. Good for picnics under shade; not ideal for landscape photos.' },
    { window: '3:30 – 5:30 PM', rating: '★★★★★', point: 'Golden-hour light for Taal-view photography, cooling wind, classic sunset atmosphere.' },
    { window: '5:30 – 8:00 PM', rating: '★★★', point: 'Dinner BBQs in cottages are lively; note that the park closes around 8:00 PM.' },
  ],
  stay: {
    headline: 'Suggested Visit Duration',
    bullets: [
      'Light visit (scenic overlook + short walk + snacks): 2–3 hours.',
      'Full visit + 1 activity (zipline or horseback) + snacks: 3–4 hours.',
      'Classic Filipino BBQ picnic with family or barkada, including 1–2 activities: 4–5 hours.',
      'Full Tagaytay day itinerary: Picnic Grove (morning) → lunch at Mahogany Market or Balay Dako → People\u2019s Park / Sky Ranch (afternoon).',
    ],
  },
  avoid: [
    'Holy Week (Semana Santa, usually late March or early April) — the entire Tagaytay ridge is extremely congested.',
    'Christmas and New Year holiday weeks.',
    'Undas / All Saints\u2019 weekend (late October / early November).',
    'Any Philippine long weekend the news has widely advertised.',
  ],
};
