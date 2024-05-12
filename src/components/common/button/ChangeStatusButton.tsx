'use client';

import React from 'react';

import Image from 'next/image';

import type { ButtonCompProps } from '@/types/buttonComp.type';

interface Props extends ButtonCompProps {
  leftText: string;
  isLoading?: boolean;
}

const ChangeStatusButton = (props: Props) => {
  const { value, type, name, leftText, disabled, onClick, isLoading } = props;

  return (
    <div
      className="flex items-center justify-between
      sm:w-[286px] sm:h-[41px] 
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
        name={name}
        disabled={disabled || isLoading}
        onClick={onClick}
        className="flex-box p-3 border rounded-lg font-semibold border-blue text-blue hover:bg-blue_light_1 duration-200 disabled:border-gray_dark_1 disabled:cursor-default disabled:bg-gray_light_3 disabled:text-gray_dark_1
          sm:w-[114px] sm:h-[41px] sm:text-sm
          md:w-[130px] md:h-[43px] md:text-normal"
      >
        {value}
        {isLoading && (
          <Image src="/images/gif/loader-all-color.gif" alt="로딩 스피너" width={24} height={24} />
        )}
      </button>
    </div>
  );
};

export default ChangeStatusButton;
