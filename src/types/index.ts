
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  dataAiHint?: string; // Added dataAiHint to Product type
  category: string; // e.g., "Dog Food", "Cat Toys", "Dog Grooming"
  stock: number;
  relatedProductIds?: string[];
  productFor?: 'dog' | 'cat' | 'both'; // To specify if product is for dogs, cats, or both
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface User {
  id:string;
  email: string;
  name?: string;
  addresses?: Address[];
  // For simplicity, password is not stored on client-side models
}

export interface Address {
  id: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number; // Price at the time of order
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  shippingAddress: Address;
  billingAddress?: Address;
  orderDate: string; // ISO date string
  trackingNumber?: string;
}
