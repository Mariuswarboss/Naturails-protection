
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
  title: "Nature's Protection Moldova",
  description: 'Calitate inalta a hranei pentru caine\'s Protection in Moldova. Hrană și accesorii de înaltă calitate pentru animalele de companie în Moldova.',
  keywords: "Nature Protection Moldova, pet food, hrana animale, Chisinau, Moldova, caini, pisici, Tauro Pro Line",
  icons: {
    icon: '/favicon.ico',
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
