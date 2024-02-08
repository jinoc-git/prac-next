'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

function AddPlanBtn() {
  const router = useRouter();

  return (
    <button
      className="group flex-box font-Bold rounded-[7px] hover:text-blue_dark gap-3 hover:bg-white
            sm:w-[320px] sm:h-[46px] sm:mt-[16px] sm:mb-[26px] sm:ml-auto sm:font-bold sm:text-sm sm:text-blue_dark  sm:bg-white 
            md:md:w-[160px] md:h-[45px] mt-[35px] md:ml-auto md:border md:border-white md:text-white md:bg-blue_dark md:fill-white"
      onClick={() => {
        router.push('/addPlan');
      }}
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
          fill={'#969696'}
          className={
            'sm:fill-[#1A68DB] md:fill-[#FFF] sm:group-hover:fill-[#1A68DB]'
          }
        />
      </svg>
      여행 생성하기
    </button>
  );
}

export default React.memo(AddPlanBtn);
