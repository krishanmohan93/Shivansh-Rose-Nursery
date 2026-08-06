'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface CardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'outline';
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  hoverEffect = true,
  className = '',
  ...props
}) => {
  const baseStyles = 'rounded-card overflow-hidden transition-all duration-300';

  const variants = {
    default: 'bg-white border border-surface-default shadow-soft',
    glass: 'glass-card shadow-glass border border-white/80',
    outline: 'bg-transparent border-2 border-surface-default',
  };

  const hoverStyles = hoverEffect ? 'hover:shadow-soft-lg hover:-translate-y-1' : '';

  return (
    <motion.div
      className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
