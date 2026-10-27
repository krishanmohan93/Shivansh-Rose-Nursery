import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { ContactSection } from '@/components/contact/ContactSection';

export const metadata: Metadata = {
  title: 'Contact Us & Store Directions | Nursery in Wakad & Hinjawadi Pune',
  description:
    'Contact Shivansh Rose Nursery Pune at 8007634856 or visit our stores in Wakad & Hinjawadi. Get directions, WhatsApp quotes, plant availability, and garden maintenance inquiries.',
  keywords: [
    'nursery contact wakad',
    'plant nursery phone number pune',
    'nursery near me contact',
    'shivansh rose nursery phone',
    'gardener contact wakad pune',
    'nursery hinjewadi location',
  ],
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Shivansh Rose Nursery | Wakad & Hinjewadi Pune',
    description:
      'Visit or call Shivansh Rose Nursery in Wakad and Hinjawadi, Pune. WhatsApp support: 8007634856. Open 8:00 AM - 10:30 PM daily.',
    url: '/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<div className="py-20 text-center text-slate-500">Loading contact details...</div>}>
        <ContactSection />
      </Suspense>
    </div>
  );
}
