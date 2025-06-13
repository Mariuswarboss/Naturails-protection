
"use client";

import type React from 'react';
import { CartProvider } from '@/contexts/CartContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
// import { AuthProvider } from '@/contexts/AuthContext'; // Placeholder for AuthProvider

interface AppProvidersProps {
  children: React.ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    // <AuthProvider> // Placeholder for AuthProvider
    <CartProvider>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </CartProvider>
    // </AuthProvider> // Placeholder for AuthProvider
  );
}
