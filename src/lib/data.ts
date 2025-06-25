
import type { Product } from '@/types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'NP Superior Care White Dogs Adult Small Breeds Lamb',
    description: 'Super premium dry food with lamb for adult small and mini breed white-coated dogs. Enriched with Miscanthus for intestinal health.',
    price: 29.99,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'dog food bag',
    category: 'Dog Food',
    productFor: 'dog',
    stock: 100,
    relatedProductIds: ['5', '7'],
  },
  {
    id: '5',
    name: 'NP Healthy Skin & Coat Supplement for Dogs',
    description: 'A special supplement with biotin, zinc and vitamins to promote healthy skin and a shiny coat for dogs.',
    price: 18.99,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'dog supplement bottle',
    category: 'Dog Supplements',
    productFor: 'dog',
    stock: 120,
    relatedProductIds: ['1'],
  },
  {
    id: '6',
    name: 'Eco-Friendly Training Pads for Puppies',
    description: 'Super absorbent and eco-friendly training pads, ideal for puppies and indoor dogs.',
    price: 15.99,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'puppy pads stack',
    category: 'Dog Training Aids',
    productFor: 'dog',
    stock: 300,
  },
  {
    id: '7',
    name: 'NP Hypoallergenic Dental Chews for Dogs',
    description: 'Tasty and effective dental chews designed for dogs with sensitivities. Helps reduce plaque and tartar buildup for fresh breath.',
    price: 19.99,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'dog dental chew',
    category: 'Dog Dental Care',
    productFor: 'dog',
    stock: 75,
    relatedProductIds: ['1', '5'],
  },
  {
    id: '8',
    name: 'Durable Rubber Ball for Dogs - Large',
    description: 'A virtually indestructible rubber ball designed for heavy chewers. Great for fetch and solo play.',
    price: 14.50,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'dog toy ball',
    category: 'Dog Toys',
    productFor: 'dog',
    stock: 90,
  },
  {
    id: '11',
    name: 'Gentle Oatmeal Dog Shampoo',
    description: 'Soothing oatmeal shampoo for dogs with sensitive skin. Cleans gently and leaves coat soft.',
    price: 16.25,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'dog shampoo bottle',
    category: 'Dog Grooming',
    productFor: 'dog',
    stock: 60,
  }
];

export function getProductById(id: string): Product | undefined {
  return mockProducts.find(p => p.id === id);
}

export function getProductsByIds(ids: string[]): Product[] {
  return mockProducts.filter(p => ids.includes(p.id));
}
