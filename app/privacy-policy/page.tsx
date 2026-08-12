import React from 'react';
import { Metadata } from 'next';
import { ShieldCheck, Lock, Eye, FileText, Mail, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Shivansh Rose Nursery Pune',
  description: 'Privacy Policy and data protection terms for Shivansh Rose Nursery Wakad & Hinjawadi Pune.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background-cream min-h-screen py-16 sm:py-20 font-body text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3 border-b border-surface-default pb-8">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Legal Information
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900">
            Privacy Policy / गोपनीयता नीति
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Last Updated: August 2026 | Shivansh Rose Nursery Pune
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-emerald-100 shadow-soft space-y-8 text-sm leading-relaxed text-slate-700">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
              <Eye className="w-5 h-5 text-emerald-600" /> 1. Information We Collect / जानकारी जो हम एकत्र करते हैं
            </h2>
            <p>
              At <strong>Shivansh Rose Nursery</strong>, we respect your privacy. When you contact us via our website, submit a garden maintenance booking, or request product catalog details over WhatsApp, we collect basic contact information such as:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-4 text-slate-600 font-medium">
              <li>Full Name</li>
              <li>Mobile Number &amp; WhatsApp Contact</li>
              <li>Delivery / Society Address details for garden maintenance visits</li>
              <li>Email address (if provided voluntarily for newsletter updates)</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
              <Lock className="w-5 h-5 text-emerald-600" /> 2. How We Use Your Information / जानकारी का उपयोग
            </h2>
            <p>
              Your contact details are strictly used for nursery operations, including:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-4 text-slate-600 font-medium">
              <li>Confirming garden maintenance appointments and plant delivery slots</li>
              <li>Responding to customer inquiries regarding pot sizes, plant care, and availability</li>
              <li>Sending requested digital product catalogues or WhatsApp updates</li>
              <li>Improving our local nursery services in Wakad, Hinjawadi, and Pune</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600" /> 3. Data Protection &amp; No Third-Party Sharing / डेटा सुरक्षा
            </h2>
            <p>
              We do <strong>NOT</strong> sell, rent, trade, or share your personal contact details with third-party marketing agencies. All customer inquiries and location data remain confidential within Shivansh Rose Nursery management.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="font-display font-bold text-xl text-slate-900">
              4. Contact Us for Privacy Concerns / संपर्क करें
            </h2>
            <p>
              If you have any questions regarding your data or wish to update your details, please reach out to us:
            </p>
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 space-y-1 text-xs sm:text-sm font-semibold text-emerald-950">
              <p>📍 <strong>Branch 1:</strong> Atlanta 2 Society, New Wakad Link Rd, Pune 411057</p>
              <p>📍 <strong>Branch 2:</strong> Hinjewadi Jakatnaka, Wakad Rd, Pune 411057</p>
              <p>📞 <strong>Phone / WhatsApp:</strong> 8007634856 / 9175418744 / 7499165488</p>
              <p>✉️ <strong>Email:</strong> shivanshrosenursery.com@gmail.com</p>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
