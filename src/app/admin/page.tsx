
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, Users, ShoppingCart } from "lucide-react";
import { useTranslation } from '@/contexts/LanguageContext';
import { mockProducts, mockOrders, mockUsers } from "@/lib/data"; // Import mockData

export default function AdminDashboardPage() {
  const { t } = useTranslation();

  // Calculate dynamic stats
  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalOrdersCount = mockOrders.length;
  const totalProductsCount = mockProducts.length; 
  const activeUsersCount = mockUsers.filter(user => user.email !== 'admin@ecoshop.md').length; // Example: non-admin users

  const stats = [
    { titleKey: "admin.totalRevenue", value: `$${totalRevenue.toFixed(2)}`, icon: DollarSign, change: "+5.2%" }, // Change is mock
    { titleKey: "admin.totalOrders", value: totalOrdersCount.toString(), icon: ShoppingCart, change: "+10" }, // Change is mock
    { titleKey: "admin.totalProducts", value: totalProductsCount.toString(), icon: Package, change: "+1" }, // Change is mock, value is dynamic
    { titleKey: "admin.activeUsers", value: activeUsersCount.toString(), icon: Users, change: "-2" }, // Change is mock
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t('admin.dashboard')}</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.titleKey}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t(stat.titleKey)}</CardTitle>
              <stat.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{t('admin.fromLastMonth', {change: stat.change})}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t('admin.recentOrders')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{t('admin.recentOrdersPlaceholder')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t('admin.quickActions')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{t('admin.quickActionsPlaceholder')}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
