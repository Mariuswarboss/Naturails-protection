
import { getProductById, mockProducts } from '@/lib/data';
import SiteLayout from '@/components/SiteLayout';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import ProductRecommendations from '@/components/ProductRecommendations';

// Mock t function for server components if not using a full i18n server solution
const serverT = (key: string, replacements?: Record<string, string | number>) => {
    // This is a mock. In a real scenario, you'd load translations based on request locale.
    if (key === 'productPage.productNotFound') return 'Product not found';
    if (key === 'productPage.backToProducts') return 'Back to products';
    if (key === 'productPage.category') return `Category: ${replacements?.category}`;
    if (key === 'productPage.outOfStockButton') return 'Out of Stock';
    if (key === 'productPage.relatedProducts') return 'Related Products';
    return key;
};


export async function generateStaticParams() {
  return mockProducts.map(product => ({
    id: product.id,
  }));
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);

  if (!product) {
    return (
      <SiteLayout>
        <div className="text-center py-10">
          <h1 className="text-2xl font-bold">{serverT('productPage.productNotFound')}</h1>
          <Link href="/products" className="text-primary hover:underline mt-4 inline-block">
              <ChevronLeft className="inline h-4 w-4 mr-1" />
              {serverT('productPage.backToProducts')}
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
            {serverT('productPage.backToProducts')}
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
        <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg border">
          <Image
            src={product.imageUrl}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            priority
            data-ai-hint={product.dataAiHint || "product image"}
          />
           {product.stock <= 0 && (
            <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-sm font-bold px-3 py-1.5 rounded-md">
              {serverT('productPage.outOfStockButton')}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <h1 className="font-headline text-3xl md:text-4xl font-bold">{product.name}</h1>
          <p className="text-2xl font-semibold text-primary">{product.price.toFixed(2)} MDL</p>
          <div className="prose prose-sm sm:prose-base text-foreground/80">
            <p>{product.description}</p>
          </div>
          
          <div className="border-t pt-6 space-y-1">
            <p className="text-sm text-muted-foreground">{serverT('productPage.category', { category: product.category })}</p>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-16 pt-10 border-t">
          <h2 className="font-headline text-2xl md:text-3xl font-semibold mb-8 text-center">{serverT('productPage.relatedProducts')}</h2>
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
