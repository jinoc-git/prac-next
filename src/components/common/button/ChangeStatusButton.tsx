'use client';

import React from 'react';

import type { ButtonCompProps } from '@/types/buttonComp.type';

interface Props extends ButtonCompProps {
  leftText: string;
}

const ChangeStatusButton = (props: Props) => {
  const { value, type, ariaLable, name, leftText, disabled, onClick } = props;

  return (
    <div
      className="flex items-center justify-between
      sm:w-[286px]  sm:h-[41px] 
      md:w-[300px] md:h-[43px]"
    >
      <p
        className="text-gray_dark_1 font-Regular 
        sm:text-sm
        md:text-noraml"
      >
        {leftText}
      </p>
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className="flex-box p-3 border rounded-lg font-semibold border-blue text-blue hover:bg-blue_light_1 duration-200 disabled:border-gray_dark_1 disabled:cursor-default disabled:bg-gray_light_3 disabled:text-gray_dark_1
                sm:w-[114px] sm:h-[41px] sm:text-sm
                md:w-[130px] md:h-[43px] md:text-normal"
      >
        {value}
      </button>
    </div>
  );
};

export default ChangeStatusButton;
