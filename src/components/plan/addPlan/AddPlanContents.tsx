'use client';

import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { addPlanSchema } from '@/schema/planSchema';
import { addCommas } from '@/utils/numberFormat';

import PostPlanForm from '../../common/form/PostPlanForm';
import PlanTopBar from '../../common/planTopBar/PlanTopBar';

export interface AddPlanContentsInputType {
  title: string;
  totalCost: string;
}

export default function AddPlanContents() {
  const formRef = useRef<HTMLFormElement>(null);
  const resolver = yupResolver(addPlanSchema);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<AddPlanContentsInputType>({
    resolver,
    mode: 'onChange',
    defaultValues: {
      totalCost: '0',
    },
  });

  const handleSaveBtnClick = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true }),
      );
    }
  };

  const onChangeCost = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 8) val = val.substring(0, 8);

    setValue('totalCost', addCommas(+val));
  };

  return (
    <>
      <PlanTopBar handleSaveBtnClick={handleSaveBtnClick} />
      <PostPlanForm
        formRef={formRef}
        handleSubmit={handleSubmit}
        onChangeCost={onChangeCost}
        register={register}
        errors={errors}
      />
    </>
  );
}
