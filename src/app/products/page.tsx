
"use client";

import { useState, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';
import { mockProducts } from '@/lib/data';
import type { Product } from '@/types';
import SiteLayout from '@/components/SiteLayout';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Filter, Search, X } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';

export default function ProductsPage() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortOption, setSortOption] = useState('name-asc');
  const [showFilters, setShowFilters] = useState(false);

  const categories = useMemo(() => {
    const allCategories = mockProducts.map(p => p.category);
    // Categories themselves are not translated here, they come from product data.
    // If categories need translation, they should be keyed in JSON files.
    return ['all', ...Array.from(new Set(allCategories))];
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let products = mockProducts;

    if (searchTerm) {
      products = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== 'all') {
      products = products.filter(p => p.category === categoryFilter);
    }

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
  }, [searchTerm, categoryFilter, sortOption]);
  
  const resetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setSortOption('name-asc');
  }

  const FilterControls = () => (
    <div className="space-y-4 md:space-y-0 md:flex md:flex-wrap md:items-end md:gap-4 p-4 bg-card rounded-lg shadow mb-8">
        <div className="relative flex-grow min-w-[200px]">
          <label htmlFor="search" className="block text-sm font-medium text-muted-foreground mb-1">{t('productsPage.searchLabel')}</label>
          <Input
            id="search"
            type="text"
            placeholder={t('productsPage.searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-[calc(50%+theme(spacing.1))] -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>

        <div className="flex-grow min-w-[200px]">
          <label htmlFor="category" className="block text-sm font-medium text-muted-foreground mb-1">{t('productsPage.categoryLabel')}</label>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger id="category">
              <SelectValue placeholder={t('productsPage.selectCategory')} />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>
                  {cat === 'all' ? t('productsPage.allCategories') : cat} {/* Category names from data, 'all' is translated */}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-grow min-w-[200px]">
          <label htmlFor="sort" className="block text-sm font-medium text-muted-foreground mb-1">{t('productsPage.sortByLabel')}</label>
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger id="sort">
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
        
        <Button variant="ghost" onClick={resetFilters} className="text-muted-foreground hover:text-primary">
            <X className="mr-2 h-4 w-4" /> {t('productsPage.clearFilters')}
        </Button>
      </div>
  );

  return (
    <SiteLayout>
      <div className="mb-8 text-center">
        <h1 className="font-headline text-4xl font-bold text-primary">{t('productsPage.title')}</h1>
        <p className="text-lg text-foreground/80 mt-2">{t('productsPage.subtitle')}</p>
      </div>
      
      <div className="md:hidden mb-4">
        <Button onClick={() => setShowFilters(!showFilters)} variant="outline" className="w-full">
          <Filter className="mr-2 h-4 w-4" /> {showFilters ? t('productsPage.hideFilters') : t('productsPage.showFilters')}
        </Button>
      </div>

      <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
        <FilterControls />
      </div>

      {filteredAndSortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
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
    </SiteLayout>
  );
}
