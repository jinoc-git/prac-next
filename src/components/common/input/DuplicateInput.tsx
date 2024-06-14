'use client';

import React from 'react';
import type { GlobalError } from 'react-hook-form';

import Image from 'next/image';

import type { InputCompProps } from '@/types/inputComp.type';

interface DuplicateInputProps<T extends Object> extends InputCompProps<T> {
  leftIcon: { src: string; alt: string };
  duplicate: boolean;
  checkFunc: () => void;
}

const DuplicateInput = <T extends Object>(props: DuplicateInputProps<T>) => {
  const { leftIcon, name, placeholder, register, errors, duplicate, checkFunc } = props;

  const error = errors ? (errors[name] as GlobalError) : undefined;

  return (
    <div className="relative w-full rounded">
      <label
        htmlFor={name as string}
        className="absolute top-[21px] -translate-y-1/2 left-[5px] w-[24px] h-[24px] flex-box cursor-pointer"
      >
        <Image src={leftIcon.src} alt={leftIcon.alt} width={10} height={12} />
      </label>
      <input
        type="text"
        id={name as string}
        {...register}
        placeholder={placeholder}
        className="w-full h-[42px] px-8 rounded"
      />
      <button
        type="button"
        name={`${name as string}-duplication-btn`}
        onClick={checkFunc}
        disabled={Boolean(error) || duplicate}
        className="absolute top-[4px] right-[4px] w-[68px] h-[34px] p-1 text-sm border text-[#6E6F76] bg-white hover:font-semibold disabled:hover:font-normal disabled:bg-gray_light_3 disabled:text-white rounded normal-transition"
      >
        중복확인
      </button>
      <p className="h-[20px] pt-1.5 text-center text-sm text-red-400">{error?.message}</p>
    </div>
  );
};

export default DuplicateInput;
