'use client';

import React from 'react';

import type { PlanStatus } from '@/types/aboutPlan.type';

interface Props {
  status: PlanStatus;
}

const ChangePlanStatus = ({ status }: Props) => {
  const handleChangePlanStatus = () => {};

  return (
    <div
      className="flex mb-[60px]
      md:justify-end md:mt-[100px]  md:mr-[30px]
      sm:justify-start sm:mt-[82px] sm:ml-[4px]
    "
    >
      <div>ChangePlanStatus</div>
    </div>
  );
};

export default ChangePlanStatus;
