'use client';

import React from 'react';
import { toast } from 'react-toastify';

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

  const [planCountList, setPlanCountList] = React.useState<PlanCountList>({
    bookMark: 0,
    planning: 0,
    traveling: 0,
    end: 0,
  });

  const {
    data: matesData,
    isPending: matesLoading,
    isError: matesError,
  } = useQuery({
    queryKey: ['plan_mates', user?.id],
    queryFn: async () => await getPlanListAndMateList(user?.id),
    enabled: user !== null,
  });

  const {
    data: bookMarkDataList,
    isPending: bookMarkLoading,
    isError: bookMarkError,
  } = useQuery({
    queryKey: ['book_mark', user?.id],
    queryFn: async () => await getBookMarkDataByUserId(user?.id),
    enabled: user !== null,
    refetchOnWindowFocus: false,
  });

  React.useEffect(() => {
    if (bookMarkDataList && matesData) {
      const { planDataList } = matesData;
      setPlanCountList({
        bookMark: bookMarkDataList.length,
        planning: planDataList.filter(tabMenuCallback('planning').counting).length,
        traveling: planDataList.filter(tabMenuCallback('traveling').counting).length,
        end: planDataList.filter(tabMenuCallback('end').counting).length,
      });
    }
  }, [matesData, bookMarkDataList]);

  if (matesLoading || bookMarkLoading) {
    return <Loading full={true} />;
  }

  if (matesError || bookMarkError) {
    toast.error('데이터를 불러오기에 실패했습니다. 다시 시도해주세요.');
  }

  return (
    <section
      className="flex flex-col mx-auto my-0
        sm:w-[300px] 
        md:w-[800px] "
    >
      <AddPlanBtn />
      <div className="flex flex-col gap-[16px]">
        <PlanTabMenu planCountList={planCountList} />
        {matesData && bookMarkDataList ? (
          <PlanCardList
            userId={user?.id}
            bookMarkDataList={bookMarkDataList}
            planDataList={matesData.planDataList}
            planIdAndMatesInfoList={matesData.planIdAndMatesInfoList}
          />
        ) : (
          <div className="flex-box sm:mt-[100px] md:mt-[125px]">
            <p>오류가 발생했습니다. 잠시후 다시 시도해주세요.</p>
          </div>
        )}
      </div>
    </section>
  );
}
