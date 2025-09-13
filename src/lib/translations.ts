import roTranslations from '@/locales/ro.json';
import ruTranslations from '@/locales/ru.json';

type Translations = typeof ruTranslations;

const translationsMap: Record<string, Translations> = {
  RO: roTranslations as Translations,
  RU: ruTranslations as Translations,
};

export function getTranslations(language: string = 'RU'): Translations {
  return translationsMap[language.toUpperCase()] || translationsMap['RU'];
}

export function t(translations: Translations, key: string, replacements?: Record<string, string | number>): string {
  const keys = key.split('.');
  let result: any = translations;
  
  try {
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) {
        return key; // Fallback to key if not found
      }
    }
  } catch (error) {
    return key;
  }

  if (typeof result === 'string' && replacements) {
    return Object.entries(replacements).reduce((acc, [placeholder, value]) => {
      return acc.replace(new RegExp(`{${placeholder}}`, 'g'), String(value));
    }, result);
  }
  return typeof result === 'string' ? result : key;
}
