'use client';

import { useMemo, useState } from 'react';
import type { Product } from '@/types';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { PackageCheck, Utensils } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';

const foodCategories = ['Dry Food', 'Wet Food', 'Snacks'];

const labels = {
  RO: {
    eyebrow: 'Informații utile',
    title: 'Indică greutatea animalului',
    dose: 'Doză estimativă recomandată:',
    packageLasts: 'Pachetul va ajunge pentru:',
    days: 'zile',
    note: 'Calcul orientativ. Porția reală poate varia după vârstă, activitate și recomandarea medicului veterinar.',
  },
  RU: {
    eyebrow: 'Полезная информация',
    title: 'Укажите вес питомца',
    dose: 'Ориентировочная рекомендуемая доза:',
    packageLasts: 'Упаковки хватит на:',
    days: 'дней',
    note: 'Ориентировочный расчет. Реальная порция зависит от возраста, активности и рекомендации ветеринара.',
  },
};

function getDoseInGrams(petWeight: number, product: Product) {
  const baseDose = product.productFor === 'cat'
    ? 18 + petWeight * 11
    : 35 + petWeight * 9;

  if (product.category === 'Wet Food') {
    return Math.max(50, Math.round(baseDose * 1.6));
  }

  if (product.category === 'Snacks') {
    return Math.max(8, Math.round(baseDose * 0.18));
  }

  return Math.max(25, Math.round(baseDose));
}

export default function FeedingCalculator({ product }: { product: Product }) {
  const { language } = useTranslation();
  const currentLanguage = language.toUpperCase() === 'RO' ? 'RO' : 'RU';
  const text = labels[currentLanguage];
  const [petWeight, setPetWeight] = useState(product.productFor === 'cat' ? 4 : 2);

  const shouldShow = foodCategories.includes(product.category) && Boolean(product.weight);
  const maxWeight = product.productFor === 'cat' ? 12 : 60;
  const packageWeightGrams = Math.round((product.weight || 0) * 1000);

  const recommendedDose = useMemo(
    () => getDoseInGrams(petWeight, product),
    [petWeight, product]
  );
  const packageDays = Math.max(1, Math.round(packageWeightGrams / recommendedDose));

  if (!shouldShow) {
    return null;
  }

  return (
    <section className="relative left-1/2 my-12 w-screen -translate-x-1/2 bg-primary/10 py-12 md:my-16 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-5 text-xs font-bold uppercase tracking-wide text-primary">
            {text.eyebrow}
          </p>
          <h2 className="font-headline text-2xl font-bold md:text-3xl">
            {text.title}
          </h2>

          <div className="mt-10">
            <div className="relative px-2 pb-8">
              <div
                className="absolute -top-8 z-10 -translate-x-1/2 rounded-md bg-primary px-2.5 py-1 text-sm font-bold text-primary-foreground after:absolute after:left-1/2 after:top-full after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-primary"
                style={{ left: `${((petWeight - 1) / (maxWeight - 1)) * 100}%` }}
              >
                {petWeight} kg
              </div>
              <Slider
                value={[petWeight]}
                min={1}
                max={maxWeight}
                step={1}
                onValueChange={(value) => setPetWeight(value[0] ?? petWeight)}
              />
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Card className="rounded-2xl border-0 bg-background p-8 shadow-sm">
              <Utensils className="mx-auto mb-4 h-9 w-9 text-foreground" />
              <p className="font-semibold">{text.dose}</p>
              <p className="mt-2 text-3xl font-extrabold text-primary">
                {recommendedDose} g
              </p>
            </Card>
            <Card className="relative rounded-2xl border-0 bg-background p-8 shadow-sm">
              <span className="absolute right-5 top-4 rounded-full bg-foreground px-2.5 py-1 text-xs font-bold text-background">
                {product.weight} kg
              </span>
              <PackageCheck className="mx-auto mb-4 h-9 w-9 text-foreground" />
              <p className="font-semibold">{text.packageLasts}</p>
              <p className="mt-2 text-3xl font-extrabold text-primary">
                {packageDays} {text.days}
              </p>
            </Card>
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-xs leading-5 text-foreground/60">
            {text.note}
          </p>
        </div>
      </div>
    </section>
  );
}
