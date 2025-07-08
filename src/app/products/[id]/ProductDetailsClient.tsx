
"use client";

import { useState } from 'react';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/hooks/useCart';
import { ShoppingBag, Plus, Minus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/contexts/LanguageContext';
import Link from 'next/link';

interface ProductDetailsClientProps {
  product: Product;
  variants: Product[];
}

export default function ProductDetailsClient({ product, variants }: ProductDetailsClientProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleAddToCart = () => {
    if (product.stock <= 0) {
        toast({
            title: t('productPage.outOfStockToastTitle'),
            description: t('productPage.outOfStockToastDescription', { productName: product.name }),
            variant: "destructive",
        });
        return;
    }
    if (quantity > product.stock) {
        toast({
            title: t('productPage.limitedStockToastTitle'),
            description: t('productPage.limitedStockToastDescription', { stock: product.stock, productName: product.name }),
            variant: "destructive",
        });
        return;
    }
    addToCart(product, quantity);
    toast({
      title: t('productPage.addedToCartTitle'),
      description: t('productPage.addedToCartDescription', { quantity, productName: product.name }),
    });
  };

  const incrementQuantity = () => {
    setQuantity(prev => Math.min(prev + 1, product.stock > 0 ? product.stock : 1));
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      setQuantity(Math.min(value, product.stock > 0 ? product.stock : 1));
    } else if (e.target.value === "") {
        setQuantity(1); 
    }
  };

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

        <div className="flex items-center space-x-3">
            <p className="text-sm font-medium">{t('productPage.quantity')}</p>
            <div className="flex items-center border rounded-md">
            <Button variant="ghost" size="icon" onClick={decrementQuantity} className="h-10 w-10 rounded-r-none border-r" aria-label={t('productPage.decreaseQuantity')}>
                <Minus className="h-4 w-4" />
            </Button>
            <Input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                max={product.stock > 0 ? product.stock : 1}
                className="h-10 w-16 text-center border-transparent focus:border-transparent focus:ring-0 rounded-none"
                aria-label={t('productPage.productQuantity')}
            />
            <Button variant="ghost" size="icon" onClick={incrementQuantity} className="h-10 w-10 rounded-l-none border-l" aria-label={t('productPage.increaseQuantity')}>
                <Plus className="h-4 w-4" />
            </Button>
            </div>
        </div>

        <Button 
            size="lg" 
            onClick={handleAddToCart} 
            className="w-full md:w-auto"
            disabled={product.stock <= 0}
        >
            <ShoppingBag className="mr-2 h-5 w-5" />
            {product.stock > 0 ? t('productPage.addToCart') : t('productPage.outOfStockButton')}
        </Button>
    </div>
  );
}
