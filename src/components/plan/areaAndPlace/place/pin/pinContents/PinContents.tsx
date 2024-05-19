'use client';

import React from 'react';

import Image from 'next/image';

import { useModifyPlanStoreState } from '@/store/modifyPlanStore';

import type { PinContentsType } from '@/types/supabase';

interface Props {
  pin: PinContentsType;
  isEnding: boolean;
}

const PinContents = (props: Props) => {
  const { pin, isEnding } = props;

  const { modifyState } = useModifyPlanStoreState();

  return (
    <div
      className="relative flex items-center justify-between py-[17px] border rounded-lg border-gray_dark_1 
        sm:w-[239px] sm:h-[80px] sm:px-2
        md:w-[600px] md:h-[120px] md:mb-[10px] md:px-[15px]"
    >
      {!isEnding && modifyState === 'modify' && (
        <button className="sm:w-[30px] md:w-[50px] sm:p-1 md:p-3">
          <Image
            src={'/images/svgs/drag-area.svg'}
            alt="드래그 영역 아이콘"
            width={25}
            height={29}
            className="sm:w-[15px] sm:h-[18px] md:w-[25px] md:h-[29px] "
          />
        </button>
      )}
      <div
        className={`flex flex-col text-left  text-gray_dark_1  gap-y-[2px]
          sm:text-[11px] sm:w-[200px]
          md:text-normal md:w-[400px]
        ${isEnding ? 'ml-[15px]' : ''}
        `}
      >
        {pin.placeName && <span className="font-bold">{pin.placeName}</span>}
        {pin.address && <span>{pin.address}</span>}
        {pin.cost && <span>{pin.cost + ' 원'}</span>}
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
