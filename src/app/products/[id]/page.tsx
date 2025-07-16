
"use client";

import { useParams } from 'next/navigation';
import { getProductById, mockProducts } from '@/lib/data';
import SiteLayout from '@/components/SiteLayout';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import ProductRecommendations from '@/components/ProductRecommendations';
import ProductDetailsClient from './ProductDetailsClient';
import ProductDescription from './ProductDescription';
import { useTranslation } from '@/contexts/LanguageContext';

export default function ProductPage() {
  const params = useParams();
  const { t } = useTranslation();
  
  const id = Array.isArray(params.id) ? params.id[0] : params.id as string;
  const product = getProductById(id);

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
  
  const variants = product.variantGroupId
    ? mockProducts.filter(p => p.variantGroupId === product.variantGroupId).sort((a, b) => (a.weight || 0) - (b.weight || 0))
    : [];

  const relatedProducts = product.relatedProductIds
    ? mockProducts.filter(p => product.relatedProductIds!.includes(p.id) && p.id !== product.id)
    : mockProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <SiteLayout>
      <div className="mb-6">
        <Link href="/products" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center">
            <ChevronLeft className="h-4 w-4 mr-1" />
            {t('productPage.backToProducts')}
        </Link>
      </div>

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

      {relatedProducts.length > 0 && (
        <section className="mt-16 pt-10 border-t">
          <h2 className="font-headline text-2xl md:text-3xl font-semibold mb-8 text-center">{t('productPage.relatedProducts')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {relatedProducts.map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      )}

      <ProductRecommendations currentProductId={product.id} currentProductCategory={product.category} />
      
    </SiteLayout>
  );
}
