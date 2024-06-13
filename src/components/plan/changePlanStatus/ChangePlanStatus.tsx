'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { updatePlanStatus } from '@/api/plan';
import ChangeStatusButton from '@/components/common/button/changeStatusButton/ChangeStatusButton';
import useChangePlanStatus from '@/hooks/useChangePlanStatus';
import useConfirm from '@/hooks/useConfirm';
import { scrollTop } from '@/utils/aboutScroll';

import type { PlanStatus } from '@/types/aboutPlan.type';

interface Props {
  status: PlanStatus;
  planId: string;
}

const ChangePlanStatus = ({ status, planId }: Props) => {
  const { leftText, disabled } = useChangePlanStatus(status);

  const router = useRouter();
  const confirm = useConfirm();

  const handleChangePlanStatus = () => {
    if (status === 'planning') {
      const confTitle = '여행 중으로 변경';
      const confDesc =
        '여행 중으로 변경할 경우 다시 계획 중으로 되돌릴 수 없습니다. 변경하시겠습니까?';
      const confFunc = async () => {
        await updatePlanStatus(planId, 'traveling');

        router.refresh();
        scrollTop();
      };

      confirm.default(confTitle, confDesc, confFunc);
    } else if (status === 'traveling') {
      const confTitle = '일정 종료하기';
      const confDesc =
        '일정 종료를 하시면 더 이상 여행 내용을 수정하실 수 없습니다. 사진을 추가하시겠습니까?';
      const confFunc = async () => {
        await updatePlanStatus(planId, 'recording');
        router.push(`/addphoto/${planId}`);
      };

      confirm.default(confTitle, confDesc, confFunc);
    }
  };

  return (
    <div
      className="flex mb-[60px] content-layout
      md:justify-end md:mt-[100px] md:pr-[10px]
      sm:justify-start sm:mt-[82px] 
    "
    >
      <ChangeStatusButton
        value={status === 'planning' ? '여행시작' : '일정 종료'}
        type="button"
        name={'여행 상태 변경 버튼'}
        disabled={disabled}
        leftText={leftText}
        onClick={handleChangePlanStatus}
      />
    </div>
  );
};

export default ChangePlanStatus;
