'use client';

import React from 'react';

import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';

import { tabMenuStore } from '@/store/tabMenuStore';
import { tabMenuCallback } from '@/utils/arrayCallbackFunctionList';
import { cardListing } from '@/utils/planCardListing';

import PlanCard from './planCard/PlanCard';

import type { UsersDataList } from '@/types/aboutPlan';
import type { BookMarkType, PlanType } from '@/types/supabase';

interface Props {
  bookMarkDataList: BookMarkType[];
  planDataList: PlanType[];
  usersDataList: UsersDataList[];
}

export default function PlanCardList(props: Props) {
  const { bookMarkDataList, planDataList, usersDataList } = props;
  const { selectedMenu } = tabMenuStore();

  const bookMarkPlanIdList = bookMarkDataList.map(
    (bookMark) => bookMark.plan_id,
  );

  const tabMenuCallbackFuncList = tabMenuCallback(selectedMenu);
  const selectedPlanList = planDataList
    .filter(tabMenuCallbackFuncList.filtering(bookMarkPlanIdList))
    .sort(tabMenuCallbackFuncList.sorting(bookMarkDataList));

  const cardDataListWithPlanId = cardListing(bookMarkDataList, usersDataList);

  return selectedPlanList.length === 0 ? (
    <div>
      <div></div>
    </div>
  ) : (
    selectedPlanList.map((plan) => {
      const { bookMarkData, avatarList, nicknameList } = cardDataListWithPlanId(
        plan.id,
      );

      return (
        <PlanCard
          key={uuid()}
          plan={plan}
          bookMarkData={bookMarkData}
          avatarList={avatarList}
          nicknameList={nicknameList}
        />
      );
    })
  );
}
