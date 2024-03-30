'use client';

import React, { useState } from 'react';

import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
import Image from 'next/image';

import { dateStore } from '@/store/dateStore';

import type { PinContentsType } from '@/types/supabase';

interface Props {
  currentPage: number;
  pins: PinContentsType[][];
}

const Place = (props: Props) => {
  const { pins, currentPage } = props;
  const [isOpenModal, setIsOpenModal] = useState(false);
  const dates = dateStore(({ dates }) => dates);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  return (
    <div className="flex flex-col justify-center gap-5">
      <div
        className="flex items-center my-[10px] font-semibold text-gray_dark_1 gap-[8px]
            md:text-normal md:w-[700px] md:mx-[6px]
            sm:text-sm sm:w-[286px] sm:mx-auto
            "
      >
        <Image
          src={'/images/pin.svg'}
          width={20}
          height={20}
          alt="여행 지역 아이콘"
        />
        <p>방문할 장소</p>
      </div>
      {pins[currentPage]?.map((pin, idx: number) => {
        return (
          <div key={uuid()}>
            {/* <PinLayout
              pin={pin}
              idx={idx}
              isEnding={false}
              updatePin={updatePin}
              deletePin={deletePin}
            /> */}
          </div>
        );
      })}
      {dates.length !== 0 && (
        <div
          className="flex items-center justify-between pb-[60px]
            sm:w-[286px] 
            md:w-[651px] md:my-[8px]"
        >
          <p
            className="rounded-full bg-gradient-to-r from-[#5E9fff] from-0% to-[#1a68db] via-100% font-semibold text-white border-[5px] border-white 
              sm:w-[30px] sm:h-[30px]
              md:w-[35px] md:h-[35px]"
          ></p>
          <button
            aria-label="placeadd-btn"
            type="button"
            onClick={openModal}
            className="border border-dashed rounded-lg font-bold  text-gray_dark_1 hover:bg-navy_light_1 duration-200
                sm:w-[240px] sm:h-[65px] sm:mr-[2px] sm:text-[11px]
                md:w-pin_card md:h-pin_card md:text-[18px]"
          >
            장소 추가하기
          </button>
        </div>
      )}
    </div>
  );
};

export default Place;
