'use client';

import React from 'react';
import type { ConnectDragSource } from 'react-dnd';

import Image from 'next/image';

import type { PinContentsType } from '@/types/supabase';

interface Props {
  pin: PinContentsType;
  idx: number;
  isEnding: boolean;
  isModify?: boolean;
  dragRef: ConnectDragSource;
  handleUpdate?: (idx: number) => void;
  handleDelete?: (idx: number) => void;
}

const PinContents = (props: Props) => {
  const { pin, idx, isEnding, isModify, dragRef, handleUpdate, handleDelete } = props;

  const [dropDownIsOpen, setDropDownIsOpen] = React.useState(false);

  const handleDropDown = () => {
    setDropDownIsOpen(true);
  };

  return (
    <div
      className="relative flex items-center justify-between py-[17px] border rounded-lg border-gray_dark_1 
        sm:w-[239px] sm:h-[80px] sm:px-2
        md:w-[600px] md:h-[120px] md:mb-[10px] md:px-[15px]"
    >
      {!isEnding && isModify && (
        <button ref={dragRef} className="sm:w-[30px] md:w-[50px] sm:p-1 md:p-3">
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
      {/* drop down 영역 */}
      {!isEnding && isModify && (
        <div className="relative ">
          <button
            aria-label="dropdown-btn"
            onClick={handleDropDown}
            onBlur={() => {
              setDropDownIsOpen(false);
            }}
            // onMouseOut={handleMouseOut}
            className="md:p-3 sm:p-1"
          >
            <Image
              src={'/images/svgs/microMenu.svg'}
              alt="작은 메뉴 아이콘"
              width={24}
              height={24}
              className="sm:w-[14px] sm:h-[14px] md:w-[24px] md:h-[24px] "
            />
          </button>
          {dropDownIsOpen && (
            <ul
              className="absolute border border-gray_dark_1  bg-white z-10 overflow-hidden
              md:left-[40px] md:bottom-[-50px] md:text-[16px] md:w-[100px] md:rounded-md
              sm:left-[-17px] sm:bottom-[-27px] sm:text-[10px] sm:h-[80px] sm:w-[45px] sm:rounded-l-none sm:rounded-r-md
            "
            >
              <li
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
                onClick={() => {
                  handleUpdate && handleUpdate(idx);
                }}
                className="flex-box border-b border-gray_dark_1 cursor-pointer hover:bg-gray_light_3
                md:w-[100px] md:h-[40px]
                sm:w-[45px] sm:h-[40px]
                "
              >
                <div className="flex items-center">
                  <Image
                    src={'/images/svgs/edit-gray.svg'}
                    alt="수정 아이콘"
                    width={12}
                    height={12}
                    className="sm:w-[10px] sm:h-[10px] md:w-[12px] md:h-[12px] "
                  />
                  <span className="ml-[3px] md:ml-[20px]">수정</span>
                </div>
              </li>
              <li
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
                onClick={() => {
                  handleDelete && handleDelete(idx);
                }}
                className="flex-box border-b border-gray_dark_1 cursor-pointer hover:bg-gray_light_3
                md:w-[100px] md:h-[40px]
                sm:w-[45px] sm:h-[40px]
                "
              >
                <div className="flex items-center">
                  <Image
                    src={'/images/svgs/delete.svg'}
                    alt="삭제 아이콘"
                    width={12}
                    height={12}
                    className="sm:w-[10px] sm:h-[10px] md:w-[12px] md:h-[12px] "
                  />
                  <span className="ml-[3px] md:ml-[20px]">삭제</span>
                </div>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default PinContents;
