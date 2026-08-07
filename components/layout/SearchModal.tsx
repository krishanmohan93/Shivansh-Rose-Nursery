'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  X, 
  Leaf, 
  Sun, 
  Droplets, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  MessageCircle,
  ExternalLink,
  Tag
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { SEED_PRODUCTS } from '@/lib/data/products-seed';
import { Product } from '@/types/database';
import { Button } from '@/components/ui/Button';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * SearchModal component provides an interactive real-time search modal for plants, pots, and nursery products.
 */
export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery('');
      setSelectedProduct(null);
    }
  }, [isOpen]);

  // Handle ESC key press to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (selectedProduct) {
          setSelectedProduct(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedProduct, onClose]);

  // Quick suggestions
  const popularTags = [
    'Snake Plant',
    'Areca Palm',
    'Peace Lily',
    'Lucky Bamboo',
    'Chinese Pots',
    'Ceramic Planter',
    'Bonsai',
    'Succulents',
    'Monstera',
  ];

  // Filter products based on search query
  const filteredProducts = query.trim() === '' 
    ? SEED_PRODUCTS.slice(0, 6) // Show top 6 featured products by default
    : SEED_PRODUCTS.filter((product) => {
        const q = query.toLowerCase();
        return (
          product.name.toLowerCase().includes(q) ||
          (product.short_description && product.short_description.toLowerCase().includes(q)) ||
          (product.description && product.description.toLowerCase().includes(q)) ||
          (product.suitable_for && product.suitable_for.some(s => s.toLowerCase().includes(q))) ||
          (product.features && product.features.some(f => f.toLowerCase().includes(q)))
        );
      });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 sm:pt-20 px-4 pb-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/65 backdrop-blur-md"
          />

          {/* Search Card Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden border border-emerald-100 z-10 my-auto"
          >
            {/* Top Search Header */}
            <div className="p-4 sm:p-6 border-b border-slate-100 bg-emerald-50/40 relative flex items-center gap-3">
              <Search className="w-6 h-6 text-primary shrink-0" />
              
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search plants (e.g. Snake Plant, Areca Palm, Ceramic Pots)..."
                className="w-full bg-transparent font-display text-base sm:text-xl font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />

              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              <button
                onClick={onClose}
                className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
                aria-label="Close search"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Popular Suggestion Pills */}
            <div className="px-4 sm:px-6 py-3 bg-slate-50 border-b border-slate-100 flex items-center gap-2 overflow-x-auto">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 shrink-0">
                <Tag className="w-3.5 h-3.5" /> Popular:
              </span>
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all shrink-0 ${
                    query.toLowerCase() === tag.toLowerCase()
                      ? 'bg-primary text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-emerald-50 hover:text-emerald-800'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Main Content Area */}
            <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-4">
              {selectedProduct ? (
                /* PRODUCT DETAILS VIEW */
                <div className="space-y-6">
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                  >
                    ← Back to search results
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    {/* Product Image */}
                    <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                      <Image
                        src={selectedProduct.cloudinary_url || '/images/hero-1.jpeg'}
                        alt={selectedProduct.name}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-800/90 text-emerald-100 backdrop-blur-md">
                        {selectedProduct.availability_status}
                      </span>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-4">
                      <div>
                        <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                          🌿 {selectedProduct.plant_care_difficulty || 'Plant'} Care
                        </span>
                        <h3 className="font-display text-2xl font-bold text-slate-900 leading-tight">
                          {selectedProduct.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                          {selectedProduct.short_description}
                        </p>
                      </div>

                      {/* Care Badges */}
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {selectedProduct.sunlight && (
                          <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200/80 flex items-center gap-2 text-amber-900 font-medium">
                            <Sun className="w-4 h-4 text-amber-600 shrink-0" />
                            <span className="line-clamp-1">{selectedProduct.sunlight}</span>
                          </div>
                        )}
                        {selectedProduct.water && (
                          <div className="bg-sky-50 p-2.5 rounded-xl border border-sky-200/80 flex items-center gap-2 text-sky-900 font-medium">
                            <Droplets className="w-4 h-4 text-sky-600 shrink-0" />
                            <span className="line-clamp-1">{selectedProduct.water}</span>
                          </div>
                        )}
                      </div>

                      {/* Features */}
                      {selectedProduct.features && (
                        <div className="space-y-1.5">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                            Key Highlights:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedProduct.features.map((feat, i) => (
                              <span key={i} className="text-xs bg-emerald-100/70 text-emerald-800 px-2.5 py-1 rounded-full font-medium">
                                ✓ {feat}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                        <a
                          href={`https://wa.me/918007634856?text=Hello%20Shivansh%20Rose%20Nursery,%20I%20want%20to%20enquire%20about%20${encodeURIComponent(selectedProduct.name)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto"
                        >
                          <Button size="md" variant="primary" icon={<MessageCircle className="w-4 h-4" />}>
                            Enquire on WhatsApp
                          </Button>
                        </a>
                        <Link href="/products" onClick={onClose} className="w-full sm:w-auto">
                          <Button size="md" variant="outline" icon={<ExternalLink className="w-4 h-4" />}>
                            Browse Catalogue
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* SEARCH RESULTS LIST */
                <div>
                  <div className="flex items-center justify-between pb-3 text-xs text-slate-500 font-medium">
                    <span>
                      {query.trim() === '' ? 'Featured & Popular Plants' : `Search Results (${filteredProducts.length})`}
                    </span>
                    <span>Click any plant to view full details</span>
                  </div>

                  {filteredProducts.length === 0 ? (
                    <div className="text-center py-12 space-y-3">
                      <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                        <Leaf className="w-7 h-7" />
                      </div>
                      <h4 className="font-display font-bold text-lg text-slate-900">No plants found for &ldquo;{query}&rdquo;</h4>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        Try searching for &quot;Snake Plant&quot;, &quot;Areca Palm&quot;, &quot;Ceramic Pots&quot;, or &quot;Bonsai&quot;.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {filteredProducts.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => setSelectedProduct(product)}
                          className="group p-3 rounded-2xl border border-slate-200/80 hover:border-primary hover:shadow-soft bg-white transition-all flex items-center gap-3 cursor-pointer"
                        >
                          <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                            <Image
                              src={product.cloudinary_url || '/images/hero-1.jpeg'}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className="font-display font-bold text-slate-900 text-sm group-hover:text-primary transition-colors truncate">
                              {product.name}
                            </h4>
                            <p className="text-xs text-slate-500 line-clamp-1 font-medium mt-0.5">
                              {product.short_description}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                {product.availability_status}
                              </span>
                              {product.plant_care_difficulty && (
                                <span className="text-[10px] text-slate-500 font-medium">
                                  Care: {product.plant_care_difficulty}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-primary group-hover:text-white flex items-center justify-center text-slate-400 transition-colors shrink-0">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Footer */}
            <div className="p-3 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-400">
              Tip: Press <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded text-[10px] font-bold text-slate-600">Esc</kbd> to close search
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
