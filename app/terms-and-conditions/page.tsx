import React from 'react';
import { Metadata } from 'next';
import { FileText, ShieldCheck, Scale, MapPin, Clock, Truck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Shivansh Rose Nursery Pune',
  description: 'Terms and Conditions governing product catalogue browsing, store visits, and garden maintenance services for Shivansh Rose Nursery Pune.',
};

export default function TermsAndConditionsPage() {
  return (
    <div className="bg-background-cream min-h-screen py-16 sm:py-20 font-body text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3 border-b border-surface-default pb-8">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Scale className="w-4 h-4 text-emerald-600" /> Terms of Service
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900">
            Terms &amp; Conditions / सेवा और बिक्री की शर्तें
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Effective Date: August 2026 | Shivansh Rose Nursery Pune
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-emerald-100 shadow-soft space-y-8 text-sm leading-relaxed text-slate-700">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600" /> 1. Digital Catalogue &amp; Inquiry-Based Ordering
            </h2>
            <p>
              Welcome to <strong>Shivansh Rose Nursery</strong>. Our website operates as a digital showcase catalogue for plant varieties, ceramic pots, planters, and landscaping services.
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-4 text-slate-600 font-medium">
              <li>Our website does NOT process direct online payments, cart checkouts, or payment gateway transactions.</li>
              <li>Product availability and final pricing are confirmed upon store visit or via direct WhatsApp inquiry at <strong>8007634856</strong>.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" /> 2. Plant Purchase &amp; Handover Policy
            </h2>
            <p>
              All plants are sold as living organisms (&quot;सजीव&quot;) and are handed over in healthy, pest-free condition.
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-4 text-slate-600 font-medium">
              <li>Once sold or delivered, plants cannot be returned, exchanged, or refunded.</li>
              <li>Plant survival depends on customer post-purchase care (watering frequency, sunlight, soil, weather). The nursery holds no liability for plant death or damage post-handover.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
              <Truck className="w-5 h-5 text-emerald-600" /> 3. Garden Maintenance Service &amp; Distance Policy
            </h2>
            <p>
              For customers booking our professional Garden Maintenance AMC service:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-4 text-slate-600 font-medium">
              <li>Standard plan prices (Basic ₹499, Moderate ₹1,499, High ₹2,999) include service visits within a <strong>5 km radius</strong> of our Wakad / Hinjawadi branches.</li>
              <li>For locations beyond 5 km, an additional distance charge of <strong>₹35 / km</strong> applies.</li>
              <li>Special plant-care materials (specialized pesticides, fungicides, extra soil bags) requested beyond standard maintenance are billed separately.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-600" /> 4. Store Hours &amp; Customer Support
            </h2>
            <p>
              Our nursery branches in New Wakad Link Rd and Hinjewadi Jakatnaka operate:
            </p>
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 font-semibold text-emerald-950 text-xs sm:text-sm space-y-1">
              <p>⏰ <strong>Business Hours:</strong> 8:00 AM – 10:30 PM (All 7 Days Open)</p>
              <p>📞 <strong>Helpline:</strong> 8007634856 / 9175418744 / 7499165488</p>
              <p>✉️ <strong>Email:</strong> shivanshrosenursery.com@gmail.com</p>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
