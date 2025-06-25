
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  dataAiHint?: string;
  category: string; 
  stock: number;
  relatedProductIds?: string[];
  productFor?: 'dog';
  // New filterable attributes
  breedSize?: string;
  lifestage?: string;
  flavour?: string;
  purpose?: string;
  coatColor?: string;
  weight?: number; // in kg
}
