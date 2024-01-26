import React from 'react';

interface SideBarTripsProps {
  isSideBarOpen: boolean;
}

export default function SideBarTrips(props: SideBarTripsProps) {
  const { isSideBarOpen } = props;
  return (
    <div className="flex flex-col gap-2 md:min-h-[382px] sm:min-h-[338px]">
      <p
        className={`font-semibold text-xs text-gray_dark_1 ${
          isSideBarOpen ? 'md:pl-[8px]' : ' text-center'
        }`}
      >
        TRIPS
      </p>
    </div>
  );
}
