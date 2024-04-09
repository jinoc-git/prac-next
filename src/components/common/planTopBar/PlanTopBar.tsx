'use client';

import React from 'react';
import type { SubmitHandler, UseFormHandleSubmit } from 'react-hook-form';

import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
import Image from 'next/image';

import { authStore } from '@/store/authStore';
import { dateStore } from '@/store/dateStore';
import { modifyPlanStore } from '@/store/modifyPlanStore';
import { sideBarStore } from '@/store/sideBarStore';

import type { AddPlanContentsInputType } from '@/components/plan/addPlan/AddPlanContents';
import type { InsertPlanType } from '@/types/supabase';

interface Props {
  handleSubmit: UseFormHandleSubmit<AddPlanContentsInputType, undefined>;
}

export default function PlanTopBar(props: Props) {
  const { handleSubmit } = props;
  const { modifyState } = modifyPlanStore();
  const isSideBarOpen = sideBarStore((state) => state.isSideBarOpen);
  const user = authStore(({ user }) => user);
  const dates = dateStore(({ dates }) => dates);

  const onSubmitAddPlan: SubmitHandler<AddPlanContentsInputType> = async ({
    title,
    totalCost,
  }) => {
    if (user === null) return;
    if (dates.length === 0) return;

    const newPlan: InsertPlanType = {
      id: uuid(),
      users_id: user.id,
      dates,
      title,
      total_cost: totalCost,
      isDeleted: false,
      plan_state: 'planning',
    };

    console.log(newPlan);
  };

  return (
    <div
      className={`flex justify-between items-center w-full border-b-[1px] border-navy py-[11.5px] bg-white z-30
      sm:fixed sm:top-[80px] side-bar-transition
      md:static md:pt-[86px] ${
        isSideBarOpen ? 'md:pl-[270px]' : 'md:pl-[88px]'
      }`}
    >
      <div
        className="text-navy_dark font-semibold
      sm:text-sm sm:ml-[25px]
      md:text-normal md:ml-[80px]"
      >
        여행 계획 시작
      </div>
      <div
        className="flex items-center font-semibold ml-[25px]
      sm:text-sm
      md:text-normal"
      >
        <button
          name="nav-multifunctional-btn"
          className="text-navy_dark flex items-center gap-2
          sm:mr-[25px] 
          md:mr-[80px] "
          type="button"
          onClick={handleSubmit(onSubmitAddPlan)}
        >
          <Image
            alt="edit-icon"
            src={'/images/edit-blue.svg'}
            width={16}
            height={16}
          />
          {modifyState === 'modify' ? `저장하기` : `수정하기`}
        </button>
      </div>
    </div>
  );
}
