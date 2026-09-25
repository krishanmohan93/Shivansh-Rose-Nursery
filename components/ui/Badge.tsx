import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'stock' | 'limited' | 'out' | 'easy' | 'moderate' | 'hard' | 'neutral';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center gap-1 font-body text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 rounded-full uppercase tracking-wider select-none whitespace-nowrap leading-none';

  const variants = {
    stock: 'bg-emerald-100 text-emerald-800 border border-emerald-300',
    limited: 'bg-amber-100 text-amber-800 border border-amber-300',
    out: 'bg-rose-100 text-rose-800 border border-rose-300',
    easy: 'bg-teal-100 text-teal-800 border border-teal-300',
    moderate: 'bg-blue-100 text-blue-800 border border-blue-300',
    hard: 'bg-purple-100 text-purple-800 border border-purple-300',
    neutral: 'bg-slate-100 text-slate-700 border border-slate-200',
  };

  return (
    <span className={cn(baseStyles, variants[variant], className)}>
      {children}
    </span>
  );
};
