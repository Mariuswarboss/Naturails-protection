
import { type MetadataRoute } from 'next';
import { mockProducts } from '@/lib/data';

// IMPORTANT: Replace with your actual production domain
const URL = 'https://naturesprotection.md/'; 

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    {
      url: `${URL}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${URL}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
        url: `${URL}/contact`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
    },
    {
        url: `${URL}/terms`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.3,
    },
  ];

  const productRoutes = mockProducts.filter(p => !p.isHidden).map((product) => ({
    url: `${URL}/products/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7
  }));

  return [...staticRoutes, ...productRoutes];
}
