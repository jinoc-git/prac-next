'use client';

import React from 'react';

import { useConfirmStoreActions, useConfirmStoreState } from '@/store/confirmStore';

import ConfirmModalLayout from '../../layout/ConfirmModalLayout';

const ConfirmModal = () => {
  const modalBGRef = React.useRef<HTMLDialogElement | null>(null);

  const { title, desc, func, buttonText } = useConfirmStoreState();
  const { closeConfirm } = useConfirmStoreActions();

  const handleConfirm = () => {
    func();
    closeConfirm();
  };

  const onClickModalBG = React.useCallback(
    (e: React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
      if (e.target === modalBGRef.current) closeConfirm();
    },
    [modalBGRef],
  );

  return (
    <ConfirmModalLayout modalBGRef={modalBGRef} onClickModalBG={onClickModalBG}>
      <div className="text-lg font-bold text-navy_dark">{title}</div>
      <div className=" text-gray_dark_1 md:mb-6 sm:mb-3">{desc}</div>
      <div className="flex justify-center">
        <button
          name="cancel-confirm-btn"
          onClick={closeConfirm}
          className="border border-navy text-navy rounded-lg  hover:bg-navy_light_1 duration-200
          md:px-[20px] md:py-[14px] md:w-[210px] md:mr-[24px]
          sm:px-[10px] sm:py-[7px] sm:w-[105px] sm:mr-[12px]
          "
        >
          취소
        </button>
        <button
          name="confirm-btn"
          onClick={handleConfirm}
          className="bg-navy text-white rounded-lg hover:bg-navy_light_3 disabled:bg-grayduration-200
          md:px-[20px] md:py-[14px] md:w-[210px]
          sm:px-[10px] sm:py-[7px] sm:w-[105px] 
          "
        >
          {buttonText}
        </button>
      </div>
    </ConfirmModalLayout>
  );
};

export default ConfirmModal;
