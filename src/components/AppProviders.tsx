
"use client";

import type React from 'react';
import { useEffect } from 'react';
import { LanguageProvider, useTranslation } from '@/contexts/LanguageContext';
import { Loader2 } from 'lucide-react';

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppContent = ({ children }: { children: React.ReactNode }) => {
  const { language, isLanguageRestored } = useTranslation();

  useEffect(() => {
    if (isLanguageRestored) {
      document.documentElement.lang = language.toLowerCase();
    }
  }, [language, isLanguageRestored]);


  if (!isLanguageRestored) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return <>{children}</>;
};


export default function AppProviders({ children }: AppProvidersProps) {
  return (
      <LanguageProvider>
          <AppContent>
            {children}
          </AppContent>
      </LanguageProvider>
  );
}
