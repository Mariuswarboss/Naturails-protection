"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { mockProducts } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/types';
import { getRandomWeightedProducts } from '@/lib/recommendations';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Award, Bone, ChevronRight, FlaskConical, HeartPulse, Leaf, ShieldCheck, Sparkles } from 'lucide-react';
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

const benefitItems = [
  {
    titleKey: 'homepage.benefitIngredientsTitle',
    textKey: 'homepage.benefitIngredientsText',
    Icon: ShieldCheck,
  },
  {
    titleKey: 'homepage.benefitDigestionTitle',
    textKey: 'homepage.benefitDigestionText',
    Icon: HeartPulse,
  },
  {
    titleKey: 'homepage.benefitImmuneTitle',
    textKey: 'homepage.benefitImmuneText',
    Icon: Sparkles,
  },
  {
    titleKey: 'homepage.benefitSkinCoatTitle',
    textKey: 'homepage.benefitSkinCoatText',
    Icon: Leaf,
  },
  {
    titleKey: 'homepage.benefitJointsTitle',
    textKey: 'homepage.benefitJointsText',
    Icon: Bone,
  },
  {
    titleKey: 'homepage.benefitMicrozeogenTitle',
    textKey: 'homepage.benefitMicrozeogenText',
    Icon: FlaskConical,
  },
];

const faqItems = [
  {
    questionKey: 'homepage.faqSensitiveQuestion',
    answerKey: 'homepage.faqSensitiveAnswer',
  },
  {
    questionKey: 'homepage.faqChooseFoodQuestion',
    answerKey: 'homepage.faqChooseFoodAnswer',
  },
  {
    questionKey: 'homepage.faqMixFoodQuestion',
    answerKey: 'homepage.faqMixFoodAnswer',
  },
  {
    questionKey: 'homepage.faqSwitchFoodQuestion',
    answerKey: 'homepage.faqSwitchFoodAnswer',
  },
];

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
      imageUrl: '/images/banners/topper-in-gravy.webp',
      dataAiHint: 'wet food cats dogs',
      link: '/products'
    },
    {
      titleKey: 'footer.tagline',
      subtitleKey: 'homepage.productsCardSubtitle',
      imageUrl: '/images/banners/vet-diet.webp',
      dataAiHint: 'veterinary diet dog food',
      link: '/products'
    },
    {
      titleKey: 'homepage.whyChooseUsTitle',
      subtitleKey: 'homepage.whyChooseUsSubtitle',
      imageUrl: '/images/banners/all-life-stages.webp',
      dataAiHint: 'all life stages white dogs',
      link: '/products'
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
            <div className="relative h-[440px] overflow-hidden bg-black/10 sm:h-[560px] md:h-[calc(100vh-9rem)] md:min-h-[620px] dark:bg-black/20">
              <Image
                src={slide.imageUrl}
                alt={t(slide.titleKey)}
                fill
                className="object-cover"
                data-ai-hint={slide.dataAiHint}
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-5 pb-10 text-center sm:px-8 sm:pb-16 md:bottom-12">
                <h1 className="mb-3 max-w-[18rem] text-2xl font-extrabold leading-tight text-white shadow-lg sm:max-w-2xl sm:text-4xl md:mb-6 md:text-5xl lg:text-6xl">
                  {t(slide.titleKey)}
                </h1>
                <p className="mb-5 max-w-[19rem] text-sm leading-6 text-white/90 shadow-sm sm:max-w-xl sm:text-base md:mb-8 md:max-w-2xl md:text-xl">
                   {t(slide.subtitleKey)}
                </p>
                <Link href={slide.link}>
                  <Button size="lg" className="h-11 rounded-full px-5 text-sm sm:text-base md:h-12 md:px-8 md:text-lg">
                    {t('homepage.shopAllProducts')} <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 rounded-full bg-white/95 text-primary shadow-lg hover:bg-white md:left-8 md:h-14 md:w-14" />
      <CarouselNext className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 rounded-full bg-white/95 text-primary shadow-lg hover:bg-white md:right-8 md:h-14 md:w-14" />
    </Carousel>
  )
}

export default function HomePageClient() {
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = React.useState(false);
  const [featuredProducts, setFeaturedProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    setIsMounted(true);
    setFeaturedProducts(getRandomWeightedProducts(mockProducts.filter(p => p.productFor === 'dog' && !p.isHidden), 4));
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative left-1/2 mb-16 w-screen -translate-x-1/2 md:mb-24">
        {isMounted ? <ClientOnlyCarousel /> : <div className="h-[440px] bg-muted sm:h-[560px] md:h-[calc(100vh-9rem)] md:min-h-[620px]"></div>}
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

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-card border-y">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-primary">{t('homepage.benefitsTitle')}</h3>
            <p className="text-foreground/80 max-w-3xl mx-auto text-base md:text-lg">
              {t('homepage.benefitsSubtitle')}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {benefitItems.map(({ titleKey, textKey, Icon }) => (
              <div key={titleKey} className="rounded-lg border bg-background p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground">{t(titleKey)}</h4>
                    <p className="mt-2 text-sm leading-6 text-foreground/70">{t(textKey)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24">
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

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-secondary/30 border-t">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-8">
              <h3 className="text-3xl md:text-4xl font-bold text-foreground">{t('homepage.faqTitle')}</h3>
              <p className="mt-3 text-foreground/70">{t('homepage.faqSubtitle')}</p>
            </div>
            <Accordion type="single" collapsible className="rounded-lg border bg-background px-4">
              {faqItems.map(({ questionKey, answerKey }) => (
                <AccordionItem key={questionKey} value={questionKey}>
                  <AccordionTrigger className="text-left text-base font-semibold">
                    {t(questionKey)}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-6 text-foreground/70">
                    {t(answerKey)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
}
