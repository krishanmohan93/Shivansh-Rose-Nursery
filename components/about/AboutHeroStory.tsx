'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, Heart, ShieldCheck, MapPin, CheckCircle2 } from 'lucide-react';

export const AboutHeroStory: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-background-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Top Story Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs sm:text-sm font-semibold tracking-wide uppercase">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Nurturing Green Life Since 2018</span>
          </span>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
            The Story Behind <br className="hidden sm:inline" />
            <span className="text-primary italic font-normal">Shivansh Rose Nursery</span>
          </h1>

          <p className="font-body text-slate-700 text-base sm:text-xl leading-relaxed max-w-3xl mx-auto">
            Founded with a passion for plants and green landscapes, Shivansh Rose Nursery has grown into one of Pune&apos;s most trusted destination nurseries for homes, societies, and corporate spaces.
          </p>
        </div>

        {/* Story Grid Block 1: Experience & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest block">
                🌿 Our Beginnings &amp; Growth
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                8+ Years of Crafting Beautiful Green Spaces Across Pune
              </h2>
            </div>

            <p className="font-body text-slate-700 text-sm sm:text-base leading-relaxed">
              What started as a small love for vibrant roses in Wakad has now expanded into two massive physical nursery branches serving Pune, Wakad, Hinjawadi, Baner, and Pimple Saudagar. Over the past 8+ years, we have helped thousands of plant lovers build thriving home gardens, balcony setups, terrace gardens, and society lawns.
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-200/80">
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 font-semibold">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Healthy, acclimatized nursery plants adapted to Pune weather</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 font-semibold">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Courteous, knowledgeable horticulturists &amp; gardeners on site</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 font-semibold">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Direct nursery pricing for single plants &amp; bulk wholesale orders</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative h-80 sm:h-96 w-full rounded-3xl overflow-hidden shadow-soft-xl border border-emerald-100">
              <Image
                src="/images/hero-1.jpeg"
                alt="Shivansh Rose Nursery garden display"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300 block">Main Nursery Branch</span>
                <h3 className="font-display font-bold text-2xl">New Wakad – Hinjawadi Link Rd</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Story Grid Block 2: Collection & Pot Craftsmanship */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 lg:order-2 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest block">
                🏺 Vast Collection &amp; Craftsmanship
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                500+ Plant Varieties &amp; Handcrafted Luxury Planters
              </h2>
            </div>

            <p className="font-body text-slate-700 text-sm sm:text-base leading-relaxed">
              We take pride in offering one of the largest plant and planter selections in the region. From air-purifying Peace Lilies, Snake Plants, and Monstera to exotic Bonsai, succulents, flowering Hibiscus, and traditional soil Matka pots — every item is carefully selected and nurtured.
            </p>

            <p className="font-body text-slate-700 text-sm sm:text-base leading-relaxed">
              Our second branch, <span className="font-bold text-slate-900">Shweta Matka Bhandar &amp; Nursery</span> near Hinjewadi Jakatnaka, specializes in handcrafted terracotta matka pots, Chinese porcelain collections, and weather-proof fiber planters.
            </p>
          </div>

          <div className="lg:col-span-6 lg:order-1 relative">
            <div className="relative h-80 sm:h-96 w-full rounded-3xl overflow-hidden shadow-soft-xl border border-emerald-100">
              <Image
                src="/images/plants/shop2.jpeg"
                alt="Shweta Matka Bhandar and Nursery collection"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-300 block">Second Branch</span>
                <h3 className="font-display font-bold text-2xl">Hinjewadi Jakatnaka Branch</h3>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
