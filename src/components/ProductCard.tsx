
"use client";

import type { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/contexts/LanguageContext';
import { getProductDisplayName } from '@/lib/productDisplayNames';

const foodCategories = ['Dry Food', 'Wet Food', 'Snacks'];

export default function ProductCard({ product }: { product: Product }) {
  const { t, translations } = useTranslation();
  const showProductCode = !foodCategories.includes(product.category);
  const imageSrc = product.imageUrl?.trim() || 'https://placehold.co/400x400.png';
  const productName = getProductDisplayName(product, t, translations);

  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:border-primary/50 bg-card hover:-translate-y-1 md:hover:-translate-y-2">
      <Link href={`/products/${product.id}`} className="block group flex-grow flex flex-col">
        <CardHeader className="p-0 relative aspect-[1/1.08] sm:aspect-square overflow-hidden border-b bg-white">
          <Image
            src={imageSrc}
            alt={productName}
            width={400}
            height={400}
            className="object-contain w-full h-full p-2 sm:p-4 transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={product.dataAiHint || "pet product"}
          />
           {product.stock <= 0 && (
            <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-[10px] sm:text-xs font-bold px-2 py-1 rounded-md">
              {t('productPage.outOfStockButton')}
            </div>
          )}
        </CardHeader>
        <CardContent className="flex-grow p-3 sm:p-4 flex flex-col">
          <CardTitle className="font-headline text-[13px] sm:text-base md:text-lg mb-1 leading-snug group-hover:text-primary transition-colors line-clamp-3 sm:line-clamp-none">
            {productName}
          </CardTitle>
          {showProductCode && (
            <p className="text-xs text-muted-foreground mb-2 line-clamp-2 flex-grow">{t(product.description)}</p>
          )}
          <p className="text-[15px] sm:text-lg font-semibold text-foreground mt-auto pt-2">{product.price.toFixed(2)} MDL</p>
        </CardContent>
      </Link>
      <div className="hidden sm:block sm:p-4 sm:pt-0">
          <Link href={`/products/${product.id}`} className="w-full">
            <Button className="w-full h-9 sm:h-10 text-xs sm:text-sm">{t('productPage.viewDetails')}</Button>
          </Link>
      </div>
    </Card>
  );
}
