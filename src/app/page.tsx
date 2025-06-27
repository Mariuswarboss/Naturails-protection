
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { mockProducts } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import SiteLayout from '@/components/SiteLayout';
import { ChevronRight, Leaf, FlaskConical, Award } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';

export default function HomePage() {
  const { t } = useTranslation();
  
  const featuredProducts = mockProducts.filter(p => p.productFor === 'dog').slice(0, 4);

  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-50 to-gray-100 py-20 md:py-32 rounded-lg shadow-lg overflow-hidden mb-16 md:mb-24">
        <div className="container mx-auto px-4 z-10 relative">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-primary tracking-tight">
                {t('homepage.heroTitle')}
              </h1>
              <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-lg mx-auto md:mx-0">
                {t('homepage.heroSubtitle')}
              </p>
              <Link href="/products">
                <Button size="lg" className="font-headline text-lg px-8 py-3 rounded-full">
                  {t('homepage.shopAllProducts')} <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="relative h-64 md:h-96 w-full max-w-md mx-auto md:max-w-none">
              <Image
                src="https://img.lazcdn.com/g/p/63abcb2518898a6b70cdd3027235cea6.png_720x720q80.png"
                alt="Assortment of Nature's Protection dog food bags"
                fill
                className="rounded-lg animate-float object-cover"
                data-ai-hint="dog food products"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="py-16 md:py-24 container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:gap-12">
          <Link href="/products" className="block group">
            <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 aspect-video bg-gray-900">
              <Image
                src="https://img.lazcdn.com/g/p/63abcb2518898a6b70cdd3027235cea6.png_720x720q80.png"
                alt="Nature's Protection dog food products"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-60 group-hover:opacity-50"
                data-ai-hint="dog food products"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <h3 className="font-headline text-4xl md:text-5xl font-bold text-white mb-4">{t('homepage.productsCardTitle')}</h3>
                <p className="text-gray-200 mb-6 text-md md:text-lg max-w-xl">{t('homepage.productsCardSubtitle')}</p>
                <Button variant="secondary" className="bg-white/90 hover:bg-white text-primary group-hover:bg-primary group-hover:text-white transition-colors rounded-full px-8 py-3 text-lg">
                  {t('homepage.shopNow')} <ChevronRight className="ml-1 h-5 w-5" />
                </Button>
              </div>
            </div>
          </Link>
        </div>
      </section>
      
      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">{t('homepage.featuredProducts')}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
             <div className="text-center mt-12">
              <Link href="/products">
                <Button variant="outline" size="lg" className="rounded-full px-8">{t('homepage.viewAllProducts')}</Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-card border-y">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="font-headline text-3xl md:text-4xl font-bold mb-4 text-primary">{t('homepage.whyChooseUsTitle')}</h3>
            <p className="text-foreground/80 max-w-3xl mx-auto text-lg">
              {t('homepage.whyChooseUsSubtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10 text-center max-w-5xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                <Leaf className="h-8 w-8" />
              </div>
              <h4 className="text-xl font-semibold mb-2 text-foreground">{t('homepage.naturalIngredientsTitle')}</h4>
              <p className="text-base text-foreground/70">{t('homepage.naturalIngredientsText')}</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                <FlaskConical className="h-8 w-8" />
              </div>
              <h4 className="text-xl font-semibold mb-2 text-foreground">{t('homepage.scientificallyFormulatedTitle')}</h4>
              <p className="text-base text-foreground/70">{t('homepage.scientificallyFormulatedText')}</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h4 className="text-xl font-semibold mb-2 text-foreground">{t('homepage.trustedQualityTitle')}</h4>
              <p className="text-base text-foreground/70">{t('homepage.trustedQualityText')}</p>
            </div>
          </div>
           <div className="text-center mt-12">
            <Link href="/about">
              <Button variant="outline" size="lg" className="rounded-full px-8">{t('homepage.learnMoreAboutUs')}</Button>
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
