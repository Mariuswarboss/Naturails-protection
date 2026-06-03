
import { getProductById, mockProducts } from '@/lib/data';
import type { Metadata } from 'next';
import { getProductSeoMetadata, getProductStructuredData, jsonLd } from '@/lib/seo';
import ProductPageClient from './ProductPageClient';

// Required for static export of dynamic routes
export async function generateStaticParams() {
  return mockProducts.map((product) => ({
    id: product.id,
  }));
}

// Force static generation
export const dynamic = 'force-static';
export const revalidate = false;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  return getProductSeoMetadata(getProductById(id), id);
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductById(id);
  const productStructuredData = getProductStructuredData(product);

  const variants = product?.variantGroupId
    ? mockProducts.filter(p => p.variantGroupId === product.variantGroupId).sort((a, b) => (a.weight || 0) - (b.weight || 0))
    : [];

  // ProductPageClient will handle the case where the product is not found
  return (
    <>
      {productStructuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(productStructuredData) }}
        />
      ) : null}
      <ProductPageClient product={product} variants={variants} />
    </>
  );
}
