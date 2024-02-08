'use client';

import React from 'react';

import PlanTabMenuItem from './PlanTabMenuItem';

interface PlanTabMenuProps {}

export default function PlanTabMenu(props: PlanTabMenuProps) {
  const {} = props;

  return (
    <ul className="flex-box sm:gap-[10px] sm:w-[320px] md:w-[800px]">
      <PlanTabMenuItem name="bookMark" planCount={1} />
      <span className="text-white"> | </span>
      <PlanTabMenuItem name="traveling" planCount={1} />
      <span className="text-white"> | </span>
      <PlanTabMenuItem name="planning" planCount={1} />
      <span className="text-white"> | </span>
      <PlanTabMenuItem name="end" planCount={1} />
    </ul>
  );
}
