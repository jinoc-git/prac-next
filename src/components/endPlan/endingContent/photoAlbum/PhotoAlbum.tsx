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
        <Image src={'/images/svgs/camera.svg'} width={18} height={22} alt="여행 지역 아이콘" />
        <p>사진첩</p>
      </div>
      <Carousel pictures={pictures} />
    </section>
  );
};

export default PhotoAlbum;
