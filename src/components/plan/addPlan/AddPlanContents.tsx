'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { addPlanSchema } from '@/schema/planSchema';

import PostPlanForm from '../../common/form/PostPlanForm';
import PlanTopBar from '../../common/planTopBar/PlanTopBar';

export interface AddPlanContentsInputType {
  title: string;
  totalCost: string;
}

export default function AddPlanContents() {
  const resolver = yupResolver(addPlanSchema);

  const {
    register,
    handleSubmit,
    setFocus,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<AddPlanContentsInputType>({
    resolver,
    mode: 'onChange',
    defaultValues: {
      totalCost: '0',
    },
  });

  const handleButtonClick = async () => {};

  const onChangeCost = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    setValue('totalCost', String(+val));
  };

  return (
    <>
      <PlanTopBar handleButtonClick={handleButtonClick} />
      <PostPlanForm
        onChangeCost={onChangeCost}
        register={register}
        errors={errors}
      />
    </>
  );
}
