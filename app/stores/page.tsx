import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { StoreCard, StoreData } from '@/components/stores/StoreCard';
import { Sparkles, MapPin, ShieldCheck, Clock, PhoneCall, HeartHandshake } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Nursery Stores in Wakad & Hinjawadi | Shivansh Rose Nursery Pune',
  description: 'Visit our two nursery branches in Wakad and Hinjawadi Jakatnaka, Pune. Explore 500+ plants, handcrafted ceramic pots, Chinese porcelain planters, and matka pots.',
};

const STORES: StoreData[] = [
  {
    id: 'store-1-wakad',
    name: 'Shivansh Rose Nursery',
    badge: 'Main Nursery Store',
    badgeBg: 'bg-emerald-900/90 text-emerald-100 border-emerald-400/30',
    image: '/images/hero-1.jpeg',
    address: 'Atlanta 2 Society, New Wakad – Hinjawadi Link Rd, opposite Pune, Hinjawadi, Pimpri-Chinchwad (Pune Area), Maharashtra 411057.',
    landmark: 'Opposite Pune, near the Atlanta 2 society cluster on main Hinjawadi Link Rd.',
    hours: '8:00 AM – 10:30 PM, All 7 Days',
    phones: ['8007634856', '9175418744', '7499165488'],
    primaryPhone: '8007634856',
    whatsappPhone: '8007634856',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Shivansh+Rose+Nursery+Atlanta+2+Society+New+Wakad+Hinjawadi+Link+Rd+Pune+411057',
    features: [
      '500+ Fresh Plant Varieties',
      'Ceramic & Chinese Pots Display',
      'Free Gardening Advice',
      'Bulk Wholesale Orders',
    ],
  },
  {
    id: 'store-2-hinjawadi',
    name: 'Shweta Matka Bhandar and Nursery',
    badge: 'Second Branch',
    badgeBg: 'bg-amber-900/90 text-amber-100 border-amber-400/30',
    image: '/images/plants/shop2.jpeg',
    address: 'Hinjewadi Jakatnaka, Wakad Rd, opposite Madhuban Hotel, Pune, Maharashtra 411057.',
    landmark: 'Opposite Madhuban Family Restaurant And Bar, near Hinjewadi Jakatnaka; close to the Shivansh Rose Nursery neighbourhood on the same main stretch.',
    hours: '8:00 AM – 10:30 PM, All 7 Days',
    phones: ['8007634856', '9175418744', '7499165488'],
    primaryPhone: '8007634856',
    whatsappPhone: '8007634856',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Shweta+Matka+Bhandar+and+Nursery+Hinjewadi+Jakatnaka+Wakad+Rd+Pune+411057',
    features: [
      'Traditional Soil Matkas & Pots',
      'Fiber & Plastic Planters',
      'Fertilizer & Soil Mix Stock',
      'Open 8:00 AM to 10:30 PM',
    ],
  },
];

export default function StoresPage() {
  return (
    <div className="space-y-16 pb-20">
      
      {/* 1. Top Hero Section */}
      <section className="relative py-16 sm:py-20 bg-background-cream border-b border-surface-default overflow-hidden">
        {/* Soft Background Image Watermark */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <Image
            src="/images/plants/home-bg.png"
            alt="Nursery background"
            fill
            className="object-cover object-center"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs sm:text-sm font-semibold tracking-wide uppercase">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Visit Us in Wakad &amp; Hinjawadi, Pune</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
            Our Physical Nursery Stores
          </h1>

          <p className="font-body text-slate-700 text-base sm:text-xl leading-relaxed max-w-3xl mx-auto">
            Experience Pune&apos;s finest plant and pot selection in person! Both of our spacious stores are located conveniently along the main Wakad – Hinjawadi road.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-700 font-semibold border-t border-slate-200/80 max-w-xl mx-auto">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>Open 8:00 AM – 10:30 PM</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>2 Convenient Locations</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Direct Nursery Prices</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Store Cards Grid (2 Cards Desktop, Stacked Mobile) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Choose Your Nearest Branch
          </h2>
          <p className="font-body text-sm sm:text-base text-slate-600">
            Click on &quot;Open in Google Maps&quot; for instant GPS directions, or call us directly before visiting.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {STORES.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      </section>

      {/* 3. Why Visit Our Stores Feature Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-background-cream rounded-3xl p-8 sm:p-12 border border-emerald-200/80 shadow-soft space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest block">
              ⭐ In-Store Customer Benefits
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
              Why Visit Shivansh Rose Nursery In Person?
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-white border border-emerald-100/80 shadow-xs space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="font-display font-bold text-lg text-slate-900">Inspect Fresh Stock</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Handpick your favorite healthy plants, examine ceramic pot finishes, and choose custom colors.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-emerald-100/80 shadow-xs space-y-2">
              <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mx-auto">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h4 className="font-display font-bold text-lg text-slate-900">Expert Gardener Advice</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Speak directly with our experienced nursery staff regarding plant care, light conditions, and fertilizers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-emerald-100/80 shadow-xs space-y-2">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                <PhoneCall className="w-6 h-6" />
              </div>
              <h4 className="font-display font-bold text-lg text-slate-900">Immediate Pickup</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Drive in and take home your potted plants, potting soil mix, and accessories with zero waiting time.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
