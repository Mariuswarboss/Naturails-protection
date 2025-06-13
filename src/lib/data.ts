import type { Product, User, Order } from '@/types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Organic Dog Food - Chicken',
    description: 'High-quality organic chicken-based dog food, suitable for all breeds. Rich in vitamins and minerals.',
    price: 25.99,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'dog food',
    category: 'Dog Food',
    stock: 100,
    relatedProductIds: ['2', '3'],
  },
  {
    id: '2',
    name: 'Natural Catnip Spray',
    description: 'Potent and all-natural catnip spray to invigorate your feline friend. Safe and non-toxic.',
    price: 8.50,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'cat toy',
    category: 'Cat Supplies',
    stock: 150,
    relatedProductIds: ['1', '4'],
  },
  {
    id: '3',
    name: 'Eco-Friendly Pet Shampoo',
    description: 'Gentle, biodegradable pet shampoo made with natural ingredients. Perfect for sensitive skin.',
    price: 12.75,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'pet shampoo',
    category: 'Pet Care',
    stock: 80,
    relatedProductIds: ['1'],
  },
  {
    id: '4',
    name: 'Interactive Laser Pointer for Cats',
    description: 'Keep your cat entertained for hours with this safe and fun interactive laser pointer.',
    price: 15.00,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'cat toy',
    category: 'Cat Supplies',
    stock: 200,
    relatedProductIds: ['2'],
  },
  {
    id: '5',
    name: 'Premium Salmon Oil for Pets',
    description: 'Rich in Omega-3 fatty acids, this salmon oil promotes a healthy coat and skin for dogs and cats.',
    price: 18.99,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'pet supplement',
    category: 'Pet Supplements',
    stock: 120,
  },
  {
    id: '6',
    name: 'Biodegradable Poop Bags',
    description: 'Eco-friendly and strong poop bags for responsible pet ownership. Lavender scented.',
    price: 9.99,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'dog waste',
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
  },
];

export const mockOrders: Order[] = [
  {
    id: 'order1',
    userId: 'user1',
    items: [
      { productId: '1', name: 'Organic Dog Food - Chicken', quantity: 1, price: 25.99 },
      { productId: '3', name: 'Eco-Friendly Pet Shampoo', quantity: 2, price: 12.75 },
    ],
    totalAmount: 25.99 + 2 * 12.75,
    status: 'Delivered',
    shippingAddress: mockUsers[0].addresses![0],
    orderDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    trackingNumber: 'MD123456789',
  },
  {
    id: 'order2',
    userId: 'user1',
    items: [{ productId: '2', name: 'Natural Catnip Spray', quantity: 3, price: 8.50 }],
    totalAmount: 3 * 8.50,
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
