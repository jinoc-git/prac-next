'use client';

import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { getBookMarkDataByUserId } from '@/api/bookMark';
import { getPlanListAndMateList } from '@/api/plan';
import { authStore } from '@/store/authStore';

import AddPlanBtn from './AddPlanBtn';
import PlanCardList from './PlanCardList';
import PlanTabMenu from './planTabMenu/PlanTabMenu';

export default function PlanList() {
  const router = useRouter();
  const user = authStore((state) => state.user);

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

  return (
    <section
      className="flex flex-col mx-auto my-0
        sm:w-[320px] 
        md:w-[800px] "
    >
      <AddPlanBtn />
      <div className="flex flex-col gap-[16px]">
        <PlanTabMenu />
        <PlanCardList />
      </div>
    </section>
  );
}
