
/**
 * @fileOverview Product recommendation utilities.
 *
 * - getProductRecommendations - A function that returns product recommendations based on browsing history.
 * - ProductRecommendationInput - The input type for the getProductRecommendations function.
 * - ProductRecommendationOutput - The return type for the getProductRecommendations function.
 */

import { mockProducts } from '@/lib/data';

export interface ProductRecommendationInput {
  browsingHistory: string; // A comma-separated list of product IDs the user has recently viewed
  numberOfRecommendations: number; // The number of product recommendations to return
}

export interface ProductRecommendationOutput {
  productIds: string[]; // An array of recommended product IDs
}

// Simple recommendation algorithm for static export compatibility
export async function getProductRecommendations(input: ProductRecommendationInput): Promise<ProductRecommendationOutput> {
  const { browsingHistory, numberOfRecommendations } = input;
  const viewedProductIds = browsingHistory.split(',').filter(id => id.trim());

  // Get the categories of viewed products
  const viewedProducts = mockProducts.filter(p => viewedProductIds.includes(p.id));
  const viewedCategories = [...new Set(viewedProducts.map(p => p.category))];

  // Find products in similar categories that haven't been viewed
  let recommendations = mockProducts.filter(p =>
    !viewedProductIds.includes(p.id) &&
    viewedCategories.includes(p.category)
  );

  // If we don't have enough recommendations, add random products
  if (recommendations.length < numberOfRecommendations) {
    const additionalProducts = mockProducts.filter(p =>
      !viewedProductIds.includes(p.id) &&
      !recommendations.some(r => r.id === p.id)
    );
    recommendations = [...recommendations, ...additionalProducts];
  }

  // Shuffle and take the requested number
  const shuffled = recommendations.sort(() => Math.random() - 0.5);
  const productIds = shuffled.slice(0, numberOfRecommendations).map(p => p.id);

  return { productIds };
}
