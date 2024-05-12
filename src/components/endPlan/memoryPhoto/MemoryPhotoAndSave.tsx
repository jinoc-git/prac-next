'use client';

import React, { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { calcAllPath, calcCostAndInsertPlansEnding, insertPlanEnding } from '@/api/ending';
import { addPictures } from '@/api/picture';
import { updatePlanStatus } from '@/api/plan';
import useConfirm from '@/hooks/useConfirm';

import SavePlan from './savePlan/SavePlan';
import UploadPhoto from './uploadPhoto/UploadPhoto';

import type { PinType, PlansEndingType, PlanType } from '@/types/supabase';

interface Props {
  plan: PlanType;
  allPins: PinType[];
}

const MemoryPhotoAndSave = ({ allPins, plan }: Props) => {
  const [uploadedImg, setUploadedImg] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const confirm = useConfirm();

  const savePlan = async () => {
    setIsSubmitting(true);
    const distanceDatas = await calcAllPath(allPins.map(({ contents }) => contents));
    const dateCostDatas = await calcCostAndInsertPlansEnding(plan.id);
    const pictures = await addPictures(uploadedImg, plan.id);

    const endingData: PlansEndingType = {
      id: plan.id,
      distance: distanceDatas,
      dates_cost: dateCostDatas,
      pictures,
      title: plan.title,
      total_cost: plan.total_cost,
      dates: plan.dates,
    };

    await insertPlanEnding(endingData);
    await updatePlanStatus(plan.id, 'end');
    setIsSubmitting(false);

    router.push(`/ending/${plan.id}`);
  };

  const handleSaveButton = () => {
    const confTitle = '여행 저장';
    const confDesc = '저장한 여행은 수정할 수 없습니다. 정말로 저장하시겠습니까?';
    const confFunc = async () => {
      await savePlan();
    };

    confirm.default(confTitle, confDesc, confFunc);
  };

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
      <SavePlan handleSaveButton={handleSaveButton} isSubmitting={isSubmitting} />
    </section>
  );
};

export default MemoryPhotoAndSave;
