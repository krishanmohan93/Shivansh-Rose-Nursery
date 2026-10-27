import React from 'react';
import { Metadata } from 'next';
import { HeroSection } from '@/components/home/HeroSection';
import { PopularPlantsSection } from '@/components/home/PopularPlantsSection';
import { WhyChooseUsSection } from '@/components/home/WhyChooseUsSection';
import { AboutSummaryTeaser } from '@/components/home/AboutSummaryTeaser';
import { ServicesOverviewSection } from '@/components/home/ServicesOverviewSection';
import { PlantCareTipsSection } from '@/components/home/PlantCareTipsSection';
import { CustomerReviewsSection } from '@/components/home/CustomerReviewsSection';
import { FaqSection } from '@/components/home/FaqSection';
import { fetchPopularPlants, fetchPopularChinesePots } from '@/lib/supabase/products';

export const metadata: Metadata = {
  title: 'Shivansh Rose Nursery — Best Plant Nursery in Pune | Wakad & Hinjewadi',
  description:
    'Looking for the best plant nursery near you in Pune? Shivansh Rose Nursery in Wakad & Hinjewadi offers 500+ indoor & outdoor plants, ceramic pots, Chinese planters, red soil, and residential garden maintenance services.',
  alternates: {
    canonical: '/',
  },
};

export default async function HomePage() {
  const indoorPopular = await fetchPopularPlants('indoor');
  const outdoorPopular = await fetchPopularPlants('outdoor');
  const chinesePotsPopular = await fetchPopularChinesePots();

  return (
    <div className="space-y-0 pb-8 overflow-hidden">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Featured Products Preview (Phase 2 Data) */}
      <PopularPlantsSection
        indoorPlants={indoorPopular}
        outdoorPlants={outdoorPopular}
        chinesePots={chinesePotsPopular}
      />

      {/* 3. Why Choose Us Section */}
      <WhyChooseUsSection />

      {/* 4. About Us Summary Teaser (linking to /about) */}
      <AboutSummaryTeaser />

      {/* 5. Garden Services Teaser (linking to /services) */}
      <ServicesOverviewSection />

      {/* 6. Plant Care Tips Section */}
      <PlantCareTipsSection />

      {/* 7. Customer Reviews & Testimonials */}
      <CustomerReviewsSection />

      {/* 8. Frequently Asked Questions (FAQ) */}
      <FaqSection />
    </div>
  );
}
