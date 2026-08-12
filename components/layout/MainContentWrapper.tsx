'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

export const MainContentWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <main className={`flex-grow ${isAdmin ? 'pt-0' : 'pt-20'}`}>
      {children}
    </main>
  );
};
