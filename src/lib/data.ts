
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

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    userId: 'user-1',
    orderDate: '2024-04-20T10:30:00Z',
    status: 'Delivered',
    totalAmount: 735.00,
    shippingAddress: { street: '123 Pet Lane', city: 'Chisinau', postalCode: 'MD-2001', country: 'Moldova' },
    trackingNumber: 'NP123456789MD',
    items: [
      { productId: 'prod-4', name: "Nature's Protection SUPERIOR CARE WHITE DOGS GRAIN FREE LAMB ADULT SMALL AND MINI BREEDS", quantity: 1, price: 245 },
      { productId: 'prod-11', name: "Nature's Protection HEALTHY SKIN & COAT", quantity: 1, price: 350 },
      { productId: 'prod-12', name: 'Nature\'s Protection SUPERIOR CARE HYPOALLERGENIC DENTAL FRAGRANCE FREE', quantity: 2, price: 70 },
    ],
  },
  {
    id: 'ORD-002',
    userId: 'user-1',
    orderDate: '2024-05-10T14:00:00Z',
    status: 'Shipped',
    totalAmount: 560.00,
    shippingAddress: { street: '123 Pet Lane', city: 'Chisinau', postalCode: 'MD-2001', country: 'Moldova' },
    trackingNumber: 'NP987654321MD',
    items: [
      { productId: 'prod-6', name: "Nature's Protection LIFESTYLE GRAIN FREE SALMON WITH KRILL STERILISED ADULT ALL BREEDS", quantity: 1, price: 265 },
      { productId: 'prod-7', name: "Nature's Protection MINI EXTRA SALMON", quantity: 1, price: 295 },
    ],
  },
];
