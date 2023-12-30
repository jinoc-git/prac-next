'use client';

import React from 'react';

import Image from 'next/image';

import type { PasswordInputProps } from './PasswordInput';

interface DuplicateInputProps extends PasswordInputProps {
  leftIcon: { src: string; alt: string };
  duplicate: boolean;
  checkFunc: () => void;
}

export default function DuplicateInput(props: DuplicateInputProps) {
  const {
    leftIcon,
    name,
    placeholder,
    register,
    errors,
    duplicate,
    checkFunc,
  } = props;

  return (
    <div className="relative">
      <label
        htmlFor={name}
        className="absolute top-[21px] -translate-y-1/2 left-[5px] w-[24px] h-[24px] flex-box cursor-pointer"
      >
        <Image src={leftIcon.src} alt={leftIcon.alt} width={10} height={12} />
      </label>
      <input
        type="text"
        id={name}
        {...register}
        placeholder={placeholder}
        className="w-full h-[42px] px-8 rounded"
      />
      <button
        type="button"
        name={`${name}-duplication-btn`}
        onClick={checkFunc}
        disabled={Boolean(errors[name]) || duplicate}
        className="absolute top-[4px] right-[4px] w-[68px] h-[34px] p-1 text-sm border text-[#6E6F76] bg-white  hover:font-semibold disabled:bg-gray_light_3 disabled:text-white rounded"
      >
        중복확인
      </button>
      <p className="h-[20px] pt-1.5 text-center text-sm text-red-400">
        {errors[name]?.message}
      </p>
    </div>
  );
}
