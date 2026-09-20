import { beaufort, buildWeatherAdvice, type WeatherAdvice } from '../data/weather-advice';

/**
 * 天气建议卡片的 HTML 生成器（服务端渲染与客户端切换语言共用同一份标记）。
 * 文案全部来自 i18n：t 为 ui.weather，dict 为 data.weatherAdvice。
 */

const ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

function esc(value: unknown): string {
  return String(value ?? '').replace(/[&<>"']/g, (ch) => ESCAPES[ch]);
}

export interface WeatherCodeCopy {
  label?: string;
  icon?: string;
}

/** 今日一句话概览，例如：Partly cloudy · 19–27 °C · UV index 9 (very strong sun) · Wind force 4 of 12 */
export function weatherSummaryLine(
  snap: any,
  t: any = {},
  codes: Record<string, WeatherCodeCopy> = {}
): string {
  const c = snap?.current || {};
  const today: any = snap?.daily?.[0] || {};
  const code = String(c.weatherCode ?? today.weatherCode ?? 2);
  const label = codes[code]?.label || codes['2']?.label || '';
  const min = Math.round(Number(today.tempMin ?? c.temperature ?? 0));
  const max = Math.round(Number(today.tempMax ?? c.temperature ?? 0));
  const uv = Number(today.uvIndexMax ?? 0);
  const uvWord = uv >= 8 ? t?.uvHigh : uv >= 5 ? t?.uvModerate : t?.uvLow;
  const windLevel = beaufort(Number(c.windSpeed ?? 0));
  const gustLevel = beaufort(Number(c.windGust ?? 0));
  const unit = t?.levelUnit || '';
  const wind = `${t?.windLevelLabel || 'Wind'} ${windLevel}${unit ? ` ${unit}` : ''}${
    gustLevel > windLevel ? ` · ${t?.gustShort || 'gusts'} ${gustLevel}` : ''
  }`;
  return [label, `${min}–${max} °C`, uv ? `${t?.uv || 'UV'} ${Math.round(uv)}${uvWord ? ` (${uvWord})` : ''}` : '', wind]
    .filter(Boolean)
    .join(' · ');
}

export function weatherAdviceHtml(snap: any, t: any = {}, dict: Record<string, string> = {}): string {
  if (!snap) return '';
  const a: WeatherAdvice = buildWeatherAdvice(snap);
  const txt = (k: string) => dict[k] || '';
  const label = (k: string, fallback: string) => esc(t?.[k] || fallback);

  const list = (keys: string[]) =>
    keys
      .map((k) => txt(k))
      .filter(Boolean)
      .map((s) => `<li class="flex gap-2"><span class="text-forest-500">•</span><span>${esc(s)}</span></li>`)
      .join('');

  const block = (icon: string, title: string, keys: string[], ring: string) => {
    if (!keys.length) return '';
    return `
      <div class="rounded-2xl bg-white p-5 shadow-sm ring-1 ${ring}">
        <h4 class="flex items-center gap-2 font-semibold text-forest-800"><span aria-hidden="true">${icon}</span>${esc(title)}</h4>
        <ul class="mt-3 space-y-2 text-sm text-charcoal/90">${list(keys)}</ul>
      </div>`;
  };

  const alertBlock = a.alerts.length
    ? `
      <div class="rounded-2xl border border-red-300 bg-red-50 p-5">
        <h4 class="flex items-center gap-2 font-semibold text-red-800"><span aria-hidden="true">⚠️</span>${label('alertsTitle', 'Safety alerts')}</h4>
        <ul class="mt-3 space-y-2 text-sm text-red-900/90">${list(a.alerts)}</ul>
      </div>`
    : `
      <div class="rounded-2xl border border-forest-200 bg-forest-50/60 p-5">
        <p class="flex items-center gap-2 text-sm font-medium text-forest-800"><span aria-hidden="true">✅</span>${label('noAlerts', 'No weather warnings in effect right now')}</p>
      </div>`;

  const visibilityText =
    a.ridge.visibility === 'poor'
      ? label('visibilityPoor', 'Poor')
      : a.ridge.visibility === 'fair'
        ? label('visibilityFair', 'Fair')
        : label('visibilityGood', 'Good');

  const windValue =
    a.ridge.gustLevel > a.ridge.windLevel
      ? `${a.ridge.windLevel} ${label('levelUnit', 'level')} · ${label('gustShort', 'gusts')} ${a.ridge.gustLevel}`
      : `${a.ridge.windLevel} ${label('levelUnit', 'level')}`;

  const ridgeRows = [
    { k: label('windLevelLabel', 'Wind force'), v: windValue },
    { k: label('visibilityLabel', 'Viewing visibility'), v: visibilityText },
    { k: label('elevationLabel', 'Ridge elevation'), v: label('elevationValue', '640 m · 3–5 °C cooler than Manila') },
    {
      k: label('trailLabel', 'Trail surface'),
      v: a.ridge.wetTrail ? label('trailWet', 'Wet / slippery') : label('trailDry', 'Dry'),
    },
  ]
    .map(
      (r) =>
        `<div class="flex items-baseline justify-between gap-3 border-t border-forest-100 pt-2 first:border-0 first:pt-0"><dt class="text-muted">${r.k}</dt><dd class="font-semibold text-charcoal">${esc(r.v)}</dd></div>`
    )
    .join('');

  return `
    <div class="mt-8">
      <h3 class="font-semibold text-forest-800">${label('adviceTitle', 'What this means for your visit')}</h3>
      <div class="mt-4 space-y-4">
        ${alertBlock}
        <div class="grid gap-4 lg:grid-cols-3">
          ${block('👕', label('outfitTitle', 'What to wear'), a.outfit, 'ring-forest-100')}
          ${block('🗺️', label('planTitle', 'How to plan the day'), a.plan, 'ring-lake-200')}
          ${block('🎒', label('packingTitle', 'What to pack'), a.packing, 'ring-sunset-200')}
        </div>
        <div class="rounded-2xl bg-forest-50 p-5 ring-1 ring-forest-100">
          <h4 class="flex items-center gap-2 font-semibold text-forest-800"><span aria-hidden="true">⛰️</span>${label('ridgeTitle', 'Ridge conditions')}</h4>
          <dl class="mt-3 space-y-2 text-sm">${ridgeRows}</dl>
        </div>
      </div>
    </div>`;
}
