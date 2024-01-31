'use client';

import React from 'react';

import SideBarStatusChip from './SideBarStatusChip';

interface SideBarStatusProps {
  isOpen: boolean;
}

export default function SideBarStatus(props: SideBarStatusProps) {
  const { isOpen } = props;
  return (
    <div
      className="flex flex-col items-center border-slate-200
      sm:h-[234] sm:border-t-2 sm:py-[30px]
      md:h-[202px] md:border-y-2 md:py-[12px] "
    >
      <div
        className={`flex items-center justify-between mb-[15px] side-bar-transition ${
          isOpen ? 'sm:w-[309px] md:w-[221px] ' : ' md:w-[40px] md:flex-col '
        }`}
      >
        <span className="font-semibold text-xs text-gray_dark_1">STATUS</span>
        <SideBarStatusChip isOpen={isOpen} status={'여행 없음'} />
      </div>
    </div>
  );
}
