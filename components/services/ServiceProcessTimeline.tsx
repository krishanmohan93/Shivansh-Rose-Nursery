'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  PhoneCall,
  MapPin,
  MessageSquare,
  Sprout,
  CalendarCheck,
  ChevronRight,
} from 'lucide-react';

interface ServiceProcessTimelineProps {
  language?: 'en' | 'hi';
}

export const ServiceProcessTimeline: React.FC<ServiceProcessTimelineProps> = ({ language = 'en' }) => {
  const steps = [
    {
      number: '01',
      titleEn: 'Choose Your Plan',
      titleHi: 'अपना प्लान चुनें',
      descEn: 'Select the maintenance plan that best fits your plant collection and garden size.',
      descHi: 'अपने पौधों के संग्रह और गार्डन के आकार के अनुसार सबसे उपयुक्त मेंटेनेंस प्लान चुनें।',
      icon: <PhoneCall className="w-5 h-5 text-emerald-700" />,
      bg: 'bg-emerald-100 text-emerald-800',
    },
    {
      number: '02',
      titleEn: 'Share Your Details',
      titleHi: 'अपनी जानकारी साझा करें',
      descEn: 'Fill in your society address, location, preferred service date, and time slot.',
      descHi: 'अपनी सोसायटी का पता, इलाका, पसंदीदा सेवा तिथि और समय स्लॉट भरें।',
      icon: <MapPin className="w-5 h-5 text-sky-700" />,
      bg: 'bg-sky-100 text-sky-800',
    },
    {
      number: '03',
      titleEn: 'Appointment Confirmation',
      titleHi: 'अपॉइंटमेंट की पुष्टि',
      descEn: 'Our team reviews your request and calls you to confirm the appointment and distance rules.',
      descHi: 'हमारी टीम आपके अनुरोध की समीक्षा करती है और अपॉइंटमेंट की पुष्टि के लिए आपको कॉल करती है।',
      icon: <MessageSquare className="w-5 h-5 text-amber-700" />,
      bg: 'bg-amber-100 text-amber-800',
    },
    {
      number: '04',
      titleEn: 'Professional Plant Care',
      titleHi: 'पेशेवर पौधों की देखभाल',
      descEn: 'Our expert gardener visits your location for pruning, repotting, fertilizing, and pest spray.',
      descHi: 'हमारे विशेषज्ञ माली प्रूनिंग, रीपोटिंग, खाद और कीट स्प्रे के लिए आपके स्थान पर आते हैं।',
      icon: <Sprout className="w-5 h-5 text-teal-700" />,
      bg: 'bg-teal-100 text-teal-800',
    },
    {
      number: '05',
      titleEn: 'Ongoing Support',
      titleHi: 'नियमित देखभाल व सहायता',
      descEn: 'Enjoy healthy, thriving plants with our scheduled maintenance follow-ups and care guidance.',
      descHi: 'हमारे निर्धारित मेंटेनेंस फॉलो-अप और देखरेख मार्गदर्शन के साथ स्वस्थ पौधों का आनंद लें।',
      icon: <CalendarCheck className="w-5 h-5 text-emerald-700" />,
      bg: 'bg-emerald-100 text-emerald-800',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section className="py-16 sm:py-20 bg-background-cream border-t border-b border-surface-default relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest border border-primary/20">
            📋 {language === 'hi' ? 'प्रक्रिया कैसे काम करती है' : 'How It Works'}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            {language === 'hi' ? 'हमारी ५-चरणीय सेवा प्रक्रिया' : 'Our 5-Step Service Process'}
          </h2>
          <p className="font-body text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            {language === 'hi'
              ? 'आसान, पारदर्शी और परेशानी मुक्त ५-चरण प्रक्रिया।'
              : 'A transparent 5-step workflow to book and receive professional garden care right at your doorstep.'}
          </p>
        </div>

        {/* Timeline Grid: 5-Columns Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative"
        >
          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              className="group bg-white p-6 rounded-2xl border border-emerald-100 shadow-soft hover:shadow-soft-lg transition-all duration-300 relative flex flex-col justify-between"
            >
              {/* Connector Arrow for Desktop */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-emerald-400">
                  <ChevronRight className="w-6 h-6" />
                </div>
              )}

              <div className="space-y-4">
                {/* Step Number + Icon */}
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-2xl text-primary/30 group-hover:text-primary transition-colors">
                    {step.number}
                  </span>
                  <div className={`w-10 h-10 rounded-xl ${step.bg} flex items-center justify-center shadow-xs`}>
                    {step.icon}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-display font-bold text-base text-slate-900 leading-snug">
                    {language === 'hi' ? step.titleHi : step.titleEn}
                  </h3>
                  <p className="font-body text-xs text-slate-600 leading-relaxed">
                    {language === 'hi' ? step.descHi : step.descEn}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
