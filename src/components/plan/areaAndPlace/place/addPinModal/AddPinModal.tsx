'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import ModalLayout from '@/components/common/layout/ModalLayout';
import { addPinSchema } from '@/schema/addPinModalSchema';
import { pinStore } from '@/store/pinStore';

import type { PinContentsType } from '@/types/supabase';

interface AddPinInputType {
  placeName: string;
  address: string;
  cost: string;
}

interface Props {
  isAnimate: boolean;
  currentPage: number;
  setPins: React.Dispatch<React.SetStateAction<PinContentsType[][]>>;
  closeModal: () => void;
}

const AddPinModal = (props: Props) => {
  const { isAnimate, currentPage, setPins, closeModal } = props;
  const { pin, idx, resetPin } = pinStore();

  const resolver = yupResolver(addPinSchema);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AddPinInputType>({
    mode: 'onChange',
    defaultValues: {
      placeName: pin != null ? pin.placeName : '',
      cost: pin !== null && typeof pin.cost === 'string' ? pin.cost : '0',
    },
  });

  return (
    <ModalLayout isAnimate={isAnimate}>
      <div></div>
    </ModalLayout>
  );
};

export default AddPinModal;
