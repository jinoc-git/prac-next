'use client';

import React from 'react';

import type { AddPinInputType } from '@/components/plan/areaAndPlace/place/addPinModal/AddPinModal';
import type { InputCompProps } from '@/types/inputComp.type';

interface Props extends InputCompProps<AddPinInputType> {
  title: string;
}

const TitleInput = (props: Props) => {
  const { title, name, placeholder, defaultValue, register, errors } = props;

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-2 text-sm font-semibold">
        {title}
      </label>
      <input
        id={name}
        type="text"
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...register}
        className="input-border
          sm:h-[44px] sm:text-sm sm:font-medium"
      />
      <p className="text-red-400 text-[12px] h-[24px] my-[5px]">
        {errors?.placeName?.message}
      </p>
    </div>
  );
};

export default TitleInput;
