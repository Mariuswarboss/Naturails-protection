'use client';

import { useState } from 'react';
import { useTranslation } from '@/contexts/LanguageContext';
import { Minus, Plus } from 'lucide-react';

type DescriptionSection = {
  id: string;
  label: {
    RO: string;
    RU: string;
  };
  translationPart?: string;
  fallback: {
    RO: string;
    RU: string;
  };
};

const descriptionSections: DescriptionSection[] = [
  {
    id: 'composition',
    label: { RO: 'Compoziție', RU: 'Состав' },
    translationPart: 'components',
    fallback: {
      RO: 'Compoziția exactă este indicată pe ambalajul produsului.',
      RU: 'Точный состав указан на упаковке продукта.',
    },
  },
  {
    id: 'additives',
    label: { RO: 'Aditivi', RU: 'Добавки' },
    translationPart: 'vitaminsAndMinerals',
    fallback: {
      RO: 'Aditivii, vitaminele și mineralele sunt indicate pe ambalajul produsului.',
      RU: 'Добавки, витамины и минералы указаны на упаковке продукта.',
    },
  },
  {
    id: 'feedingRecommendations',
    label: { RO: 'Recomandări de hrănire', RU: 'Рекомендации по кормлению' },
    translationPart: 'instructions',
    fallback: {
      RO: 'Cantitatea zilnică se ajustează după greutate, vârstă și nivelul de activitate al animalului.',
      RU: 'Суточную норму корректируйте по весу, возрасту и активности питомца.',
    },
  },
  {
    id: 'instructions',
    label: { RO: 'Instrucțiuni', RU: 'Инструкции' },
    fallback: {
      RO: 'Introduceți produsul treptat. Apa curată și proaspătă trebuie să fie mereu disponibilă.',
      RU: 'Вводите продукт постепенно. Чистая свежая вода всегда должна быть доступна.',
    },
  },
  {
    id: 'componentDescription',
    label: { RO: 'Descriere componente', RU: 'Описание компонентов' },
    translationPart: 'details',
    fallback: {
      RO: 'Informațiile detaliate despre componente sunt disponibile pe ambalaj.',
      RU: 'Подробная информация о компонентах доступна на упаковке.',
    },
  },
];

export default function ProductDescription({ descriptionKey }: { descriptionKey: string }) {
  const { language, t } = useTranslation();
  const [openSections, setOpenSections] = useState<string[]>([]);
  const currentLanguage = language.toUpperCase() === 'RO' ? 'RO' : 'RU';

  const getDescriptionPart = (part: string) => {
    const fullKey = `product_descriptions.${descriptionKey}.${part}`;
    const translatedPart = t(fullKey);
    if (translatedPart === fullKey || !translatedPart) {
      return t('productPage.noInformationAvailable');
    }
    return translatedPart;
  };

  const getSectionContent = (section: DescriptionSection) => {
    if (!section.translationPart) {
      return section.fallback[currentLanguage];
    }

    const content = getDescriptionPart(section.translationPart);
    if (content === t('productPage.noInformationAvailable')) {
      return section.fallback[currentLanguage];
    }

    return content;
  };

  const toggleSection = (sectionId: string) => {
    setOpenSections((current) =>
      current.includes(sectionId)
        ? current.filter((id) => id !== sectionId)
        : [...current, sectionId]
    );
  };
  
  const descriptionExists = t(`product_descriptions.${descriptionKey}.details`) !== `product_descriptions.${descriptionKey}.details`;
  
  if (!descriptionExists) {
    return (
      <div className="rounded-lg border bg-card p-5 text-sm text-muted-foreground">
        {t('productPage.noDescriptionAvailable')}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {descriptionSections.map((section) => {
        const isOpen = openSections.includes(section.id);
        const Icon = isOpen ? Minus : Plus;

        return (
          <div key={section.id} className="overflow-hidden rounded-2xl border bg-card shadow-sm">
            <button
              type="button"
              onClick={() => toggleSection(section.id)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6"
              aria-expanded={isOpen}
            >
              <span className="font-headline text-lg font-semibold md:text-xl">
                {section.label[currentLanguage]}
              </span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Icon className="h-5 w-5" />
              </span>
            </button>
            {isOpen && (
              <div className="border-t px-5 pb-5 pt-4 text-sm leading-6 text-foreground/75 md:px-6">
                <div className="whitespace-pre-wrap">{getSectionContent(section)}</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
