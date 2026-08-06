'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function CategoryScrollContent() {
  const searchParams = useSearchParams();
  const plantSlug = searchParams?.get('plant');

  useEffect(() => {
    if (plantSlug) {
      const targetElement = document.getElementById(`product-${plantSlug}`);
      if (targetElement) {
        const timer = setTimeout(() => {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          targetElement.classList.add('ring-4', 'ring-primary', 'shadow-soft-lg');

          setTimeout(() => {
            targetElement.classList.remove('ring-4', 'ring-primary');
          }, 4000);
        }, 300);

        return () => clearTimeout(timer);
      }
    }
  }, [plantSlug]);

  return null;
}

export function CategoryScrollHandler() {
  return (
    <Suspense fallback={null}>
      <CategoryScrollContent />
    </Suspense>
  );
}
