import React from 'react';

import { redirect } from 'next/navigation';

import { getAllPinsByPlanFromServer, getPlanByIdFromServer } from '@/api/serverAction';
import ChangePlanStatus from '@/components/plan/changePlanStatus/ChangePlanStatus';
import PlanContents from '@/components/plan/planContents/PlanContents';

interface Props {
  params: { planId: string };
}

export default async function Plan({ params }: Props) {
  const { planId } = params;

  const plan = await getPlanByIdFromServer(planId);

  if (plan === null) redirect('/main'); // 잘못된 경로 예정

  const originPins = await getAllPinsByPlanFromServer(plan);

  return (
    <section>
      <PlanContents plan={plan} originPins={originPins} />
      <ChangePlanStatus status={plan.plan_state} planId={plan.id} />
    </section>
  );
}
