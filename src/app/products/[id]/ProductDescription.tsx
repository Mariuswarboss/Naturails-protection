'use client';

import { useTranslation } from '@/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ProductDescription({ descriptionKey }: { descriptionKey: string }) {
  const { t } = useTranslation();

  const tabs = [
    { key: 'details', labelKey: 'productPage.descriptionTabDetails' },
    { key: 'components', labelKey: 'productPage.descriptionTabComponents' },
    { key: 'vitaminsAndMinerals', labelKey: 'productPage.descriptionTabVitamins' },
    { key: 'instructions', labelKey: 'productPage.descriptionTabInstructions' },
  ];

  const getDescriptionPart = (part: string) => {
    const fullKey = `product_descriptions.${descriptionKey}.${part}`;
    const translatedPart = t(fullKey);
    if (translatedPart === fullKey || !translatedPart) {
      return t('productPage.noInformationAvailable');
    }
    return translatedPart;
  };
  
  const descriptionExists = t(`product_descriptions.${descriptionKey}.details`) !== `product_descriptions.${descriptionKey}.details`;
  
  if (!descriptionExists) {
    return <p>{t('productPage.noDescriptionAvailable')}</p>;
  }

  return (
    <div className="prose prose-sm sm:prose-base max-w-none text-foreground/80">
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.key} value={tab.key} className="text-xs sm:text-sm">
              {t(tab.labelKey, {defaultValue: tab.labelKey.split('.').pop()})}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.key} value={tab.key} className="mt-4">
            <div className="whitespace-pre-wrap">{getDescriptionPart(tab.key)}</div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
