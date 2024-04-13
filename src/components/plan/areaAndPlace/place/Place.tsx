'use client';

import React, { useState } from 'react';

import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
import Image from 'next/image';

import PinLayout from '@/components/common/layout/PinLayout';
import { dateStore } from '@/store/dateStore';
import { modifyPlanStore } from '@/store/modifyPlanStore';

import AddPinModal from './addPinModal/AddPinModal';
import Pin from './pin/Pin';

import type { PinContentsType } from '@/types/supabase';

interface Props {
  currentPage: number;
  pins: PinContentsType[][];
  setPins: React.Dispatch<React.SetStateAction<PinContentsType[][]>>;
}

const Place = (props: Props) => {
  const { pins, setPins, currentPage } = props;

  const [isAnimate, setIsAnimate] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const dates = dateStore(({ dates }) => dates);
  const modifyState = modifyPlanStore(({ modifyState }) => modifyState);

  const openModal = () => {
    setIsAnimate(true);
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsAnimate(false);
    setTimeout(() => {
      setIsOpenModal(false);
    }, 400);
  };

  const updatePin = (idx: number) => {};
  const deletePin = (idx: number) => {};

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
      <ol>
        {pins[currentPage]?.map((pin, idx) => {
          return (
            <PinLayout key={uuid()}>
              <Pin
                pin={pin}
                idx={idx}
                updatePin={updatePin}
                deletePin={deletePin}
              />
            </PinLayout>
          );
        })}
      </ol>
      {dates.length !== 0 && modifyState === 'modify' && (
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
            className="border border-dashed rounded-lg font-bold  text-gray_dark_1 hover:bg-navy_light_1 duration-200 disabled:hover:bg-white
                sm:w-[240px] sm:h-[65px] sm:mr-[2px] sm:text-[11px]
                md:w-[600px] md:h-[120px] md:text-[18px]"
          >
            장소 추가하기
          </button>
        </div>
      )}
      {isOpenModal && (
        <AddPinModal
          isAnimate={isAnimate}
          currentPage={currentPage}
          setPins={setPins}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default Place;
