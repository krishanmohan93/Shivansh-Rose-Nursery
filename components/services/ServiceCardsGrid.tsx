'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Scissors,
  RefreshCw,
  Sparkles,
  Bug,
  HeartPulse,
  HelpCircle,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Award,
  CalendarCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ServiceCardsGridProps {
  language: 'en' | 'hi';
  onBookClick: () => void;
}

export const ServiceCardsGrid: React.FC<ServiceCardsGridProps> = ({ language, onBookClick }) => {
  const scrollToPlans = () => {
    const el = document.getElementById('garden-plans');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Main 2-Column Professional Overview Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-center">
          
          {/* Left Column: Comprehensive Paragraph & Structured Services Details (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs sm:text-sm font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>{language === 'hi' ? 'पौधों की संपूर्ण देखभाल' : 'Complete Plant Care Solutions'}</span>
              </span>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
                {language === 'hi'
                  ? 'गार्डन मेंटेनेंस में हम क्या-क्या करते हैं'
                  : 'What We Do in Our Garden Maintenance Service'}
              </h2>
            </div>

            {/* Comprehensive Detail Paragraph */}
            <p className="font-body text-slate-700 text-sm sm:text-base lg:text-lg leading-relaxed">
              {language === 'hi'
                ? 'हमारी पेशेवर गार्डन मेंटेनेंस सेवा आपके घर, बालकनी और टैरेस के पौधों को पूरे वर्ष स्वस्थ, सुंदर और हरा-भरा रखने के लिए बनाई गई है। हर विज़िट में हमारे अनुभवी माली आपके पौधों की स्थिति के अनुसार संपूर्ण व्यक्तिगत देखभाल प्रदान करते हैं।'
                : 'Our professional garden maintenance service is designed to keep your home, balcony, and terrace plants healthy, vibrant, and thriving throughout the year. During every visit, our trained gardeners provide hands-on, end-to-end plant care tailored specifically to your plants\' needs.'}
            </p>

            {/* Structured Inclusions Operations List */}
            <div className="space-y-4 pt-2">
              <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#0b6b2e]" />
                <span>
                  {language === 'hi' ? 'हर विज़िट में शामिल मुख्य कार्य:' : 'Core Maintenance Tasks Included in Every Visit:'}
                </span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Task 1: Pruning */}
                <div className="p-4 rounded-2xl bg-surface-low border border-emerald-100 space-y-1">
                  <div className="flex items-center gap-2 text-[#0b6b2e] font-bold text-sm">
                    <Scissors className="w-4 h-4 shrink-0" />
                    <span>{language === 'hi' ? '१. प्रूनिंग व कटाई-छंटाई' : '1. Pruning & Trimming'}</span>
                  </div>
                  <p className="text-xs text-slate-600 font-body leading-relaxed">
                    {language === 'hi'
                      ? 'सूखी, पीली और अवांछित पत्तियों व शाखाओं की कटाई ताकि पौधे सुंदर आकार में घने बढ़ें।'
                      : 'Trimming unwanted, dead, or overgrown branches to maintain healthy foliage and compact shape.'}
                  </p>
                </div>

                {/* Task 2: Repotting */}
                <div className="p-4 rounded-2xl bg-surface-low border border-emerald-100 space-y-1">
                  <div className="flex items-center gap-2 text-[#0b6b2e] font-bold text-sm">
                    <RefreshCw className="w-4 h-4 shrink-0" />
                    <span>{language === 'hi' ? '२. रीपोटिंग (गमला बदलना)' : '2. Plant Repotting'}</span>
                  </div>
                  <p className="text-xs text-slate-600 font-body leading-relaxed">
                    {language === 'hi'
                      ? 'पौधों को पुराने गमले से नए बड़े गमले में ताजी मिट्टी के साथ रीपॉट करने में सहायता।'
                      : 'Shifting root-bound plants into suitable new pots with fresh, nutrient-rich soil mix.'}
                  </p>
                </div>

                {/* Task 3: Fertilizers */}
                <div className="p-4 rounded-2xl bg-surface-low border border-emerald-100 space-y-1">
                  <div className="flex items-center gap-2 text-[#0b6b2e] font-bold text-sm">
                    <Sparkles className="w-4 h-4 shrink-0" />
                    <span>{language === 'hi' ? '३. जैविक खाद व पोषण' : '3. Organic Fertilizers'}</span>
                  </div>
                  <p className="text-xs text-slate-600 font-body leading-relaxed">
                    {language === 'hi'
                      ? 'भरपूर फूल आने और तेज़ विकास के लिए प्रीमियम वर्मीकम्पोस्ट व जैविक पोषक तत्वों का प्रयोग।'
                      : 'Applying organic vermicompost & micro-nutrients to boost plant growth & flowering.'}
                  </p>
                </div>

                {/* Task 4: Pesticide Spray */}
                <div className="p-4 rounded-2xl bg-surface-low border border-emerald-100 space-y-1">
                  <div className="flex items-center gap-2 text-[#0b6b2e] font-bold text-sm">
                    <Bug className="w-4 h-4 shrink-0" />
                    <span>{language === 'hi' ? '४. कीटनाशक व फंगस स्प्रे' : '4. Pest & Fungus Spray'}</span>
                  </div>
                  <p className="text-xs text-slate-600 font-body leading-relaxed">
                    {language === 'hi'
                      ? 'फंगस, सफेद कीड़ों व बीमारियों के लिए सुरक्षित जैविक कीटनाशक स्प्रे का छिड़काव।'
                      : 'Spraying organic eco-friendly pesticides & fungicides if plants show pests or fungal spots.'}
                  </p>
                </div>

              </div>
            </div>

            {/* Clear Pricing Rule Highlight Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-surface-low to-emerald-50 border border-emerald-200 text-xs sm:text-sm font-body text-slate-700 space-y-1 shadow-xs">
              <span className="font-bold text-[#0b6b2e] flex items-center gap-1.5 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                {language === 'hi' ? 'पारदर्शी मेंटेनेंस नीति:' : 'Transparent Service Guarantee:'}
              </span>
              <p className="text-slate-600 leading-relaxed">
                {language === 'hi'
                  ? 'हमारे सभी प्लान्स में ये सभी सेवाएं शामिल हैं! प्लान की कीमत केवल आपके गमलों की संख्या और उनके आकार (इंच) के आधार पर बदलती है।'
                  : 'All our maintenance plans include ALL these core services! The plan pricing changes only based on the total number of pots and planter sizes.'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={scrollToPlans}
                icon={<ArrowRight className="w-5 h-5" />}
                className="w-full sm:w-auto shadow-md"
              >
                {language === 'hi' ? 'मेंटेनेंस प्लान चुनें' : 'Choose Maintenance Plan'}
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={onBookClick}
                icon={<CalendarCheck className="w-5 h-5 text-[#0b6b2e]" />}
                className="w-full sm:w-auto"
              >
                {language === 'hi' ? 'अपॉइंटमेंट बुक करें' : 'Book Appointment'}
              </Button>
            </div>

          </div>

          {/* Right Column: Professional Gardener Image (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative h-[450px] sm:h-[550px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 group">
              <Image
                src="/images/plants/gardener-balcony.png"
                alt="Shivansh Rose Nursery professional gardener pruning balcony plants in Pune"
                fill
                priority
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

              {/* Top Floating Badge */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-[#0b6b2e] shadow-lg border border-emerald-100 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>{language === 'hi' ? 'प्रशिक्षित नर्सरी माली' : 'Trained Nursery Gardener'}</span>
              </div>

              {/* Bottom Floating Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl text-white space-y-1 border border-white/20 shadow-xl">
                <div className="flex items-center justify-between text-xs text-emerald-300 font-bold">
                  <span>Shivansh Rose Nursery Pune</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Doorstep Service
                  </span>
                </div>
                <h4 className="font-display font-bold text-base text-white">
                  {language === 'hi' ? 'बालकनी व सोसायटियों के लिए गार्डन केयर' : 'Balcony & Society Garden Maintenance'}
                </h4>
                <p className="text-xs text-slate-300">
                  {language === 'hi' ? 'वाकड, हिंजेवाडी और पुणे में 500+ खुश ग्राहक।' : 'Serving 500+ housing societies across Wakad, Hinjawadi & Pune.'}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
