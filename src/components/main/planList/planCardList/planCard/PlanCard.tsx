'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { calculateDday } from '@/utils/aboutDay';

import type { PlanStatus } from '@/types/aboutPlan';
import type { PlanType } from '@/types/supabase';

interface PlanCardProps {
  plan: PlanType;
}

export default function PlanCard(props: PlanCardProps) {
  const { plan } = props;
  const router = useRouter();

  const onClickPlanCard = (status: PlanStatus, id: string) => {
    if (status === 'planning') router.push(`/plan/${id}`);
    if (status === 'traveling') router.push(`/plan/${id}`);
    if (status === 'recording') router.push(`/addPhoto/${id}`);
    if (status === 'end') router.push(`/ending/${id}`);
  };

  return (
    <div
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
}
