'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Sparkles, CalendarCheck, MessageCircle, ShieldCheck, MapPin } from 'lucide-react';

export const ServiceHero: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-24 bg-gradient-to-b from-surface-low via-background-cream to-surface-low border-b border-surface-default overflow-hidden">
      {/* Ambient Decorative Foliage Background Image */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <Image
          src="/images/hero-2.jpeg"
          alt="Nursery garden landscape background"
          fill
          className="object-cover object-center"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 text-center max-w-4xl mx-auto">
        {/* Top Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs sm:text-sm font-semibold tracking-wide uppercase"
        >
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Pune&apos;s Trusted Landscaping &amp; Garden Care Experts</span>
        </motion.div>

        {/* Display Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight"
        >
          Professional Garden Development &amp; <br className="hidden sm:inline" />
          <span className="text-primary italic font-normal">Maintenance Services</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-body text-slate-700 text-base sm:text-xl leading-relaxed max-w-3xl mx-auto"
        >
          We design, develop, beautify, and maintain green spaces for residential societies, apartments, offices, villas, schools, and commercial properties.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          <Link href="/contact?service=Garden+Service+Site+Visit#contact-inquiry-form" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="primary"
              className="w-full sm:w-auto shadow-md"
              icon={<CalendarCheck className="w-5 h-5" />}
            >
              Request Free Site Visit
            </Button>
          </Link>

          <a
            href="https://wa.me/918007634856?text=Hi%20Shivansh%20Rose%20Nursery,%20I%20would%20like%20to%20enquire%20about%20your%20Garden%20Services!"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-emerald-700 text-emerald-900 hover:bg-emerald-50"
              icon={<MessageCircle className="w-5 h-5 text-emerald-600" />}
            >
              Contact on WhatsApp
            </Button>
          </a>
        </motion.div>

        {/* Key Feature Trust Badges */}
        <div className="pt-8 grid grid-cols-2 md:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-700 font-semibold max-w-2xl mx-auto border-t border-slate-200/80">
          <div className="flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Free Site Estimate</span>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>Serving All Pune &amp; PCMC</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 col-span-2 md:col-span-1">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Residential &amp; Commercial</span>
          </div>
        </div>
      </div>
    </section>
  );
};
