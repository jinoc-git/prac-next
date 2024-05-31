'use client';

import React from 'react';

import Image from 'next/image';

import AddNewPlanGuideAddPlanBtn from './addNewPlanGuideAddPlanBtn/AddNewPlanGuideAddPlanBtn';
import AddNewPlanGuideText from './addNewPlanGuideText/AddNewPlanGuideText';

import type { SelectedMenu } from '@/store/tabMenuStore';

interface Props {
  select: SelectedMenu;
}

const AddNewPlanGuide = ({ select }: Props) => {
  return (
    <div
      className="flex flex-col items-center 
      sm:mt-[100px]
      md:mt-[125px]"
    >
      <Image
        src={'/images/plan-bag.webp'}
        alt="여행 가방 사진"
        width={125}
        height={100}
        className="sm:w-[100px] sm:h-[80px] sm:my-[15px]
        md:w-[125px] md:h-[100px]"
        priority
      />
      <AddNewPlanGuideText select={select} />
      {select !== 'bookMark' && <AddNewPlanGuideAddPlanBtn />}
    </div>
  );
};

export default AddNewPlanGuide;
