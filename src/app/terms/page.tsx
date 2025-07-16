
"use client";

import SiteLayout from '@/components/SiteLayout';
import { useTranslation } from '@/contexts/LanguageContext';

export default function TermsPage() {
  const { t } = useTranslation();

  return (
    <SiteLayout>
      <div className="prose max-w-none">
        <h1>{t('terms.title')}</h1>
        
        <h2>{t('terms.introduction.title')}</h2>
        <p>{t('terms.introduction.p1')}</p>
        
        <h2>{t('terms.useOfSite.title')}</h2>
        <p>{t('terms.useOfSite.p1')}</p>
        <ul>
          <li>{t('terms.useOfSite.li1')}</li>
          <li>{t('terms.useOfSite.li2')}</li>
          <li>{t('terms.useOfSite.li3')}</li>
        </ul>

        <h2>{t('terms.intellectualProperty.title')}</h2>
        <p>{t('terms.intellectualProperty.p1')}</p>

        <h2>{t('terms.productInformation.title')}</h2>
        <p>{t('terms.productInformation.p1')}</p>

        <h2>{t('terms.disclaimer.title')}</h2>
        <p>{t('terms.disclaimer.p1')}</p>

        <h2>{t('terms.limitationOfLiability.title')}</h2>
        <p>{t('terms.limitationOfLiability.p1')}</p>

        <h2>{t('terms.governingLaw.title')}</h2>
        <p>{t('terms.governingLaw.p1')}</p>

        <h2>{t('terms.changesToTerms.title')}</h2>
        <p>{t('terms.changesToTerms.p1')}</p>

        <h2>{t('terms.contact.title')}</h2>
        <p>{t('terms.contact.p1')}</p>
      </div>
    </SiteLayout>
  );
}
