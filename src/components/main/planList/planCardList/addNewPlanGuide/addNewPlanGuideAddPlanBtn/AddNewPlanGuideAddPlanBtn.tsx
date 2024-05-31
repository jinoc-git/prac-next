'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

const AddNewPlanGuideAddPlanBtn = () => {
  const router = useRouter();

  const onClickBtn = () => {
    router.push('/addplan');
  };

  return (
    <button
      name="card-add-btn"
      className="group flex-box border border-#969696 rounded-[7px] text-[#969696] bg-white hover:bg-blue_dark hover:text-white hover:border-none normal-transition
        sm:font-bold sm:gap-[10px] sm:mt-[32px] sm:w-[160px] sm:h-[47px]
        md:gap-[10px] md:mt-[35px] md:w-[160px] md:h-[45px]"
      onClick={onClickBtn}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14 0H10V10H0V14H10V24H14V14H24V10H14V0Z"
          fill="#969696"
          className="group-hover:fill-white normal-transition"
        />
      </svg>
      여행 생성하기
    </button>
  );
};

export default AddNewPlanGuideAddPlanBtn;
