'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Product } from '@/types/database';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MessageCircle, Eye, Sun } from 'lucide-react';

export interface ProductCardProps {
  product: Product;
  priorityImage?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, priorityImage = false }) => {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '918007634856';
  const encodedMsg = encodeURIComponent(
    `Hi Shivansh Rose Nursery! I am interested in inquiring about "${product.name}". Could you please share availability and details?`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMsg}`;

  // Resolve PDP navigation route
  const pdpPath = `/products/p/${product.slug}`;

  // Stock badge mapping
  const stockVariantMap = {
    'In Stock': 'stock',
    'Limited Stock': 'limited',
    'Out of Stock': 'out',
  } as const;

  // Care difficulty badge mapping
  const careVariantMap = {
    Easy: 'easy',
    Moderate: 'moderate',
    Hard: 'hard',
    'N/A': 'neutral',
  } as const;

  return (
    <motion.div
      id={`product-${product.slug}`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-emerald-100/90 shadow-soft hover:shadow-soft-lg flex flex-col justify-between group transition-all duration-300 h-full"
    >
      <div className="flex flex-col flex-1">
        {/* Product Image Container */}
        <Link href={pdpPath} className="relative block aspect-[4/3] w-full overflow-hidden bg-surface-low group/img shrink-0">
          <Image
            src={product.cloudinary_url || '/images/hero-1.jpeg'}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priorityImage}
            className="object-cover object-center group-hover/img:scale-108 transition-transform duration-500"
          />

          {/* Badges Overlay */}
          <div className="absolute top-2 left-2 right-2 flex items-start justify-between gap-1 pointer-events-none">
            <Badge
              variant={stockVariantMap[product.availability_status] || 'neutral'}
              className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 shadow-2xs backdrop-blur-md bg-white/95 truncate max-w-[48%]"
            >
              {product.availability_status}
            </Badge>

            {product.plant_care_difficulty && product.plant_care_difficulty !== 'N/A' && (
              <Badge
                variant={careVariantMap[product.plant_care_difficulty] || 'neutral'}
                className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 shadow-2xs backdrop-blur-md bg-white/95 truncate max-w-[48%]"
              >
                {product.plant_care_difficulty} Care
              </Badge>
            )}
          </div>
        </Link>

        {/* Content Details */}
        <div className="p-2.5 sm:p-4 space-y-1.5 sm:space-y-2 flex-1 flex flex-col justify-between">
          <div className="space-y-1 sm:space-y-1.5">
            {/* Suitable For Tags */}
            {product.suitable_for && product.suitable_for.length > 0 && (
              <div className="flex items-center gap-1 overflow-hidden">
                {product.suitable_for.slice(0, 2).map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-medium border border-emerald-100/80 truncate shrink-0 max-w-[90px] sm:max-w-none"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Product Title */}
            <Link href={pdpPath} className="block group/title">
              <h3 className="font-display font-bold text-sm sm:text-base text-slate-900 leading-snug group-hover/title:text-primary transition-colors line-clamp-1">
                {product.name}
              </h3>
            </Link>

            {/* Short Description */}
            {product.short_description && (
              <p className="font-body text-[11px] sm:text-xs text-slate-500 line-clamp-1 leading-relaxed">
                {product.short_description}
              </p>
            )}
          </div>

          {/* Plant Care Quick Hints & Sizes */}
          <div className="space-y-1 pt-1.5 border-t border-slate-100">
            {product.sunlight && (
              <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-slate-600 font-medium truncate">
                <Sun className="w-3 h-3 text-amber-500 shrink-0" />
                <span className="truncate">{product.sunlight.split('(')[0].trim()}</span>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium truncate">
                Sizes: <span className="font-semibold text-slate-700">{product.sizes.join(', ')}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Two Action Buttons: Details & Enquire */}
      <div className="p-2.5 sm:p-4 pt-0 mt-auto">
        <div className="grid grid-cols-2 gap-1.5 sm:gap-2 w-full">
          <Link href={pdpPath} className="w-full min-w-0 block">
            <span className="w-full h-8 sm:h-9 px-1 sm:px-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-primary/50 text-slate-700 hover:text-primary text-[11px] sm:text-xs font-semibold flex items-center justify-center gap-1 transition-all duration-200 shadow-2xs group/btn cursor-pointer">
              <Eye className="w-3.5 h-3.5 shrink-0 text-slate-400 group-hover/btn:text-primary transition-colors" />
              <span className="truncate font-medium">Details</span>
            </span>
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full min-w-0 block"
          >
            <span className="w-full h-8 sm:h-9 px-1 sm:px-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] sm:text-xs font-semibold flex items-center justify-center gap-1 transition-all duration-200 shadow-xs active:scale-98 cursor-pointer">
              <MessageCircle className="w-3.5 h-3.5 shrink-0 fill-current" />
              <span className="truncate font-medium">Enquire</span>
            </span>
          </a>
        </div>
      </div>
    </motion.div>
  );
};
