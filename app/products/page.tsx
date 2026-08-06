import React from 'react';
import Link from 'next/link';
import { CATEGORY_STRUCTURE } from '@/lib/data/categories';
import { fetchProductsByCategory } from '@/lib/supabase/products';
import { ProductCard } from '@/components/products/ProductCard';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Leaf, Sparkles, MapPin, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';

export const revalidate = 300;

export default async function ProductsMainPage() {
  const { products } = await fetchProductsByCategory('', 1, 16);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-14">
      {/* Catalogue Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-emerald-600" /> Complete Digital Catalogue
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-primary tracking-tight leading-tight">
          Explore Plants, Pots & Gardening Essentials
        </h1>
        <p className="font-body text-slate-700 text-base sm:text-lg">
          Browse our extensive collection across Wakad & Hinjawadi nursery locations. Select any category to view full stock. No prices listed — enquire on WhatsApp or visit our stores directly.
        </p>
      </div>

      {/* Category Groups Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {CATEGORY_STRUCTURE.map((group) => (
          <Card key={group.groupSlug} className="p-6 space-y-4 hover:shadow-soft-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-primary flex items-center justify-center shadow-sm">
                <Leaf className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full">
                {group.items.length} Categories
              </span>
            </div>

            <div className="space-y-1">
              <h2 className="font-display font-bold text-2xl text-slate-900">{group.groupName}</h2>
              <p className="text-xs text-slate-600 leading-relaxed">{group.description}</p>
            </div>

            <div className="space-y-2 pt-2 border-t border-surface-default">
              {group.items.map((item) => (
                <Link
                  key={item.slug}
                  href={item.path}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-low text-sm font-medium text-slate-700 hover:text-primary transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    {item.name}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* All Product Catalogue Grid */}
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-surface-default pb-4">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
              Featured Plants & Planters Collection
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Showing popular nursery varieties available across Wakad & Hinjawadi branches.
            </p>
          </div>
          <a href="https://wa.me/918007634856" target="_blank" rel="noopener noreferrer">
            <Button size="sm" variant="outline" icon={<Phone className="w-4 h-4" />}>
              WhatsApp Inquiries
            </Button>
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product, idx) => (
            <ProductCard key={product.id} product={product} priorityImage={idx < 4} />
          ))}
        </div>
      </div>
    </div>
  );
}
