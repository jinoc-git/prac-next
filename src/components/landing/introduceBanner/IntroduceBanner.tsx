'use client';

import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const IntroduceBanner = () => {
  const router = useRouter();

  const handleButton = () => {
    router.push('/main');
  };

  return (
    <section className="w-full mx-auto flexcol items-center landing-section">
      <p className="text-normal font-semibold mt-[55px] text-center md:text-[36px]">
        다녀온 후에도 모두가 오래오래 추억할 수 있게
      </p>
      <div className="flex sm:flex-col sm:items-center md:flex-row-reverse md:items-start md:gap-[80px] mx-auto">
        <Image
          src="/images/img-landing-introduce.webp"
          alt="사이트 이용 예시 이미지"
          width={750}
          height={454}
          className=" w-3/4 max-w-[750px] h-auto rounded-lg mt-4"
        />
        <div className="mt-6">
          <p className="font-semibold md:text-xlg sm:text-normal">지난 여행 저장소</p>
          <p className=" mt-3">시간은 흘러도 우리의 추억은 계속된다!</p>
          <br />
          <p>보고 또 봐도 다시 보고 싶은 최애 영화처럼,</p>
          <p>그리울 때 마다 꺼내 보는</p>
          <p className="mb-4">나만의 추억 여행 타임 캡슐</p>
          <button
            onClick={handleButton}
            className="blue-button p-2 sm:w-[100px] md:w-[130px] sm:mx-auto md:mx-0"
          >
            더 알아보기
          </button>
        </div>
      </div>
    </section>
  );
};

export default IntroduceBanner;
