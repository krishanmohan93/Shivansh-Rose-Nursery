import React from 'react';
import { ReviewManager } from '@/components/admin/ReviewManager';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background-cream py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Header */}
        <div className="bg-gradient-to-r from-primary via-emerald-900 to-secondary p-8 rounded-3xl text-white shadow-soft-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
              🌿 Shivansh Rose Nursery Management Portal
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold">
              Admin Portal & Dashboard
            </h1>
            <p className="text-emerald-100 text-sm">
              Manage website reviews, toggle visibility, edit details, or remove inappropriate feedback.
            </p>
          </div>
        </div>

        {/* Customer Reviews Manager Section */}
        <ReviewManager />

      </div>
    </div>
  );
}
