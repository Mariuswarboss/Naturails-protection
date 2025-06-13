
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SiteLayout from '@/components/SiteLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useCart } from '@/hooks/useCart';
import { mockUsers } from '@/lib/data'; 
import type { User, Address } from '@/types';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft, Lock } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/contexts/LanguageContext';

const getCurrentUser = (): User | null => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('authToken');
    const email = localStorage.getItem('userEmail');
    if (token && email) {
      return mockUsers.find(u => u.email === email) || { id: 'temp-user', email, addresses: [] };
    }
  }
  return null;
};

const STANDARD_SHIPPING_COST = 250;
const FREE_SHIPPING_THRESHOLD = 1000; // MDL

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, cartTotal, clearCart, itemCount } = useCart();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [shippingAddress, setShippingAddress] = useState<Partial<Address>>({
    street: '', city: '', postalCode: '', country: 'Moldova',
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [shippingCost, setShippingCost] = useState(STANDARD_SHIPPING_COST);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      toast({ title: t('checkoutPage.authRequiredToastTitle'), description: t('checkoutPage.authRequiredToastDescription'), variant: "destructive" });
      router.push('/login?redirect=/checkout');
      return;
    }
    setCurrentUser(user);
    if (user.addresses && user.addresses.length > 0) {
      const defaultAddress = user.addresses.find(a => a.isDefault) || user.addresses[0];
      setShippingAddress(defaultAddress);
    }

    if (itemCount === 0 && !isLoading) { 
        toast({ title: t('checkoutPage.emptyCartToastTitle'), description: t('checkoutPage.emptyCartToastDescription'), variant: "default" });
        router.push('/products');
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, toast, itemCount, t, isLoading]); // Removed currentUser from deps to avoid re-triggering on profile update

  useEffect(() => {
    const city = shippingAddress.city?.trim().toLowerCase();
    if (cartTotal < FREE_SHIPPING_THRESHOLD && city === 'chisinau') {
      setShippingCost(0);
    } else {
      setShippingCost(STANDARD_SHIPPING_COST);
    }
  }, [cartTotal, shippingAddress.city]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({ ...prev, [name]: value }));
  };

  const finalTotal = cartTotal + shippingCost;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!shippingAddress.street || !shippingAddress.city || !shippingAddress.postalCode || !shippingAddress.country) {
      toast({ title: t('checkoutPage.missingInfoToastTitle'), description: t('checkoutPage.missingInfoToastDescription'), variant: "destructive" });
      setIsLoading(false);
      return;
    }
    
    console.log("Placing order:", {
      userId: currentUser?.id,
      items: cartItems,
      totalAmount: finalTotal, // Use finalTotal here
      shippingAddress,
      paymentMethod,
      shippingCost: shippingCost,
    });

    await new Promise(resolve => setTimeout(resolve, 1500)); 

    const mockOrderId = `ECO-${Date.now()}`;
    
    toast({ title: t('checkoutPage.orderPlacedToastTitle'), description: t('checkoutPage.orderPlacedToastDescription', { orderId: mockOrderId }) });
    clearCart();
    // This is a mock, in a real app you'd save the order (including shippingCost and finalTotal)
    // For now, we push the mock ID, the order details page will display based on mockOrders
    router.push(`/account/orders/${mockOrderId}`); 
  };

  if (!currentUser || (itemCount === 0 && !isLoading)) {
    return <SiteLayout><p className="text-center py-10">{t('checkoutPage.loadingCheckout')}</p></SiteLayout>;
  }

  return (
    <SiteLayout>
      <div className="mb-6">
        <Link href="/cart" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center">
            <ChevronLeft className="h-4 w-4 mr-1" />
            {t('checkoutPage.backToCart')}
        </Link>
      </div>
      <h1 className="font-headline text-3xl md:text-4xl font-bold mb-8">{t('checkoutPage.checkoutTitle')}</h1>
      
      <form onSubmit={handleSubmitOrder}>
        <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>{t('checkoutPage.shippingAddressTitle')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="street">{t('checkoutPage.streetAddressLabel')}</Label>
                  <Input id="street" name="street" value={shippingAddress.street} onChange={handleInputChange} required />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">{t('checkoutPage.cityLabel')}</Label>
                    <Input id="city" name="city" value={shippingAddress.city} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">{t('checkoutPage.postalCodeLabel')}</Label>
                    <Input id="postalCode" name="postalCode" value={shippingAddress.postalCode} onChange={handleInputChange} required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="country">{t('checkoutPage.countryLabel')}</Label>
                  <Input id="country" name="country" value={shippingAddress.country} onChange={handleInputChange} required />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('checkoutPage.paymentMethodTitle')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <Input type="radio" id="payment-card" name="paymentMethod" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                        <Label htmlFor="payment-card">{t('checkoutPage.creditCardMockLabel')}</Label>
                    </div>
                    {paymentMethod === 'card' && (
                        <div className="p-4 border rounded-md space-y-3 bg-muted/30">
                            <Input placeholder={t('checkoutPage.cardNumberPlaceholder')} disabled />
                            <div className="grid grid-cols-2 gap-3">
                                <Input placeholder={t('checkoutPage.expiryPlaceholder')} disabled />
                                <Input placeholder={t('checkoutPage.cvcPlaceholder')} disabled />
                            </div>
                            <p className="text-xs text-muted-foreground flex items-center"><Lock className="w-3 h-3 mr-1"/>{t('checkoutPage.securePaymentSimulation')}</p>
                        </div>
                    )}
                     <div className="flex items-center space-x-2">
                        <Input type="radio" id="payment-cash" name="paymentMethod" value="cash" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} />
                        <Label htmlFor="payment-cash">{t('checkoutPage.cashOnDeliveryLabel')}</Label>
                    </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>{t('checkoutPage.orderSummaryTitle')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.productId} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Image src={item.imageUrl} alt={item.name} width={40} height={40} className="rounded" data-ai-hint="product small" />
                      <div>
                        <p className="font-medium truncate max-w-[150px]">{item.name}</p> {/* Product name not translated */}
                        <p className="text-xs text-muted-foreground">{t('checkoutPage.quantityShort', { quantity: item.quantity })}</p>
                      </div>
                    </div>
                    <p>{(item.price * item.quantity).toFixed(2)} MDL</p>
                  </div>
                ))}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t('cartPage.subtotal', {itemCount: itemCount})}</span>
                    <span>{cartTotal.toFixed(2)} MDL</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t('checkoutPage.shippingLabel')}</span>
                    <span>
                      {shippingCost === 0 
                        ? t('checkoutPage.freeShipping') 
                        : `${shippingCost.toFixed(2)} MDL`}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>{t('cartPage.total')}</span>
                    <span>{finalTotal.toFixed(2)} MDL</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" size="lg" className="w-full" disabled={isLoading || itemCount === 0}>
                  {isLoading ? t('checkoutPage.placingOrder') : t('checkoutPage.placeOrder')}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </SiteLayout>
  );
}

