
"use client";

import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { Beef, Bug, Drumstick, Fish, Leaf, Rabbit, Tag, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductDetailsClientProps {
  product: Product;
  variants: Product[];
}

const foodCategories = new Set(['Dry Food', 'Wet Food']);

function getIngredientIcon(flavour: string): LucideIcon {
  const normalized = flavour.toLowerCase();

  if (normalized.includes('fish') || normalized.includes('salmon') || normalized.includes('tuna') || normalized.includes('herring')) {
    return Fish;
  }

  if (normalized.includes('insect')) {
    return Bug;
  }

  if (normalized.includes('rabbit')) {
    return Rabbit;
  }

  if (normalized.includes('duck') || normalized.includes('poultry') || normalized.includes('chicken')) {
    return Drumstick;
  }

  if (normalized.includes('lamb') || normalized.includes('beef')) {
    return Beef;
  }

  return Leaf;
}

function getIngredientStyle(flavour: string) {
  const normalized = flavour.toLowerCase();

  if (normalized.includes('fish') || normalized.includes('salmon') || normalized.includes('tuna') || normalized.includes('herring')) {
    return {
      wrapper: 'bg-sky-100 text-sky-950',
      icon: 'bg-white/75 text-sky-900',
    };
  }

  if (normalized.includes('lamb') || normalized.includes('beef') || normalized.includes('rabbit') || normalized.includes('duck') || normalized.includes('poultry') || normalized.includes('chicken')) {
    return {
      wrapper: 'bg-amber-100 text-amber-950',
      icon: 'bg-white/75 text-amber-900',
    };
  }

  if (normalized.includes('insect')) {
    return {
      wrapper: 'bg-lime-100 text-lime-950',
      icon: 'bg-white/75 text-lime-900',
    };
  }

  return {
    wrapper: 'bg-primary/10 text-primary',
    icon: 'bg-white/75 text-primary',
  };
}

export default function ProductDetailsClient({ product, variants }: ProductDetailsClientProps) {
  const { t } = useTranslation();
  const mainIngredient = product.flavour?.trim();
  const shouldShowIngredient = foodCategories.has(product.category) && Boolean(mainIngredient);
  const IngredientIcon = mainIngredient ? getIngredientIcon(mainIngredient) : Leaf;
  const ingredientStyle = mainIngredient ? getIngredientStyle(mainIngredient) : getIngredientStyle('');

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

        {shouldShowIngredient && mainIngredient && (
            <div
                className={cn(
                    'flex items-center justify-between gap-4 rounded-2xl px-5 py-4 md:px-6 md:py-5',
                    ingredientStyle.wrapper
                )}
                data-main-ingredient={mainIngredient}
                aria-label={`Main ingredient: ${mainIngredient}`}
            >
                <span className="font-headline text-2xl md:text-3xl font-semibold leading-none">
                    {mainIngredient}
                </span>
                <span className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-full', ingredientStyle.icon)}>
                    <IngredientIcon className="h-7 w-7" aria-hidden="true" />
                </span>
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
