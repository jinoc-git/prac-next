'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import PostPlanForm from '../common/form/PostPlanForm';
import PlanTopBar from '../common/planTopBar/PlanTopBar';

export interface AddPlanContentsInputType {
  title: string;
  totalCost: string;
}

export default function AddPlanContents() {
  const {
    register,
    handleSubmit,
    setFocus,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<AddPlanContentsInputType>({
    mode: 'onChange',
    defaultValues: {
      totalCost: '0',
    },
  });

  const handleButtonClick = async () => {};

  const titleRegister = register('title', {
    required: '제목은 필수입니다.',
    minLength: {
      value: 1,
      message: '제목은 1글자 이상이어야 합니다.',
    },
    maxLength: {
      value: 12,
      message: '제목은 12글자 이하여야 합니다.',
    },
  });

  return (
    <>
      <PlanTopBar handleButtonClick={handleButtonClick} />
      <PostPlanForm register={titleRegister} errors={errors} />
    </>
  );
}
