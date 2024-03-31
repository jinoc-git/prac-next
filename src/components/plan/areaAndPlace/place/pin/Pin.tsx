'use client';

import React from 'react';

import PinDistance from './pinDistance/PinDistance';
import PinOrder from './pinOrder/PinOrder';

import type { PinContentsType } from '@/types/supabase';

interface Props {
  pin: PinContentsType | [];
  idx: number;
  updatePin?: (idx: number) => void;
  deletePin?: (idx: number) => void;
  distance?: string;
}

const Pin = (props: Props) => {
  const { pin, idx, updatePin, deletePin, distance } = props;

  return (
    <>
      <PinOrder idx={idx} />
      <PinDistance distance={distance} />
    </>
  );
};

export default Pin;
