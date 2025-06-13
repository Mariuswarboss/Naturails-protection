
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SiteLayout from '@/components/SiteLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useCart } from '@/hooks/useCart';
import { mockUsers } from '@/lib/data'; // For default address
import type { User, Address } from '@/types';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft, Lock } from 'lucide-react';
import Link from 'next/link';

// Mock function to get current user
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

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, cartTotal, clearCart, itemCount } = useCart();
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [shippingAddress, setShippingAddress] = useState<Partial<Address>>({
    street: '', city: '', postalCode: '', country: 'Moldova',
  });
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card', 'cash'

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      toast({ title: "Authentication Required", description: "Please log in to proceed to checkout.", variant: "destructive" });
      router.push('/login?redirect=/checkout');
      return;
    }
    setCurrentUser(user);
    if (user.addresses && user.addresses.length > 0) {
      const defaultAddress = user.addresses.find(a => a.isDefault) || user.addresses[0];
      setShippingAddress(defaultAddress);
    }

    if (itemCount === 0) {
        toast({ title: "Empty Cart", description: "Your cart is empty. Add some products to checkout.", variant: "default" });
        router.push('/products');
    }

  }, [router, toast, itemCount]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (!shippingAddress.street || !shippingAddress.city || !shippingAddress.postalCode || !shippingAddress.country) {
      toast({ title: "Missing Information", description: "Please fill in all shipping address fields.", variant: "destructive" });
      setIsLoading(false);
      return;
    }

    // Simulate order placement
    console.log("Placing order:", {
      userId: currentUser?.id,
      items: cartItems,
      totalAmount: cartTotal,
      shippingAddress,
      paymentMethod,
    });

    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay

    // Create a mock order ID
    const mockOrderId = `ECO-${Date.now()}`;

    // Mock adding order to a list (in real app, this is backend)
    // For now, we could store it in localStorage for demo purposes or just clear cart.
    
    toast({ title: "Order Placed!", description: `Your order ${mockOrderId} has been successfully placed.` });
    clearCart();
    router.push(`/account/orders/${mockOrderId}`); // Navigate to a mock order confirmation/details page
    setIsLoading(false);
  };

  if (!currentUser || itemCount === 0) {
    // Handled by useEffect redirect or early return if cart is empty
    return <SiteLayout><p className="text-center py-10">Loading checkout...</p></SiteLayout>;
  }

  return (
    <SiteLayout>
      <div className="mb-6">
        <Link href="/cart" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Cart
        </Link>
      </div>
      <h1 className="font-headline text-3xl md:text-4xl font-bold mb-8">Checkout</h1>
      
      <form onSubmit={handleSubmitOrder}>
        <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
          {/* Shipping and Payment Details */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="street">Street Address</Label>
                  <Input id="street" name="street" value={shippingAddress.street} onChange={handleInputChange} required />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" name="city" value={shippingAddress.city} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input id="postalCode" name="postalCode" value={shippingAddress.postalCode} onChange={handleInputChange} required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" name="country" value={shippingAddress.country} onChange={handleInputChange} required />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Simplified payment - in real app use Stripe Elements or similar */}
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <Input type="radio" id="payment-card" name="paymentMethod" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                        <Label htmlFor="payment-card">Credit/Debit Card (Mock)</Label>
                    </div>
                    {paymentMethod === 'card' && (
                        <div className="p-4 border rounded-md space-y-3 bg-muted/30">
                            <Input placeholder="Card Number (e.g., 4242...)" disabled />
                            <div className="grid grid-cols-2 gap-3">
                                <Input placeholder="MM/YY" disabled />
                                <Input placeholder="CVC" disabled />
                            </div>
                            <p className="text-xs text-muted-foreground flex items-center"><Lock className="w-3 h-3 mr-1"/> Secure payment simulation.</p>
                        </div>
                    )}
                     <div className="flex items-center space-x-2">
                        <Input type="radio" id="payment-cash" name="paymentMethod" value="cash" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} />
                        <Label htmlFor="payment-cash">Cash on Delivery</Label>
                    </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.productId} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Image src={item.imageUrl} alt={item.name} width={40} height={40} className="rounded" data-ai-hint="product small" />
                      <div>
                        <p className="font-medium truncate max-w-[150px]">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>FREE</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Placing Order...' : 'Place Order'}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </SiteLayout>
  );
}
