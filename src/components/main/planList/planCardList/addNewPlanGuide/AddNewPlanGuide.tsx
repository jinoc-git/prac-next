'use client';

import React from 'react';

import AddNewPlanGuideText from './addNewPlanGuideText/AddNewPlanGuideText';

import type { SelectedMenu } from '@/store/tabMenuStore';

interface Props {
  select: SelectedMenu;
}

const AddNewPlanGuide = ({ select }: Props) => {
  return (
    <div>
      <AddNewPlanGuideText select={select} />
    </div>
  );
};

export default AddNewPlanGuide;
