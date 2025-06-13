"use client";

import Link from 'next/link';
import { ShoppingBag, User, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/hooks/useCart';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

export default function Header() {
  const { itemCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        <Link key={link.href} href={link.href} legacyBehavior>
          <a 
            onClick={() => mobile && setIsMobileMenuOpen(false)}
            className={`text-sm font-medium transition-colors hover:text-primary ${mobile ? 'block py-2' : ''}`}
          >
            {link.label}
          </a>
        </Link>
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" legacyBehavior>
          <a className="mr-6 flex items-center space-x-2">
            <span className="font-headline text-xl font-bold text-primary">EcoShop Moldova</span>
          </a>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 items-center justify-start">
          <NavLinksComponent />
        </div>
        
        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="relative hidden sm:block">
            <Input type="search" placeholder="Search products..." className="h-9 w-full sm:w-64 pl-8" />
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>

          <Link href="/cart" legacyBehavior>
            <a className="relative">
              <Button variant="ghost" size="icon" aria-label="Shopping Cart">
                <ShoppingBag className="h-5 w-5" />
              </Button>
              {itemCount > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 justify-center rounded-full p-0 text-xs">
                  {itemCount}
                </Badge>
              )}
            </a>
          </Link>

          {user ? (
            <Link href="/account" legacyBehavior>
              <a>
                <Button variant="ghost" size="icon" aria-label="My Account">
                  <User className="h-5 w-5" />
                </Button>
              </a>
            </Link>
          ) : (
            <Link href="/login" legacyBehavior>
              <a>
                <Button variant="outline" size="sm">Login</Button>
              </a>
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
                <div className="p-4">
                  <Link href="/" legacyBehavior>
                    <a className="mb-4 flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
                      <span className="font-headline text-lg font-bold text-primary">EcoShop Moldova</span>
                    </a>
                  </Link>
                  <div className="relative mb-4">
                    <Input type="search" placeholder="Search products..." className="h-9 w-full pl-8" />
                    <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                  <NavLinksComponent mobile />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
