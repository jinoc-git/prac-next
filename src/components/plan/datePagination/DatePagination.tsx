'use client';

import React from 'react';

import Image from 'next/image';

interface Props {
  dates: string[];
  next: () => void;
  prev: () => void;
  currentPage: number;
}

const DatePagination = (props: Props) => {
  const { dates, next, prev, currentPage } = props;

  return (
    <div
      className="flex-box mb-[10px] text-sm font-semibold text-gray_dark_1
      sm:w-[310px] sm:mt-[36px] sm:mb-[31px]
      md:w-[700px] md:mt-[24px] md:gap-[190px]"
    >
      {dates.length !== 0 ? (
        <div className="sm:flex sm:justify-center sm:w-[310px] sm:gap-[14px]">
          <button
            onClick={prev}
            aria-label="date-prev-btn"
            type="button"
            disabled={currentPage === 0}
            className="cursor-pointer disabled:cursor-default disabled:opacity-0"
            name="date-page-previous-page-btn"
          >
            <Image
              src={'/images/svgs/leftArrow.svg'}
              width={14}
              height={22}
              alt="왼쪽 화살표"
            />
          </button>
          <h3>{dates[currentPage]}</h3>
          <button
            onClick={next}
            aria-label="date-next-btn"
            type="button"
            disabled={currentPage === dates.length - 1}
            className="cursor-pointer disabled:cursor-default disabled:opacity-0"
            name="date-page-next-page-btn"
          >
            <Image
              src={'/images/svgs/rightArrow.svg'}
              width={14}
              height={22}
              alt="오른쪽 화살표"
            />
          </button>
        </div>
      ) : (
        <div>날짜를 선택하세요</div>
      )}
    </div>
  );
};

export default DatePagination;
