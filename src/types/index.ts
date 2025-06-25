
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  dataAiHint?: string;
  category: string; // e.g., "Dog Food", "Cat Toys", "Dog Grooming"
  stock: number;
  relatedProductIds?: string[];
  productFor?: 'dog'; // To specify if product is for dogs
}
