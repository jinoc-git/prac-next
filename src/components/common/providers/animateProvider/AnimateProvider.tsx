'use client';

import React from 'react';

import { useSideBarStoreState } from '@/store/sideBarStore';

const AnimateProvider = ({ children }: { children: React.ReactNode }) => {
  const { isSideBarOpen } = useSideBarStoreState();

  return (
    <main
      className={`min-h-screen side-bar-transition sm:ml-0
      ${isSideBarOpen ? 'md:ml-[270px]' : 'md:ml-[88px]'}
  `}
    >
      {children}
    </main>
  );
};

export default AnimateProvider;
