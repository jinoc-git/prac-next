'use client';

import React from 'react';

import { usePathname } from 'next/navigation';

import PinContents from './pinContents/PinContents';
import PinDistance from './pinDistance/PinDistance';
import PinOrder from './pinOrder/PinOrder';

import type { PinContentsType } from '@/types/supabase';

interface Props {
  pin: PinContentsType;
  idx: number;
  updatePin?: (idx: number) => void;
  deletePin?: (idx: number) => void;
  distance?: string;
  dragArea?: React.ReactNode;
  isModify?: boolean;
}

const Pin = (props: Props) => {
  const { pin, idx, updatePin, deletePin, distance, isModify } = props;

  const pathname = usePathname();
  const isEnding = pathname.split('/')[1] === 'ending';

  return (
    <li
      className="relative flex items-center justify-between gap-4
      sm:w-[286px] sm:mb-[37px] 
      md:w-[651px] md:mx-[25px] md:ml-0"
    >
      <PinOrder idx={idx} />
      <PinDistance distance={distance} />
      <PinContents pin={pin} isEnding={isEnding} isModify={isModify} />
    </li>
  );
};

export default Pin;
