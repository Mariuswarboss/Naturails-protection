
"use client";

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { mockProducts } from '@/lib/data';
import type { Product } from '@/types';
import SiteLayout from '@/components/SiteLayout';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Filter, Search, X } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FilterSidebar = ({
  filters,
  setFilters,
  dynamicOptions,
  resetFilters,
  t
}: {
  filters: any;
  setFilters: (filters: any) => void;
  dynamicOptions: any;
  resetFilters: () => void;
  t: (key: string, replacements?: Record<string, string | number>) => string;
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-xl">
        <Filter className="h-5 w-5" /> {t('productsPage.filterTitle')}
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      {Object.entries(dynamicOptions).map(([key, options]) => {
        if (key === 'categories' || (options as string[]).length <= 1) return null;
        return (
          <div key={key}>
            <label htmlFor={key} className="block text-sm font-medium text-muted-foreground mb-1">{t(`productsPage.${key}Label`)}</label>
            <Select
              value={filters[key]}
              onValueChange={(value) => setFilters({ ...filters, [key]: value })}
            >
              <SelectTrigger id={key}>
                <SelectValue placeholder={t(`productsPage.select${key.charAt(0).toUpperCase() + key.slice(1)}`)} />
              </SelectTrigger>
              <SelectContent>
                {(options as string[]).map(option => (
                  <SelectItem key={option} value={option}>
                    {option === 'all' ? t('productsPage.all') : option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )
      })}
      <Button variant="ghost" onClick={resetFilters} className="w-full justify-start text-muted-foreground hover:text-primary">
          <X className="mr-2 h-4 w-4" /> {t('productsPage.clearFilters')}
      </Button>
    </CardContent>
  </Card>
);

export default function ProductsPage() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  
  const dogProducts = useMemo(() => mockProducts.filter(p => p.productFor === 'dog'), []);

  const [searchTerm, setSearchTerm] = useState('');
  const [appliedSearchTerm, setAppliedSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('name-asc');
  const [showFilters, setShowFilters] = useState(false);

  const initialFilters = {
    category: 'all',
    breedSize: 'all',
    lifestage: 'all',
    flavour: 'all',
    purpose: 'all',
    coatColor: 'all',
    weight: 'all',
  };

  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    const searchFromUrl = searchParams.get('search');
    if (searchFromUrl) {
        setSearchTerm(searchFromUrl);
        setAppliedSearchTerm(searchFromUrl);
    }
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl) {
      setFilters(prev => ({...prev, category: categoryFromUrl}));
    }
  }, [searchParams]);

  const dynamicOptions = useMemo(() => {
    const createOptions = (key: keyof Product) => [
      'all', 
      ...Array.from(new Set(dogProducts.map(p => p[key]).filter(Boolean) as string[]))
    ];
    return {
      categories: createOptions('category'),
      breedSize: createOptions('breedSize'),
      lifestage: createOptions('lifestage'),
      flavour: createOptions('flavour'),
      purpose: createOptions('purpose'),
      coatColor: createOptions('coatColor'),
      weight: ['all', ...Array.from(new Set(dogProducts.map(p => p.weight).filter(Boolean))).sort((a,b) => a-b).map(String)]
    };
  }, [dogProducts]);

  const filteredAndSortedProducts = useMemo(() => {
    let products = [...dogProducts];

    if (appliedSearchTerm) {
      products = products.filter(p =>
        p.name.toLowerCase().includes(appliedSearchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(appliedSearchTerm.toLowerCase())
      );
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== 'all') {
        products = products.filter(p => String(p[key as keyof Product]) === value);
      }
    });

    switch (sortOption) {
      case 'price-asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        products.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }
    return products;
  }, [appliedSearchTerm, filters, sortOption, dogProducts]);
  
  const resetFilters = () => {
    setSearchTerm('');
    setAppliedSearchTerm('');
    setSortOption('name-asc');
    setFilters(initialFilters);
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedSearchTerm(searchTerm);
  };

  return (
    <SiteLayout>
      <div className="mb-8 text-center">
        <h1 className="font-headline text-4xl font-bold text-primary">
          {t('productsPage.titleDog')}
        </h1>
        <p className="text-lg text-foreground/80 mt-2">
          {t('productsPage.subtitleDog')}
        </p>
      </div>

      <div className="grid md:grid-cols-[280px_1fr] gap-8 items-start">
        <aside className={`${showFilters ? 'block' : 'hidden'} md:block md:sticky md:top-24`}>
          <FilterSidebar 
            filters={filters}
            setFilters={setFilters}
            dynamicOptions={dynamicOptions}
            resetFilters={resetFilters}
            t={t}
          />
        </aside>

        <main>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-card rounded-lg shadow mb-8">
            <form onSubmit={handleSearchSubmit} className="flex-grow w-full sm:w-auto">
              <div className="relative">
                <Input
                  id="search"
                  type="text"
                  placeholder={t('productsPage.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-11"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            </form>
            <div className="w-full sm:w-auto sm:min-w-[200px]">
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger id="sort" className="h-11">
                  <SelectValue placeholder={t('productsPage.selectSortBy')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name-asc">{t('productsPage.sortNameAsc')}</SelectItem>
                  <SelectItem value="name-desc">{t('productsPage.sortNameDesc')}</SelectItem>
                  <SelectItem value="price-asc">{t('productsPage.sortPriceAsc')}</SelectItem>
                  <SelectItem value="price-desc">{t('productsPage.sortPriceDesc')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div className="md:hidden">
              <Button onClick={() => setShowFilters(!showFilters)} variant="outline" className="w-full h-11">
                <Filter className="mr-2 h-4 w-4" /> {showFilters ? t('productsPage.hideFilters') : t('productsPage.showFilters')}
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {(dynamicOptions.categories as string[]).map(cat => (
              <Button 
                key={cat}
                variant={filters.category === cat ? 'default' : 'outline'}
                onClick={() => setFilters({...filters, category: cat})}
              >
                {cat === 'all' ? t('productsPage.allCategories') : cat}
              </Button>
            ))}
          </div>

          {filteredAndSortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredAndSortedProducts.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-xl text-muted-foreground">{t('productsPage.noProductsFound')}</p>
              <Button variant="link" onClick={resetFilters} className="mt-4">{t('productsPage.clearFiltersTryAgain')}</Button>
            </div>
          )}
        </main>
      </div>
    </SiteLayout>
  );
}
