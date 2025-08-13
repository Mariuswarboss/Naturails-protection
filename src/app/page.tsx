
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { mockProducts } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import SiteLayout from '@/components/SiteLayout';
import { ChevronRight, Leaf, FlaskConical, Award } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';
import * as React from 'react';
// import Autoplay from "embla-carousel-autoplay"
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel"

export default function HomePage() {
  const { t } = useTranslation();
  
  const featuredProducts = mockProducts.filter(p => p.productFor === 'dog').slice(0, 4);

  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = React.useState(false);

  // Auto-advance slides
  React.useEffect(() => {
    if (isAutoplayPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length, isAutoplayPaused]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

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
    <SiteLayout>
      {/* Hero Section - Custom Carousel */}
      <section className="relative w-full mb-16 md:mb-24">
        <div
          className="relative h-[60vh] md:h-[70vh] rounded-lg overflow-hidden"
          onMouseEnter={() => setIsAutoplayPaused(true)}
          onMouseLeave={() => setIsAutoplayPaused(false)}
        >
          {/* Slides */}
          <div className="relative w-full h-full">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={slide.imageUrl}
                  alt={t(slide.titleKey)}
                  fill
                  className="object-cover"
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
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronRight className="h-6 w-6 text-white rotate-180" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
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
    </SiteLayout>
  );
}
    

    
