'use client';

import React from 'react';

import PlanTabMenuItem from './PlanTabMenuItem';

import type { UsersDataList } from '@/types/aboutPlan';
import type { BookMarkType, PlanType } from '@/types/supabase';

interface PlanTabMenuProps {
  bookMarkData: BookMarkType[];
  planDataList: PlanType[] | undefined;
  usersDataList: UsersDataList[];
}

export default function PlanTabMenu(props: PlanTabMenuProps) {
  const { bookMarkData, planDataList, usersDataList } = props;

  return (
    <ul className="flex-box sm:gap-[10px] sm:w-[320px] md:w-[800px]">
      <PlanTabMenuItem name="bookMark" planCount={1} />
      <span className="text-white"> | </span>
      <PlanTabMenuItem name="traveling" planCount={1} />
      <span className="text-white"> | </span>
      <PlanTabMenuItem name="planning" planCount={1} />
      <span className="text-white"> | </span>
      <PlanTabMenuItem name="end" planCount={1} />
    </ul>
  );
}
