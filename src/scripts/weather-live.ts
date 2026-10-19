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
    if (!res.ok) throw new Error('Forecast unavailable');
    const snap = normalizeWeather(await res.json());
    const observed = Date.parse(snap.current.time + '+08:00');
    if (!Number.isFinite(observed) || Math.abs(Date.now() - observed) > 6 * 60 * 60 * 1000) throw new Error('Stale forecast');
    if (snap?.daily?.length) {
      const status = document.getElementById('weather-status');
      if (status) status.hidden = true;
      window.__TPG_WEATHER__ = snap;
      window.__TPG_RENDER_WEATHER__?.();
    }
  } catch {
    const status = document.getElementById('weather-status');
    if (status) { status.hidden = false; status.textContent = 'The latest forecast is unavailable. Check PAGASA before travel.'; }
    const previous = window.__TPG_WEATHER__?.current?.time;
    if (!previous || Date.now() - Date.parse(previous + '+08:00') > 6 * 60 * 60 * 1000) {
      window.__TPG_WEATHER__ = undefined;
      for (const id of ['weather-current', 'weather-advice', 'weather-forecast']) document.getElementById(id)?.replaceChildren();
    }
  }
}

function startWeather() {
  void refresh();
  setInterval(() => void refresh(), REFRESH_MS);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', startWeather, { once: true });
else startWeather();
