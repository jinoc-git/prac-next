'use client';

import React from 'react';
import { toast } from 'react-toastify';

import { useRouter } from 'next/navigation';

import useBookMark from '@/hooks/useBookMark';
import useConfirm from '@/hooks/useConfirm';
import useQuitPlanMutation from '@/hooks/useQuitPlanMutation';
import { useTabMenuStoreState } from '@/store/tabMenuStore';
import { tabMenuCallback } from '@/utils/arrayCallbackFunctionList';
import { cardListing } from '@/utils/planCardListing';

import AddNewPlanGuide from './addNewPlanGuide/AddNewPlanGuide';
import PlanCard from './planCard/PlanCard';

import type { PlanIdAndMatesInfoList, PlanStatus } from '@/types/aboutPlan.type';
import type { BookMarkType, PlanType } from '@/types/supabase';

interface Props {
  userId: string | undefined;
  bookMarkDataList: BookMarkType[];
  planDataList: PlanType[];
  planIdAndMatesInfoList: PlanIdAndMatesInfoList[];
}

export default function PlanCardList(props: Props) {
  const { userId, bookMarkDataList, planDataList, planIdAndMatesInfoList } = props;

  const selectedMenu = useTabMenuStoreState();
  const handleBookMark = useBookMark();
  const quitPlanMutation = useQuitPlanMutation();
  const confirm = useConfirm();

  const router = useRouter();

  const bookMarkPlanIdList = bookMarkDataList.map((bookMark) => bookMark.plan_id);

  const tabMenuCallbackFuncList = tabMenuCallback(selectedMenu);
  const selectedPlanList = planDataList
    .filter(tabMenuCallbackFuncList.filtering(bookMarkPlanIdList))
    .sort(tabMenuCallbackFuncList.sorting(bookMarkDataList));

  const cardDataListWithPlanId = cardListing(bookMarkDataList, planIdAndMatesInfoList);

  const onClickPlanCard = (status: PlanStatus, id: string) => {
    if (status === 'planning') router.push(`/plan/${id}`);
    else if (status === 'traveling') router.push(`/plan/${id}`);
    else if (status === 'recording') router.push(`/addphoto/${id}`);
    else if (status === 'end') router.push(`/ending/${id}`);
  };

  const onClickQuitBtn = (planId: string) => {
    if (!userId) {
      toast.error('로그인이 필요합니다.');
      router.push('/signin');
      return;
    }

    const confTitle = '여행 나가기';
    const confDesc = '동행자가 없으면 여행은 삭제됩니다. 정말로 나가시겠습니까?';
    const confFunc = () => {
      quitPlanMutation({ userId, planId });
    };

    confirm.quit(confTitle, confDesc, confFunc);
  };

  return selectedPlanList.length === 0 ? (
    <AddNewPlanGuide select={selectedMenu} />
  ) : (
    selectedPlanList.map((plan) => {
      const { bookMarkData, avatarList, nicknameList } = cardDataListWithPlanId(plan.id);

      return (
        <PlanCard
          key={`main,${plan.id}`}
          plan={plan}
          bookMarkData={bookMarkData}
          avatarList={avatarList}
          nicknameList={nicknameList}
          onClickPlanCard={onClickPlanCard}
          onClickQuitBtn={onClickQuitBtn}
          handleBookMark={handleBookMark}
        />
      );
    })
  );
}
