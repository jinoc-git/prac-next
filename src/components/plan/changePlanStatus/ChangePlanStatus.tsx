'use client';

import React, { useEffect, useState } from 'react';

import ChangeStatusButton from '@/components/common/button/ChangeStatusButton';
import { useDateStoreState } from '@/store/dateStore';
import { useModifyPlanStoreState } from '@/store/modifyPlanStore';

import type { PlanStatus } from '@/types/aboutPlan.type';

interface Props {
  status: PlanStatus;
}

const ChangePlanStatus = ({ status }: Props) => {
  const { dates } = useDateStoreState();
  const { modifyState } = useModifyPlanStoreState();

  const [isPossibleStart, setIsPossibleStart] = useState<boolean>(false);
  const [isPossibleEnd, setIsPossibleEnd] = useState<boolean>(false);

  const handleChangePlanStatus = () => {};

  useEffect(() => {
    if (dates[0]) {
      const today = new Date();
      const startDate = new Date(dates[0]);
      const endDate = new Date(dates[dates.length - 1]);

      if (today >= startDate) setIsPossibleStart(true);
      else setIsPossibleStart(false);

      if (today >= endDate) setIsPossibleEnd(true);
      else setIsPossibleEnd(false);
    }
  }, [dates]);

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
        disabled={!isPossibleStart || modifyState === 'modify'}
        onClick={handleChangePlanStatus}
      />
    </div>
  );
};

export default ChangePlanStatus;
