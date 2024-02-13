'use client';

import React from 'react';

import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';

import { tabMenuStore } from '@/store/tabMenuStore';
import { tabMenuCallback } from '@/utils/arrayCallbackFunctionList';

import type { UsersDataList } from '@/types/aboutPlan';
import type { BookMarkType, PlanType } from '@/types/supabase';

interface PlanCardListProps {
  bookMarkData: BookMarkType[];
  planDataList: PlanType[];
  usersDataList: UsersDataList[];
}

export default function PlanCardList(props: PlanCardListProps) {
  const { bookMarkData, planDataList, usersDataList } = props;
  const { selectedMenu } = tabMenuStore();

  const onClickPlanCard = () => {};

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
      return (
        <div
          key={uuid()}
          className="flex bg-white shadow-card rounded-[7px] cursor-pointer
        sm:w-[318px] sm:h-[80px] sm:mx-[1px]
        md:w-[800px] md:h-[150px] "
          onClick={() => {
            // onClickPlanCard(plan.plan_state, plan.id);
          }}
        >
          <div></div>
        </div>
      );
    })
  );
}
