import type { LanguageCode } from '../i18n/types';

/**
 * 与语言无关的 HTML 片段生成器（纯函数，不依赖 DOM）。
 * 服务端（Astro 构建期）用它直接输出可见内容，客户端切换语言时复用同一份标记，
 * 保证：首屏 HTML 里就有票价 / 营业时间 / 停车 / 活动 / FAQ 的答案文本。
 */

const ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

export function esc(value: unknown): string {
  return String(value ?? '').replace(/[&<>"']/g, (ch) => ESCAPES[ch]);
}

export interface CoordsInfo {
  latitude?: number;
  longitude?: number;
  plusCode?: string;
}

export function quickInfoHtml(ui: any, data: any, coords: CoordsInfo = {}): string {
  const attraction = data?.attraction || {};
  const fees = data?.fees || {};
  const items = [
    {
      dt: ui?.overview?.quickInfo?.address || 'Address',
      dd: `${attraction.address?.streetAddress || ''}, ${attraction.address?.addressLocality || ''}, ${attraction.address?.addressRegion || ''} 4120`,
    },
    {
      dt: ui?.overview?.quickInfo?.hours || 'Hours',
      dd: `${attraction.openingHours?.weekday || ''} · ${attraction.openingHours?.opens || '07:00'}–${attraction.openingHours?.closes || '20:00'}`,
    },
    {
      dt: ui?.overview?.quickInfo?.entrance || 'Entrance',
      dd: `${fees.entrance?.label || ''}: PHP 50 – 75`,
    },
    {
      dt: ui?.overview?.quickInfo?.coordinates || 'Coordinates',
      dd: `${coords.latitude ?? 14.1247161}, ${coords.longitude ?? 120.9977949} · Plus code ${coords.plusCode || '4XFX+V4'}`,
    },
    {
      dt: ui?.overview?.quickInfo?.operator || 'Operator',
      dd: 'Tagaytay City Government · Tagaytay City Tourism',
    },
  ];
  return items
    .map(
      (i) => `
    <div>
      <dt class="text-muted">${esc(i.dt)}</dt>
      <dd class="mt-0.5 font-medium text-charcoal">${esc(i.dd)}</dd>
    </div>`
    )
    .join('');
}

export function feesCardsHtml(data: any): string {
  const entrance = data?.fees?.entrance || { label: '', note: '' };
  const cottages = data?.fees?.cottages || { label: '', note: '' };
  return `
    <div class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-forest-100">
      <h3 class="font-semibold text-forest-800">${esc(entrance.label || '')}</h3>
      <div class="mt-2 font-serif text-3xl font-bold text-sunset-600">PHP 50 – 75</div>
      <p class="mt-3 text-sm text-muted">${esc(entrance.note || '')}</p>
    </div>
    <div class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-forest-100">
      <h3 class="font-semibold text-forest-800">${esc(cottages.label || '')}</h3>
      <div class="mt-2 font-serif text-3xl font-bold text-sunset-600">PHP 100 – 500</div>
      <p class="mt-3 text-sm text-muted">${esc(cottages.note || '')}</p>
    </div>`;
}

export function activitiesRowsHtml(data: any, lang: LanguageCode = 'en'): string {
  const acts = data?.fees?.activities || [];
  const ranges = [
    'PHP 200 – 300',
    lang === 'fil' ? 'Nag-iiba' : 'Varies',
    'PHP 150 – 250',
    lang === 'fil' ? 'Kasama' : 'Included',
  ];
  return acts
    .map(
      (a: any, i: number) => `
    <tr class="${i % 2 ? 'bg-forest-50/40 border-t border-forest-100' : 'border-t border-forest-100'}">
      <td class="px-5 py-4 font-medium text-charcoal">${esc(a.label || '')}</td>
      <td class="px-5 py-4 font-semibold text-sunset-700">${esc(ranges[i] || '')}</td>
      <td class="px-5 py-4 text-muted">${esc(a.note || '')}</td>
    </tr>`
    )
    .join('');
}

export function paymentTipsHtml(data: any): string {
  const payment = data?.fees?.payment || { label: '', bullets: [] };
  return `
    <h3 class="font-semibold text-lake-900">${esc(payment.label || '')}</h3>
    <ul class="mt-3 list-inside list-disc space-y-1.5 text-sm text-lake-900/90">
      ${(payment.bullets || []).map((b: string) => `<li>${esc(b)}</li>`).join('')}
    </ul>`;
}

export function parkingHeadline(data: any): string {
  return data?.transport?.parking?.headline || '';
}

export function parkingBulletsHtml(data: any): string {
  const bullets = data?.transport?.parking?.bullets || [];
  return bullets
    .map(
      (b: string) => `
      <li class="flex gap-3 rounded-2xl border border-forest-100 bg-white p-5 shadow-sm">
        <span class="mt-1 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-forest-100 text-sm font-bold text-forest-700">✓</span>
        <span class="text-sm text-charcoal">${esc(b)}</span>
      </li>`
    )
    .join('');
}

export function faqHtml(data: any): string {
  const faq = data?.faq || [];
  return faq
    .map(
      (f: any) => `
    <details class="group rounded-2xl border border-forest-100 bg-white p-5 shadow-sm open:border-sunset-200 open:bg-sunset-50/40">
      <summary class="flex items-start justify-between gap-4">
        <span class="font-semibold text-charcoal">${esc(f.question || '')}</span>
        <span class="flex-none flex h-7 w-7 items-center justify-center rounded-full bg-forest-100 text-lg font-bold text-forest-700 transition group-open:rotate-45 group-open:bg-sunset-100 group-open:text-sunset-700">+</span>
      </summary>
      <p class="mt-3 text-sm leading-relaxed text-muted">${esc(f.answer || '')}</p>
    </details>`
    )
    .join('');
}

/* ------------------------------------------------------------------ *
 * 以下区块同样是「静态数据 + 固定标记」，全部在构建期直出，
 * 让爬虫首屏就能读到营业时间、交通、周边、活动路线等长尾答案文本。
 * ------------------------------------------------------------------ */

export function featureCardsHtml(ui: any): string {
  const icons = ['🌋', '🌲', '🍢', '👨‍👩‍👧'];
  const keys = ['taalView', 'coolAir', 'bbqCulture', 'familyFriendly'];
  return keys
    .map((k, i) => {
      const f = ui?.overview?.features?.[k] || { title: k, desc: k };
      return `
      <div class="rounded-2xl border border-forest-100 bg-white p-5 shadow-sm">
        <div class="text-3xl">${icons[i]}</div>
        <h3 class="mt-3 font-semibold text-forest-800">${esc(f.title || k)}</h3>
        <p class="mt-2 text-sm text-muted">${esc(f.desc || '')}</p>
      </div>`;
    })
    .join('');
}

export function bestTimeHeadline(data: any): string {
  return data?.bestTime?.headline || '';
}

export function bestTimeSeasonHtml(data: any): string {
  return (data?.bestTime?.season || [])
    .map(
      (s: any) => `
      <article class="rounded-2xl border border-forest-100 bg-white p-5 shadow-sm">
        <div class="flex items-baseline justify-between">
          <h4 class="font-semibold text-charcoal">${esc(s.period || '')}</h4>
          <span class="text-sm font-bold text-sunset-600">${esc(s.rating || '')}</span>
        </div>
        <ul class="mt-3 list-inside list-disc space-y-1 pl-1 text-sm text-muted">
          ${(s.points || []).map((p: string) => `<li>${esc(p)}</li>`).join('')}
        </ul>
      </article>`
    )
    .join('');
}

export function bestTimeWeekdayHtml(data: any): string {
  return (data?.bestTime?.weekday || [])
    .map(
      (d: any) => `
      <article class="flex items-start gap-4 rounded-2xl border border-forest-100 bg-white p-5 shadow-sm">
        <div class="flex-1">
          <h4 class="font-semibold text-charcoal">${esc(d.day || '')}</h4>
          <p class="mt-1 text-sm text-muted">${esc(d.point || '')}</p>
        </div>
        <span class="text-xs font-bold text-sunset-600">${esc(d.rating || '')}</span>
      </article>`
    )
    .join('');
}

export function bestTimeStayHtml(data: any): string {
  const s = data?.bestTime?.stay || { bullets: [] };
  return `<ul class="list-inside list-disc space-y-1.5 text-sm text-muted">
      ${(s.bullets || []).map((b: string) => `<li>${esc(b)}</li>`).join('')}
    </ul>`;
}

export function bestTimeHourlyHtml(data: any): string {
  return (data?.bestTime?.hourly || [])
    .map(
      (h: any) => `
      <article class="rounded-2xl border border-forest-100 bg-white p-5 shadow-sm">
        <div class="flex items-baseline justify-between">
          <h4 class="font-semibold text-charcoal">${esc(h.window || '')}</h4>
          <span class="text-sm font-bold text-sunset-600">${esc(h.rating || '')}</span>
        </div>
        <p class="mt-2 text-sm text-muted">${esc(h.point || '')}</p>
      </article>`
    )
    .join('');
}

export function bestTimeAvoidHtml(data: any): string {
  return (data?.bestTime?.avoid || []).map((a: string) => `<li>${esc(a)}</li>`).join('');
}

export function transportCardsHtml(ui: any, data: any): string {
  const tr = data?.transport || {};
  const cards: any[] = [tr.driving, tr.commute, tr.taxiRidehail];
  cards.push({
    title: ui?.transport?.fromAirports || 'From the Airports',
    icon: '✈️',
    isAirport: true,
    fromAirport: tr.fromAirport,
  });

  return cards
    .map((c) => {
      if (c?.isAirport) {
        return `
        <article class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-forest-100">
          <div class="flex items-center gap-3">
            <span class="text-2xl">✈️</span>
            <h3 class="font-semibold text-forest-800">${esc(c.title || '')}</h3>
          </div>
          <div class="mt-4 space-y-5">
            ${(c.fromAirport || [])
              .map(
                (a: any) => `
              <div>
                <h4 class="flex items-center gap-2 font-medium text-charcoal"><span>${a.icon || ''}</span> ${esc(a.title || '')}</h4>
                <ul class="mt-2 list-inside list-disc space-y-1.5 pl-4 text-sm text-muted">
                  ${(a.body || []).map((b: string) => `<li>${esc(b)}</li>`).join('')}
                </ul>
              </div>`
              )
              .join('')}
          </div>
        </article>`;
      }
      return `
      <article class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-forest-100">
        <div class="flex items-center gap-3">
          <span class="text-2xl">${c?.icon || ''}</span>
          <h3 class="font-semibold text-forest-800">${esc(c?.title || '')}</h3>
        </div>
        <ul class="mt-4 list-inside list-disc space-y-2 text-sm text-muted">
          ${(c?.body || []).map((b: string) => `<li>${esc(b)}</li>`).join('')}
        </ul>
      </article>`;
    })
    .join('');
}

export function transportGuideRoutesHtml(ui: any, data: any): string {
  const t = ui?.transportGuide || {};
  return (data?.transportGuide?.routes || [])
    .map(
      (r: any) => `
      <article class="rounded-2xl border border-forest-100 bg-white p-5 shadow-sm">
        <h3 class="flex items-center gap-2 font-semibold text-forest-800"><span aria-hidden="true">${esc(r.icon || '')}</span>${esc(r.mode || '')}</h3>
        <p class="mt-1 text-xs font-semibold text-forest-700">${esc(r.from || '')}</p>
        <h4 class="mt-3 text-sm font-semibold text-forest-800">${esc(t.stepsLabel || '')}</h4>
        <ol class="mt-2 list-decimal space-y-1 pl-5 text-sm text-muted">
          ${(r.steps || []).map((s: string) => `<li>${esc(s)}</li>`).join('')}
        </ol>
        <dl class="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          <div><dt class="font-semibold text-forest-700">${esc(t.timeLabel || '')}</dt><dd class="text-muted">${esc(r.time || '')}</dd></div>
          <div><dt class="font-semibold text-forest-700">${esc(t.costLabel || '')}</dt><dd class="text-muted">${esc(r.cost || '')}</dd></div>
        </dl>
        <p class="mt-3 text-sm text-muted"><span class="font-semibold text-forest-700">${esc(t.notesLabel || '')}:</span> ${esc(r.notes || '')}</p>
      </article>`
    )
    .join('');
}

export function transportGuideTipsHtml(data: any): string {
  return (data?.transportGuide?.tips || []).map((s: string) => `<li>${esc(s)}</li>`).join('');
}

export function foodCardsHtml(ui: any, data: any): string {
  return (data?.food || [])
    .map(
      (f: any) => `
    <article class="flex flex-col rounded-2xl border border-forest-100 bg-white p-6 shadow-sm">
      <div class="flex items-start justify-between gap-2">
        <h3 class="font-semibold text-forest-800">${esc(f.name || '')}</h3>
        <span class="flex-none rounded-full bg-forest-100 px-2.5 py-0.5 text-sm font-bold text-forest-700">${esc(f.budget || '')}</span>
      </div>
      <p class="mt-1 text-sm text-muted">${esc(f.type || '')}</p>
      <dl class="mt-4 space-y-2 text-sm">
        <div class="flex gap-2">
          <dt class="w-20 flex-none text-muted">${esc(ui?.food?.distance || 'Distance')}</dt>
          <dd class="text-charcoal">${esc(f.distanceKm || '')} · ${esc(f.direction || '')}</dd>
        </div>
      </dl>
      <p class="mt-4 flex-1 text-sm text-muted">${esc(f.reason || '')}</p>
      <a class="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-forest-100 px-4 py-2 text-sm font-semibold text-forest-700 hover:bg-forest-200" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(f.mapsQuery || f.name || '')}" target="_blank" rel="noopener noreferrer">${esc(ui?.food?.openInMaps || 'Open in Maps')}</a>
    </article>`
    )
    .join('');
}

export function nearbyCardsHtml(ui: any, data: any): string {
  return (data?.nearby || [])
    .map(
      (n: any) => `
    <article class="flex flex-col rounded-2xl border border-sunset-200 bg-white p-6 shadow-sm">
      <h3 class="font-semibold text-forest-800">${esc(n.name || '')}</h3>
      <p class="mt-1 text-sm text-muted">${esc(n.type || '')}</p>
      <dl class="mt-4 space-y-1 text-sm">
        <div class="flex gap-2">
          <dt class="w-20 flex-none text-muted">${esc(ui?.nearby?.distance || 'Distance')}</dt>
          <dd class="text-charcoal">${esc(n.distanceKm || '')}</dd>
        </div>
        <div class="flex gap-2">
          <dt class="w-20 flex-none text-muted">${esc(ui?.nearby?.drive || 'Drive')}</dt>
          <dd class="text-charcoal">${esc(n.driveMinutes || '')}</dd>
        </div>
      </dl>
      <p class="mt-4 flex-1 text-sm text-muted">${esc(n.summary || '')}</p>
      <a class="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-sunset-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sunset-600" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(n.mapsQuery || n.name || '')}" target="_blank" rel="noopener noreferrer">${esc(ui?.nearby?.getDirections || 'Get directions')}</a>
    </article>`
    )
    .join('');
}

function reviewCardHtml(r: any, author: string): string {
  return `
    <article class="rounded-2xl border border-forest-100 bg-white p-5 shadow-sm">
      <h4 class="font-semibold text-forest-800">${esc(r?.title || '')}</h4>
      <p class="mt-2 text-sm text-muted">${esc(r?.text || '')}</p>
      ${author ? `<p class="mt-3 text-xs text-muted/80">${esc(author)}</p>` : ''}
    </article>`;
}

export function reviewsPositiveHtml(ui: any, data: any): string {
  const author = ui?.reviews?.authorLabel || '';
  return (data?.reviews?.positive || []).map((r: any) => reviewCardHtml(r, author)).join('');
}

export function reviewsCriticalHtml(ui: any, data: any): string {
  const author = ui?.reviews?.authorLabel || '';
  return (data?.reviews?.critical || []).map((r: any) => reviewCardHtml(r, author)).join('');
}

export function historyParagraphsHtml(data: any): string {
  return (data?.history?.paragraphs || []).map((p: string) => `<p>${esc(p)}</p>`).join('');
}

export function historyMilestonesHtml(data: any): string {
  return (data?.history?.milestones || [])
    .map(
      (m: any) => `
      <li class="flex flex-col gap-1 rounded-2xl border border-forest-100 bg-white p-5 shadow-sm sm:flex-row sm:gap-5">
        <span class="flex-none font-semibold text-sunset-700 sm:w-24">${esc(m?.year || '')}</span>
        <span class="text-sm text-charcoal">${esc(m?.text || '')}</span>
      </li>`
    )
    .join('');
}

export function legendsHtml(data: any): string {
  return (data?.legends || [])
    .map(
      (l: any) => `
    <article class="rounded-2xl border border-forest-100 bg-white p-5 shadow-sm">
      <div class="flex flex-wrap items-center gap-2">
        <h3 class="font-semibold text-forest-800">${esc(l.title || '')}</h3>
        <span class="rounded-full bg-forest-50 px-3 py-1 text-xs font-semibold text-forest-700">${esc(l.kind || '')}</span>
      </div>
      <p class="mt-2 text-sm text-muted">${esc(l.text || '')}</p>
    </article>`
    )
    .join('');
}

export function legendsNote(ui: any): string {
  return ui?.legends?.note || '';
}

export function sourcesHtml(data: any): string {
  return (data?.sources || [])
    .map(
      (s: any) => `
    <li class="rounded-2xl border border-forest-100 bg-white p-5 shadow-sm">
      <a href="${esc(s?.url || '#')}" target="_blank" rel="noopener noreferrer" class="font-semibold text-forest-700 underline hover:text-forest-800">${esc(s?.name || '')}</a>
      <p class="mt-1 text-sm text-muted">${esc(s?.note || '')}</p>
      <p class="mt-1 break-all text-xs text-muted/80">${esc(s?.url || '')}</p>
    </li>`
    )
    .join('');
}

export function seasonStrategyHeadHtml(ui: any): string {
  const t = ui?.seasonStrategy || {};
  return `<tr>
      <th scope="col" class="px-4 py-3 text-left">${esc(t.colSeason || '')}</th>
      <th scope="col" class="px-4 py-3 text-left">${esc(t.colWeather || '')}</th>
      <th scope="col" class="px-4 py-3 text-left">${esc(t.colVolcano || '')}</th>
      <th scope="col" class="px-4 py-3 text-left">${esc(t.colNature || '')}</th>
      <th scope="col" class="px-4 py-3 text-left">${esc(t.colAdvice || '')}</th>
    </tr>`;
}

export function seasonStrategyRowsHtml(data: any): string {
  return (data?.seasonStrategy || [])
    .map(
      (r: any) => `
    <tr class="border-t border-forest-100 align-top">
      <th scope="row" class="px-4 py-4 text-left">
        <span class="font-semibold text-forest-800">${esc(r.season || '')}</span>
        <span class="mt-1 block text-xs font-normal text-muted">${esc(r.months || '')}</span>
      </th>
      <td class="px-4 py-4">${esc(r.weather || '')}</td>
      <td class="px-4 py-4">${esc(r.volcano || '')}</td>
      <td class="px-4 py-4">${esc(r.nature || '')}</td>
      <td class="px-4 py-4">${esc(r.advice || '')}</td>
    </tr>`
    )
    .join('');
}

export function servicesCardsHtml(ui: any, data: any): string {
  const t = ui?.services || {};
  return (data?.services || [])
    .map(
      (s: any) => `
    <article class="rounded-2xl border border-forest-100 bg-white p-5 shadow-sm">
      <h3 class="flex items-center gap-2 font-semibold text-forest-800"><span aria-hidden="true">${esc(s.icon || '')}</span>${esc(s.type || '')}</h3>
      <p class="mt-2 text-sm text-muted">${esc(s.what || '')}</p>
      <dl class="mt-3 space-y-2 text-sm">
        <div><dt class="font-semibold text-forest-700">${esc(t.whereLabel || '')}</dt><dd class="text-muted">${esc(s.where || '')}</dd></div>
        <div><dt class="font-semibold text-forest-700">${esc(t.tipsLabel || '')}</dt><dd class="text-muted">${esc(s.tips || '')}</dd></div>
      </dl>
    </article>`
    )
    .join('');
}

export function audienceRoutesHtml(ui: any, data: any): string {
  const t = ui?.routes || {};
  return (data?.audienceRoutes || [])
    .map(
      (r: any) => `
      <article class="rounded-2xl border border-forest-100 bg-white p-5 shadow-sm">
        <h3 class="flex items-center gap-2 font-semibold text-forest-800"><span aria-hidden="true">${esc(r.icon || '')}</span>${esc(r.audience || '')}</h3>
        <p class="mt-2 text-sm text-muted">${esc(r.summary || '')}</p>
        <p class="mt-2 text-xs font-semibold text-forest-700">${esc(t.paceLabel || '')}: ${esc(r.pace || '')}</p>
        <h4 class="mt-3 text-sm font-semibold text-forest-800">${esc(t.stopsLabel || '')}</h4>
        <ol class="mt-2 list-decimal space-y-1 pl-5 text-sm text-muted">
          ${(r.stops || []).map((s: string) => `<li>${esc(s)}</li>`).join('')}
        </ol>
        <h4 class="mt-3 text-sm font-semibold text-forest-800">${esc(t.tipsLabel || '')}</h4>
        <ul class="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
          ${(r.tips || []).map((s: string) => `<li>${esc(s)}</li>`).join('')}
        </ul>
      </article>`
    )
    .join('');
}

export function suggestedRoutesHtml(ui: any, data: any): string {
  const t = ui?.routes || {};
  return (data?.suggestedRoutes || [])
    .map(
      (r: any) => `
      <article class="rounded-2xl border border-forest-100 bg-white p-5 shadow-sm">
        <div class="flex flex-wrap items-baseline justify-between gap-2">
          <h3 class="font-semibold text-forest-800">${esc(r.name || '')}</h3>
          <span class="rounded-full bg-forest-50 px-3 py-1 text-xs font-semibold text-forest-700">${esc(t.durationLabel || '')}: ${esc(r.duration || '')}</span>
        </div>
        <p class="mt-2 text-sm text-muted">${esc(r.summary || '')}</p>
        <ol class="mt-3 list-decimal space-y-1 pl-5 text-sm text-muted">
          ${(r.steps || []).map((s: string) => `<li>${esc(s)}</li>`).join('')}
        </ol>
      </article>`
    )
    .join('');
}

const ITINERARY_BASE_MAPS: Record<string, string> = {
  'mahogany-bulalo': 'https://www.google.com/maps/search/?api=1&query=Mahogany+Beef+Market+Tagaytay',
  'mushroom-burger': 'https://www.google.com/maps/search/?api=1&query=Mushroomburger+Tagaytay',
  'peoples-park': 'https://www.google.com/maps/search/?api=1&query=People%27s+Park+in+the+Sky+Tagaytay',
  'sky-ranch': 'https://www.google.com/maps/search/?api=1&query=Sky+Ranch+Tagaytay',
};

const ITINERARY_CAT_CLASSES: Record<string, string> = {
  View: 'bg-lake-100 text-lake-800 ring-lake-200',
  Activity: 'bg-forest-100 text-forest-800 ring-forest-200',
  Food: 'bg-sunset-100 text-sunset-800 ring-sunset-200',
  Nearby: 'bg-lake-50 text-lake-900 ring-lake-300',
};

export function itineraryHtml(ui: any, data: any): string {
  const catLabels = ui?.itinerary?.categories || { View: 'View', Activity: 'Activity', Food: 'Food', Nearby: 'Nearby' };
  return (data?.itinerary || [])
    .map((it: any) => {
      const maps = it?.maps || ITINERARY_BASE_MAPS[it?.id] || '';
      const cat = it?.category || 'View';
      return `
    <label class="group flex cursor-pointer gap-3 rounded-2xl border border-forest-100 bg-white p-5 shadow-sm hover:border-forest-200" data-itin-id="${esc(it.id || '')}">
      <input type="checkbox" class="mt-1 h-5 w-5 flex-none accent-forest-700" data-itin-check="${esc(it.id || '')}" />
      <div class="flex-1">
        <div class="flex items-center gap-2">
          <span class="inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ring-1 ${ITINERARY_CAT_CLASSES[cat] || ''}">${esc(catLabels[cat] || cat)}</span>
          ${it?.duration ? `<span class="text-xs text-muted">${esc(it.duration)}</span>` : ''}
        </div>
        <div class="mt-1 font-semibold text-charcoal">${esc(it.title || '')}</div>
        <p class="mt-1 text-sm text-muted">${esc(it.description || '')}</p>
        ${maps ? `<a class="mt-2 inline-block text-xs font-semibold text-forest-700 hover:text-forest-800 underline" href="${esc(maps)}" target="_blank" rel="noopener noreferrer">${esc(ui?.food?.openInMaps || 'Open in Maps')} →</a>` : ''}
      </div>
    </label>`;
    })
    .join('');
}
