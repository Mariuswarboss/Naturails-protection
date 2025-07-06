
'use client';
import { useTranslation } from '@/contexts/LanguageContext';

export default function ProductDescription({ descriptionKey }: { descriptionKey: string }) {
  const { t } = useTranslation();
  
  const fullDescriptionKey = `product_descriptions.${descriptionKey}`;
  const translatedDescription = t(fullDescriptionKey);
  
  if (translatedDescription === fullDescriptionKey) {
      return <p>{t('productPage.noDescriptionAvailable', 'No description available.')}</p>;
  }

  return <p>{translatedDescription}</p>;
}

    