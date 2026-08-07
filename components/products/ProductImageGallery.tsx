'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductImageGalleryProps {
  mainImageUrl: string;
  productName: string;
  additionalImages?: string[];
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  mainImageUrl,
  productName,
  additionalImages = [],
}) => {
  // Combine main image with additional images for thumbnails
  const galleryImages = [mainImageUrl, ...additionalImages.filter((img) => img !== mainImageUrl)];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);

  const currentImage = galleryImages[selectedIndex] || mainImageUrl;

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Image Container */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden border-4 border-white shadow-soft-lg bg-surface-low group cursor-pointer">
        <Image
          src={currentImage}
          alt={`${productName} photo ${selectedIndex + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
          onClick={() => setIsZoomModalOpen(true)}
        />

        {/* Hover Click-to-Zoom Button Overlay */}
        <button
          onClick={() => setIsZoomModalOpen(true)}
          aria-label="Zoom image"
          className="absolute bottom-4 right-4 p-3 rounded-full bg-white/90 text-primary shadow-soft backdrop-blur-md opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 flex items-center gap-1.5 text-xs font-semibold"
        >
          <ZoomIn className="w-4 h-4" />
          <span className="hidden sm:inline">Click to Zoom</span>
        </button>
      </div>

      {/* Thumbnail Strip (if multiple images available) */}
      {galleryImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto py-1">
          {galleryImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                selectedIndex === idx
                  ? 'border-primary ring-2 ring-primary/30 shadow-soft scale-105'
                  : 'border-white opacity-70 hover:opacity-100'
              }`}
            >
              <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Fullscreen Zoom Modal */}
      <AnimatePresence>
        {isZoomModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsZoomModalOpen(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-4xl w-full aspect-square sm:aspect-[4/3] rounded-3xl overflow-hidden z-10 shadow-2xl bg-black flex items-center justify-center"
            >
              <Image
                src={currentImage}
                alt={`${productName} zoomed view`}
                fill
                className="object-contain"
              />

              {/* Close Button */}
              <button
                onClick={() => setIsZoomModalOpen(false)}
                className="absolute top-4 right-4 p-3 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors z-20"
                aria-label="Close zoom"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Arrows if multiple */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 p-3 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors z-20"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 p-3 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors z-20"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
