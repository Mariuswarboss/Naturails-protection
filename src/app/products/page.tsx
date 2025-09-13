
import SiteLayout from '@/components/SiteLayout';
import ProductsPageClient from '@/components/ProductsPageClient';

// Force static generation
export const dynamic = 'force-static';
export const revalidate = false;

export default function ProductsPage() {
  return (
    <SiteLayout>
      <ProductsPageClient />
    </SiteLayout>
  );
}

  
