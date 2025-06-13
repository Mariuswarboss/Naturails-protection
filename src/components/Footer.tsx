
"use client";

import Link from 'next/link';
import { Facebook, Instagram, Youtube, ShieldCheck, ExternalLink } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-secondary text-secondary-foreground">
      <div className="container py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <ShieldCheck className="h-8 w-8 text-primary" />
              <span className="font-headline text-xl font-bold text-primary">{t('header.siteTitle')}</span>
            </Link>
            <p className="text-sm">
              {t('footer.tagline')}
            </p>
          </div>
          <div>
            <h5 className="font-semibold mb-3 text-lg text-foreground">{t('footer.productsTitle')}</h5>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products?category=Dog+Food" className="hover:text-primary hover:underline">{t('header.forDogs')}</Link></li>
              <li><Link href="/products?category=Cat+Supplies" className="hover:text-primary hover:underline">{t('header.forCats')}</Link></li>
              <li><Link href="/products" className="hover:text-primary hover:underline">{t('header.allProducts')}</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-3 text-lg text-foreground">{t('footer.informationTitle')}</h5>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-primary hover:underline">{t('footer.aboutUs')}</Link></li>
              <li><Link href="/contact" className="hover:text-primary hover:underline">{t('footer.contactUs')}</Link></li>
              <li><Link href="/faq" className="hover:text-primary hover:underline">{t('footer.faq')}</Link></li>
              <li><Link href="/privacy" className="hover:text-primary hover:underline">{t('footer.privacyPolicy')}</Link></li>
              <li><Link href="/terms" className="hover:text-primary hover:underline">{t('footer.termsOfService')}</Link></li>
              <li>
                <a 
                  href="https://naturesprotection.eu/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-primary hover:underline inline-flex items-center"
                >
                  {t('footer.officialSite')} <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-3 text-lg text-foreground">{t('footer.followUsTitle')}</h5>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary"><Facebook size={24} /></Link>
              <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary"><Instagram size={24} /></Link>
              <Link href="#" aria-label="YouTube" className="text-muted-foreground hover:text-primary"><Youtube size={24} /></Link>
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
