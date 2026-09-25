'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types/database';
import { getStoredProducts, PRODUCTS_UPDATED_EVENT } from '@/lib/store/productsStore';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/Button';
import {
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
  Leaf,
  Check,
  Filter,
} from 'lucide-react';

interface ProductFilterSectionProps {
  initialProducts: Product[];
}

export const ProductFilterSection: React.FC<ProductFilterSectionProps> = ({
  initialProducts,
}) => {
  const [activeProducts, setActiveProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCare, setSelectedCare] = useState<string>('all');
  const [selectedSunlight, setSelectedSunlight] = useState<string>('all');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('all');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();

  // Load from persistent local store on mount & listen to store updates
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = getStoredProducts().filter((p) => p.is_published !== false);
      setActiveProducts(stored);

      const handleUpdate = () => {
        const updated = getStoredProducts().filter((p) => p.is_published !== false);
        setActiveProducts(updated);
      };

      window.addEventListener(PRODUCTS_UPDATED_EVENT, handleUpdate);
      return () => window.removeEventListener(PRODUCTS_UPDATED_EVENT, handleUpdate);
    }
  }, []);

  // Auto focus & scroll into view if navigated via Header Search icon
  useEffect(() => {
    if (searchParams.get('focusSearch') === 'true' || window.location.hash === '#search') {
      setTimeout(() => {
        searchInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        searchInputRef.current?.focus();
      }, 250);
    }
  }, [searchParams]);

  // Category filter options
  const categoryOptions = [
    { label: 'All Products', value: 'all' },
    { label: 'Indoor Plants', value: 'cat-indoor' },
    { label: 'Outdoor Plants', value: 'cat-outdoor' },
    { label: 'Ceramic Pots', value: 'cat-pots-ceramic' },
    { label: 'Chinese Premium Pots', value: 'cat-pots-chinese-premium' },
    { label: 'Fiber Pots', value: 'cat-pots-fiber' },
    { label: 'Soil (Mitti) Pots', value: 'cat-pots-soil-mitti' },
    { label: 'Water Fountains', value: 'cat-other-fountains' },
  ];

  // Care difficulty filter options
  const careOptions = [
    { label: 'All Levels', value: 'all' },
    { label: 'Easy Care', value: 'Easy' },
    { label: 'Moderate Care', value: 'Moderate' },
    { label: 'Hard / Expert', value: 'Hard' },
  ];

  // Sunlight requirement options
  const sunlightOptions = [
    { label: 'Any Sunlight', value: 'all' },
    { label: 'Low / Indirect Light', value: 'Low' },
    { label: 'Medium Indirect Light', value: 'Medium' },
    { label: 'Full Direct Sun', value: 'Full' },
  ];

  // Availability options
  const availabilityOptions = [
    { label: 'All Status', value: 'all' },
    { label: 'In Stock', value: 'In Stock' },
    { label: 'Limited Stock', value: 'Limited Stock' },
  ];

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedCare('all');
    setSelectedSunlight('all');
    setSelectedAvailability('all');
  };

  const isFiltered =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'all' ||
    selectedCare !== 'all' ||
    selectedSunlight !== 'all' ||
    selectedAvailability !== 'all';

function matchesCategoryFilter(productCategoryId: string | undefined, selectedCat: string): boolean {
  if (!selectedCat || selectedCat === 'all') return true;
  if (!productCategoryId) return false;

  const prodCat = productCategoryId.toLowerCase();
  const selCat = selectedCat.toLowerCase();

  if (prodCat === selCat) return true;

  const coreSel = selCat
    .replace(/^cat-other-/, '')
    .replace(/^cat-pots-/, '')
    .replace(/^cat-/, '');

  const coreProd = prodCat
    .replace(/^cat-other-/, '')
    .replace(/^cat-pots-/, '')
    .replace(/^cat-/, '');

  if (coreProd === coreSel) return true;
  if (prodCat.includes(coreSel) || selCat.includes(coreProd)) return true;

  return false;
}

  // Combinable AND filtering logic
  const filteredProducts = useMemo(() => {
    return activeProducts.filter((product) => {
      // 1. Text Search Filter (name, short_description, description, features)
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesShort = product.short_description?.toLowerCase().includes(q);
        const matchesDesc = product.description?.toLowerCase().includes(q);
        const matchesSuitable = product.suitable_for?.some((s) => s.toLowerCase().includes(q));
        if (!matchesName && !matchesShort && !matchesDesc && !matchesSuitable) {
          return false;
        }
      }

      // 2. Category Filter (flexible matching)
      if (selectedCategory !== 'all') {
        if (!matchesCategoryFilter(product.category_id, selectedCategory)) {
          return false;
        }
      }

      // 3. Care Difficulty Filter
      if (selectedCare !== 'all') {
        if (product.plant_care_difficulty !== selectedCare) {
          return false;
        }
      }

      // 4. Sunlight Filter
      if (selectedSunlight !== 'all') {
        if (!product.sunlight?.toLowerCase().includes(selectedSunlight.toLowerCase())) {
          return false;
        }
      }

      // 5. Availability Status Filter
      if (selectedAvailability !== 'all') {
        if (product.availability_status !== selectedAvailability) {
          return false;
        }
      }

      return true;
    });
  }, [
    activeProducts,
    searchQuery,
    selectedCategory,
    selectedCare,
    selectedSunlight,
    selectedAvailability,
  ]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const isPlantCategorySelected =
    selectedCategory === 'all' ||
    selectedCategory.includes('indoor') ||
    selectedCategory.includes('outdoor') ||
    selectedCategory.includes('plants');

  const handleSelectCategory = (catValue: string) => {
    setSelectedCategory(catValue);
    const isPlant =
      catValue === 'all' ||
      catValue.includes('indoor') ||
      catValue.includes('outdoor') ||
      catValue.includes('plants');
    if (!isPlant) {
      setSelectedCare('all');
      setSelectedSunlight('all');
    }
  };

  // Group 1: Category Filter
  return (
    <div id="products-search-section" className="space-y-8">
      {/* Top Search Bar & Result Counter Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-emerald-100 shadow-soft">
        {/* Search Input Box */}
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="products-search-input"
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by plant name (e.g. Peace Lily, Snake Plant, Chinese Pots)..."
            className="w-full pl-11 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:bg-white transition-all font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Action Controls: Mobile Filter Drawer Toggle + Reset */}
        <div className="flex items-center gap-3 justify-between sm:justify-end shrink-0">
          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
            {filteredProducts.length} Items Found
          </span>

          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold shadow-xs"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>

          {isFiltered && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 hover:text-rose-900 px-3 py-2 rounded-xl hover:bg-rose-50 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Main 2-Column Section: Left Desktop Sidebar + Right Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* DESKTOP FILTER SIDEBAR (lg:col-span-3) */}
        <aside className="hidden lg:block lg:col-span-3 bg-white p-6 rounded-2xl border border-emerald-100 shadow-soft space-y-6 sticky top-24">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="font-display font-bold text-base text-slate-900 flex items-center gap-2">
              <Filter className="w-4 h-4 text-primary" /> Filter Options
            </span>
            {isFiltered && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-rose-600 font-semibold hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Clear
              </button>
            )}
          </div>

          {/* Group 1: Category Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Categories
            </label>
            <div className="space-y-1">
              {categoryOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleSelectCategory(opt.value)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center justify-between ${
                    selectedCategory === opt.value
                      ? 'bg-primary text-white font-bold shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{opt.label}</span>
                  {selectedCategory === opt.value && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Group 2 & 3: Plant Care Level & Sunlight Needed (Only shown for plant categories) */}
          {isPlantCategorySelected && (
            <>
              <div className="space-y-2 pt-3 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Plant Care Level
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {careOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setSelectedCare(opt.value)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                        selectedCare === opt.value
                          ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-emerald-50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Sunlight Needed
                </label>
                <div className="space-y-1">
                  {sunlightOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setSelectedSunlight(opt.value)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center justify-between ${
                        selectedSunlight === opt.value
                          ? 'bg-emerald-800 text-white font-bold shadow-xs'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{opt.label}</span>
                      {selectedSunlight === opt.value && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Group 4: Availability Status */}
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Availability
            </label>
            <div className="flex flex-wrap gap-1.5">
              {availabilityOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSelectedAvailability(opt.value)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                    selectedAvailability === opt.value
                      ? 'bg-primary text-white border-primary'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* RIGHT PRODUCTS GRID (lg:col-span-9) */}
        <main className="lg:col-span-9">
          {filteredProducts.length === 0 ? (
            <div className="p-12 rounded-3xl bg-white border border-emerald-100 text-center space-y-4 shadow-soft">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <Leaf className="w-8 h-8" />
              </div>
              <h3 className="font-display font-bold text-2xl text-slate-900">
                No matching items found
              </h3>
              <p className="font-body text-slate-600 text-sm max-w-md mx-auto">
                Try clearing some filters or searching for terms like &quot;Peace Lily&quot;, &quot;Snake Plant&quot;, or &quot;Chinese Pots&quot;.
              </p>
              <Button size="md" variant="primary" onClick={handleResetFilters} icon={<RotateCcw className="w-4 h-4" />}>
                Reset All Filters
              </Button>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key={`${searchQuery}-${selectedCategory}-${selectedCare}-${selectedSunlight}-${selectedAvailability}`}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-6"
            >
              {filteredProducts.map((product, idx) => (
                <motion.div key={product.id} variants={itemVariants} className="h-full">
                  <ProductCard product={product} priorityImage={idx < 6} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </main>
      </div>

      {/* MOBILE SLIDE-UP FILTER DRAWER MODAL */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Slide-Up Container */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-h-[85vh] bg-white rounded-t-3xl p-6 shadow-2xl overflow-y-auto space-y-6 z-10"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-display font-bold text-lg text-slate-900">
                  Filter Products ({filteredProducts.length})
                </h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Filter Options */}
              <div className="space-y-5 text-sm">
                <div className="space-y-2">
                  <label className="font-bold text-slate-800 uppercase tracking-wider text-xs">Categories</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {categoryOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => handleSelectCategory(opt.value)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold border text-left truncate ${
                          selectedCategory === opt.value
                            ? 'bg-primary text-white border-primary'
                            : 'bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {isPlantCategorySelected && (
                  <div className="space-y-2">
                    <label className="font-bold text-slate-800 uppercase tracking-wider text-xs">Care Level</label>
                    <div className="flex flex-wrap gap-2">
                      {careOptions.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => setSelectedCare(opt.value)}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${
                            selectedCare === opt.value
                              ? 'bg-emerald-800 text-white border-emerald-800'
                              : 'bg-slate-50 text-slate-700 border-slate-200'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Drawer Apply Button */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                {isFiltered && (
                  <Button size="md" variant="outline" className="w-1/3" onClick={handleResetFilters}>
                    Reset
                  </Button>
                )}
                <Button size="md" variant="primary" className="flex-1" onClick={() => setIsMobileFilterOpen(false)}>
                  Apply Filters ({filteredProducts.length})
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
