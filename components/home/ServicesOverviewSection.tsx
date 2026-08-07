'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Leaf, Sparkles, MapPin, ArrowRight, Store } from 'lucide-react';
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
      id: 'retail-wholesale',
      title: 'Retail & Wholesale',
      subtitle: 'Single Home Plants & Bulk Society Orders',
      description: 'We supply to both individual home gardeners for single plant orders as well as housing societies, corporate offices, and developers for bulk wholesale plant & pot supplies.',
      image: '/images/hero-3.jpeg',
      badge: 'Retail & Wholesale',
      badgeBg: 'bg-emerald-900/90 text-emerald-100 border-emerald-400/30',
      icon: <Store className="w-5 h-5 text-emerald-300" />,
      link: '/contact',
      ctaText: 'Wholesale & Retail Rates',
    },
    {
      id: 'garden-services',
      title: 'Garden Services',
      subtitle: 'Transforming Balconies, Terraces & Societies',
      description: 'Complete garden solutions for homes, apartments, societies, and commercial spaces. From balcony & terrace garden setup to plants, pots, installation, and AMC maintenance.',
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
    hover: {
      y: -10,
      scale: 1.025,
      boxShadow: '0 24px 60px -8px rgba(16, 185, 129, 0.30), 0 8px 24px -4px rgba(16,185,129,0.18)',
      borderColor: 'rgba(16,185,129,0.5)',
      transition: { duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const overlayVariants = {
    initial: { opacity: 0 },
    hover: {
      opacity: 1,
      transition: { duration: 0.35 },
    },
  };

  const buttonVariants = {
    hover: {
      x: 4,
      transition: { duration: 0.25, ease: 'easeOut' },
    },
  };

  return (
    <section className="py-10 sm:py-12 bg-background-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest border border-primary/20">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Digital Catalogue &amp; Services
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            Explore Everything We Offer
          </h2>
          <p className="font-body text-slate-700 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Providing premium quality plants, luxury planters, retail &amp; wholesale supply, and complete landscaping services for homes and societies across Pune.
          </p>
        </div>

        {/* 4 Visual Feature Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover="hover"
              className="group bg-white rounded-3xl overflow-hidden border border-emerald-100 shadow-soft flex flex-col justify-between cursor-pointer"
              style={{ willChange: 'transform', borderWidth: '1px', borderStyle: 'solid' }}
            >
              <div>
                {/* Top Image Banner Container */}
                <div className="relative h-56 w-full overflow-hidden">
                  <motion.div
                    variants={imageVariants}
                    className="absolute inset-0"
                    style={{ willChange: 'transform' }}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-center"
                    />
                  </motion.div>
                  {/* Subtle Dark Gradient Overlay for Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-[1]" />

                  {/* Hover shimmer overlay */}
                  <motion.div
                    variants={overlayVariants}
                    initial="initial"
                    className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 via-transparent to-emerald-600/10 z-[2]"
                  />

                  {/* Top Badge Overlay */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border shadow-xs ${item.badgeBg}`}>
                      {item.icon}
                      {item.badge}
                    </span>
                  </div>

                  {/* Image Bottom Headline */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 text-white space-y-0.5">
                    <h3 className="font-display text-xl font-bold leading-tight">
                      {item.title}
                    </h3>
                    <p className="font-body text-[11px] text-emerald-100 font-medium line-clamp-1">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5 space-y-3">
                  <p className="font-body text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Card Footer Link Button */}
              <div className="px-5 pb-5 pt-1">
                <Link href={item.link} className="block">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full justify-between group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300 shadow-xs text-xs"
                    icon={
                      <motion.span variants={buttonVariants}>
                        <ArrowRight className="w-4 h-4" />
                      </motion.span>
                    }
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
