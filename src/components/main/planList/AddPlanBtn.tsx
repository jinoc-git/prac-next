'use client';

import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function AddPlanBtn() {
  const router = useRouter();
  return (
    <button
      className="group flex items-center font-Bold justify-center rounded-[7px] hover:text-blue_dark gap-3 hover:bg-white
            sm:w-[320px] sm:h-[46px] sm:mt-[16px] sm:mb-[26px] sm:ml-auto sm:font-bold sm:text-sm sm:text-blue_dark  sm:bg-white 
            md:md:w-[160px] md:h-[45px] mt-[35px] md:ml-auto md:border md:border-white md:text-white md:bg-blue_dark md:fill-white"
      onClick={() => {
        router.push('/addPlan');
      }}
    >
      <Image
        src={'/images/addWhite.svg'}
        alt="플러스 버튼 흰색"
        width={16}
        height={16}
      />
      여행 생성하기
    </button>
  );
}
