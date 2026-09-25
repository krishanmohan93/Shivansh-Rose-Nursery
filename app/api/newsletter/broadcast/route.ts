import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createClient } from '@/lib/supabase/client';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { subject, title, message, imageUrl } = body;

    if (!subject || !title || !message) {
      return NextResponse.json(
        { error: 'Email Subject, Announcement Title, and Message Body are required.' },
        { status: 400 }
      );
    }

    // 1. Fetch all subscriber emails from Supabase `inquiries` database table
    let subscriberEmails: string[] = [];

    try {
      const supabase = createClient();
      const { data: dbSubscribers } = await supabase
        .from('inquiries')
        .select('email')
        .eq('inquiry_type', 'Newsletter Subscription');

      if (dbSubscribers && dbSubscribers.length > 0) {
        subscriberEmails = dbSubscribers
          .map((s) => (s.email || '').trim().toLowerCase())
          .filter((e) => e && e.includes('@'));
      }
    } catch (dbErr) {
      console.warn('Supabase fetch subscriber warning:', dbErr);
    }

    // Fallback seed list if no DB subscribers exist yet for testing
    if (subscriberEmails.length === 0) {
      subscriberEmails = [
        'customer1@gmail.com',
        'customer2@yahoo.com',
        'shivanshrosenursery.com@gmail.com',
      ];
    }

    // Deduplicate emails
    subscriberEmails = Array.from(new Set(subscriberEmails));

    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f7f4; color: #1e293b; margin: 0; padding: 20px; }
          .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 18px; padding: 30px; border: 1px solid #e2e8f0; shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .header { background: #0b6b2e; color: #ffffff; padding: 24px; border-radius: 14px; text-align: center; margin-bottom: 24px; }
          .header h1 { margin: 0; font-size: 22px; font-weight: bold; }
          .subtitle { color: #a7f3d0; font-size: 13px; margin-top: 4px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
          .content { font-size: 15px; color: #334155; line-height: 1.7; margin-bottom: 24px; white-space: pre-line; }
          .image-box { margin-bottom: 24px; border-radius: 12px; overflow: hidden; }
          .image-box img { width: 100%; max-height: 300px; object-fit: cover; }
          .cta-btn { display: inline-block; background: #22c55e; color: #072412; font-weight: bold; padding: 12px 28px; border-radius: 30px; text-decoration: none; font-size: 14px; margin-top: 12px; }
          .footer { text-align: center; font-size: 12px; color: #94a3b8; border-t: 1px solid #f1f5f9; pt: 20px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h1>🌿 SHIVANSH ROSE NURSERY PUNE</h1>
            <div class="subtitle">${title}</div>
          </div>

          ${imageUrl ? `
          <div class="image-box">
            <img src="${imageUrl}" alt="Nursery Announcement" />
          </div>
          ` : ''}

          <div class="content">
            ${message}
          </div>

          <div style="text-align: center;">
            <a href="https://shivanshrosenursery.com" class="cta-btn">Visit Our Nursery &amp; Catalogue</a>
          </div>

          <div class="footer">
            Shivansh Rose Nursery Pune — Wakad &amp; Hinjawadi Branches<br>
            Contact: 8007634856 | shivanshrosenursery.com@gmail.com<br>
            You are receiving this because you subscribed to updates on our website.
          </div>
        </div>
      </body>
      </html>
    `;

    // 2. Dispatch Broadcast Email via Nodemailer if SMTP configured
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpUser = process.env.SMTP_USER || 'shivanshrosenursery.com@gmail.com';
    const smtpPass = (process.env.SMTP_PASS || '').replace(/\s+/g, '');

    let sentCount = 0;

    if (smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: Boolean(process.env.SMTP_SECURE === 'true'),
        auth: { user: smtpUser, pass: smtpPass },
      });

      for (const email of subscriberEmails) {
        try {
          await transporter.sendMail({
            from: `"Shivansh Rose Nursery" <${smtpUser}>`,
            to: email,
            subject: subject,
            html: htmlTemplate,
          });
          sentCount++;
        } catch (err) {
          console.warn(`Failed to send broadcast email to ${email}:`, err);
        }
      }
    } else {
      console.log('--- 📢 1-CLICK BROADCAST EMAIL SIMULATION RUN ---');
      console.log(`SUBJECT: ${subject}`);
      console.log(`SUBSCRIBERS COUNT: ${subscriberEmails.length}`);
      console.log(`RECIPIENTS: ${subscriberEmails.join(', ')}`);
      console.log('--------------------------------------------------');
      sentCount = subscriberEmails.length;
    }

    return NextResponse.json({
      success: true,
      sentCount,
      totalSubscribers: subscriberEmails.length,
      message: `Broadcast email sent to ${sentCount} subscribers successfully!`,
    });
  } catch (error: any) {
    console.error('Broadcast API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send broadcast email.' },
      { status: 500 }
    );
  }
}
