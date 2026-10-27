import React from 'react';
import { Metadata } from 'next';
import { AboutHeroStory } from '@/components/about/AboutHeroStory';
import { AboutStatsCounter } from '@/components/about/AboutStatsCounter';
import { WhyChooseUsGrid } from '@/components/about/WhyChooseUsGrid';

export const metadata: Metadata = {
  title: 'About Us | 8+ Years of Trusted Plant Nursery in Wakad & Hinjewadi Pune',
  description:
    'Discover Shivansh Rose Nursery’s 8+ years journey in Pune. Over 500+ plant varieties, direct nursery prices, ceramic pots, soil fertilizers, and society garden maintenance across Wakad, Hinjewadi, and Baner.',
  keywords: [
    'about shivansh rose nursery',
    'best plant nursery pune',
    'plant shop wakad history',
    'gardener services pune',
    'top rated nursery wakad hinjewadi',
  ],
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Shivansh Rose Nursery | Leading Plant Nursery in Pune',
    description:
      'Serving 12,000+ plant lovers in Pune across Wakad & Hinjewadi. Healthy indoor/outdoor plants, ceramic pots, and professional garden AMC services.',
    url: '/about',
  },
};

export default function AboutPage() {
  return (
    <div className="space-y-0 pb-16">
      {/* 1. Nursery Story interwoven with imagery */}
      <AboutHeroStory />

      {/* 2. Animated Count-Up Statistics */}
      <AboutStatsCounter />

      {/* 3. Why Choose Us Reusable Icon Grid */}
      <WhyChooseUsGrid />
    </div>
  );
}
