"use client";

import { useState } from 'react';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/hooks/useCart';
import { ShoppingBag, Plus, Minus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProductDetailsClientProps {
  product: Product;
}

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    if (product.stock <= 0) {
        toast({
            title: "Out of Stock",
            description: `${product.name} is currently out of stock.`,
            variant: "destructive",
        });
        return;
    }
    if (quantity > product.stock) {
        toast({
            title: "Limited Stock",
            description: `Only ${product.stock} units of ${product.name} available. Please reduce quantity.`,
            variant: "destructive",
        });
        return;
    }
    addToCart(product, quantity);
    toast({
      title: "Added to cart!",
      description: `${quantity} x ${product.name} added to your cart.`,
    });
  };

  const incrementQuantity = () => {
    setQuantity(prev => Math.min(prev + 1, product.stock > 0 ? product.stock : 1));
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      setQuantity(Math.min(value, product.stock > 0 ? product.stock : 1));
    } else if (e.target.value === "") {
        // Allow empty input temporarily, or set to 1
        setQuantity(1); // Or some other logic for empty string
    }
  };


  return (
    <div className="space-y-6">
        <div className="flex items-center space-x-3">
            <p className="text-sm font-medium">Quantity:</p>
            <div className="flex items-center border rounded-md">
            <Button variant="ghost" size="icon" onClick={decrementQuantity} className="h-10 w-10 rounded-r-none border-r" aria-label="Decrease quantity">
                <Minus className="h-4 w-4" />
            </Button>
            <Input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
                max={product.stock > 0 ? product.stock : 1}
                className="h-10 w-16 text-center border-transparent focus:border-transparent focus:ring-0 rounded-none"
                aria-label="Product quantity"
            />
            <Button variant="ghost" size="icon" onClick={incrementQuantity} className="h-10 w-10 rounded-l-none border-l" aria-label="Increase quantity">
                <Plus className="h-4 w-4" />
            </Button>
            </div>
        </div>

        <Button 
            size="lg" 
            onClick={handleAddToCart} 
            className="w-full md:w-auto"
            disabled={product.stock <= 0}
        >
            <ShoppingBag className="mr-2 h-5 w-5" />
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </Button>
    </div>
  );
}
