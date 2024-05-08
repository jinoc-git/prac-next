import React from 'react';

import { redirect } from 'next/navigation';

import { getAllPinsByPlanFromServer, getPlanByIdFromServer } from '@/api/serverAction';
import MemoryPhotoAndSave from '@/components/endPlan/memoryPhoto/MemoryPhotoAndSave';
import PlanInfo from '@/components/endPlan/planInfo/PlanInfo';

interface Props {
  params: { planId: string };
}

export default async function AddPhoto({ params }: Props) {
  const { planId } = params;

  const plan = await getPlanByIdFromServer(planId);

  if (plan === null) redirect('/main'); // 잘못된 경로 예정

  const allPins = await getAllPinsByPlanFromServer(plan);

  return (
    <>
      <PlanInfo plan={plan} allPins={allPins} />
      <MemoryPhotoAndSave allPins={allPins} />
      <section></section>
    </>
  );
}
