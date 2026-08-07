'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, X, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

export const ServiceProjectGallery: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const galleryItems = [
    {
      id: 1,
      title: 'Residential Society Main Lawn',
      category: 'society',
      categoryLabel: 'Society Gardens',
      location: 'Atlanta 2 Society, Wakad',
      image: '/images/hero-2.jpeg',
    },
    {
      id: 2,
      title: 'Terrace Garden & Seating Setup',
      category: 'terrace',
      categoryLabel: 'Terrace Gardens',
      location: 'Hinjewadi Phase 1 Villa',
      image: '/images/hero-1.jpeg',
    },
    {
      id: 3,
      title: 'Cascading Lotus Water Fountain',
      category: 'fountain',
      categoryLabel: 'Fountain Installations',
      location: 'Pimple Saudagar Society',
      image: '/images/plants/5.jpeg',
    },
    {
      id: 4,
      title: 'Apartment Entrance Planter Hedges',
      category: 'apartment',
      categoryLabel: 'Apartment Landscapes',
      location: 'New Wakad Link Rd',
      image: '/images/plants/1.jpeg',
    },
    {
      id: 5,
      title: 'Corporate Office Indoor Green Wall',
      category: 'office',
      categoryLabel: 'Office Gardens',
      location: 'Hinjewadi IT Park',
      image: '/images/hero-showcase.png',
    },
    {
      id: 6,
      title: 'Bungalow Backyard Landscaping',
      category: 'villas',
      categoryLabel: 'Villas & Bungalows',
      location: 'Baner Balewadi',
      image: '/images/hero-3.jpeg',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'society', label: 'Society Gardens' },
    { id: 'apartment', label: 'Apartments' },
    { id: 'terrace', label: 'Terrace Gardens' },
    { id: 'villas', label: 'Villas & Bungalows' },
    { id: 'office', label: 'Office Gardens' },
    { id: 'fountain', label: 'Fountains' },
  ];

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  const handleNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-surface-low border-t border-surface-default relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest border border-primary/20">
            🖼️ Real Project Portfolio
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            Our Garden Project Gallery
          </h2>
          <p className="font-body text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Explore recent landscaping, terrace garden setups, and fountain installations executed across Pune.
          </p>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-emerald-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Responsive Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setSelectedImageIndex(index)}
              className="group relative rounded-3xl overflow-hidden bg-white border border-emerald-100 shadow-soft hover:shadow-soft-xl transition-all duration-500 cursor-pointer h-72 sm:h-80"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

              {/* Top Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-800/90 text-white backdrop-blur-md border border-emerald-500/30">
                  {item.categoryLabel}
                </span>
              </div>

              {/* Hover Zoom Icon */}
              <div className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/20 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4" />
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-4 left-4 right-4 z-10 text-white space-y-1">
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
        {selectedImageIndex !== null && filteredItems[selectedImageIndex] && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImageIndex(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-4xl w-full aspect-square sm:aspect-[16/10] rounded-3xl overflow-hidden z-10 shadow-2xl bg-black flex items-center justify-center"
            >
              <Image
                src={filteredItems[selectedImageIndex].image}
                alt={filteredItems[selectedImageIndex].title}
                fill
                className="object-contain"
              />

              {/* Top Details & Close */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 text-white">
                <div>
                  <h4 className="font-display font-bold text-lg">{filteredItems[selectedImageIndex].title}</h4>
                  <p className="text-xs text-slate-300">{filteredItems[selectedImageIndex].location}</p>
                </div>
                <button
                  onClick={() => setSelectedImageIndex(null)}
                  className="p-3 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Arrows */}
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
