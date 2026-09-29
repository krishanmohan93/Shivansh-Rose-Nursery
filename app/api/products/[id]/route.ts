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
 * Handles updating an existing product in Supabase.
 *
 * @param {Request} request - The HTTP request object with updated fields.
 * @param {Object} context - Contains route parameters ({ id }).
 * @returns {Promise<NextResponse>} JSON response indicating success or failure.
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: 'Product ID parameter is required.' }, { status: 400 });
    }

    const body = await request.json();
    const supabase = getSupabaseAdmin();

    const updatePayload: Record<string, any> = {
      ...body,
      updated_at: new Date().toISOString(),
    };

    // Don't allow updating id directly or non-existent columns
    delete updatePayload.id;
    delete updatePayload.cloudinary_public_id;

    const { data: updatedProduct, error } = await supabase
      .from('products')
      .update(updatePayload)
      .or(`id.eq.${id},slug.eq.${id}`)
      .select();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      product: updatedProduct?.[0] || null,
      message: 'Product updated successfully in Supabase database!',
    });
  } catch (error: any) {
    console.error('Products API PUT error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update product in database.' },
      { status: 500 }
    );
  }
}

/**
 * Handles deleting a product permanently from Supabase database.
 *
 * @param {Request} request - The HTTP request object.
 * @param {Object} context - Contains route parameters ({ id }).
 * @returns {Promise<NextResponse>} JSON response indicating deletion status.
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: 'Product ID parameter is required.' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    const { error } = await supabase
      .from('products')
      .delete()
      .or(`id.eq.${id},slug.eq.${id}`);

    if (error) {
      console.error('Supabase Product Delete Error:', error);
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: `Product [${id}] permanently deleted from Supabase database!`,
    });
  } catch (error: any) {
    console.error('Products API DELETE error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete product from database.' },
      { status: 500 }
    );
  }
}
