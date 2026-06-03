import type { Metadata } from 'next';
import type { Product } from '@/types';
import roTranslations from '@/locales/ro.json';
import ruTranslations from '@/locales/ru.json';

export const siteUrl = 'https://www.naturesprotection.md';
export const companyName = "Nature's Protection Moldova";
export const legalCompanyName = 'DIABRAVO SRL';
export const contactPhones = ['+37369110316', '+37369149636'];
export const logoPath = '/logo.png';
export const defaultOgImage = '/images/banners/topper-in-gravy.webp';

const roProductNames = roTranslations.product_names as Record<string, string>;
const ruProductNames = ruTranslations.product_names as Record<string, string>;

export const multilingualSeoKeywords = [
  "Nature's Protection Moldova",
  "Nature's Protection Chisinau",
  'Nature Protection Moldova',
  'Natures Protection Moldova',
  'DIABRAVO SRL',
  'Tauro Pro Line Moldova',
  'Tauro Pro Line Chisinau',
  'hrana pentru caini Moldova',
  'hrana pentru pisici Moldova',
  'hrana uscata caini Moldova',
  'hrana uscata pisici Moldova',
  'hrana umeda caini Moldova',
  'hrana umeda pisici Moldova',
  'mancare pentru caini Chisinau',
  'mancare pentru pisici Chisinau',
  'recompense pentru caini Moldova',
  'gustari pentru caini Moldova',
  'cosmetice pentru caini Moldova',
  'sampon pentru caini Chisinau',
  'balsam pentru caini Moldova',
  'produse pentru blana alba caini',
  'produse pentru blana rosie caini',
  'корм для собак Молдова',
  'корм для кошек Молдова',
  'сухой корм для собак Кишинев',
  'сухой корм для кошек Кишинев',
  'влажный корм для собак Кишинев',
  'влажный корм для кошек Кишинев',
  'лакомства для собак Молдова',
  'шампунь для собак Кишинев',
  'косметика для собак Молдова',
  'корм для белых собак',
  'корм для рыжей шерсти собак',
  'dog food Moldova',
  'cat food Moldova',
  'dry dog food Chisinau',
  'wet dog food Moldova',
  'pet cosmetics Moldova',
  'dog shampoo Moldova',
  'premium pet food Moldova',
];

export const defaultSeoDescription =
  "Nature's Protection Moldova ofera hrana uscata, hrana umeda, recompense, gustari, supe si cosmetice premium pentru caini si pisici in Chisinau si toata Moldova.";

export const multilingualSeoDescription =
  "Nature's Protection Moldova / Натурес Протекшн Молдова: hrana premium pentru caini si pisici, сухой и влажный корм для собак и кошек, pet food, snacks si cosmetice Tauro Pro Line in Chisinau.";

function absoluteUrl(path = '/') {
  if (path.startsWith('http')) return path;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${siteUrl}${normalizedPath}`;
}

function imageUrl(path?: string) {
  if (!path) return absoluteUrl(defaultOgImage);
  return path.startsWith('http') ? path : absoluteUrl(path);
}

export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function getProductTranslationName(product?: Product, language: 'ro' | 'ru' = 'ro') {
  if (!product) return '';
  const key = product.name.replace('product_names.', '');
  const names = language === 'ru' ? ruProductNames : roProductNames;
  return names[key] || product.id;
}

export function buildPageMetadata({
  title,
  description = defaultSeoDescription,
  path = '/',
  keywords = [],
  image = defaultOgImage,
}: {
  title: string;
  description?: string;
  path?: string;
  keywords?: string[];
  image?: string;
}): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = title.includes("Nature's Protection") ? title : `${title} | ${companyName}`;

  return {
    metadataBase: new URL(siteUrl),
    title: fullTitle,
    description,
    keywords: [...new Set([...multilingualSeoKeywords, ...keywords])],
    alternates: {
      canonical: path,
      languages: {
        'ro-MD': path,
        'ru-MD': path,
        en: path,
        'x-default': path,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: companyName,
      locale: 'ro_MD',
      alternateLocale: ['ru_MD', 'en_US'],
      type: 'website',
      images: [
        {
          url: imageUrl(image),
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl(image)],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  };
}

export function getProductSeoMetadata(product?: Product, fallbackId = ''): Metadata {
  if (!product) {
    return buildPageMetadata({
      title: 'Produs negasit',
      description: `Produsul ${fallbackId} nu a fost gasit in catalogul Nature's Protection Moldova.`,
      path: `/products/${fallbackId}/`,
    });
  }

  const roName = getProductTranslationName(product, 'ro');
  const ruName = getProductTranslationName(product, 'ru');
  const description = [
    roName,
    ruName,
    `${product.category} pentru ${product.productFor === 'cat' ? 'pisici / кошек / cats' : product.productFor === 'dog' ? 'caini / собак / dogs' : 'animale / pets'}`,
    product.flavour ? `gust ${product.flavour}` : '',
    product.weight ? `${product.weight} kg` : '',
    `pret ${product.price} MDL`,
  ]
    .filter(Boolean)
    .join('. ');

  return buildPageMetadata({
    title: `${roName} - ${product.price} MDL`,
    description,
    path: `/products/${product.id}/`,
    image: product.imageUrl || defaultOgImage,
    keywords: [
      product.id,
      roName,
      ruName,
      product.category,
      product.productFor || '',
      product.flavour || '',
      product.coatColor || '',
      product.lifestage || '',
      product.purpose || '',
      `${roName} Moldova`,
      `${ruName} Молдова`,
    ].filter(Boolean),
  });
}

export const organizationStructuredData = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'PetStore', 'LocalBusiness'],
  name: companyName,
  legalName: legalCompanyName,
  alternateName: [
    "Nature's Protection",
    'Nature Protection Moldova',
    'Natures Protection Moldova',
    'Натурес Протекшн Молдова',
    'Нейчерс Протекшн Молдова',
    'Tauro Pro Line Moldova',
  ],
  url: siteUrl,
  logo: absoluteUrl(logoPath),
  image: absoluteUrl(defaultOgImage),
  description: multilingualSeoDescription,
  telephone: contactPhones,
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'MD',
    addressLocality: 'Chisinau',
  },
  areaServed: [
    { '@type': 'Country', name: 'Moldova' },
    { '@type': 'City', name: 'Chisinau' },
    { '@type': 'City', name: 'Кишинев' },
  ],
  brand: [
    { '@type': 'Brand', name: "Nature's Protection" },
    { '@type': 'Brand', name: 'Nature’s Protection Superior Care' },
    { '@type': 'Brand', name: 'Tauro Pro Line' },
  ],
  knowsAbout: [
    'hrana pentru caini',
    'hrana pentru pisici',
    'сухой корм для собак',
    'сухой корм для кошек',
    'wet dog food',
    'pet cosmetics',
    'dog snacks',
    'cat food',
  ],
};

export const websiteStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: companyName,
  alternateName: ['Nature Protection Moldova', 'Natures Protection Moldova', 'Натурес Протекшн Молдова'],
  url: siteUrl,
  inLanguage: ['ro-MD', 'ru-MD', 'en'],
  potentialAction: {
    '@type': 'SearchAction',
    target: `${siteUrl}/products/?search={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export function getProductStructuredData(product?: Product) {
  if (!product) return null;
  const roName = getProductTranslationName(product, 'ro');
  const ruName = getProductTranslationName(product, 'ru');

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: roName,
    alternateName: [ruName, product.id],
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: product.name.includes('TPL') ? 'Tauro Pro Line' : "Nature's Protection",
    },
    category: product.category,
    image: imageUrl(product.imageUrl),
    description: `${roName}. ${ruName}. Disponibil in Moldova la ${companyName}.`,
    offers: {
      '@type': 'Offer',
      url: absoluteUrl(`/products/${product.id}/`),
      priceCurrency: 'MDL',
      price: product.price,
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
  };
}
