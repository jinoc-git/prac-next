'use client';

import React from 'react';

import { usePathname } from 'next/navigation';

import { useSideBarStoreState } from '@/store/sideBarStore';

const AnimateProvider = ({ children }: { children: React.ReactNode }) => {
  const { isSideBarOpen } = useSideBarStoreState();
  const pathname = usePathname();

  const isLanding = pathname === '/';

  return (
    <main
      className={` relative min-h-screen side-bar-transition sm:ml-0
      ${isLanding ? '' : isSideBarOpen ? 'md:ml-[270px]' : 'md:ml-[88px]'}
    `}
    >
      {children}
    </main>
  );
};

export default AnimateProvider;
