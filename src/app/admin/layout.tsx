
"use client"; // SidebarProvider and useSidebar require client context

import type React from 'react';
import Link from 'next/link';
import { LayoutDashboard, ShoppingCart, Users, Settings, Package, ListOrdered, PanelLeft } from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar'; // Ensure path is correct for sidebar
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

// Mock admin auth check
const isAdminAuthenticated = () => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('authToken');
        const email = localStorage.getItem('userEmail');
        // Simple check: if user is admin@ecoshop.md
        return token && email === 'admin@ecoshop.md';
    }
    return false;
};


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
      const authStatus = isAdminAuthenticated();
      setIsAuthenticated(authStatus);
      if (!authStatus) {
          toast({ title: "Access Denied", description: "You need admin privileges to access this page.", variant: "destructive" });
          router.push('/login?redirect=/admin');
      }
  }, [router, toast]);

  if (!isAuthenticated) {
      return (
          <div className="flex min-h-screen items-center justify-center">
              <p>Redirecting to login...</p>
          </div>
      );
  }


  const adminNavItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/products', label: 'Products', icon: Package },
    { href: '/admin/orders', label: 'Orders', icon: ListOrdered },
    // { href: '/admin/users', label: 'Users', icon: Users },
    // { href: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <SidebarProvider defaultOpen>
      <Sidebar collapsible="icon" className="border-r">
        <SidebarHeader className="p-4">
          <Link href="/admin" className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
            <ShoppingCart className="h-6 w-6 text-primary" />
            <span className="font-headline text-xl font-semibold group-data-[collapsible=icon]:hidden">Admin Panel</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {adminNavItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                  <SidebarMenuButton
                    isActive={pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))}
                    tooltip={{ children: item.label, side: 'right', align: 'center' }}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-2">
           <Link href="/">
              <SidebarMenuButton
                tooltip={{ children: "Back to Site", side: 'right', align: 'center' }}
              >
                <PanelLeft className="h-5 w-5 rotate-180" />
                <span className="group-data-[collapsible=icon]:hidden">Back to Site</span>
              </SidebarMenuButton>
            </Link>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur px-6">
            <div className="flex items-center">
                 <SidebarTrigger className="md:hidden mr-2"/> {/* Mobile toggle */}
                <h2 className="text-xl font-semibold">{adminNavItems.find(item => pathname.startsWith(item.href))?.label || 'Dashboard'}</h2>
            </div>
            <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Admin User</span>
                <Avatar className="h-8 w-8">
                    <AvatarImage src="https://placehold.co/40x40.png" alt="Admin Avatar" data-ai-hint="person avatar" />
                    <AvatarFallback>AD</AvatarFallback>
                </Avatar>
            </div>
        </header>
        <main className="flex-1 p-6 bg-muted/30 min-h-[calc(100vh-4rem)]">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
