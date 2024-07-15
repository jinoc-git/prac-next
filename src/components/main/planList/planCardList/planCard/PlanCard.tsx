'use client';

import React from 'react';

import { calcDday } from '@/utils/aboutDay';

import BookMark from './bookMark/BookMark';
import PlanCardDate from './planCardDate/PlanCardDate';
import PlanCardQuitButton from './planCardQuitButton/PlanCardQuitButton';
import PlanCardStatusChip from './planCardStatusChip/PlanCardStatusChip';
import PlanCardUserList from './planCardUserList/PlanCardUserList';

import type { PlanStatus } from '@/types/aboutPlan.type';
import type { BookMarkType, PlanType } from '@/types/supabase';

interface Props {
  plan: PlanType;
  bookMarkData: BookMarkType | undefined;
  avatarList: (string | null | undefined)[];
  nicknameList: string[];
  onClickPlanCard: (status: PlanStatus, id: string) => void;
  onClickQuitBtn: (id: string) => void;
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
    onClickQuitBtn,
    handleBookMark,
  } = props;

  return (
    <div
      className="flex bg-white shadow-card rounded-[7px] cursor-pointer
        sm:w-[300px] sm:h-[80px] sm:mx-[1px]
        md:w-[800px] md:h-[150px] "
      onClick={() => {
        onClickPlanCard(plan.plan_state, plan.id);
      }}
    >
      <div className="flexcol items-center gap-1 pt-[17px] sm:px-[5px] md:w-[80px]">
        <BookMark bookMarkData={bookMarkData} handleBookMark={handleBookMark} planId={plan.id} />

        {plan.plan_state === 'end' ? null : (
          <p
            className="text-yellow text-center font-bold
                sm:text-[10px] 
                md:text-[18px]"
          >
            {calcDday(new Date(plan.dates[0]))}
          </p>
        )}
      </div>
      <div
        className="flexcol justify-center sm:w-full sm:px-[5px]
          md:w-4/5 md:px-[20px] "
      >
        <div className="flex items-center">
          <p className="text-gray_dark_1 sm:text-sm md:text-xlg font-bold mr-[16px]">
            {plan.title}
          </p>
          <PlanCardStatusChip status={plan.plan_state} />
        </div>
        <PlanCardDate dates={plan.dates} />
        <PlanCardUserList avatarList={avatarList} nicknameList={nicknameList} />
      </div>
      <div
        className="flex justify-center
          sm:w-[40px] sm:pt-[20px] 
          md:w-[80px] md:pr-[25px] md:pt-[22px]"
      >
        <PlanCardQuitButton planId={plan.id} onClickQuitBtn={onClickQuitBtn} />
      </div>
    </div>
  );
}
