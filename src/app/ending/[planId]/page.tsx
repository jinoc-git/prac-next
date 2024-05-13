import React from 'react';

import { redirect } from 'next/navigation';

import { getAllPinsByPlanFromServer, getEndingPlanFromServer } from '@/api/serverAction';

interface Props {
  params: { planId: string };
}

export default async function Ending({ params }: Props) {
  const { planId } = params;

  const plan = await getEndingPlanFromServer(planId);

  if (plan === null) redirect('/main'); // 잘못된 경로 예정

  const allPins = await getAllPinsByPlanFromServer(plan);

  return (
    <div>
      <div>Ending</div>
    </div>
  );
}
