import React, { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { findCategoryByPath } from '@/lib/data/categories';
import { fetchProductsByCategory } from '@/lib/supabase/products';
import { ProductCard } from '@/components/products/ProductCard';
import { CategoryScrollHandler } from '@/components/products/CategoryScrollHandler';
import { ChevronRight, Home, Leaf, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const revalidate = 300;

export default async function CategoryPage({
  params,
}: {
  params: { category: string[] };
}) {
  const categorySegments = params.category || [];
  const fullPath = categorySegments.join('/');

  const categoryMeta = findCategoryByPath(categorySegments);

  if (!categoryMeta) {
    notFound();
  }

  const { products, total } = await fetchProductsByCategory(fullPath, 1, 100);

  const categoryName = 'name' in categoryMeta ? categoryMeta.name : categoryMeta.groupName;
  const categoryDesc = 'description' in categoryMeta ? categoryMeta.description : '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      <Suspense fallback={null}>
        <CategoryScrollHandler />
      </Suspense>

      {/* Breadcrumbs Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 font-medium overflow-x-auto py-1">
        <Link href="/" className="hover:text-primary flex items-center gap-1 shrink-0">
          <Home className="w-3.5 h-3.5" /> Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <Link href="/products" className="hover:text-primary shrink-0">
          Products
        </Link>
        {categorySegments.map((segment, idx) => {
          const isLast = idx === categorySegments.length - 1;
          const segmentPath = `/products/${categorySegments.slice(0, idx + 1).join('/')}`;
          return (
            <React.Fragment key={segment}>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {isLast ? (
                <span className="text-primary font-bold capitalize shrink-0">{categoryName}</span>
              ) : (
                <Link href={segmentPath} className="hover:text-primary capitalize shrink-0">
                  {segment}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>

      {/* Category Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-surface-low to-background p-6 sm:p-10 border border-surface-default shadow-soft">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
            <Leaf className="w-4 h-4" /> Nursery Catalogue • {total} Available Items
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary tracking-tight">
            {categoryName}
          </h1>
          <p className="font-body text-slate-700 text-sm sm:text-base leading-relaxed">
            {categoryDesc}
          </p>
        </div>
      </div>

      {/* Subcategory Pills Bar (if viewing a parent category group) */}
      {'items' in categoryMeta && categoryMeta.items && (
        <div className="flex flex-wrap items-center gap-2 pt-2 border-b border-surface-default pb-4">
          <span className="text-xs font-semibold text-slate-500 mr-2">Filter Subcategory:</span>
          {categoryMeta.items.map((subItem) => (
            <Link key={subItem.slug} href={subItem.path}>
              <Button size="sm" variant="outline" className="text-xs py-1 px-3">
                {subItem.name}
              </Button>
            </Link>
          ))}
        </div>
      )}

      {/* Clean Category Products Grid (No Filter Sidebar) */}
      {products.length > 0 ? (
        <div className="space-y-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {products.map((product, idx) => (
              <ProductCard key={product.id} product={product} priorityImage={idx < 4} />
            ))}
          </div>

          {/* Wholesale Inquiry Banner */}
          <div className="p-6 sm:p-8 rounded-card bg-surface-low border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-soft">
            <div className="space-y-1">
              <h3 className="font-display font-bold text-lg text-slate-900">
                Looking for a specific plant size or bulk nursery supply?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Contact Shivansh Rose Nursery directly on WhatsApp for live photo availability and wholesale quotes.
              </p>
            </div>
            <a href="https://wa.me/918007634856" target="_blank" rel="noopener noreferrer" className="shrink-0">
              <Button variant="primary" icon={<Phone className="w-4 h-4" />}>
                WhatsApp Enquiry
              </Button>
            </a>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center border-2 border-dashed border-surface-default rounded-card bg-white space-y-4">
          <Leaf className="w-12 h-12 text-primary/40 mx-auto" />
          <h3 className="font-display text-xl font-bold text-slate-900">No items found in this category</h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            We are constantly adding fresh nursery stock. Contact our Wakad & Hinjawadi stores on WhatsApp to check live store inventory.
          </p>
          <Link href="/products">
            <Button variant="outline" size="sm">
              Explore All Categories
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
