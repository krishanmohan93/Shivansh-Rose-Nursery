import React from 'react';
import { Metadata } from 'next';
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
  ShieldCheck,
  MapPin,
  Clock,
  CheckCircle2,
  Leaf,
  Sparkles,
} from 'lucide-react';

export const revalidate = 300;

/**
 * Generates dynamic SEO metadata for product detail page.
 * @param props Component route parameters containing product slug.
 * @returns Metadata object with localized title, description, and canonical URL.
 */
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { product } = await getProductBySlug(params.slug);

  if (!product) {
    return {
      title: 'Product Not Found | Shivansh Rose Nursery Pune',
    };
  }

  const title = `${product.name} | Buy at Nursery in Wakad & Hinjewadi Pune`;
  const description =
    product.description ||
    `Buy authentic ${product.name} at Shivansh Rose Nursery in Wakad & Hinjewadi, Pune. Inquire on WhatsApp or visit our nursery store today.`;
  const canonicalPath = `/products/p/${product.slug}`;
  const images = product.cloudinary_url ? [product.cloudinary_url] : ['/images/hero-1.jpeg'];

  return {
    title,
    description,
    keywords: [
      product.name.toLowerCase(),
      `buy ${product.name.toLowerCase()} pune`,
      `${product.name.toLowerCase()} nursery wakad`,
      'plant nursery pune',
      'nursery near me',
    ],
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: `${product.name} | Shivansh Rose Nursery`,
      description,
      url: canonicalPath,
      images: [
        {
          url: images[0],
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
  };
}

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

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.cloudinary_url ? [product.cloudinary_url] : [],
    description: product.description || `${product.name} available at Shivansh Rose Nursery Pune`,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: 'Shivansh Rose Nursery',
    },
    offers: {
      '@type': 'Offer',
      url: `https://shivanshrosenursery.com/products/p/${product.slug}`,
      priceCurrency: 'INR',
      price: '0',
      availability:
        product.availability_status === 'Out of Stock'
          ? 'https://schema.org/OutOfStock'
          : 'https://schema.org/InStock',
      seller: {
        '@type': 'LocalBusiness',
        name: 'Shivansh Rose Nursery Pune',
      },
    },
  };

  return (
    <ProductDetailClientGuard productId={product.id} productSlug={product.slug}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
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

              {/* Quick Trust Highlights */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-600 font-medium border-t border-dashed border-slate-200">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Direct Nursery Rate
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 100% Real Nursery Stock
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" /> 8 AM – 10:30 PM Open
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* PROMINENT REAL ABOUT PRODUCT & PHYSICAL NURSERY DETAILS SECTION */}
        <section className="pt-10 border-t border-surface-default space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 8 Columns: Genuine Description & Real Care Notes */}
            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-900 text-xs font-bold uppercase tracking-wider">
                  <Leaf className="w-3.5 h-3.5 text-emerald-700" /> About This Product
                </span>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900">
                  Product Overview &amp; Details
                </h2>
              </div>

              {/* Real Description Box */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-surface-default shadow-xs space-y-5">
                <div className="font-body text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-3">
                  {product.description || product.short_description ? (
                    <p>{product.description || product.short_description}</p>
                  ) : (
                    <p>
                      Genuine {product.name} available at Shivansh Rose Nursery in Wakad and Hinjewadi, Pune. Visit our stores to handpick your favorite plant or planter, or message us directly on WhatsApp for live stock photos and quick pickup assistance.
                    </p>
                  )}
                </div>

                {/* Available Sizes Pills if present */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Available Sizes:
                    </span>
                    {product.sizes.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-100"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* 3 Genuine Nursery Commitments */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/60 space-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wide">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% Real Nursery Stock
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Direct from our Wakad &amp; Hinjewadi plant nurseries. Hand-checked daily by local Pune gardeners.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/60 space-y-1.5">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wide">
                    <Sparkles className="w-4 h-4 text-amber-600" /> Direct Wholesale &amp; Retail
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Zero online commissions or fake price tags. Pay genuine direct nursery rates in Pune.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200/60 space-y-1.5">
                  <div className="flex items-center gap-2 text-teal-900 font-bold text-xs uppercase tracking-wide">
                    <MessageCircle className="w-4 h-4 text-teal-600" /> Free Gardening Advice
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Lifelong guidance via WhatsApp for watering, soil potting mix, and sunlight placement.
                  </p>
                </div>
              </div>
            </div>

            {/* Right 4 Columns: Store Visit & Quick Verification Card */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white rounded-2xl p-6 border border-emerald-900/10 shadow-sm space-y-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                    <MapPin className="w-4 h-4 text-emerald-600" /> Physical Store Availability
                  </div>
                  <h3 className="font-display font-bold text-lg text-slate-900">
                    Visit Our Nursery in Pune
                  </h3>
                  <p className="text-xs text-slate-500">
                    Inspect plants and pots physically before taking them home.
                  </p>
                </div>

                <div className="space-y-3 divide-y divide-slate-100 text-xs text-slate-700">
                  <div className="pt-2 space-y-1">
                    <span className="font-bold text-slate-900 block text-xs">
                      Store 1 — Shivansh Rose Nursery
                    </span>
                    <p className="text-slate-600 leading-relaxed">
                      Atlanta 2 Society, New Wakad – Hinjawadi Link Rd, Pune 411057
                    </p>
                    <span className="text-emerald-700 font-medium flex items-center gap-1 text-[11px] pt-0.5">
                      <Clock className="w-3.5 h-3.5" /> 8:00 AM – 10:30 PM (All 7 Days)
                    </span>
                  </div>

                  <div className="pt-3 space-y-1">
                    <span className="font-bold text-slate-900 block text-xs">
                      Store 2 — Shweta Matka Bhandar &amp; Nursery
                    </span>
                    <p className="text-slate-600 leading-relaxed">
                      Hinjewadi Jakatnaka, Wakad Rd, Opp Madhuban Hotel, Pune 411057
                    </p>
                    <span className="text-emerald-700 font-medium flex items-center gap-1 text-[11px] pt-0.5">
                      <Clock className="w-3.5 h-3.5" /> 8:00 AM – 10:30 PM (All 7 Days)
                    </span>
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full text-xs py-2.5 justify-center shadow-xs"
                      icon={<MessageCircle className="w-4 h-4 fill-current" />}
                    >
                      Enquire on WhatsApp
                    </Button>
                  </a>
                  <a href="tel:8007634856" className="block w-full">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs py-2 justify-center"
                      icon={<Phone className="w-3.5 h-3.5" />}
                    >
                      Call: 8007634856
                    </Button>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Related Products Carousel / Grid */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6 pt-8 border-t border-surface-default">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-bold text-2xl text-slate-900">You May Also Like</h2>
              <Link href="/products" className="text-xs font-semibold text-primary hover:underline">
                Browse All Products →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
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
