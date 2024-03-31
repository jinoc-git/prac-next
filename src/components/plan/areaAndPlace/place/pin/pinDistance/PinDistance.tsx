'use client';

import React from 'react';

interface Props {
  distance: string | undefined;
}

const PinDistance = ({ distance }: Props) => {
  if (distance) {
    if (distance === '0.0') {
      return (
        <span className="absolute md:top-[-35px] left-[-13px] text-gray_dark_2 py-1 bg-white md:text-[16px] sm:text-[12px] sm:top-[-30px]">
          알 수 없음
        </span>
      );
    } else {
      return (
        <span className="absolute md:top-[-35px] left-[0px] text-gray_dark_2 py-1 bg-white md:text-[16px] sm:text-[12px] sm:top-[-30px]">
          {distance}km
        </span>
      );
    }
  }

  return null;
};

export default PinDistance;
