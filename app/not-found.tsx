import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Home, Leaf } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[65vh] flex flex-col items-center justify-center text-center px-4 space-y-4">
      <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center">
        <Leaf className="w-8 h-8" />
      </div>
      <h1 className="font-display font-bold text-4xl text-slate-900">404 — Page Not Found</h1>
      <p className="text-slate-600 max-w-md text-sm">
        The plant category or page you are looking for does not exist or has been moved.
      </p>
      <Link href="/">
        <Button variant="primary" icon={<Home className="w-4 h-4" />}>
          Return to Homepage
        </Button>
      </Link>
    </div>
  );
}
