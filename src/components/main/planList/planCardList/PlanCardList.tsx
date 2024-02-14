'use client';

import React from 'react';

import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
import { useRouter } from 'next/navigation';

import { tabMenuStore } from '@/store/tabMenuStore';
import { formatPlanDates } from '@/utils/aboutDay';
import { tabMenuCallback } from '@/utils/arrayCallbackFunctionList';

import type { PlanStatus, UsersDataList } from '@/types/aboutPlan';
import type { BookMarkType, PlanType } from '@/types/supabase';

interface PlanCardListProps {
  bookMarkData: BookMarkType[];
  planDataList: PlanType[];
  usersDataList: UsersDataList[];
}

export default function PlanCardList(props: PlanCardListProps) {
  const { bookMarkData, planDataList, usersDataList } = props;
  const router = useRouter();
  const { selectedMenu } = tabMenuStore();

  const onClickPlanCard = (status: PlanStatus, id: string) => {
    if (status === 'planning') router.push(`/plan/${id}`);
    if (status === 'traveling') router.push(`/plan/${id}`);
    if (status === 'recording') router.push(`/addPhoto/${id}`);
    if (status === 'end') router.push(`/ending/${id}`);
  };

  const bookMarkPlanIdList = bookMarkData.map((bookMark) => bookMark.plan_id);

  const tabMenuCallbackFuncList = tabMenuCallback(selectedMenu);
  const selectedPlanList = planDataList
    .filter(tabMenuCallbackFuncList.filtering(bookMarkPlanIdList))
    .sort(tabMenuCallbackFuncList.sorting(bookMarkData));

  return selectedPlanList.length === 0 ? (
    <div>
      <div></div>
    </div>
  ) : (
    selectedPlanList.map((plan) => {
      const { startDate, endDate } = formatPlanDates(plan);
      return (
        <div
          key={uuid()}
          className="flex bg-white shadow-card rounded-[7px] cursor-pointer
            sm:w-[318px] sm:h-[80px] sm:mx-[1px]
            md:w-[800px] md:h-[150px] "
          onClick={() => {
            onClickPlanCard(plan.plan_state, plan.id);
          }}
        >
          <div></div>
        </div>
      );
    })
  );
}
