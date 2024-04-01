'use client';

import React from 'react';

import ModalLayout from '@/components/common/layout/ModalLayout';

import type { PinContentsType } from '@/types/supabase';

interface Props {
  isAnimate: boolean;
  currentPage: number;
  setPins: React.Dispatch<React.SetStateAction<PinContentsType[][]>>;
  closeModal: () => void;
}

const AddPinModal = (props: Props) => {
  const { isAnimate, currentPage, setPins, closeModal } = props;

  return (
    <ModalLayout isAnimate={isAnimate}>
      <div></div>
    </ModalLayout>
  );
};

export default AddPinModal;
