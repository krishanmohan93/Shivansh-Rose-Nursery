import React from 'react';
import { Metadata } from 'next';
import { AboutHeroStory } from '@/components/about/AboutHeroStory';
import { AboutStatsCounter } from '@/components/about/AboutStatsCounter';
import { WhyChooseUsGrid } from '@/components/about/WhyChooseUsGrid';

export const metadata: Metadata = {
  title: 'About Us & Why Choose Us | Shivansh Rose Nursery Pune',
  description: 'Learn about Shivansh Rose Nursery’s 8+ years journey, 500+ plant varieties, handcrafted ceramic pots, and expert garden maintenance services across Wakad & Hinjawadi, Pune.',
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
