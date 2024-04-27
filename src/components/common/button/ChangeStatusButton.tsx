'use client';

import React from 'react';

import type { ButtonCompProps } from '@/types/buttonComp.type';

interface Props extends ButtonCompProps {}

const ChangeStatusButton = (props: Props) => {
  const { value, type, ariaLable, name, disabled, onClick } = props;

  return (
    <div
      className="flex items-center gap-5 
      sm:w-[286px]  sm:h-[41px] sm:justify-normal
      md:w-[300px] md:h-[43px] md:justify-end"
    >
      <p
        className="text-gray_dark_1 font-Regular 
              sm:w-[200px] sm:text-sm
              md:w-[200px] md:text-noraml"
      >
        {/* {isPossibleStart
          ? isModifying
            ? '상단의 저장 버튼을 눌러주세요.'
            : '여행을 떠날 준비가 되셨나요?'
          : '아직 시작일이 되지 않았습니다!'} */}
      </p>
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className="flex-center p-3 border rounded-lg font-semibold border-blue text-blue hover:bg-blue_light_1 duration-200 disabled:border-gray_dark_1 disabled:cursor-default disabled:bg-gray_light_3 disabled:text-gray_dark_1
                sm:w-[114px] sm:h-[41px] sm:text-sm
                md:w-[130px] md:h-[43px] md:text-normal"
      >
        {value}
      </button>
    </div>
  );
};

export default ChangeStatusButton;
