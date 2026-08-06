'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { RefreshCw, Home } from 'lucide-react';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 space-y-4">
      <h2 className="font-display font-bold text-3xl text-slate-900">Something went wrong!</h2>
      <p className="text-slate-600 max-w-md text-sm">
        We encountered an error loading this section. Please try again or return home.
      </p>
      <div className="flex gap-3">
        <Button onClick={() => reset()} variant="primary" size="sm" icon={<RefreshCw className="w-4 h-4" />}>
          Try Again
        </Button>
        <Link href="/">
          <Button variant="outline" size="sm" icon={<Home className="w-4 h-4" />}>
            Back Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
