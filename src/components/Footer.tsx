import Link from 'next/link';
import { Facebook, Instagram, Youtube, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-secondary text-secondary-foreground">
      <div className="container py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <ShieldCheck className="h-8 w-8 text-primary" />
              <span className="font-headline text-xl font-bold text-primary">Nature's Protection</span>
            </Link>
            <p className="text-sm">
              High-quality pet food and supplies for the health and happiness of your pets.
            </p>
          </div>
          <div>
            <h5 className="font-semibold mb-3 text-lg text-foreground">Products</h5>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products?category=Dog+Food" className="hover:text-primary hover:underline">For Dogs</Link></li>
              <li><Link href="/products?category=Cat+Supplies" className="hover:text-primary hover:underline">For Cats</Link></li>
              <li><Link href="/products" className="hover:text-primary hover:underline">All Products</Link></li>
              {/* Add more product categories or lines */}
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-3 text-lg text-foreground">Information</h5>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-primary hover:underline">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary hover:underline">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-primary hover:underline">FAQ</Link></li>
              <li><Link href="/privacy" className="hover:text-primary hover:underline">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary hover:underline">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-3 text-lg text-foreground">Follow Us</h5>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary"><Facebook size={24} /></Link>
              <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary"><Instagram size={24} /></Link>
              <Link href="#" aria-label="YouTube" className="text-muted-foreground hover:text-primary"><Youtube size={24} /></Link>
            </div>
            {/* Payment icons can be added here if needed */}
          </div>
        </div>
        <div className="border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Nature's Protection. All rights reserved.</p>
          <p className="mt-1">Powered by passion for pets.</p>
        </div>
      </div>
    </footer>
  );
}
