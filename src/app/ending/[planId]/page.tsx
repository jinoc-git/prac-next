import React from 'react';

import { redirect } from 'next/navigation';

import { getAllPinsByPlanFromServer, getEndingPlanFromServer } from '@/api/serverAction';
import PhotoAlbum from '@/components/endPlan/photoAlbum/PhotoAlbum';
import PlanInfo from '@/components/endPlan/planInfo/PlanInfo';

export const revalidate = 3600;

interface Props {
  params: { planId: string };
}

export default async function Ending({ params }: Props) {
  const { planId } = params;

  const plan = await getEndingPlanFromServer(planId);

  if (plan === null) redirect('/main'); // 잘못된 경로 예정

  const allPins = await getAllPinsByPlanFromServer(plan);

  return (
    <>
      <PlanInfo plan={plan} allPins={allPins} />
      <PhotoAlbum />
    </>
  );
}
