'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { updatePlanStatus } from '@/api/plan';
import ChangeStatusButton from '@/components/common/button/ChangeStatusButton';
import useChangePlanStatus from '@/hooks/useChangePlanStatus';
import useConfirm from '@/hooks/useConfirm';

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
        // scrollTop();
      };

      confirm.default(confTitle, confDesc, confFunc);
    } else {
      const confTitle = '여행 완료로 변경';
      const confDesc =
        '여행을 완료하시면 더 이상 여행 내용을 수정하실 수 없습니다. 완료하시겠습니까?';
      const confFunc = async () => {
        await updatePlanStatus(planId, 'recording');
        router.push(`/addPhoto/${planId}`);
      };

      confirm.default(confTitle, confDesc, confFunc);
    }
  };

  return (
    <div
      className="flex mb-[60px] mx-auto
      md:justify-end md:mt-[100px] md:w-[720px] md:pr-[10px]
      sm:justify-start sm:mt-[82px] sm:w-[310px]
    "
    >
      <ChangeStatusButton
        value={status === 'planning' ? '여행시작' : '여행 완료'}
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
