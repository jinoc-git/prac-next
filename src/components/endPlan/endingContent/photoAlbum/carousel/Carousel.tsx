'use client';

import React from 'react';
import Slider from 'react-slick';

import Image from 'next/image';

import useModal from '@/hooks/useModal';

import NextArrow from './nextArrow/NextArrow';
import PhotoModal from './photoModal/PhotoModal';
import PrevArrow from './prevArrow/PrevArrow';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const settings = {
  dots: true,
  infinite: true,
  draggable: true,
  touchMove: true,
  useCSS: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 1440,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 1110,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

interface Props {
  pictures: string[];
}

const Carousel = ({ pictures }: Props) => {
  const { modalBGRef, isOpenModal, isAnimate, handleOpenModal, handleCloseModal, onClickModalBG } =
    useModal();

  const [modalImageSrc, setModalImageSrc] = React.useState('');

  const onClickImage = (src: string) => {
    setModalImageSrc(src);
    handleOpenModal();
  };

  return (
    <div className="p-[10px] w-full sm:mx-auto">
      <Slider {...settings}>
        {pictures.map((src, idx) => {
          return (
            <div
              key={`${idx},${src}`}
              className=" 
                md:w-[230px] md:h-[230px] md:p-[10px]
                sm:w-[266px] sm:h-[266px] sm:p-[5px]
              "
            >
              <Image
                src={src}
                width={230}
                height={230}
                alt={`여행 이미지 ${idx + 1}`}
                onClick={() => onClickImage(src)}
                className="cursor-pointer object-cover w-full h-full"
                priority
              />
            </div>
          );
        })}
      </Slider>
      {isOpenModal && (
        <PhotoModal
          isAnimate={isAnimate}
          handleCloseModal={handleCloseModal}
          src={modalImageSrc}
          modalBGRef={modalBGRef}
          onClickModalBG={onClickModalBG}
        />
      )}
    </div>
  );
};

export default Carousel;
