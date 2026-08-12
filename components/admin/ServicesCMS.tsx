'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, Plus, Edit2, Trash2, Eye, EyeOff, CheckCircle2, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface ServiceCMSItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badge: string;
  isActive: boolean;
}

export const ServicesCMS: React.FC = () => {
  const [services, setServices] = useState<ServiceCMSItem[]>([
    {
      id: 'srv-1',
      title: 'Balcony & Terrace Garden Setup',
      subtitle: 'Customized Greenery For Modern Apartments',
      description: 'End-to-end design, plant selection, lightweight fiber pots, metal stands, drip irrigation, and professional setup.',
      image: '/images/hero-2.jpeg',
      badge: 'Most Popular',
      isActive: true,
    },
    {
      id: 'srv-2',
      title: 'Society Lawn & Garden Maintenance (AMC)',
      subtitle: 'Comprehensive Care For Housing Complexes',
      description: 'Scheduled weekly visits by expert gardeners for lawn mowing, tree trimming, soil aeration, organic vermicompost fertilization, and pest control.',
      image: '/images/hero-1.jpeg',
      badge: 'Housing Societies',
      isActive: true,
    },
    {
      id: 'srv-3',
      title: 'Vertical Garden & Bio-Wall Installation',
      subtitle: 'Space-Saving Green Living Walls',
      description: 'Automated bio-walls with built-in drip irrigation systems for exterior building facades, balcony accent walls, and corporate reception areas.',
      image: '/images/hero-3.jpeg',
      badge: 'Modern Architecture',
      isActive: true,
    },
  ]);

  const [editingService, setEditingService] = useState<ServiceCMSItem | null>(null);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleToggleActive = (id: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s))
    );
    showToast('Service status updated!');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    setServices((prev) =>
      prev.map((s) => (s.id === editingService.id ? editingService : s))
    );
    setEditingService(null);
    showToast('Service updated successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Toast Banner */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-2xl bg-emerald-900 text-white font-medium text-xs sm:text-sm flex items-center gap-2 shadow-lg"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-soft flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Wrench className="w-6 h-6 text-emerald-600" /> Garden Services CMS
          </h2>
          <p className="text-xs text-slate-500">
            Manage garden setup, landscape design, and society maintenance services offered across Pune.
          </p>
        </div>
      </div>

      {/* Services List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-3xl border border-emerald-100 shadow-soft p-6 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-slate-100">
                <Image src={service.image} alt={service.title} fill className="object-cover" />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-emerald-900/90 text-white text-[11px] font-semibold">
                  {service.badge}
                </span>
              </div>

              <h3 className="font-display font-bold text-lg text-slate-900 leading-tight">
                {service.title}
              </h3>
              <p className="text-xs text-slate-600 line-clamp-3">
                {service.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => handleToggleActive(service.id)}
                className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 border transition-colors ${
                  service.isActive
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                    : 'bg-slate-100 text-slate-500 border-slate-200'
                }`}
              >
                {service.isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{service.isActive ? 'Active' : 'Disabled'}</span>
              </button>

              <Button
                size="sm"
                variant="secondary"
                onClick={() => setEditingService(service)}
                icon={<Edit2 className="w-3.5 h-3.5" />}
              >
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Service Modal */}
      <AnimatePresence>
        {editingService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingService(null)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl z-10 border border-emerald-100 space-y-5"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-display font-bold text-xl text-slate-900">
                  Edit Service Details
                </h3>
                <button
                  onClick={() => setEditingService(null)}
                  className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Service Title</label>
                  <input
                    type="text"
                    required
                    value={editingService.title}
                    onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Description</label>
                  <textarea
                    rows={3}
                    value={editingService.description}
                    onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Badge Text</label>
                  <input
                    type="text"
                    value={editingService.badge}
                    onChange={(e) => setEditingService({ ...editingService, badge: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Image Path</label>
                  <input
                    type="text"
                    value={editingService.image}
                    onChange={(e) => setEditingService({ ...editingService, image: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <Button type="button" variant="ghost" size="md" onClick={() => setEditingService(null)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="md" icon={<Save className="w-4 h-4" />}>
                    Save Service
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
