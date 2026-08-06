'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Leaf, Sparkles, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const ServicesOverviewSection: React.FC = () => {
  const services = [
    {
      id: 'plants-collection',
      title: 'Plants Collection',
      subtitle: 'Indoor, Outdoor, Bonsai & Succulents',
      description: 'Air-purifying indoor plants, flowering outdoor species, exotic succulents, and ornamental landscape trees carefully nurtured by experts.',
      image: '/images/hero-1.jpeg',
      badge: '500+ Plant Varieties',
      badgeBg: 'bg-emerald-800/90 text-emerald-100 border-emerald-500/30',
      icon: <Leaf className="w-5 h-5 text-emerald-400" />,
      link: '/products',
      ctaText: 'Browse Catalogue',
    },
    {
      id: 'pots-planters',
      title: 'Pots & Planters',
      subtitle: 'Ceramic, Chinese Porcelain & Fiber',
      description: 'Handcrafted ceramic pots, Chinese premium collections, lightweight fiber planters, and traditional soil matka pots for every decor.',
      image: '/images/plants/5.jpeg',
      badge: 'Luxury Planters',
      badgeBg: 'bg-amber-900/90 text-amber-100 border-amber-500/30',
      icon: <Sparkles className="w-5 h-5 text-amber-400" />,
      link: '/products',
      ctaText: 'Explore Planters',
    },
    {
      id: 'garden-services',
      title: 'Garden Services',
      subtitle: 'Society Landscaping & Terrace Gardens',
      description: 'Complete landscape design, society garden development, lawn maintenance, terrace garden setup, and cascading water features.',
      image: '/images/hero-2.jpeg',
      badge: 'Professional Care',
      badgeBg: 'bg-secondary/90 text-emerald-100 border-emerald-400/30',
      icon: <MapPin className="w-5 h-5 text-emerald-300" />,
      link: '/services',
      ctaText: 'View All Services',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section className="py-10 sm:py-12 bg-background-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest border border-primary/20">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Digital Catalogue & Services
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            Explore Everything We Offer
          </h2>
          <p className="font-body text-slate-700 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Providing premium quality plants, luxury planters, and complete landscaping services for homes, balconies, and residential societies across Pune.
          </p>
        </div>

        {/* 3 Visual Feature Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {services.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              className="group bg-white rounded-3xl overflow-hidden border border-emerald-100 shadow-soft hover:shadow-soft-xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                {/* Top Image Banner Container */}
                <div className="relative h-60 sm:h-64 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle Dark Gradient Overlay for Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Top Badge Overlay */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border shadow-xs ${item.badgeBg}`}>
                      {item.icon}
                      {item.badge}
                    </span>
                  </div>

                  {/* Image Bottom Headline */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 text-white space-y-0.5">
                    <h3 className="font-display text-2xl font-bold leading-tight">
                      {item.title}
                    </h3>
                    <p className="font-body text-xs text-emerald-100 font-medium">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 sm:p-7 space-y-4">
                  <p className="font-body text-sm sm:text-base text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Card Footer Link Button */}
              <div className="px-6 pb-6 pt-2">
                <Link href={item.link} className="block">
                  <Button
                    size="md"
                    variant="outline"
                    className="w-full justify-between group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300 shadow-xs"
                    icon={<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                  >
                    {item.ctaText}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
