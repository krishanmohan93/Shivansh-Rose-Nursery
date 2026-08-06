import React, { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug, getRelatedProducts } from '@/lib/supabase/products';
import { ProductCard } from '@/components/products/ProductCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
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
  Sparkles,
  Leaf,
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-14">
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
        {/* Left Column: Product Photo Showcase */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden border-4 border-white shadow-soft-lg bg-surface-low group">
            <Image
              src={product.cloudinary_url || '/images/hero-1.jpeg'}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <Badge variant={stockVariantMap[product.availability_status] || 'neutral'}>
                {product.availability_status}
              </Badge>

              {product.plant_care_difficulty && product.plant_care_difficulty !== 'N/A' && (
                <Badge variant={careVariantMap[product.plant_care_difficulty] || 'neutral'}>
                  {product.plant_care_difficulty} Care
                </Badge>
              )}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-center gap-3 text-xs text-emerald-900 font-medium">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Available for live physical viewing & instant pickup at Wakad & Hinjewadi stores.</span>
          </div>
        </div>

        {/* Right Column: Product Title, Options & Actions */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            {/* Suitable For Tags */}
            {product.suitable_for && product.suitable_for.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
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
              <span className="font-bold text-slate-900 block">About This Variety:</span>
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

      {/* Comprehensive Plant Care Guide Section */}
      {(product.sunlight || product.water || product.features) && (
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
            <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/60 space-y-3 shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Sun className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-slate-900">Sunlight Requirement</h3>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {product.sunlight || 'Thrives in bright indirect sunlight. Avoid harsh direct afternoon heat.'}
              </p>
            </div>

            {/* Water Guide Card */}
            <div className="p-5 rounded-2xl bg-sky-50/50 border border-sky-200/60 space-y-3 shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
                <Droplets className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-slate-900">Watering Schedule</h3>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {product.water || 'Water when the top 1-2 inches of soil feel dry to touch.'}
              </p>
            </div>

            {/* Soil & Fertilizer Card */}
            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/60 space-y-3 shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Sprout className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-slate-900">Soil & Nutrition</h3>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                Requires well-draining organic potting soil mix with cow dung manure feed monthly.
              </p>
            </div>

            {/* Maintenance Card */}
            <div className="p-5 rounded-2xl bg-teal-50/50 border border-teal-200/60 space-y-3 shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-slate-900">Maintenance & Dusting</h3>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                Wipe leaves gently with a moist cloth to keep pores clear for photosynthesis.
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

      {/* Related Products Grid */}
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
    </div>
  );
}
