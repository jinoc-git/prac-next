'use client';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import SavePlan from './savePlan/SavePlan';
import UploadPhoto from './uploadPhoto/UploadPhoto';

import type { PinType } from '@/types/supabase';

interface Props {
  allPins: PinType[];
}

const MemoryPhotoAndSave = ({ allPins }: Props) => {
  const [uploadedImg, setUploadedImg] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onClick = async () => {
    // setIsSubmitting(true);
  };

  useEffect(() => {}, []);

  return (
    <section className="content-layout pb-5">
      <div className="inner-content-layout sm:pt-[10px] md:pt-[5px]">
        <div className="content-lable">
          <Image
            src={'/images/svgs/camera.svg'}
            width={18}
            height={20}
            alt="카메라 아이콘"
            className="h-[20px] pt-[1px]"
          />
          <p>추억할 사진 올리기</p>
        </div>
      </div>
      <p className="sm:w-[286px] md:w-[635px] mx-auto text-gray sm:text-sm md:text-normal">
        10개 까지 추가 가능합니다.
      </p>
      <UploadPhoto setUploadedImg={setUploadedImg} />
      <SavePlan onClick={onClick} isSubmitting={isSubmitting} />
    </section>
  );
};

export default MemoryPhotoAndSave;
