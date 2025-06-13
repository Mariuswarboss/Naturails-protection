
"use client";

import Link from 'next/link';
import { ShoppingBag, User, Search, Menu, Languages, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/hooks/useCart';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState, useEffect } from 'react';
import { useTranslation } from '@/contexts/LanguageContext';


export default function Header() {
  const { itemCount } = useCart();
  const { language, setLanguage, t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      const name = localStorage.getItem('userName');
      setIsAuthenticated(!!token);
      setUserName(name);
    }
  }, []);

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { href: '/', labelKey: 'header.home' },
    { href: '/products?type=dog', labelKey: 'header.forDogs' },
    { href: '/products?type=cat', labelKey: 'header.forCats' },
    { href: '/products', labelKey: 'header.allProducts' },
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
        <Link href="/" className="mr-4 flex items-center space-x-2">
          <ShieldCheck className="h-8 w-8 text-primary" />
          <span className="font-headline text-2xl font-bold text-primary whitespace-nowrap">{t('header.siteTitle')}</span>
        </Link>

        <div className="hidden lg:flex flex-1 items-center justify-center">
          <NavLinksComponent />
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative hidden md:block">
            <Input type="search" placeholder={t('header.searchPlaceholder')} className="h-10 w-full sm:w-48 lg:w-64 pl-10 pr-4 rounded-full border-border focus:border-primary" />
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          </div>
          
          <div className="hidden md:block">
            <LanguageSwitcherDropdown />
          </div>

          <Link href="/cart" className="relative p-2 rounded-full hover:bg-secondary transition-colors">
            <ShoppingBag className="h-6 w-6" />
            {itemCount > 0 && (
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 justify-center rounded-full p-0 text-xs">
                {itemCount}
              </Badge>
            )}
            <span className="sr-only">Shopping Cart</span>
          </Link>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-6 w-6" />
                  <span className="sr-only">{t('header.myAccount')}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {userName && <DropdownMenuItem disabled>Hi, {userName}</DropdownMenuItem>}
                <Link href="/account"><DropdownMenuItem>{t('header.myAccount')}</DropdownMenuItem></Link>
                <DropdownMenuItem onClick={() => {
                  localStorage.removeItem('authToken');
                  localStorage.removeItem('userEmail');
                  localStorage.removeItem('userName');
                  setIsAuthenticated(false);
                  setUserName(null);
                }}>{t('header.logout')}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button variant="ghost" size="sm" className="px-2 hidden sm:inline-flex">
                <User className="h-5 w-5 mr-1" /> {t('header.login')}
              </Button>
               <Button variant="ghost" size="icon" className="sm:hidden rounded-full">
                <User className="h-6 w-6" />
                 <span className="sr-only">{t('header.login')}</span>
              </Button>
            </Link>
          )}

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
                  <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
                    <ShieldCheck className="h-7 w-7 text-primary" />
                    <span className="font-headline text-xl font-bold text-primary">{t('header.siteTitle')}</span>
                  </Link>
                </div>
                <div className="p-4 flex-grow overflow-y-auto">
                  <div className="relative mb-6">
                    <Input type="search" placeholder={t('header.searchPlaceholder')} className="h-10 w-full pl-10 pr-4 rounded-full border-border focus:border-primary" />
                    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  </div>
                  <NavLinksComponent mobile />
                </div>
                <div className="p-4 border-t mt-auto">
                  <LanguageSwitcherDropdown mobile />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
