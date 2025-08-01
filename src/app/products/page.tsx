
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
import { Filter, Search, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const foodCategories = ['Wet Food', 'Dry Food', 'Snacks'];
const cosmeticsCategories = ['Shampoo', 'Mask', 'Conditioner', 'Balm', 'Care Mist', 'Care Powder', 'Care Oil', 'Care Elixir', 'Dental'];


const FilterSidebar = ({
  filters,
  setFilters,
  dynamicOptions,
  resetFilters,
  t,
  mainCategory
}: {
  filters: any;
  setFilters: (filters: any) => void;
  dynamicOptions: any;
  resetFilters: () => void;
  t: (key: string, replacements?: Record<string, string | number>) => string;
  mainCategory: 'Food' | 'Cosmetics' | 'all';
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-xl">
        <Filter className="h-5 w-5" /> {t('productsPage.filterTitle')}
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      {Object.entries(dynamicOptions).map(([key, options]) => {
        if (mainCategory === 'Cosmetics') {
          if (key !== 'categories' || (options as string[]).length <= 1) return null;
        } else {
          if (key === 'categories' || (options as string[]).length <= 1) return null;
        }
       
        const labelKey = `productsPage.${key}Label`;
        const placeholderKey = `productsPage.select${key.charAt(0).toUpperCase() + key.slice(1)}`;
        
        return (
          <div key={key}>
            <label htmlFor={key} className="block text-sm font-medium text-muted-foreground mb-1">{t(labelKey)}</label>
            <Select
              value={filters[key]}
              onValueChange={(value) => setFilters({ ...filters, [key]: value })}
            >
              <SelectTrigger id={key}>
                <SelectValue placeholder={t(placeholderKey)} />
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

const Pagination = ({ currentPage, totalPages, onPageChange, t }: { currentPage: number, totalPages: number, onPageChange: (page: number) => void, t: (key: string) => string }) => {
  const handlePrevious = () => {
    onPageChange(Math.max(1, currentPage - 1));
  };

  const handleNext = () => {
    onPageChange(Math.min(totalPages, currentPage + 1));
  };

  const getPageNumbers = () => {
    const pages = new Set<number | string>();
    pages.add(1);
    if (currentPage > 3) pages.add('...');
    if (currentPage > 2) pages.add(currentPage - 1);
    if (currentPage > 1 && currentPage < totalPages) pages.add(currentPage);
    if (currentPage < totalPages - 1) pages.add(currentPage + 1);
    if (currentPage < totalPages - 2) pages.add('...');
    if (totalPages > 1) pages.add(totalPages);
    return Array.from(pages);
  };

  return (
    <div className="flex items-center justify-center space-x-1 md:space-x-2 mt-12">
      <Button variant="outline" size="icon" onClick={handlePrevious} disabled={currentPage === 1}>
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">{t('productsPage.previousPage')}</span>
      </Button>
      {getPageNumbers().map((page, index) =>
        typeof page === 'number' ? (
          <Button
            key={index}
            variant={currentPage === page ? 'default' : 'outline'}
            size="icon"
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ) : (
          <span key={index} className="px-2 py-2 text-sm">...</span>
        )
      )}
      <Button variant="outline" size="icon" onClick={handleNext} disabled={currentPage === totalPages}>
        <ChevronRight className="h-4 w-4" />
         <span className="sr-only">{t('productsPage.nextPage')}</span>
      </Button>
    </div>
  );
};


export default function ProductsPage() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  
  const allProducts = useMemo(() => mockProducts, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [appliedSearchTerm, setAppliedSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('name-asc');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

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
  const [mainCategory, setMainCategory] = useState<'Food' | 'Cosmetics' | 'all'>('all');

  useEffect(() => {
    const searchFromUrl = searchParams.get('search');
    const categoryFromUrl = searchParams.get('category');

    if (searchFromUrl) {
        setSearchTerm(searchFromUrl);
        setAppliedSearchTerm(searchFromUrl);
    }
    if (categoryFromUrl === 'Food' || categoryFromUrl === 'Cosmetics') {
      setMainCategory(categoryFromUrl);
      setFilters(initialFilters); // Reset other filters when main category changes
    } else if (categoryFromUrl) {
      setFilters(prev => ({...prev, category: categoryFromUrl}));
    } else {
      setMainCategory('all');
    }
  }, [searchParams]);

  const filteredProductsByMainCategory = useMemo(() => {
    if (mainCategory === 'Food') {
      return allProducts.filter(p => foodCategories.includes(p.category));
    }
    if (mainCategory === 'Cosmetics') {
      return allProducts.filter(p => cosmeticsCategories.includes(p.category));
    }
    return allProducts;
  }, [mainCategory, allProducts]);

  const dynamicOptions = useMemo(() => {
    const createOptions = (key: keyof Product, productSet: Product[]) => [
      'all', 
      ...Array.from(new Set(productSet.map(p => p[key]).filter(Boolean) as string[]))
    ];
    
    if (mainCategory === 'Cosmetics') {
        return {
            categories: createOptions('category', filteredProductsByMainCategory)
        };
    }

    if (mainCategory === 'Food') {
        return {
            categories: createOptions('category', filteredProductsByMainCategory),
            breedSize: createOptions('breedSize', filteredProductsByMainCategory),
            lifestage: createOptions('lifestage', filteredProductsByMainCategory),
            flavour: createOptions('flavour', filteredProductsByMainCategory),
            purpose: createOptions('purpose', filteredProductsByMainCategory),
            coatColor: createOptions('coatColor', filteredProductsByMainCategory),
            weight: ['all', ...Array.from(new Set(filteredProductsByMainCategory.map(p => p.weight).filter(Boolean))).sort((a,b) => a! - b!).map(String)]
        };
    }

    return {
      categories: createOptions('category', filteredProductsByMainCategory),
    }

  }, [filteredProductsByMainCategory, mainCategory]);

  const filteredAndSortedProducts = useMemo(() => {
    let products = [...filteredProductsByMainCategory];

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
  }, [appliedSearchTerm, filters, sortOption, filteredProductsByMainCategory]);
  
  useEffect(() => {
    setCurrentPage(1);
  }, [appliedSearchTerm, filters, sortOption, mainCategory]);
  
  const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, filteredAndSortedProducts]);


  const resetFilters = () => {
    setSearchTerm('');
    setAppliedSearchTerm('');
    setSortOption('name-asc');
    setFilters(initialFilters);
    setCurrentPage(1);
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedSearchTerm(searchTerm);
  };
  
  const pageTitle = mainCategory === 'Food' ? t('productsPage.titleFood') : mainCategory === 'Cosmetics' ? t('productsPage.titleCosmetics') : t('productsPage.title');
  const pageSubtitle = mainCategory === 'Food' ? t('productsPage.subtitleFood') : mainCategory === 'Cosmetics' ? t('productsPage.subtitleCosmetics') : t('productsPage.subtitle');

  return (
    <SiteLayout>
      <div className="mb-8 text-center">
        <h1 className="font-headline text-4xl font-bold text-primary">
          {pageTitle}
        </h1>
        <p className="text-lg text-foreground/80 mt-2">
          {pageSubtitle}
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
            mainCategory={mainCategory}
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
            {(dynamicOptions.categories as string[]).map(cat => {
              if (cat === 'all') return (
                <Button 
                  key={cat}
                  variant={filters.category === cat ? 'default' : 'outline'}
                  onClick={() => setFilters({...initialFilters})}
                >
                  {t('productsPage.allCategories')}
                </Button>
              )
              return (
                <Button 
                  key={cat}
                  variant={filters.category === cat ? 'default' : 'outline'}
                  onClick={() => setFilters({...filters, category: cat})}
                >
                  {cat}
                </Button>
              )
            })}
          </div>

          {paginatedProducts.length > 0 ? (
             <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {paginatedProducts.map((product: Product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
                </div>
                {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    t={t}
                />
                )}
            </>
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

  
