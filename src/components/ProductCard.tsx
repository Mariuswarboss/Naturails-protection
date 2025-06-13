
"use client";

import type { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, Info } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    if (product.stock <= 0) {
        toast({
            title: "Out of Stock",
            description: `${product.name} is currently out of stock.`,
            variant: "destructive",
        });
        return;
    }
    addToCart(product, 1);
    toast({
      title: "Added to cart!",
      description: `1 x ${product.name} added to your cart.`,
    });
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:border-primary/50 bg-card">
      <Link href={`/products/${product.id}`} className="block group flex-grow flex flex-col">
        <CardHeader className="p-0 relative aspect-square overflow-hidden border-b">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={400}
            height={400}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={product.dataAiHint || "pet product"}
          />
        </CardHeader>
        <CardContent className="flex-grow p-4">
          <CardTitle className="font-headline text-base md:text-lg mb-1 leading-tight group-hover:text-primary transition-colors">
            {product.name}
          </CardTitle>
          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{product.description}</p>
          <p className="text-lg font-semibold text-foreground">${product.price.toFixed(2)}</p>
        </CardContent>
      </Link>
      <CardFooter className="p-3 pt-0 border-t mt-auto">
        <div className="w-full flex items-center gap-2">
           <Link href={`/products/${product.id}`} className="flex-1">
            <Button
              variant="outline"
              className="w-full text-xs h-9"
              aria-label={`View details for ${product.name}`}
            >
              <Info className="mr-1.5 h-3.5 w-3.5" /> Details
            </Button>
          </Link>
          <Button
            onClick={handleAddToCart}
            className="flex-1 text-xs h-9"
            aria-label={`Add ${product.name} to cart`}
            disabled={product.stock <= 0}
          >
            <ShoppingBag className="mr-1.5 h-3.5 w-3.5" /> {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
