import { createClient } from '@supabase/supabase-js';
import { Product } from '@/types/database';
import { SEED_PRODUCTS } from '@/lib/data/products-seed';

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}

/**
 * Fetches published products from Supabase database filtered by category path.
 *
 * @param {string} categoryPathSlug - Category path slug (e.g. 'pots/ceramic', 'plants/indoor').
 * @param {number} page - Page number.
 * @param {number} limit - Items per page.
 * @returns {Promise<{ products: Product[]; total: number; hasMore: boolean }>} Fetched products.
 */
export async function fetchProductsByCategory(
  categoryPathSlug: string,
  page: number = 1,
  limit: number = 100
): Promise<{ products: Product[]; total: number; hasMore: boolean }> {
  try {
    const supabase = getSupabaseAdmin();
    const parts = categoryPathSlug ? categoryPathSlug.split('/').filter(Boolean) : [];
    const parentGroup = parts[0] || '';
    const subSlug = parts[1] || parts[0] || '';

    let query = supabase.from('products').select('*', { count: 'exact' }).eq('is_published', true);

    if (parts.length >= 2) {
      if (subSlug === 'indoor') {
        query = query.or('category_id.eq.cat-indoor,category_id.ilike.%indoor%');
      } else if (subSlug === 'outdoor') {
        query = query.or('category_id.eq.cat-outdoor,category_id.ilike.%outdoor%');
      } else if (subSlug === 'ceramic') {
        query = query.or('category_id.eq.cat-pots-ceramic,category_id.eq.cat-pots,category_id.ilike.%ceramic%');
      } else if (subSlug === 'chinese-premium') {
        query = query.or('category_id.eq.cat-pots-chinese-premium,category_id.eq.cat-chinese-pots,category_id.ilike.%chinese%');
      } else if (subSlug === 'fiber') {
        query = query.or('category_id.eq.cat-pots-fiber,category_id.ilike.%fiber%');
      } else if (subSlug === 'plastic') {
        query = query.or('category_id.eq.cat-pots-plastic,category_id.ilike.%plastic%');
      } else if (subSlug === 'soil-mitti') {
        query = query.or('category_id.eq.cat-pots-soil-mitti,category_id.ilike.%soil%,category_id.ilike.%mitti%');
      } else if (subSlug === 'water-fountains') {
        query = query.or('category_id.eq.cat-other-fountains,category_id.ilike.%fountain%');
      } else if (subSlug === 'ganpati-murti') {
        query = query.or('category_id.eq.cat-other-ganpati,category_id.ilike.%ganpati%');
      } else if (subSlug === 'diwali-decoration') {
        query = query.or('category_id.eq.cat-other-diwali,category_id.ilike.%diwali%');
      } else {
        query = query.ilike('category_id', `%${subSlug}%`);
      }
    } else if (parts.length === 1) {
      if (parentGroup === 'plants') {
        query = query.or('category_id.eq.cat-indoor,category_id.eq.cat-outdoor,category_id.ilike.%indoor%,category_id.ilike.%outdoor%,category_id.ilike.%plant%');
      } else if (parentGroup === 'pots') {
        query = query.or('category_id.ilike.%pot%,category_id.ilike.%ceramic%,category_id.ilike.%fiber%,category_id.ilike.%plastic%,category_id.ilike.%chinese%,category_id.ilike.%mitti%');
      } else if (parentGroup === 'other') {
        query = query.or('category_id.ilike.%other%,category_id.ilike.%fountain%,category_id.ilike.%ganpati%,category_id.ilike.%diwali%');
      }
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data: dbProducts, count, error } = await query
      .order('created_at', { ascending: false })
      .range(from, to);

    if (!error && dbProducts && dbProducts.length > 0) {
      const total = count || dbProducts.length;
      return {
        products: dbProducts as Product[],
        total,
        hasMore: from + dbProducts.length < total,
      };
    }
  } catch (err) {
    console.error('Supabase fetchProductsByCategory error:', err);
  }

  let fallback = SEED_PRODUCTS.filter((p) => p.is_published !== false);
  if (categoryPathSlug) {
    const parts = categoryPathSlug.split('/').filter(Boolean);
    const sub = parts[parts.length - 1] || '';
    if (sub === 'indoor') fallback = fallback.filter((p) => p.category_id === 'cat-indoor');
    else if (sub === 'outdoor') fallback = fallback.filter((p) => p.category_id === 'cat-outdoor');
    else if (sub === 'ceramic') fallback = fallback.filter((p) => p.category_id === 'cat-pots-ceramic' || p.category_id === 'cat-pots');
    else if (sub === 'chinese-premium') fallback = fallback.filter((p) => p.category_id === 'cat-pots-chinese-premium' || p.category_id === 'cat-chinese-pots');
    else if (sub === 'fiber') fallback = fallback.filter((p) => p.category_id === 'cat-pots-fiber');
    else if (sub === 'plastic') fallback = fallback.filter((p) => p.category_id === 'cat-pots-plastic');
    else if (sub === 'soil-mitti') fallback = fallback.filter((p) => p.category_id === 'cat-pots-soil-mitti');
    else if (sub === 'water-fountains') fallback = fallback.filter((p) => p.category_id === 'cat-other-fountains');
  }

  return {
    products: fallback,
    total: fallback.length,
    hasMore: false,
  };
}

/**
 * Fetches popular plant specimens for homepage sections directly from Supabase.
 *
 * @param {'indoor' | 'outdoor'} type - Plant category.
 * @returns {Promise<Product[]>} Popular products list.
 */
export async function fetchPopularPlants(type: 'indoor' | 'outdoor'): Promise<Product[]> {
  try {
    const supabase = getSupabaseAdmin();
    const targetCat = type === 'indoor' ? 'cat-indoor' : 'cat-outdoor';

    const { data: dbProducts, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_published', true)
      .or(`category_id.eq.${targetCat},category_id.ilike.%${type}%`)
      .limit(6);

    if (!error && dbProducts && dbProducts.length > 0) {
      return dbProducts as Product[];
    }
  } catch (err) {
    console.error('Supabase fetchPopularPlants error:', err);
  }

  const targetCategory = type === 'indoor' ? 'cat-indoor' : 'cat-outdoor';
  return SEED_PRODUCTS.filter((p) => p.category_id === targetCategory && p.is_published).slice(0, 6);
}

/**
 * Fetches popular Chinese & Ceramic pots directly from Supabase.
 *
 * @returns {Promise<Product[]>} Popular pots list.
 */
export async function fetchPopularChinesePots(): Promise<Product[]> {
  try {
    const supabase = getSupabaseAdmin();
    const { data: dbProducts, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_published', true)
      .or('category_id.eq.cat-pots-chinese-premium,category_id.eq.cat-chinese-pots,category_id.ilike.%chinese%')
      .order('created_at', { ascending: false })
      .limit(6);

    if (!error && dbProducts && dbProducts.length > 0) {
      return dbProducts as Product[];
    }
  } catch (err) {
    console.error('Supabase fetchPopularChinesePots error:', err);
  }

  return SEED_PRODUCTS.filter(
    (p) => (p.category_id === 'cat-pots-chinese-premium' || p.category_id.includes('chinese')) && p.is_published
  ).slice(0, 6);
}

/**
 * Fetches single product details by slug directly from Supabase.
 *
 * @param {string} slug - Product slug string.
 * @returns {Promise<{ product: Product | null; categoryPath: string }>} Single product details and breadcrumb path.
 */
export async function getProductBySlug(slug: string): Promise<{ product: Product | null; categoryPath: string }> {
  try {
    const supabase = getSupabaseAdmin();
    const { data: dbProduct, error } = await supabase
      .from('products')
      .select('*')
      .or(`slug.eq.${slug},id.eq.${slug}`)
      .single();

    if (!error && dbProduct) {
      let categoryPath = '/products';
      const catId = dbProduct.category_id || '';
      if (catId.includes('indoor')) categoryPath = '/products/plants/indoor';
      else if (catId.includes('outdoor')) categoryPath = '/products/plants/outdoor';
      else if (catId.includes('ceramic')) categoryPath = '/products/pots/ceramic';
      else if (catId.includes('chinese')) categoryPath = '/products/pots/chinese-premium';
      else if (catId.includes('fiber')) categoryPath = '/products/pots/fiber';
      else if (catId.includes('plastic')) categoryPath = '/products/pots/plastic';
      else if (catId.includes('soil') || catId.includes('mitti')) categoryPath = '/products/pots/soil-mitti';
      else if (catId.includes('fountain')) categoryPath = '/products/other/water-fountains';
      else if (catId.includes('ganpati')) categoryPath = '/products/other/ganpati-murti';

      return { product: dbProduct as Product, categoryPath };
    }
  } catch (err) {
    console.error('Supabase getProductBySlug error:', err);
  }

  const seedMatch = SEED_PRODUCTS.find((p) => p.slug === slug || p.id === slug);
  if (seedMatch) {
    return { product: seedMatch, categoryPath: '/products/plants/indoor' };
  }

  return { product: null, categoryPath: '/products' };
}

/**
 * Fetches related products in the same category from Supabase database.
 *
 * @param {string} categoryId - Category ID string.
 * @param {string} currentProductId - Current product ID to exclude.
 * @param {number} [limit=4] - Max items to return.
 * @returns {Promise<Product[]>} Related products list.
 */
export async function getRelatedProducts(categoryId: string, currentProductId: string, limit: number = 4): Promise<Product[]> {
  try {
    const supabase = getSupabaseAdmin();
    const { data: dbProducts, error } = await supabase
      .from('products')
      .select('*')
      .eq('category_id', categoryId)
      .neq('id', currentProductId)
      .eq('is_published', true)
      .limit(limit);

    if (!error && dbProducts && dbProducts.length > 0) {
      return dbProducts as Product[];
    }
  } catch (err) {
    console.error('Supabase getRelatedProducts error:', err);
  }

  return SEED_PRODUCTS.filter((p) => p.category_id === categoryId && p.id !== currentProductId && p.is_published).slice(0, limit);
}
