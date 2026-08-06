import React from 'react';
import { Leaf } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center animate-bounce">
        <Leaf className="w-6 h-6 animate-pulse" />
      </div>
      <p className="font-body text-sm font-semibold text-primary tracking-wider uppercase">
        Loading Shivansh Nursery...
      </p>
    </div>
  );
}
