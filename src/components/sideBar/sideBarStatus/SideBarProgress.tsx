'use client';

import React, { useEffect, useState } from 'react';

import { calcDateProgress } from '@/utils/aboutDay';

import type { PlanType } from '@/types/supabase';

interface SideBarProgressProps {
  activePlan: PlanType | undefined;
  isOpen: boolean;
}

export default function SideBarProgress(props: SideBarProgressProps) {
  const { activePlan, isOpen } = props;
  const [progress, setProgress] = useState('');

  const progressLength = (((isOpen ? 160 : 72) / 100) * +progress).toFixed();

  const isOpenContainerClassName =
    'relative w-[160px] h-[8px] rounded bg-[#EEF1F4]';
  const isCloseContainerClassName =
    'relative w-[8px] h-[72px] rounded bg-[#EEF1F4]';

  const isOpenProgressBarClassName = {
    width: progressLength + 'px',
    height: '8px',
    top: '0',
    left: '0',
  };
  const isCloseProgressBarClassName = {
    width: '8px',
    height: progressLength + 'px',
    bottom: '0',
    left: '0',
  };

  useEffect(() => {
    if (activePlan) {
      const startDay = activePlan.dates[0];
      const endDay = activePlan.dates[activePlan.dates.length - 1];
      const percent = calcDateProgress(startDay, endDay);
      setProgress(percent);
    }
  }, [activePlan]);

  return (
    <>
      <p
        className={` bg-gradient-to-r from-blue_dark to-blue text-transparent bg-clip-text font-bold ${
          isOpen ? 'text-sm ' : 'text-xs'
        }`}
      >
        {progress + '%'}
      </p>
      <div
        className={
          isOpen ? isOpenContainerClassName : isCloseContainerClassName
        }
      >
        <div
          style={
            isOpen ? isOpenProgressBarClassName : isCloseProgressBarClassName
          }
          className={` absolute bg-gradient-to-r from-[#116DB3] to-[#2DA4FF] rounded transition-all duration-300 ease-in-out`}
        ></div>
      </div>
    </>
  );
}
