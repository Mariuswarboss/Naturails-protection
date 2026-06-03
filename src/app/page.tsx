
import SiteLayout from '@/components/SiteLayout';
import HomePageClient from '@/components/HomePageClient';
import { buildPageMetadata, multilingualSeoDescription } from '@/lib/seo';

// Force static generation
export const dynamic = 'force-static';
export const revalidate = false;
export const metadata = buildPageMetadata({
  title: "Nature's Protection Moldova - hrana, gustari si cosmetice premium",
  description: multilingualSeoDescription,
  path: '/',
  keywords: [
    'Nature Protection Moldova homepage',
    'hrana premium caini Chisinau',
    'корм для собак и кошек Кишинев',
    'pet shop Moldova',
  ],
});

export default function HomePage() {
  return (
    <SiteLayout>
      <HomePageClient />
    </SiteLayout>
  );
}
