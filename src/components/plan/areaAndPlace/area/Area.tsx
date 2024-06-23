'use client';

import React from 'react';

import Image from 'next/image';

import KakaoMap from './kakaoMap/KakaoMap';

import type { PinContentsType } from '@/types/supabase';

interface Props {
  currentPage: number;
  pins: PinContentsType[][];
}

const Area = (props: Props) => {
  const { currentPage, pins } = props;

  return (
    <div className=" space-y-3">
      <div
        className="flex items-center font-semibold text-gray_dark_1 gap-[8px]
        sm:text-sm
        md:text-normal md:my-[10px] "
      >
        <Image src={'/images/svgs/area-pin.svg'} width={20} height={20} alt="여행 지역 아이콘" />
        <p>여행 지역</p>
      </div>
      <KakaoMap pins={pins[currentPage]} drawLine={true} currentPage={currentPage} />
    </div>
  );
};

export default Area;
