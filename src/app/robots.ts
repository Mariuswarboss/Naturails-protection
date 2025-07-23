import { type MetadataRoute } from 'next';

const URL = 'https://naturails-protection.vercel.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${URL}/sitemap.xml`,
  };
}
