'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import {
  Compass,
  Building2,
  Sprout,
  Box,
  Scissors,
  Droplets,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

export const ServiceCardsGrid: React.FC = () => {
  const servicesList = [
    {
      id: 'garden-design',
      title: 'Garden Design & Planning',
      description: 'Custom architectural 2D/3D landscape planning and bespoke layouts tailored to your space, light, and soil conditions.',
      image: '/images/hero-1.jpeg',
      icon: <Compass className="w-6 h-6 text-emerald-700" />,
      badgeBg: 'bg-emerald-100 text-emerald-800',
      offerings: [
        'Landscape planning & 3D site layout',
        'Custom garden zoning & theme planning',
        'Decorative flower bed & hedge placement',
      ],
    },
    {
      id: 'society-apartment',
      title: 'Society & Apartment Gardening',
      description: 'End-to-end greening for residential societies, apartments, common lawns, clubhouse surroundings, and entrances.',
      image: '/images/hero-2.jpeg',
      icon: <Building2 className="w-6 h-6 text-sky-700" />,
      badgeBg: 'bg-sky-100 text-sky-800',
      offerings: [
        'Society garden development & lawn turfing',
        'Common area & clubhouse landscaping',
        'Entrance plantation & terrace garden setup',
      ],
    },
    {
      id: 'plant-supply',
      title: 'Bulk Plant Supply & Wholesale',
      description: 'Direct nursery-grown healthy plants supplied at competitive rates for homes, developers, and institutions.',
      image: '/images/plants/peace lily.jpg',
      icon: <Sprout className="w-6 h-6 text-emerald-700" />,
      badgeBg: 'bg-emerald-100 text-emerald-800',
      offerings: [
        'Air-purifying indoor & outdoor flowering plants',
        'Avenue trees, boundary hedges & creepers',
        'Exotic succulents, bonsai & seasonal blooms',
      ],
    },
    {
      id: 'pot-installation',
      title: 'Pot & Designer Planter Setup',
      description: 'Professional selection and placement of handcrafted ceramic, heavy-duty fiber, and lightweight luxury pots.',
      image: '/images/plants/1.jpeg',
      icon: <Box className="w-6 h-6 text-amber-700" />,
      badgeBg: 'bg-amber-100 text-amber-800',
      offerings: [
        'Handcrafted Chinese & ceramic pot styling',
        'Lightweight fiber & weather-proof planters',
        'Soil matka pots & vertical planter walls',
      ],
    },
    {
      id: 'garden-maintenance',
      title: 'Garden Maintenance & AMC',
      description: 'Regular monthly or weekly gardener visits for pruning, organic fertilizing, pest management, and plant replacements.',
      image: '/images/hero-showcase.png',
      icon: <Scissors className="w-6 h-6 text-teal-700" />,
      badgeBg: 'bg-teal-100 text-teal-800',
      offerings: [
        'Regular lawn mowing, pruning & hedge shaping',
        'Organic cow dung manure & fertilizing',
        'Weed removal, pest treatment & free replacement',
      ],
    },
    {
      id: 'water-features',
      title: 'Water Fountains & Features',
      description: 'Installation of soothing cascading water fountains, lotus ponds, and decorative garden water features.',
      image: '/images/plants/5.jpeg',
      icon: <Droplets className="w-6 h-6 text-cyan-700" />,
      badgeBg: 'bg-cyan-100 text-cyan-800',
      offerings: [
        'Decorative indoor & outdoor stone fountains',
        'Cascading waterfall & lotus pond setup',
        'Fountain pump installation & maintenance',
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section className="py-16 sm:py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest border border-primary/20">
            🌿 Complete Garden Solutions
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            Services We Offer
          </h2>
          <p className="font-body text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            From initial site consultation to full plantation and ongoing maintenance, we handle everything required for a thriving green environment.
          </p>
        </div>

        {/* 6 Modern Service Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {servicesList.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              className="group bg-white rounded-3xl overflow-hidden border border-emerald-100 shadow-soft hover:shadow-soft-xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                {/* Top Service Image Banner */}
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

                  {/* Icon Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <div className={`p-3 rounded-2xl ${service.badgeBg} shadow-xs border border-white/40`}>
                      {service.icon}
                    </div>
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                    <h3 className="font-display text-2xl font-bold leading-tight">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Card Description & Offerings */}
                <div className="p-6 sm:p-7 space-y-4">
                  <p className="font-body text-sm text-slate-600 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    {service.offerings.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs font-semibold text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button: Links Directly to Contact Page with pre-filled service */}
              <div className="px-6 pb-6 pt-2">
                <Link
                  href={`/contact?service=${encodeURIComponent(service.title)}#contact-inquiry-form`}
                  className="block w-full"
                >
                  <Button
                    size="md"
                    variant="outline"
                    className="w-full justify-between group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300 shadow-xs text-xs"
                    icon={<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                  >
                    Book Service / Estimate
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
