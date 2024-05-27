'use client';

import React from 'react';

import Image from 'next/image';

const PrevArrow = ({ onClick }: { onClick?: () => void }) => {
  return (
    <button
      aria-label="carousel-prev-btn"
      onClick={onClick}
      className="flex-box rounded-full bg-orange absolute top-1/2 -translate-y-1/2 hover:bg-orange_dark
      md:left-[-60px] md:w-[24px] md:h-[24px] 
      sm:left-[-15px] sm:w-[16px] sm:h-[16px]"
    >
      <Image
        src={'/images/svgs/arrowLeft.svg'}
        width={16}
        height={16}
        alt="carousel-prev-icon"
        className="md:w-[16px] md:h-[16px] sm:w-[12px] sm:h-[12px]"
      />
    </button>
  );
};

export default PrevArrow;
