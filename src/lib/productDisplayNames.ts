import type { Product } from '@/types';

const fallbackProductNames: Record<string, string> = {
  TPL63589: 'TAURO PRO LINE Ultra Natural Care Deep Clean sampon pentru pielea si blana cainilor si pisicilor 400 ml',
  TPLDER70309: 'TAURO PRO LINE Derma Care Dry & Itchy Skin Relief balsam leave-in pentru caini si pisici 250 ml',
};

export function getProductDisplayName(
  product: Product,
  t: (key: string) => string,
  translations?: unknown
) {
  const translatedName = t(product.name);

  if (translatedName !== product.name) {
    return translatedName;
  }

  if (!product.name.startsWith('product_names.')) {
    return translatedName;
  }

  const productNameKey = product.name.replace('product_names.', '');
  const translationName = (translations as { product_names?: Record<string, string> } | undefined)
    ?.product_names?.[productNameKey];

  return translationName || fallbackProductNames[productNameKey] || translatedName;
}
