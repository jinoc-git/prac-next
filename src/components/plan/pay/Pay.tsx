'use client';

import React from 'react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import Image from 'next/image';

import { modifyPlanStore } from '@/store/modifyPlanStore';

import type { PlanContentsInputType } from '../planContents/PlanContents';

interface Props {
  onChangeCost: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register: UseFormRegister<PlanContentsInputType>;
  errors: FieldErrors<PlanContentsInputType>;
  total_Cost?: string;
}

const Pay = (props: Props) => {
  const { onChangeCost, register, errors, total_Cost } = props;
  const modifyState = modifyPlanStore((state) => state.modifyState);

  return (
    <div
      className="flex items-center font-semibold text-gray_dark_1 
    sm:w-[286px] sm:h-[27px] sm:text-sm sm:mx-auto sm:mt-[11px]
    md:w-[700px] md:text-[16px]  md:mb-[15px]  md:mx-[6px] "
    >
      <div className="flex items-center sm:h-[27px] sm:w-[286px] md:w-full md:justify-normal sm:justify-between">
        <div className="flex items-center">
          <Image
            src={'/images/svgs/wallet-gray.svg'}
            width={20}
            height={18}
            alt="지갑 아이콘"
          />
          <p
            className="font-semibold sm:mr-[37px] sm:ml-[8px] 
          md:mr-[53px] md:ml-[8px]"
          >
            전체 예산
          </p>
        </div>
        {/* {modifyState === 'readOnly' ? (
          <p
            id="totalCost"
            className="text-[16px] font-SemiBold border rounded-lg outline-none border-gray read-only:cursor-default read-only:border-none read-only:font-semibold
            sm:read-only:text-[14px] 
            md:read-only:text-normal"
          >
            {total_Cost !== undefined ? total_Cost + ' 원' : null}
          </p>
        ) : ( */}
        <div className="relative flex flex-col mt-[10px]">
          <input
            id="totalCost"
            type="text"
            placeholder="예산을 입력하세요."
            readOnly={modifyState !== 'modify'}
            defaultValue={'0'}
            {...register('totalCost', {
              required: '예산은 필수입니다.',
              onChange: onChangeCost,
            })}
            className="text-[14px] font-medium border rounded-lg px-[16px] outline-none w-[150px] h-[30px] border-gray read-only:cursor-default read-only:border-none read-only:text-normal read-only:font-semibold"
          />
          <span className=" absolute right-[5px] top-[4px]">원</span>
          <p className="h-[10px] pl-2 pt-1 text-xs text-red-600">
            {errors?.totalCost?.message}
          </p>
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default Pay;
