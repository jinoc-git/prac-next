'use client';

import React, { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { getBookMarkDataByUserId } from '@/api/bookMark';
import { getPlanListAndMateList } from '@/api/plan';
import Loading from '@/components/common/loading/Loading';
import { useAuthStoreState } from '@/store/authStore';
import { tabMenuCallback } from '@/utils/arrayCallbackFunctionList';

import AddPlanBtn from './addPlanBtn/AddPlanBtn';
import PlanCardList from './planCardList/PlanCardList';
import PlanTabMenu from './planTabMenu/PlanTabMenu';

import type { PlanCountList } from '@/types/aboutPlan.type';

export default function PlanList() {
  const user = useAuthStoreState();

  const [planCountList, setPlanCountList] = useState<PlanCountList>({
    bookMark: 0,
    planning: 0,
    traveling: 0,
    end: 0,
  });

  const {
    data: matesData,
    isLoading: matesLoading,
    isError: matesError,
  } = useQuery({
    queryKey: ['plan_mates', user?.id],
    queryFn: async () => await getPlanListAndMateList(user?.id),
    enabled: user !== null,
  });

  const {
    data: bookMarkDataList,
    isLoading: bookMarkLoading,
    isError: bookMarkError,
  } = useQuery({
    queryKey: ['book_mark', user?.id],
    queryFn: async () => await getBookMarkDataByUserId(user?.id),
    enabled: user !== null,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (bookMarkDataList && matesData) {
      setPlanCountList({
        bookMark: bookMarkDataList.length,
        planning: planDataList.filter(tabMenuCallback('planning').counting).length,
        traveling: planDataList.filter(tabMenuCallback('traveling').counting).length,
        end: planDataList.filter(tabMenuCallback('end').counting).length,
      });
    }
  }, [matesData, bookMarkDataList]);

  if (matesLoading || bookMarkLoading || !matesData || !bookMarkDataList) {
    return <Loading full={true} />;
  }

  const { planDataList, planIdAndMatesInfoList } = matesData;

  return (
    <section
      className="flex flex-col mx-auto my-0
        sm:w-[320px] 
        md:w-[800px] "
    >
      <AddPlanBtn />
      <div className="flex flex-col gap-[16px]">
        <PlanTabMenu planCountList={planCountList} />
        <PlanCardList
          bookMarkDataList={bookMarkDataList}
          planDataList={planDataList}
          planIdAndMatesInfoList={planIdAndMatesInfoList}
        />
      </div>
    </section>
  );
}
