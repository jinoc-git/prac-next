import React from 'react';

import { redirect } from 'next/navigation';

import { getAllPinsByPlanFromServer, getPlanByIdFromServer } from '@/api/serverAction';

import AddOrEditPlan from '../addOrEditPlan/AddOrEditPlan';
import ChangePlanStatus from '../changePlanStatus/ChangePlanStatus';

interface Props {
  params: { planId: string };
}

const PlanContent = async ({ params }: Props) => {
  const { planId } = params;

  const plan = await getPlanByIdFromServer(planId);

  if (plan === null) redirect('/main'); // 잘못된 경로 예정

  const originPins = await getAllPinsByPlanFromServer(plan);

  return (
    <section className=" relative md:pt-[70px]">
      <AddOrEditPlan plan={plan} originPins={originPins} />
      <ChangePlanStatus status={plan.plan_state} planId={plan.id} />
    </section>
  );
};

export default PlanContent;
