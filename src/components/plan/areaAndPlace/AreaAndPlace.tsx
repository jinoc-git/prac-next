'use client';

import React from 'react';

import Area from './area/Area';
import Place from './place/Place';

import type { PinContentsType } from '@/types/supabase';

interface Props {
  currentPage: number;
  pins: PinContentsType[][];
  setPins: React.Dispatch<React.SetStateAction<PinContentsType[][]>>;
}

const AreaAndPlace = (props: Props) => {
  const { currentPage, pins, setPins } = props;

  return (
    <div className=" space-y-5">
      <Area currentPage={currentPage} pins={pins} setPins={setPins} />
      <Place pins={pins} currentPage={currentPage} setPins={setPins} />
    </div>
  );
};

export default AreaAndPlace;
