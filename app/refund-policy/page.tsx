import React from 'react';
import { Metadata } from 'next';
import { RefreshCcw, ShieldAlert, AlertTriangle, CheckCircle2, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Refund & Return Policy | Shivansh Rose Nursery Pune',
  description: 'Official Refund, Return, and Plant Survival Replacement Policy for Shivansh Rose Nursery Wakad & Hinjawadi Pune.',
};

export default function RefundPolicyPage() {
  return (
    <div className="bg-background-cream min-h-screen py-16 sm:py-20 font-body text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3 border-b border-surface-default pb-8">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-amber-600" /> Store Policy Notice
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900">
            Refund, Replacement &amp; Return Policy
          </h1>
          <p className="font-display font-semibold text-base text-emerald-800">
            रिफंड, रिटर्न एवं पौधा बदलाव नीति
          </p>
          <p className="text-xs text-slate-500 font-medium">
            Effective Date: August 2026 | Shivansh Rose Nursery Pune
          </p>
        </div>

        {/* Highlight Important Notice Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-amber-50 border-2 border-amber-300 text-amber-950 space-y-3 shadow-soft">
          <div className="flex items-center gap-2 font-display font-bold text-lg text-amber-900 border-b border-amber-200 pb-2">
            <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
            <span>CRITICAL POLICY NOTICE / महत्वपूर्ण नीति सूचना</span>
          </div>

          <p className="text-sm font-medium leading-relaxed">
            <strong>English:</strong> Plants are living organisms (&quot;सजीव&quot;). Once a plant is purchased or delivered, it <strong>cannot be returned, exchanged, or refunded</strong>. The survival and longevity of a plant depend entirely on post-purchase care (watering frequency, sunlight, soil, and environment). The nursery holds no warranty or liability for plant death occurring after handover.
          </p>

          <p className="text-sm font-medium leading-relaxed text-amber-900">
            <strong>हिंदी:</strong> पौधे सजीव (जीवित) होते हैं। एक बार बिकने के बाद पौधे वापस नहीं होते और न ही कोई रिफंड या रिप्लेसमेंट दिया जाता है। पौधे का जीवन ग्राहक द्वारा की जाने वाली देखभाल (पानी की मात्रा, धूप, और वातावरण) पर निर्भर करता है। यदि पौधे में अत्यधिक पानी (Over-watering) देने से वह १-२ दिन में मर जाता है, तो उसमें नर्सरी की कोई जिम्मेदारी नहीं होती।
          </p>
        </div>

        {/* Detailed Terms */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-emerald-100 shadow-soft space-y-8 text-sm leading-relaxed text-slate-700">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" /> 1. Healthy Plant Handover Guarantee / स्वस्थ पौधा देने की गारंटी
            </h2>
            <p>
              At <strong>Shivansh Rose Nursery</strong>, we inspect all plants prior to store pickup or delivery to ensure they are healthy, insect-free, and well-rooted.
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-4 text-slate-600 font-medium">
              <li>Customers are requested to thoroughly inspect plants at the time of purchase or delivery.</li>
              <li>Once handed over in healthy condition, ownership and plant care responsibility transfer entirely to the customer.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-600" /> 2. No Survival Warranty or Post-Purchase Replacement / पौधा मरने पर कोई रिप्लेसमेंट नहीं
            </h2>
            <p>
              Plants are sensitive living organisms. Common causes for sudden plant damage or plant death after purchase include:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-4 text-slate-600 font-medium">
              <li><strong>Over-watering:</strong> Excess water causes root rot within 1 to 2 days, turning leaves yellow and killing the plant.</li>
              <li><strong>Under-watering:</strong> Prolonged dry soil causing wilting.</li>
              <li><strong>Improper Sunlight:</strong> Placing shade-loving plants in direct harsh sunlight, or sun-loving plants in full darkness.</li>
              <li><strong>Extreme Temperature Shifts:</strong> Sudden relocation or exposure to AC drafts.</li>
            </ul>
            <p className="font-semibold text-slate-900 pt-1">
              Because environmental conditions and watering habits are beyond our control after purchase, Shivansh Rose Nursery provides <u>NO warranty, NO money refund, and NO free replacement</u> for dead or damaged plants post-handover.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
              <RefreshCcw className="w-5 h-5 text-emerald-600" /> 3. Pots, Planters &amp; Garden Accessories Policy / गमले व सामान नीति
            </h2>
            <p>
              For non-living items such as Ceramic Pots, Chinese Porcelain Planters, Fiber Planters, and Plastic Pots:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-4 text-slate-600 font-medium">
              <li>Non-living products can be exchanged at our branch within <strong>24 hours</strong> of purchase only if damaged prior to use or during store delivery.</li>
              <li>Cracks, breakage, or damage occurring after physical customer handover or due to customer handling will not be eligible for return or exchange.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-600" /> 4. Free Plant Care Guidance Support / पौधों की देखभाल में सहायता
            </h2>
            <p>
              While we do not provide refunds or plant replacements, our expert nursery team is always happy to guide you on watering schedules, sunlight needs, and fertilizer usage to help your plants thrive! Feel free to visit our Wakad or Hinjawadi branches or contact us over WhatsApp at <strong>8007634856</strong>.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
