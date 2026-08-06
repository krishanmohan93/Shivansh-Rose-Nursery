'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Leaf, MapPin, CheckCircle2, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const trustBadges = [
    { title: '8+ Years Experience' },
    { title: '5000+ Happy Customers' },
    { title: '2000+ Plants Available' },
    { title: 'Wakad & Hinjawadi Stores' },
  ];

  const floatingLeaves = [
    { top: '10%', left: '5%', duration: 6, delay: 0, scale: 0.8 },
    { top: '65%', left: '8%', duration: 7, delay: 1, scale: 1.1 },
    { top: '20%', right: '10%', duration: 8, delay: 0.5, scale: 0.9 },
    { top: '75%', right: '6%', duration: 6.5, delay: 1.5, scale: 1 },
  ];

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden rounded-b-[2.5rem] bg-surface-low border-b border-surface-default pt-4 pb-12 lg:pt-8 lg:pb-16"
    >
      {/* Soft Watermark Nursery Background Image */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <Image
          src="/images/hero-bg-overlay.png"
          alt="Shivansh Rose Nursery Garden Background"
          fill
          priority
          className="object-cover object-center scale-105 blur-[1px]"
        />
      </div>

      {/* Soft Tint Overlay for Pristine Legibility & Subtle Foliage */}
      <div className="absolute inset-0 bg-gradient-to-r from-surface-low/90 via-surface-low/70 to-surface-low/45 pointer-events-none z-0" />

      {/* Floating Animated Leaf Elements */}
      {floatingLeaves.map((leaf, index) => (
        <motion.div
          key={index}
          style={{ top: leaf.top, left: leaf.left, right: leaf.right }}
          initial={{ y: 0, rotate: 0 }}
          animate={{
            y: [-12, 12, -12],
            rotate: [-8, 8, -8],
          }}
          transition={{
            duration: leaf.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: leaf.delay,
          }}
          className="absolute z-0 text-primary/15 pointer-events-none hidden md:block"
        >
          <Leaf className="w-8 h-8" style={{ transform: `scale(${leaf.scale})` }} />
        </motion.div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column: Hero Text Content */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-left">

            {/* Stacked Social Proof & Announcement Pills */}
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 shadow-soft border border-primary/20 text-xs sm:text-sm font-medium text-slate-800"
              >
                <div className="flex items-center text-amber-500 gap-0.5">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <span>Trusted by 5,000+ Pune homeowners & societies</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 text-primary border border-emerald-300 text-xs sm:text-sm font-semibold"
              >
                <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Pune&apos;s Premium Nursery & Garden Care</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              </motion.div>
            </div>

            {/* Main Headline (Display Large - Playfair Display) */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="display-large text-primary leading-[1.12] tracking-tight"
            >
              Bring Nature Closer <br className="hidden sm:inline" />
              <span className="text-secondary italic font-normal">To Your Home</span>
            </motion.h1>

            {/* Subheading (Body Large - Inter) */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="body-large text-slate-700 leading-relaxed max-w-2xl"
            >
              Discover a beautiful collection of indoor plants, outdoor plants, bonsai, succulents, ceramic pots, fiber planters, plastic pots, and premium gardening essentials.
            </motion.p>

            {/* Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 pt-2"
            >
              <Link href="/products" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="primary"
                  className="w-full sm:w-auto shadow-md"
                  icon={<Leaf className="w-5 h-5" />}
                >
                  Explore Products
                </Button>
              </Link>
              <Link href="/stores" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-white/80"
                  icon={<MapPin className="w-5 h-5" />}
                >
                  Visit Our Nursery
                </Button>
              </Link>
            </motion.div>

            {/* Trust Badges Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="pt-4 border-t border-surface-default/80"
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {trustBadges.map((badge, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2 rounded-xl bg-white/60 border border-white/80 shadow-xs"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="caption-text font-semibold text-slate-800 leading-tight">
                      {badge.title}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Right Column: Hero Showcase Visual Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full max-w-lg lg:max-w-none"
            >
              {/* Frame Blur */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-[2.5rem] blur-xl opacity-70 -z-10" />

              {/* Showcase Image */}
              <div className="relative rounded-[2rem] overflow-hidden border-4 border-white shadow-soft-lg aspect-[4/5] sm:aspect-square lg:aspect-[4/5]">
                <Image
                  src="/images/hero-2.jpeg"
                  alt="Shivansh Rose Nursery Plant Collection"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  priority
                  className="object-cover object-center hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Floating Badge 1: Top Left */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute top-2 -left-4 sm:-left-6 glass-card p-3 rounded-2xl shadow-glass flex items-center gap-3 border border-white/80 z-20"
              >
                <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-display font-bold text-sm text-slate-900 block leading-tight">
                    500+ Plant Varieties
                  </span>
                  <span className="caption-text text-emerald-700 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Fresh Stock Daily
                  </span>
                </div>
              </motion.div>

              {/* Floating Badge 2: Bottom Right */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -bottom-4 -right-4 sm:-right-6 glass-card p-3.5 rounded-2xl shadow-glass flex items-center gap-3 border border-white/80"
              >
                <div className="w-10 h-10 rounded-xl bg-secondary text-white flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-display font-bold text-sm text-slate-900 block leading-tight">
                    2 Store Locations
                  </span>
                  <span className="caption-text text-slate-600 font-medium">
                    Wakad & Hinjawadi, Pune
                  </span>
                </div>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
