'use client';

import React from 'react';
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

  const onChangeCost = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 8) val = val.substring(0, 8);

    setValue('totalCost', addCommas(+val));
  };

  return (
    <>
      <PlanTopBar handleSubmit={handleSubmit} />
      <PostPlanForm
        onChangeCost={onChangeCost}
        register={register}
        errors={errors}
      />
    </>
  );
}
