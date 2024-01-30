'use client';

import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import type { PlanType } from '@/types/supabase';

interface SideBarPlanListProps {
  setFunc: React.Dispatch<React.SetStateAction<boolean>>;
  planList?: PlanType[];
  filter: 'bookMark' | 'planning' | 'end';
  isSideBarOpen: boolean;
  isDropDownOpen: boolean;
}

const ICON_LIST = {
  bookMark: '/images/bookmark.svg',
  planning: '/images/side-planning.svg',
  end: '/images/side-end.svg',
};

const LIST_NAME = {
  bookMark: '즐겨찾기 한 목록',
  planning: '예정된 여행',
  end: '다녀온 여행',
};

const COLOR = {
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

export default function SideBarPlanList(props: SideBarPlanListProps) {
  const { setFunc, planList, filter, isDropDownOpen, isSideBarOpen } = props;
  const router = useRouter();

  const toggleFunc = () => {
    setFunc((prev) => !prev);
  };

  return (
    <div>
      <div
        className={`flex justify-between items-center cursor-pointer rounded-lg 
        sm:w-[308px] 
        md:w-[222px]
        ${isSideBarOpen ? COLOR.hover[filter] : ''} ${
          isSideBarOpen && isDropDownOpen ? COLOR.active[filter] : ''
        } `}
        onClick={toggleFunc}
      >
        <button
          aria-label="sidebar-trips-list-btn"
          onBlur={() => {
            setFunc(false);
          }}
          className={`flex-box w-[40px] h-[40px] rounded-lg side-bar-transition 
          ${isDropDownOpen ? COLOR.focus[filter] : ''} ${COLOR.hover[filter]} `}
        >
          <Image
            src={ICON_LIST[filter]}
            width={20}
            height={20}
            alt={LIST_NAME[filter] + '아이콘'}
          />
        </button>
        <div className="flex items-center">
          <span
            className="font-bold text-sm text-gray_dark_1
            sm:w-[198px]  
            md:w-[110px]
          "
          >
            {LIST_NAME[filter]}
          </span>
          <div className="w-[14px] mr-5">
            {isDropDownOpen ? (
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
    </div>
  );
}
