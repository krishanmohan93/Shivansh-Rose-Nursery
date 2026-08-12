'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Users } from 'lucide-react';

export const AboutSummaryTeaser: React.FC = () => {
  return (
    <section className="py-14 sm:py-18 bg-background-cream relative overflow-hidden border-t border-surface-default">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Block */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest border border-primary/20">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> About Shivansh Rose Nursery
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
                8+ Years of Bringing Fresh Nature To Pune Homes
              </h2>
            </div>

            <p className="font-body text-slate-700 text-sm sm:text-base leading-relaxed">
              Shivansh Rose Nursery is Pune’s premier destination for healthy plants, handcrafted ceramic pots, Chinese porcelain collections, soil matkas, and professional garden development. With two physical branches in Wakad and Hinjawadi Jakatnaka, we serve individual home plant lovers and residential housing societies across Pune.
            </p>

            <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm font-semibold text-slate-800 pt-2 border-t border-slate-200/80">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>500+ Plant Varieties</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-600" />
                <span>5,000+ Happy Clients</span>
              </div>
            </div>

            <div className="pt-2">
              <Link href="/about">
                <Button
                  size="lg"
                  variant="primary"
                  className="shadow-md"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Discover Our Full Story
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Image Block */}
          <div className="lg:col-span-6">
            <div className="relative h-80 sm:h-96 w-full rounded-3xl overflow-hidden shadow-soft-xl border border-emerald-100">
              <Image
                src="/images/hero-1.jpeg"
                alt="Shivansh Rose Nursery display"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300 block">Wakad &amp; Hinjawadi Stores</span>
                <h3 className="font-display font-bold text-2xl">Visit Our Physical Nurseries</h3>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
