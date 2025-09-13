"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { mockProducts } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import { ChevronRight, Leaf, FlaskConical, Award } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';
import * as React from 'react';
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

// Create a client-only component for the carousel
const ClientOnlyCarousel = () => {
  const { t } = useTranslation();
  const [plugin] = React.useState(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )
  const slides = [
    {
      titleKey: 'homepage.heroTitle',
      subtitleKey: 'homepage.heroSubtitle',
      imageUrl: 'https://www.gmdistribuzione.com/wp-content/uploads/2020/05/nuova-Img-di-testa-NATURES-1024x480-1.jpg',
      dataAiHint: 'dog food products',
      link: '/products?category=Dry%20Food'
    },
    {
      titleKey: 'footer.tagline',
      subtitleKey: 'homepage.productsCardSubtitle',
      imageUrl: 'https://naturesprotection.eu/vendor/laravel-files/files/gabriele/np-sc/__thumbnails__/en-npsc-red-coat-key-visual-a4-horizontal-2-print-202203181650_1166fit.jpg',
      dataAiHint: 'red dog',
      link: '/products?category=Food&coatColor=Red'
    },
    {
      titleKey: 'homepage.whyChooseUsTitle',
      subtitleKey: 'homepage.whyChooseUsSubtitle',
      imageUrl: 'https://tauroproline.com/vendor/laravel-files/files/__thumbnails__/1800_500fit.jpg',
      dataAiHint: 'pet cosmetics',
      link: '/products?category=Cosmetics'
    }
  ];

  return (
    <Carousel
      plugins={[plugin]}
      className="w-full"
      onMouseEnter={plugin.stop}
      onMouseLeave={plugin.reset}
    >
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index}>
            <div className="relative h-[60vh] md:h-[70vh] rounded-lg overflow-hidden bg-black/10 dark:bg-black/20">
              <Image
                src={slide.imageUrl}
                alt={t(slide.titleKey)}
                fill
                className="object-contain md:object-cover"
                data-ai-hint={slide.dataAiHint}
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-white tracking-tight shadow-lg">
                  {t(slide.titleKey)}
                </h1>
                <p className="text-base md:text-xl text-white/90 mb-8 max-w-2xl mx-auto shadow-sm">
                   {t(slide.subtitleKey)}
                </p>
                <Link href={slide.link}>
                  <Button size="lg" className="text-base md:text-lg px-6 py-3 md:px-8 md:py-3 rounded-full">
                    {t('homepage.shopAllProducts')} <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
    </Carousel>
  )
}

export default function HomePageClient() {
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const featuredProducts = mockProducts.filter(p => p.productFor === 'dog').slice(0, 4);

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full mb-16 md:mb-24">
        {isMounted ? <ClientOnlyCarousel /> : <div className="h-[60vh] md:h-[70vh] bg-muted rounded-lg"></div>}
      </section>

      {/* Category Section */}
      <section className="py-12 md:py-24 container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:gap-12">
          <Link href="/products" className="block group">
            <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 aspect-video bg-gray-900">
              <Image
                src="https://images.unsplash.com/photo-1536809188428-e8ecf663d0be?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Happy dog playing outdoors"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-60 group-hover:opacity-50"
                data-ai-hint="dog playing"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <h3 className="font-headline text-4xl md:text-5xl font-bold text-white mb-4">{t('homepage.productsCardTitle')}</h3>
                <p className="text-gray-200 mb-6 text-md md:text-lg max-w-xl">{t('homepage.productsCardSubtitle')}</p>
                <Button variant="secondary" className="bg-white/90 hover:bg-white text-primary group-hover:bg-primary group-hover:text-white transition-colors rounded-full px-6 py-2 md:px-8 md:py-3 text-base md:text-lg">
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
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t('homepage.featuredProducts')}</h2>
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
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-primary">{t('homepage.whyChooseUsTitle')}</h3>
            <p className="text-foreground/80 max-w-3xl mx-auto text-base md:text-lg">
              {t('homepage.whyChooseUsSubtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10 text-center max-w-5xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                <Leaf className="h-8 w-8" />
              </div>
              <h4 className="text-xl font-semibold mb-2 text-foreground">{t('homepage.naturalIngredientsTitle')}</h4>
              <p className="text-sm md:text-base text-foreground/70">{t('homepage.naturalIngredientsText')}</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                <FlaskConical className="h-8 w-8" />
              </div>
              <h4 className="text-xl font-semibold mb-2 text-foreground">{t('homepage.scientificallyFormulatedTitle')}</h4>
              <p className="text-sm md:text-base text-foreground/70">{t('homepage.scientificallyFormulatedText')}</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h4 className="text-xl font-semibold mb-2 text-foreground">{t('homepage.trustedQualityTitle')}</h4>
              <p className="text-sm md:text-base text-foreground/70">{t('homepage.trustedQualityText')}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
