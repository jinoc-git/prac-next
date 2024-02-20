'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import PlanTopBar from '../common/planTopBar/PlanTopBar';

export interface AddPlanFormInputType {
  title: string;
  totalCost: string;
}

export default function AddPlanForm() {
  const handleButtonClick = async () => {};

  const {
    register,
    handleSubmit,
    setFocus,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<AddPlanFormInputType>({
    mode: 'onChange',
    defaultValues: {
      totalCost: '0',
    },
  });

  return (
    <>
      <PlanTopBar handleButtonClick={handleButtonClick} />
      <form
        className="flex flex-col mx-auto
        sm:mt-[32px] sm:w-[310px]
        md:mt-[100px] md:w-[720px] md:px-[10px]"
      >
        <input
          id="title"
          type="text"
          placeholder="여행 제목을 입력하세요."
          {...register('title', {
            required: '제목은 필수입니다.',
            minLength: {
              value: 1,
              message: '제목은 1글자 이상이어야 합니다.',
            },
            maxLength: {
              value: 12,
              message: '제목은 12글자 이하여야 합니다.',
            },
          })}
          className="border-b-[1px] border-gray w-full outline-none font-bold placeholder:text-gray  text-black
            sm:text-[20px]
            md:text-[24px] "
        />
      </form>
    </>
  );
}
