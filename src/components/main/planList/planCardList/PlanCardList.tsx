'use client';

import React from 'react';

import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
import { useRouter } from 'next/navigation';

import { useTabMenuStoreState } from '@/store/tabMenuStore';
import { tabMenuCallback } from '@/utils/arrayCallbackFunctionList';
import { cardListing } from '@/utils/planCardListing';

import AddNewPlanGuide from './addNewPlanGuide/AddNewPlanGuide';
import PlanCard from './planCard/PlanCard';

import type {
  PlanIdAndMatesInfoList,
  PlanStatus,
} from '@/types/aboutPlan.type';
import type { BookMarkType, PlanType } from '@/types/supabase';

interface Props {
  bookMarkDataList: BookMarkType[];
  planDataList: PlanType[];
  planIdAndMatesInfoList: PlanIdAndMatesInfoList[];
}

export default function PlanCardList(props: Props) {
  const { bookMarkDataList, planDataList, planIdAndMatesInfoList } = props;

  const selectedMenu = useTabMenuStoreState();

  const router = useRouter();

  const bookMarkPlanIdList = bookMarkDataList.map(
    (bookMark) => bookMark.plan_id,
  );

  const tabMenuCallbackFuncList = tabMenuCallback(selectedMenu);
  const selectedPlanList = planDataList
    .filter(tabMenuCallbackFuncList.filtering(bookMarkPlanIdList))
    .sort(tabMenuCallbackFuncList.sorting(bookMarkDataList));

  const cardDataListWithPlanId = cardListing(
    bookMarkDataList,
    planIdAndMatesInfoList,
  );

  const onClickPlanCard = (status: PlanStatus, id: string) => {
    if (status === 'planning') router.push(`/plan/${id}`);
    if (status === 'traveling') router.push(`/plan/${id}`);
    if (status === 'recording') router.push(`/addPhoto/${id}`);
    if (status === 'end') router.push(`/ending/${id}`);
  };

  return selectedPlanList.length === 0 ? (
    <AddNewPlanGuide select={selectedMenu} />
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
          onClickPlanCard={onClickPlanCard}
        />
      );
    })
  );
}
