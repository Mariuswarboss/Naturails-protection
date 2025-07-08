"use client";

import type React from 'react';
import { LanguageProvider, useTranslation } from '@/contexts/LanguageContext';
import { CartProvider } from '@/contexts/CartContext';
import { useCart } from '@/hooks/useCart';
import { Loader2 } from 'lucide-react';

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppContent = ({ children }: { children: React.ReactNode }) => {
  const { isCartRestored } = useCart();
  const { isLanguageRestored } = useTranslation();

  if (!isCartRestored || !isLanguageRestored) {
    // This loader will be shown on initial render, preventing hydration mismatch.
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
        <CartProvider>
          <AppContent>
            {children}
          </AppContent>
        </CartProvider>
      </LanguageProvider>
  );
}
