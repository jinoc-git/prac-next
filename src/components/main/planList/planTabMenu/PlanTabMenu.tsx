'use client';

import React from 'react';

import PlanTabMenuItem from './PlanTabMenuItem';

import type { PlanCountList } from '@/types/aboutPlan.type';

interface Props {
  planCountList: PlanCountList;
}

export default function PlanTabMenu(props: Props) {
  const { planCountList } = props;

  return (
    <ul className="flex-box sm:gap-[10px] sm:w-[320px] md:w-[800px]">
      <PlanTabMenuItem name="bookMark" planCount={planCountList.bookMark} />
      <span className="text-white"> | </span>
      <PlanTabMenuItem name="traveling" planCount={planCountList.traveling} />
      <span className="text-white"> | </span>
      <PlanTabMenuItem name="planning" planCount={planCountList.planning} />
      <span className="text-white"> | </span>
      <PlanTabMenuItem name="end" planCount={planCountList.end} />
    </ul>
  );
}
