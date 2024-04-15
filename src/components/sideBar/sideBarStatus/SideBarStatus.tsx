'use client';

import React from 'react';

import SideBarPlanInfo from './SideBarPlanInfo';
import SideBarStatusChip from './SideBarStatusChip';

import type { PlanType } from '@/types/supabase';

interface SideBarStatusProps {
  isOpen: boolean;
  activePlan: PlanType | undefined;
  nextPlan: PlanType | undefined;
}

export default function SideBarStatus(props: SideBarStatusProps) {
  const { isOpen, activePlan, nextPlan } = props;

  const hasNextPlan = Boolean(nextPlan);
  const hasActivePlan = activePlan !== undefined;

  const status = hasActivePlan
    ? '여행 중'
    : hasNextPlan
      ? '여행 예정'
      : '여행 없음';

  return (
    <div
      className="flex flex-col items-center border-slate-200
      sm:h-[234] sm:border-t-2 sm:py-[30px]
      md:h-[202px] md:border-y-2 md:py-[12px] "
    >
      <div
        className={`flex items-center justify-between mb-[15px] side-bar-transition ${
          isOpen ? 'sm:w-[309px] md:w-[221px] ' : ' md:w-[40px] md:flex-col '
        }`}
      >
        <span className="font-semibold text-xs text-gray_dark_1">STATUS</span>
        <SideBarStatusChip isOpen={isOpen} status={status} />
      </div>
      <SideBarPlanInfo
        activePlan={activePlan}
        nextPlan={nextPlan}
        isOpen={isOpen}
        status={status}
      />
    </div>
  );
}
