
"use client";

import type { Product } from '@/types';
import { useTranslation } from '@/contexts/LanguageContext';
import Image from 'next/image';
import ProductDetailsClient from './ProductDetailsClient';
import ProductDescription from './ProductDescription';
import ProductRecommendations from './ProductRecommendations';

export default function ProductPageClient({ product, variants }: { product: Product, variants: Product[] }) {
  const { t } = useTranslation();

  return (
    <>
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
        <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg border">
          <Image
            src={product.imageUrl}
            alt={t(product.name)}
            fill
            className="object-cover"
            priority
            data-ai-hint={product.dataAiHint || "product image"}
          />
           {product.stock <= 0 && (
            <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-sm font-bold px-3 py-1.5 rounded-md">
              {t('productPage.outOfStockButton')}
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
    </>
  );
}
