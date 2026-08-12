'use client';

import React, { useState } from 'react';
import { ServiceHero } from '@/components/services/ServiceHero';
import { ServiceCardsGrid } from '@/components/services/ServiceCardsGrid';
import { GardenMaintenancePlansSection, GARDEN_PLANS } from '@/components/services/GardenMaintenancePlansSection';
import { ServiceAreaNotice } from '@/components/services/ServiceAreaNotice';
import { ServiceProcessTimeline } from '@/components/services/ServiceProcessTimeline';
import { ServiceWhyChooseUs } from '@/components/services/ServiceWhyChooseUs';
import { GardenBookingModal, PlanDetails } from '@/components/services/GardenBookingModal';

export default function ServicesPage() {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanDetails | null>(GARDEN_PLANS[1]); // Default to Moderate Plan

  const handleSelectPlan = (plan: PlanDetails) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleOpenGeneralModal = () => {
    setSelectedPlan(GARDEN_PLANS[1]); // Default to Moderate Plan
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-0 pb-16">
      {/* 1. Hero Section with Bilingual Switcher */}
      <ServiceHero
        language={language}
        setLanguage={setLanguage}
        onBookClick={handleOpenGeneralModal}
      />

      {/* 2. Maintenance Overview & Inclusions */}
      <ServiceCardsGrid
        language={language}
        onBookClick={handleOpenGeneralModal}
      />

      {/* 3. 4 Garden Maintenance Plans Section */}
      <GardenMaintenancePlansSection
        language={language}
        onSelectPlan={handleSelectPlan}
      />

      {/* 4. Service Area & Distance Policy Information */}
      <ServiceAreaNotice language={language} />

      {/* 5. How It Works - 5 Steps Process Timeline */}
      <ServiceProcessTimeline language={language} />

      {/* 6. Why Choose Us Feature Cards */}
      <ServiceWhyChooseUs />

      {/* 7. Interactive Garden Maintenance Booking Modal */}
      <GardenBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedPlan={selectedPlan}
        language={language}
      />
    </div>
  );
}
