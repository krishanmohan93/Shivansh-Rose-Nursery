import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { ContactSection } from '@/components/contact/ContactSection';

export const metadata: Metadata = {
  title: 'Contact Us & Store Directions | Shivansh Rose Nursery Pune',
  description: 'Visit Shivansh Rose Nursery in Wakad & Hinjawadi Pune. Contact us via WhatsApp (8007634856) or phone calls for plant inquiries and garden service estimates.',
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
