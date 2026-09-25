import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createClient } from '@/lib/supabase/client';

/**
 * Handles incoming customer contact form submissions.
 * Saves inquiry to Supabase database and sends structured HTML email via Gmail SMTP.
 * 
 * @param {Request} request - The HTTP request object containing customer inquiry JSON body.
 * @returns {Promise<NextResponse>} JSON response indicating success or error status.
 */
export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { name, phone, email, propertyType, serviceRequired, location, message } = body;

    // Validation
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Full Name is required.' }, { status: 400 });
    }

    const cleanPhone = (phone || '').toString().trim().replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      return NextResponse.json({ error: 'Please enter a valid 10-digit mobile number.' }, { status: 400 });
    }

    if (!message || !message.trim()) {
      return NextResponse.json({ error: 'Message content is required.' }, { status: 400 });
    }

    const inquiryId = `INQ-${Date.now().toString().slice(-6)}`;

    // 1. Store in Supabase Database `inquiries` Table
    try {
      const supabase = createClient();
      await supabase.from('inquiries').insert([
        {
          customer_name: name.trim(),
          phone: cleanPhone,
          email: email ? email.trim() : null,
          inquiry_type: serviceRequired || 'General Contact Inquiry',
          message: `[INQUIRY ID: ${inquiryId}]\nProperty: ${propertyType || 'N/A'}\nLocation: ${location || 'N/A'}\nService: ${serviceRequired || 'General Inquiry'}\nMessage: ${message.trim()}`,
          status: 'new',
          created_at: new Date().toISOString(),
        },
      ]);
    } catch (dbErr) {
      console.warn('Database save notice:', dbErr);
    }

    // 2. Structured HTML Email Notification Template
    const targetAdminEmail = process.env.NOTIFICATION_EMAIL || 'shivanshrosenursery.com@gmail.com';
    const emailSubject = `New Customer Contact Inquiry – ${name} [${inquiryId}]`;

    const htmlEmailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f7f4; color: #1e293b; margin: 0; padding: 20px; }
          .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 30px; border: 1px solid #e2e8f0; shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .header { background: #0b6b2e; color: #ffffff; padding: 20px; border-radius: 12px; text-align: center; margin-bottom: 24px; }
          .header h1 { margin: 0; font-size: 20px; font-weight: bold; }
          .badge { display: inline-block; background: #a7f3d0; color: #064e3b; font-weight: bold; font-size: 11px; padding: 4px 12px; border-radius: 20px; margin-top: 6px; text-transform: uppercase; }
          .section { margin-bottom: 20px; padding: 16px; background: #f8faf8; border-radius: 12px; border: 1px solid #e2e8f0; }
          .section-title { font-size: 13px; font-weight: bold; color: #0b6b2e; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; border-b: 1px solid #cbd5e1; pb: 4px; }
          .row { font-size: 14px; margin-bottom: 8px; display: flex; justify-content: space-between; }
          .label { font-weight: 600; color: #64748b; }
          .value { font-weight: 600; color: #0f172a; text-align: right; }
          .msg-box { background: #ffffff; padding: 14px; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 14px; color: #334155; line-height: 1.6; white-space: pre-line; }
          .footer { text-align: center; margin-top: 24px; font-size: 12px; color: #94a3b8; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h1>🌿 NEW WEBSITE CONTACT INQUIRY</h1>
            <span class="badge">Inquiry ID: ${inquiryId}</span>
          </div>

          <div class="section">
            <div class="section-title">👤 Customer Details</div>
            <div class="row"><span class="label">Full Name:</span> <span class="value">${name}</span></div>
            <div class="row"><span class="label">Mobile Number:</span> <span class="value"><a href="tel:${cleanPhone}" style="color: #0b6b2e; text-decoration: none;">${cleanPhone}</a></span></div>
            ${email ? `<div class="row"><span class="label">Email:</span> <span class="value">${email}</span></div>` : ''}
            <div class="row"><span class="label">Property Type:</span> <span class="value">${propertyType || 'N/A'}</span></div>
            <div class="row"><span class="label">Location / Society:</span> <span class="value">${location || 'N/A'}</span></div>
            <div class="row"><span class="label">Service Requested:</span> <span class="value" style="color: #0b6b2e;">${serviceRequired || 'General Contact'}</span></div>
          </div>

          <div class="section">
            <div class="section-title">💬 Customer Message</div>
            <div class="msg-box">${message}</div>
          </div>

          <div class="footer">
            Shivansh Rose Nursery Pune — Contact Notification Engine<br>
            Wakad &amp; Hinjawadi Branches | 8007634856
          </div>
        </div>
      </body>
      </html>
    `;

    // 3. Dispatch Email Notification via Gmail SMTP
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpUser = process.env.SMTP_USER || 'shivanshrosenursery.com@gmail.com';
    const smtpPass = process.env.SMTP_PASS;

    if (smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: Boolean(process.env.SMTP_SECURE === 'true'),
          auth: { user: smtpUser, pass: smtpPass },
        });

        await transporter.sendMail({
          from: `"Shivansh Rose Nursery" <${smtpUser}>`,
          to: targetAdminEmail,
          replyTo: email && email.includes('@') ? email : undefined,
          subject: emailSubject,
          html: htmlEmailContent,
        });
        console.log(`✅ [Contact Email Sent] Dispatched successfully to ${targetAdminEmail}`);
      } catch (emailErr) {
        console.error('❌ [Contact Email Error]:', emailErr);
      }
    } else {
      console.log('--- 📩 INQUIRY EMAIL PREVIEW (Set SMTP_PASS in .env.local for real sending) ---');
      console.log(`TO: ${targetAdminEmail}`);
      console.log(`SUBJECT: ${emailSubject}`);
      console.log(`CUSTOMER: ${name} (${cleanPhone})`);
      console.log(`MESSAGE: ${message}`);
      console.log('---------------------------------------------------------------------------------');
    }

    return NextResponse.json({
      success: true,
      inquiryId,
      message: 'Thank you for contacting Shivansh Rose Nursery! We will call you back shortly.',
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to submit inquiry.' },
      { status: 500 }
    );
  }
}
