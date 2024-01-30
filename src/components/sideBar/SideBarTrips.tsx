'use client';

import React, { useState } from 'react';

import SideBarPlanList from './SideBarPlanList';

interface SideBarTripsProps {
  isOpen: boolean;
}

export default function SideBarTrips(props: SideBarTripsProps) {
  const { isOpen } = props;
  const [bookMarkIsOpen, setBookMarkIsOpen] = useState(false);
  const [planningIsOpen, setPlanningIsOpen] = useState(false);
  const [endIsOpen, setEndIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2 md:min-h-[382px] sm:min-h-[338px]">
      <p
        className={`font-semibold text-xs text-gray_dark_1 ${
          isOpen ? 'md:pl-[8px]' : ' text-center'
        }`}
      >
        TRIPS
      </p>
      <SideBarPlanList
        setFunc={setBookMarkIsOpen}
        isSideBarOpen={isOpen}
        isDropDownOpen={bookMarkIsOpen}
        filter="bookMark"
      />
    </div>
  );
}
