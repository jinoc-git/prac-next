'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import type { PlanType } from '@/types/supabase';

interface SideBarPlanListProps {
  toggleFunc: () => void;
  setFunc: (val: boolean) => void;
  planList: PlanType[];
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
  const {
    toggleFunc,
    setFunc,
    planList,
    filter,
    isDropDownOpen,
    isSideBarOpen,
  } = props;
  const router = useRouter();

  return (
    <div>
      <div></div>
    </div>
  );
}
