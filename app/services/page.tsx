import React from 'react';
import { Metadata } from 'next';
import { ServiceHero } from '@/components/services/ServiceHero';
import { ServiceCardsGrid } from '@/components/services/ServiceCardsGrid';
import { ServiceProcessTimeline } from '@/components/services/ServiceProcessTimeline';
import { ServiceWhyChooseUs } from '@/components/services/ServiceWhyChooseUs';
import { ServiceProjectGallery } from '@/components/services/ServiceProjectGallery';

export const metadata: Metadata = {
  title: 'Garden & Landscaping Services | Shivansh Rose Nursery Pune',
  description: 'Professional garden development, society landscaping, terrace garden setup, pot installation, and garden maintenance AMC services across Wakad, Hinjawadi, and Pune.',
};

export default function ServicesPage() {
  return (
    <div className="space-y-0 pb-16">
      {/* 1. Hero Section */}
      <ServiceHero />

      {/* 2. Services We Offer Grid */}
      <ServiceCardsGrid />

      {/* 3. Our Process Animated Timeline */}
      <ServiceProcessTimeline />

      {/* 4. Why Choose Us Feature Cards */}
      <ServiceWhyChooseUs />

      {/* 5. Real Project Gallery with Lightbox */}
      <ServiceProjectGallery />
    </div>
  );
}
