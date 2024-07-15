'use client';

import React from 'react';

import Image from 'next/image';

import type { BookMarkType } from '@/types/supabase';

interface Props {
  bookMarkData: BookMarkType | undefined;
  planId: string;
  handleBookMark: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    bookMarkData: BookMarkType | undefined,
    planId: string,
  ) => void;
}

const BookMark = ({ bookMarkData, planId, handleBookMark }: Props) => {
  return (
    <button
      onClick={(e) => handleBookMark(e, bookMarkData, planId)}
      aria-label="bookmark-toggle-btn"
      className="flex-box 
        sm:w-[24px] sm:h-[24px] 
        md:w-[48px] md:h-[48px]"
    >
      <Image
        src={bookMarkData ? '/images/svgs/star-fill.svg' : '/images/svgs/star-gray.svg'}
        alt="북마크 아이콘"
        width={24}
        height={24}
        className="sm:w-[15px] sm:h-[15px] md:w-[24px] md:h-[24px]"
      />
    </button>
  );
};

export default BookMark;
