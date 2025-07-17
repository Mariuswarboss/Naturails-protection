import { type MetadataRoute } from 'next';
import { mockProducts } from '@/lib/data';

const URL = 'https://ecoshop-moldova.web.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const products = mockProducts.map(({ id }) => ({
    url: `${URL}/products/${id}`,
    lastModified: new Date().toISOString(),
  }));

  const routes = ['', '/products', '/contact', '/terms'].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...products];
}
