
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, Users, ShoppingCart } from "lucide-react";
import { useTranslation } from '@/contexts/LanguageContext';

export default function AdminDashboardPage() {
  const { t } = useTranslation();

  const stats = [
    { titleKey: "admin.totalRevenue", value: "$12,345", icon: DollarSign, change: "+5.2%" },
    { titleKey: "admin.totalOrders", value: "230", icon: ShoppingCart, change: "+10" },
    { titleKey: "admin.totalProducts", value: "6", icon: Package, change: "+1" },
    { titleKey: "admin.activeUsers", value: "150", icon: Users, change: "-2" },
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
