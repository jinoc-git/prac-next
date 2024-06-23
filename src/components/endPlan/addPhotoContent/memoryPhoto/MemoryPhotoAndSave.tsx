'use client';

import React from 'react';
import { toast } from 'react-toastify';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { calcAllPath, calcCostAndInsertPlansEnding, insertPlanEnding } from '@/api/ending';
import { addPictures } from '@/api/picture';
import { updatePlanStatus } from '@/api/plan';
import useConfirm from '@/hooks/useConfirm';

import SavePlan from './savePlan/SavePlan';
import UploadPhoto from './uploadPhoto/UploadPhoto';

import type { EndingPlanType, PinType, PlanType } from '@/types/supabase';

interface Props {
  plan: PlanType;
  allPins: PinType[];
}

const MemoryPhotoAndSave = ({ allPins, plan }: Props) => {
  const [uploadedImg, setUploadedImg] = React.useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const router = useRouter();
  const confirm = useConfirm();

  const savePlan = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const [distanceDatas, dateCostDatas, pictures] = await Promise.all([
        calcAllPath(allPins.map(({ contents }) => contents)),
        calcCostAndInsertPlansEnding(plan.id),
        addPictures(uploadedImg, plan.id),
      ]);

      const endingData: EndingPlanType = {
        id: plan.id,
        distance: distanceDatas,
        dates_cost: dateCostDatas,
        pictures,
        title: plan.title,
        total_cost: plan.total_cost,
        dates: plan.dates,
      };

      await Promise.all([insertPlanEnding(endingData), updatePlanStatus(plan.id, 'end')]);

      setIsSubmitting(false);

      router.push(`/ending/${plan.id}`);
    } catch (error) {
      setIsSubmitting(false);
      toast.error('여행 저장 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
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
            height={22}
            alt="카메라 아이콘"
            className=" pt-[1px]"
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
