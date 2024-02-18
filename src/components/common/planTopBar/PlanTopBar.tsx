import React from 'react';

import Image from 'next/image';

import { modifyPlanStore } from '@/store/modifyPlanStore';

interface PlanTopBarProps {
  handleButtonClick: () => void;
}

export default function PlanTopBar(props: PlanTopBarProps) {
  const { handleButtonClick } = props;
  const { modifyState } = modifyPlanStore();

  return (
    <nav
      className="flex justify-between border-b-[1px] border-navy py-[11.5px] items-center bg-white z-30
      sm:fixed sm:w-[100vw] sm:mt-0 sm:top-[89px]
      md:static md:w-full md:mt-[12px]"
    >
      <div
        className="text-navy_dark font-semibold
      sm:text-sm sm:ml-[25px]
      md:text-normal md:ml-[80px]"
      >
        여행 계획 시작
      </div>
      <div
        className="flex items-center font-semibold ml-[25px]
      sm:text-sm
      md:text-normal"
      >
        <button
          name="nav-multifunctional-btn"
          className="text-navy_dark flex items-center gap-2
          sm:mr-[25px] 
          md:mr-[80px] "
          type="button"
          onClick={handleButtonClick}
        >
          <Image
            alt="edit-icon"
            src={'/images/edit-blue.svg'}
            width={16}
            height={16}
          />
          {modifyState === 'modify' ? `저장하기` : `수정하기`}
        </button>
      </div>
    </nav>
  );
}
