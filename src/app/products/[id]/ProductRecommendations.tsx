
"use client";

import { useState, useEffect } from 'react';
import { getProductsByIds, mockProducts } from '@/lib/data';
import type { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import { Loader2 } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';
import { getProductRecommendations } from '@/ai/flows/recommendations';

export default function ProductRecommendations({ currentProductId, currentProductCategory }: { currentProductId: string; currentProductCategory: string; }) {
    const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { t } = useTranslation();

    useEffect(() => {
        async function fetchRecommendations() {
            setLoading(true);
            setError(null);
            try {
                // Construct a browsing history with the current product and some others from the same category
                let history = [currentProductId];
                if (currentProductCategory) {
                    const otherProductsInCategory = mockProducts
                        .filter(p => p.category === currentProductCategory && p.id !== currentProductId)
                        .slice(0, 2)
                        .map(p => p.id);
                    history.push(...otherProductsInCategory);
                }
                
                const payload = {
                    browsingHistory: [...new Set(history)].slice(-5).join(','),
                    numberOfRecommendations: 4,
                };

                const recommendations = await getProductRecommendations(payload);
                
                if (recommendations && recommendations.productIds && recommendations.productIds.length > 0) {
                    const productIds = recommendations.productIds.filter(id => id !== currentProductId);
                    const products = getProductsByIds(productIds);
                    setRecommendedProducts(products);
                } else {
                    setRecommendedProducts([]);
                }
            } catch (err) {
                console.error("Failed to fetch product recommendations:", err);
                setError(t('productRecommendations.error'));
                setRecommendedProducts([]);
            } finally {
                setLoading(false);
            }
        }

        fetchRecommendations();
    }, [currentProductId, currentProductCategory, t]);


    if (loading) {
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
        )
    }

    if (recommendedProducts.length === 0) {
        return null;
    }

    return (
        <section className="mt-16 pt-10 border-t">
            <h2 className="font-headline text-2xl md:text-3xl font-semibold mb-8 text-center">{t('productRecommendations.title')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {recommendedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}
