import React from 'react';

import { formatPlanDates } from '@/utils/aboutDay';

interface Props {
  dates: string[];
}

export default function PlanCardDate({ dates }: Props) {
  const { startDate, endDate } = formatPlanDates(dates);

  return (
    <div
      className="text-gray_dark_1 font-semibold
        sm:text-[10px] sm:mt-[5px] 
        md:text-lg md:mt-[8px]"
    >
      {startDate}~{endDate} {dates.length - 1}박 {dates.length}일
    </div>
  );
}
