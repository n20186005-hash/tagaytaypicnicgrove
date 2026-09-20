import type { WeatherSnapshot } from './weather';

/**
 * 天气 → 可执行建议的判定引擎（纯函数，服务端与客户端共用）
 * 输入：Open-Meteo 归一化后的天气快照
 * 输出：四个文案桶（风险提醒 / 出行穿搭 / 游玩安排 / 随身物品）+ 山脊专属状态
 * 每个桶里的元素是 i18n 文案键，只有满足条件的键才会出现，未命中的条目不渲染。
 */

export type AdviceTone = 'calm' | 'watch' | 'alert';
export type Visibility = 'good' | 'fair' | 'poor';

export interface RidgeState {
  /** 蒲福风级（按持续风速） */
  windLevel: number;
  /** 蒲福风级（按阵风） */
  gustLevel: number;
  visibility: Visibility;
  /** 步道湿滑 */
  wetTrail: boolean;
}

export interface WeatherAdvice {
  umbrella: boolean;
  tone: AdviceTone;
  alerts: string[];
  outfit: string[];
  plan: string[];
  packing: string[];
  ridge: RidgeState;
}

const THUNDER = new Set([95, 96, 99]);
const LIGHT_RAIN = new Set([51, 53, 61, 80]);
const HEAVY_RAIN = new Set([55, 63, 65, 81, 82]);
const FOG = new Set([45, 48]);

/** km/h → 蒲福风级（游客看得懂的“几级风”） */
export function beaufort(kmh: number): number {
  const v = Math.max(0, Number(kmh) || 0);
  if (v < 1) return 0;
  if (v <= 5) return 1;
  if (v <= 11) return 2;
  if (v <= 19) return 3;
  if (v <= 28) return 4;
  if (v <= 38) return 5;
  if (v <= 49) return 6;
  if (v <= 61) return 7;
  if (v <= 74) return 8;
  if (v <= 88) return 9;
  if (v <= 102) return 10;
  if (v <= 117) return 11;
  return 12;
}

function uniq(list: string[]): string[] {
  return Array.from(new Set(list.filter(Boolean)));
}

export function buildWeatherAdvice(snap: WeatherSnapshot): WeatherAdvice {
  const c = snap?.current || ({} as WeatherSnapshot['current']);
  const today: any = snap?.daily?.[0] || {};

  const code = Number(c.weatherCode ?? 2);
  const dayCode = Number(today.weatherCode ?? code);
  const prob = Number(today.precipitationProbability ?? 0);
  const precipNow = Number(c.precipitation ?? 0);
  const precipDay = Number(today.precipitation ?? 0);
  const tempMax = Number(today.tempMax ?? c.temperature ?? 0);
  const tempMin = Number(today.tempMin ?? c.temperature ?? 0);
  const uv = Number(today.uvIndexMax ?? 0);
  const windLevel = beaufort(Number(c.windSpeed ?? 0));
  const gustLevel = beaufort(Number(c.windGust ?? 0));

  const alerts: string[] = [];
  const outfit: string[] = [];
  const plan: string[] = [];
  const packing: string[] = [];

  const thunder = THUNDER.has(code) || THUNDER.has(dayCode);
  const heavy =
    precipNow >= 2.5 || HEAVY_RAIN.has(code) || HEAVY_RAIN.has(dayCode) || precipDay >= 10;
  const light =
    !heavy && (precipNow > 0 || LIGHT_RAIN.has(code) || LIGHT_RAIN.has(dayCode));
  const foggy = FOG.has(code) || FOG.has(dayCode);

  // 1) 气象预警：优先级最高
  if (thunder) {
    alerts.push('thunder.alert');
    plan.push('thunder.plan');
  }
  if (heavy) {
    alerts.push('rain.heavy.alert');
    plan.push('rain.heavy.plan');
  }
  if (windLevel >= 7 || gustLevel >= 8) {
    alerts.push('wind.high.alert');
    plan.push('wind.high.plan');
  }
  if (foggy) {
    alerts.push('fog.alert');
    plan.push('fog.plan');
    packing.push('fog.packing');
  }

  // 2) 降水概率（概率≠一定下雨，只提示带伞，不下“一定会下雨”的结论）
  if (prob >= 60) plan.push('rain.prob60.plan');
  if (light) plan.push('rain.light.plan');

  // 雨具只给一条最合适的，避免重复堆叠
  const shell = heavy
    ? 'rain.heavy.packing'
    : thunder
      ? 'thunder.packing'
      : prob >= 60
        ? 'rain.prob60.packing'
        : light
          ? 'rain.light.packing'
          : '';
  if (shell) {
    packing.push(shell);
    outfit.push('rain.outfit');
  }

  // 3) 高温与紫外线
  if (tempMax >= 32) {
    outfit.push('heat.outfit');
    plan.push('heat.plan');
    packing.push('heat.packing');
  }
  if (uv >= 8) {
    outfit.push('uv.strong.outfit');
    plan.push('uv.strong.plan');
    packing.push('uv.packing');
  } else if (uv >= 5) {
    outfit.push('uv.outfit');
    packing.push('uv.packing');
  }

  // 4) 温差与低温（山脊比马尼拉低 3–5 °C）
  if (tempMax - tempMin > 8) outfit.push('range.outfit');
  if (tempMax <= 24) {
    outfit.push('cool.outfit');
    packing.push('cool.packing');
  }
  if (tempMax <= 10) {
    outfit.push('cold.outfit');
    packing.push('cold.packing');
  }

  // 5) 风力（山脊阵风会明显强于山下）
  if (windLevel >= 5 && windLevel < 7) {
    outfit.push('wind.mid.outfit');
    plan.push('wind.mid.plan');
    packing.push('wind.mid.packing');
  }
  if (windLevel >= 5 && (heavy || light || prob >= 60)) {
    outfit.push('rain.wind.outfit');
  }

  // 6) 天空状况
  if (code === 0 || code === 1) {
    plan.push('clear.plan');
    packing.push('clear.packing');
  } else if (code === 2 || code === 3) {
    plan.push('cloudy.plan');
  }

  // 7) 山脊场景：雨后步道湿滑、台风季提示
  if (precipDay >= 5 || precipNow > 0) plan.push('trail.wet.plan');
  const month = Number(String(today.date || '').slice(5, 7) || 0);
  if (month >= 6 && month <= 11) plan.push('season.typhoon.plan');

  let visibility: Visibility = 'good';
  if (foggy || precipNow >= 2.5) visibility = 'poor';
  else if (code === 3 || precipNow > 0 || prob >= 70) visibility = 'fair';

  const umbrella = prob >= 60 || precipNow > 0 || heavy;
  const hasAlert = alerts.length > 0;

  return {
    umbrella,
    tone: hasAlert ? 'alert' : plan.length > 1 ? 'watch' : 'calm',
    alerts: uniq(alerts),
    // 有预警时弱化普通建议，只保留最关键的几条
    outfit: uniq(outfit).slice(0, hasAlert ? 2 : 3),
    plan: uniq(plan).slice(0, hasAlert ? 3 : 4),
    packing: uniq(packing).slice(0, hasAlert ? 3 : 4),
    ridge: {
      windLevel,
      gustLevel,
      visibility,
      wetTrail: precipDay >= 5 || precipNow > 0,
    },
  };
}
