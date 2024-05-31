'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import usePWA from '@/hooks/usePWA';

const InstallAppOrNavigate = () => {
  const { installEvent, installApp } = usePWA();

  const router = useRouter();

  const handleNavigateUser = () => {
    router.push('/signin');
  };

  const buttonText = installEvent ? '앱 설치하고 사용해보기' : '로그인하고 사용해보기';
  const bottomText = installEvent
    ? '일부 환경에서는 동작하지 않을 수 있습니다.'
    : 'Trduler와 함께 여행을 떠나요!';

  return (
    <section className="flexcol items-center sm:mt-10 md:mt-5 sm:mb-[30px] md:mb-[120px] gap-1">
      <button
        name="앱 설치 버튼"
        className="font-bold text-blue underline underline-offset-[6px] cursor-pointer
          md:text-[30px] md:w-[300px]
          sm:text-[17px] sm:w-[180px]"
        onClick={installEvent ? installApp : handleNavigateUser}
      >
        {buttonText}
      </button>
      <p className=" sm:text-xs md:text-sm text-center text-gray_dark_1">{bottomText}</p>
    </section>
  );
};

export default InstallAppOrNavigate;
