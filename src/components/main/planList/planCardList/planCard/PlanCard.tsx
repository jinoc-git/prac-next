'use client';

import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { calculateDday } from '@/utils/aboutDay';

import PlanCardDate from './PlanCardDate';
import PlanCardStatusChip from './PlanCardStatusChip';
import PlanCardUserList from './PlanCardUserList';

import type { PlanStatus } from '@/types/aboutPlan';
import type { BookMarkType, PlanType } from '@/types/supabase';

interface PlanCardProps {
  plan: PlanType;
  bookMarkData: BookMarkType | undefined;
  avatarList: (string | null | undefined)[];
  nicknameList: string[];
}

export default function PlanCard(props: PlanCardProps) {
  const { plan, bookMarkData, avatarList, nicknameList } = props;
  const router = useRouter();

  const onClickPlanCard = (status: PlanStatus, id: string) => {
    if (status === 'planning') router.push(`/plan/${id}`);
    if (status === 'traveling') router.push(`/plan/${id}`);
    if (status === 'recording') router.push(`/addPhoto/${id}`);
    if (status === 'end') router.push(`/ending/${id}`);
  };

  const onClickQuitBtn = (id: string) => {};

  return (
    <div
      className="flex bg-white shadow-card rounded-[7px] cursor-pointer
        sm:w-[318px] sm:h-[80px] sm:mx-[1px]
        md:w-[800px] md:h-[150px] "
      onClick={() => {
        onClickPlanCard(plan.plan_state, plan.id);
      }}
    >
      <div
        className="sm:w-[45px] sm:mt-[23px] 
              md:w-[80px] md:h-[16px] md:mt-[25px] md:ml-[28px]"
      >
        {/* 북마크 추가 예정 */}
        <div className="mt-[0px] h-[12px]">
          {plan.plan_state === 'end' ? null : (
            <p
              className="text-yellow text-center font-bold
                sm:text-[10px] 
                md:text-[18px] md:mt-[11px]"
            >
              {calculateDday(new Date(plan.dates[0]))}
            </p>
          )}
        </div>
      </div>
      <div
        className="sm:w-[238px] sm:h-2/3 sm:ml-[5px]
          md:w-4/5 md:h-[16px] md:items-center "
      >
        <div className="flex items-center sm:mt-[20px] md:mt-[22px]">
          <p className="text-gray_dark_1 sm:text-sm md:text-xlg font-bold mr-[16px]">
            {plan.title}
          </p>
          <PlanCardStatusChip state={plan.plan_state} />
        </div>
        <PlanCardDate dates={plan.dates} />
        <PlanCardUserList avatarList={avatarList} nicknameList={nicknameList} />
      </div>
      <div
        className="flex justify-center h-[16px]
          sm:w-[15px] sm:ml-[10px] sm:mr-[10px] sm:mt-[20px] 
          md:w-[80px] md:mr-[25px] md:mt-[22px]"
      >
        <button
          className="sm:mt-[2px] md:mt-[4px]"
          aria-label="card-quit-plan-btn"
          onClick={() => {
            onClickQuitBtn(plan.id);
          }}
        >
          <Image
            alt="여행 나가기"
            src={'/images/quit.svg'}
            width={24}
            height={24}
            // 호버 시 색상 변경 수정 필요할듯?
            className=" hover:fill-orange_dark hover:stroke-orange_light_2 sm:w-[16px] sm:h-[16px] md:w-[24px] md:h-[24px]"
          />
        </button>
      </div>
    </div>
  );
}
