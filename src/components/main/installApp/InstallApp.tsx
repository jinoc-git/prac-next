'use client';

import React from 'react';

import usePWA from '@/hooks/usePWA';
import { useSideBarStoreState } from '@/store/sideBarStore';

const InstallApp = () => {
  const { installEvent, installApp } = usePWA();
  const { isSideBarOpen } = useSideBarStoreState();

  return installEvent ? (
    <aside
      className={`fixed bottom-5 left-1/2 -translate-x-1/2 side-bar-transition 
      ${isSideBarOpen ? 'md:ml-[138px]' : 'md:ml-[44px]'}
    `}
    >
      <button
        className="rounded-lg font-semibold text-white p-2 bg-blue_dark hover:bg-blue duration-300 shadow-pwa
          sm:w-[110px] sm:h-[35px] sm:text-sm
          md:w-[150px] md:h-[50px] md:text-normal"
        onClick={installApp}
      >
        앱 설치하기
      </button>
    </aside>
  ) : null;
};

export default InstallApp;
