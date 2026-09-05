import en from '../locales/en.json';
import ja from '../locales/ja.json';

export const LOCALES = ['en', 'ja'] as const;
export const DEFAULT_LOCALE = 'en';
export type Locale = (typeof LOCALES)[number];

const messages: Record<Locale, Record<string, unknown>> = { en, ja };

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
};

export function t(locale: Locale, key: string): string;
export function t<T>(
  locale: Locale,
  key: string,
  opts: { returnObjects: true },
): T;
export function t(
  locale: Locale,
  key: string,
  opts?: { returnObjects?: boolean },
): string | unknown {
  const value = key.split('.').reduce<unknown>((obj, k) => {
    if (!isRecord(obj)) return undefined;
    return obj[k];
  }, messages[locale] ?? messages[DEFAULT_LOCALE]);
  if (opts?.returnObjects) return value ?? key;
  return typeof value === 'string' ? value : String(value ?? key);
}

export function getLocalePath(locale: Locale, path: string): string {
  if (locale === DEFAULT_LOCALE) return path;
  return `/${locale}${path}`;
}
