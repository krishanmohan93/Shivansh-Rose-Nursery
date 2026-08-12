import React from 'react';
import { Metadata } from 'next';
import { AlertCircle, Sprout, ShieldAlert, HeartHandshake } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Disclaimer | Shivansh Rose Nursery Pune',
  description: 'Legal disclaimer and plant care responsibility notice for Shivansh Rose Nursery Wakad & Hinjawadi Pune.',
};

export default function DisclaimerPage() {
  return (
    <div className="bg-background-cream min-h-screen py-16 sm:py-20 font-body text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3 border-b border-surface-default pb-8">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <AlertCircle className="w-4 h-4 text-amber-600" /> Legal Disclaimer
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900">
            Disclaimer &amp; Plant Care Notice
          </h1>
          <p className="font-display font-semibold text-base text-emerald-800">
            अस्वीकरण एवं पौधा देखरेख सूचना
          </p>
          <p className="text-xs text-slate-500 font-medium">
            Shivansh Rose Nursery Pune
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-emerald-100 shadow-soft space-y-8 text-sm leading-relaxed text-slate-700">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
              <Sprout className="w-5 h-5 text-emerald-600" /> 1. Living Organism Disclaimer / पौधा एक सजीव प्राणी है
            </h2>
            <p>
              All plants sold by <strong>Shivansh Rose Nursery</strong> are living biological organisms (&quot;सजीव&quot;). Their lifespan, growth rate, flowering, and leaf color naturally vary depending on environmental factors, seasonal changes, and post-purchase care.
            </p>
            <p>
              While we guarantee that every plant is handed over in healthy, pest-free condition, we cannot guarantee specific growth rates or infinite lifespan, as plant survival is entirely subject to daily care provided by the owner.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-600" /> 2. No Liability for Plant Mortality (Over-Watering &amp; Neglect)
            </h2>
            <p>
              Over-watering is the #1 cause of potted plant mortality. Giving excessive water causes root suffocation and root rot, which can destroy even a healthy plant within 1 to 2 days.
            </p>
            <p className="font-semibold text-slate-900">
              Shivansh Rose Nursery assumes ZERO legal or financial liability for plant death, leaf shedding, or rotting occurring after physical purchase or delivery.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-emerald-600" /> 3. Commitment to Free Plant Care Guidance
            </h2>
            <p>
              We want your garden to blossom! If you notice yellow leaves or have doubts about watering frequency, simply take a photo of your plant and message our expert gardening team over WhatsApp at <strong>8007634856</strong>. We are always happy to offer free care advice!
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
