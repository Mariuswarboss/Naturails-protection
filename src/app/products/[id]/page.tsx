
import { getProductById, mockProducts } from '@/lib/data';
import ProductPageClient from './ProductPageClient';

// Required for static export of dynamic routes
export async function generateStaticParams() {
  return mockProducts.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const product = getProductById(id);

  const variants = product?.variantGroupId
    ? mockProducts.filter(p => p.variantGroupId === product.variantGroupId).sort((a, b) => (a.weight || 0) - (b.weight || 0))
    : [];

  // ProductPageClient will handle the case where the product is not found
  return <ProductPageClient product={product} variants={variants} />;
}
