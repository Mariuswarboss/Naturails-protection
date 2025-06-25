
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Search, Menu, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { useTranslation } from '@/contexts/LanguageContext';
import { useRouter } from 'next/navigation';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';


export default function Header() {
  const { language, setLanguage, t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const logoUrl = "https://elpida-varna.bg/shop/image/cache/catalog/brand/logo_bg-1500x1500.png";
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

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

  const navLinks = [
    { href: '/', labelKey: 'header.home' },
    { href: '/products', labelKey: 'header.allProducts' },
    { href: '/contact', labelKey: 'footer.contactUs' },
  ];

  const NavLinksComponent = ({ mobile = false }: { mobile?: boolean }) => (
    <nav className={`flex ${mobile ? 'flex-col space-y-2 p-4' : 'space-x-6 items-center'}`}>
      {navLinks.map(link => (
        <Link
          key={link.href}
          href={link.href}
          onClick={() => mobile && setIsMobileMenuOpen(false)}
          className={`text-sm font-medium transition-colors hover:text-primary ${mobile ? 'block py-2 text-lg' : 'py-2'}`}
        >
          {t(link.labelKey)}
        </Link>
      ))}
    </nav>
  );

  const LanguageSwitcherDropdown = ({ mobile = false }: { mobile?: boolean }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={mobile ? "outline" : "ghost"} size={mobile ? "default" : "sm"} className={`${mobile ? 'w-full justify-start text-left py-2 px-3' : 'px-2'}`}>
          <Languages className={`h-5 w-5 ${mobile ? 'mr-2': ''}`} />
          <span className={mobile ? '' : 'hidden sm:inline ml-1'}>{language}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={mobile ? "w-[calc(100%-2rem)]" : ""}>
        <DropdownMenuItem onSelect={() => handleLanguageChange('EN')}>
          {t('languages.en')}
        </DropdownMenuItem>
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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="mr-4 flex items-center">
          <Image
            src={logoUrl}
            alt={t('header.siteTitle')}
            width={225}
            height={65}
            className="object-contain h-16 w-auto"
            data-ai-hint="company logo"
            priority
          />
        </Link>

        <div className="hidden lg:flex flex-1 items-center justify-center">
          <NavLinksComponent />
        </div>

        <div className="flex items-center space-x-2">
          <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
            <Input 
              type="search" 
              placeholder={t('header.searchPlaceholder')} 
              className="h-10 w-full sm:w-48 lg:w-64 pl-10 pr-4 rounded-full border-border focus:border-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </form>
          
          <div className="hidden md:block">
            <LanguageSwitcherDropdown />
          </div>

          <ThemeSwitcher />

          <div className="lg:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">{t('header.toggleMenu')}</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0 flex flex-col">
                <div className="p-4 border-b">
                  <Link href="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                     <Image
                        src={logoUrl}
                        alt={t('header.siteTitle')}
                        width={170} 
                        height={50}
                        className="object-contain h-12 w-auto"
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
                  <NavLinksComponent mobile />
                </div>
                <div className="p-4 border-t mt-auto flex items-center justify-between">
                  <LanguageSwitcherDropdown mobile />
                  <ThemeSwitcher />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
