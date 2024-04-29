import React from 'react';

interface Props {
  title: string;
}

const EndPlanTitle = ({ title }: Props) => {
  return (
    <div
      className="flex items-center justify-between
          sm:mb-[35px]
          md:mb-[18px]"
    >
      <h3
        className="font-bold text-gray_dark_1
            sm:text-[20px]
            md:text-[24px]"
      >
        {title}
      </h3>
      <div className="w-[65px] h-[20px] text-[10px] flex-box font-normal text-white bg-orange rounded-3xl ">
        완료된 여행
      </div>
    </div>
  );
};

export default EndPlanTitle;
