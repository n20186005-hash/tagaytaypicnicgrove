import type { LanguageCode } from './types';
import type { FullTranslations } from './schema';
import { en } from './locales/en';
import { fil } from './locales/fil';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from './types';

const translations: Record<LanguageCode, FullTranslations> = {
  en,
  fil,
};

export function getTranslations(lang: LanguageCode): FullTranslations {
  return translations[lang] || translations[DEFAULT_LANGUAGE];
}

export function isSupportedLanguage(code: string): code is LanguageCode {
  return SUPPORTED_LANGUAGES.some((l) => l.code === code);
}

export function detectLanguage(
  acceptLanguageHeader?: string,
  queryParam?: string,
  storedPref?: string
): LanguageCode {
  if (storedPref && isSupportedLanguage(storedPref)) return storedPref;
  if (queryParam && isSupportedLanguage(queryParam)) return queryParam;
  if (acceptLanguageHeader) {
    const primary = acceptLanguageHeader.split(',')[0]?.split('-')[0]?.toLowerCase();
    if (primary === 'fil' || primary === 'tl') return 'fil';
    if (primary === 'en') return 'en';
  }
  return DEFAULT_LANGUAGE;
}

export { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE };
export type { LanguageCode, Language } from './types';
export type { UITranslations, DataTranslations, FullTranslations } from './schema';
