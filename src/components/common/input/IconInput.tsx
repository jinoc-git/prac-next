'use client';

import React from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

import Image from 'next/image';

import type { SigninFormInputList } from '../form/SigninForm';

interface IconInputProps {
  name: keyof SigninFormInputList;
  leftIcon: { src: string; alt: string; w: number; h: number };
  placeholder: string;
  register: UseFormRegisterReturn<string>;
}

const IconInput = (props: IconInputProps) => {
  const { leftIcon, name, placeholder, register } = props;

  return (
    <div className="relative">
      <label
        htmlFor={name}
        className="absolute top-1/2 -translate-y-1/2 left-[5px] w-[24px] h-[24px] flex-box cursor-pointer"
      >
        <Image src={leftIcon.src} alt={leftIcon.alt} width={leftIcon.w} height={leftIcon.h} />
      </label>
      <input
        type="text"
        id={name}
        {...register}
        placeholder={placeholder}
        className="w-full h-[42px] px-8 rounded"
      />
    </div>
  );
};

export default IconInput;
