
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { mockProducts } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import SiteLayout from '@/components/SiteLayout';
import { ChevronRight, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  const featuredDogProducts = mockProducts.filter(p => p.category === 'Dog Food' || p.category === 'Dog Supplies').slice(0, 4);
  const featuredCatProducts = mockProducts.filter(p => p.category === 'Cat Supplies').slice(0, 4);

  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-100 via-lime-50 to-emerald-100 dark:from-green-900 dark:via-lime-950 dark:to-emerald-900  py-16 md:py-24 rounded-lg shadow-lg overflow-hidden mb-12 md:mb-16">
        <div className="container mx-auto px-4 z-10 relative">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-primary dark:text-green-300">
                Nature's Protection
              </h1>
              <p className="text-lg md:text-xl text-foreground/90 dark:text-gray-300 mb-8 max-w-lg mx-auto md:mx-0">
                Premium nutrition for your pets. Discover our wide range of natural and healthy products designed for the well-being of your dogs and cats.
              </p>
              <Link href="/products">
                <Button size="lg" className="font-headline text-lg px-8 py-3">
                  Shop All Products <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="relative h-64 md:h-96 w-full max-w-md mx-auto md:max-w-none">
              <Image
                src="https://placehold.co/700x500.png"
                alt="Happy dog and cat"
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
                data-ai-hint="happy dog cat pets"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* For Dogs Card */}
            <Link href="/products?category=Dog+Food" className="block group">
              <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 aspect-[16/10]">
                <Image
                  src="https://placehold.co/600x375.png"
                  alt="Products for Dogs"
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint="dog eating food"
                  className="transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center p-6 text-center">
                  <h3 className="font-headline text-3xl md:text-4xl font-bold text-white mb-3">For Dogs</h3>
                  <p className="text-gray-200 mb-4 text-sm md:text-base">High-quality food, treats, and care products.</p>
                  <Button variant="secondary" className="bg-white/90 hover:bg-white text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    Shop Dog Products <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Link>

            {/* For Cats Card */}
            <Link href="/products?category=Cat+Supplies" className="block group">
              <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 aspect-[16/10]">
                <Image
                  src="https://placehold.co/600x375.png"
                  alt="Products for Cats"
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint="cat playing toy"
                  className="transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center p-6 text-center">
                  <h3 className="font-headline text-3xl md:text-4xl font-bold text-white mb-3">For Cats</h3>
                  <p className="text-gray-200 mb-4 text-sm md:text-base">Nutritious meals, fun toys, and essential supplies.</p>
                  <Button variant="secondary" className="bg-white/90 hover:bg-white text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    Shop Cat Products <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Dog Products */}
      {featuredDogProducts.length > 0 && (
        <section className="py-12 md:py-16 bg-secondary/30 dark:bg-background/50 rounded-lg">
          <div className="container mx-auto px-4">
            <h2 className="font-headline text-3xl font-semibold mb-8 text-center text-foreground">Featured Dog Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {featuredDogProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
             <div className="text-center mt-10">
              <Link href="/products?category=Dog+Food">
                <Button variant="outline" size="lg">View All Dog Products</Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Featured Cat Products */}
      {featuredCatProducts.length > 0 && (
         <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-headline text-3xl font-semibold mb-8 text-center text-foreground">Featured Cat Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {featuredCatProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/products?category=Cat+Supplies">
                <Button variant="outline" size="lg">View All Cat Products</Button>
              </Link>
            </div>
          </div>
        </section>
      )}


      {/* Why Choose Us Section */}
      <section className="py-12 md:py-16 bg-card border-t border-b">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <ShieldCheck className="h-16 w-16 text-primary mx-auto mb-4" />
            <h3 className="font-headline text-3xl font-semibold mb-4 text-primary">Why Choose Nature's Protection?</h3>
            <p className="text-foreground/80 max-w-2xl mx-auto">
              We are dedicated to providing your pets with the highest quality nutrition, crafted from natural ingredients to support their health and vitality at every stage of life.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h4 className="text-xl font-semibold mb-2 text-foreground">Natural Ingredients</h4>
              <p className="text-sm text-foreground/70">Our formulas are made with carefully selected, wholesome ingredients, free from artificial colors, flavors, or preservatives.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2 text-foreground">Scientifically Formulated</h4>
              <p className="text-sm text-foreground/70">Developed by veterinarians and nutritionists to meet the specific needs of dogs and cats for optimal health.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2 text-foreground">Trusted Quality</h4>
              <p className="text-sm text-foreground/70">We adhere to the strictest quality control standards to ensure every bag of food is safe and nutritious.</p>
            </div>
          </div>
           <div className="text-center mt-10">
            <Link href="/about">
              <Button variant="outline" size="lg">Learn More About Us</Button>
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
