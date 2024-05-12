'use client';

import React from 'react';
import Slider from 'react-slick';

import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
import Image from 'next/image';

import NextArrow from './nextArrow/NextArrow';
import PrevArrow from './prevArrow/PrevArrow';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Props {
  pictures: string[];
}

const Carousel = ({ pictures }: Props) => {
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

  return (
    <div className="p-[10px] w-full sm:mx-auto">
      <Slider {...settings}>
        {pictures.map((src, idx) => {
          return (
            <div
              key={uuid()}
              className=" cursor-pointer
                md:w-[230px] md:h-[230px] md:p-[10px]
                sm:w-[266px] sm:h-[266px] sm:p-[5px]
              "
            >
              <Image
                src={src}
                width={230}
                height={230}
                alt={`여행 이미지 ${idx + 1}`}
                className="object-cover w-full h-full"
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default Carousel;
