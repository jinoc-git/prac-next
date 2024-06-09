'use client';

import React from 'react';

import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';
import Image from 'next/image';

import DragNDropProvider from '@/components/common/providers/dragNDropProvider/DragNDropProvider';
import useConfirm from '@/hooks/useConfirm';
import useModal from '@/hooks/useModal';
import { useDateStoreState } from '@/store/dateStore';
import { useModifyPlanStoreState } from '@/store/modifyPlanStore';
import { usePinStoreActions } from '@/store/pinStore';

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

  const { isOpenModal, isAnimate, handleOpenModal, handleCloseModal } = useModal();

  const { updateClick } = usePinStoreActions();
  const confirm = useConfirm();
  const { dates } = useDateStoreState();
  const { modifyState } = useModifyPlanStoreState();

  const isModify = modifyState === 'modify';

  const movePins = React.useCallback(
    (beforeIdx: number, afterIdx: number) => {
      if (beforeIdx === afterIdx) return;
      setPins((prev) => {
        const dayPins = prev[currentPage];
        const item = dayPins[beforeIdx];
        const removed = dayPins.toSpliced(beforeIdx, 1);
        const afterDayPins = removed.toSpliced(afterIdx, 0, item);
        const result = prev.toSpliced(currentPage, 1, afterDayPins);
        return result;
      });
    },
    [currentPage],
  );

  const handleUpdate = (idx: number) => {
    updateClick(pins[currentPage][idx], idx);
    handleOpenModal();
  };

  const handleDelete = (idx: number) => {
    const confTitle = '장소 삭제';
    const confDesc = '정말 삭제하시겠습니까?';
    const confFunc = () => {
      setPins((prev) => {
        const result = prev.map((day, i) => {
          if (i === currentPage) {
            const deleted = day.filter((_, index) => index !== idx);
            return deleted;
          }
          return day;
        });

        return result;
      });
    };

    confirm.delete(confTitle, confDesc, confFunc);
  };

  return (
    <div className="flex flex-col justify-center gap-5">
      <div
        className="flex items-center my-[10px] font-semibold text-gray_dark_1 gap-[8px]
            md:text-normal md:w-[700px] md:mx-[6px]
            sm:text-sm sm:w-[286px] sm:mx-auto
            "
      >
        <Image src={'/images/svgs/pin.svg'} width={18} height={22} alt="여행 지역 아이콘" />
        <p>방문할 장소</p>
      </div>
      <DragNDropProvider>
        <ol>
          {pins[currentPage]?.map((pin, idx) => {
            return (
              <Pin
                key={uuid()}
                pin={pin}
                idx={idx}
                isModify={isModify}
                movePins={movePins}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
              />
            );
          })}
        </ol>
      </DragNDropProvider>
      {dates.length !== 0 && isModify && (
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
            onClick={handleOpenModal}
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
          closeModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Place;
