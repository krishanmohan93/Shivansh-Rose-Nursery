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
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="bg-white rounded-card overflow-hidden border border-surface-default shadow-soft hover:shadow-soft-lg flex flex-col justify-between group transition-all duration-300"
    >
      <div>
        {/* Product Image Container */}
        <Link href={pdpPath} className="relative block aspect-[4/3] w-full overflow-hidden bg-surface-low group/img">
          <Image
            src={product.cloudinary_url || '/images/hero-1.jpeg'}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority={priorityImage}
            className="object-cover object-center group-hover/img:scale-108 transition-transform duration-500"
          />

          {/* Badges Overlay */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
            <Badge variant={stockVariantMap[product.availability_status] || 'neutral'}>
              {product.availability_status}
            </Badge>

            {product.plant_care_difficulty && product.plant_care_difficulty !== 'N/A' && (
              <Badge variant={careVariantMap[product.plant_care_difficulty] || 'neutral'}>
                {product.plant_care_difficulty} Care
              </Badge>
            )}
          </div>
        </Link>

        {/* Content Details */}
        <div className="p-3.5 sm:p-4 space-y-2.5">
          {/* Suitable For Tags */}
          {product.suitable_for && product.suitable_for.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {product.suitable_for.slice(0, 2).map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-medium border border-emerald-100"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Product Title */}
          <Link href={pdpPath} className="block group/title">
            <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 leading-snug group-hover/title:text-primary transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Short Description */}
          {product.short_description && (
            <p className="font-body text-xs text-slate-600 line-clamp-1 leading-relaxed">
              {product.short_description}
            </p>
          )}

          {/* Plant Care Quick Hints */}
          {(product.sunlight || product.water) && (
            <div className="pt-1.5 border-t border-surface-low flex items-center gap-3 text-[11px] text-slate-600 font-medium truncate">
              {product.sunlight && (
                <span className="flex items-center gap-1 truncate">
                  <Sun className="w-3 h-3 text-amber-500 shrink-0" />
                  <span className="truncate">{product.sunlight.split('(')[0]}</span>
                </span>
              )}
            </div>
          )}

          {/* Sizes Summary Pill */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="text-[11px] text-slate-500 font-medium truncate">
              Sizes: <span className="font-semibold text-slate-700">{product.sizes.join(', ')}</span>
            </div>
          )}
        </div>
      </div>

      {/* Two Action Buttons: Details & Enquire */}
      <div className="p-3.5 sm:p-4 pt-0 grid grid-cols-2 gap-2">
        <Link href={pdpPath} className="w-full">
          <Button
            variant="outline"
            className="w-full text-xs py-2 px-1 text-slate-700 border-slate-300 hover:border-primary hover:text-primary"
            icon={<Eye className="w-3.5 h-3.5" />}
          >
            Details
          </Button>
        </Link>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full">
          <Button
            variant="primary"
            className="w-full text-xs py-2 px-1 shadow-sm"
            icon={<MessageCircle className="w-3.5 h-3.5 fill-current" />}
          >
            Enquire
          </Button>
        </a>
      </div>
    </motion.div>
  );
};
