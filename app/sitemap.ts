import { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';
import { SEED_PRODUCTS } from '@/lib/data/products-seed';

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  return createClient(url, key, { auth: { persistSession: false } });
}

/**
 * Generates the dynamic XML sitemap for search engines, including static routes,
 * targeted category landing pages, and published product detail pages.
 * @returns Array of sitemap entries with URLs, last modified dates, and change frequencies.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shivanshrosenursery.com';
  const now = new Date().toISOString();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/products`, lastModified: now, changeFrequency: 'daily', priority: 0.95 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/stores`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/refund-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms-and-conditions`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/disclaimer`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  // Specific high-intent category & subcategory paths
  const categoryPaths = [
    '/products/plants',
    '/products/plants/indoor',
    '/products/plants/outdoor',
    '/products/pots',
    '/products/pots/ceramic',
    '/products/pots/chinese-premium',
    '/products/pots/fiber',
    '/products/pots/plastic',
    '/products/pots/soil-mitti',
    '/products/other',
    '/products/other/water-fountains',
    '/products/other/ganpati-murti',
    '/products/other/diwali-decoration',
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categoryPaths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.85,
  }));

  // Fetch live products from Supabase for sitemap indexing
  let productSlugs: { slug: string; updated_at?: string }[] = [];
  try {
    const supabase = getSupabase();
    const { data: dbProducts } = await supabase
      .from('products')
      .select('slug, updated_at')
      .eq('is_published', true);

    if (dbProducts && dbProducts.length > 0) {
      productSlugs = dbProducts;
    }
  } catch (err) {
    console.error('Error fetching products for sitemap:', err);
  }

  if (productSlugs.length === 0) {
    productSlugs = SEED_PRODUCTS.map((p) => ({
      slug: p.slug,
      updated_at: p.updated_at,
    }));
  }

  const productRoutes: MetadataRoute.Sitemap = productSlugs.map((p) => ({
    url: `${baseUrl}/products/p/${p.slug}`,
    lastModified: p.updated_at || now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
