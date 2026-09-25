'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Sprout,
  Wrench,
  Tag,
  Clock,
  Palette,
  Award,
  HeartHandshake,
} from 'lucide-react';

export const ServiceWhyChooseUs: React.FC = () => {
  const reasons = [
    {
      id: 1,
      title: 'Experienced Team',
      description: 'Skilled horticulturalists and landscape specialists with over 10+ years of local Pune experience.',
      icon: <Users className="w-6 h-6 text-emerald-700" />,
      bg: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 2,
      title: 'Healthy Nursery Plants',
      description: 'Directly sourced fresh plants grown with organic nutrients and acclimatized to Pune weather.',
      icon: <Sprout className="w-6 h-6 text-teal-700" />,
      bg: 'bg-teal-100 text-teal-800',
    },
    {
      id: 3,
      title: 'Professional Installation',
      description: 'Clean, hassle-free execution with proper soil mix, drainage setup, and post-installation cleanup.',
      icon: <Wrench className="w-6 h-6 text-sky-700" />,
      bg: 'bg-sky-100 text-sky-800',
    },
    {
      id: 4,
      title: 'Affordable Wholesale Pricing',
      description: 'Transparent nursery rates for plants, pots, and labor with zero hidden surcharges.',
      icon: <Tag className="w-6 h-6 text-amber-700" />,
      bg: 'bg-amber-100 text-amber-800',
    },
    {
      id: 5,
      title: 'Timely Service',
      description: 'Punctual site visits, fast turnaround timelines, and reliable AMC maintenance visits.',
      icon: <Clock className="w-6 h-6 text-purple-700" />,
      bg: 'bg-purple-100 text-purple-800',
    },
    {
      id: 6,
      title: 'Custom Garden Designs',
      description: 'Personalized garden themes crafted specifically for your available light, space, and preferences.',
      icon: <Palette className="w-6 h-6 text-rose-700" />,
      bg: 'bg-rose-100 text-rose-800',
    },
    {
      id: 7,
      title: 'Premium Quality Products',
      description: 'Handpicked heavy-duty pots, organic fertilizers, and durable irrigation accessories.',
      icon: <Award className="w-6 h-6 text-indigo-700" />,
      bg: 'bg-indigo-100 text-indigo-800',
    },
    {
      id: 8,
      title: 'After-Service Support',
      description: 'Ongoing expert gardener advice via WhatsApp to ensure your plants stay healthy.',
      icon: <HeartHandshake className="w-6 h-6 text-emerald-700" />,
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section className="py-16 sm:py-20 bg-background-cream border-t border-surface-default relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest border border-primary/20">
            ⭐ Why Choose Shivansh Rose Nursery
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            Why Property Owners Trust Us
          </h2>
          <p className="font-body text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            We combine high nursery standards, skilled craftsmen, and reliable customer service across Pune.
          </p>
        </div>

        {/* 8 Feature Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {reasons.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="p-6 rounded-2xl bg-white border border-emerald-100/90 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300 space-y-4"
            >
              <div className={`w-12 h-12 rounded-2xl ${item.bg} flex items-center justify-center shadow-xs`}>
                {item.icon}
              </div>

              <div className="space-y-1.5">
                <h3 className="font-display font-bold text-lg text-slate-900 leading-snug">
                  {item.title}
                </h3>
                <p className="font-body text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
