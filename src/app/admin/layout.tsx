
"use client"; 

import type React from 'react';
import Link from 'next/link';
import { LayoutDashboard, Settings, Package, PanelLeft, User } from 'lucide-react';
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
} from '@/components/ui/sidebar'; 
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/contexts/LanguageContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { t } = useTranslation();

  const adminNavItems = [
    { href: '/admin', labelKey: 'admin.dashboard', icon: LayoutDashboard },
    { href: '/admin/products', labelKey: 'admin.products', icon: Package },
    { href: '/admin/orders', labelKey: 'admin.orders', icon: User },
  ];

  return (
    <SidebarProvider defaultOpen>
      <Sidebar collapsible="icon" className="border-r">
        <SidebarHeader className="p-4">
          <Link href="/admin" className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
            <Package className="h-6 w-6 text-primary" />
            <span className="font-headline text-xl font-semibold group-data-[collapsible=icon]:hidden">{t('admin.adminPanel')}</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {adminNavItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                  <SidebarMenuButton
                    isActive={pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))}
                    tooltip={{ children: t(item.labelKey), side: 'right', align: 'center' }}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="group-data-[collapsible=icon]:hidden">{t(item.labelKey)}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-2">
           <Link href="/">
              <SidebarMenuButton
                tooltip={{ children: t('admin.backToSite'), side: 'right', align: 'center' }}
              >
                <PanelLeft className="h-5 w-5 rotate-180" />
                <span className="group-data-[collapsible=icon]:hidden">{t('admin.backToSite')}</span>
              </SidebarMenuButton>
            </Link>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur px-6">
            <div className="flex items-center">
                 <SidebarTrigger className="md:hidden mr-2"/>
                <h2 className="text-xl font-semibold">{t(adminNavItems.find(item => pathname.startsWith(item.href))?.labelKey || 'admin.dashboard')}</h2>
            </div>
            <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">{t('admin.adminUser')}</span>
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
