'use client';

import React from 'react';

import { useQuery } from '@tanstack/react-query';

import { getPlanListAndMateList } from '@/api/plan';
import { authStore } from '@/store/authStore';
import { sideBarStore } from '@/store/sideBarStore';
import { sideBarCallback } from '@/utils/arrayCallbackFunctionList';

import SideBarIcon from './SideBarIcon';
import SideBarLogo from './SideBarLogo';
import SideBarStatus from './sideBarStatus/SideBarStatus';
import SideBarTrips from './sideBarTrips/SideBarTrips';

export default function SideBar() {
  const { isVisibleSideBar, isSideBarOpen } = sideBarStore();
  const user = authStore((state) => state.user);

  const { data: matesData, isError: matesError } = useQuery({
    queryKey: ['plan_mates', user?.id],
    queryFn: async () => {
      return await getPlanListAndMateList(user ? user.id : '');
    },
    enabled: user !== null,
    staleTime: 20 * 1000,
  });

  const sortedPlanData = matesData?.planDataList?.sort(sideBarCallback.sorting);
  const activePlan = sortedPlanData?.find(
    sideBarCallback.filtering('traveling'),
  );
  const startPlans = sortedPlanData?.filter(
    sideBarCallback.filtering('planning'),
  );
  const endPlans = sortedPlanData?.filter(sideBarCallback.filtering('end'));

  const nextPlan = startPlans ? startPlans[0] : undefined;

  return isVisibleSideBar ? (
    <>
      <SideBarIcon />
      <aside
        className={` touch-none fixed h-[100vh] border-r border-slate-300 rounded-r-[12px] z-[31] overflow-hidden bg-white side-bar-transition  ${
          isSideBarOpen
            ? 'sm:w-[357px] sm:px-[24px] md:w-[270px] md:px-[24px] '
            : 'sm:w-[0px] sm:px-[0px] md:w-[88px] md:px-[24px]'
        }`}
      >
        <SideBarLogo />
        <div className="flex flex-col md:gap-[20px] sm:gap-[10px]">
          <SideBarStatus
            isOpen={isSideBarOpen}
            activePlan={activePlan}
            nextPlan={nextPlan}
          />
          <SideBarTrips
            isOpen={isSideBarOpen}
            startPlans={startPlans}
            endPlans={endPlans}
          />
        </div>
        <div></div>
      </aside>
    </>
  ) : null;
}
