import React from 'react';
import Link from 'next/link';
import { HeroSection } from '@/components/home/HeroSection';
import { PopularPlantsSection } from '@/components/home/PopularPlantsSection';
import { fetchPopularPlants } from '@/lib/supabase/products';
import { Card } from '@/components/ui/Card';
import { Leaf, MapPin, Sparkles, ArrowRight } from 'lucide-react';

export default async function HomePage() {
  const indoorPopular = await fetchPopularPlants('indoor');
  const outdoorPopular = await fetchPopularPlants('outdoor');

  return (
    <div className="space-y-16 pb-16">
      {/* Premium Hero Section */}
      <HeroSection />

      {/* Shop by Popular Plants Section */}
      <PopularPlantsSection
        indoorPlants={indoorPopular}
        outdoorPlants={outdoorPopular}
      />

      {/* Overview Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-semibold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
            Digital Catalogue & Services
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
            Explore Everything We Offer
          </h2>
          <p className="font-body text-slate-600 max-w-xl mx-auto text-sm sm:text-base">
            Providing premium quality plants, luxury planters, and complete landscaping services for homes and societies across Pune.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 space-y-4 hover:shadow-soft-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-primary flex items-center justify-center shadow-sm">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-display font-semibold text-xl text-slate-900">Plants Collection</h3>
            <p className="font-body text-sm text-slate-600 leading-relaxed">
              Air-purifying indoor plants, flowering outdoor species, exotic succulents, and ornamental landscape trees.
            </p>
            <Link href="/products" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline pt-2">
              Browse Catalogue <ArrowRight className="w-4 h-4" />
            </Link>
          </Card>

          <Card className="p-6 space-y-4 hover:shadow-soft-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-primary flex items-center justify-center shadow-sm">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-display font-semibold text-xl text-slate-900">Pots & Planters</h3>
            <p className="font-body text-sm text-slate-600 leading-relaxed">
              Handcrafted ceramic pots, Chinese premium collections, lightweight fiber planters, and soil matka pots.
            </p>
            <Link href="/products" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline pt-2">
              Explore Planters <ArrowRight className="w-4 h-4" />
            </Link>
          </Card>

          <Card className="p-6 space-y-4 hover:shadow-soft-lg transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-primary flex items-center justify-center shadow-sm">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-display font-semibold text-xl text-slate-900">Garden Services</h3>
            <p className="font-body text-sm text-slate-600 leading-relaxed">
              Landscape design, society garden development, lawn maintenance, terrace gardens, and water features.
            </p>
            <Link href="/services" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline pt-2">
              View All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </Card>
        </div>
      </section>
    </div>
  );
}
