'use client';

import React from 'react';

import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
import { useRouter } from 'next/navigation';

import { tabMenuStore } from '@/store/tabMenuStore';
import { calculateDday, formatPlanDates } from '@/utils/aboutDay';
import { tabMenuCallback } from '@/utils/arrayCallbackFunctionList';
import { cardListing } from '@/utils/planCardListing';

import type { PlanStatus, UsersDataList } from '@/types/aboutPlan';
import type { BookMarkType, PlanType } from '@/types/supabase';

interface PlanCardListProps {
  bookMarkDataList: BookMarkType[];
  planDataList: PlanType[];
  usersDataList: UsersDataList[];
}

export default function PlanCardList(props: PlanCardListProps) {
  const { bookMarkDataList, planDataList, usersDataList } = props;
  const router = useRouter();
  const { selectedMenu } = tabMenuStore();

  const onClickPlanCard = (status: PlanStatus, id: string) => {
    if (status === 'planning') router.push(`/plan/${id}`);
    if (status === 'traveling') router.push(`/plan/${id}`);
    if (status === 'recording') router.push(`/addPhoto/${id}`);
    if (status === 'end') router.push(`/ending/${id}`);
  };

  const bookMarkPlanIdList = bookMarkDataList.map(
    (bookMark) => bookMark.plan_id,
  );

  const tabMenuCallbackFuncList = tabMenuCallback(selectedMenu);
  const selectedPlanList = planDataList
    .filter(tabMenuCallbackFuncList.filtering(bookMarkPlanIdList))
    .sort(tabMenuCallbackFuncList.sorting(bookMarkDataList));

  const cardListWithPlanId = cardListing(bookMarkDataList, usersDataList);

  return selectedPlanList.length === 0 ? (
    <div>
      <div></div>
    </div>
  ) : (
    selectedPlanList.map((plan) => {
      const { startDate, endDate } = formatPlanDates(plan);

      const { bookMarkData, avatarList, nicknameList } = cardListWithPlanId(
        plan.id,
      );

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
          <div
            className="sm:w-[45px] sm:mt-[23px] 
              md:w-[80px] md:h-[16px] md:mt-[25px] md:ml-[28px]"
          >
            {/* 북마크 추가 예정 */}
            <div className="mt-[0px] h-[12px]">
              {plan.plan_state === 'end' ? null : (
                <p
                  className="text-yellow text-center font-bold
                        sm:text-[10px] 
                      md:text-[18px] md:mt-[11px]"
                >
                  {calculateDday(new Date(plan.dates[0]))}
                </p>
              )}
            </div>
          </div>
        </div>
      );
    })
  );
}
