
"use client";

import type { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/contexts/LanguageContext';

export default function ProductCard({ product }: { product: Product }) {
  const { t } = useTranslation();

  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:border-primary/50 bg-card">
      <Link href={`/products/${product.id}`} className="block group flex-grow flex flex-col">
        <CardHeader className="p-0 relative aspect-square overflow-hidden border-b">
          <Image
            src={product.imageUrl}
            alt={product.name} // Product name not translated
            width={400}
            height={400}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={product.dataAiHint || "pet product"}
          />
           {product.stock <= 0 && (
            <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded-md">
              {t('productPage.outOfStockButton')}
            </div>
          )}
        </CardHeader>
        <CardContent className="flex-grow p-4 flex flex-col">
          <CardTitle className="font-headline text-base md:text-lg mb-1 leading-tight group-hover:text-primary transition-colors">
            {product.name}
          </CardTitle>
          <p className="text-xs text-muted-foreground mb-2 line-clamp-2 flex-grow">{product.description}</p>
          <p className="text-lg font-semibold text-foreground mt-auto pt-2">{product.price.toFixed(2)} MDL</p>
        </CardContent>
      </Link>
    </Card>
  );
}
