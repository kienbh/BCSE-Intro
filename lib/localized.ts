import type { Lang } from './i18n';

export type Localized<T> = T | { vi: T; en: T; ja: T };

/**
 * Pick the localized version of a value. Accepts either a plain value
 * (treated as VI fallback for all languages) or a `{ vi, en, ja }` object.
 *
 * Falls back through: requested → vi → en → first available value.
 */
export function pickLocalized<T>(value: Localized<T>, lang: Lang): T {
  if (
    value !== null &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    'vi' in (value as object)
  ) {
    const obj = value as { vi: T; en: T; ja: T };
    return obj[lang] ?? obj.vi ?? obj.en;
  }
  return value as T;
}

export const pl = pickLocalized;
