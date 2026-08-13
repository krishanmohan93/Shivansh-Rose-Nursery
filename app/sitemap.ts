import { MetadataRoute } from 'next';
import { CATEGORY_STRUCTURE } from '@/lib/data/categories';
import { SEED_PRODUCTS } from '@/lib/data/products-seed';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shivanshrosenursery.com';

  const staticRoutes = [
    '',
    '/about',
    '/products',
    '/services',
    '/stores',
    '/contact',
    '/privacy-policy',
    '/refund-policy',
    '/terms-and-conditions',
    '/disclaimer',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic Category pages sitemap entries
  const categoryRoutes = Object.keys(CATEGORY_STRUCTURE).map((slug) => ({
    url: `${baseUrl}/products/c/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  // Dynamic Product details pages sitemap entries
  const productRoutes = SEED_PRODUCTS.map((product) => ({
    url: `${baseUrl}/products/p/${product.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
