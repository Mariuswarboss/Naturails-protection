
import type { Metadata } from 'next';
import { Alegreya } from 'next/font/google';
import './globals.css';
import AppProviders from '@/components/AppProviders';
import { Toaster } from '@/components/ui/toaster';

const alegreya = Alegreya({
  subsets: ['latin'],
  variable: '--font-headline',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Nature's Protection Moldova – Hrană și accesorii premium pentru câini și pisici",
  description: "Nature's Protection Moldova oferă hrană premium, hipoalergenică și accesorii de calitate pentru câini și pisici. Produse naturale, fără conservanți, disponibile în Chișinău și toată Moldova – pentru sănătatea și bunăstarea animalelor tale de companie.",
  keywords: "Nature Protection Moldova, Nature's Protection, hrana animale, hrana caini, hrana pisici, pet food Moldova, Chișinău, Tauro Pro Line, hrana hipoalergenica, hrana fara cereale, accesorii animale, produse premium pentru animale",
  icons: {
    icon: 'favicon.ico',
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The lang attribute will be updated by the AppProviders component.
    <html lang="ru" className={`${alegreya.variable}`}>
      <body>
        <AppProviders>
            {children}
            <Toaster />
        </AppProviders>
      </body>
    </html>
  );
}
