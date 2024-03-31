'use client';

import React from 'react';

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

  return (
    <>
      <PinOrder idx={idx} />
      <PinDistance distance={distance} />
      <PinContents pin={pin} isEnding={Boolean(distance)} />
    </>
  );
};

export default Pin;
