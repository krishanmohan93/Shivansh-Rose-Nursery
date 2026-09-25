'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, X, ChevronLeft, ChevronRight, MapPin, Sparkles } from 'lucide-react';

export interface GalleryItem {
  id: number;
  title: string;
  category: string;
  categoryLabel: string;
  location: string;
  image: string;
  heightClass: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    title: 'Nursery Flower Display',
    category: 'plants',
    categoryLabel: 'Plants',
    location: 'Shivansh Rose Nursery, Wakad',
    image: '/images/hero-1.jpeg',
    heightClass: 'h-80',
  },
  {
    id: 2,
    title: 'Chinese Ceramic Pots Stack',
    category: 'pots',
    categoryLabel: 'Pots & Planters',
    location: 'Shweta Matka Bhandar Branch',
    image: '/images/gallery/ceramic-pots.png',
    heightClass: 'h-64',
  },
  {
    id: 3,
    title: 'Residential Society Lawn Development',
    category: 'garden',
    categoryLabel: 'Garden Services',
    location: 'Atlanta 2 Society, Wakad',
    image: '/images/gallery/society-lawn.png',
    heightClass: 'h-96',
  },
  {
    id: 4,
    title: 'Store Front Walkway & Entrance',
    category: 'store',
    categoryLabel: 'Nursery Store',
    location: 'Hinjewadi Link Rd, Pune',
    image: '/images/plants/shop2.jpeg',
    heightClass: 'h-72',
  },
  {
    id: 5,
    title: 'Exotic Peace Lily & Succulents Collection',
    category: 'plants',
    categoryLabel: 'Plants',
    location: 'Main Green House',
    image: '/images/plants/peace lily.jpg',
    heightClass: 'h-80',
  },
  {
    id: 6,
    title: 'Terrace Landscaping & Fountain Project',
    category: 'landscape',
    categoryLabel: 'Landscape',
    location: 'Hinjawadi Phase 1 Villa',
    image: '/images/hero-3.jpeg',
    heightClass: 'h-88',
  },
  {
    id: 7,
    title: 'Happy Homeowners Plant Shopping',
    category: 'customers',
    categoryLabel: 'Happy Customers',
    location: 'Wakad Branch Store',
    image: '/images/gallery/happy-customers.png',
    heightClass: 'h-72',
  },
  {
    id: 8,
    title: 'Designer Fiber & Soil Matka Pots',
    category: 'pots',
    categoryLabel: 'Pots & Planters',
    location: 'Shweta Matka Branch',
    image: '/images/gallery/matka-pots.png',
    heightClass: 'h-96',
  },
];

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'plants', label: 'Plants' },
    { id: 'pots', label: 'Pots & Planters' },
    { id: 'garden', label: 'Garden Services' },
    { id: 'store', label: 'Nursery Store' },
    { id: 'customers', label: 'Customers' },
    { id: 'landscape', label: 'Landscape' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-background-cream border-t border-surface-default relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest border border-primary/20">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Photo Showcase
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            Nursery &amp; Project Gallery
          </h2>
          <p className="font-body text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            A visual glimpse into our lush nursery, handcrafted pots, society gardens, and happy plant lovers across Pune.
          </p>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-emerald-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Pinterest-style Masonry Columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setSelectedIndex(index)}
              className={`break-inside-avoid group relative rounded-3xl overflow-hidden bg-white border border-emerald-100 shadow-soft hover:shadow-soft-xl transition-all duration-500 cursor-pointer ${item.heightClass}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-85 group-hover:opacity-100 transition-opacity" />

              {/* Top Category Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-900/90 text-white backdrop-blur-md border border-emerald-500/30">
                  {item.categoryLabel}
                </span>
              </div>

              {/* Hover Zoom Icon */}
              <div className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/20 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4" />
              </div>

              {/* Bottom Details */}
              <div className="absolute bottom-4 left-4 right-4 z-10 text-white space-y-0.5">
                <h3 className="font-display font-bold text-lg leading-tight group-hover:text-emerald-200 transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center gap-1 text-xs text-slate-300 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Fullscreen Popup */}
      <AnimatePresence>
        {selectedIndex !== null && filteredItems[selectedIndex] && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIndex(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-4xl w-full aspect-square sm:aspect-[16/10] rounded-3xl overflow-hidden z-10 shadow-2xl bg-black flex items-center justify-center"
            >
              <Image
                src={filteredItems[selectedIndex].image}
                alt={filteredItems[selectedIndex].title}
                fill
                className="object-contain"
              />

              {/* Top Bar */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 text-white">
                <div>
                  <h4 className="font-display font-bold text-lg">{filteredItems[selectedIndex].title}</h4>
                  <p className="text-xs text-slate-300">{filteredItems[selectedIndex].location}</p>
                </div>
                <button
                  onClick={() => setSelectedIndex(null)}
                  className="p-3 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Next/Prev Navigation */}
              <button
                onClick={handlePrev}
                className="absolute left-4 p-3 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors z-20"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 p-3 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors z-20"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
