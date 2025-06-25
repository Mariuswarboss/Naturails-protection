
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package } from "lucide-react";
import { useTranslation } from '@/contexts/LanguageContext';
import { mockProducts } from "@/lib/data";

export default function AdminDashboardPage() {
  const { t } = useTranslation();

  const totalProductsCount = mockProducts.length;
  const totalRevenue = mockProducts.reduce((sum, product) => sum + product.price, 0); // Example metric

  const stats = [
    { titleKey: "admin.totalValue", value: `${totalRevenue.toFixed(2)} MDL`, icon: DollarSign, change: "+5.2%" }, // Mock change
    { titleKey: "admin.totalProducts", value: totalProductsCount.toString(), icon: Package, change: "+1" }, // Mock change
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t('admin.dashboard')}</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
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

      <div className="grid gap-6 md:grid-cols-1">
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
