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
 * Handles fetching customer contact inquiries directly from Supabase.
 *
 * @returns {Promise<NextResponse>} JSON response containing inquiries list.
 */
export async function GET(): Promise<NextResponse> {
  try {
    const supabase = getSupabaseAdmin();
    const { data: dbInquiries, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      inquiries: dbInquiries || [],
    });
  } catch (error: any) {
    console.error('Inquiries GET API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch inquiries from database.' },
      { status: 500 }
    );
  }
}

/**
 * Handles updating an inquiry status in Supabase database.
 *
 * @param {Request} request - The HTTP request object.
 * @returns {Promise<NextResponse>} JSON response confirming update status.
 */
export async function PUT(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'Inquiry ID and status are required.' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const { error } = await supabase
      .from('inquiries')
      .update({ status })
      .eq('id', id);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry status updated successfully in Supabase database!',
    });
  } catch (error: any) {
    console.error('Inquiries PUT API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update inquiry status.' },
      { status: 500 }
    );
  }
}
