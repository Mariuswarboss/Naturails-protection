
import type { Product, User, Order, Address } from '@/types';

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

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    userId: 'user-1',
    orderDate: '2024-04-20T10:30:00Z',
    status: 'Delivered',
    totalAmount: 113.46,
    shippingAddress: { street: '123 Pet Lane', city: 'Chisinau', postalCode: 'MD-2001', country: 'Moldova' },
    trackingNumber: 'NP123456789MD',
    items: [
      { productId: '1', name: 'NP Superior Care White Dogs Adult Small Breeds Lamb', quantity: 2, price: 29.99 },
      { productId: '5', name: 'NP Healthy Skin & Coat Supplement for Dogs', quantity: 1, price: 18.99 },
      { productId: '7', name: 'NP Hypoallergenic Dental Chews for Dogs', quantity: 1, price: 19.99 },
    ],
  },
  {
    id: 'ORD-002',
    userId: 'user-1',
    orderDate: '2024-05-10T14:00:00Z',
    status: 'Shipped',
    totalAmount: 31.49,
    shippingAddress: { street: '123 Pet Lane', city: 'Chisinau', postalCode: 'MD-2001', country: 'Moldova' },
    trackingNumber: 'NP987654321MD',
    items: [
      { productId: '6', name: 'Eco-Friendly Training Pads for Puppies', quantity: 1, price: 15.99 },
      { productId: '8', name: 'Durable Rubber Ball for Dogs - Large', quantity: 1, price: 14.50 },
    ],
  },
];
