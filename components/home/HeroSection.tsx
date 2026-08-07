'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, MapPin, CheckCircle2, Sparkles, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const HERO_IMAGES = [
  '/images/plants/hero1.jpeg',
  '/images/plants/hero3.jpeg',
  '/images/plants/hero4.jpeg',
  '/images/plants/hero5.jpeg',
  '/images/plants/hero6.jpeg',
  '/images/plants/hero7.jpeg',
  '/images/plants/hero8.jpeg',
  '/images/plants/hero9.jpeg',
];

/**
 * HeroSection component displays the main nursery introduction banner with an interactive,
 * smooth Ken-Burns auto-playing image slider, trust badges, and primary call-to-actions.
 */
export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  // Preload all slider images to prevent any flickering or delay on initial slide transition
  useEffect(() => {
    HERO_IMAGES.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);
  }, []);

  // Autoplay timer (4500ms interval) - pauses when hovered
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      handleNext();
    }, 4500);

    return () => clearInterval(timer);
  }, [isHovered, handleNext]);

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartXRef.current - touchEndX;

    // Minimum swipe threshold of 40px
    if (Math.abs(deltaX) > 40) {
      if (deltaX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartXRef.current = null;
  };

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

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="display-large text-primary leading-[1.12] tracking-tight"
            >
              Bring Nature Closer <br className="hidden sm:inline" />
              <span className="text-secondary italic font-normal">To Your Home</span>
            </motion.h1>

            {/* Subheading */}
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

          {/* Right Column: Hero Showcase Interactive Image Slider Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="relative w-full max-w-lg lg:max-w-none group select-none"
            >
              {/* Frame Ambient Blur */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-[2.5rem] blur-xl opacity-70 -z-10" />

              {/* Showcase Image Container with Ken-Burns Crossfade Slider */}
              <div className="relative rounded-[2rem] overflow-hidden border-4 border-white shadow-soft-lg aspect-[4/5] sm:aspect-square lg:aspect-[4/5] bg-slate-900">
                
                <AnimatePresence mode="sync">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1.00,
                      transition: { 
                        opacity: { duration: 1.3, ease: 'easeInOut' },
                        scale: { duration: 4.5, ease: 'linear' }
                      } 
                    }}
                    exit={{ 
                      opacity: 0,
                      transition: { duration: 1.3, ease: 'easeInOut' } 
                    }}
                    className="absolute inset-0"
                    style={{ willChange: 'transform, opacity' }}
                  >
                    <Image
                      src={HERO_IMAGES[currentIndex]}
                      alt={`Shivansh Rose Nursery Showcase Image ${currentIndex + 3}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                      priority={currentIndex === 0}
                      className="object-cover object-center"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Subtle Dark Gradient Overlay for Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20 z-10 pointer-events-none" />

                {/* Left & Right Navigation Arrows (Visible on Hover / Desktop) */}
                <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 flex items-center justify-between z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    aria-label="Previous slide"
                    className="w-9 h-9 rounded-full bg-white/80 hover:bg-white text-slate-800 backdrop-blur-md flex items-center justify-center shadow-md transition-all pointer-events-auto hover:scale-110"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    aria-label="Next slide"
                    className="w-9 h-9 rounded-full bg-white/80 hover:bg-white text-slate-800 backdrop-blur-md flex items-center justify-center shadow-md transition-all pointer-events-auto hover:scale-110"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Pagination Dots Indicator Inside Showcase Card */}
                <div className="absolute bottom-4 left-0 right-0 z-30 flex items-center justify-center gap-1.5 pointer-events-none">
                  {HERO_IMAGES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                      className={`h-2 rounded-full transition-all duration-500 pointer-events-auto ${
                        currentIndex === idx
                          ? 'w-6 bg-white shadow-sm'
                          : 'w-2 bg-white/50 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>

              </div>

              {/* Floating Badge 1: Top Left */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute top-2 -left-4 sm:-left-6 glass-card p-3 rounded-2xl shadow-glass flex items-center gap-3 border border-white/80 z-40"
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
                className="absolute -bottom-4 -right-4 sm:-right-6 glass-card p-3.5 rounded-2xl shadow-glass flex items-center gap-3 border border-white/80 z-40"
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
