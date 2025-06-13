"use client";

import { useCart } from '@/hooks/useCart';
import SiteLayout from '@/components/SiteLayout';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, itemCount, isCartRestored } = useCart();

  if (!isCartRestored) {
    return (
        <SiteLayout>
            <div className="text-center py-20">
                <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-xl text-muted-foreground">Loading your cart...</p>
            </div>
        </SiteLayout>
    );
  }

  if (itemCount === 0) {
    return (
      <SiteLayout>
        <div className="text-center py-20">
          <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground mb-6" />
          <h1 className="font-headline text-3xl font-semibold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link href="/products" legacyBehavior>
            <a><Button size="lg">Continue Shopping</Button></a>
          </Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <h1 className="font-headline text-3xl md:text-4xl font-bold mb-8">Your Shopping Cart</h1>
      <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map(item => (
            <div key={item.productId} className="flex items-center gap-4 p-4 border rounded-lg shadow-sm bg-card">
              <div className="relative h-24 w-24 rounded-md overflow-hidden shrink-0">
                <Image src={item.imageUrl} alt={item.name} layout="fill" objectFit="cover" data-ai-hint="product image" />
              </div>
              <div className="flex-grow">
                <Link href={`/products/${item.productId}`} legacyBehavior>
                  <a className="font-semibold text-lg hover:text-primary">{item.name}</a>
                </Link>
                <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.productId, item.quantity - 1)} aria-label="Decrease quantity">
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => {
                    const newQuantity = parseInt(e.target.value, 10);
                    if (!isNaN(newQuantity)) updateQuantity(item.productId, newQuantity);
                  }}
                  min="1"
                  className="h-8 w-12 text-center"
                  aria-label={`${item.name} quantity`}
                />
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.productId, item.quantity + 1)} aria-label="Increase quantity">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p className="font-semibold w-20 text-right">${(item.price * item.quantity).toFixed(2)}</p>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => removeFromCart(item.productId)} aria-label={`Remove ${item.name} from cart`}>
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="p-6 border rounded-lg shadow-sm bg-card sticky top-24">
            <h2 className="font-headline text-2xl font-semibold mb-6">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal ({itemCount} items)</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>FREE</span> {/* Or calculate shipping */}
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-3">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            <Link href="/checkout" legacyBehavior>
              <a><Button size="lg" className="w-full">Proceed to Checkout</Button></a>
            </Link>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
