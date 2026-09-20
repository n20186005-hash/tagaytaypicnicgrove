import { weatherAdviceHtml, weatherSummaryLine } from './weather-advice-view';
import {
  activitiesRowsHtml,
  audienceRoutesHtml,
  bestTimeAvoidHtml,
  bestTimeHeadline,
  bestTimeHourlyHtml,
  bestTimeSeasonHtml,
  bestTimeStayHtml,
  bestTimeWeekdayHtml,
  esc,
  faqHtml,
  featureCardsHtml,
  feesCardsHtml,
  foodCardsHtml,
  historyMilestonesHtml,
  historyParagraphsHtml,
  itineraryHtml,
  legendsHtml,
  legendsNote,
  nearbyCardsHtml,
  parkingBulletsHtml,
  parkingHeadline,
  paymentTipsHtml,
  quickInfoHtml,
  reviewsCriticalHtml,
  reviewsPositiveHtml,
  seasonStrategyHeadHtml,
  seasonStrategyRowsHtml,
  servicesCardsHtml,
  sourcesHtml,
  suggestedRoutesHtml,
  transportCardsHtml,
  transportGuideRoutesHtml,
  transportGuideTipsHtml,
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
  container.innerHTML = featureCardsHtml(ui);
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
  const set = (id: string, html: string) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  };
  const headline = document.getElementById('besttime-headline');
  if (headline) headline.textContent = bestTimeHeadline(data);
  set('besttime-season', bestTimeSeasonHtml(data));
  set('besttime-weekday', bestTimeWeekdayHtml(data));
  set('besttime-stay', bestTimeStayHtml(data));
  set('besttime-hourly', bestTimeHourlyHtml(data));
  set('besttime-avoid', bestTimeAvoidHtml(data));
}

function renderTransport(lang: LanguageCode) {
  const ui = getUI(lang);
  const data = getData(lang);
  const container = document.getElementById('transport-cards');
  if (!container) return;
  container.innerHTML = transportCardsHtml(ui, data);
}

function renderFood(lang: LanguageCode) {
  const ui = getUI(lang);
  const data = getData(lang);
  const container = document.getElementById('food-cards');
  if (!container) return;
  container.innerHTML = foodCardsHtml(ui, data);
}

function renderNearby(lang: LanguageCode) {
  const ui = getUI(lang);
  const data = getData(lang);
  const container = document.getElementById('nearby-cards');
  if (!container) return;
  container.innerHTML = nearbyCardsHtml(ui, data);
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
  const positive = document.getElementById('reviews-positive');
  if (positive) positive.innerHTML = reviewsPositiveHtml(ui, data);
  const critical = document.getElementById('reviews-critical');
  if (critical) critical.innerHTML = reviewsCriticalHtml(ui, data);
}

function renderHistory(lang: LanguageCode) {
  const data = getData(lang);
  const paragraphs = document.getElementById('history-paragraphs');
  if (paragraphs) paragraphs.innerHTML = historyParagraphsHtml(data);
  const milestones = document.getElementById('history-milestones');
  if (milestones) milestones.innerHTML = historyMilestonesHtml(data);
}

function renderSources(lang: LanguageCode) {
  const data = getData(lang);
  const list = document.getElementById('sources-list');
  if (!list) return;
  list.innerHTML = sourcesHtml(data);
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
  if (container) container.innerHTML = seasonStrategyRowsHtml(data);
  const head = document.getElementById('season-strategy-head');
  if (head) head.innerHTML = seasonStrategyHeadHtml(ui);
}

function renderServices(lang: LanguageCode) {
  const ui = getUI(lang);
  const data = getData(lang);
  const container = document.getElementById('services-cards');
  if (!container) return;
  container.innerHTML = servicesCardsHtml(ui, data);
}

function renderRoutes(lang: LanguageCode) {
  const ui = getUI(lang);
  const data = getData(lang);
  const audience = document.getElementById('audience-routes');
  if (audience) audience.innerHTML = audienceRoutesHtml(ui, data);
  const suggested = document.getElementById('suggested-routes');
  if (suggested) suggested.innerHTML = suggestedRoutesHtml(ui, data);
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
  if (container) container.innerHTML = legendsHtml(data);
  const noteEl = document.getElementById('legends-note');
  if (noteEl) noteEl.textContent = legendsNote(ui);
}

function renderTransportGuide(lang: LanguageCode) {
  const ui = getUI(lang);
  const data = getData(lang);
  const routesEl = document.getElementById('transport-guide-routes');
  if (routesEl) routesEl.innerHTML = transportGuideRoutesHtml(ui, data);
  const tipsEl = document.getElementById('transport-guide-tips');
  if (tipsEl) tipsEl.innerHTML = transportGuideTipsHtml(data);
}

function renderItinerary(lang: LanguageCode) {
  const ui = getUI(lang);
  const data = getData(lang);
  const container = document.getElementById('itinerary-grid');
  if (!container) return;
  container.innerHTML = itineraryHtml(ui, data);

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
