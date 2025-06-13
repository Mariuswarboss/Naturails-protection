import type { Product, User, Order } from '@/types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'NP Superior Care White Dogs Adult Small Breeds Lamb',
    description: 'Super premium dry food with lamb for adult small and mini breed white-coated dogs. Enriched with Miscanthus for intestinal health.',
    price: 29.99,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'dog food bag',
    category: 'Dog Food',
    stock: 100,
    relatedProductIds: ['2', '5'],
  },
  {
    id: '2',
    name: 'NP Lifestyle Grain Free Salmon for Adult Cats',
    description: 'Complete grain-free dry food with salmon for adult cats after sterilization, to help maintain optimal weight. For 1 year and older.',
    price: 22.50,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'cat food bag',
    category: 'Cat Supplies', // Changed category to be more specific
    stock: 150,
    relatedProductIds: ['1', '4'],
  },
  {
    id: '3',
    name: 'Tauros Pro Line Pure Mist Alkaline Water',
    description: 'Alkaline water for pets, 11 pH. Helps maintain body pH balance, protects against diseases. For skin and coat care.',
    price: 12.75,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'pet care water',
    category: 'Pet Care',
    stock: 80,
  },
  {
    id: '4',
    name: 'NP Catnip Infused Plush Mouse Toy',
    description: 'Engaging plush mouse toy infused with potent catnip to stimulate play and activity in cats.',
    price: 9.00,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'cat toy mouse',
    category: 'Cat Supplies',
    stock: 200,
    relatedProductIds: ['2'],
  },
  {
    id: '5',
    name: 'NP Healthy Skin & Coat Supplement for Dogs',
    description: 'A special supplement with biotin, zinc and vitamins to promote healthy skin and a shiny coat for dogs.',
    price: 18.99,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'dog supplement bottle',
    category: 'Dog Supplements', // Changed category
    stock: 120,
  },
  {
    id: '6',
    name: 'Eco-Friendly Training Pads for Puppies',
    description: 'Super absorbent and eco-friendly training pads, ideal for puppies and indoor dogs.',
    price: 15.99,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'puppy pads stack',
    category: 'Dog Supplies',
    stock: 300,
  },
];

export const mockUsers: User[] = [
  {
    id: 'user1',
    email: 'buyer@example.com',
    name: 'Alex Buyer',
    addresses: [
      {
        id: 'addr1',
        street: '123 Nature Lane',
        city: 'Chisinau',
        postalCode: 'MD-2000',
        country: 'Moldova',
        isDefault: true,
      },
    ],
  },
  {
    id: 'admin1',
    email: 'admin@ecoshop.md',
    name: 'Admin EcoShop',
     addresses: [
      {
        id: 'addr2',
        street: '456 Admin Road',
        city: 'Chisinau',
        postalCode: 'MD-2001',
        country: 'Moldova',
        isDefault: true,
      },
    ],
  },
];

export const mockOrders: Order[] = [
  {
    id: 'order1',
    userId: 'user1',
    items: [
      { productId: '1', name: 'NP Superior Care White Dogs Adult Small Breeds Lamb', quantity: 1, price: 29.99 },
      { productId: '3', name: 'Tauros Pro Line Pure Mist Alkaline Water', quantity: 2, price: 12.75 },
    ],
    totalAmount: 29.99 + 2 * 12.75,
    status: 'Delivered',
    shippingAddress: mockUsers[0].addresses![0],
    orderDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    trackingNumber: 'MD123456789',
  },
  {
    id: 'order2',
    userId: 'user1',
    items: [{ productId: '2', name: 'NP Lifestyle Grain Free Salmon for Adult Cats', quantity: 3, price: 22.50 }],
    totalAmount: 3 * 22.50,
    status: 'Shipped',
    shippingAddress: mockUsers[0].addresses![0],
    orderDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    trackingNumber: 'MD987654321',
  },
];

export function getProductById(id: string): Product | undefined {
  return mockProducts.find(p => p.id === id);
}

export function getProductsByIds(ids: string[]): Product[] {
  return mockProducts.filter(p => ids.includes(p.id));
}
