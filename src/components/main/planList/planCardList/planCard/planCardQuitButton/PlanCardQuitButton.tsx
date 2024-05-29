import React from 'react';

import Image from 'next/image';

interface Props {
  planId: string;
  onClickQuitBtn: (id: string) => void;
}

export default function PlanCardQuitButton(props: Props) {
  const { planId, onClickQuitBtn } = props;

  return (
    <button
      className="sm:mt-[2px] md:mt-[4px]"
      aria-label="card-quit-plan-btn"
      onClick={(e) => {
        e.stopPropagation();
        onClickQuitBtn(planId);
      }}
    >
      <Image
        alt="여행 나가기"
        src={'/images/svgs/quit.svg'}
        width={24}
        height={24}
        // 호버 시 색상 변경 수정 필요할듯?
        className=" hover:fill-orange_dark hover:stroke-orange_light_2 sm:w-[16px] sm:h-[16px] md:w-[24px] md:h-[24px]"
      />
    </button>
  );
}
