const PRODUCT_IMAGE_BASE_PATH = '/images/products/';

export function toProductImagePath(value: string): string {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return trimmedValue;
  }

  if (
    trimmedValue.startsWith('/') ||
    trimmedValue.startsWith('http://') ||
    trimmedValue.startsWith('https://') ||
    trimmedValue.startsWith('data:')
  ) {
    return trimmedValue;
  }

  return `${PRODUCT_IMAGE_BASE_PATH}${trimmedValue.replace(/^\.?\//, '')}`;
}
