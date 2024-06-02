'use client';

import React, { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useSideBarStoreActions } from '@/store/sideBarStore';

const NotFound = () => {
  const { setVisibilitySideBar, setIsNotFoundPage } = useSideBarStoreActions();
  const router = useRouter();

  const goToBack = () => {
    router.back();
  };

  const goToMain = () => {
    router.replace('/main');
  };

  useEffect(() => {
    setVisibilitySideBar(false);
    setIsNotFoundPage(true);
    return () => {
      setVisibilitySideBar(true);
      setIsNotFoundPage(false);
    };
  }, []);

  return (
    <section className="bg-[url(https://github.com/jinoc-git/traduler-project/assets/108923582/6d291f12-a1df-4505-b3e1-4cb7b14baa51)] bg-no-repeat bg-center min-h-screen bg-80% flex flex-col items-center justify-center">
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
};

export default NotFound;
