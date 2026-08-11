export type LanguageCode = 'en' | 'fil';

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  locale: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', locale: 'en_PH' },
  { code: 'fil', name: 'Filipino', nativeName: 'Tagalog', flag: '🇵🇭', locale: 'fil_PH' },
];

export const DEFAULT_LANGUAGE: LanguageCode = 'en';
