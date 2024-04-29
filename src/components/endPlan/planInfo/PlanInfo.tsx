import React from 'react';

import type { PlanType } from '@/types/supabase';

interface Props {
  plan: PlanType;
}

const PlanInfo = ({ plan }: Props) => {
  return (
    <section className="pt-[140px] content-layout">
      <div
        className="flex items-center justify-between
          sm:mb-[35px]
          md:mb-[18px]"
      >
        <h3
          className="font-bold text-gray_dark_1
            sm:text-[20px]
            md:text-[24px]"
        >
          {plan.title}
        </h3>
        <div className="w-[65px] h-[20px] text-[9px] flex-box font-normal text-white bg-orange rounded-3xl ">
          완료된 여행
        </div>
      </div>
    </section>
  );
};

export default PlanInfo;
