import { en } from './en';
import { ta } from './ta';
import { hi } from './hi';

export const locales = { en, ta, hi };

export const languageNames = {
  en: "English (US)",
  ta: "தமிழ் (Tamil)",
  hi: "हिन्दी (Hindi)"
};

export const defaultLocale = 'en';

export function getNestedTranslation(obj, path) {
  if (!obj || !path) return path;
  const parts = path.split('.');
  let current = obj;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return null;
    }
  }
  return typeof current === 'string' ? current : null;
}
