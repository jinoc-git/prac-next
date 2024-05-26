import React from 'react';

import Image from 'next/image';

const GuideBanner = () => {
  return (
    <section className="mt-[80px]">
      <Image
        src="/images/img-landing-guide.webp"
        alt="사이트 이용 예시 이미지"
        width={1920}
        height={1080}
        className="w-full h-auto"
      />
      <div className="text-center mt-[60px]">
        <p className=" md:text-[36px] font-semibold sm:text-[16px]">
          가족여행, 엠티, 수련회, 우정여행, 효도여행..
        </p>
        <p className="font-normal md:text-xlg sm:text-[12px]">
          단체 여행 깔끔하게 진행시키는 우리만의 여행 전용 비서
        </p>
      </div>
      <div className="flex shrink justify-center w-full gap-[5px] mt-[10px] mx-auto md:gap-[27px] md:mt-[65px]">
        <Image
          src="/images/landing-group-01.webp"
          alt="그룹 이미지 1"
          width={359}
          height={246}
          className="w-1/4 rounded-lg "
        />
        <Image
          src="/images/landing-group-02.webp"
          alt="그룹 이미지 2"
          width={359}
          height={246}
          className="w-1/4 rounded-lg "
        />
        <Image
          src="/images/landing-group-03.webp"
          alt="그룹 이미지 3"
          width={359}
          height={246}
          className="w-1/4 rounded-lg "
        />
      </div>
    </section>
  );
};

export default GuideBanner;
