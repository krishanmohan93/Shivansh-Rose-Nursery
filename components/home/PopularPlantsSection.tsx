'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Product } from '@/types/database';
import { Button } from '@/components/ui/Button';
import { Sparkles, ArrowRight, Leaf, Flower2, Crown } from 'lucide-react';

export interface PopularPlantsSectionProps {
  indoorPlants: Product[];
  outdoorPlants: Product[];
  chinesePots?: Product[];
}

export const PopularPlantsSection: React.FC<PopularPlantsSectionProps> = ({
  indoorPlants,
  outdoorPlants,
  chinesePots = [],
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section className="py-10 sm:py-12 bg-background-cream border-b border-surface-default overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Popular Collection
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary tracking-tight">
            Top Selling Plants & Planters
          </h2>
          <p className="font-body text-slate-700 text-sm sm:text-base leading-relaxed">
            Explore our most loved indoor plants, outdoor flowering species, and luxury handcrafted Chinese pots, carefully selected for homes, offices, balconies, and gardens.
          </p>
        </div>

        {/* Subsection 1: Top Selling Indoor Plants */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-primary/10 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-primary flex items-center justify-center">
                <Leaf className="w-4 h-4" />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                Top Selling Indoor Plants
              </h3>
            </div>
            <Link href="/products/plants/indoor" className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
              View All Indoor Plants <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8 justify-items-center"
          >
            {indoorPlants.slice(0, 6).map((plant) => (
              <motion.div key={plant.id} variants={itemVariants} className="w-full">
                <Link
                  href={`/products/plants/indoor?plant=${plant.slug}`}
                  className="group flex flex-col items-center text-center space-y-3 cursor-pointer"
                >
                  {/* Large Circular Image */}
                  <div className="relative w-36 h-36 sm:w-40 sm:h-40 lg:w-44 lg:h-44 rounded-full p-1 bg-white border-4 border-white shadow-soft group-hover:shadow-soft-lg group-hover:ring-4 group-hover:ring-primary/40 transition-all duration-300 overflow-hidden shrink-0">
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                      <Image
                        src={plant.cloudinary_url || '/images/hero-1.jpeg'}
                        alt={plant.name}
                        fill
                        sizes="(max-width: 640px) 150px, (max-width: 1024px) 180px, 200px"
                        className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Plant Name & Subtitle */}
                  <div className="space-y-0.5 max-w-[180px]">
                    <h4 className="font-display font-bold text-sm sm:text-base text-slate-900 group-hover:text-primary transition-colors leading-tight line-clamp-1">
                      {plant.name.split('(')[0].trim()}
                    </h4>
                    <p className="font-body text-[11px] sm:text-xs text-slate-500 line-clamp-1">
                      {plant.features?.[0] || 'Air Purifying'}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center sm:hidden pt-2">
            <Link href="/products/plants/indoor">
              <Button size="sm" variant="outline" icon={<ArrowRight className="w-4 h-4" />}>
                View All Indoor Plants
              </Button>
            </Link>
          </div>
        </div>

        {/* Subsection 2: Top Selling Outdoor & Flowering Plants */}
        <div className="space-y-8 pt-6 border-t border-surface-default">
          <div className="flex items-center justify-between border-b border-primary/10 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center">
                <Flower2 className="w-4 h-4" />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                Top Selling Outdoor & Flowering Plants
              </h3>
            </div>
            <Link href="/products/plants/outdoor" className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
              View All Outdoor Plants <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8 justify-items-center"
          >
            {outdoorPlants.slice(0, 6).map((plant) => (
              <motion.div key={plant.id} variants={itemVariants} className="w-full">
                <Link
                  href={`/products/plants/outdoor?plant=${plant.slug}`}
                  className="group flex flex-col items-center text-center space-y-3 cursor-pointer"
                >
                  {/* Large Circular Image */}
                  <div className="relative w-36 h-36 sm:w-40 sm:h-40 lg:w-44 lg:h-44 rounded-full p-1 bg-white border-4 border-white shadow-soft group-hover:shadow-soft-lg group-hover:ring-4 group-hover:ring-primary/40 transition-all duration-300 overflow-hidden shrink-0">
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                      <Image
                        src={plant.cloudinary_url || '/images/hero-2.jpeg'}
                        alt={plant.name}
                        fill
                        sizes="(max-width: 640px) 150px, (max-width: 1024px) 180px, 200px"
                        className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Plant Name & Subtitle */}
                  <div className="space-y-0.5 max-w-[180px]">
                    <h4 className="font-display font-bold text-sm sm:text-base text-slate-900 group-hover:text-primary transition-colors leading-tight line-clamp-1">
                      {plant.name.split('(')[0].trim()}
                    </h4>
                    <p className="font-body text-[11px] sm:text-xs text-slate-500 line-clamp-1">
                      {plant.features?.[0] || 'Fragrant Blooms'}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center sm:hidden pt-2">
            <Link href="/products/plants/outdoor">
              <Button size="sm" variant="outline" icon={<ArrowRight className="w-4 h-4" />}>
                View All Outdoor Plants
              </Button>
            </Link>
          </div>
        </div>

        {/* Subsection 3: Premium Chinese Pots */}
        {chinesePots.length > 0 && (
          <div className="space-y-8 pt-6 border-t border-surface-default">
            <div className="flex items-center justify-between border-b border-primary/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Crown className="w-4 h-4" />
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                  Premium Chinese Pots
                </h3>
              </div>
              <Link href="/products/pots/chinese-premium" className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                View All Chinese Pots <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8 justify-items-center"
            >
              {chinesePots.slice(0, 6).map((pot) => (
                <motion.div key={pot.id} variants={itemVariants} className="w-full">
                  <Link
                    href={`/products/pots/chinese-premium?pot=${pot.slug}`}
                    className="group flex flex-col items-center text-center space-y-3 cursor-pointer"
                  >
                    {/* Large Circular Image */}
                    <div className="relative w-36 h-36 sm:w-40 sm:h-40 lg:w-44 lg:h-44 rounded-full p-1 bg-white border-4 border-white shadow-soft group-hover:shadow-soft-lg group-hover:ring-4 group-hover:ring-primary/40 transition-all duration-300 overflow-hidden shrink-0">
                      <div className="relative w-full h-full rounded-full overflow-hidden">
                        <Image
                          src={pot.cloudinary_url || '/images/hero-showcase.png'}
                          alt={pot.name}
                          fill
                          sizes="(max-width: 640px) 150px, (max-width: 1024px) 180px, 200px"
                          className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </div>

                    {/* Pot Name & Subtitle */}
                    <div className="space-y-0.5 max-w-[180px]">
                      <h4 className="font-display font-bold text-sm sm:text-base text-slate-900 group-hover:text-primary transition-colors leading-tight line-clamp-1">
                        {pot.name.split('(')[0].trim()}
                      </h4>
                      <p className="font-body text-[11px] sm:text-xs text-slate-500 line-clamp-1">
                        {pot.features?.[0] || 'Luxury Porcelain'}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <div className="text-center sm:hidden pt-2">
              <Link href="/products/pots/chinese-premium">
                <Button size="sm" variant="outline" icon={<ArrowRight className="w-4 h-4" />}>
                  View All Chinese Pots
                </Button>
              </Link>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
