'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Check,
  Sparkles,
  Gift,
  ShieldCheck,
  ArrowRight,
  Sprout,
  Info,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { PlanDetails } from './GardenBookingModal';

interface GardenMaintenancePlansSectionProps {
  language: 'en' | 'hi';
  onSelectPlan: (plan: PlanDetails) => void;
}

export const GARDEN_PLANS: (PlanDetails & {
  badge?: string;
  badgeHi?: string;
  highlight?: boolean;
  featuresEn: string[];
  featuresHi: string[];
  distanceEn: string;
  distanceHi: string;
  additionalNoticeEn?: string;
  additionalNoticeHi?: string;
  complimentaryPlantEn?: string;
  complimentaryPlantHi?: string;
})[] = [
  {
    id: 'basic-plan',
    nameEn: 'Basic Plan',
    nameHi: 'बेसिक प्लान',
    priceEn: '₹499 / Visit',
    priceHi: '₹४९९ / विजिट',
    plantsCountEn: '5–6 Plants Collection',
    plantsCountHi: '५-६ पौधों का मेंटेनेंस',
    featuresEn: [
      'Maintenance of 5–6 plants',
      'Suitable for planters below 8–12 inches',
      'Basic pruning and trimming',
      'General plant health check',
      'Basic fertilizer application',
    ],
    featuresHi: [
      '५-६ पौधों का संपूर्ण मेंटेनेंस',
      '८-१२ इंच से छोटे गमलों के लिए उपयुक्त',
      'बेसिक प्रूनिंग और कटाई-छंटाई',
      'सामान्य पौधों के स्वास्थ्य की जांच',
      'जैविक उर्वरक (खाद) अनुप्रयोग',
    ],
    distanceEn: '₹499 service charge applies within 5 km. For locations beyond 5 km, an additional ₹35/km distance charge applies.',
    distanceHi: '५ किमी के भीतर ₹४९९ सेवा शुल्क। ५ किमी से आगे जाने पर ₹३५/किमी अतिरिक्त दूरी शुल्क लागू।',
  },
  {
    id: 'moderate-plan',
    nameEn: 'Moderate Plan',
    nameHi: 'मॉडरेट प्लान',
    priceEn: '₹1,499 / Visit',
    priceHi: '₹१,४९९ / विजिट',
    plantsCountEn: '10–15 Plants Collection',
    plantsCountHi: '१०-१५ पौधों का मेंटेनेंस',
    badge: 'Most Popular',
    badgeHi: 'सर्वाधिक लोकप्रिय',
    highlight: true,
    featuresEn: [
      'Maintenance of 10–15 plants',
      'Suitable for planters from 4 to 18 inches',
      'Pruning and trimming',
      'Plant health inspection',
      'Fertilizer application',
      'Basic pest and disease management',
    ],
    featuresHi: [
      '१०-१५ पौधों का विस्तृत रखरखाव',
      '४ से १८ इंच वाले गमलों के लिए उपयुक्त',
      'प्रोफेशनल प्रूनिंग और कटाई-छंटाई',
      'पौधों के स्वास्थ्य का गहन निरीक्षण',
      'जैविक उर्वरक (खाद) एवं पोषण अनुप्रयोग',
      'कीट एवं कवक (पेस्ट/फंगस) रोग प्रबंधन',
    ],
    distanceEn: '₹1,499 service charge applies within 5 km. For locations beyond 5 km, an additional ₹35/km distance charge applies.',
    distanceHi: '५ किमी के भीतर ₹१,४९९ सेवा शुल्क। ५ किमी से आगे जाने पर ₹३५/किमी अतिरिक्त दूरी शुल्क लागू।',
  },
  {
    id: 'high-plan',
    nameEn: 'High Plan',
    nameHi: 'हाई प्लान',
    priceEn: '₹2,999 / Visit',
    priceHi: '₹२,९९९ / विजिट',
    plantsCountEn: '25–30 Plants Collection',
    plantsCountHi: '२५-३० पौधों का मेंटेनेंस',
    badge: 'Free Gift Plant Included',
    badgeHi: 'मुफ्त पौधा उपहार में',
    complimentaryPlantEn: '🎁 Includes 1 complimentary plant worth ₹150!',
    complimentaryPlantHi: '🎁 ₹१५० मूल्य का १ पौधा बिल्कुल मुफ्त!',
    featuresEn: [
      'Maintenance of 25–30 plants',
      'Suitable for planters from 4 to 24 inches',
      'Complete pruning and trimming',
      'Detailed plant health inspection',
      'Fertilizer application',
      'Basic pest and disease management',
      'Professional plant care guidance',
    ],
    featuresHi: [
      '२५-३० पौधों का संपूर्ण गार्डन केयर',
      '४ से २४ इंच तक के सभी गमलों के लिए',
      'कम्प्लीट प्रूनिंग और शेप ट्रिमिंग',
      'पौधों का विस्तृत हेल्थ इंस्पेक्शन',
      'ऑर्गेनिक वर्मीकम्पोस्ट एवं खाद पोषण',
      'कीट, फंगस एवं रोग प्रबंधन उपचार',
      'एक्सपर्ट गार्डनिंग और केयर गाइडेंस',
    ],
    distanceEn: '₹2,999 service charge applies within 5 km. For locations beyond 5 km, an additional ₹35/km distance charge applies.',
    distanceHi: '५ किमी के भीतर ₹२,९९९ सेवा शुल्क। ५ किमी से आगे जाने पर ₹३५/किमी अतिरिक्त दूरी शुल्क लागू।',
  },
  {
    id: 'custom-plan',
    nameEn: 'Custom Plan',
    nameHi: 'कस्टम प्लान',
    priceEn: '₹30 / Plant',
    priceHi: '₹३० / पौधा',
    plantsCountEn: 'Per Plant Customized Billing',
    plantsCountHi: 'प्रति पौधा कस्टमाइज्ड बिलिंग',
    featuresEn: [
      'Suitable for customized requirements',
      'Applicable for planters up to & including 16 inches',
      'Ideal for customers with specialized collections',
      'Tailored per-plant care service',
    ],
    featuresHi: [
      'आपकी विशेष आवश्यकताओं के अनुकूल',
      '१६ इंच तक के सभी गमलों के लिए लागू',
      'कस्टम बालकनी या टैरेस के लिए उत्तम',
      'प्रति पौधा विशेष देखभाल सेवा',
    ],
    distanceEn: 'Standard distance rules apply.',
    distanceHi: 'मानक दूरी नियम लागू होते हैं।',
    additionalNoticeEn: 'Fertilizers, pesticides, fungicides, specialized garden chemicals, and other special plant-care materials are charged separately based on actual usage.',
    additionalNoticeHi: 'उर्वरक, कीटनाशक, फफूंदनाशी, विशेष गार्डनिंग रसायन एवं अन्य विशेष सामग्री का उपयोग के अनुसार अलग से शुल्क लिया जाता है।',
  },
];

export const GardenMaintenancePlansSection: React.FC<GardenMaintenancePlansSectionProps> = ({
  language,
  onSelectPlan,
}) => {
  return (
    <section id="garden-plans" className="py-16 sm:py-20 bg-gradient-to-b from-background-cream via-surface-low to-background-cream relative overflow-hidden border-t border-surface-default">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs sm:text-sm font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{language === 'hi' ? 'गार्डन मेंटेनेंस प्लान' : 'Garden Maintenance Plans'}</span>
          </span>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            {language === 'hi'
              ? 'गार्डन प्लान जो आपकी आवश्यकता से मेल खाते हैं'
              : 'Garden Plans That Match Your Requirements'}
          </h2>

          <p className="font-body text-slate-600 text-sm sm:text-base leading-relaxed">
            {language === 'hi'
              ? 'अपने पौधों के संग्रह के लिए सबसे उपयुक्त मेंटेनेंस प्लान चुनें। पारदर्शी दरें और कोई छिपा हुआ शुल्क नहीं।'
              : 'Choose the maintenance plan that best fits your plant collection. Clear pricing and transparent plant care.'}
          </p>
        </div>

        {/* 4 Pricing Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch">
          {GARDEN_PLANS.map((plan) => (
            <motion.div
              key={plan.id}
              whileHover={{ y: -6 }}
              className={`relative bg-white rounded-3xl p-6 sm:p-7 border flex flex-col justify-between transition-all duration-300 shadow-soft ${
                plan.highlight
                  ? 'border-primary ring-2 ring-primary/30 shadow-soft-xl bg-gradient-to-b from-emerald-50/40 via-white to-white'
                  : 'border-emerald-100 hover:border-emerald-300'
              }`}
            >
              {/* Badge Header */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-3.5 py-1 rounded-full bg-[#0b6b2e] text-white text-[11px] font-bold uppercase tracking-wider shadow-md inline-flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>{language === 'hi' ? plan.badgeHi : plan.badge}</span>
                  </span>
                </div>
              )}

              <div className="space-y-5 pt-2">
                {/* Plan Header */}
                <div className="border-b border-slate-100 pb-4 space-y-1">
                  <h3 className="font-display font-bold text-xl text-slate-900">
                    {language === 'hi' ? plan.nameHi : plan.nameEn}
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold">
                    {language === 'hi' ? plan.plantsCountHi : plan.plantsCountEn}
                  </p>

                  <div className="pt-2">
                    <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#0b6b2e]">
                      {language === 'hi' ? plan.priceHi : plan.priceEn}
                    </span>
                  </div>
                </div>

                {/* Complimentary Gift Badge for High Plan */}
                {plan.complimentaryPlantEn && (
                  <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold flex items-start gap-2 shadow-xs">
                    <Gift className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{language === 'hi' ? plan.complimentaryPlantHi : plan.complimentaryPlantEn}</span>
                  </div>
                )}

                {/* Features List */}
                <ul className="space-y-2.5 text-xs sm:text-sm font-body text-slate-700">
                  {(language === 'hi' ? plan.featuresHi : plan.featuresEn).map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                        ✓
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Additional Notice for Custom Plan */}
                {plan.additionalNoticeEn && (
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 font-body leading-relaxed flex items-start gap-2">
                    <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>{language === 'hi' ? plan.additionalNoticeHi : plan.additionalNoticeEn}</span>
                  </div>
                )}

                {/* Distance Policy Note */}
                <div className="pt-2 text-[11px] text-slate-500 font-body border-t border-slate-100 leading-relaxed">
                  <span className="font-semibold text-slate-700">📍 Distance Note: </span>
                  <span>{language === 'hi' ? plan.distanceHi : plan.distanceEn}</span>
                </div>
              </div>

              {/* Action CTA Button */}
              <div className="pt-6 mt-6 border-t border-slate-100">
                <Button
                  variant={plan.highlight ? 'primary' : 'outline'}
                  size="md"
                  className="w-full shadow-sm"
                  onClick={() => onSelectPlan(plan)}
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  {language === 'hi' ? `${plan.nameHi} चुनें` : `Choose ${plan.nameEn}`}
                </Button>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
