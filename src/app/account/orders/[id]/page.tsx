
"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import SiteLayout from '@/components/SiteLayout';
import { mockOrders, mockUsers } from '@/lib/data';
import type { Order, User, OrderItem } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, Package, MapPin, CalendarDays, DollarSign, Truck, Loader2 } from 'lucide-react';
import { useTranslation } from '@/contexts/LanguageContext';

const getCurrentUser = (): User | null => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('authToken');
    const email = localStorage.getItem('userEmail');
    if (token && email) {
      return mockUsers.find(u => u.email === email) || null;
    }
  }
  return null;
};

export default function OrderDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.id as string;
  const { t, language } = useTranslation(); // language for date formatting

  const [order, setOrder] = useState<Order | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      router.push('/login');
      return;
    }
    setCurrentUser(user);

    const foundOrder = mockOrders.find(o => o.id === orderId && o.userId === user.id);
    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      // If not found in mockOrders (e.g. new order made in session not yet in mockData)
      // or if orderId doesn't match pattern, consider it potentially invalid for this mock setup
      // For a real app, you'd fetch from a DB. Here, we can assume it's a newly created order
      // that isn't in our static mockOrders.
      // A better approach for a prototype with dynamic orders would be to store them in localStorage
      // or a temporary state. For now, we'll just show a simplified message or redirect.
      // console.log(`Order ${orderId} not found in mockOrders or doesn't match user.`);
      // For now, if it's not a mockOrder, it implies it might be a newly placed one
      // (though this page is designed to display from mockOrders)
      // To handle new orders, one might pass order details via route state or fetch if API existed.
      // If order ID pattern suggests it's a newly created one (e.g., starts with ECO-),
      // we could display a generic "processing" message.
      // However, without a mechanism to retrieve its details, we redirect for non-mock orders.
      if (!orderId.startsWith('ECO-')) {
         router.push('/account'); 
      } else {
        // It's a newly created order not in mockData. We can't display details yet.
        // This is a limitation of the current mock data setup.
        // For this iteration, we keep the redirect.
        // A more robust solution would involve a state management for recent orders or temporary storage.
        router.push('/account');
      }
    }
  }, [orderId, router]);

  const getLocaleForDate = () => {
    switch (language) {
      case 'RO': return 'ro-RO';
      case 'RU': return 'ru-RU';
      default: return 'en-GB';
    }
  };

  if (!currentUser || !order) {
     // Handle case for newly created orders that aren't in mockOrders
    if (currentUser && orderId && orderId.startsWith('ECO-')) {
        return (
            <SiteLayout>
                <div className="mb-6">
                    <Link href="/account" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center">
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        {t('orderDetailsPage.backToAccount')}
                    </Link>
                </div>
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl md:text-3xl">{t('orderDetailsPage.orderConfirmationTitle') || "Order Confirmation"}</CardTitle>
                        <CardDescription>{t('orderDetailsPage.orderIdLabel', {orderId: orderId})}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>{t('orderDetailsPage.orderProcessingMessage') || "Your order is being processed. Details will be available soon."}</p>
                        {/* More details could be shown here if passed via state or fetched */}
                    </CardContent>
                </Card>
            </SiteLayout>
        );
    }
    return (
        <SiteLayout>
            <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-muted-foreground">{t('loading.text')}</p>
            </div>
        </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="mb-6">
        <Link href="/account" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center">
            <ChevronLeft className="h-4 w-4 mr-1" />
            {t('orderDetailsPage.backToAccount')}
        </Link>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl md:text-3xl">{t('orderDetailsPage.orderDetailsTitle')}</CardTitle>
          <CardDescription>{t('orderDetailsPage.orderIdLabel', {orderId: order.id})}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
            <div className="flex items-start space-x-3">
              <CalendarDays className="h-5 w-5 mt-0.5 text-primary shrink-0" />
              <div>
                <p className="font-medium">{t('orderDetailsPage.orderDateLabel')}</p>
                <p className="text-muted-foreground">{new Date(order.orderDate).toLocaleDateString(getLocaleForDate(), { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <DollarSign className="h-5 w-5 mt-0.5 text-primary shrink-0" />
              <div>
                <p className="font-medium">{t('orderDetailsPage.totalAmountLabel')}</p>
                <p className="text-muted-foreground">{order.totalAmount.toFixed(2)} MDL</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Package className="h-5 w-5 mt-0.5 text-primary shrink-0" />
              <div>
                <p className="font-medium">{t('orderDetailsPage.statusLabel')}</p>
                <span className={`px-2 py-1 text-xs rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {order.status} {/* Status is data, not directly translated from keys */}
                </span>
              </div>
            </div>
            {order.trackingNumber && (
            <div className="flex items-start space-x-3 md:col-span-1 lg:col-span-1">
              <Truck className="h-5 w-5 mt-0.5 text-primary shrink-0" />
              <div>
                <p className="font-medium">{t('orderDetailsPage.trackingNumberLabel')}</p>
                <p className="text-muted-foreground">{order.trackingNumber}</p>
              </div>
            </div>
            )}
            <div className="flex items-start space-x-3 md:col-span-2 lg:col-span-2">
              <MapPin className="h-5 w-5 mt-0.5 text-primary shrink-0" />
              <div>
                <p className="font-medium">{t('orderDetailsPage.shippingAddressLabel')}</p>
                <p className="text-muted-foreground">
                  {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">{t('orderDetailsPage.itemsInOrderTitle')}</h3>
            <ul className="space-y-4">
              {order.items.map((item: OrderItem) => (
                <li key={item.productId} className="flex items-center gap-4 p-3 border rounded-md bg-muted/30">
                  <div className="relative h-16 w-16 rounded overflow-hidden shrink-0">
                    {/* Product image and name are not translated from keys */}
                    <Image src={`https://placehold.co/100x100.png`} alt={item.name} layout="fill" objectFit="cover" data-ai-hint="product small" />
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{t('orderDetailsPage.quantityLabel', {quantity: item.quantity})}</p>
                  </div>
                  <p className="text-sm font-medium">{(item.price * item.quantity).toFixed(2)} MDL</p>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </SiteLayout>
  );
}
