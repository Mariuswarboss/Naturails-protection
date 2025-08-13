
'use server';
/**
 * @fileOverview Product recommendation agent.
 *
 * - getProductRecommendations - A function that returns product recommendations based on browsing history.
 * - ProductRecommendationInput - The input type for the getProductRecommendations function.
 * - ProductRecommendationOutput - The return type for the getProductRecommendations function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { mockProducts } from '@/lib/data';

const ProductRecommendationInputSchema = z.object({
  browsingHistory: z
    .string()
    .describe('A comma-separated list of product IDs the user has recently viewed.'),
  numberOfRecommendations: z
    .number()
    .describe('The number of product recommendations to return.'),
});
export type ProductRecommendationInput = z.infer<
  typeof ProductRecommendationInputSchema
>;

const ProductRecommendationOutputSchema = z.object({
  productIds: z
    .array(z.string())
    .describe('An array of recommended product IDs.'),
});
export type ProductRecommendationOutput = z.infer<
  typeof ProductRecommendationOutputSchema
>;

const allProductInfo = mockProducts
  .map(
    (p) =>
      `ID: ${p.id}, Name: ${p.name}, Description: ${p.description}, Category: ${p.category}`
  )
  .join('\n');

const prompt = ai.definePrompt(
  {
    name: 'productRecommenderPrompt',
    input: { schema: ProductRecommendationInputSchema },
    output: { schema: ProductRecommendationOutputSchema },
    prompt: `You are a pet store product recommender. Your goal is to suggest products that a user might like based on their browsing history.

Here is the list of all available products:
${allProductInfo}

User's recent browsing history (by product ID):
{{{browsingHistory}}}

Please recommend {{{numberOfRecommendations}}} other products that the user might be interested in. Do not recommend products that are already in their browsing history.`,
  },
);

export const getProductRecommendations = ai.defineFlow(
  {
    name: 'productRecommenderFlow',
    inputSchema: ProductRecommendationInputSchema,
    outputSchema: ProductRecommendationOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
