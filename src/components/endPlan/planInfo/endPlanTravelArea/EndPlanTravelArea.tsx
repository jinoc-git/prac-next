'use client';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import KakaoMap from '@/components/plan/areaAndPlace/area/kakaoMap/KakaoMap';

import type { PinContentsType, PinType } from '@/types/supabase';

interface Props {
  allPins: PinType[];
}

const EndPlanTravelArea = ({ allPins }: Props) => {
  const [pins, setPins] = useState<PinContentsType[]>([]);

  useEffect(() => {
    const pins = allPins.map(({ contents }) => contents).flat();
    setPins(pins);
  }, [allPins]);

  return (
    <div className="inner-content-layout flex-col space-y-[10px]">
      <div className="content-lable w-full">
        <Image src={'/images/svgs/area-pin.svg'} width={20} height={20} alt="여행 지역 아이콘" />
        <p>여행 지역</p>
      </div>
      <KakaoMap pins={pins} drawLine={true} />
    </div>
  );
};

export default EndPlanTravelArea;
