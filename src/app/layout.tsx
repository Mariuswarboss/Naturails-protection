
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AppProviders from '@/components/AppProviders';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
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
    // The lang attribute will be updated by the AppProviders component.
    <html lang="ru" className={`${inter.variable}`}>
      <body>
        <AppProviders>
            {children}
            <Toaster />
        </AppProviders>
      </body>
    </html>
  );
}
