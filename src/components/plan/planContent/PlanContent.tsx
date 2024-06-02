import React from 'react';

import { notFound } from 'next/navigation';

import { getPlanByIdFromServer } from '@/api/serverAction';

import AddOrEditPlan from '../addOrEditPlan/AddOrEditPlan';
import ChangePlanStatus from '../changePlanStatus/ChangePlanStatus';

interface Props {
  params: { planId: string };
}

const PlanContent = async ({ params }: Props) => {
  const { planId } = params;

  const plan = await getPlanByIdFromServer(planId);

  if (plan === null) notFound();

  return (
    <section className=" relative md:pt-[70px]">
      <AddOrEditPlan plan={plan} />
      <ChangePlanStatus status={plan.plan_state} planId={plan.id} />
    </section>
  );
};

export default PlanContent;
