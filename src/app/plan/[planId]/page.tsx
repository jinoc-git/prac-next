import React from 'react';

import {
  getAllPinsByPlanFromServer,
  getPlanByIdFromServer,
} from '@/api/serverAction';
import ChangePlanState from '@/components/plan/changePlanState/ChangePlanState';
import PlanContents from '@/components/plan/planContents/PlanContents';

interface Props {
  params: { planId: string };
}

export default async function Plan({ params }: Props) {
  const { planId } = params;

  const plan = await getPlanByIdFromServer(planId);
  const originPins = await getAllPinsByPlanFromServer(plan);

  return (
    <section>
      <PlanContents plan={plan} originPins={originPins} />
      <ChangePlanState />
    </section>
  );
}
