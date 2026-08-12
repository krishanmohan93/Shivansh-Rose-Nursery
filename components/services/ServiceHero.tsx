'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Sparkles, CalendarCheck, ShieldCheck, ArrowRight, Sprout } from 'lucide-react';

interface ServiceHeroProps {
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
  onBookClick: () => void;
}

export const ServiceHero: React.FC<ServiceHeroProps> = ({
  language,
  setLanguage,
  onBookClick,
}) => {
  const scrollToPlans = () => {
    const el = document.getElementById('garden-plans');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-16 sm:py-24 bg-slate-950 text-white overflow-hidden">
      {/* Background Nursery Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/plants/home-bg.png"
          alt="Lush green nursery background"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Original Background Overlay */}
        <div className="absolute inset-0 bg-slate-950/40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
          
          {/* Top Language Switcher Bar & Badge */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#072412]/90 text-emerald-300 text-xs font-bold uppercase tracking-widest border border-emerald-400/50 shadow-md backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{language === 'hi' ? 'शिवंश रोज़ नर्सरी पुणे' : 'Shivansh Rose Nursery Pune'}</span>
            </span>

            {/* Language Toggle Button */}
            <div className="inline-flex items-center bg-[#072412]/90 p-1 rounded-full border border-emerald-400/40 shadow-md backdrop-blur-md">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  language === 'en'
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'text-emerald-200 hover:text-white'
                }`}
              >
                🇺🇸 English
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  language === 'hi'
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'text-emerald-200 hover:text-white'
                }`}
              >
                🇮🇳 हिंदी
              </button>
            </div>
          </div>

          {/* Main Title & Subtitle */}
          <div className="space-y-3">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
              {language === 'hi' ? 'गार्डन मेंटेनेंस सेवा' : 'Garden Maintenance Service'}
            </h1>
            <p className="font-display text-xl sm:text-2xl font-bold text-amber-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              {language === 'hi'
                ? 'आपकी दहलीज़ पर पेशेवर पौधों की देखभाल'
                : 'Professional Plant Care, Right at Your Doorstep'}
            </p>
          </div>

          {/* Description */}
          <p className="font-body text-slate-100 font-medium text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
            {language === 'hi'
              ? 'हमारे पेशेवर गार्डन मेंटेनेंस सेवाओं के साथ अपने पौधों को स्वस्थ, सुंदर और हरा-भरा रखें। प्रूनिंग (कटाई) और रीपोटिंग से लेकर खाद और कीट प्रबंधन तक, हम आपके पौधों की आवश्यकता के अनुसार देखभाल करते हैं।'
              : 'Keep your plants healthy, beautiful, and thriving with our professional garden maintenance services. From pruning and repotting to fertilizer application and pest management, we take care of your plants according to their needs.'}
          </p>

          {/* Highlights Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-bold text-white pt-2">
            <div className="flex items-center justify-center gap-1.5 bg-[#072412]/90 px-4 py-2.5 rounded-xl border border-emerald-400/40 shadow-md backdrop-blur-md">
              <Sprout className="w-4 h-4 text-emerald-400" />
              <span>{language === 'hi' ? 'विशेषज्ञ माली' : 'Expert Gardeners'}</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 bg-[#072412]/90 px-4 py-2.5 rounded-xl border border-emerald-400/40 shadow-md backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{language === 'hi' ? 'ऑर्गेनिक खाद पोषण' : 'Organic Nutrition'}</span>
            </div>
            <div className="col-span-2 sm:col-span-1 flex items-center justify-center gap-1.5 bg-[#072412]/90 px-4 py-2.5 rounded-xl border border-emerald-400/40 shadow-md backdrop-blur-md">
              <CalendarCheck className="w-4 h-4 text-emerald-400" />
              <span>{language === 'hi' ? 'घर पर विज़िट सेवा' : 'Doorstep Visit'}</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
            <Button
              variant="primary"
              size="lg"
              onClick={scrollToPlans}
              icon={<ArrowRight className="w-5 h-5" />}
              className="w-full sm:w-auto shadow-xl"
            >
              {language === 'hi' ? 'मेंटेनेंस प्लान देखें' : 'View Maintenance Plans'}
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={onBookClick}
              icon={<CalendarCheck className="w-5 h-5 text-emerald-950" />}
              className="w-full sm:w-auto shadow-xl"
            >
              {language === 'hi' ? 'अभी सेवा बुक करें' : 'Book a Service'}
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};
