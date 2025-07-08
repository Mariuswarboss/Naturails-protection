
import type { Product, User, Order, Address, OrderItem } from '@/types';

export const mockProducts: Product[] = [];

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
