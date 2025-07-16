
import type { Metadata } from 'next';
import { Alegreya } from 'next/font/google';
import './globals.css';
import AppProviders from '@/components/AppProviders';

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
    <html lang="en" className={`${alegreya.variable}`}>
      <head />
      <body className="font-body antialiased">
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
