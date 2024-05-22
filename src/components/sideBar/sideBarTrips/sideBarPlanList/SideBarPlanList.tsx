'use client';

import React, { useCallback } from 'react';

import Image from 'next/image';

import SideBarDropDown from './sideBarDropDown/SideBarDropDown';

import type { PlanType } from '@/types/supabase';

interface Props {
  setFunc: React.Dispatch<React.SetStateAction<boolean>>;
  planList: PlanType[] | [];
  filter: 'bookMark' | 'planning' | 'end';
  isSideBarOpen: boolean;
  activeDropDown: boolean;
}

const SIDE_COLOR = {
  hover: {
    bookMark: 'md:hover:bg-red_light_1',
    planning: 'md:hover:bg-yellow_light_1',
    end: 'md:hover:bg-orange_light_1',
  },
  focus: {
    bookMark: 'focus:bg-red_light_1',
    planning: 'focus:bg-yellow_light_1',
    end: 'focus:bg-orange_light_1 ',
  },
  active: {
    bookMark: 'bg-red_light_1',
    planning: 'bg-yellow_light_1',
    end: 'bg-orange_light_1',
  },
};

const SIDE_ICON_LIST = {
  bookMark: '/images/svgs/bookmark.svg',
  planning: '/images/svgs/side-planning.svg',
  end: '/images/svgs/side-end.svg',
} as const;

export const SIDE_LIST_NAME = {
  bookMark: '즐겨찾기 한 목록',
  planning: '예정된 여행',
  end: '다녀온 여행',
} as const;

export default function SideBarPlanList(props: Props) {
  const { setFunc, planList, filter, activeDropDown, isSideBarOpen } = props;

  const toggleFunc = useCallback(() => {
    setFunc((prev) => !prev);
  }, []);

  const aboveDropDownIsOpen = activeDropDown && !isSideBarOpen;

  return (
    <div className="relative">
      <div
        className={`flex justify-between items-center cursor-pointer rounded-lg 
        sm:w-[308px] 
        md:w-[222px]
        ${isSideBarOpen ? SIDE_COLOR.hover[filter] : ''} ${
          isSideBarOpen && activeDropDown ? SIDE_COLOR.active[filter] : ''
        } `}
        onClick={toggleFunc}
      >
        <button
          aria-label="sidebar-trips-list-btn"
          onBlur={() => {
            setFunc(false);
          }}
          className={`flex-box w-[40px] h-[40px] rounded-lg side-bar-transition 
          ${activeDropDown ? SIDE_COLOR.focus[filter] : ''} ${SIDE_COLOR.hover[filter]} `}
        >
          <Image
            src={SIDE_ICON_LIST[filter]}
            width={20}
            height={20}
            alt={SIDE_ICON_LIST[filter] + '아이콘'}
          />
        </button>
        <div className="flex items-center">
          <span
            className="font-bold text-sm text-gray_dark_1
            sm:w-[198px]  
            md:w-[110px]
          "
          >
            {SIDE_LIST_NAME[filter]}
          </span>
          <div className="w-[14px] mr-5">
            {activeDropDown ? (
              <Image src={'/images/svgs/arrowUp.svg'} width={14} height={14} alt="위 방향 화살표" />
            ) : (
              <Image
                src={'/images/svgs/arrowDown.svg'}
                width={14}
                height={14}
                alt="아래 방향 화살표"
              />
            )}
          </div>
        </div>
      </div>
      <SideBarDropDown
        activeDropDown={activeDropDown}
        aboveDropDownIsOpen={aboveDropDownIsOpen}
        filter={filter}
        planList={planList}
        setFunc={setFunc}
      />
    </div>
  );
}
