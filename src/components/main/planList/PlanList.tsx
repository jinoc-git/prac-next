'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import AddPlanBtn from './AddPlanBtn';

export default function PlanList() {
  const router = useRouter();
  return (
    <section
      className="flex mx-auto my-0
        sm:w-[320px] 
        md:w-[800px] "
    >
      <AddPlanBtn />
    </section>
  );
}
