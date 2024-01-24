import React from 'react';

interface SideBarStatusChipProps {
  isOpen: boolean;
  status: '여행 중' | '여행 예정' | '여행 없음';
}

export default function SideBarStatusChip(props: SideBarStatusChipProps) {
  const { isOpen, status } = props;

  const chipBackgroudColor = {
    '여행 중': 'bg-blue',
    '여행 예정': 'bg-yellow',
    '여행 없음': 'bg-orange',
  };

  return (
    <div
      className={`flex-box rounded-[30px] text-xs text-white ${
        isOpen
          ? 'sm:w-[72.5px] sm:h-[22px] md:w-[72.5px] h-[22px]'
          : 'md:w-[38px] md:h-[10px]'
      } ${chipBackgroudColor[status]}`}
    >
      {isOpen && status}
    </div>
  );
}
