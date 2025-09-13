
import SiteLayout from '@/components/SiteLayout';
import HomePageClient from '@/components/HomePageClient';

// Force static generation
export const dynamic = 'force-static';
export const revalidate = false;

export default function HomePage() {
  return (
    <SiteLayout>
      <HomePageClient />
    </SiteLayout>
  );
}
