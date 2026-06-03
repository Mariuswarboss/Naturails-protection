import type { Metadata } from 'next';
import { Alegreya } from 'next/font/google';
import './globals.css';
import AppProviders from '@/components/AppProviders';
import { Toaster } from '@/components/ui/toaster';
import {
  buildPageMetadata,
  jsonLd,
  multilingualSeoDescription,
  organizationStructuredData,
  websiteStructuredData,
} from '@/lib/seo';

const alegreya = Alegreya({
  subsets: ['latin'],
  variable: '--font-headline',
  display: 'swap',
});

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Nature's Protection Moldova - hrana premium pentru caini si pisici",
    description: multilingualSeoDescription,
    path: '/',
  }),
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className={`${alegreya.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(organizationStructuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(websiteStructuredData) }}
        />
        <AppProviders>
          {children}
          <Toaster />
        </AppProviders>
      </body>
    </html>
  );
}
