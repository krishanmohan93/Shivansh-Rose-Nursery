import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { PopularPlantsSection } from '@/components/home/PopularPlantsSection';
import { ServicesOverviewSection } from '@/components/home/ServicesOverviewSection';
import { WhyChooseUsSection } from '@/components/home/WhyChooseUsSection';
import { FaqSection } from '@/components/home/FaqSection';
import { CustomerReviewsSection } from '@/components/home/CustomerReviewsSection';
import { fetchPopularPlants, fetchPopularChinesePots } from '@/lib/supabase/products';

export default async function HomePage() {
  const indoorPopular = await fetchPopularPlants('indoor');
  const outdoorPopular = await fetchPopularPlants('outdoor');
  const chinesePotsPopular = await fetchPopularChinesePots();

  return (
    <div className="space-y-0 pb-8">
      {/* Premium Hero Section */}
      <HeroSection />

      {/* Shop by Popular Plants & Pots Section */}
      <PopularPlantsSection
        indoorPlants={indoorPopular}
        outdoorPlants={outdoorPopular}
        chinesePots={chinesePotsPopular}
      />

      {/* Visual Services & Offerings Overview Section with Images */}
      <ServicesOverviewSection />

      {/* Why Choose Us Section */}
      <WhyChooseUsSection />

      {/* Frequently Asked Questions (FAQ) Section */}
      <FaqSection />

      {/* Customer Reviews & Feedback Section */}
      <CustomerReviewsSection />
    </div>
  );
}
