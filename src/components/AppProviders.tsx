
"use client";

import type React from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { CartProvider } from '@/contexts/CartContext';
// import { AuthProvider } from '@/contexts/AuthContext'; // Placeholder for AuthProvider

interface AppProvidersProps {
  children: React.ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    // <AuthProvider> // Placeholder for AuthProvider
      <LanguageProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </LanguageProvider>
    // </AuthProvider> // Placeholder for AuthProvider
  );
}
