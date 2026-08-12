import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/client';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Store in Supabase database inquiries table as Newsletter Subscription
    try {
      const supabase = createClient();
      await supabase.from('inquiries').insert([
        {
          customer_name: 'Newsletter Subscriber',
          phone: 'N/A',
          email: cleanEmail,
          inquiry_type: 'Newsletter Subscription',
          message: `Subscribed to weekly plant care tips and seasonal nursery updates: ${cleanEmail}`,
          status: 'new',
          created_at: new Date().toISOString(),
        },
      ]);
    } catch (dbErr) {
      console.warn('Newsletter Supabase save warning:', dbErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for subscribing to Shivansh Rose Nursery newsletter!',
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to subscribe.' },
      { status: 500 }
    );
  }
}
