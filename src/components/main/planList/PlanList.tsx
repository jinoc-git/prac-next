'use client';

import React, { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { getBookMarkDataByUserId } from '@/api/bookMark';
import { getPlanListAndMateList } from '@/api/plan';
import { authStore } from '@/store/authStore';
import { tabMenu } from '@/utils/arrayCallbackFunctionList';

import AddPlanBtn from './AddPlanBtn';
import PlanCardList from './planCardList/PlanCardList';
import PlanTabMenu from './planTabMenu/PlanTabMenu';

import type { PlanCountList } from '@/types/aboutPlan';

export default function PlanList() {
  const router = useRouter();
  const user = authStore((state) => state.user);

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
    data: bookMarkData,
    isLoading: bookMarkLoading,
    isError: bookMarkError,
  } = useQuery({
    queryKey: ['book_mark', user?.id],
    queryFn: async () => await getBookMarkDataByUserId(user?.id),
    enabled: user !== null,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (bookMarkData && matesData) {
      setPlanCountList({
        bookMark: bookMarkData.length,
        planning: planDataList.filter(tabMenu.counting('planning')).length,
        traveling: planDataList.filter(tabMenu.counting('traveling')).length,
        end: planDataList.filter(tabMenu.counting('end')).length,
      });
    }
  }, [matesData, bookMarkData]);

  if (matesData == null || bookMarkData == null) {
    return <div>데이터 없음</div>;
  }

  const { planDataList, usersDataList } = matesData;

  return (
    <section
      className="flex flex-col mx-auto my-0
        sm:w-[320px] 
        md:w-[800px] "
    >
      <AddPlanBtn />
      <div className="flex flex-col gap-[16px]">
        <PlanTabMenu planCountList={planCountList} />
        <PlanCardList />
      </div>
    </section>
  );
}
