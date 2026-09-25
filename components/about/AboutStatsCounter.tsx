'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Calendar, Sprout, Store } from 'lucide-react';

interface StatProps {
  label: string;
  value: number;
  suffix: string;
  note: string;
  icon: React.ReactNode;
  bg: string;
}

const CountUpItem: React.FC<StatProps> = ({ label, value, suffix, note, icon, bg }) => {
  const [count, setCount] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 1500; // 1.5 seconds
      const steps = 30;
      const increment = Math.ceil(value / steps);
      const stepTime = duration / steps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div
      ref={ref}
      className="p-6 sm:p-8 rounded-3xl bg-white border border-emerald-100/90 shadow-soft hover:shadow-soft-lg transition-all duration-300 space-y-4 text-center group"
    >
      <div className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center mx-auto shadow-xs group-hover:scale-110 transition-transform`}>
        {icon}
      </div>

      <div className="space-y-1">
        <span className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-primary tracking-tight block">
          {count.toLocaleString()}{suffix}
        </span>
        <h3 className="font-display font-bold text-base sm:text-lg text-slate-900">
          {label}
        </h3>
        <span className="text-[10px] font-semibold text-slate-700 block uppercase tracking-wider">
          {note}
        </span>
      </div>
    </div>
  );
};

export const AboutStatsCounter: React.FC = () => {
  const statsList: StatProps[] = [
    {
      label: 'Happy Customers',
      value: 5000,
      suffix: '+',
      note: 'Homes & Societies in Pune',
      icon: <Users className="w-7 h-7 text-emerald-700" />,
      bg: 'bg-emerald-100 text-emerald-800',
    },
    {
      label: 'Years of Experience',
      value: 8,
      suffix: '+ Years',
      note: 'Horticulture & Nursery Care',
      icon: <Calendar className="w-7 h-7 text-sky-700" />,
      bg: 'bg-sky-100 text-sky-800',
    },
    {
      label: 'Plant Varieties',
      value: 500,
      suffix: '+',
      note: 'Indoor, Outdoor & Exotic Stock',
      icon: <Sprout className="w-7 h-7 text-teal-700" />,
      bg: 'bg-teal-100 text-teal-800',
    },
    {
      label: 'Physical Nursery Branches',
      value: 2,
      suffix: ' Stores',
      note: 'Wakad & Hinjawadi Jakatnaka',
      icon: <Store className="w-7 h-7 text-amber-700" />,
      bg: 'bg-amber-100 text-amber-800',
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-background-cream border-t border-b border-surface-default relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest border border-primary/20">
            📊 Our Journey In Numbers
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Nursery Milestones
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsList.map((stat, index) => (
            <CountUpItem key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};
