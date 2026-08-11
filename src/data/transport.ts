export interface TransportSection {
  title: string;
  icon: string;
  body: string[];
}

export interface TransportInfo {
  fromAirport: TransportSection[];
  driving: TransportSection;
  commute: TransportSection;
  taxiRidehail: TransportSection;
  parking: {
    headline: string;
    bullets: string[];
  };
}

export const transport: TransportInfo = {
  fromAirport: [
    {
      title: 'NAIA (Manila Ninoy Aquino International Airport) → Picnic Grove',
      icon: '✈️',
      body: [
        'Approx. 65 km total via SLEX and Santa Rosa–Tagaytay Road.',
        'Option A — Private transfer / GrabCar Premium (most convenient): 1.5–3 hours depending on traffic. Typical fares start around PHP 2,500–4,000 one-way for a sedan.',
        'Option B — Airport bus (e.g., UBE Express Premium Point-to-Point) to a Tagaytay-bound terminal such as PITX, then connect via bus + jeepney/tricycle per the commute route below.',
        'Option C — Chartered van or SUV with driver for a full day (PHP 4,000–7,000/day) if you plan to combine multiple Tagaytay stops. Popular for families and barkada groups.',
      ],
    },
    {
      title: 'Clark International Airport (CRK) → Picnic Grove (alternate entry)',
      icon: '🛬',
      body: [
        'Longer total drive (~130 km via NLEX + SLEX), about 3–4 hours without traffic.',
        'Use only if you are already flying into Clark and combining Tagaytay with a longer Luzon itinerary.',
      ],
    },
  ],
  driving: {
    title: 'From Manila (Private Car / Van)',
    icon: '🚗',
    body: [
      'Primary route: South Luzon Expressway (SLEX) southbound → exit at Santa Rosa → take Santa Rosa–Tagaytay Road uphill to Tagaytay → at Olivarez Rotunda, turn left onto Tagaytay–Calamba Road → continue east 4–5 km. Picnic Grove is on the right-hand side.',
      'Alternative route (heavier in some hours): SLEX → Carmona exit → Governor\u2019s Drive → turn onto Aguinaldo Highway → Silang → Tagaytay Rotunda.',
      'Drive time: 1.5–2 hours with light traffic. Weekends and Philippine long weekends regularly stretch to 2.5–3.5+ hours due to congestion on SLEX and the uphill Santa Rosa–Tagaytay Road.',
      'Arrive 7:00–8:00 AM on weekends and holidays to beat the queues and guarantee parking inside the lot.',
    ],
  },
  commute: {
    title: 'Commute (Public Bus + Jeepney / Tricycle)',
    icon: '🚌',
    body: [
      'Step 1 — Metro Manila to Tagaytay Olivarez Plaza / Rotunda: board a bus bound for Tagaytay, Nasugbu, or Balayan from PITX (Parañaque Integrated Terminal Exchange) or Buendia / Taft Avenue stations. Fare is approximately PHP 100–150 and takes 2–2.5 hours.',
      'Step 2 — Olivarez to Picnic Grove (two local options):',
      '   • Jeepney: take a People\u2019s Park / Calamba-bound jeepney and tell the driver "sa Picnic Grove po". Ride is about 15–20 minutes.',
      '   • Tricycle: charter directly from Olivarez terminal to Picnic Grove gate — roughly 10–15 minutes. Negotiate the price before boarding (expect PHP 50–100+ depending on traffic and haggling).',
      'Returning to Manila: buses leave Olivarez / Rotunda until approximately 9:00–10:00 PM. Skip the peak 4:00–6:00 PM homebound rush if possible; buy your bus ticket early on Sundays and holidays.',
    ],
  },
  taxiRidehail: {
    title: 'Taxis & Ride-hailing (Grab, etc.)',
    icon: '🚕',
    body: [
      'Grab works reliably in central Manila but coverage and driver supply in Tagaytay itself are spotty — do not depend on Grab for a return trip from Picnic Grove.',
      'For a worry-free day trip from Manila, book a full-day charter (car with a driver) in advance. Standard rates hover around PHP 3,500–5,000 for a sedan or SUV with 4–6 hours of waiting time; longer Tagaytay itineraries cost more.',
      'Flag-down yellow / white metered taxis are rare at Picnic Grove itself; pre-arranged transport is safer and faster.',
    ],
  },
  parking: {
    headline: 'On-site Parking at Picnic Grove',
    bullets: [
      'Dedicated paved parking lot right beside the main gate; walk 1–3 minutes to the ticket booth.',
      'Flat-rate fee per entry for cars, SUVs, and vans; buses have a separate, higher rate; motorcycles have a dedicated motorcycle parking area.',
      'On weekends and holidays the lot fills fast (often by 10:00 AM). Arrive 7:00–8:00 AM to secure a spot.',
      'If the on-site lot is full: local residents sometimes offer informal roadside parking along Tagaytay–Calamba Road. Confirm the price clearly before entering and be aware these spots are not managed by the city government.',
      'People\u2019s Park in the Sky has its own parking lot about 2–3 km west; walking between the two parks is possible (≈2 km) but not recommended because the narrow roadside has no sidewalk.',
    ],
  },
};
