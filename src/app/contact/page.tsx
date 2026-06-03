import SiteLayout from '@/components/SiteLayout';
import ContactPageClient from '@/components/ContactPageClient';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: "Contact Nature's Protection Moldova",
  description:
    "Contact Nature's Protection Moldova / DIABRAVO SRL in Chisinau. Telefoane, adresa si detalii pentru hrana premium, snacks si cosmetice pentru caini si pisici. Контакты Nature's Protection Moldova.",
  path: '/contact/',
  keywords: [
    "contact Nature's Protection Moldova",
    'DIABRAVO SRL contact',
    'Nature Protection Chisinau telefon',
    'контакты Nature Protection Moldova',
  ],
});

export default function ContactPage() {
  return (
    <SiteLayout>
      <ContactPageClient />
    </SiteLayout>
  );
}
