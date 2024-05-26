'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import ChangeStatusButton from '@/components/common/button/ChangeStatusButton';

const GoToList = () => {
  const router = useRouter();

  const handleGoToListBtn = () => {
    router.push('/main');
  };

  return (
    <section className="content-layout flex justify-end py-[30px]">
      <ChangeStatusButton
        leftText="다른 여행 일정도 둘러보세요!"
        onClick={handleGoToListBtn}
        value="목록으로"
        type="button"
      />
    </section>
  );
};

export default GoToList;
