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
}

const Pin = (props: Props) => {
  const { pin, idx, updatePin, deletePin, distance } = props;

  const pathname = usePathname();
  const isEnding = pathname.split('/')[1] === 'ending';

  return (
    <>
      <PinOrder idx={idx} />
      <PinDistance distance={distance} />
      <PinContents pin={pin} isEnding={isEnding} />
    </>
  );
};

export default Pin;
