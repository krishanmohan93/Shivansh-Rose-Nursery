import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createClient } from '@/lib/supabase/client';

/**
 * Handles incoming garden maintenance service booking submissions.
 * Stores booking details in Supabase inquiries table and dispatches formatted HTML email to nursery owner via Gmail SMTP.
 * 
 * @param {Request} request - The HTTP request object containing booking details.
 * @returns {Promise<NextResponse>} JSON response confirming booking registration.
 */
export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();

    const {
      name,
      phone,
      email: customerEmail,
      society,
      building,
      flat,
      address,
      location,
      plan = 'Moderate Plan — ₹1,499 / Visit',
      planPrice = '₹1,499 / Visit',
      plantsCount = '10–15 Plants',
      preferredDate,
      preferredTime,
      notes = '',
    } = body;

    // Server-Side Input Validation
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Full Name is required.' }, { status: 400 });
    }

    const cleanPhone = (phone || '').toString().trim().replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      return NextResponse.json(
        { error: 'Please enter a valid 10-digit mobile number.' },
        { status: 400 }
      );
    }

    if (!society || !building || !flat || !address || !location) {
      return NextResponse.json(
        { error: 'Complete address details (Society, Wing/Building, Flat #, Address, Location) are required.' },
        { status: 400 }
      );
    }

    if (!preferredDate || !preferredTime) {
      return NextResponse.json(
        { error: 'Preferred service date and time slot are required.' },
        { status: 400 }
      );
    }

    const bookingId = `GMB-${Date.now().toString().slice(-6)}`;
    const fullFormattedAddress = `Flat No. ${flat}, ${building}, ${society}, ${address}, ${location}`;

    // 1. Save Booking Entry into Supabase Database `inquiries` Table
    try {
      const supabase = createClient();
      await supabase.from('inquiries').insert([
        {
          customer_name: name.trim(),
          phone: cleanPhone,
          email: customerEmail ? customerEmail.trim() : null,
          inquiry_type: `Garden Maintenance Booking – ${plan}`,
          message: `[BOOKING ID: ${bookingId}]\nPlan: ${plan}\nPrice: ${planPrice}\nPlants: ${plantsCount}\nDate: ${preferredDate}\nTime: ${preferredTime}\nAddress: ${fullFormattedAddress}\nNotes: ${notes || 'None'}`,
          status: 'new',
          created_at: new Date().toISOString(),
        },
      ]);
    } catch (dbErr) {
      console.warn('Database save warning (falling back to email dispatch):', dbErr);
    }

    // 2. Format HTML Email Content for Nursery Admin
    const emailSubject = `New Garden Maintenance Booking – ${plan} [${bookingId}]`;
    const targetAdminEmail = process.env.NOTIFICATION_EMAIL || 'shivanshrosenursery.com@gmail.com';

    const htmlEmailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f4; color: #1e293b; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 30px; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .header { background: #0b6b2e; color: #ffffff; padding: 20px; border-radius: 12px; text-align: center; margin-bottom: 24px; }
          .header h1 { margin: 0; font-size: 22px; }
          .badge { display: inline-block; background: #22c55e; color: #072412; font-weight: bold; font-size: 12px; padding: 4px 12px; border-radius: 20px; margin-top: 8px; text-transform: uppercase; }
          .section { margin-bottom: 20px; padding: 16px; background: #f8faf8; border-radius: 12px; border: 1px solid #e2e8f0; }
          .section-title { font-size: 14px; font-weight: bold; color: #0b6b2e; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; border-bottom: 1px solid #cbd5e1; padding-bottom: 6px; }
          .row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; }
          .label { font-weight: 600; color: #64748b; }
          .value { font-weight: 600; color: #0f172a; text-align: right; }
          .address-box { font-size: 14px; color: #334155; line-height: 1.6; }
          .footer { text-align: center; margin-top: 24px; font-size: 12px; color: #94a3b8; }
          .distance-notice { background: #fffbeb; border: 1px solid #fef3c7; color: #92400e; padding: 10px 14px; border-radius: 8px; font-size: 13px; margin-top: 12px; font-weight: 500; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🌿 NEW GARDEN MAINTENANCE BOOKING</h1>
            <span class="badge">Booking ID: ${bookingId}</span>
          </div>

          <!-- Customer Info -->
          <div class="section">
            <div class="section-title">👤 Customer Details</div>
            <div class="row"><span class="label">Full Name:</span> <span class="value">${name}</span></div>
            <div class="row"><span class="label">Mobile Number:</span> <span class="value"><a href="tel:${cleanPhone}" style="color: #0b6b2e; text-decoration: none;">${cleanPhone}</a></span></div>
            ${customerEmail ? `<div class="row"><span class="label">Email:</span> <span class="value">${customerEmail}</span></div>` : ''}
          </div>

          <!-- Service & Plan Details -->
          <div class="section">
            <div class="section-title">🪴 Service & Plan Selected</div>
            <div class="row"><span class="label">Selected Plan:</span> <span class="value" style="color: #0b6b2e; font-weight: bold;">${plan}</span></div>
            <div class="row"><span class="label">Estimated Rate:</span> <span class="value">${planPrice}</span></div>
            <div class="row"><span class="label">Est. Plants Count:</span> <span class="value">${plantsCount}</span></div>
            <div class="row"><span class="label">Requested Date:</span> <span class="value">${preferredDate}</span></div>
            <div class="row"><span class="label">Preferred Time Slot:</span> <span class="value">${preferredTime}</span></div>
          </div>

          <!-- Address -->
          <div class="section">
            <div class="section-title">📍 Service Location Address</div>
            <div class="address-box">
              <strong>Flat / House #:</strong> ${flat}<br>
              <strong>Wing / Building:</strong> ${building}<br>
              <strong>Society Name:</strong> ${society}<br>
              <strong>Area / Landmark:</strong> ${location}<br>
              <strong>Full Address:</strong> ${address}
            </div>

            <div class="distance-notice">
              ⚠️ <strong>Distance Charge Policy:</strong> Standard rates apply within 5 km. Locations beyond 5 km are charged ₹35/km extra. Please verify distance upon appointment confirmation.
            </div>
          </div>

          <!-- Additional Notes -->
          ${notes ? `
          <div class="section">
            <div class="section-title">💬 Additional Customer Notes</div>
            <div class="address-box">${notes}</div>
          </div>
          ` : ''}

          <div class="footer">
            Shivansh Rose Nursery — Digital Maintenance Booking Engine<br>
            Atlanta 2 Society, Wakad & Hinjawadi Jakatnaka, Pune | 8007634856
          </div>
        </div>
      </body>
      </html>
    `;

    // 3. Dispatch Email via Nodemailer if SMTP Credentials exist
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpUser = process.env.SMTP_USER || 'shivanshrosenursery.com@gmail.com';
    const smtpPass = process.env.SMTP_PASS;

    if (smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: Boolean(process.env.SMTP_SECURE === 'true'),
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: `"Shivansh Rose Nursery" <${smtpUser}>`,
          to: targetAdminEmail,
          replyTo: customerEmail && customerEmail.includes('@') ? customerEmail : undefined,
          subject: emailSubject,
          html: htmlEmailContent,
        });
        console.log(`✅ [Booking Email Sent] Dispatched successfully to ${targetAdminEmail}`);
      } catch (emailErr) {
        console.error('❌ [Booking Email Error]:', emailErr);
      }
    } else {
      console.log('--- 📩 BOOKING EMAIL PREVIEW (Set SMTP_PASS in .env.local for real sending) ---');
      console.log(`TO: ${targetAdminEmail}`);
      console.log(`SUBJECT: ${emailSubject}`);
      console.log(`CUSTOMER: ${name} (${cleanPhone})`);
      console.log(`ADDRESS: ${fullFormattedAddress}`);
      console.log('-------------------------------------------------------------------------------');
    }

    return NextResponse.json({
      success: true,
      bookingId,
      message: 'Your garden maintenance booking request has been submitted successfully!',
    });
  } catch (error: any) {
    console.error('Booking submission endpoint error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to submit garden maintenance booking. Please try again.' },
      { status: 500 }
    );
  }
}
