import { Product } from '@/types/database';
import { SEED_PRODUCTS } from '@/lib/data/products-seed';
import { createClient } from '@/lib/supabase/client';

const STORAGE_KEY = 'shivansh_products_v1';
const DELETED_KEY = 'shivansh_deleted_product_ids_v1';
export const PRODUCTS_UPDATED_EVENT = 'shivansh_products_updated';

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return Boolean(url && !url.includes('placeholder') && url.startsWith('http'));
}

/**
 * Retrieves the list of deleted product IDs / slugs from localStorage.
 */
export function getDeletedProductIds(): Set<string> {
  if (typeof window === 'undefined') {
    return new Set();
  }
  try {
    const raw = localStorage.getItem(DELETED_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return new Set(parsed);
      }
    }
  } catch (e) {
    console.error('Failed to parse deleted product IDs:', e);
  }
  return new Set();
}

/**
 * Retrieves the current list of active products.
 * Excludes any products present in deleted IDs list.
 */
export function getStoredProducts(): Product[] {
  if (typeof window === 'undefined') {
    return SEED_PRODUCTS;
  }

  const deletedIds = getDeletedProductIds();

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Filter out any products explicitly deleted
        const activeParsed = parsed.filter(
          (p: Product) => !deletedIds.has(p.id) && !deletedIds.has(p.slug)
        );

        // Merge missing SEED_PRODUCTS into active parsed if not deleted
        const parsedIds = new Set(activeParsed.map((p: Product) => p.id));
        const missingSeedItems = SEED_PRODUCTS.filter(
          (s) => !parsedIds.has(s.id) && !deletedIds.has(s.id) && !deletedIds.has(s.slug)
        );

        if (missingSeedItems.length > 0) {
          const merged = [...activeParsed, ...missingSeedItems];
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
          } catch (e) {
            // Ignore storage quota
          }
          return merged;
        }

        return activeParsed;
      }
    }
  } catch (err) {
    console.error('Failed to parse stored products from localStorage:', err);
  }

  // Fallback to seed data excluding deleted items
  const activeSeed = SEED_PRODUCTS.filter(
    (s) => !deletedIds.has(s.id) && !deletedIds.has(s.slug)
  );

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activeSeed));
  } catch (e) {
    // Ignore storage quota errors
  }
  return activeSeed;
}

/**
 * Saves products array to localStorage and notifies listeners.
 */
export function setStoredProducts(products: Product[]): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
      window.dispatchEvent(new Event(PRODUCTS_UPDATED_EVENT));
    } catch (err) {
      console.error('Failed to save products to localStorage:', err);
    }
  }
}

/**
 * Deletes a product by ID or slug from persistent storage and Supabase if active.
 */
export async function deleteStoredProduct(id: string): Promise<Product[]> {
  const current = getStoredProducts();
  const target = current.find((p) => p.id === id || p.slug === id);

  // Track deletion in deleted IDs set so seed data never restores it
  if (typeof window !== 'undefined') {
    try {
      const deletedIds = getDeletedProductIds();
      deletedIds.add(id);
      if (target) {
        deletedIds.add(target.id);
        deletedIds.add(target.slug);
      }
      localStorage.setItem(DELETED_KEY, JSON.stringify(Array.from(deletedIds)));
    } catch (e) {
      console.error('Failed to save deleted ID:', e);
    }
  }

  const updated = current.filter((p) => p.id !== id && p.slug !== id);
  setStoredProducts(updated);

  // Sync deletion with Supabase if configured
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      await supabase.from('products').delete().or(`id.eq.${id},slug.eq.${id}`);
    } catch (err) {
      console.warn('Failed to delete product from Supabase DB:', err);
    }
  }

  return updated;
}

/**
 * Adds or updates a product in persistent storage and Supabase if active.
 */
export async function saveStoredProduct(product: Product): Promise<Product[]> {
  // If product was previously deleted, unmark from deleted IDs
  if (typeof window !== 'undefined') {
    try {
      const deletedIds = getDeletedProductIds();
      deletedIds.delete(product.id);
      deletedIds.delete(product.slug);
      localStorage.setItem(DELETED_KEY, JSON.stringify(Array.from(deletedIds)));
    } catch (e) {}
  }

  const current = getStoredProducts();
  const index = current.findIndex((p) => p.id === product.id || p.slug === product.slug);

  let updated: Product[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = { ...product, updated_at: new Date().toISOString() };
  } else {
    updated = [{ ...product, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }, ...current];
  }

  setStoredProducts(updated);

  // Sync upsert with Supabase if configured
  if (isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      await supabase.from('products').upsert(product);
    } catch (err) {
      console.warn('Failed to save product to Supabase DB:', err);
    }
  }

  return updated;
}

/**
 * Toggles visibility (is_published) for a product.
 */
export async function toggleStoredProductVisibility(id: string): Promise<Product[]> {
  const current = getStoredProducts();
  const updated = current.map((p) => {
    if (p.id === id || p.slug === id) {
      return { ...p, is_published: !p.is_published, updated_at: new Date().toISOString() };
    }
    return p;
  });

  setStoredProducts(updated);

  const target = updated.find((p) => p.id === id || p.slug === id);
  if (target && isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      await supabase.from('products').update({ is_published: target.is_published }).eq('id', target.id);
    } catch (err) {
      console.warn('Failed to update product visibility in Supabase:', err);
    }
  }

  return updated;
}

/**
 * Toggles featured status (is_featured) for a product.
 */
export async function toggleStoredProductFeatured(id: string): Promise<Product[]> {
  const current = getStoredProducts();
  const updated = current.map((p) => {
    if (p.id === id || p.slug === id) {
      return { ...p, is_featured: !p.is_featured, updated_at: new Date().toISOString() };
    }
    return p;
  });

  setStoredProducts(updated);

  const target = updated.find((p) => p.id === id || p.slug === id);
  if (target && isSupabaseConfigured()) {
    try {
      const supabase = createClient();
      await supabase.from('products').update({ is_featured: target.is_featured }).eq('id', target.id);
    } catch (err) {
      console.warn('Failed to update product featured status in Supabase:', err);
    }
  }

  return updated;
}
