import type { Product } from '@/types';

export const foodCategoryOrder = ['Dry Food', 'Wet Food', 'Snacks'];
export const cosmeticsCategoryOrder = ['Shampoo', 'Mask', 'Conditioner', 'Balm', 'Care Mist', 'Care Powder', 'Care Oil', 'Care Elixir', 'Dental'];
export const categoryDisplayOrder = [...foodCategoryOrder, ...cosmeticsCategoryOrder];

export function compareByCategoryPriority(a: Product, b: Product) {
  const aIndex = categoryDisplayOrder.indexOf(a.category);
  const bIndex = categoryDisplayOrder.indexOf(b.category);

  if (aIndex === -1 && bIndex === -1) {
    return a.category.localeCompare(b.category);
  }

  if (aIndex === -1) return 1;
  if (bIndex === -1) return -1;

  return aIndex - bIndex;
}

function getRecommendationWeight(product: Product, currentProductCategory?: string) {
  let weight = 1;

  if (product.category === 'Snacks') {
    weight += 5;
  }

  if (product.category === 'Dry Food') {
    weight += 4;
  }

  if (product.category === 'Wet Food') {
    weight += 2;
  }

  if (currentProductCategory && product.category === currentProductCategory) {
    weight += 1;
  }

  return weight;
}

export function getRandomWeightedProducts(
  products: Product[],
  count: number,
  options: { excludeId?: string; currentProductCategory?: string } = {}
) {
  const availableProducts = products.filter(
    product => product.id !== options.excludeId && !product.isHidden
  );
  const selectedProducts: Product[] = [];

  while (selectedProducts.length < count && availableProducts.length > 0) {
    const weightedTotal = availableProducts.reduce(
      (sum, product) => sum + getRecommendationWeight(product, options.currentProductCategory),
      0
    );
    let randomValue = Math.random() * weightedTotal;
    const selectedIndex = availableProducts.findIndex((product) => {
      randomValue -= getRecommendationWeight(product, options.currentProductCategory);
      return randomValue <= 0;
    });
    const safeIndex = selectedIndex === -1 ? availableProducts.length - 1 : selectedIndex;
    const [selectedProduct] = availableProducts.splice(safeIndex, 1);

    selectedProducts.push(selectedProduct);
  }

  return selectedProducts;
}
