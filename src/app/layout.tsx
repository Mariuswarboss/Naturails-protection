
import type { Metadata } from 'next';
import { Alegreya } from 'next/font/google';
import './globals.css';
import AppProviders from '@/components/AppProviders';
import { Toaster } from '@/components/ui/toaster';
import { useTranslation } from '@/contexts/LanguageContext';
import { useEffect } from 'react';

const alegreya = Alegreya({
  subsets: ['latin'],
  variable: '--font-alegreya',
});

export const metadata: Metadata = {
  title: "Nature's Protection Moldova",
  description: 'High-quality pet food and supplies by Nature\'s Protection in Moldova. Hrană și accesorii de înaltă calitate pentru animalele de companie în Moldova.',
  keywords: "Nature Protection Moldova, pet food, hrana animale, Chisinau, Moldova, caini, pisici, Tauro Pro Line",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProviders>
      <HtmlLangUpdater>
        <body className="font-body antialiased">
            {children}
            <Toaster />
        </body>
      </HtmlLangUpdater>
    </AppProviders>
  );
}

// This new component is a client component that will handle updating the lang attribute.
function HtmlLangUpdater({ children }: { children: React.ReactNode }) {
  "use client";
  const { language, isLanguageRestored } = useTranslation();

  useEffect(() => {
    if (isLanguageRestored) {
      document.documentElement.lang = language.toLowerCase();
    }
  }, [language, isLanguageRestored]);

  return (
    <html lang={language.toLowerCase()} className={`${alegreya.variable}`}>
      <head />
      {children}
    </html>
  );
}
