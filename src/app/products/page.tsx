
import SiteLayout from '@/components/SiteLayout';
import ProductsPageClient from '@/components/ProductsPageClient';
import { buildPageMetadata } from '@/lib/seo';

// Force static generation
export const dynamic = 'force-static';
export const revalidate = false;
export const metadata = buildPageMetadata({
  title: "Catalog produse Nature's Protection Moldova",
  description:
    "Catalog Nature's Protection Moldova cu hrana uscata, hrana umeda, gustari, snackuri, supe si cosmetice Tauro Pro Line pentru caini si pisici. Каталог кормов и косметики для животных в Молдове.",
  path: '/products/',
  keywords: [
    'catalog produse animale Moldova',
    'catalog hrana caini pisici',
    'каталог корм для собак кошек',
    'dry food wet food snacks cosmetics Moldova',
  ],
});

export default function ProductsPage() {
  return (
    <SiteLayout>
      <ProductsPageClient />
    </SiteLayout>
  );
}

  
