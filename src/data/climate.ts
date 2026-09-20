/**
 * Tagaytay 长期气候常年值（参考 PAGASA 1991–2020 观测统计，取近似值）
 * 用途：
 *  1. 实时接口不可用时的回退展示；
 *  2. 「季度游览策略」表的气候背景数据。
 */
export interface ClimateNormal {
  month: number;
  label: string;
  highC: number;
  lowC: number;
  rainMm: number;
  rainDays: number;
}

export const climateNormals: ClimateNormal[] = [
  { month: 1, label: 'Jan', highC: 26, lowC: 17, rainMm: 51, rainDays: 6 },
  { month: 2, label: 'Feb', highC: 27, lowC: 17, rainMm: 34, rainDays: 4 },
  { month: 3, label: 'Mar', highC: 29, lowC: 18, rainMm: 38, rainDays: 4 },
  { month: 4, label: 'Apr', highC: 30, lowC: 20, rainMm: 58, rainDays: 6 },
  { month: 5, label: 'May', highC: 29, lowC: 20, rainMm: 173, rainDays: 13 },
  { month: 6, label: 'Jun', highC: 28, lowC: 20, rainMm: 253, rainDays: 18 },
  { month: 7, label: 'Jul', highC: 27, lowC: 19, rainMm: 302, rainDays: 21 },
  { month: 8, label: 'Aug', highC: 26, lowC: 19, rainMm: 287, rainDays: 21 },
  { month: 9, label: 'Sep', highC: 27, lowC: 19, rainMm: 271, rainDays: 19 },
  { month: 10, label: 'Oct', highC: 26, lowC: 19, rainMm: 209, rainDays: 16 },
  { month: 11, label: 'Nov', highC: 26, lowC: 18, rainMm: 122, rainDays: 11 },
  { month: 12, label: 'Dec', highC: 25, lowC: 18, rainMm: 74, rainDays: 8 },
];

export function normalsForMonth(month: number): ClimateNormal {
  const idx = ((month - 1) % 12 + 12) % 12;
  return climateNormals[idx] || climateNormals[0];
}
