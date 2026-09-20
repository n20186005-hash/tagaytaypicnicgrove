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

export function activitiesRowsHtml(data: any, lang = 'en'): string {
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
