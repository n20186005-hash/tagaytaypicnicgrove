import {
  setLanguage,
  applyLanguage,
  getInitialLanguage,
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
  }
}

function getData(lang: LanguageCode) {
  return window.__TRANSLATIONS__?.[lang]?.data || {};
}

function getUI(lang: LanguageCode) {
  return window.__TRANSLATIONS__?.[lang]?.ui || {};
}

function esc(s: string): string {
  const div = document.createElement('div');
  div.textContent = s;
  return div.innerHTML;
}

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
  const attraction = data.attraction || {};
  const fees = data.fees || {};
  const items = [
    { dt: ui.overview?.quickInfo?.address || 'Address', dd: `${attraction.address?.streetAddress || ''}, ${attraction.address?.addressLocality || ''}, ${attraction.address?.addressRegion || ''} 4120` },
    { dt: ui.overview?.quickInfo?.hours || 'Hours', dd: `${attraction.openingHours?.weekday || ''} · 07:00–20:00` },
    { dt: ui.overview?.quickInfo?.entrance || 'Entrance', dd: `${fees.entrance?.label || ''}: PHP 50 – 75` },
    { dt: ui.overview?.quickInfo?.coordinates || 'Coordinates', dd: '14.1247161, 120.9977949' },
    { dt: ui.overview?.quickInfo?.operator || 'Operator', dd: 'Tagaytay City Government · Tagaytay City Tourism' },
  ];
  container.innerHTML = items.map((i) => `
    <div>
      <dt class="text-muted">${esc(i.dt)}</dt>
      <dd class="mt-0.5 font-medium text-charcoal">${esc(i.dd)}</dd>
    </div>`).join('');
}

function renderFeesCards(lang: LanguageCode) {
  const data = getData(lang);
  const container = document.getElementById('fees-cards');
  if (!container) return;
  const entrance = data.fees?.entrance || { label: '', note: '' };
  const cottages = data.fees?.cottages || { label: '', note: '' };
  container.innerHTML = `
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

function renderActivitiesTable(lang: LanguageCode) {
  const data = getData(lang);
  const tbody = document.getElementById('activities-table');
  if (!tbody) return;
  const acts = data.fees?.activities || [];
  const ranges = ['PHP 200 – 300', lang === 'fil' ? 'Nag-iiba' : 'Varies', 'PHP 150 – 250', lang === 'fil' ? 'Kasama' : 'Included'];
  tbody.innerHTML = acts.map((a: any, i: number) => `
    <tr class="${i % 2 ? 'bg-forest-50/40 border-t border-forest-100' : 'border-t border-forest-100'}">
      <td class="px-5 py-4 font-medium text-charcoal">${esc(a.label || '')}</td>
      <td class="px-5 py-4 font-semibold text-sunset-700">${esc(ranges[i] || '')}</td>
      <td class="px-5 py-4 text-muted">${esc(a.note || '')}</td>
    </tr>`).join('');
}

function renderPaymentTips(lang: LanguageCode) {
  const data = getData(lang);
  const container = document.getElementById('payment-tips');
  if (!container) return;
  const payment = data.fees?.payment || { label: '', bullets: [] };
  container.innerHTML = `
    <h3 class="font-semibold text-lake-900">${esc(payment.label || '')}</h3>
    <ul class="mt-3 list-inside list-disc space-y-1.5 text-sm text-lake-900/90">
      ${(payment.bullets || []).map((b: string) => `<li>${esc(b)}</li>`).join('')}
    </ul>`;
}

function renderParking(lang: LanguageCode) {
  const data = getData(lang);
  const headline = document.getElementById('parking-headline');
  const bullets = document.getElementById('parking-bullets');
  const parking = data.transport?.parking || { headline: '', bullets: [] };
  if (headline) headline.textContent = parking.headline || '';
  if (bullets) {
    bullets.innerHTML = (parking.bullets || []).map((b: string) => `
      <li class="flex gap-3 rounded-2xl border border-forest-100 bg-white p-5 shadow-sm">
        <span class="mt-1 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-forest-100 text-sm font-bold text-forest-700">✓</span>
        <span class="text-sm text-charcoal">${esc(b)}</span>
      </li>`).join('');
  }
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
  const faq = data.faq || [];
  container.innerHTML = faq.map((f: any) => `
    <details class="group rounded-2xl border border-forest-100 bg-white p-5 shadow-sm open:border-sunset-200 open:bg-sunset-50/40">
      <summary class="flex items-start justify-between gap-4">
        <span class="font-semibold text-charcoal">${esc(f.question || '')}</span>
        <span class="flex-none flex h-7 w-7 items-center justify-center rounded-full bg-forest-100 text-lg font-bold text-forest-700 transition group-open:rotate-45 group-open:bg-sunset-100 group-open:text-sunset-700">+</span>
      </summary>
      <p class="mt-3 text-sm leading-relaxed text-muted">${esc(f.answer || '')}</p>
    </details>`).join('');
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
  renderItinerary(lang);
  renderGallery(lang);
}

document.addEventListener('DOMContentLoaded', () => {
  const initial = getInitialLanguage();
  applyLanguage(initial);
  bindLanguageSwitcher(initial);
  renderAll(initial);
});
