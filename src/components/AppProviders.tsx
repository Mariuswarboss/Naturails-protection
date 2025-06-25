
"use client";

import type React from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
// import { AuthProvider } from '@/contexts/AuthContext'; // Placeholder for AuthProvider

interface AppProvidersProps {
  children: React.ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    // <AuthProvider> // Placeholder for AuthProvider
    <LanguageProvider>
      {children}
    </LanguageProvider>
    // </AuthProvider> // Placeholder for AuthProvider
  );
}
