'use client';

import React from 'react';

import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { getPlanMatesUserId } from '@/api/planMate';
import { removeYearOfDate } from '@/utils/aboutDay';
import { removeCommas } from '@/utils/numberFormat';

interface Props {
  dates: string[];
  datesCost: string[];
  totalCost: string;
}

const Receipt = ({ dates, datesCost, totalCost }: Props) => {
  const { planId } = useParams<{ planId: string }>();

  const { data: mateUserIds } = useQuery({
    queryKey: ['planMates', planId],
    queryFn: async () => await getPlanMatesUserId(planId),
    staleTime: Infinity,
  });

  const totalExpendedCost = datesCost.reduce((acc, cur) => (acc += +cur), 0);
  const remainingCost = Number(removeCommas(totalCost)) - totalExpendedCost;
  const planMateCount = mateUserIds ? mateUserIds.length : 1;

  const isMinusRemainingCost = remainingCost < 0;
  const remainingCostText = isMinusRemainingCost ? ' 부족해요!' : ' 남았어요!';

  return (
    <div className="w-full">
      <div
        className="flex flex-col items-end mx-auto gap-1 text-center leading-6 tracking-tighter rounded-lg border-2 border-yellow
        sm:w-[266px] sm:py-[28px] sm:px-[50px]
        md:w-[325px] md:py-[45px] md:px-[60px]
      "
      >
        <p className="sm:text-sm md:text-normal font-semibold text-gray_dark_1">
          예산은&nbsp;
          <span className="font-semibold text-yellow">{totalCost}원</span>
          &nbsp; 입니다.
        </p>
        {dates.map((date, idx) => {
          return (
            <div key={uuid()} className="flex sm:text-xs md:text-sm">
              <p className="font-semibold mr-[65px] text-gray_dark_1">{removeYearOfDate(date)}</p>
              <p className="font-normal text-right text-gray">{datesCost[idx]}원</p>
            </div>
          );
        })}
        <div
          className="w-full mt-[10px] pt-2 border-t border-gray text-right font-semibold text-gray_dark_1
          sm:text-sm 
          md:text-normal
        "
        >
          <p>
            총 사용 경비는&nbsp;
            <span className="font-semibold text-blue ">{totalExpendedCost}원</span>
            &nbsp; 입니다.
          </p>
          <p className="mt-2">
            <span className=" text-orange">{remainingCost}원</span>
            {remainingCostText}
          </p>
          <p className=" mt-[40px]">
            인당&nbsp;
            <span className="text-navy">
              {Math.abs(remainingCost / planMateCount).toFixed(0)}원
            </span>
            {isMinusRemainingCost ? ' 부족해요!' : ' 남아요!'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
