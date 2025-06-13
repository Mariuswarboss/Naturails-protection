"use client";

import { useEffect, useState } from 'react';
import type { Product } from '@/types';
import { getProductRecommendations } from '@/ai/flows/product-recommendations';
import { getProductsByIds, mockProducts } from '@/lib/data'; // Assuming mockProducts for fallback
import ProductCard from './ProductCard';
import { Loader2 } from 'lucide-react';

interface ProductRecommendationsProps {
  currentProductId: string;
  currentProductCategory?: string; // Optional, can be used to enrich browsing history
}

export default function ProductRecommendations({ currentProductId, currentProductCategory }: ProductRecommendationsProps) {
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecommendations() {
      setIsLoading(true);
      setError(null);
      try {
        // Simulate browsing history. For a real app, this would come from user activity.
        // For now, let's use current product ID and maybe some static popular IDs or category based.
        let browsingHistory = [currentProductId];
        if (currentProductCategory) {
            // Add some other products from the same category to simulate broader interest
            const sameCategoryProducts = mockProducts
                .filter(p => p.category === currentProductCategory && p.id !== currentProductId)
                .slice(0, 2) // take up to 2 more
                .map(p => p.id);
            browsingHistory.push(...sameCategoryProducts);
        }
        // Ensure unique IDs and take last few if history is long
        browsingHistory = [...new Set(browsingHistory)].slice(-5);


        const recommendationsInput = {
          browsingHistory: browsingHistory.join(','),
          numberOfRecommendations: 4,
        };
        
        const result = await getProductRecommendations(recommendationsInput);
        
        if (result && result.productIds && result.productIds.length > 0) {
          // Filter out the current product from recommendations
          const finalProductIds = result.productIds.filter(id => id !== currentProductId);
          const products = getProductsByIds(finalProductIds);
          setRecommendedProducts(products);
        } else {
          // Fallback if AI returns no recommendations or empty
          setRecommendedProducts([]);
        }
      } catch (e) {
        console.error("Failed to fetch product recommendations:", e);
        setError("Could not load recommendations at this time.");
        setRecommendedProducts([]); // Clear or set fallback recommendations
      } finally {
        setIsLoading(false);
      }
    }

    fetchRecommendations();
  }, [currentProductId, currentProductCategory]);

  if (isLoading) {
    return (
      <section className="mt-16 pt-10 border-t">
        <h2 className="font-headline text-2xl md:text-3xl font-semibold mb-8 text-center">You Might Also Like</h2>
        <div className="flex justify-center items-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2 text-muted-foreground">Loading recommendations...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mt-16 pt-10 border-t">
        <h2 className="font-headline text-2xl md:text-3xl font-semibold mb-8 text-center">You Might Also Like</h2>
        <p className="text-center text-destructive">{error}</p>
      </section>
    );
  }

  if (recommendedProducts.length === 0) {
    return null; // Or show some generic "explore more" message
  }

  return (
    <section className="mt-16 pt-10 border-t">
      <h2 className="font-headline text-2xl md:text-3xl font-semibold mb-8 text-center">You Might Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {recommendedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
