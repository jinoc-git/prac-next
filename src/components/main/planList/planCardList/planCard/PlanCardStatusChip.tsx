import React from 'react';

interface Props {
  state: 'planning' | 'traveling' | 'recording' | 'end';
}

export default function PlanCardStatusChip(props: Props) {
  const { state } = props;

  const chipText = {
    planning: '예정된 여행',
    traveling: '여행 중',
    recording: '다녀온 여행',
    end: '다녀온 여행',
  } as const;

  const chipColor = {
    planning: 'bg-yellow',
    traveling: 'bg-blue',
    recording: 'bg-orange',
    end: 'bg-orange',
  } as const;

  return (
    <div
      className={`flex-box font-normal text-white ${chipColor[state]} rounded-3xl 
                  sm:w-[65px] sm:h-[21px] sm:text-[10px] 
                  md:w-[72px] md:h-[26px] md:text-[12px]`}
    >
      {chipText[state]}
    </div>
  );
}
