'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  Sprout, 
  Users, 
  Tag, 
  ArrowRight,
  MessageCircle,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const WhyChooseUsSection: React.FC = () => {
  const features = [
    {
      id: 1,
      title: 'Premium Quality Plants',
      description: 'Only healthy, hand-picked indoor and outdoor plants grown with proper care.',
      icon: <ShieldCheck className="w-6 h-6 text-emerald-700" />,
      badge: 'Hand-Picked & Healthy',
      bgLight: 'bg-emerald-50 border-emerald-200/80',
      iconBg: 'bg-emerald-100 text-emerald-800',
      accentColor: 'from-emerald-500/20 to-emerald-600/5',
    },
    {
      id: 2,
      title: 'Unique Collection',
      description: 'Rare exotic species, imported Chinese porcelain planters, custom water fountains, and seasonal festival decor.',
      icon: <Sparkles className="w-6 h-6 text-amber-700" />,
      badge: 'Exclusive & Rare',
      bgLight: 'bg-amber-50 border-amber-200/80',
      iconBg: 'bg-amber-100 text-amber-800',
      accentColor: 'from-amber-500/20 to-amber-600/5',
    },
    {
      id: 3,
      title: 'Wide Variety',
      description: 'Choose from hundreds of indoor plants, outdoor plants, flowering plants, bonsai, succulents, air-purifying plants, ceramic pots, plastic pots, fiber pots, and decorative planters.',
      icon: <Layers className="w-6 h-6 text-rose-700" />,
      badge: '500+ Varieties',
      bgLight: 'bg-rose-50 border-rose-200/80',
      iconBg: 'bg-rose-100 text-rose-800',
      accentColor: 'from-rose-500/20 to-rose-600/5',
    },
    {
      id: 4,
      title: 'Expert Plant Guidance',
      description: 'Get helpful care instructions and recommendations for watering, sunlight, fertilizer, and maintenance.',
      icon: <Sprout className="w-6 h-6 text-teal-700" />,
      badge: 'Free Gardener Advice',
      bgLight: 'bg-teal-50 border-teal-200/80',
      iconBg: 'bg-teal-100 text-teal-800',
      accentColor: 'from-teal-500/20 to-teal-600/5',
    },
    {
      id: 5,
      title: 'Trusted by Plant Lovers',
      description: 'Thousands of happy customers trust Shivansh Rose Nursery for quality products and reliable service.',
      icon: <Users className="w-6 h-6 text-sky-700" />,
      badge: '5,000+ Happy Clients',
      bgLight: 'bg-sky-50 border-sky-200/80',
      iconBg: 'bg-sky-100 text-sky-800',
      accentColor: 'from-sky-500/20 to-sky-600/5',
    },
    {
      id: 6,
      title: 'Affordable Prices',
      description: 'Premium plants and pots at competitive prices without compromising quality.',
      icon: <Tag className="w-6 h-6 text-emerald-700" />,
      badge: 'Best Value Guaranteed',
      bgLight: 'bg-emerald-50 border-emerald-200/80',
      iconBg: 'bg-emerald-100 text-emerald-800',
      accentColor: 'from-emerald-500/20 to-emerald-600/5',
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

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    hover: {
      y: -10,
      scale: 1.025,
      boxShadow: '0 24px 60px -8px rgba(16, 185, 129, 0.28), 0 8px 24px -4px rgba(16,185,129,0.15)',
      borderColor: 'rgba(16,185,129,0.45)',
      transition: { duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const overlayVariants = {
    initial: { opacity: 0 },
    hover: { opacity: 1, transition: { duration: 0.35 } },
  };

  const iconVariants = {
    hover: {
      scale: 1.18,
      rotate: -6,
      transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section className="py-10 sm:py-12 bg-gradient-to-b from-surface-low via-background-cream to-surface-low relative overflow-hidden border-t border-b border-surface-default">
      {/* Decorative Organic Background Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs sm:text-sm font-semibold tracking-wide uppercase"
          >
            <span>🌿 Why Choose Shivansh Rose Nursery</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight"
          >
            We Don&apos;t Just Sell Plants— <br className="hidden sm:inline" />
            <span className="text-primary italic font-normal">We Help You Create Greener Homes</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-body text-slate-700 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            We don&apos;t just sell plants—we help you create healthier, greener, and happier living spaces with premium-quality plants and expert guidance.
          </motion.p>
        </div>

        {/* 6 Feature Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={cardVariants}
              whileHover="hover"
              className="group relative bg-white/90 backdrop-blur-md rounded-3xl p-7 sm:p-8 border border-emerald-100/80 shadow-soft flex flex-col justify-between overflow-hidden cursor-pointer"
              style={{ willChange: 'transform', borderWidth: '1px', borderStyle: 'solid' }}
            >
              {/* Subtle Ambient Hover Gradient */}
              <motion.div
                variants={overlayVariants}
                initial="initial"
                className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl ${feature.accentColor} rounded-bl-full pointer-events-none`}
              />

              <div className="space-y-5 relative z-10">
                {/* Header Row: Icon + Badge */}
                <div className="flex items-center justify-between">
                  <motion.div
                    variants={iconVariants}
                    className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl ${feature.iconBg} flex items-center justify-center shadow-xs shrink-0`}
                  >
                    {feature.icon}
                  </motion.div>
                  <span className={`text-[11px] sm:text-xs font-semibold px-3 py-1 rounded-full border ${feature.bgLight}`}>
                    {feature.badge}
                  </span>
                </div>

                {/* Card Title & Content */}
                <div className="space-y-2.5">
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-primary transition-colors duration-300 leading-snug">
                    {feature.title}
                  </h3>
                  <p className="font-body text-slate-600 text-sm sm:text-base leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="rounded-3xl bg-gradient-to-r from-primary via-emerald-900 to-secondary p-8 sm:p-10 text-white shadow-soft-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-2 text-center md:text-left relative z-10 max-w-xl">
            <h3 className="font-display text-2xl sm:text-3xl font-bold leading-tight">
              Need Help Choosing The Right Plant?
            </h3>
            <p className="font-body text-emerald-100 text-sm sm:text-base">
              Talk to our expert plant consultants on WhatsApp or visit our Wakad & Hinjawadi stores today!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full md:w-auto relative z-10 shrink-0">
            <a
              href="https://wa.me/918007634856?text=Hello%20Shivansh%20Rose%20Nursery,%20I%20need%20expert%20plant%20guidance!"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto shadow-md"
                icon={<MessageCircle className="w-5 h-5 text-emerald-800" />}
              >
                WhatsApp Consultation
              </Button>
            </a>
            <Link href="/stores" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white/40 text-white hover:bg-white/10"
                icon={<MapPin className="w-5 h-5 text-emerald-300" />}
              >
                Visit Our Nursery
              </Button>
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
