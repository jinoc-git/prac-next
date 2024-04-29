'use client';

import React from 'react';
import type { UseFormRegister } from 'react-hook-form';

import Image from 'next/image';

import { useModifyPlanStoreState } from '@/store/modifyPlanStore';

import type { PlanContentsInputType } from '../planContents/PlanContents';

interface Props {
  onChangeCost: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register: UseFormRegister<PlanContentsInputType>;
}

const Pay = (props: Props) => {
  const { onChangeCost, register } = props;
  const { modifyState } = useModifyPlanStoreState();

  return (
    <div className="inner-content-layout text-gray_dark_1 md:justify-normal sm:justify-between">
      <div className="content-lable">
        <Image
          src={'/images/svgs/wallet-gray.svg'}
          width={20}
          height={18}
          alt="지갑 아이콘"
        />
        <p>전체 예산</p>
      </div>
      <div className="relative flex flex-col sm:text-sm md:text-normal">
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
          className="text-[14px] font-medium border rounded-lg pl-[10px] pr-[16px] outline-none  h-[30px] border-gray read-only:pl-0 read-only:cursor-default read-only:border-none read-only:text-normal read-only:font-semibold
          sm:w-[100px]
          md:w-[150px]
          "
        />
        <span className=" absolute right-[5px] top-[5px] font-semibold">
          원
        </span>
      </div>
    </div>
  );
};

export default Pay;
