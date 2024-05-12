import React from 'react';

import Image from 'next/image';

import Carousel from './carousel/Carousel';

interface Props {
  pictures: string[];
}

const PhotoAlbum = ({ pictures }: Props) => {
  return (
    <section className="inner-content-layout flex-col space-y-[10px]">
      <div className="content-lable w-full">
        <Image
          src={'/images/svgs/camera.svg'}
          width={20}
          height={18}
          alt="여행 지역 아이콘"
          className="w-[20px] h-[18px]"
        />
        <p>사진첩</p>
      </div>
      <Carousel pictures={pictures} />
    </section>
  );
};

export default PhotoAlbum;
