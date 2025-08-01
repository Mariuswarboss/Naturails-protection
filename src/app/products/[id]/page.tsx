
import { getProductById, mockProducts } from '@/lib/data';
import SiteLayout from '@/components/SiteLayout';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import ProductPageClient from './ProductPageClient';

export function generateStaticParams() {
  return mockProducts.map((product) => ({
    id: product.id,
  }))
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const product = getProductById(id);

  if (!product) {
    // This part will be rendered on the server during the build process
    // for any IDs that don't match a product.
    return (
      <SiteLayout>
        <div className="text-center py-10">
          <h1 className="text-2xl font-bold">Product Not Found</h1>
          <Link href="/products" className="text-primary hover:underline mt-4 inline-block">
              <ChevronLeft className="inline h-4 w-4 mr-1" />
              Back to Products
          </Link>
        </div>
      </SiteLayout>
    );
  }

  const variants = product.variantGroupId
    ? mockProducts.filter(p => p.variantGroupId === product.variantGroupId).sort((a, b) => (a.weight || 0) - (b.weight || 0))
    : [];

  return (
    <SiteLayout>
       <div className="mb-6">
        <Link href="/products" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center">
            <ChevronLeft className="h-4 w-4 mr-1" />
            {/* This text will be translated on the client */}
        </Link>
      </div>
      <ProductPageClient product={product} variants={variants} />
    </SiteLayout>
  );
}
