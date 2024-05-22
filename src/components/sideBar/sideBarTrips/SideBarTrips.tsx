'use client';

import React, { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { getPlansWithBookmarks } from '@/api/plan';
import { useAuthStoreState } from '@/store/authStore';

import SideBarPlanList from './sideBarPlanList/SideBarPlanList';

import type { PlanType } from '@/types/supabase';

interface Props {
  isOpen: boolean;
  startPlans: PlanType[] | undefined;
  endPlans: PlanType[] | undefined;
}

export default function SideBarTrips(props: Props) {
  const { isOpen, startPlans, endPlans } = props;

  const [bookMarkIsOpen, setBookMarkIsOpen] = useState(false);
  const [planningIsOpen, setPlanningIsOpen] = useState(false);
  const [endIsOpen, setEndIsOpen] = useState(false);

  const user = useAuthStoreState();

  const { data: bookMarkPlanData } = useQuery<PlanType[] | []>({
    queryKey: ['book_mark', 'plans', user?.id],
    queryFn: async () => await getPlansWithBookmarks(user === null ? '' : user.id),
    enabled: user !== null,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!isOpen) {
      setBookMarkIsOpen(false);
      setPlanningIsOpen(false);
      setEndIsOpen(false);
    }
  }, [isOpen]);

  return (
    <div className="flex flex-col gap-2 md:min-h-[382px] sm:min-h-[338px]">
      <p
        className={`font-semibold text-xs text-gray_dark_1 ${
          isOpen ? 'md:pl-[4px]' : ' text-center'
        }`}
      >
        TRIPS
      </p>
      <SideBarPlanList
        setFunc={setBookMarkIsOpen}
        isSideBarOpen={isOpen}
        activeDropDown={bookMarkIsOpen}
        filter="bookMark"
        planList={bookMarkPlanData ?? []}
      />
      <SideBarPlanList
        setFunc={setPlanningIsOpen}
        isSideBarOpen={isOpen}
        activeDropDown={planningIsOpen}
        filter="planning"
        planList={startPlans ?? []}
      />
      <SideBarPlanList
        setFunc={setEndIsOpen}
        isSideBarOpen={isOpen}
        activeDropDown={endIsOpen}
        filter="end"
        planList={endPlans ?? []}
      />
    </div>
  );
}
