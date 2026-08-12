'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import {
  BookOpen,
  Clock,
  ArrowRight,
  X,
  Droplets,
  Sun,
  Wind,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export interface CareTip {
  id: string;
  title: string;
  category: string;
  readTime: string;
  image: string;
  excerpt: string;
  content: {
    introduction: string;
    keyPoints: string[];
    proTip: string;
  };
}

export const PLANT_CARE_TIPS: CareTip[] = [
  {
    id: 'watering-guide',
    title: 'How Often Should You Water Outdoor & Indoor Plants?',
    category: 'Watering Care',
    readTime: '4 min read',
    image: '/images/tips/watering.png',
    excerpt: 'Overwatering kills more houseplants than underwatering. Learn how to test soil moisture before watering.',
    content: {
      introduction: 'Understanding watering frequency is the single most important skill for keeping nursery plants healthy. In Pune’s warm climate, soil moisture evaporates quickly in summer but stays wet longer in winter.',
      keyPoints: [
        'Finger Test: Insert your finger 1-2 inches into the soil. If dry, water thoroughly until it drains from the bottom.',
        'Morning Dew: Water early in the morning (before 9 AM) to reduce evaporation and prevent fungal growth.',
        'Drainage Holes: Always ensure your ceramic or plastic pots have open bottom drainage holes.',
      ],
      proTip: 'For succulents and cacti, water only once every 10–14 days when the soil is completely bone dry.',
    },
  },
  {
    id: 'best-indoor-plants',
    title: 'Best Low-Light Indoor Plants for Modern Apartments',
    category: 'Indoor Plants',
    readTime: '3 min read',
    image: '/images/tips/indoor.png',
    excerpt: 'Transform dark living room corners and bedrooms with resilient shade-loving indoor greenery.',
    content: {
      introduction: 'Not every balcony gets 6 hours of direct sunlight. Fortunately, species like Peace Lilies, Snake Plants, and ZZ Plants thrive in indirect interior lighting.',
      keyPoints: [
        'Snake Plant (Sansevieria): Almost indestructible, tolerates low light and requires minimal watering.',
        'Peace Lily (Spathiphyllum): Tells you when it needs water by drooping its glossy green leaves.',
        'ZZ Plant (Zamioculcas): Stores water in underground rhizomes, surviving weeks of low light.',
      ],
      proTip: 'Rotate your indoor pots by 90 degrees every week so all sides receive balanced light exposure.',
    },
  },
  {
    id: 'air-purifier-plants',
    title: 'Top Air Purifying Plants for Fresh Indoor Oxygen',
    category: 'Health & Decor',
    readTime: '5 min read',
    image: '/images/tips/air-purifying.png',
    excerpt: 'Filter benzene, formaldehyde, and airborne toxins naturally with NASA-recommended foliage.',
    content: {
      introduction: 'Indoor air pollution can be up to 5 times higher than outdoor air. Adding air-purifying plants to your home improves indoor air quality while elevating room aesthetic.',
      keyPoints: [
        'Areca Palm: Excellent natural humidifier that removes toxins and boosts moisture.',
        'Money Plant (Pothos): Rapidly filters airborne pollutants and thrives in water or soil pots.',
        'Spider Plant: Safe for pets, highly resilient, and actively traps indoor dust.',
      ],
      proTip: 'Wipe plant leaves once a month with a damp cotton cloth to clear dust pores so they absorb max oxygen.',
    },
  },
  {
    id: 'summer-care',
    title: 'Essential Summer Plant Care Tips for Pune Heat',
    category: 'Seasonal Care',
    readTime: '4 min read',
    image: '/images/tips/summer-care.png',
    excerpt: 'Protect your balcony blooms and delicate green foliage during scorching April and May temperatures.',
    content: {
      introduction: 'Pune summer temperatures can exceed 38°C, causing delicate leaves to scorch and soil to dry out rapidly.',
      keyPoints: [
        'Green Shade Netting: Install a 50% shade net over south-facing balconies to block harsh afternoon sun.',
        'Mulching Soil: Cover topsoil with coco-peat, dry leaves, or pebbles to trap moisture.',
        'Misting Foliage: Spray a fine water mist over leaves in the evening to keep humidity high.',
      ],
      proTip: 'Move sensitive potted plants together in clusters—plants generate a cool micro-climate when grouped!',
    },
  },
  {
    id: 'winter-care',
    title: 'Winter Care Guide for Tropical & Flowering Plants',
    category: 'Seasonal Care',
    readTime: '3 min read',
    image: '/images/tips/winter-care.png',
    excerpt: 'Adjust watering schedules and protect tropical houseplants from cold nighttime drafts.',
    content: {
      introduction: 'During cooler winter months (December to January), plant growth slows down naturally, requiring less water and fertilizer.',
      keyPoints: [
        'Reduce Water Frequency: Water only when top 2 inches of soil dry completely.',
        'Hold Off Heavy Fertilizers: Pause synthetic chemical fertilizers until new spring buds emerge.',
        'Sunlight Optimization: Move plants closer to sunlit windows to absorb gentle winter rays.',
      ],
      proTip: 'Avoid cold water when watering winter plants—use room-temperature water to prevent root shock.',
    },
  },
  {
    id: 'repotting-guide',
    title: 'Step-by-Step Repotting Guide for Root-Bound Plants',
    category: 'Repotting',
    readTime: '6 min read',
    image: '/images/tips/repotting.png',
    excerpt: 'How to safely transfer growing plants into larger ceramic or fiber pots without damaging roots.',
    content: {
      introduction: 'When roots start circling the bottom holes of your pot, it is time to upgrade to a pot 2-3 inches larger.',
      keyPoints: [
        'Prepare Soil Mix: Combine red soil, organic cow dung manure, vermicompost, and neem cake powder.',
        'Loosen Root Ball: Gently massage the dense root mass to encourage outward root expansion.',
        'Water Deeply After Transfer: Saturate soil immediately after repotting to eliminate air pockets.',
      ],
      proTip: 'Keep newly repotted plants in bright indirect shade for 5 days while roots settle before moving to full sun.',
    },
  },
];

export const PlantCareTipsSection: React.FC = () => {
  const [selectedTip, setSelectedTip] = useState<CareTip | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-16 sm:py-20 bg-surface-low border-t border-b border-surface-default relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest border border-primary/20">
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" /> Expert Gardener Guides
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            Plant Care Tips &amp; Gardening Guides
          </h2>
          <p className="font-body text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Practical advice from our experienced horticulturists to help your plants flourish in every season.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {PLANT_CARE_TIPS.map((tip) => (
            <motion.div
              key={tip.id}
              variants={cardVariants}
              className="group bg-white rounded-3xl overflow-hidden border border-emerald-100 shadow-soft hover:shadow-soft-xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-52 w-full overflow-hidden">
                  <Image
                    src={tip.image}
                    alt={tip.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-900/90 text-white backdrop-blur-md border border-emerald-500/30">
                      {tip.category}
                    </span>
                  </div>

                  {/* Reading Time */}
                  <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1 text-xs text-slate-200 font-medium">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{tip.readTime}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <h3 className="font-display font-bold text-xl text-slate-900 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                    {tip.title}
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {tip.excerpt}
                  </p>
                </div>
              </div>

              {/* Read More Trigger */}
              <div className="px-6 pb-6 pt-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedTip(tip)}
                  className="w-full justify-between group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300 shadow-xs text-xs"
                  icon={<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                >
                  Read Full Guide
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* Full Guide Detail Popup Modal */}
      <AnimatePresence>
        {selectedTip && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTip(null)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden z-10 shadow-2xl border border-emerald-100 max-h-[90vh] flex flex-col"
            >
              {/* Header Image */}
              <div className="relative h-60 w-full shrink-0">
                <Image
                  src={selectedTip.image}
                  alt={selectedTip.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
                
                <button
                  onClick={() => setSelectedTip(null)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors z-20"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-800/90 text-emerald-100 border border-emerald-500/30">
                    {selectedTip.category}
                  </span>
                  <h3 className="font-display text-2xl font-bold leading-tight">{selectedTip.title}</h3>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                <p className="font-body text-slate-700 text-sm sm:text-base leading-relaxed">
                  {selectedTip.content.introduction}
                </p>

                <div className="space-y-3">
                  <h4 className="font-display font-bold text-base text-slate-900 uppercase tracking-wider text-xs">
                    Key Gardener Recommendations:
                  </h4>
                  <div className="space-y-2.5">
                    {selectedTip.content.keyPoints.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-low border border-emerald-100/80 text-xs sm:text-sm text-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1 text-amber-800">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Pro Nursery Secret
                  </span>
                  <p className="text-xs sm:text-sm font-medium">{selectedTip.content.proTip}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
