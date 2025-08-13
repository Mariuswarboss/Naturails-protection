
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  additionalImageUrls?: string[];
  videoUrl?: string;
  dataAiHint?: string;
  category: string; 
  stock: number;
  relatedProductIds?: string[];
  productFor?: 'dog' | 'cat' | 'both';
  // New filterable attributes
  breedSize?: string;
  lifestage?: string;
  flavour?: string;
  purpose?: string;
  coatColor?: string;
  weight?: number; // in kg
  variantGroupId?: string;
  isHidden?: boolean;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface Address {
  id: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  addresses?: Address[];
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  orderDate: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  totalAmount: number;
  shippingAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  trackingNumber?: string;
  items: OrderItem[];
}
