import React from 'react';

import Image from 'next/image';

interface Props {
  cost: string;
}

const EndPlanCost = ({ cost }: Props) => {
  return (
    <div
      className="inner-content-layout
      md:justify-normal 
      sm:justify-between"
    >
      <div className="content-lable ">
        <Image
          src={'/images/svgs/wallet-gray.svg'}
          width={20}
          height={18}
          alt="지갑 아이콘"
        />
        <p>전체 예산</p>
      </div>
      <p className="sm:text-xs md:text-normal font-semibold text-gray_dark_1">
        {cost + '원'}
      </p>
    </div>
  );
};

export default EndPlanCost;
