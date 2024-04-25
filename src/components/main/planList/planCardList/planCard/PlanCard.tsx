'use client';

import React from 'react';

import { calcDday } from '@/utils/aboutDay';

import BookMark from './bookMark/BookMark';
import PlanCardDate from './PlanCardDate';
import PlanCardQuitButton from './PlanCardQuitButton';
import PlanCardStatusChip from './PlanCardStatusChip';
import PlanCardUserList from './PlanCardUserList';

import type { PlanStatus } from '@/types/aboutPlan.type';
import type { BookMarkType, PlanType } from '@/types/supabase';

interface Props {
  plan: PlanType;
  bookMarkData: BookMarkType | undefined;
  avatarList: (string | null | undefined)[];
  nicknameList: string[];
  onClickPlanCard: (status: PlanStatus, id: string) => void;
  handleBookMark: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    bookMarkData: BookMarkType | undefined,
    planId: string,
  ) => void;
}

export default function PlanCard(props: Props) {
  const {
    plan,
    bookMarkData,
    avatarList,
    nicknameList,
    onClickPlanCard,
    handleBookMark,
  } = props;

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
        <BookMark
          bookMarkData={bookMarkData}
          handleBookMark={handleBookMark}
          planId={plan.id}
        />
        <div className="mt-[0px] h-[12px]">
          {plan.plan_state === 'end' ? null : (
            <p
              className="text-yellow text-center font-bold
                sm:text-[10px] 
                md:text-[18px] md:mt-[11px]"
            >
              {calcDday(new Date(plan.dates[0]))}
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
        <PlanCardQuitButton planId={plan.id} onClickQuitBtn={onClickQuitBtn} />
      </div>
    </div>
  );
}
