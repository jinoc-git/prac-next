'use client';

import React from 'react';

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

  const bookMarkPlanIdList = bookMarkData.map((bookMark) => bookMark.plan_id);

  const tabMenuCallbackFuncList = tabMenuCallback(selectedMenu);
  const selectedPlanList = planDataList
    .filter(tabMenuCallbackFuncList.filtering(bookMarkPlanIdList))
    .sort(tabMenuCallbackFuncList.sorting(bookMarkData));

  return (
    <div>
      <div></div>
    </div>
  );
}
