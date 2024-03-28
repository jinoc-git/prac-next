'use client';

import React from 'react';

import Image from 'next/image';

const Area = () => {
  return (
    <div>
      <div
        className="flex items-center font-semibold text-gray_dark_1 gap-[8px]
        sm:text-sm
        md:text-normal md:my-[10px] "
      >
        <Image
          src={'/images/area-pin.svg'}
          width={20}
          height={20}
          alt="여행 지역 아이콘"
        />
        <p>여행 지역</p>
      </div>
    </div>
  );
};

export default Area;
