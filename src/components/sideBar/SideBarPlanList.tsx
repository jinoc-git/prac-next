'use client';

import React, { useCallback } from 'react';

import Image from 'next/image';

import {
  SIDE_COLOR,
  SIDE_ICON_LIST,
  SIDE_LIST_NAME,
} from '@/utils/sideBarColorList';

import SideBarDropDown from './SideBarDropDown';

import type { PlanType } from '@/types/supabase';

interface SideBarPlanListProps {
  setFunc: React.Dispatch<React.SetStateAction<boolean>>;
  planList: PlanType[] | [];
  filter: 'bookMark' | 'planning' | 'end';
  isSideBarOpen: boolean;
  activeDropDown: boolean;
}

export default function SideBarPlanList(props: SideBarPlanListProps) {
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
          ${activeDropDown ? SIDE_COLOR.focus[filter] : ''} ${
            SIDE_COLOR.hover[filter]
          } `}
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
              <Image
                src={'/images/arrowUp.svg'}
                width={14}
                height={14}
                alt="위 방향 화살표"
              />
            ) : (
              <Image
                src={'/images/arrowDown.svg'}
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
        filterName={SIDE_LIST_NAME[filter]}
        planList={planList}
        setFunc={setFunc}
      />
    </div>
  );
}
