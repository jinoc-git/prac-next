'use client';

import React from 'react';

import { usePathname } from 'next/navigation';

import { useSideBarStoreState } from '@/store/sideBarStore';

const AnimateProvider = ({ children }: { children: React.ReactNode }) => {
  const { isSideBarOpen, isNotFoundPage } = useSideBarStoreState();
  const pathname = usePathname();

  const shouldNoMargin =
    pathname === '/' || pathname === '/signin' || pathname === '/signup' || isNotFoundPage;

  return (
    <main
      className={` relative min-h-screen side-bar-transition sm:ml-0
      ${shouldNoMargin ? '' : isSideBarOpen ? 'md:ml-[270px]' : 'md:ml-[88px]'}
    `}
    >
      {children}
    </main>
  );
};

export default AnimateProvider;
