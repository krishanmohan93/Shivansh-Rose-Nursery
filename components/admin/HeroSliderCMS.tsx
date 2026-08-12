'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, Plus, Edit2, Trash2, Eye, EyeOff, Save, CheckCircle2, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface HeroSlide {
  id: string;
  badge: string;
  heading: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  image: string;
  isEnabled: boolean;
}

export const HeroSliderCMS: React.FC = () => {
  const [slides, setSlides] = useState<HeroSlide[]>([
    {
      id: 'slide-1',
      badge: 'Retail & Wholesale Supply',
      heading: 'Pune’s Premier Destination For Healthy Plants & Premium Pots',
      subtitle: 'Explore over 500+ indoor, outdoor, air-purifying plants, handcrafted ceramic planters, Chinese porcelain pots, and professional garden setup services.',
      buttonText: 'Explore Collection',
      buttonLink: '/products',
      image: '/images/plants/home-bg.png',
      isEnabled: true,
    },
    {
      id: 'slide-2',
      badge: 'Handcrafted Ceramic Collection',
      heading: 'Imported Chinese Porcelain & Designer Fiber Planters',
      subtitle: 'Elevate your living room & balcony decor with our exclusive range of ceramic matkas and luxury plant stands.',
      buttonText: 'Browse Planters',
      buttonLink: '/products/pots/ceramic',
      image: '/images/plants/5.jpeg',
      isEnabled: true,
    },
  ]);

  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleToggleEnable = (id: string) => {
    setSlides((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isEnabled: !s.isEnabled } : s))
    );
    showToast('Slide visibility updated!');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSlide) return;

    setSlides((prev) =>
      prev.map((s) => (s.id === editingSlide.id ? editingSlide : s))
    );
    setEditingSlide(null);
    showToast('Hero slide saved successfully!');
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
            <ImageIcon className="w-6 h-6 text-emerald-600" /> Hero Banners &amp; Slider CMS
          </h2>
          <p className="text-xs text-slate-500">
            Manage homepage background images, main headings, badges, and CTA button links.
          </p>
        </div>
      </div>

      {/* Slides Cards List */}
      <div className="space-y-6">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="bg-white rounded-3xl border border-emerald-100 shadow-soft p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
          >
            {/* Image Preview (4 Cols) */}
            <div className="lg:col-span-4">
              <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-md">
                <Image
                  src={slide.image}
                  alt={slide.heading}
                  fill
                  className="object-cover opacity-80"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-emerald-900/90 text-white text-[11px] font-semibold backdrop-blur-sm border border-emerald-500/30">
                  Slide #{index + 1}
                </div>
              </div>
            </div>

            {/* Slide Content Details (8 Cols) */}
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                  {slide.badge}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleEnable(slide.id)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 border transition-colors ${
                      slide.isEnabled
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                        : 'bg-slate-100 text-slate-500 border-slate-200'
                    }`}
                  >
                    {slide.isEnabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    <span>{slide.isEnabled ? 'Active' : 'Disabled'}</span>
                  </button>

                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setEditingSlide(slide)}
                    icon={<Edit2 className="w-3.5 h-3.5" />}
                  >
                    Edit
                  </Button>
                </div>
              </div>

              <h3 className="font-display font-bold text-xl text-slate-900 leading-snug">
                {slide.heading}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-body leading-relaxed">
                {slide.subtitle}
              </p>

              <div className="pt-2 flex items-center gap-3 text-xs text-slate-500">
                <span className="font-semibold text-emerald-800">CTA Button: {slide.buttonText}</span>
                <span>•</span>
                <span className="font-mono">{slide.buttonLink}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Slide Modal */}
      <AnimatePresence>
        {editingSlide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingSlide(null)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl z-10 border border-emerald-100 space-y-5"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-display font-bold text-xl text-slate-900">
                  Edit Hero Banner Slide
                </h3>
                <button
                  onClick={() => setEditingSlide(null)}
                  className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Badge Text</label>
                  <input
                    type="text"
                    value={editingSlide.badge}
                    onChange={(e) => setEditingSlide({ ...editingSlide, badge: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Main Heading</label>
                  <input
                    type="text"
                    required
                    value={editingSlide.heading}
                    onChange={(e) => setEditingSlide({ ...editingSlide, heading: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Subtitle Description</label>
                  <textarea
                    rows={3}
                    value={editingSlide.subtitle}
                    onChange={(e) => setEditingSlide({ ...editingSlide, subtitle: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Button Label</label>
                    <input
                      type="text"
                      value={editingSlide.buttonText}
                      onChange={(e) => setEditingSlide({ ...editingSlide, buttonText: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Button Target URL</label>
                    <input
                      type="text"
                      value={editingSlide.buttonLink}
                      onChange={(e) => setEditingSlide({ ...editingSlide, buttonLink: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Background Image Path</label>
                  <input
                    type="text"
                    value={editingSlide.image}
                    onChange={(e) => setEditingSlide({ ...editingSlide, image: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <Button type="button" variant="ghost" size="md" onClick={() => setEditingSlide(null)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="md" icon={<Save className="w-4 h-4" />}>
                    Save Banner Slide
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
