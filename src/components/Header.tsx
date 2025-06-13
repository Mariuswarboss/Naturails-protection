
"use client";

import Link from 'next/link';
import { ShoppingBag, User, Search, Menu, Languages } from 'lucide-react';
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
import { useState } from 'react';

export default function Header() {
  const { itemCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('EN'); // Default to English

  // Mocked auth state
  const isAuthenticated = false; // Replace with actual auth check
  const user = isAuthenticated ? { name: 'Alex' } : null; // Replace with actual user data

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    // { href: '/about', label: 'About Us' }, // Example additional link
    // { href: '/contact', label: 'Contact' }, // Example additional link
  ];

  const NavLinksComponent = ({ mobile = false }: { mobile?: boolean }) => (
    <nav className={`flex ${mobile ? 'flex-col space-y-2 p-4' : 'space-x-4 items-center'}`}>
      {navLinks.map(link => (
        <Link
          key={link.href}
          href={link.href}
          onClick={() => mobile && setIsMobileMenuOpen(false)}
          className={`text-sm font-medium transition-colors hover:text-primary ${mobile ? 'block py-2' : ''}`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );

  const LanguageSwitcherDropdown = ({ mobile = false }: { mobile?: boolean }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {mobile ? (
          <Button variant="outline" className="w-full justify-between mt-2">
            <span>
              {selectedLanguage === 'EN' ? 'English (EN)' : selectedLanguage === 'RO' ? 'Română (RO)' : 'Русский (RU)'}
            </span>
            <Languages className="h-4 w-4" />
          </Button>
        ) : (
          <Button variant="ghost" size="icon" aria-label={`Select Language: ${selectedLanguage}`}>
            <Languages className="h-5 w-5" />
             {/* Optional: Display current language code
            <span className="ml-1 text-xs">{selectedLanguage}</span>
            */}
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={mobile ? "w-[calc(300px-2rem)] sm:w-[calc(400px-2rem)]" : ""}>
        <DropdownMenuItem onSelect={() => { setSelectedLanguage('EN'); if (mobile) setIsMobileMenuOpen(false); }}>
          English (EN)
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => { setSelectedLanguage('RO'); if (mobile) setIsMobileMenuOpen(false); }}>
          Română (RO)
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => { setSelectedLanguage('RU'); if (mobile) setIsMobileMenuOpen(false); }}>
          Русский (RU)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-headline text-xl font-bold text-primary">Natural Protection</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 items-center justify-start">
          <NavLinksComponent />
        </div>

        <div className="flex items-center space-x-1 md:space-x-2">
          <div className="relative hidden sm:block">
            <Input type="search" placeholder="Search products..." className="h-9 w-full sm:w-64 pl-8" />
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>

          {/* Language Switcher - Desktop */}
          <div className="hidden md:block">
            <LanguageSwitcherDropdown />
          </div>

          <Link href="/cart" className="relative">
            <Button variant="ghost" size="icon" aria-label="Shopping Cart">
              <ShoppingBag className="h-5 w-5" />
            </Button>
            {itemCount > 0 && (
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 justify-center rounded-full p-0 text-xs">
                {itemCount}
              </Badge>
            )}
          </Link>

          {user ? (
            <Link href="/account">
              <Button variant="ghost" size="icon" aria-label="My Account">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button variant="outline" size="sm">Login</Button>
            </Link>
          )}

          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="p-4 flex flex-col h-full">
                  <Link href="/" className="mb-4 flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
                    <span className="font-headline text-lg font-bold text-primary">Natural Protection</span>
                  </Link>
                  <div className="relative mb-4">
                    <Input type="search" placeholder="Search products..." className="h-9 w-full pl-8" />
                    <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                  <div className="flex-grow">
                    <NavLinksComponent mobile />
                  </div>
                  <div className="mt-auto border-t pt-4">
                    <h3 className="mb-1 text-xs font-medium text-muted-foreground">Language</h3>
                    <LanguageSwitcherDropdown mobile />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
