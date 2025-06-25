
"use client";

import type React from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/components/ThemeProvider';
// import { AuthProvider } from '@/contexts/AuthContext'; // Placeholder for AuthProvider

interface AppProvidersProps {
  children: React.ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    // <AuthProvider> // Placeholder for AuthProvider
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </ThemeProvider>
    // </AuthProvider> // Placeholder for AuthProvider
  );
}
