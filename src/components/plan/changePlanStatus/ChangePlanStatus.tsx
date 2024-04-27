'use client';

import React from 'react';

import ChangeStatusButton from '@/components/common/button/ChangeStatusButton';
import useChangePlanStatus from '@/hooks/useChangePlanStatus';

import type { PlanStatus } from '@/types/aboutPlan.type';

interface Props {
  status: PlanStatus;
  planId: string;
}

const ChangePlanStatus = ({ status, planId }: Props) => {
  const { leftText, disabled, handleChangePlanStatus } = useChangePlanStatus({
    status,
    planId,
  });

  return (
    <div
      className="flex mb-[60px]
      md:justify-end md:mt-[100px]  md:mr-[30px]
      sm:justify-start sm:mt-[82px] sm:ml-[4px]
    "
    >
      <ChangeStatusButton
        value={status === 'planning' ? '여행시작' : '여행 완료'}
        type="button"
        name={'여행 상태 변경 버튼'}
        disabled={disabled}
        leftText={leftText}
        onClick={handleChangePlanStatus}
      />
    </div>
  );
};

export default ChangePlanStatus;
