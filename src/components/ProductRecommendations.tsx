
"use client";

import { useEffect, useState } from 'react';
import type { Product } from '@/types';
import { getProductRecommendations } from '@/ai/flows/product-recommendations';
import { getProductsByIds, mockProducts } from '@/lib/data'; 
import ProductCard from './ProductCard';
import { Loader2 } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';

interface ProductRecommendationsProps {
  currentProductId: string;
  currentProductCategory?: string; 
}

export default function ProductRecommendations({ currentProductId, currentProductCategory }: ProductRecommendationsProps) {
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    async function fetchRecommendations() {
      setIsLoading(true);
      setError(null);
      try {
        let browsingHistory = [currentProductId];
        if (currentProductCategory) {
            const sameCategoryProducts = mockProducts
                .filter(p => p.category === currentProductCategory && p.id !== currentProductId)
                .slice(0, 2) 
                .map(p => p.id);
            browsingHistory.push(...sameCategoryProducts);
        }
        browsingHistory = [...new Set(browsingHistory)].slice(-5);

        const recommendationsInput = {
          browsingHistory: browsingHistory.join(','),
          numberOfRecommendations: 4,
        };
        
        const result = await getProductRecommendations(recommendationsInput);
        
        if (result && result.productIds && result.productIds.length > 0) {
          const finalProductIds = result.productIds.filter(id => id !== currentProductId);
          const products = getProductsByIds(finalProductIds);
          setRecommendedProducts(products);
        } else {
          setRecommendedProducts([]);
        }
      } catch (e) {
        console.error("Failed to fetch product recommendations:", e);
        setError(t('productRecommendations.error'));
        setRecommendedProducts([]); 
      } finally {
        setIsLoading(false);
      }
    }

    fetchRecommendations();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProductId, currentProductCategory, t]); // Added t to dependency array

  if (isLoading) {
    return (
      <section className="mt-16 pt-10 border-t">
        <h2 className="font-headline text-2xl md:text-3xl font-semibold mb-8 text-center">{t('productRecommendations.title')}</h2>
        <div className="flex justify-center items-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2 text-muted-foreground">{t('productRecommendations.loading')}</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mt-16 pt-10 border-t">
        <h2 className="font-headline text-2xl md:text-3xl font-semibold mb-8 text-center">{t('productRecommendations.title')}</h2>
        <p className="text-center text-destructive">{error}</p>
      </section>
    );
  }

  if (recommendedProducts.length === 0) {
    return null; 
  }

  return (
    <section className="mt-16 pt-10 border-t">
      <h2 className="font-headline text-2xl md:text-3xl font-semibold mb-8 text-center">{t('productRecommendations.title')}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {recommendedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
