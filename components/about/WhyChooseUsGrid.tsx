'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Sprout,
  Tag,
  Layers,
  Award,
  Car,
  Sparkles,
  Smile,
  Users,
} from 'lucide-react';

export const WhyChooseUsGrid: React.FC = () => {
  const items = [
    {
      id: 1,
      title: 'Healthy Plants',
      subtitle: 'Acclimatized & disease-free nursery plants',
      icon: <Sprout className="w-6 h-6 text-emerald-700" />,
      bg: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 2,
      title: 'Affordable Pricing',
      subtitle: 'Direct nursery rates with no middlemen',
      icon: <Tag className="w-6 h-6 text-amber-700" />,
      bg: 'bg-amber-100 text-amber-800',
    },
    {
      id: 3,
      title: 'Wide Variety',
      subtitle: '500+ plants, ceramic, fiber & matka pots',
      icon: <Layers className="w-6 h-6 text-sky-700" />,
      bg: 'bg-sky-100 text-sky-800',
    },
    {
      id: 4,
      title: 'Premium Quality',
      subtitle: 'Handpicked varieties for long-lasting growth',
      icon: <Award className="w-6 h-6 text-indigo-700" />,
      bg: 'bg-indigo-100 text-indigo-800',
    },
    {
      id: 5,
      title: 'Easy Parking',
      subtitle: 'Spacious hassle-free parking at both stores',
      icon: <Car className="w-6 h-6 text-purple-700" />,
      bg: 'bg-purple-100 text-purple-800',
    },
    {
      id: 6,
      title: 'Fresh Stock',
      subtitle: 'New plant arrivals every week',
      icon: <Sparkles className="w-6 h-6 text-teal-700" />,
      bg: 'bg-teal-100 text-teal-800',
    },
    {
      id: 7,
      title: 'Customer Satisfaction',
      subtitle: '5,000+ happy plant lovers across Pune',
      icon: <Smile className="w-6 h-6 text-rose-700" />,
      bg: 'bg-rose-100 text-rose-800',
    },
    {
      id: 8,
      title: 'Expert Guidance',
      subtitle: 'Friendly gardeners for sunlight & soil tips',
      icon: <Users className="w-6 h-6 text-emerald-700" />,
      bg: 'bg-emerald-100 text-emerald-800',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section className="py-14 sm:py-18 bg-background-cream relative border-t border-surface-default">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest border border-primary/20">
            ⭐ Why Choose Us
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            Why Pune Plant Lovers Prefer Us
          </h2>
          <p className="font-body text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            From healthy root systems to affordable direct nursery rates, here is why thousands trust Shivansh Rose Nursery.
          </p>
        </div>

        {/* 2 Cols Mobile / 4 Cols Desktop Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6"
        >
          {items.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-emerald-100/90 shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col items-start space-y-2.5 sm:space-y-3 cursor-pointer group"
            >
              <div className={`p-3 rounded-2xl ${item.bg} shadow-xs border border-white/60 group-hover:rotate-6 transition-transform`}>
                {item.icon}
              </div>

              <div className="space-y-1">
                <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 leading-snug group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="font-body text-xs text-slate-600 leading-relaxed">
                  {item.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
