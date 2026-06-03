"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronDown, Languages, Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { useTranslation } from '@/contexts/LanguageContext';
import { useRouter } from 'next/navigation';

type LocalizedLabel = {
  RO: string;
  RU: string;
};

type MegaMenuSection = {
  title: LocalizedLabel;
  items: {
    label: LocalizedLabel;
    href: string;
  }[];
};

const createProductsHref = (params: Record<string, string>) => {
  const searchParams = new URLSearchParams(params);
  return `/products?${searchParams.toString()}`;
};

const menuContent: Record<'food' | 'cosmetics', MegaMenuSection[]> = {
  food: [
    {
      title: { RO: 'Hrană uscată', RU: 'Сухой корм' },
      items: [
        { label: { RO: 'Toată hrana uscată', RU: 'Весь сухой корм' }, href: createProductsHref({ category: 'Dry Food' }) },
        { label: { RO: 'Junior', RU: 'Для юниоров' }, href: createProductsHref({ category: 'Food', lifestage: 'Junior' }) },
        { label: { RO: 'Adult', RU: 'Для взрослых' }, href: createProductsHref({ category: 'Food', lifestage: 'Adult' }) },
        { label: { RO: 'Blană albă', RU: 'Белая шерсть' }, href: createProductsHref({ category: 'Food', coatColor: 'White' }) },
        { label: { RO: 'Blană roșie', RU: 'Рыжая шерсть' }, href: createProductsHref({ category: 'Food', coatColor: 'Red' }) },
      ],
    },
    {
      title: { RO: 'Hrană umedă', RU: 'Влажный корм' },
      items: [
        { label: { RO: 'Toată hrana umedă', RU: 'Весь влажный корм' }, href: createProductsHref({ category: 'Wet Food' }) },
        { label: { RO: 'Pouch pentru câini', RU: 'Паучи для собак' }, href: createProductsHref({ category: 'Wet Food' }) },
        { label: { RO: 'Supe', RU: 'Супы' }, href: createProductsHref({ category: 'Wet Food' }) },
      ],
    },
    {
      title: { RO: 'Gustări', RU: 'Лакомства' },
      items: [
        { label: { RO: 'Toate gustările', RU: 'Все лакомства' }, href: createProductsHref({ category: 'Snacks' }) },
        { label: { RO: 'Pentru piele și blană', RU: 'Для кожи и шерсти' }, href: createProductsHref({ category: 'Snacks', purpose: 'Skin & Coat' }) },
        { label: { RO: 'Pentru digestie', RU: 'Для пищеварения' }, href: createProductsHref({ category: 'Snacks', purpose: 'Digestion' }) },
      ],
    },
    {
      title: { RO: 'Colecții', RU: 'Коллекции' },
      items: [
        { label: { RO: 'Toată hrana', RU: 'Весь корм' }, href: createProductsHref({ category: 'Food' }) },
        { label: { RO: 'Superior Care White Dogs', RU: 'Superior Care White Dogs' }, href: createProductsHref({ category: 'Food', coatColor: 'White' }) },
        { label: { RO: 'Superior Care Red Coat', RU: 'Superior Care Red Coat' }, href: createProductsHref({ category: 'Food', coatColor: 'Red' }) },
      ],
    },
  ],
  cosmetics: [
    {
      title: { RO: 'Îngrijire blană', RU: 'Уход за шерстью' },
      items: [
        { label: { RO: 'Șampon', RU: 'Шампунь' }, href: createProductsHref({ category: 'Shampoo' }) },
        { label: { RO: 'Mască', RU: 'Маска' }, href: createProductsHref({ category: 'Mask' }) },
        { label: { RO: 'Balsam', RU: 'Кондиционер' }, href: createProductsHref({ category: 'Conditioner' }) },
        { label: { RO: 'Balsam nas și lăbuțe', RU: 'Бальзам для носа и лап' }, href: createProductsHref({ category: 'Balm' }) },
      ],
    },
    {
      title: { RO: 'Îngrijire piele', RU: 'Уход за кожей' },
      items: [
        { label: { RO: 'Pudră', RU: 'Пудра' }, href: createProductsHref({ category: 'Care Powder' }) },
        { label: { RO: 'Mist / spray', RU: 'Спрей' }, href: createProductsHref({ category: 'Care Mist' }) },
        { label: { RO: 'Uleiuri', RU: 'Масла' }, href: createProductsHref({ category: 'Care Oil' }) },
        { label: { RO: 'Elixir', RU: 'Эликсир' }, href: createProductsHref({ category: 'Care Elixir' }) },
      ],
    },
    {
      title: { RO: 'Igienă', RU: 'Гигиена' },
      items: [
        { label: { RO: 'Dental', RU: 'Дентальный уход' }, href: createProductsHref({ category: 'Dental' }) },
        { label: { RO: 'Toate cosmeticele', RU: 'Вся косметика' }, href: createProductsHref({ category: 'Cosmetics' }) },
      ],
    },
  ],
};

Object.assign(menuContent, {
  food: [
    {
      title: { RO: 'Câini', RU: 'Собаки' },
      items: [
        { label: { RO: 'Toată hrana pentru câini', RU: 'Весь корм для собак' }, href: createProductsHref({ category: 'Food', productFor: 'dog' }) },
        { label: { RO: 'Hrană uscată câini', RU: 'Сухой корм для собак' }, href: createProductsHref({ category: 'Dry Food', productFor: 'dog' }) },
        { label: { RO: 'Hrană umedă câini', RU: 'Влажный корм для собак' }, href: createProductsHref({ category: 'Wet Food', productFor: 'dog' }) },
        { label: { RO: 'Gustări câini', RU: 'Лакомства для собак' }, href: createProductsHref({ category: 'Snacks', productFor: 'dog' }) },
      ],
    },
    {
      title: { RO: 'Câini - nevoi', RU: 'Собаки - потребности' },
      items: [
        { label: { RO: 'Junior', RU: 'Юниоры' }, href: createProductsHref({ category: 'Food', productFor: 'dog', lifestage: 'Junior' }) },
        { label: { RO: 'Adult', RU: 'Взрослые' }, href: createProductsHref({ category: 'Food', productFor: 'dog', lifestage: 'Adult' }) },
        { label: { RO: 'Blană albă', RU: 'Белая шерсть' }, href: createProductsHref({ category: 'Food', productFor: 'dog', coatColor: 'White' }) },
        { label: { RO: 'Blană roșie', RU: 'Рыжая шерсть' }, href: createProductsHref({ category: 'Food', productFor: 'dog', coatColor: 'Red' }) },
      ],
    },
    {
      title: { RO: 'Pisici', RU: 'Кошки' },
      items: [
        { label: { RO: 'Toată hrana pentru pisici', RU: 'Весь корм для кошек' }, href: createProductsHref({ category: 'Food', productFor: 'cat' }) },
        { label: { RO: 'Hrană uscată pisici', RU: 'Сухой корм для кошек' }, href: createProductsHref({ category: 'Dry Food', productFor: 'cat' }) },
        { label: { RO: 'Hrană umedă pisici', RU: 'Влажный корм для кошек' }, href: createProductsHref({ category: 'Wet Food', productFor: 'cat' }) },
        { label: { RO: 'Sterilised', RU: 'Sterilised' }, href: createProductsHref({ category: 'Food', productFor: 'cat', purpose: 'Sterilised' }) },
        { label: { RO: 'Urinary', RU: 'Urinary' }, href: createProductsHref({ category: 'Food', productFor: 'cat', purpose: 'Urinary' }) },
      ],
    },
    {
      title: { RO: 'Tipuri', RU: 'Типы' },
      items: [
        { label: { RO: 'Pouch pentru câini', RU: 'Паучи для собак' }, href: createProductsHref({ category: 'Wet Food', productFor: 'dog', format: 'Pouch' }) },
        { label: { RO: 'Supe pentru câini', RU: 'Супы для собак' }, href: createProductsHref({ category: 'Wet Food', productFor: 'dog', format: 'Soup' }) },
        { label: { RO: 'Pentru piele și blană', RU: 'Для кожи и шерсти' }, href: createProductsHref({ category: 'Snacks', productFor: 'dog', purpose: 'Skin & Coat' }) },
        { label: { RO: 'Pentru digestie', RU: 'Для пищеварения' }, href: createProductsHref({ category: 'Snacks', productFor: 'dog', purpose: 'Digestion' }) },
      ],
    },
    {
      title: { RO: 'Colecții', RU: 'Коллекции' },
      items: [
        { label: { RO: 'Toată hrana', RU: 'Весь корм' }, href: createProductsHref({ category: 'Food' }) },
        { label: { RO: 'Superior Care White Dogs', RU: 'Superior Care White Dogs' }, href: createProductsHref({ category: 'Food', productFor: 'dog', coatColor: 'White' }) },
        { label: { RO: 'Superior Care Red Coat', RU: 'Superior Care Red Coat' }, href: createProductsHref({ category: 'Food', productFor: 'dog', coatColor: 'Red' }) },
        { label: { RO: 'Veterinary Diet', RU: 'Veterinary Diet' }, href: createProductsHref({ category: 'Dry Food', productFor: 'dog', purpose: 'Gastrointestinal' }) },
      ],
    },
  ],
  cosmetics: [
    {
      title: { RO: 'Pentru câini', RU: 'Для собак' },
      items: [
        { label: { RO: 'Toate cosmeticele pentru câini', RU: 'Вся косметика для собак' }, href: createProductsHref({ category: 'Cosmetics', productFor: 'dog' }) },
        { label: { RO: 'Șampon pentru câini', RU: 'Шампунь для собак' }, href: createProductsHref({ category: 'Shampoo', productFor: 'dog' }) },
        { label: { RO: 'Balsam pentru câini', RU: 'Кондиционер для собак' }, href: createProductsHref({ category: 'Conditioner', productFor: 'dog' }) },
        { label: { RO: 'Spray / Mist', RU: 'Спрей / Mist' }, href: createProductsHref({ category: 'Care Mist', productFor: 'dog' }) },
      ],
    },
    {
      title: { RO: 'Pentru pisici', RU: 'Для кошек' },
      items: [
        { label: { RO: 'Toate cosmeticele pentru pisici', RU: 'Вся косметика для кошек' }, href: createProductsHref({ category: 'Cosmetics', productFor: 'cat' }) },
        { label: { RO: 'Șampon pentru pisici', RU: 'Шампунь для кошек' }, href: createProductsHref({ category: 'Shampoo', productFor: 'cat' }) },
        { label: { RO: 'Balsam pentru pisici', RU: 'Кондиционер для кошек' }, href: createProductsHref({ category: 'Conditioner', productFor: 'cat' }) },
        { label: { RO: 'Piele sensibilă', RU: 'Чувствительная кожа' }, href: createProductsHref({ category: 'Conditioner', productFor: 'cat', purpose: 'Sensitive Care' }) },
      ],
    },
    {
      title: { RO: 'Îngrijire blană', RU: 'Уход за шерстью' },
      items: [
        { label: { RO: 'Șampon', RU: 'Шампунь' }, href: createProductsHref({ category: 'Shampoo' }) },
        { label: { RO: 'Mască', RU: 'Маска' }, href: createProductsHref({ category: 'Mask' }) },
        { label: { RO: 'Conditioner', RU: 'Кондиционер' }, href: createProductsHref({ category: 'Conditioner' }) },
        { label: { RO: 'Balsam nas și lăbuțe', RU: 'Бальзам для носа и лап' }, href: createProductsHref({ category: 'Balm' }) },
      ],
    },
    {
      title: { RO: 'Îngrijire piele', RU: 'Уход за кожей' },
      items: [
        { label: { RO: 'Pudră', RU: 'Пудра' }, href: createProductsHref({ category: 'Care Powder' }) },
        { label: { RO: 'Mist / spray', RU: 'Спрей' }, href: createProductsHref({ category: 'Care Mist' }) },
        { label: { RO: 'Uleiuri', RU: 'Масла' }, href: createProductsHref({ category: 'Care Oil' }) },
        { label: { RO: 'Elixir', RU: 'Эликсир' }, href: createProductsHref({ category: 'Care Elixir' }) },
        { label: { RO: 'Dental', RU: 'Дентальный уход' }, href: createProductsHref({ category: 'Dental' }) },
      ],
    },
  ],
} satisfies Record<'food' | 'cosmetics', MegaMenuSection[]>);

export default function HeaderClient() {
  const { language, setLanguage, t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<'food' | 'cosmetics' | null>(null);
  const logoUrl = "/logo.png";
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const currentLanguage = language.toUpperCase() === 'RO' ? 'RO' : 'RU';
  const localize = (label: LocalizedLabel) => label[currentLanguage];

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
        router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
        if (isMobileMenuOpen) {
            setIsMobileMenuOpen(false);
        }
    }
  };

  const renderMegaMenuItems = (type: 'food' | 'cosmetics', mobile = false) => (
    <div
      className={
        mobile
          ? 'space-y-5'
          : `grid gap-x-10 gap-y-8 ${type === 'food' ? 'grid-cols-5' : 'grid-cols-4'}`
      }
    >
      {menuContent[type].map((section) => (
        <div key={localize(section.title)}>
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-primary">
            {localize(section.title)}
          </p>
          <div className="space-y-2">
            {section.items.map((item) => (
              <Link
                key={`${localize(section.title)}-${localize(item.label)}`}
                href={item.href}
                onClick={() => {
                  setActiveMegaMenu(null);
                  if (mobile) setIsMobileMenuOpen(false);
                }}
                className="group flex items-center justify-between gap-3 rounded-md py-1.5 text-sm font-semibold text-foreground transition-colors hover:text-primary"
              >
                <span>{localize(item.label)}</span>
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const DesktopNav = () => (
    <div className="hidden lg:flex flex-1 items-center justify-center">
      <nav className="flex items-center gap-5 xl:gap-7">
        <Link
          href="/"
          className="py-2 text-sm font-semibold transition-colors hover:text-primary"
          onMouseEnter={() => setActiveMegaMenu(null)}
        >
          {t('header.home')}
        </Link>
        <button
          type="button"
          onMouseEnter={() => setActiveMegaMenu('food')}
          onClick={() => setActiveMegaMenu(activeMegaMenu === 'food' ? null : 'food')}
          className={`flex items-center gap-1 py-2 text-sm font-semibold transition-colors hover:text-primary ${activeMegaMenu === 'food' ? 'text-primary' : ''}`}
        >
          {t('header.food')}
          <ChevronDown className={`h-4 w-4 transition-transform ${activeMegaMenu === 'food' ? 'rotate-180' : ''}`} />
        </button>
        <button
          type="button"
          onMouseEnter={() => setActiveMegaMenu('cosmetics')}
          onClick={() => setActiveMegaMenu(activeMegaMenu === 'cosmetics' ? null : 'cosmetics')}
          className={`flex items-center gap-1 py-2 text-sm font-semibold transition-colors hover:text-primary ${activeMegaMenu === 'cosmetics' ? 'text-primary' : ''}`}
        >
          {t('header.cosmetics')}
          <ChevronDown className={`h-4 w-4 transition-transform ${activeMegaMenu === 'cosmetics' ? 'rotate-180' : ''}`} />
        </button>
        <Link
          href="/products"
          onMouseEnter={() => setActiveMegaMenu(null)}
          className="py-2 text-sm font-semibold transition-colors hover:text-primary"
        >
          {t('header.allProducts')}
        </Link>
        <Link
          href="/contact"
          onMouseEnter={() => setActiveMegaMenu(null)}
          className="py-2 text-sm font-semibold transition-colors hover:text-primary"
        >
          {t('footer.contactUs')}
        </Link>
      </nav>
    </div>
  );

  const MobileMenu = () => (
    <div className="space-y-5">
      <Link
        href="/"
        onClick={() => setIsMobileMenuOpen(false)}
        className="block rounded-md py-2 text-lg font-semibold"
      >
        {t('header.home')}
      </Link>
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="food">
          <AccordionTrigger className="py-3 text-lg font-semibold no-underline hover:no-underline">
            {t('header.food')}
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            {renderMegaMenuItems('food', true)}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="cosmetics">
          <AccordionTrigger className="py-3 text-lg font-semibold no-underline hover:no-underline">
            {t('header.cosmetics')}
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            {renderMegaMenuItems('cosmetics', true)}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Link
        href="/products"
        onClick={() => setIsMobileMenuOpen(false)}
        className="block rounded-md py-2 text-lg font-semibold"
      >
        {t('header.allProducts')}
      </Link>
      <Link
        href="/contact"
        onClick={() => setIsMobileMenuOpen(false)}
        className="block rounded-md py-2 text-lg font-semibold"
      >
        {t('footer.contactUs')}
      </Link>
    </div>
  );

  const LanguageSwitcherDropdown = ({ mobile = false }: { mobile?: boolean }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={mobile ? "outline" : "ghost"} size={mobile ? "default" : "icon"} className={`${mobile ? 'w-full justify-start text-left py-2 px-3' : 'px-2'}`}>
          <Languages className={`h-5 w-5 ${mobile ? 'mr-2': ''}`} />
          <span className={mobile ? '' : 'sr-only'}>{language}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={mobile ? "w-[calc(100%-2rem)]" : ""}>
        <DropdownMenuItem onSelect={() => handleLanguageChange('RO')}>
          {t('languages.ro')}
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleLanguageChange('RU')}>
          {t('languages.ru')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <header
      onMouseLeave={() => setActiveMegaMenu(null)}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm"
    >
      <div className="container flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="mr-2 flex items-center shrink-0">
          <Image
            src={logoUrl}
            alt={t('header.siteTitle')}
            width={240}
            height={78}
            className="h-10 w-auto object-contain md:h-14"
            data-ai-hint="company logo"
            priority
          />
        </Link>

        <DesktopNav />

        <div className="flex items-center space-x-1 sm:space-x-2">
          <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
            <Input 
              type="search" 
              placeholder={t('header.searchPlaceholder')} 
              className="h-9 w-full sm:w-32 lg:w-48 pl-9 pr-3 rounded-full border-border focus:border-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </form>
          
          <LanguageSwitcherDropdown />

          <div className="lg:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">{t('header.toggleMenu')}</span>
                </Button>
              </SheetTrigger>
              <SheetContent onOpenAutoFocus={(e) => e.preventDefault()} side="right" className="w-[92vw] max-w-[420px] p-0 flex flex-col">
                <div className="p-4 border-b">
                  <Link href="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                     <Image
                        src={logoUrl}
                        alt={t('header.siteTitle')}
                        width={240} 
                        height={78}
                        className="h-12 w-auto object-contain"
                        data-ai-hint="company logo"
                        priority
                      />
                  </Link>
                </div>
                <div className="p-4 flex-grow overflow-y-auto">
                  <form onSubmit={handleSearchSubmit} className="relative mb-6">
                    <Input 
                        type="search" 
                        placeholder={t('header.searchPlaceholder')} 
                        className="h-10 w-full pl-10 pr-4 rounded-full border-border focus:border-primary"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  </form>
                  <MobileMenu />
                </div>
                <div className="p-4 border-t mt-auto flex items-center justify-between">
                  <LanguageSwitcherDropdown mobile />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      {activeMegaMenu && (
        <div
          onMouseEnter={() => setActiveMegaMenu(activeMegaMenu)}
          className="hidden border-t bg-background shadow-lg lg:block"
        >
          <div className="mx-auto max-w-7xl px-8 py-8 xl:px-12">
            {renderMegaMenuItems(activeMegaMenu)}
          </div>
        </div>
      )}
    </header>
  );
}
