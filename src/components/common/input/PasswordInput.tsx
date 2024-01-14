'use client';

import React, { useState } from 'react';
import type { FieldErrors, UseFormRegisterReturn } from 'react-hook-form';

import Image from 'next/image';

import type { SignupFormInputList } from '../form/SignupForm';

interface PasswordInputProps {
  placeholder: string;
  register?: UseFormRegisterReturn<string>;
  errors?: FieldErrors<SignupFormInputList>;
}

const PasswordInput = (props: PasswordInputProps) => {
  const { placeholder, register, errors } = props;
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="relative">
      <label
        htmlFor="password"
        className="absolute top-[21px] -translate-y-1/2 left-[5px] w-[24px] h-[24px] flex-box cursor-pointer"
      >
        <Image
          src="/images/locked.svg"
          alt="자물쇠 아이콘"
          width={12}
          height={12}
        />
      </label>
      <input
        type={showPassword ? 'text' : 'password'}
        id="password"
        {...register}
        placeholder={placeholder}
        className="w-full h-[42px] px-8 rounded"
      />
      <button
        onClick={toggleShowPassword}
        aria-label="signup-toggle-show-password-btn"
        className="absolute top-[20px] -translate-y-1/2 flex-box right-[10px] w-[24px] h-[24px]"
      >
        {showPassword ? (
          <Image
            src="/images/eyeVisible.svg"
            alt="눈 안 가려진 아이콘"
            width={14}
            height={14}
          />
        ) : (
          <Image
            src="/images/eyeHidden.svg"
            alt="눈 가려진 아이콘"
            width={14}
            height={14}
          />
        )}
      </button>
      <p className="h-[20px] pt-1.5 text-center text-sm text-red-400">
        {errors?.password?.message}
      </p>
    </div>
  );
};

export default React.memo(PasswordInput);
