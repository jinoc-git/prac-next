import React from 'react';

import Image from 'next/image';

const MemoryPhoto = () => {
  return (
    <section className="content-layout">
      <div className="inner-content-layout sm:pt-[10px] md:pt-[5px]">
        <div className="content-lable">
          <Image
            src={'/images/svgs/camera.svg'}
            width={18}
            height={20}
            alt="지갑 아이콘"
            className="h-[20px] pt-[1px]"
          />
          <p>추억할 사진 올리기</p>
        </div>
      </div>
      <p className="sm:w-[286px] md:w-[635px] mx-auto text-gray sm:text-sm md:text-normal">
        10개 까지 추가 가능합니다.
      </p>
    </section>
  );
};

export default MemoryPhoto;
