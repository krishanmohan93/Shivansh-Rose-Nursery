import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug, getRelatedProducts } from '@/lib/supabase/products';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductImageGallery } from '@/components/products/ProductImageGallery';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProductDetailClientGuard } from '@/components/products/ProductDetailClientGuard';
import {
  ChevronRight,
  Home,
  MessageCircle,
  Phone,
  Sun,
  Droplets,
  Sprout,
  ShieldCheck,
  MapPin,
  Clock,
  CheckCircle2,
  Leaf,
  Box,
  Layers,
  Shield,
  HelpCircle,
} from 'lucide-react';

export const revalidate = 300;

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const { product, categoryPath } = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const isPlant = product.category_id === 'cat-indoor' || product.category_id === 'cat-outdoor';
  const isPot = product.category_id?.startsWith('cat-pots');

  // Fetch related products from the same category
  const relatedProducts = await getRelatedProducts(product.category_id || '', product.id, 4);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '918007634856';
  const encodedMsg = encodeURIComponent(
    `Hi Shivansh Rose Nursery! I am interested in inquiring about "${product.name}". Could you please share stock availability, store location, and details?`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMsg}`;

  const stockVariantMap = {
    'In Stock': 'stock',
    'Limited Stock': 'limited',
    'Out of Stock': 'out',
  } as const;

  const careVariantMap = {
    Easy: 'easy',
    Moderate: 'moderate',
    Hard: 'hard',
    'N/A': 'neutral',
  } as const;

  return (
    <ProductDetailClientGuard productId={product.id} productSlug={product.slug}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-14 pb-24 lg:pb-16">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 font-medium overflow-x-auto py-1">
          <Link href="/" className="hover:text-primary flex items-center gap-1 shrink-0">
            <Home className="w-3.5 h-3.5" /> Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <Link href="/products" className="hover:text-primary shrink-0">
            Products
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <Link href={categoryPath} className="hover:text-primary capitalize shrink-0">
            Category
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-primary font-bold truncate">{product.name}</span>
        </nav>

        {/* Main Product Showcase Section (2-Column Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Product Photo Showcase with Zoom & Thumbnails */}
          <div className="lg:col-span-6 space-y-4">
            <ProductImageGallery
              mainImageUrl={product.cloudinary_url || '/images/hero-1.jpeg'}
              productName={product.name}
            />

            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-center gap-3 text-xs text-emerald-900 font-medium">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Available for live physical viewing & instant pickup at Wakad & Hinjewadi stores.</span>
            </div>
          </div>

          {/* Right Column: Product Title, Options & Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              {/* Status & Care Badges */}
              <div className="flex items-center gap-2">
                <Badge variant={stockVariantMap[product.availability_status] || 'neutral'}>
                  {product.availability_status}
                </Badge>

                {product.plant_care_difficulty && product.plant_care_difficulty !== 'N/A' && (
                  <Badge variant={careVariantMap[product.plant_care_difficulty] || 'neutral'}>
                    {product.plant_care_difficulty} Care
                  </Badge>
                )}
              </div>

              {/* Suitable For Tags */}
              {product.suitable_for && product.suitable_for.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {product.suitable_for.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 leading-tight">
                {product.name}
              </h1>

              {product.short_description && (
                <p className="font-body text-slate-600 text-sm sm:text-base leading-relaxed">
                  {product.short_description}
                </p>
              )}
            </div>

            {/* Detailed Full Description */}
            {product.description && (
              <div className="p-4 rounded-xl bg-surface-low border border-surface-default text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
                <span className="font-bold text-slate-900 block">About This Product:</span>
                <p>{product.description}</p>
              </div>
            )}

            {/* Size Options Pills */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Available Pot / Plant Sizes:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-800 shadow-sm"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Color Options Pills */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Available Flower / Pot Colors:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-800 shadow-sm"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Direct WhatsApp & Call CTAs */}
            <div className="space-y-3 pt-4 border-t border-surface-default">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block w-full">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full text-sm sm:text-base py-3.5 shadow-md justify-center"
                  icon={<MessageCircle className="w-5 h-5 fill-current" />}
                >
                  WhatsApp Enquiry (Pre-Filled)
                </Button>
              </a>

              <div className="grid grid-cols-2 gap-3">
                <a href="tel:8007634856" className="w-full">
                  <Button variant="outline" className="w-full text-xs sm:text-sm py-2.5 justify-center" icon={<Phone className="w-4 h-4" />}>
                    Call Store (8007634856)
                  </Button>
                </a>
                <Link href="/stores" className="w-full">
                  <Button variant="outline" className="w-full text-xs sm:text-sm py-2.5 justify-center" icon={<MapPin className="w-4 h-4" />}>
                    Store Directions
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* PLANT CARE GUIDE SECTION — Shown ONLY for Plants */}
        {isPlant && (
          <div className="space-y-6 pt-10 border-t border-surface-default">
            <div className="space-y-1">
              <span className="text-xs font-bold text-primary uppercase tracking-widest block">
                Gardener Care Manual
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
                Plant Care & Growing Guide
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Follow these simple care guidelines to keep your plant healthy and thriving for years.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Sunlight Guide Card */}
              <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-3 shadow-soft">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Sun className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-base text-slate-900">Sunlight Requirement</h3>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {product.sunlight || 'Thrives in bright indirect sunlight. Avoid harsh direct afternoon heat.'}
                </p>
              </div>

              {/* Water Guide Card */}
              <div className="p-5 rounded-2xl bg-sky-50/60 border border-sky-200/80 space-y-3 shadow-soft">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
                  <Droplets className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-base text-slate-900">Watering Schedule</h3>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {product.water || 'Water when the top 1-2 inches of soil feel dry to touch.'}
                </p>
              </div>

              {/* Ideal Placement */}
              <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-3 shadow-soft">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Sprout className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-base text-slate-900">Ideal Placement</h3>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {product.specifications?.['Ideal Placement'] || 'Bedrooms, Living Room Corners, Office Desks & Balconies.'}
                </p>
              </div>

              {/* Common Issues & Maintenance */}
              <div className="p-5 rounded-2xl bg-teal-50/60 border border-teal-200/80 space-y-3 shadow-soft">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-base text-slate-900">Common Issues & Maintenance</h3>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  Yellow leaves indicate overwatering. Wipe leaves monthly with moist cloth to keep pores clear.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* MATERIAL DETAILS SECTION — Shown ONLY for Pots */}
        {isPot && (
          <div className="space-y-6 pt-10 border-t border-surface-default">
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block">
                Craftsmanship & Build
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
                Pot Material & Durability Details
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                High-fired weather-resistant construction engineered for long-lasting root health and premium home aesthetics.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-3 shadow-soft">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <Box className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-base text-slate-900">Material Type</h3>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {product.specifications?.['Material'] || 'High-Fired Premium Glazed Ceramic Clay'}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-3 shadow-soft">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Droplets className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-base text-slate-900">Root Drainage</h3>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  Includes bottom drainage hole to prevent waterlogging and root rot.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-sky-50/60 border border-sky-200/80 space-y-3 shadow-soft">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-base text-slate-900">Weather Resistance</h3>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  UV-protected glaze resistant to sun fading, rainwater rust, and cracking.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200/80 space-y-3 shadow-soft">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-base text-slate-900">Weight & Stability</h3>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  Heavy anti-tip base designed for heavy indoor and balcony foliage.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Specifications Table & Features */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
          {/* Specifications Table */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="lg:col-span-6 space-y-4">
              <h3 className="font-display font-bold text-xl text-slate-900">Specifications & Details</h3>
              <div className="rounded-xl border border-surface-default overflow-hidden bg-white">
                <table className="w-full text-left text-xs sm:text-sm">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, value], idx) => (
                      <tr key={key} className={idx % 2 === 0 ? 'bg-surface-low' : 'bg-white'}>
                        <td className="py-3 px-4 font-semibold text-slate-700 border-r border-surface-default w-1/3">{key}</td>
                        <td className="py-3 px-4 text-slate-800">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Key Highlights Checkmarks */}
          {product.features && product.features.length > 0 && (
            <div className="lg:col-span-6 space-y-4">
              <h3 className="font-display font-bold text-xl text-slate-900">Key Variety Highlights</h3>
              <div className="p-5 rounded-xl border border-surface-default bg-white space-y-3">
                {product.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Physical Stores Location & Hours Banner */}
        <div className="p-6 sm:p-8 rounded-card bg-surface-low border border-primary/20 space-y-4 shadow-soft">
          <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
            <MapPin className="w-5 h-5" /> Visit Our Physical Stores in Pune
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-700">
            <div className="p-4 rounded-xl bg-white border border-surface-default space-y-1">
              <span className="font-bold text-slate-900 block text-base">Store 1 — New Wakad</span>
              <p className="text-slate-600">Atlanta 2 Society, New Wakad – Hinjawadi Link Rd, Pune 411057</p>
              <div className="pt-2 text-emerald-700 font-semibold flex items-center gap-1">
                <Clock className="w-4 h-4" /> Open 8:00 AM – 10:30 PM (All 7 Days)
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-surface-default space-y-1">
              <span className="font-bold text-slate-900 block text-base">Store 2 — Shweta Matka Bhandar & Nursery</span>
              <p className="text-slate-600">Hinjewadi Jakatnaka, Wakad Rd, opposite Madhuban Hotel, Pune 411057</p>
              <div className="pt-2 text-emerald-700 font-semibold flex items-center gap-1">
                <Clock className="w-4 h-4" /> Open 8:00 AM – 10:30 PM (All 7 Days)
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Carousel / Grid */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6 pt-8 border-t border-surface-default">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-bold text-2xl text-slate-900">You May Also Like</h2>
              <Link href="/products" className="text-xs font-semibold text-primary hover:underline">
                Browse All Products →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </div>
        )}

        {/* STICKY MOBILE BOTTOM WHATSAPP BAR */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-slate-200 z-40 shadow-soft-lg flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <span className="font-display font-bold text-xs text-slate-900 block truncate">
              {product.name}
            </span>
            <span className="text-[11px] font-semibold text-emerald-700 block">
              {product.availability_status}
            </span>
          </div>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="shrink-0">
            <Button size="sm" variant="primary" icon={<MessageCircle className="w-4 h-4 fill-current" />}>
              Enquire Now
            </Button>
          </a>
        </div>
      </div>
    </ProductDetailClientGuard>
  );
}
