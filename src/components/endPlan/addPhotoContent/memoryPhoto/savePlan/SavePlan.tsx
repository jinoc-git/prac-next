'use client';

import React from 'react';

import ChangeStatusButton from '@/components/common/button/changeStatusButton/ChangeStatusButton';

interface Props {
  handleSaveButton: () => void;
  isSubmitting: boolean;
}

const SavePlan = ({ handleSaveButton, isSubmitting }: Props) => {
  return (
    <div
      className="flex mb-[60px] content-layout
      md:justify-end md:mt-[100px] md:pr-[10px]
      sm:justify-start sm:mt-[82px] 
    "
    >
      <ChangeStatusButton
        leftText="여행 잘 다녀오셨나요?"
        value="저장하기"
        type="button"
        ariaLable="save-plan-button"
        onClick={handleSaveButton}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default SavePlan;
