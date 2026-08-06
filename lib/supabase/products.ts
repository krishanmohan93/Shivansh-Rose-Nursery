import { createClient } from '@/lib/supabase/client';
import { Product } from '@/types/database';
import { getSeedProductsByCategory, getSeedPopularPlants, SEED_PRODUCTS } from '@/lib/data/products-seed';

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return Boolean(url && !url.includes('placeholder') && url.startsWith('http'));
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
    } catch (err) {
      console.warn('Supabase product query fallback to seed data:', err);
    }
  }

  const seedList = getSeedProductsByCategory(categoryPathSlug);
  const from = (page - 1) * limit;
  const sliced = seedList.slice(from, from + limit);

  return {
    products: sliced,
    total: seedList.length,
    hasMore: from + sliced.length < seedList.length,
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

  return getSeedPopularPlants(type);
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
      console.warn('Supabase getProductBySlug fallback to seed data:', err);
    }
  }

  const seedProduct = SEED_PRODUCTS.find((p) => p.slug === slug);
  if (seedProduct) {
    let categoryPath = '/products';
    if (seedProduct.category_id === 'cat-indoor') categoryPath = '/products/plants/indoor';
    else if (seedProduct.category_id === 'cat-outdoor') categoryPath = '/products/plants/outdoor';
    else if (seedProduct.category_id?.startsWith('cat-pots')) {
      const sub = seedProduct.category_id.replace('cat-pots-', '');
      categoryPath = `/products/pots/${sub}`;
    } else if (seedProduct.category_id?.startsWith('cat-other')) {
      const sub = seedProduct.category_id.replace('cat-other-', '');
      categoryPath = `/products/other/${sub}`;
    }
    return { product: seedProduct, categoryPath };
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

  return SEED_PRODUCTS.filter((p) => p.category_id === categoryId && p.id !== currentProductId).slice(0, limit);
}
