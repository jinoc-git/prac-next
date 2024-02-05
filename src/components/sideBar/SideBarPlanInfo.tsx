'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { SIED_CHIP_COLOR } from '@/utils/sideBarColorList';

import type { PlanType } from '@/types/supabase';

interface SideBarPlanInfoProps {
  activePlan: PlanType | undefined;
  nextPlan: PlanType | undefined;
  isOpen: boolean;
  status: '여행 중' | '여행 예정' | '여행 없음';
}

export default function SideBarPlanInfo(props: SideBarPlanInfoProps) {
  const { activePlan, nextPlan, isOpen, status } = props;
  const router = useRouter();

  const onClickPlan = () => {
    if (activePlan != null) router.push(`/plan/${activePlan.id}`);
    else if (nextPlan != null) router.push(`/plan/${nextPlan.id}`);
  };

  return (
    <div
      onClick={onClickPlan}
      className={`flex flex-col items-center cursor-pointer ${
        isOpen ? 'gap-2' : ''
      } rounded-xl overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen
          ? 'flex-center flex-col sm:w-[308px] sm:h-[125px] md:w-[197px] h-[125px]'
          : 'md:w-[40px] h-[125px]'
      } ${SIED_CHIP_COLOR[status]}`}
    >
      {/* 닫혔을 때 여행 중, 예정일 때 날짜 표시 */}
      {!isOpen && status === '여행 중' && (
        <p className="text-sm pt-2">{removeYearOfDate(activePlan?.dates[0])}</p>
      )}
      {!isOpen && status === '여행 예정' && (
        <p className="text-xs pt-3">{removeYearOfDate(nextPlan?.dates[0])}</p>
      )}

      {/* 여행 중일 때만 진행률 표시 */}
      {status === '여행 중' && (
        <div
          className={`flex ${
            isOpen ? 'flex-col sm:gap- md:gap-1' : ' md:flex-col-reverse gap-1'
          } items-center`}
        >
          <p
            className={` bg-gradient-to-r from-blue_dark to-blue text-transparent bg-clip-text font-bold ${
              isOpen ? 'text-sm ' : 'text-xs'
            }`}
          >
            {progress + '%'}
          </p>
          <SideBarProgressBar percent={progress} isOpen={isOpen} />
          {isOpen && (
            <div className="flex justify-between w-[160px]">
              <span className=" text-sm">
                {removeYearOfDate(activePlan?.dates[0])}
              </span>
              <span className=" text-sm">
                {removeYearOfDate(
                  activePlan?.dates[activePlan.dates.length - 1],
                )}
              </span>
            </div>
          )}
        </div>
      )}

      {/* 닫혔을 때만 보여지는 내용 */}
      {!isOpen && status === '여행 예정' && (
        <p className="text-sm leading-4 mt-3">
          여<br />행<br />예<br />정
        </p>
      )}
      {!isOpen && status === '여행 없음' && (
        <p className="text-sm leading-4 mt-8">
          여<br />행<br />없<br />음
        </p>
      )}

      {/* 열렸을 때만 보여지는 내용 */}
      {isOpen && status === '여행 중' && (
        <div className="text-center">
          <p className="w-[170px] font-semibold text-gray_dark_1 text-sm truncate">
            {activePlan?.title}
          </p>
          <p className="text-sm font-semibold text-gray_dark_1">
            ({changeDotFormatOfDate(activePlan?.dates[0])})
          </p>
        </div>
      )}
      {isOpen && status === '여행 예정' && (
        <div className="text-center">
          <p className="w-[170px] text-sm truncate">{nextPlan?.title}</p>
          <p className="text-sm">{formatMonthDay(nextPlan!.dates[0])}</p>
        </div>
      )}
      {isOpen && status === '여행 없음' && (
        <div className="text-center">
          <p className="w-[170px] text-sm truncate">예정된 여행이 없습니다.</p>
          <p className="text-sm">새로운 여행을 등록하세요!</p>
        </div>
      )}
    </div>
  );
}
