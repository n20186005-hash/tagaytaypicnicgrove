export type LanguageCode = 'en' | 'fil';

export interface SupportedLanguage {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  locale: string;
}

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', locale: 'en_PH' },
  { code: 'fil', name: 'Filipino', nativeName: 'Tagalog', flag: '🇵🇭', locale: 'fil_PH' },
];

export const DEFAULT_LANGUAGE: LanguageCode = 'en';
const STORAGE_KEY = 'tpg_language_v1';

declare global {
  interface Window {
    __TRANSLATIONS__?: Record<LanguageCode, any>;
    __TPG_HERO_URL__?: string;
  }
}

function isSupported(code: string): code is LanguageCode {
  return SUPPORTED_LANGUAGES.some((l) => l.code === code);
}

export function getStoredLanguage(): LanguageCode | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored && isSupported(stored) ? stored : null;
  } catch {
    return null;
  }
}

export function setStoredLanguage(code: LanguageCode) {
  try {
    localStorage.setItem(STORAGE_KEY, code);
  } catch {}
}

export function detectBrowserLanguage(): LanguageCode {
  const nav = typeof navigator !== 'undefined' ? navigator : undefined;
  if (!nav) return DEFAULT_LANGUAGE;
  const langs = nav.languages || [nav.language || ''];
  for (const l of langs) {
    const primary = (l || '').split('-')[0]?.toLowerCase();
    if (primary === 'fil' || primary === 'tl') return 'fil';
    if (primary === 'en') return 'en';
  }
  return DEFAULT_LANGUAGE;
}

export function getInitialLanguage(): LanguageCode {
  const stored = getStoredLanguage();
  if (stored) return stored;
  return detectBrowserLanguage();
}

export function getTranslation(lang: LanguageCode, key: string): string {
  const translations = window.__TRANSLATIONS__;
  if (!translations || !translations[lang]) return key;
  const parts = key.split('.');
  let cur: any = translations[lang];
  for (const p of parts) {
    if (cur && typeof cur === 'object' && p in cur) {
      cur = cur[p];
    } else {
      return key;
    }
  }
  return typeof cur === 'string' ? cur : key;
}

export function applyLanguage(lang: LanguageCode) {
  const html = document.documentElement;
  html.setAttribute('data-lang', lang);
  const langMeta = SUPPORTED_LANGUAGES.find((l) => l.code === lang);
  if (langMeta) {
    html.setAttribute('lang', langMeta.code);
  }

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (!key) return;
    const value = getTranslation(lang, key);
    if (value !== key) {
      if (el.tagName.toLowerCase() === 'title') {
        document.title = value;
      } else {
        el.innerHTML = value;
      }
    }
  });

  document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    const spec = el.getAttribute('data-i18n-attr');
    if (!spec) return;
    const [attr, key] = spec.split('|');
    if (!attr || !key) return;
    const value = getTranslation(lang, key);
    if (value !== key) {
      el.setAttribute(attr, value);
      if (el.tagName.toLowerCase() === 'meta' && attr === 'content') {
        const prop = el.getAttribute('property') || el.getAttribute('name');
        if (prop) {
          const og = document.querySelector(`meta[property="${prop}"]`);
          if (og) og.setAttribute('content', value);
        }
      }
    }
  });

  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const key = el.getAttribute('data-i18n-html');
    if (!key) return;
    const value = getTranslation(lang, key);
    if (value !== key) el.innerHTML = value;
  });

  document.dispatchEvent(new CustomEvent('tpg-language-changed', { detail: { language: lang } }));
}

export function setLanguage(lang: LanguageCode) {
  setStoredLanguage(lang);
  applyLanguage(lang);
}

export function initLanguage() {
  const lang = getInitialLanguage();
  applyLanguage(lang);
}
