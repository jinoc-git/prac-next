'use client';

import React, { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

import { getAllPinsByPlan } from '@/api/pins';
import KakaoMap from '@/components/plan/areaAndPlace/area/kakaoMap/KakaoMap';

import type { PinContentsType, PlanType } from '@/types/supabase';

interface Props {
  plan: PlanType;
}

const EndPlanVisitedPlace = ({ plan }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ['allPins', plan.id],
    queryFn: () => getAllPinsByPlan(plan),
  });

  const [pins, setPins] = useState<PinContentsType[]>([]);

  useEffect(() => {
    if (data) {
      const allPins = data.map(({ contents }) => contents).flat();
      setPins(allPins);
    }
  }, [data]);

  return (
    <div className="inner-content-layout flex-col space-y-[10px]">
      <div className="content-lable w-full">
        <Image
          src={'/images/svgs/area-pin.svg'}
          width={20}
          height={20}
          alt="여행 지역 아이콘"
        />
        <p>여행 지역</p>
      </div>
      <KakaoMap pins={pins} drawLine={true} />
    </div>
  );
};

export default EndPlanVisitedPlace;
