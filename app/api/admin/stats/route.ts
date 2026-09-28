import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}

/**
 * Calculates live production metrics from Supabase database tables.
 * Returns total products, active products, featured items, and unread inquiries count.
 *
 * @returns {Promise<NextResponse>} JSON response with real database counts.
 */
export async function GET(): Promise<NextResponse> {
  try {
    const supabase = getSupabaseAdmin();

    const [productsRes, inquiriesRes, reviewsRes] = await Promise.all([
      supabase.from('products').select('id, is_published, is_featured', { count: 'exact' }),
      supabase.from('inquiries').select('id, status', { count: 'exact' }),
      supabase.from('reviews').select('id, rating', { count: 'exact' }),
    ]);

    const products = productsRes.data || [];
    const inquiries = inquiriesRes.data || [];
    const reviews = reviewsRes.data || [];

    const totalProducts = productsRes.count || products.length;
    const activeProducts = products.filter((p) => p.is_published).length;
    const featuredProducts = products.filter((p) => p.is_featured).length;
    const totalInquiries = inquiriesRes.count || inquiries.length;
    const unreadInquiries = inquiries.filter((i) => i.status === 'new').length;

    return NextResponse.json({
      success: true,
      stats: {
        totalProducts,
        activeProducts,
        featuredProducts,
        totalInquiries,
        unreadInquiries,
        totalReviews: reviewsRes.count || reviews.length,
      },
    });
  } catch (error: any) {
    console.error('Admin Stats API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch live admin metrics.' },
      { status: 500 }
    );
  }
}
