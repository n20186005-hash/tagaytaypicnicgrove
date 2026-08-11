export interface FAQItem {
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    question: 'What is the entrance fee for Tagaytay Picnic Grove?',
    answer:
      'The park charges an entrance fee. Historical reference rates are around PHP 50–75 per person. Residents, senior citizens, and students may be eligible for discounts under Philippine law (RA 9994 / RA 10754). Please note that rates are subject to change without notice — always confirm the latest posted prices at the gate or via the Tagaytay City Tourism office or Google Maps.',
  },
  {
    question: 'What are the opening hours? Is it open every day?',
    answer:
      'Tagaytay Picnic Grove generally opens daily from around 7:00 AM to 8:00 PM, including weekends and holidays. Hours may shift during bad weather, Taal Volcano alerts, or special events. Always verify the latest hours on Google Maps before departure.',
  },
  {
    question: 'Can I bring my own food and grill for a BBQ picnic?',
    answer:
      'Yes — bringing your own food is one of the most popular reasons families visit. You can rent a thatched cottage (bahay kubo / hut) with a table and designated BBQ area. Grills and cooking equipment may be available for rent on-site, or you can bring your own portable set. Charcoal, drinks, and snacks are also sold by vendors inside.',
  },
  {
    question: 'Is parking available? Is it free?',
    answer:
      'There is a dedicated paid parking area near the entrance. Cars typically pay a flat fee; buses and vans pay a higher rate. Motorcycle parking is available separately. On weekends and holidays, the lot fills up quickly (often before 10:00 AM), so arrive early or be prepared to use alternative roadside parking (operated by local residents, at your own risk).',
  },
  {
    question: 'Are pets allowed inside the park?',
    answer:
      'Pets are generally allowed when kept on a leash and under supervision. Please clean up after your pet. Note that the park also has horses and other animals, so keep a safe distance. For the very latest policy, contact Tagaytay City Tourism or check recent Google reviews.',
  },
  {
    question: 'Is the park wheelchair accessible?',
    answer:
      'The entrance and main parking area have ramps, and the zone immediately inside the gate is relatively flat. However, Tagaytay Picnic Grove sits on rolling hills — most trails, cottages, and viewing decks involve slopes, unpaved paths, or stairways. Wheelchair users and visitors with limited mobility may find access to deeper areas difficult. Assistance is recommended.',
  },
  {
    question: 'What activities are available besides picnicking?',
    answer:
      'Besides picnic cottages and BBQ areas, the park offers a zipline crossing the ridge, a small scenic cable car, horseback riding on designated trails (great for children), an eco-trail for short walks, and a kids playground. Rates and availability vary — confirm on-site.',
  },
  {
    question: 'How long should I spend at Picnic Grove?',
    answer:
      'Plan 2–3 hours for a quick visit (scenic overlook, light walk, snacks). Add 1–2 hours if you want to try zipline or horseback riding. A full BBQ picnic with family or barkada usually takes 4–5 hours.',
  },
  {
    question: 'Is it safe to visit given Taal Volcano activity?',
    answer:
      'Safety depends on the current PHIVOLCS alert level. When Taal Volcano is at Alert Level 0 or 1, Tagaytay Picnic Grove operates normally. Higher alert levels may trigger temporary park closures. Always check the PHIVOLCS website and Google Maps reviews for the latest situation before you travel.',
  },
  {
    question: 'What should I wear or bring?',
    answer:
      'Tagaytay is significantly cooler than Manila — pack a light jacket or shawl even on dry days. Daytime UV is strong at this elevation, so bring sunscreen, a hat, and sunglasses. Comfortable walking shoes are a must due to sloped and uneven paths. Cash in small bills is highly recommended, as most vendors and ticket booths do not accept cards; bring drinking water and, if you plan to BBQ, your own utensils and supplies.',
  },
  {
    question: 'Is there mobile signal inside the park?',
    answer:
      'Yes — Globe and Smart (the two major Philippine networks) both have stable LTE / 5G coverage in the Tagaytay Ridge area, including inside the park. Data and voice calls should work reliably. GCash and Maya mobile wallet payments are accepted by some vendors.',
  },
  {
    question: 'Can I book cottages, zipline, or horseback riding in advance?',
    answer:
      'Most amenities (cottages, zipline, horseback riding) are first-come, first-served walk-in transactions at the park. There is usually no public online reservation system for individual visitors. Arrive early, especially on weekends and holidays, to secure a cottage or avoid long lines.',
  },
  {
    question: 'Is the zipline safe for children?',
    answer:
      'The zipline has age / height / weight limits enforced on-site. Typically, young children below the minimum height or weight are not allowed, or must ride tandem with an adult. Always follow the instructions of the certified ride marshals for your own safety.',
  },
  {
    question: 'What is the best way to commute from Manila without a car?',
    answer:
      'Take a bus bound for Tagaytay / Nasugbu from PITX (Parañaque Integrated Terminal Exchange) or Buendia / Taft Avenue. Alight at Olivarez Plaza / Rotunda (roughly 2–2.5 hours). From there, ride a People\u2019s Park / Calamba-bound jeepney and ask the driver to drop you at Picnic Grove (15–20 minutes), or hire a tricycle directly (10–15 minutes). Return buses from Olivarez usually run until about 9:00–10:00 PM.',
  },
  {
    question: 'Do they accept credit cards, GCash, or Maya?',
    answer:
      'Most ticket booths and vendors are cash-first. Some stalls accept GCash or Maya; debit and credit cards are rarely accepted. Bring enough Philippine pesos in small bills (P20, P50, P100, P500) for entrance, parking, tricycles, and snacks.',
  },
];

export const faqJsonLd = {
  '@type': 'FAQPage',
  mainEntity: faqItems.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: answer,
    },
  })),
};
