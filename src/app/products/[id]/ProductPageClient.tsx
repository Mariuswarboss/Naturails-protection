
"use client";

import * as React from 'react';
import type { Product } from '@/types';
import { useTranslation } from '@/contexts/LanguageContext';
import Image from 'next/image';
import ProductDetailsClient from './ProductDetailsClient';
import ProductDescription from './ProductDescription';
import ProductRecommendations from './ProductRecommendations';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Youtube } from 'lucide-react';
import Link from 'next/link';
import SiteLayout from '@/components/SiteLayout';

export default function ProductPageClient({ product, variants }: { product: Product | undefined, variants: Product[] }) {
  const { t } = useTranslation();
  const router = useRouter();

  const [mainImage, setMainImage] = useState(product?.imageUrl);
  
  // Effect to update the main image when the product prop changes (e.g., navigating between variants)
  React.useEffect(() => {
    if (product) {
      setMainImage(product.imageUrl);
    }
  }, [product]);

  if (!product) {
    return (
      <SiteLayout>
        <div className="text-center py-10">
          <h1 className="text-2xl font-bold">{t('productPage.productNotFound')}</h1>
          <Link href="/products" className="text-primary hover:underline mt-4 inline-block">
            <ChevronLeft className="inline h-4 w-4 mr-1" />
            {t('productPage.backToProducts')}
          </Link>
        </div>
      </SiteLayout>
    );
  }

  const getYouTubeEmbedUrl = (url: string) => {
    const videoIdMatch = url.match(/(?:v=)([^&]+)/);
    if (videoIdMatch) {
      return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
    }
    return url;
  };
  
  const allImages = [product.imageUrl, ...(product.additionalImageUrls || [])];

  return (
    <SiteLayout>
       <div className="mb-6">
        <button onClick={() => router.back()} className="text-sm text-muted-foreground hover:text-primary inline-flex items-center">
            <ChevronLeft className="h-4 w-4 mr-1" />
            {t('productPage.backToProducts')}
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
        <div className="space-y-4">
          <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg border">
            <Image
              src={mainImage || product.imageUrl}
              alt={t(product.name)}
              fill
              className="object-cover transition-all duration-300"
              priority
              data-ai-hint={product.dataAiHint || "product image"}
            />
             {product.stock <= 0 && (
              <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-sm font-bold px-3 py-1.5 rounded-md">
                {t('productPage.outOfStockButton')}
              </div>
            )}
          </div>
          {allImages.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {allImages.map((img, index) => (
                <button
                  key={index}
                  className={cn(
                    "aspect-square relative rounded-md overflow-hidden border-2 transition-all",
                    img === mainImage ? "border-primary ring-2 ring-primary ring-offset-2" : "border-transparent hover:border-primary/50"
                  )}
                  onClick={() => setMainImage(img)}
                >
                  <Image
                    src={img}
                    alt={`${t(product.name)} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    data-ai-hint={product.dataAiHint || "product image thumbnail"}
                  />
                </button>
              ))}
            </div>
          )}
           {product.videoUrl && (
            <div className="mt-8">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border">
                <iframe
                  src={getYouTubeEmbedUrl(product.videoUrl)}
                  title="Product Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <h1 className="font-headline text-3xl md:text-4xl font-bold">{t(product.name)}</h1>
          <p className="text-2xl font-semibold text-primary">{product.price.toFixed(2)} MDL</p>
          
          <div>
            <ProductDescription descriptionKey={product.description} />
          </div>

          <ProductDetailsClient product={product} variants={variants} />

        </div>
      </div>
      <ProductRecommendations currentProductId={product.id} currentProductCategory={product.category} />
    </SiteLayout>
  );
}
