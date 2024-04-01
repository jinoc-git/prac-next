'use client';

import React from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface Props {
  register: UseFormRegisterReturn<string>;
}

const TitleInput = (props: Props) => {
  const { register } = props;

  return (
    <div className="flex flex-col">
      <label htmlFor="placeName" className="mb-2 text-sm font-semibold">
        장소 이름
      </label>
      <input
        id="placeName"
        type="text"
        placeholder="장소 이름을 입력하세요"
        {...register('placeName', {
          required: '장소 이름은 필수 입력값입니다.',
          minLength: {
            value: 1,
            message: '장소 이름은 1자 이상이어야 합니다.',
          },
          maxLength: {
            value: 12,
            message: '장소 이름은 12자 이하여야 합니다.',
          },
          pattern: {
            value: /^[가-힣|a-z|A-Z|0-9|\s-]*$/,
            message: '모음, 자음 안됨',
          },
        })}
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
