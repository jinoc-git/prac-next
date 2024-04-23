import React from 'react';

import Image from 'next/image';

import { formatMonthDay } from '@/utils/aboutDay';

interface Props {
  dates: string[];
}

const EndPlanDate = ({ dates }: Props) => {
  const startDate = formatMonthDay(dates[0]);
  const endDate = formatMonthDay(dates[dates.length - 1]);

  const nights = dates.length - 1;
  const days = dates.length;

  return (
    <div
      className="inner-content-layout 
      md:justify-normal 
      sm:justify-between sm:items-start"
    >
      <div className="flex gap-2 md:w-[136px]">
        <Image
          alt="캘린더 아이콘"
          src={'/images/svgs/calendarIcon.svg'}
          width={20}
          height={20}
          className="md:w-[20px] md:h-[20px] sm:w-[18px] sm:h-[18px]"
        />
        <p
          className="font-SemiBold text-gray_dark_1
          sm:text-sm
          md:text-normal"
        >
          여행 일정
        </p>
      </div>
      <p
        className="font-semibold text-gray_dark_1
        md:text-left md:text-normal
        sm:text-right sm:text-xs"
      >
        <span className="md:hidden">시작일: </span>
        {startDate}
        <br className="md:hidden" />
        <span className="sm:hidden md:inline-block">&nbsp;-&nbsp;</span>
        <span className="md:hidden">종료일: </span>
        {endDate}
        <br className="md:hidden" />
        <span>
          &nbsp; {nights}박 {days}일
        </span>
      </p>
    </div>
  );
};

export default EndPlanDate;
