'use client';

import React from 'react';

import usePWA from '@/hooks/usePWA';

const InstallAppOrNavigate = () => {
  const { installEvent, installApp } = usePWA();

  return (
    <section className="flexcol items-center mt-5 sm:mb-[30px] md:mb-[120px] gap-1">
      <button
        className="font-bold text-blue underline underline-offset-[6px] cursor-pointer
        md:text-[30px] md:w-[300px]
        sm:text-[17px] sm:w-[180px]"
        onClick={installApp}
      >
        앱 설치하고 사용해보기
      </button>
      <p className=" sm:text-xs md:text-sm text-center text-gray_dark_1">
        일부 환경에서는 동작하지 않을 수 있습니다.
      </p>
    </section>
  );
};

export default InstallAppOrNavigate;
