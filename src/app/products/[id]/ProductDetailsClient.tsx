
"use client";

import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { Tag } from 'lucide-react';

interface ProductDetailsClientProps {
  product: Product;
  variants: Product[];
}

export default function ProductDetailsClient({ product, variants }: ProductDetailsClientProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
        {variants.length > 1 && (
            <div className="space-y-3">
                <p className="text-sm font-medium">{t('productPage.weightLabel') || 'Weight'}</p>
                <div className="flex flex-wrap gap-2">
                    {variants.map(variant => (
                        <Link href={`/products/${variant.id}`} key={variant.id}>
                            <Button
                                variant={product.id === variant.id ? 'default' : 'outline'}
                                aria-current={product.id === variant.id ? 'page' : undefined}
                            >
                                {`${variant.weight} kg`}
                            </Button>
                        </Link>
                    ))}
                </div>
            </div>
        )}

        <div className="border-t pt-6">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Tag className="h-4 w-4" />
                <span>{t('productPage.category', { category: product.category })}</span>
            </div>
             {product.stock <= 0 && (
                <p className="text-destructive font-semibold mt-4">{t('productPage.outOfStockButton')}</p>
            )}
        </div>
    </div>
  );
}
