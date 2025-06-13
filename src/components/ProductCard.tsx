
"use client";

import type { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/hooks/useCart'; // Assuming useCart hook for addToCart

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent link navigation if button is inside Link
    addToCart(product, 1);
    // Optionally, show a toast notification
  };

  return (
    <Link href={`/products/${product.id}`} className="block group">
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:border-primary/50">
        <CardHeader className="p-0 relative aspect-square overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={400}
            height={400}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={product.dataAiHint || "product image"}
          />
        </CardHeader>
        <CardContent className="flex-grow p-4">
          <CardTitle className="font-headline text-lg mb-1 leading-tight group-hover:text-primary transition-colors">
            {product.name}
          </CardTitle>
          <p className="text-sm text-muted-foreground mb-2 truncate">{product.description}</p>
          <p className="text-lg font-semibold text-foreground">${product.price.toFixed(2)}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button
            onClick={handleAddToCart}
            className="w-full"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
