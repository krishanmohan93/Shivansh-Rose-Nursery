'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  PhoneCall,
  MapPin,
  MessageSquare,
  FileSpreadsheet,
  Sprout,
  CalendarCheck,
  ChevronRight,
} from 'lucide-react';

export const ServiceProcessTimeline: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Contact Us',
      description: 'Fill out our inquiry form or reach out via WhatsApp / Call with your requirements.',
      icon: <PhoneCall className="w-5 h-5 text-emerald-700" />,
      bg: 'bg-emerald-100 text-emerald-800',
    },
    {
      number: '02',
      title: 'Site Visit',
      description: 'Our expert landscape consultant visits your society, flat, or commercial property in Pune.',
      icon: <MapPin className="w-5 h-5 text-sky-700" />,
      bg: 'bg-sky-100 text-sky-800',
    },
    {
      number: '03',
      title: 'Requirement Discussion',
      description: 'We assess sunlight, soil type, drainage, budget, and desired garden aesthetic.',
      icon: <MessageSquare className="w-5 h-5 text-amber-700" />,
      bg: 'bg-amber-100 text-amber-800',
    },
    {
      number: '04',
      title: 'Design Proposal',
      description: 'We provide a clear layout design proposal along with transparent wholesale cost estimates.',
      icon: <FileSpreadsheet className="w-5 h-5 text-purple-700" />,
      bg: 'bg-purple-100 text-purple-800',
    },
    {
      number: '05',
      title: 'Plantation & Setup',
      description: 'Our skilled gardeners deliver nursery-fresh plants, pots, soil mix, and install everything.',
      icon: <Sprout className="w-5 h-5 text-teal-700" />,
      bg: 'bg-teal-100 text-teal-800',
    },
    {
      number: '06',
      title: 'Regular Maintenance',
      description: 'Scheduled visits for pruning, fertilizing, pest management, and plant care support.',
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
            📋 How It Works
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            Our Service Process
          </h2>
          <p className="font-body text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            A simple 6-step transparent workflow to transform your property into a vibrant green paradise.
          </p>
        </div>

        {/* Timeline Grid: Desktop 6-Columns Horizontal / Mobile Vertical Stack */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 relative"
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
                    {step.title}
                  </h3>
                  <p className="font-body text-xs text-slate-600 leading-relaxed">
                    {step.description}
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
