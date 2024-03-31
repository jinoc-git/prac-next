'use client';

import React from 'react';

import type { PinContentsType } from '@/types/supabase';

interface Props {
  pin: PinContentsType;
  isEnding: boolean;
  dragArea?: React.ReactNode;
}

const PinContents = (props: Props) => {
  const { pin, isEnding, dragArea } = props;

  return (
    <div
      className="relative flex items-center justify-between border rounded-lg border-gray_dark_1 
        sm:w-[239px] sm:h-[80px] sm:mb-0 sm:mr-[2px] sm:px-0 sm:py-[17px] 
        md:w-[600px] md:h-[120px] md:mb-[10px] md:px-[15px] md:py-[8px]"
    >
      <div className="w-[20px] md:hidden"></div>
      {!isEnding && dragArea}
      <div
        className={`flex flex-col text-left  text-gray_dark_1 w-[400px] gap-y-[2px]
          sm:text-[11px]
          md:text-normal
        ${isEnding ? 'ml-[15px]' : ''}
        `}
      >
        {pin !== null && typeof pin === 'object' && 'placeName' in pin && (
          <span className="font-bold">{pin.placeName}</span>
        )}
        {pin !== null && typeof pin === 'object' && 'address' in pin && (
          <span>{pin.address}</span>
        )}
        {pin !== null && typeof pin === 'object' && 'cost' in pin && (
          <span>
            {pin.cost !== null && pin.cost !== undefined
              ? pin.cost + ' 원'
              : ''}
          </span>
        )}
      </div>
      {/* {!isEnding && updatePin && deletePin && (
          <DropDown>
            <ul
              className="absolute border border-gray_dark_1  bg-white z-10 overflow-hidden
              md:left-[40px] md:bottom-[-50px] md:text-[16px] md:w-[100px] md:rounded-md
              sm:left-[-22px] sm:bottom-[-28px] sm:text-[10px] sm:h-[80px] sm:w-[45px] sm:rounded-l-none sm:rounded-r-md
            "
            >
              <li
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
                onClick={() => {
                  updatePin(idx);
                }}
                className="flex-center border-b border-gray_dark_1 cursor-pointer hover:bg-gray_light_3
                md:w-[100px] md:h-[40px]
                sm:w-[45px] sm:h-[40px]
                "
              >
                <div className="flex items-center">
                  <IconEditSolid w="w-[10px]" h="h-[10px]" fill="#6E6F76" />
                  <span className="ml-[3px] md:ml-[20px]">수정</span>
                </div>
              </li>
              <li
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
                onClick={() => {
                  handleDelete(idx);
                }}
                className="flex-center border-b border-gray_dark_1 cursor-pointer hover:bg-gray_light_3
                md:w-[100px] md:h-[40px]
                sm:w-[45px] sm:h-[40px]
                "
              >
                <div className="flex items-center">
                  <IconDeleteSolid w="w-[10px]" h="h-[10px]" fill="#6E6F76" />
                  <span className="ml-[3px] md:ml-[20px]">삭제</span>
                </div>
              </li>
            </ul>
          </DropDown>
        )} */}
    </div>
  );
};

export default PinContents;
