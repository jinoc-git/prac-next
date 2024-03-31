'use client';

import React from 'react';

interface Props {
  idx: number;
}

const PinOrder = ({ idx }: Props) => {
  return (
    <div className="flex items-center">
      <div
        className="absolute -z-10 border border-l-black 
        sm:h-[102px] sm:translate-x-[15px] 
        md:h-[147px] md:translate-x-[17.5px] md:translate-y-[0px]"
      />
      <p
        className="rounded-full bg-gradient-to-r from-[#5E9fff] from-0% to-[#1a68db] via-100%  text-center font-semibold text-white border-[5px] border-white
        sm:w-[30px] sm:h-[30px] sm:text-sm
        md:w-[35px] md:h-[35px] md:text-normal"
      >
        {idx + 1}
      </p>
    </div>
  );
};

export default PinOrder;
