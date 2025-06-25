
"use client";

import { useTranslation } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminOrdersPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t('admin.orders')}</h1>
      <Card>
        <CardHeader>
          <CardTitle>{t('admin.featureRemoved')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{t('admin.ordersRemovedDescription')}</p>
        </CardContent>
      </Card>
    </div>
  );
}
