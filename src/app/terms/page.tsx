import SiteLayout from '@/components/SiteLayout';
import TermsPageClient from '@/components/TermsPageClient';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: "Termeni si conditii Nature's Protection Moldova",
  description:
    "Termeni si conditii pentru Nature's Protection Moldova, catalog de hrana premium, snackuri si cosmetice pentru caini si pisici in Moldova.",
  path: '/terms/',
  keywords: [
    "termeni Nature's Protection Moldova",
    'conditii catalog produse animale Moldova',
    'условия Nature Protection Moldova',
  ],
});

export default function TermsPage() {
  return (
    <SiteLayout>
      <TermsPageClient />
    </SiteLayout>
  );
}
