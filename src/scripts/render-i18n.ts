import { weatherAdviceHtml, weatherSummaryLine } from './weather-advice-view';
import {
  activitiesRowsHtml,
  esc,
  faqHtml,
  feesCardsHtml,
  parkingBulletsHtml,
  parkingHeadline,
  paymentTipsHtml,
  quickInfoHtml,
} from './sections-html';
import {
  setLanguage,
  applyLanguage,
  getInitialLanguage,
  getStoredLanguage,
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  type LanguageCode,
} from './i18n';

declare global {
  interface Window {
    __TRANSLATIONS__?: Record<LanguageCode, any>;
    __TPG_GALLERY_FILES__?: Array<{ id: string; src: string }>;
    __TPG_ITIN_LOAD__?: () => Set<string>;
    __TPG_ITIN_SAVE__?: (s: Set<string>) => void;
    __TPG_MAPS_URL__?: string;
    __TPG_HERO_URL__?: string;
    __TPG_ENTITY__?: { plusCode?: string; latitude?: number; longitude?: number };
    __TPG_WEATHER__?: {
      current?: Record<string, any>;
      daily?: Array<Record<string, any>>;
      updatedAt?: string;
      source?: string;
    };
    __TPG_WEATHER_URL__?: string;
    __TPG_RENDER_WEATHER__?: () => void;
  }
}

function getData(lang: LanguageCode) {
  return window.__TRANSLATIONS__?.[lang]?.data || {};
}

function getUI(lang: LanguageCode) {
  return window.__TRANSLATIONS__?.[lang]?.ui || {};
}

/** 转义函数与服务端渲染共用（见 sections-html.ts），保证两端标记一致 */

function renderFeatureCards(lang: LanguageCode) {
  const ui = getUI(lang);
  const container = document.getElementById('feature-cards');
  if (!container) return;
  const icons = ['🌋', '🌲', '🍢', '👨‍👩‍👧'];
  const keys = ['taalView', 'coolAir', 'bbqCulture', 'familyFriendly'];
  container.innerHTML = keys.map((k, i) => {
    const f = ui.overview?.features?.[k] || { title: k, desc: k };
    return `
      <div class="rounded-2xl border border-forest-100 bg-white p-5 shadow-sm">
        <div class="text-3xl">${icons[i]}</div>
        <h3 class="mt-3 font-semibold text-forest-800">${esc(f.title || k)}</h3>
        <p class="mt-2 text-sm text-muted">${esc(f.desc || '')}</p>
      </div>`;
  }).join('');
}

function renderQuickInfo(lang: LanguageCode) {
  const ui = getUI(lang);
  const data = getData(lang);
  const container = document.getElementById('quickinfo-list');
  if (!container) return;
  container.innerHTML = quickInfoHtml(ui, data, window.__TPG_ENTITY__ || {});
}

function renderFeesCards(lang: LanguageCode) {
  const data = getData(lang);
  const container = document.getElementById('fees-cards');
  if (!container) return;
  container.innerHTML = feesCardsHtml(data);
}

function renderActivitiesTable(lang: LanguageCode) {
  const data = getData(lang);
  const tbody = document.getElementById('activities-table');
  if (!tbody) return;
  tbody.innerHTML = activitiesRowsHtml(data, lang);
}

function renderPaymentTips(lang: LanguageCode) {
  const data = getData(lang);
  const container = document.getElementById('payment-tips');
  if (!container) return;
  container.innerHTML = paymentTipsHtml(data);
}

function renderParking(lang: LanguageCode) {
  const data = getData(lang);
  const headline = document.getElementById('parking-headline');
  const bullets = document.getElementById('parking-bullets');
  if (headline) headline.textContent = parkingHeadline(data);
  if (bullets) bullets.innerHTML = parkingBulletsHtml(data);
}

function renderBestTime(lang: LanguageCode) {
  const data = getData(lang);
  const bt = data.bestTime || {};
  const headline = document.getElementById('besttime-headline');
  if (headline) headline.textContent = bt.headline || '';

  const season = document.getElementById('besttime-season');
  if (season) {
    season.innerHTML = (bt.season || []).map((s: any) => `
      <article class="rounded-2xl border border-forest-100 bg-white p-5 shadow-sm">
        <div class="flex items-baseline justify-between">
          <h4 class="font-semibold text-charcoal">${esc(s.period || '')}</h4>
          <span class="text-sm font-bold text-sunset-600">${esc(s.rating || '')}</span>
        </div>
        <ul class="mt-3 list-inside list-disc space-y-1 pl-1 text-sm text-muted">
          ${(s.points || []).map((p: string) => `<li>${esc(p)}</li>`).join('')}
        </ul>
      </article>`).join('');
  }

  const weekday = document.getElementById('besttime-weekday');
  if (weekday) {
    weekday.innerHTML = (bt.weekday || []).map((d: any) => `
      <article class="flex items-start gap-4 rounded-2xl border border-forest-100 bg-white p-5 shadow-sm">
        <div class="flex-1">
          <h4 class="font-semibold text-charcoal">${esc(d.day || '')}</h4>
          <p class="mt-1 text-sm text-muted">${esc(d.point || '')}</p>
        </div>
        <span class="text-xs font-bold text-sunset-600">${esc(d.rating || '')}</span>
      </article>`).join('');
  }

  const stay = document.getElementById('besttime-stay');
  if (stay) {
    const s = bt.stay || { bullets: [] };
    stay.innerHTML = `<ul class="list-inside list-disc space-y-1.5 text-sm text-muted">
      ${(s.bullets || []).map((b: string) => `<li>${esc(b)}</li>`).join('')}
    </ul>`;
  }

  const hourly = document.getElementById('besttime-hourly');
  if (hourly) {
    hourly.innerHTML = (bt.hourly || []).map((h: any) => `
      <article class="rounded-2xl border border-forest-100 bg-white p-5 shadow-sm">
        <div class="flex items-baseline justify-between">
          <h4 class="font-semibold text-charcoal">${esc(h.window || '')}</h4>
          <span class="text-sm font-bold text-sunset-600">${esc(h.rating || '')}</span>
        </div>
        <p class="mt-2 text-sm text-muted">${esc(h.point || '')}</p>
      </article>`).join('');
  }

  const avoid = document.getElementById('besttime-avoid');
  if (avoid) {
    avoid.innerHTML = (bt.avoid || []).map((a: string) => `<li>${esc(a)}</li>`).join('');
  }
}

function renderTransport(lang: LanguageCode) {
  const ui = getUI(lang);
  const data = getData(lang);
  const tr = data.transport || {};
  const container = document.getElementById('transport-cards');
  if (!container) return;

  const cards: any[] = [];
  cards.push(tr.driving);
  cards.push(tr.commute);
  cards.push(tr.taxiRidehail);
  cards.push({ title: ui.transport?.fromAirports || 'From the Airports', icon: '✈️', isAirport: true, fromAirport: tr.fromAirport });

  container.innerHTML = cards.map((c) => {
    if (c?.isAirport) {
      return `
        <article class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-forest-100">
          <div class="flex items-center gap-3">
            <span class="text-2xl">✈️</span>
            <h3 class="font-semibold text-forest-800">${esc(c.title || '')}</h3>
          </div>
          <div class="mt-4 space-y-5">
            ${(c.fromAirport || []).map((a: any) => `
              <div>
                <h4 class="flex items-center gap-2 font-medium text-charcoal"><span>${a.icon || ''}</span> ${esc(a.title || '')}</h4>
                <ul class="mt-2 list-inside list-disc space-y-1.5 pl-4 text-sm text-muted">
                  ${(a.body || []).map((b: string) => `<li>${esc(b)}</li>`).join('')}
                </ul>
              </div>`).join('')}
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
  }).join('');
}

function renderFood(lang: LanguageCode) {
  const ui = getUI(lang);
  const data = getData(lang);
  const container = document.getElementById('food-cards');
  if (!container) return;
  const food = data.food || [];
  container.innerHTML = food.map((f: any) => `
    <article class="flex flex-col rounded-2xl border border-forest-100 bg-white p-6 shadow-sm">
      <div class="flex items-start justify-between gap-2">
        <h3 class="font-semibold text-forest-800">${esc(f.name || '')}</h3>
        <span class="flex-none rounded-full bg-forest-100 px-2.5 py-0.5 text-sm font-bold text-forest-700">${esc(f.budget || '')}</span>
      </div>
      <p class="mt-1 text-sm text-muted">${esc(f.type || '')}</p>
      <dl class="mt-4 space-y-2 text-sm">
        <div class="flex gap-2">
          <dt class="w-20 flex-none text-muted">${esc(ui.food?.distance || 'Distance')}</dt>
          <dd class="text-charcoal">${esc(f.distanceKm || '')} · ${esc(f.direction || '')}</dd>
        </div>
      </dl>
      <p class="mt-4 flex-1 text-sm text-muted">${esc(f.reason || '')}</p>
      <a class="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-forest-100 px-4 py-2 text-sm font-semibold text-forest-700 hover:bg-forest-200" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(f.mapsQuery || f.name || '')}" target="_blank" rel="noopener noreferrer">${esc(ui.food?.openInMaps || 'Open in Maps')}</a>
    </article>`).join('');
}

function renderNearby(lang: LanguageCode) {
  const ui = getUI(lang);
  const data = getData(lang);
  const container = document.getElementById('nearby-cards');
  if (!container) return;
  const nearby = data.nearby || [];
  container.innerHTML = nearby.map((n: any) => `
    <article class="flex flex-col rounded-2xl border border-sunset-200 bg-white p-6 shadow-sm">
      <h3 class="font-semibold text-forest-800">${esc(n.name || '')}</h3>
      <p class="mt-1 text-sm text-muted">${esc(n.type || '')}</p>
      <dl class="mt-4 space-y-1 text-sm">
        <div class="flex gap-2">
          <dt class="w-20 flex-none text-muted">${esc(ui.nearby?.distance || 'Distance')}</dt>
          <dd class="text-charcoal">${esc(n.distanceKm || '')}</dd>
        </div>
        <div class="flex gap-2">
          <dt class="w-20 flex-none text-muted">${esc(ui.nearby?.drive || 'Drive')}</dt>
          <dd class="text-charcoal">${esc(n.driveMinutes || '')}</dd>
        </div>
      </dl>
      <p class="mt-4 flex-1 text-sm text-muted">${esc(n.summary || '')}</p>
      <a class="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-sunset-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sunset-600" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(n.mapsQuery || n.name || '')}" target="_blank" rel="noopener noreferrer">${esc(ui.nearby?.getDirections || 'Get directions')}</a>
    </article>`).join('');
}

function renderFAQ(lang: LanguageCode) {
  const data = getData(lang);
  const container = document.getElementById('faq-items');
  if (!container) return;
  container.innerHTML = faqHtml(data);
}

function renderReviews(lang: LanguageCode) {
  const ui = getUI(lang);
  const data = getData(lang);
  const reviews = data.reviews || {};
  const author = ui.reviews?.authorLabel || '';

  const card = (r: any) => `
    <article class="rounded-2xl border border-forest-100 bg-white p-5 shadow-sm">
      <h4 class="font-semibold text-forest-800">${esc(r?.title || '')}</h4>
      <p class="mt-2 text-sm text-muted">${esc(r?.text || '')}</p>
      ${author ? `<p class="mt-3 text-xs text-muted/80">${esc(author)}</p>` : ''}
    </article>`;

  const positive = document.getElementById('reviews-positive');
  if (positive) positive.innerHTML = (reviews.positive || []).map(card).join('');

  const critical = document.getElementById('reviews-critical');
  if (critical) critical.innerHTML = (reviews.critical || []).map(card).join('');
}

function renderHistory(lang: LanguageCode) {
  const data = getData(lang);
  const h = data.history || {};

  const paragraphs = document.getElementById('history-paragraphs');
  if (paragraphs) {
    paragraphs.innerHTML = (h.paragraphs || [])
      .map((p: string) => `<p>${esc(p)}</p>`)
      .join('');
  }

  const milestones = document.getElementById('history-milestones');
  if (milestones) {
    milestones.innerHTML = (h.milestones || [])
      .map(
        (m: any) => `
      <li class="flex flex-col gap-1 rounded-2xl border border-forest-100 bg-white p-5 shadow-sm sm:flex-row sm:gap-5">
        <span class="flex-none font-semibold text-sunset-700 sm:w-24">${esc(m?.year || '')}</span>
        <span class="text-sm text-charcoal">${esc(m?.text || '')}</span>
      </li>`
      )
      .join('');
  }
}

function renderSources(lang: LanguageCode) {
  const data = getData(lang);
  const list = document.getElementById('sources-list');
  if (!list) return;
  const items = data.sources || [];
  list.innerHTML = items
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

function codeInfo(data: any, code: any) {
  const map = data.weatherCodes || {};
  return map[String(code)] || { label: '', icon: '⛅' };
}

function weatherRow(dt: string, dd: string) {
  return `<div><dt class="text-muted">${esc(dt)}</dt><dd class="font-semibold text-charcoal">${esc(dd)}</dd></div>`;
}

function renderWeather(lang: LanguageCode) {
  const ui = getUI(lang);
  const data = getData(lang);
  const w = window.__TPG_WEATHER__;
  if (!w) return;
  const t = ui.weather || {};
  const c = w.current || {};
  const days = w.daily || [];
  const today = days[0] || {};
  const icon0 = codeInfo(data, c.weatherCode);

  const cur = document.getElementById('weather-current');
  if (cur) {
    cur.innerHTML = `
      <div class="rounded-2xl bg-forest-50 p-6 ring-1 ring-forest-100">
        <div class="flex items-center gap-4">
          <span class="text-4xl">${esc(icon0.icon)}</span>
          <div>
            <div class="font-serif text-3xl font-bold text-forest-800">${Math.round(Number(c.temperature ?? 0))}°C</div>
            <div class="text-sm text-muted">${esc(icon0.label)}</div>
          </div>
        </div>
        <dl class="mt-4 grid grid-cols-2 gap-3 text-sm">
          ${weatherRow(t.feelsLike || 'Feels like', `${Math.round(Number(c.apparentTemperature ?? 0))}°C`)}
          ${weatherRow(t.humidity || 'Humidity', `${c.humidity ?? '-'}%`)}
          ${weatherRow(t.wind || 'Wind', `${c.windSpeed ?? '-'} km/h`)}
          ${weatherRow(t.gust || 'Gusts', `${c.windGust ?? '-'} km/h`)}
          ${weatherRow(t.rain || 'Rain', `${c.precipitation ?? 0} mm`)}
          ${weatherRow(t.rainChance || 'Rain chance', `${today.precipitationProbability ?? 0}%`)}
        </dl>
      </div>
      <div class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-forest-100 lg:col-span-2">
        <p class="text-sm font-medium text-charcoal">${esc(weatherSummaryLine(w, t, data.weatherCodes || {}))}</p>
        <p class="mt-2 font-semibold text-forest-800">${esc(
          (Number(today.precipitationProbability ?? 0) >= 60 ? t.umbrellaYes : t.umbrellaNo) || ''
        )}</p>
        <dl class="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
          ${weatherRow(t.sunrise || 'Sunrise', String(today.sunrise || '-'))}
          ${weatherRow(t.sunset || 'Sunset', String(today.sunset || '-'))}
          ${weatherRow(t.uv || 'UV index', String(today.uvIndexMax ?? '-'))}
          ${weatherRow(t.updated || 'Updated', esc(w.updatedAt ? new Date(w.updatedAt).toLocaleString([lang === 'fil' ? 'fil-PH' : 'en-PH']) : '-'))}
        </dl>
        <p class="mt-4 text-sm text-muted">${esc(t.note || '')}</p>
      </div>`;
  }

  const fc = document.getElementById('weather-forecast');
  if (fc) {
    fc.innerHTML = days
      .map((d: any) => {
        const info = codeInfo(data, d.weatherCode);
        return `
      <div class="rounded-2xl border border-forest-100 bg-white p-4 text-center shadow-sm">
        <div class="text-xs font-semibold text-forest-800">${esc(d.weekday || '')}</div>
        <div class="mt-1 text-xs text-muted">${esc(String(d.date || '').slice(5))}</div>
        <div class="mt-2 text-2xl">${esc(info.icon)}</div>
        <div class="mt-2 font-semibold text-charcoal">${Math.round(Number(d.tempMax ?? 0))}° / ${Math.round(Number(d.tempMin ?? 0))}°</div>
        <div class="mt-1 text-xs text-muted">💧 ${d.precipitationProbability ?? 0}%</div>
        <div class="text-xs text-muted">${esc(String(d.precipitation ?? 0))} mm</div>
      </div>`;
      })
      .join('');
  }

  const advice = document.getElementById('weather-advice');
  if (advice) {
    advice.innerHTML = weatherAdviceHtml(w, t, data.weatherAdvice || {});
  }
}

function renderSeasonStrategy(lang: LanguageCode) {
  const ui = getUI(lang);
  const data = getData(lang);
  const container = document.getElementById('season-strategy-rows');
  if (!container) return;
  const rows = data.seasonStrategy || [];
  const t = ui.seasonStrategy || {};
  container.innerHTML = rows
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

  const head = document.getElementById('season-strategy-head');
  if (head) {
    head.innerHTML = `<tr>
      <th scope="col" class="px-4 py-3 text-left">${esc(t.colSeason || '')}</th>
      <th scope="col" class="px-4 py-3 text-left">${esc(t.colWeather || '')}</th>
      <th scope="col" class="px-4 py-3 text-left">${esc(t.colVolcano || '')}</th>
      <th scope="col" class="px-4 py-3 text-left">${esc(t.colNature || '')}</th>
      <th scope="col" class="px-4 py-3 text-left">${esc(t.colAdvice || '')}</th>
    </tr>`;
  }
}

function renderServices(lang: LanguageCode) {
  const ui = getUI(lang);
  const data = getData(lang);
  const container = document.getElementById('services-cards');
  if (!container) return;
  const t = ui.services || {};
  container.innerHTML = (data.services || [])
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

function renderRoutes(lang: LanguageCode) {
  const ui = getUI(lang);
  const data = getData(lang);
  const t = ui.routes || {};

  const audience = document.getElementById('audience-routes');
  if (audience) {
    audience.innerHTML = (data.audienceRoutes || [])
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

  const suggested = document.getElementById('suggested-routes');
  if (suggested) {
    suggested.innerHTML = (data.suggestedRoutes || [])
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
}

function renderScience(lang: LanguageCode) {
  const ui = getUI(lang);
  const data = getData(lang);
  const t = ui.science || {};
  const s = data.science || {};
  const blocks: Array<[string, string, string[]]> = [
    ['science-geology', t.geologyTitle, s.geology],
    ['science-volcano', t.volcanoTitle, s.volcano],
    ['science-ecology', t.ecologyTitle, s.ecology],
    ['science-responsibility', t.responsibilityTitle, s.responsibility],
  ];
  blocks.forEach(([id, title, items]) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = `
      <h3 class="font-semibold text-forest-800">${esc(title || '')}</h3>
      <ul class="mt-3 list-disc space-y-2 pl-5 text-muted">
        ${(items || []).map((i: string) => `<li>${esc(i)}</li>`).join('')}
      </ul>`;
  });
}

function renderLegends(lang: LanguageCode) {
  const ui = getUI(lang);
  const data = getData(lang);
  const container = document.getElementById('legends-list');
  if (!container) return;
  const note = ui.legends?.note || '';
  container.innerHTML = (data.legends || [])
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
  const noteEl = document.getElementById('legends-note');
  if (noteEl) noteEl.textContent = note;
}

function renderTransportGuide(lang: LanguageCode) {
  const ui = getUI(lang);
  const data = getData(lang);
  const t = ui.transportGuide || {};
  const guide = data.transportGuide || {};

  const routesEl = document.getElementById('transport-guide-routes');
  if (routesEl) {
    routesEl.innerHTML = (guide.routes || [])
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

  const tipsEl = document.getElementById('transport-guide-tips');
  if (tipsEl) {
    tipsEl.innerHTML = (guide.tips || [])
      .map((s: string) => `<li>${esc(s)}</li>`)
      .join('');
  }
}

function renderItinerary(lang: LanguageCode) {
  const ui = getUI(lang);
  const data = getData(lang);
  const container = document.getElementById('itinerary-grid');
  if (!container) return;
  const items = data.itinerary || [];
  const mapsQuery = (id: string, maps?: string) => {
    if (maps) return maps;
    const baseMaps: Record<string, string> = {
      'mahogany-bulalo': 'https://www.google.com/maps/search/?api=1&query=Mahogany+Beef+Market+Tagaytay',
      'mushroom-burger': 'https://www.google.com/maps/search/?api=1&query=Mushroomburger+Tagaytay',
      'peoples-park': "https://www.google.com/maps/search/?api=1&query=People%27s+Park+in+the+Sky+Tagaytay",
      'sky-ranch': 'https://www.google.com/maps/search/?api=1&query=Sky+Ranch+Tagaytay',
    };
    return baseMaps[id] || '';
  };
  const catClasses: Record<string, string> = {
    View: 'bg-lake-100 text-lake-800 ring-lake-200',
    Activity: 'bg-forest-100 text-forest-800 ring-forest-200',
    Food: 'bg-sunset-100 text-sunset-800 ring-sunset-200',
    Nearby: 'bg-lake-50 text-lake-900 ring-lake-300',
  };
  const catLabels = ui.itinerary?.categories || { View: 'View', Activity: 'Activity', Food: 'Food', Nearby: 'Nearby' };
  container.innerHTML = items.map((it: any) => {
    const maps = mapsQuery(it.id, it.maps);
    return `
    <label class="group flex cursor-pointer gap-3 rounded-2xl border border-forest-100 bg-white p-5 shadow-sm hover:border-forest-200" data-itin-id="${esc(it.id || '')}">
      <input type="checkbox" class="mt-1 h-5 w-5 flex-none accent-forest-700" data-itin-check="${esc(it.id || '')}" />
      <div class="flex-1">
        <div class="flex items-center gap-2">
          <span class="inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ring-1 ${catClasses[it.category || 'View'] || ''}">${esc(catLabels[it.category || 'View'] || it.category)}</span>
          ${it.duration ? `<span class="text-xs text-muted">${esc(it.duration)}</span>` : ''}
        </div>
        <div class="mt-1 font-semibold text-charcoal">${esc(it.title || '')}</div>
        <p class="mt-1 text-sm text-muted">${esc(it.description || '')}</p>
        ${maps ? `<a class="mt-2 inline-block text-xs font-semibold text-forest-700 hover:text-forest-800 underline" href="${maps}" target="_blank" rel="noopener noreferrer">${esc(ui.food?.openInMaps || 'Open in Maps')} →</a>` : ''}
      </div>
    </label>`;
  }).join('');

  // Re-init itinerary checkboxes
  const loadFn = window.__TPG_ITIN_LOAD__;
  const saveFn = window.__TPG_ITIN_SAVE__;
  const set = loadFn ? loadFn() : new Set<string>();
  document.querySelectorAll<HTMLInputElement>('[data-itin-check]').forEach((cb) => {
    cb.checked = set.has(cb.getAttribute('data-itin-check') || '');
  });
  const countEl = document.getElementById('itin-count');
  if (countEl) countEl.textContent = String(set.size);

  document.addEventListener('change', (e) => {
    const id = (e.target as HTMLElement)?.getAttribute && (e.target as HTMLElement).getAttribute('data-itin-check');
    if (!id) return;
    const checked = (e.target as HTMLInputElement).checked;
    if (checked) set.add(id); else set.delete(id);
    if (saveFn) saveFn(set);
    if (countEl) countEl.textContent = String(set.size);
  });
  const clearBtn = document.getElementById('itin-clear');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      set.clear();
      if (saveFn) saveFn(set);
      document.querySelectorAll<HTMLInputElement>('[data-itin-check]').forEach((cb) => cb.checked = false);
      if (countEl) countEl.textContent = '0';
    });
  }
}

function renderGallery(lang: LanguageCode) {
  const data = getData(lang);
  const files = window.__TPG_GALLERY_FILES__ || [];
  const alts = data.galleryImages?.alt || {};
  const captions = data.galleryImages?.caption || {};
  files.forEach((f, i) => {
    const img = document.querySelector<HTMLImageElement>(`[data-gallery-img="${i}"]`);
    const btn = document.querySelector<HTMLButtonElement>(`[data-gallery-index="${i}"]`);
    const cap = document.querySelector(`[data-gallery-caption="${i}"] span`);
    const alt = alts[f.id] || f.id;
    const caption = captions[f.id] || '';
    if (img) {
      img.alt = alt;
    }
    if (btn) {
      btn.setAttribute('aria-label', `Open photo: ${alt}`);
      const captionData = btn.getAttribute('data-caption') || '';
      if (!captionData) btn.setAttribute('data-caption', caption);
    }
    if (cap) cap.innerHTML = caption;
  });
}

function bindLanguageSwitcher(initial: LanguageCode) {
  const toggle = document.getElementById('lang-toggle');
  const menu = document.getElementById('lang-menu');
  const flag = document.getElementById('lang-flag');
  const label = document.getElementById('lang-label');

  const updateSwitcher = (lang: LanguageCode) => {
    const meta = SUPPORTED_LANGUAGES.find((l) => l.code === lang);
    if (meta && flag) flag.textContent = meta.flag;
    if (meta && label) label.textContent = meta.nativeName;
    document.querySelectorAll('[data-lang-choice]').forEach((btn) => {
      const choice = btn.getAttribute('data-lang-choice');
      if (choice === lang) {
        btn.classList.add('bg-forest-50', 'active-lang');
      } else {
        btn.classList.remove('bg-forest-50', 'active-lang');
      }
    });
  };

  updateSwitcher(initial);

  if (toggle && menu) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('hidden');
    });
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target as Node) && e.target !== toggle) {
        menu.classList.add('hidden');
      }
    });
  }

  document.querySelectorAll<HTMLButtonElement>('[data-lang-choice]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const choice = btn.getAttribute('data-lang-choice');
      if (choice && (choice === 'en' || choice === 'fil')) {
        setLanguage(choice);
        updateSwitcher(choice);
        renderAll(choice);
        menu?.classList.add('hidden');
      }
    });
  });
}

function renderAll(lang: LanguageCode) {
  renderFeatureCards(lang);
  renderQuickInfo(lang);
  renderFeesCards(lang);
  renderActivitiesTable(lang);
  renderPaymentTips(lang);
  renderParking(lang);
  renderBestTime(lang);
  renderTransport(lang);
  renderFood(lang);
  renderNearby(lang);
  renderFAQ(lang);
  renderReviews(lang);
  renderHistory(lang);
  renderSources(lang);
  renderWeather(lang);
  renderSeasonStrategy(lang);
  renderTransportGuide(lang);
  renderServices(lang);
  renderRoutes(lang);
  renderScience(lang);
  renderLegends(lang);
  renderItinerary(lang);
  renderGallery(lang);
}

document.addEventListener('DOMContentLoaded', () => {
  const initial = getInitialLanguage();
  applyLanguage(initial);
  bindLanguageSwitcher(initial);
  renderAll(initial);

  window.__TPG_RENDER_WEATHER__ = () => {
    renderWeather(getStoredLanguage() || DEFAULT_LANGUAGE);
  };
});
