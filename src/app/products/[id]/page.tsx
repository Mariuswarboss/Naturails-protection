
import { getProductById, mockProducts } from '@/lib/data';
import type { Product } from '@/types';
import SiteLayout from '@/components/SiteLayout';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import ProductRecommendations from '@/components/ProductRecommendations';
import ProductDetailsClient from './ProductDetailsClient'; // Client component for interactivity

export async function generateStaticParams() {
  return mockProducts.map(product => ({
    id: product.id,
  }));
}

// This component fetches data on the server
export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);

  if (!product) {
    return (
      <SiteLayout>
        <div className="text-center py-10">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <Link href="/products" className="text-primary hover:underline mt-4 inline-block">
              <ChevronLeft className="inline h-4 w-4 mr-1" />
              Back to products
          </Link>
        </div>
      </SiteLayout>
    );
  }

  const relatedProducts = product.relatedProductIds
    ? mockProducts.filter(p => product.relatedProductIds!.includes(p.id) && p.id !== product.id)
    : mockProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <SiteLayout>
      <div className="mb-6">
        <Link href="/products" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Products
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
        {/* Product Image Gallery */}
        <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg border">
          <Image
            src={product.imageUrl}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            priority // Prioritize loading of the main product image
            data-ai-hint={product.dataAiHint || "product image"}
          />
          {/* TODO: Add multiple images support if needed, e.g. a carousel */}
        </div>

        {/* Product Info and Actions */}
        <div className="space-y-6">
          <h1 className="font-headline text-3xl md:text-4xl font-bold">{product.name}</h1>
          <p className="text-2xl font-semibold text-primary">${product.price.toFixed(2)}</p>
          <div className="prose prose-sm sm:prose-base text-foreground/80">
            <p>{product.description}</p>
          </div>
          
          {/* Client component for Add to Cart and quantity */}
          <ProductDetailsClient product={product} />

          <div className="border-t pt-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Category: {product.category}</h3>
            <h3 className="text-sm font-medium text-muted-foreground">Stock: {product.stock > 0 ? `${product.stock} available` : 'Out of Stock'}</h3>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 pt-10 border-t">
          <h2 className="font-headline text-2xl md:text-3xl font-semibold mb-8 text-center">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {relatedProducts.map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      )}

      {/* AI Powered Recommendations Section */}
      <ProductRecommendations currentProductId={product.id} currentProductCategory={product.category} />
      
    </SiteLayout>
  );
}
