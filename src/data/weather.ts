import { normalsForMonth } from './climate';

/**
 * 天气数据获取（服务端执行，构建期拉取 + 进程内缓存）
 * 说明：本模块在 Astro 的服务端渲染阶段运行（astro build 期间），
 * 结果写入静态 HTML；页面加载后由客户端脚本再做一次增量刷新。
 */

export interface WeatherCurrent {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  windSpeed: number;
  windGust: number;
  precipitation: number;
  weatherCode: number;
  isDay: boolean;
  time: string;
}

export interface WeatherDay {
  date: string;
  weekday: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  precipitation: number;
  precipitationProbability: number;
  uvIndexMax: number;
  sunrise: string;
  sunset: string;
}

export interface WeatherSnapshot {
  current: WeatherCurrent;
  daily: WeatherDay[];
  updatedAt: string;
  /** live = 接口返回；climatology = 接口不可用，使用常年值回退 */
  source: 'live' | 'climatology';
}

const ENDPOINT = 'https://api.open-meteo.com/v1/forecast';
const LATITUDE = 14.1247161;
const LONGITUDE = 120.9977949;
const TIMEZONE = 'Asia%2FManila';
const FORECAST_DAYS = 7;

const CURRENT_FIELDS = [
  'temperature_2m',
  'relative_humidity_2m',
  'apparent_temperature',
  'precipitation',
  'weather_code',
  'wind_speed_10m',
  'wind_gusts_10m',
  'is_day',
].join(',');

const DAILY_FIELDS = [
  'weather_code',
  'temperature_2m_max',
  'temperature_2m_min',
  'precipitation_sum',
  'precipitation_probability_max',
  'uv_index_max',
  'sunrise',
  'sunset',
].join(',');

export function weatherApiUrl(): string {
  return `${ENDPOINT}?latitude=${LATITUDE}&longitude=${LONGITUDE}`
    + `&current=${CURRENT_FIELDS}&daily=${DAILY_FIELDS}`
    + `&timezone=${TIMEZONE}&forecast_days=${FORECAST_DAYS}`;
}

const CACHE_TTL_MS = 15 * 60 * 1000;
let cache: { at: number; value: WeatherSnapshot } | null = null;

function weekdayFor(dateIso: string, timezone = 'Asia/Manila'): string {
  try {
    return new Intl.DateTimeFormat('en-PH', { weekday: 'short', timeZone: timezone }).format(
      new Date(`${dateIso}T12:00:00+08:00`)
    );
  } catch {
    return dateIso;
  }
}

function hhmm(iso?: string): string {
  if (!iso) return '';
  const m = /T(\d{2}):(\d{2})/.exec(iso);
  return m ? `${m[1]}:${m[2]}` : '';
}

function fallbackSnapshot(): WeatherSnapshot {
  const now = new Date();
  const month = now.getUTCMonth() + 1;
  const normal = normalsForMonth(month);
  const today = new Date(Date.now() + 8 * 3600 * 1000);
  const isoDate = today.toISOString().slice(0, 10);
  const mid = Math.round((normal.highC + normal.lowC) / 2);
  return {
    source: 'climatology',
    updatedAt: new Date().toISOString(),
    current: {
      temperature: mid,
      apparentTemperature: mid,
      humidity: 78,
      windSpeed: 12,
      windGust: 22,
      precipitation: 0,
      weatherCode: normal.rainDays > 15 ? 3 : 2,
      isDay: true,
      time: new Date().toISOString(),
    },
    daily: Array.from({ length: FORECAST_DAYS }, (_, i) => {
      const d = new Date(Date.now() + (i + 0) * 86400000 + 8 * 3600 * 1000);
      const n = normalsForMonth(d.getUTCMonth() + 1);
      return {
        date: d.toISOString().slice(0, 10),
        weekday: weekdayFor(d.toISOString().slice(0, 10)),
        weatherCode: n.rainDays > 15 ? 61 : 2,
        tempMax: n.highC,
        tempMin: n.lowC,
        precipitation: Number((n.rainMm / 30).toFixed(1)),
        precipitationProbability: Math.min(95, Math.round(n.rainDays * 100 / 30)),
        uvIndexMax: n.rainDays > 15 ? 5 : 9,
        sunrise: '06:00',
        sunset: '18:00',
      };
    }).map((d, i) => (i === 0 ? { ...d, date: isoDate } : d)),
  };
}

export function normalizeWeather(raw: any): WeatherSnapshot {
  const c = raw?.current || {};
  const d = raw?.daily || {};
  const days: WeatherDay[] = (d.time || []).map((date: string, i: number) => ({
    date,
    weekday: weekdayFor(date),
    weatherCode: Number(d.weather_code?.[i] ?? 2),
    tempMax: Math.round(Number(d.temperature_2m_max?.[i] ?? 0)),
    tempMin: Math.round(Number(d.temperature_2m_min?.[i] ?? 0)),
    precipitation: Number(d.precipitation_sum?.[i] ?? 0),
    precipitationProbability: Number(d.precipitation_probability_max?.[i] ?? 0),
    uvIndexMax: Number(d.uv_index_max?.[i] ?? 0),
    sunrise: hhmm(d.sunrise?.[i]),
    sunset: hhmm(d.sunset?.[i]),
  }));

  return {
    source: 'live',
    updatedAt: new Date().toISOString(),
    current: {
      temperature: Math.round(Number(c.temperature_2m ?? 0)),
      apparentTemperature: Math.round(Number(c.apparent_temperature ?? c.temperature_2m ?? 0)),
      humidity: Number(c.relative_humidity_2m ?? 0),
      windSpeed: Math.round(Number(c.wind_speed_10m ?? 0)),
      windGust: Math.round(Number(c.wind_gusts_10m ?? 0)),
      precipitation: Number(c.precipitation ?? 0),
      weatherCode: Number(c.weather_code ?? 2),
      isDay: Number(c.is_day ?? 1) === 1,
      time: c.time || '',
    },
    daily: days,
  };
}

export async function getWeatherSnapshot(): Promise<WeatherSnapshot> {
  if (cache && Date.now() - cache.at < CACHE_TTL_MS) return cache.value;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(weatherApiUrl(), { signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`weather status ${res.status}`);
    const snap = normalizeWeather(await res.json());
    cache = { at: Date.now(), value: snap };
    return snap;
  } catch {
    const snap = fallbackSnapshot();
    cache = { at: Date.now(), value: snap };
    return snap;
  }
}
