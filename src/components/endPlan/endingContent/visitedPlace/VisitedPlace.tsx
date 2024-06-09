'use client';

import React from 'react';

import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
import Image from 'next/image';

import DragNDropProvider from '@/components/common/providers/dragNDropProvider/DragNDropProvider';
import Pin from '@/components/plan/areaAndPlace/place/pin/Pin';

import type { EndingPlanType, PinType } from '@/types/supabase';

interface Props {
  plan: EndingPlanType;
  allPins: PinType[];
}

const VisitedPlace = ({ plan, allPins }: Props) => {
  const distanceList = plan.distance;

  return (
    <section className="inner-content-layout flex-col space-y-[10px] mt-5">
      <div className="content-lable w-full">
        <Image
          src={'/images/svgs/pin.svg'}
          width={20}
          height={20}
          alt="여행 지역 아이콘"
          className="w-[20px] h-[20px]"
        />
        <p>방문한 장소</p>
      </div>

      <DragNDropProvider>
        {allPins.map(({ contents, date }, i) => {
          const dayDistance = distanceList[i];
          return (
            <div key={uuid()}>
              <p
                className="text-center font-semibold text-gray_dark_1
                  md:mt-[15px] md:mb-[35px] md:text-normal
                  sm:mt-[15px] sm:mb-[14px] sm:text-sm
                  "
              >
                {date}
              </p>
              <ol key={uuid()}>
                {contents.map((pin, idx) => {
                  const contentDistance = dayDistance[idx - 1];
                  return (
                    <Pin
                      key={uuid()}
                      pin={pin}
                      idx={idx}
                      distance={idx > 0 ? contentDistance : undefined}
                    />
                  );
                })}
                {contents.length === 0 && (
                  <li>
                    <p>여행 일정 없음</p>
                  </li>
                )}
              </ol>
            </div>
          );
        })}
      </DragNDropProvider>
    </section>
  );
};

export default VisitedPlace;
