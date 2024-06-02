import React from 'react';

import Image from 'next/image';

import Receipt from './receipt/Receipt';

interface Props {
  dates: string[];
  datesCost: string[];
  totalCost: string;
}

const FinalCost = ({ dates, datesCost, totalCost }: Props) => {
  return (
    <section className="inner-content-layout flex-col space-y-[10px]">
      <div className="content-lable w-full">
        <Image
          src={'/images/svgs/receipt.svg'}
          width={20}
          height={21}
          alt="영수증 아이콘"
          className="w-5 h-auto"
        />
        <p>최종 정산 내역</p>
      </div>
      <Receipt dates={dates} datesCost={datesCost} totalCost={totalCost} />
    </section>
  );
};

export default FinalCost;
