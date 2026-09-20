import { normalizeWeather } from '../data/weather';

declare global {
  interface Window {
    __TPG_WEATHER_URL__?: string;
    __TPG_RENDER_WEATHER__?: () => void;
  }
}

const REFRESH_MS = 30 * 60 * 1000;

async function refresh() {
  const url = window.__TPG_WEATHER_URL__;
  if (!url) return;
  try {
    const res = await fetch(url);
    if (!res.ok) return;
    const snap = normalizeWeather(await res.json());
    if (snap?.daily?.length) {
      window.__TPG_WEATHER__ = snap;
      window.__TPG_RENDER_WEATHER__?.();
    }
  } catch {
    /* keep the values already rendered on the page */
  }
}

window.addEventListener('load', () => {
  void refresh();
  setInterval(() => void refresh(), REFRESH_MS);
});
