import React from 'react';

import { redirect } from 'next/navigation';

import { getAllPinsByPlanFromServer, getEndingPlanFromServer } from '@/api/serverAction';
import Comment from '@/components/endPlan/comment/Comment';
import FinalCost from '@/components/endPlan/finalCost/FinalCost';
import GoToList from '@/components/endPlan/goToList/GoToList';
import PhotoAlbum from '@/components/endPlan/photoAlbum/PhotoAlbum';
import PlanInfo from '@/components/endPlan/planInfo/PlanInfo';
import VisitedPlace from '@/components/endPlan/visitedPlace/VisitedPlace';

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
      <PhotoAlbum pictures={plan.pictures} />
      <VisitedPlace allPins={allPins} plan={plan} />
      <FinalCost dates={plan.dates} datesCost={plan.dates_cost} totalCost={plan.total_cost} />
      <Comment planId={planId} />
      <GoToList />
    </>
  );
}
