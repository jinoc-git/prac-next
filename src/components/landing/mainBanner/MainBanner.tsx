import React from 'react';

import Image from 'next/image';

const MainBanner = () => {
  return (
    <section className=" relative">
      <Image
        src="/images/landing-main-banner.webp"
        alt="랜딩 메인 베너 이미지"
        width={1920}
        height={1080}
        className="w-[100vw] h-[520px] object-cover md:h-screen"
      />
      <div className="position-center sm:w-[280px] sm:h-[250px] md:w-[750px] md:h-[400px]">
        <div className="sm:hidden md:flex items-center gap-2">
          <Image
            src="/images/svgs/map-yellow.svg"
            alt="랜딩 메인 베너 이미지"
            width={32}
            height={32}
            className="w-[32px] h-[32px]"
          />
          <p className="text-yellow text-[36px]">It`s time to travel</p>
        </div>
        <Image
          src="/images/svgs/map-white.svg"
          alt="랜딩 메인 베너 이미지"
          width={32}
          height={32}
          className="w-[32px] h-[32px] sm:block md:hidden"
        />
        <p className="font-bold text-white md:text-[55px] sm:text-[36px]">
          너와 나의 <br className="md:hidden" />
          여행 연결고리
        </p>
        <p className="text-white md:text-xlg md:mt-[35px] sm:mt-[8px]">
          Traduler와 함께 더 쉽고 빠르고 간편한
        </p>
        <p className="text-white md:text-xlg">모두가 행복한 평화로운 여행을 만들어보세요!</p>
      </div>
    </section>
  );
};

export default MainBanner;
