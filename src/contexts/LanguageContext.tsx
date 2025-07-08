
"use client";

import type React from 'react';
import { createContext, useState, useEffect, useCallback, useContext } from 'react';

// Import translations directly for simplicity in this setup
// In a larger app, dynamic imports or a dedicated i18n library might be better.
import enTranslations from '@/locales/en.json';
import roTranslations from '@/locales/ro.json';
import ruTranslations from '@/locales/ru.json';

// Define a type for the translation keys based on one of the files (e.g., en.json)
// This provides some type safety, though it's not exhaustive for nested structures without deeper typing.
type TranslationKeys = keyof typeof enTranslations; // Or a more complex recursive type
type NestedTranslationKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : K extends string ? `${K}.${NestedTranslationKeys<T[K]>}` : never;
}[keyof T];


// A more robust way to type deeply nested keys, but can be complex.
// For now, we'll keep it simpler and rely on developers to use correct keys.
type Translations = typeof enTranslations;

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  translations: Translations;
  t: (key: string, replacements?: Record<string, string | number>) => string; // key can be dot-separated for nesting
  isLanguageRestored: boolean;
}

const LANGUAGE_STORAGE_KEY = 'selectedLanguage';
const DEFAULT_LANGUAGE = 'RO';

const translationsMap: Record<string, Translations> = {
  EN: enTranslations as Translations,
  RO: roTranslations as Translations,
  RU: ruTranslations as Translations,
};

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: React.ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<string>(DEFAULT_LANGUAGE);
  const [loadedTranslations, setLoadedTranslations] = useState<Translations>(translationsMap[DEFAULT_LANGUAGE]);
  const [isLanguageRestored, setIsLanguageRestored] = useState(false);

  useEffect(() => {
    let storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (!storedLanguage || !translationsMap[storedLanguage.toUpperCase()]) {
      storedLanguage = DEFAULT_LANGUAGE; // Fallback to default if invalid or not set
    } else {
      storedLanguage = storedLanguage.toUpperCase();
    }
    
    setLanguageState(storedLanguage);
    setLoadedTranslations(translationsMap[storedLanguage]);
    setIsLanguageRestored(true);
  }, []);

  const setLanguage = useCallback((lang: string) => {
    const upperLang = lang.toUpperCase();
    if (translationsMap[upperLang]) {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, upperLang);
      setLanguageState(upperLang);
      setLoadedTranslations(translationsMap[upperLang]);
    } else {
      console.warn(`Language "${upperLang}" not supported or translations not found.`);
    }
  }, []);

  const t = useCallback((key: string, replacements?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let result: any = loadedTranslations;
    try {
      for (const k of keys) {
        result = result?.[k];
        if (result === undefined) {
          // console.warn(`Translation key "${key}" not found for language "${language}". Path: ${k}`);
          return key; // Fallback to key if not found
        }
      }
    } catch (error) {
        // console.warn(`Error accessing translation key "${key}" for language "${language}".`);
        return key;
    }

    if (typeof result === 'string' && replacements) {
      return Object.entries(replacements).reduce((acc, [placeholder, value]) => {
        return acc.replace(new RegExp(`{${placeholder}}`, 'g'), String(value));
      }, result);
    }
    return typeof result === 'string' ? result : key;
  }, [loadedTranslations, language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations: loadedTranslations, t, isLanguageRestored }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
