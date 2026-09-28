import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { SEED_PRODUCTS } from '@/lib/data/products-seed';
import { Product } from '@/types/database';

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}

/**
 * Handles fetching products from Supabase with filtering & pagination.
 * If database is empty, seeds initial catalog into Supabase automatically.
 *
 * @param {Request} request - The HTTP request object.
 * @returns {Promise<NextResponse>} JSON response containing products list.
 */
export async function GET(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const categoryGroup = searchParams.get('categoryGroup');
    const categorySlug = searchParams.get('categorySlug');
    const publishedOnly = searchParams.get('publishedOnly') === 'true';
    const featuredOnly = searchParams.get('featuredOnly') === 'true';
    const searchQuery = searchParams.get('q');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '100', 10);

    const supabase = getSupabaseAdmin();

    // 1. Check if DB has products; if empty, seed automatically once
    const { count: initialCount } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });

    if (initialCount === 0 || initialCount === null) {
      console.log('⚡ Supabase products table is empty. Auto-seeding catalog...');
      const seedPayload = SEED_PRODUCTS.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        category_id: p.category_id,
        short_description: p.short_description || '',
        description: p.description || '',
        suitable_for: p.suitable_for || ['Indoor', 'Living Room'],
        plant_care_difficulty: p.plant_care_difficulty || 'Easy',
        sunlight: p.sunlight || 'Bright Indirect Light',
        water: p.water || 'Water Weekly',
        availability_status: p.availability_status || 'In Stock',
        sizes: p.sizes || ['Small', 'Medium'],
        colors: p.colors || ['Green'],
        cloudinary_url: p.cloudinary_url || '/images/plants/peace lily.jpg',
        features: p.features || ['High Quality Specimen'],
        specifications: p.specifications || {},
        is_published: p.is_published !== false,
        is_featured: !!p.is_featured,
        is_popular: !!p.is_popular,
        show_on_homepage: !!p.show_on_homepage,
        created_at: p.created_at || new Date().toISOString(),
        updated_at: p.updated_at || new Date().toISOString(),
      }));

      await supabase.from('products').upsert(seedPayload);
    }

    // 2. Query Products from Supabase
    let query = supabase.from('products').select('*', { count: 'exact' });

    if (publishedOnly) {
      query = query.eq('is_published', true);
    }

    if (featuredOnly) {
      query = query.eq('is_featured', true);
    }

    if (categorySlug) {
      // Filter by category_id or slug matching
      query = query.or(`category_id.eq.${categorySlug},category_id.ilike.%${categorySlug}%`);
    }

    if (searchQuery) {
      query = query.or(`name.ilike.%${searchQuery}%,short_description.ilike.%${searchQuery}%`);
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data: dbProducts, count, error } = await query
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      data: dbProducts || [],
      total: count || 0,
      page,
      limit,
    });
  } catch (error: any) {
    console.error('Products API GET error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch products from database.' },
      { status: 500 }
    );
  }
}

/**
 * Handles adding a new product directly into Supabase database.
 *
 * @param {Request} request - The HTTP request object with new product payload.
 * @returns {Promise<NextResponse>} JSON response containing inserted product.
 */
export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();
    const {
      name,
      category_id,
      short_description,
      description,
      sunlight,
      water,
      availability_status = 'In Stock',
      sizes = [],
      colors = [],
      cloudinary_url,
      cloudinary_public_id,
      is_published = true,
      is_featured = false,
      specifications = {},
    } = body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Product Name is required.' }, { status: 400 });
    }

    if (!category_id) {
      return NextResponse.json({ error: 'Product Category is required.' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const cleanName = name.trim();
    const baseSlug = cleanName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    const newProductPayload: Partial<Product> = {
      name: cleanName,
      slug,
      category_id: category_id.trim(),
      short_description: (short_description || cleanName).trim(),
      description: (description || short_description || cleanName).trim(),
      suitable_for: ['Home & Garden Decor'],
      plant_care_difficulty: 'Easy',
      sunlight: sunlight || 'Bright Indirect Light',
      water: water || 'Water Weekly',
      availability_status: availability_status as any,
      sizes: Array.isArray(sizes) && sizes.length > 0 ? sizes : ['Standard'],
      colors: Array.isArray(colors) && colors.length > 0 ? colors : ['Default'],
      cloudinary_url: cloudinary_url || '/images/plants/peace lily.jpg',
      cloudinary_public_id: cloudinary_public_id || null,
      features: ['Nursery Specimen', 'Hand Selected'],
      specifications: specifications || { Placement: 'Indoor & Outdoor' },
      is_published: Boolean(is_published),
      is_featured: Boolean(is_featured),
      is_popular: Boolean(is_featured),
      show_on_homepage: Boolean(is_featured),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data: insertedProduct, error } = await supabase
      .from('products')
      .insert([newProductPayload])
      .select()
      .single();

    if (error) {
      console.error('Supabase Product Insert Error:', error);
      throw error;
    }

    return NextResponse.json({
      success: true,
      product: insertedProduct,
      message: 'Product added successfully to Supabase database!',
    });
  } catch (error: any) {
    console.error('Products API POST error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create product in database.' },
      { status: 500 }
    );
  }
}
