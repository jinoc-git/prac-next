'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import AddPlanBtn from './AddPlanBtn';
import PlanTabMenu from './planTabMenu/PlanTabMenu';

export default function PlanList() {
  const router = useRouter();

  return (
    <section
      className="flex flex-col mx-auto my-0
        sm:w-[320px] 
        md:w-[800px] "
    >
      <AddPlanBtn />
      <div className="flex flex-col gap-[16px]">
        <PlanTabMenu />
      </div>
    </section>
  );
}
