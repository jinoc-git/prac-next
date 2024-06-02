'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

export default function ErrorMainPlanList() {
  const router = useRouter();

  const goToBack = () => {
    router.back();
  };

  const goToMain = () => {
    router.push('/main');
  };

  return (
    <section className="bg-[url(https://github.com/jinoc-git/traduler-project/assets/104746237/18bee0d6-3507-42d5-b42e-54c17173d077)] bg-no-repeat bg-center min-h-screen bg-70% flex flex-col items-center justify-center">
      <div className="mt-[400px]">
        <h2 className="text-center mb-4 text-gray_dark_2 text-xlg font-semibold">
          저런.. 길을 잃으셨군요!
        </h2>
        <p className="text-center mb-4 text-gray_dark_1">존재하지 않는 주소를 입력하셨거나,</p>
        <p className="text-center mb-4 text-gray_dark_1">
          요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={goToBack}
            className="cursor-pointer w-[140px] h-[36px] rounded-lg bg-white text-blue border border-blue hover:bg-blue_light_1 hover:text-blue_dark hover:border-blue_dark"
          >
            이전 페이지
          </button>
          <button
            onClick={goToMain}
            className="cursor-pointer w-[140px] h-[36px] rounded-lg bg-gradient-to-r from-blue_dark to-blue text-white border border-blue_dark hover:bg-white hover:text-blue_dark hover:border-blue_dark"
          >
            홈으로
          </button>
        </div>
      </div>
    </section>
  );
}
