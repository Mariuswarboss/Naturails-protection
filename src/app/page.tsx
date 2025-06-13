import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { mockProducts } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import SiteLayout from '@/components/SiteLayout';

export default function HomePage() {
  const featuredProducts = mockProducts.slice(0, 4); // Show first 4 products as featured

  return (
    <SiteLayout>
      <section className="text-center py-12 md:py-20 bg-gradient-to-b from-background to-secondary/30 rounded-lg shadow-sm">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-6 text-primary">
          Welcome to EcoShop Moldova
        </h1>
        <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
          Discover the best natural protection products for your beloved pets. Quality and care, delivered to your doorstep.
        </p>
        <Link href="/products" legacyBehavior>
          <a><Button size="lg" className="font-headline">Shop All Products</Button></a>
        </Link>
      </section>

      <section className="py-12 md:py-16">
        <h2 className="font-headline text-3xl font-semibold mb-8 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="py-12 md:py-16 bg-card rounded-lg shadow-sm">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="font-headline text-3xl font-semibold mb-4 text-primary">Why Choose Us?</h3>
            <p className="text-foreground/80 mb-3">
              At EcoShop Moldova, we are committed to providing only the highest quality, natural, and eco-friendly products for your pets. We believe in transparent sourcing and healthy ingredients.
            </p>
            <ul className="list-disc list-inside text-foreground/70 space-y-1 mb-6">
              <li>Locally focused for Moldova</li>
              <li>Carefully selected natural products</li>
              <li>Fast and reliable delivery</li>
              <li>Dedicated customer support</li>
            </ul>
            <Link href="/about" legacyBehavior>
              <a><Button variant="outline">Learn More About Us</Button></a>
            </Link>
          </div>
          <div className="relative h-64 md:h-80 w-full rounded-lg overflow-hidden shadow-md">
            <Image 
              src="https://placehold.co/600x400.png"
              alt="Happy pets"
              layout="fill"
              objectFit="cover"
              data-ai-hint="happy pets"
            />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
