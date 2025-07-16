
"use client";

import Link from 'next/link';
import { Facebook, Instagram, ShieldCheck, ExternalLink } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.03-4.83-.95-6.43-2.88-1.59-1.93-2.2-4.42-1.8-6.83.12-.71.3-1.43.53-2.12.2-1.74 1.86-3.47 3.6-4.35 1.78-.9 3.53-.87 5.33.06.63.33 1.22.78 1.75 1.27v4.23c-1.09-.73-2.34-1.05-3.6-.79-1.41.29-2.64 1.16-3.43 2.37-.58.88-.83 1.93-.78 2.98.05 1.02.36 2.02.91 2.86.83 1.27 2.28 2.04 3.86 1.93.91-.06 1.77-.43 2.46-1.05.6-.54.94-1.28 1.05-2.06.02-2.89.01-5.78.01-8.67z" />
    </svg>
);


export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-card text-secondary-foreground">
      <div className="container py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
          <div>
            <Link href="/" className="inline-flex items-center justify-center md:justify-start space-x-2 mb-4">
              <ShieldCheck className="h-8 w-8 text-primary" />
              <span className="font-headline text-xl font-bold text-primary">{t('header.siteTitle')}</span>
            </Link>
            <p className="text-sm">
              {t('footer.tagline')}
            </p>
          </div>
          <div>
            <h5 className="font-semibold mb-3 text-lg text-foreground">{t('footer.informationTitle')}</h5>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="hover:text-primary hover:underline">{t('header.allProducts')}</Link></li>
              <li><Link href="/contact" className="hover:text-primary hover:underline">{t('footer.contactUs')}</Link></li>
              <li><Link href="/terms" className="hover:text-primary hover:underline">{t('footer.termsOfService')}</Link></li>
              <li>
                <a 
                  href="https://naturesprotection.eu/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-primary hover:underline inline-flex items-center justify-center md:justify-start"
                >
                  {t('footer.officialSite')} <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-3 text-lg text-foreground">{t('footer.followUsTitle')}</h5>
            <div className="flex space-x-4 justify-center md:justify-start">
              <Link href="https://www.facebook.com/profile.php?id=100094522227719&locale=ro_RO" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-muted-foreground hover:text-primary"><Facebook size={24} /></Link>
              <Link href="https://www.instagram.com/naturesprotection_md/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-primary"><Instagram size={24} /></Link>
              <Link href="https://www.tiktok.com/@naturesprotection.md" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-muted-foreground hover:text-primary"><TikTokIcon className="h-6 w-6" /></Link>
            </div>
          </div>
        </div>
        <div className="border-t pt-8 text-center text-sm text-muted-foreground">
          <p>{t('footer.copyright', { year: currentYear })}</p>
          <p className="mt-1">{t('footer.poweredBy')}</p>
        </div>
      </div>
    </footer>
  );
}
