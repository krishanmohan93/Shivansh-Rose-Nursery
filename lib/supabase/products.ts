import { createClient } from '@/lib/supabase/client';
import { Product } from '@/types/database';
import { getStoredProducts } from '@/lib/store/productsStore';

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return Boolean(url && !url.includes('placeholder') && url.startsWith('http'));
}

/**
 * Gets published products from stored products (localStorage / fallback).
 */
function getActiveStoredProducts(): Product[] {
  const all = getStoredProducts();
  return all.filter((p) => p.is_published !== false);
}

export async function fetchProductsByCategory(
  categoryPathSlug: string,
  page: number = 1,
  limit: number = 12
): Promise<{ products: Product[]; total: number; hasMore: boolean }> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const parts = categoryPathSlug ? categoryPathSlug.split('/').filter(Boolean) : [];
      const leafSlug = parts.length > 0 ? parts[parts.length - 1] : null;

      if (leafSlug) {
        if (leafSlug === 'plants') {
          const from = (page - 1) * limit;
          const to = from + limit - 1;
          const { data: dbProducts, count } = await supabase
            .from('products')
            .select('*', { count: 'exact' })
            .in('category_id', ['cat-indoor', 'cat-outdoor'])
            .eq('is_published', true)
            .range(from, to)
            .order('created_at', { ascending: false });

          if (dbProducts && dbProducts.length > 0) {
            const total = count || dbProducts.length;
            return {
              products: dbProducts as Product[],
              total,
              hasMore: from + dbProducts.length < total,
            };
          }
        } else {
          const { data: category } = await supabase
            .from('categories')
            .select('id')
            .eq('slug', leafSlug)
            .single();

          if (category) {
            const from = (page - 1) * limit;
            const to = from + limit - 1;

            const { data: dbProducts, count } = await supabase
              .from('products')
              .select('*', { count: 'exact' })
              .eq('category_id', category.id)
              .eq('is_published', true)
              .range(from, to)
              .order('created_at', { ascending: false });

            if (dbProducts && dbProducts.length > 0) {
              const total = count || dbProducts.length;
              return {
                products: dbProducts as Product[],
                total,
                hasMore: from + dbProducts.length < total,
              };
            }
          }
        }
      }
    } catch (err) {
      console.warn('Supabase product query fallback to local store data:', err);
    }
  }

  // Fallback to active stored products
  let allProducts = getActiveStoredProducts();
  
  if (categoryPathSlug) {
    const parts = categoryPathSlug.split('/').filter(Boolean);
    const leafSlug = parts.length > 0 ? parts[parts.length - 1] : null;
    if (leafSlug) {
      if (leafSlug === 'plants') {
        allProducts = allProducts.filter(
          (p) =>
            p.category_id === 'cat-indoor' ||
            p.category_id === 'cat-outdoor' ||
            p.category_id.includes('indoor') ||
            p.category_id.includes('outdoor') ||
            p.category_id.includes('plant')
        );
      } else if (leafSlug === 'pots') {
        allProducts = allProducts.filter((p) => p.category_id.includes('pot'));
      } else if (leafSlug === 'other') {
        allProducts = allProducts.filter(
          (p) =>
            p.category_id.includes('other') ||
            p.category_id.includes('fountain') ||
            p.category_id.includes('ganpati') ||
            p.category_id.includes('diwali')
        );
      } else if (leafSlug === 'indoor') {
        allProducts = allProducts.filter((p) => p.category_id === 'cat-indoor' || p.category_id.includes('indoor'));
      } else if (leafSlug === 'outdoor') {
        allProducts = allProducts.filter((p) => p.category_id === 'cat-outdoor' || p.category_id.includes('outdoor'));
      } else if (leafSlug.startsWith('cat-')) {
        allProducts = allProducts.filter((p) => p.category_id === leafSlug || p.category_id.includes(leafSlug.replace('cat-', '')));
      } else {
        allProducts = allProducts.filter((p) => p.category_id.includes(leafSlug));
      }
    }
  }

  const from = (page - 1) * limit;
  const sliced = allProducts.slice(from, from + limit);

  return {
    products: sliced,
    total: allProducts.length,
    hasMore: from + sliced.length < allProducts.length,
  };
}

export async function fetchPopularPlants(type: 'indoor' | 'outdoor'): Promise<Product[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const targetCategorySlug = type === 'indoor' ? 'indoor' : 'outdoor';

      const { data: category } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', targetCategorySlug)
        .single();

      if (category) {
        const { data: dbProducts } = await supabase
          .from('products')
          .select('*')
          .eq('category_id', category.id)
          .eq('is_published', true)
          .or('show_on_homepage.eq.true,is_popular.eq.true,is_featured.eq.true')
          .limit(6);

        if (dbProducts && dbProducts.length > 0) {
          return dbProducts as Product[];
        }
      }
    } catch (err) {
      console.warn('Supabase popular plants query fallback:', err);
    }
  }

  const targetCategory = type === 'indoor' ? 'cat-indoor' : 'cat-outdoor';
  return getActiveStoredProducts()
    .filter((p) => p.category_id === targetCategory && (p.show_on_homepage || p.is_popular || p.is_featured))
    .slice(0, 6);
}

export async function fetchPopularChinesePots(): Promise<Product[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data: category } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', 'chinese-premium')
        .single();

      if (category) {
        const { data: dbProducts } = await supabase
          .from('products')
          .select('*')
          .eq('category_id', category.id)
          .eq('is_published', true)
          .limit(6);

        if (dbProducts && dbProducts.length > 0) {
          return dbProducts as Product[];
        }
      }
    } catch (err) {
      console.warn('Supabase popular chinese pots query fallback:', err);
    }
  }

  return getActiveStoredProducts()
    .filter((p) => p.category_id === 'cat-pots-chinese-premium' || p.category_id === 'cat-chinese-pots')
    .slice(0, 6);
}

export async function getProductBySlug(slug: string): Promise<{ product: Product | null; categoryPath: string }> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data: dbProduct } = await supabase
        .from('products')
        .select('*, categories(slug, parent_id)')
        .eq('slug', slug)
        .single();

      if (dbProduct) {
        let categoryPath = '/products';
        if (dbProduct.categories?.slug) {
          categoryPath = `/products/plants/${dbProduct.categories.slug}`;
        }
        return { product: dbProduct as Product, categoryPath };
      }
    } catch (err) {
      console.warn('Supabase getProductBySlug fallback to stored data:', err);
    }
  }

  const storedProduct = getActiveStoredProducts().find((p) => p.slug === slug);
  if (storedProduct) {
    let categoryPath = '/products';
    if (storedProduct.category_id === 'cat-indoor') categoryPath = '/products/plants/indoor';
    else if (storedProduct.category_id === 'cat-outdoor') categoryPath = '/products/plants/outdoor';
    else if (storedProduct.category_id?.startsWith('cat-pots')) {
      const sub = storedProduct.category_id.replace('cat-pots-', '');
      categoryPath = `/products/pots/${sub}`;
    } else if (storedProduct.category_id?.startsWith('cat-other')) {
      const sub = storedProduct.category_id.replace('cat-other-', '');
      categoryPath = `/products/other/${sub}`;
    }
    return { product: storedProduct, categoryPath };
  }

  return { product: null, categoryPath: '/products' };
}

export async function getRelatedProducts(categoryId: string, currentProductId: string, limit: number = 4): Promise<Product[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data: dbProducts } = await supabase
        .from('products')
        .select('*')
        .eq('category_id', categoryId)
        .neq('id', currentProductId)
        .eq('is_published', true)
        .limit(limit);

      if (dbProducts && dbProducts.length > 0) {
        return dbProducts as Product[];
      }
    } catch (err) {
      console.warn('Supabase getRelatedProducts fallback:', err);
    }
  }

  return getActiveStoredProducts()
    .filter((p) => p.category_id === categoryId && p.id !== currentProductId)
    .slice(0, limit);
}
