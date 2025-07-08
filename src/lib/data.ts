
import type { Product, User, Order, Address, OrderItem } from '@/types';

export const mockProducts: Product[] = [
  {
    id: 'NPSC47236',
    name: "NATURE'S PROTECTION SUPERIOR CARE dry grain free food for adult dogs of all breeds with red coat, with lamb",
    description: 'NPSC47236',
    price: 320.00,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'dog food',
    category: 'Dry Food',
    stock: 50,
    productFor: 'dog',
    breedSize: 'All Breeds',
    lifestage: 'Adult',
    flavour: 'Lamb',
    purpose: 'Red Coat Care',
    coatColor: 'Red',
    weight: 4,
  },
  {
    id: 'NPSC47230',
    name: "NATURE'S PROTECTION SUPERIOR CARE Sample Red Coat Grain Free Salmon Adult Small Breed dry food for dogs",
    description: 'NPSC47230',
    price: 130.00,
    imageUrl: 'https://naturesprotection.eu/vendor/laravel-files/files/import/Eshop/__thumbnails__/vc_1_NPSC47230680_680resizebg.webp',
    dataAiHint: 'dog food',
    category: 'Dry Food',
    stock: 50,
    productFor: 'dog',
    breedSize: 'Small Breeds',
    lifestage: 'Adult',
    flavour: 'Salmon',
    purpose: 'Red Coat Care',
    coatColor: 'Red',
    weight: 1.5,
  },
  {
    id: 'NPSC47228',
    name: "NATURE'S PROTECTION SUPERIOR CARE dry grain free food for junior dogs of small breeds with red coat, with salmon",
    description: 'NPSC47228',
    price: 130.00,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'dog food',
    category: 'Dry Food',
    stock: 50,
    productFor: 'dog',
    breedSize: 'Small Breeds',
    lifestage: 'Junior',
    flavour: 'Salmon',
    purpose: 'Red Coat Care',
    coatColor: 'Red',
    weight: 1.5,
  },
  {
    id: 'NPSC45667',
    name: "NATURE'S PROTECTION SUPERIOR CARE dry grain free food for adult, small and mini breed dogs with white fish",
    description: 'NPSC45667',
    price: 130.00,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'dog food',
    category: 'Dry Food',
    stock: 50,
    productFor: 'dog',
    breedSize: 'Small Breeds',
    lifestage: 'Adult',
    flavour: 'White Fish',
    purpose: 'White Coat Care',
    coatColor: 'White',
    weight: 1.5,
  }
];

export function getProductById(id: string): Product | undefined {
  return mockProducts.find(p => p.id === id);
}

export function getProductsByIds(ids: string[]): Product[] {
  return mockProducts.filter(p => ids.includes(p.id));
}

// MOCK DATA - In a real app, this would come from a database.
export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'buyer@example.com',
    name: 'Alex Buyer',
    addresses: [
      { id: 'addr-1', street: '123 Pet Lane', city: 'Chisinau', postalCode: 'MD-2001', country: 'Moldova', isDefault: true },
      { id: 'addr-2', street: '456 Dog Park Ave', city: 'Balti', postalCode: 'MD-3100', country: 'Moldova', isDefault: false },
    ],
  },
  {
    id: 'admin-1',
    email: 'admin@ecoshop.md',
    name: 'Admin User',
    addresses: [],
  },
];

export const mockOrders: Order[] = [];
