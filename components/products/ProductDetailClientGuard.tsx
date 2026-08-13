'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Leaf, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getStoredProducts, PRODUCTS_UPDATED_EVENT } from '@/lib/store/productsStore';

interface ProductDetailClientGuardProps {
  productId: string;
  productSlug: string;
  children: React.ReactNode;
}

export const ProductDetailClientGuard: React.FC<ProductDetailClientGuardProps> = ({
  productId,
  productSlug,
  children,
}) => {
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    const checkStatus = () => {
      if (typeof window !== 'undefined') {
        const activeProducts = getStoredProducts().filter((p) => p.is_published !== false);
        const exists = activeProducts.some((p) => p.id === productId || p.slug === productSlug);
        if (!exists) {
          setIsRemoved(true);
        } else {
          setIsRemoved(false);
        }
      }
    };

    checkStatus();

    window.addEventListener(PRODUCTS_UPDATED_EVENT, checkStatus);
    return () => window.removeEventListener(PRODUCTS_UPDATED_EVENT, checkStatus);
  }, [productId, productSlug]);

  if (isRemoved) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mx-auto shadow-sm">
          <Leaf className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="font-display font-bold text-3xl text-slate-900">
            Product No Longer Available
          </h2>
          <p className="font-body text-slate-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            This product has been deleted or hidden from the nursery catalogue by the Admin.
          </p>
        </div>
        <Link href="/products" className="inline-block pt-2">
          <Button variant="primary" size="md" icon={<ArrowLeft className="w-4 h-4" />}>
            Browse Active Products Catalogue
          </Button>
        </Link>
      </div>
    );
  }

  return <>{children}</>;
};
