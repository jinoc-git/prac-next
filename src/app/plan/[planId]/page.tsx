import React, { Suspense } from 'react';

import { notFound, redirect } from 'next/navigation';

import { getPlanByIdFromServer, getUserFromServer } from '@/api/serverAction';
import Loading from '@/components/common/loading/Loading';
import AddOrEditPlan from '@/components/plan/addOrEditPlan/AddOrEditPlan';
import ChangePlanStatus from '@/components/plan/changePlanStatus/ChangePlanStatus';

interface Props {
  params: { planId: string };
}

export default async function Plan({ params }: Props) {
  const user = await getUserFromServer();

  if (user === null) redirect('/signin');

  const plan = await getPlanByIdFromServer(params.planId);

  if (plan === null) notFound();

  return (
    <Suspense fallback={<Loading full={true} />}>
      <section className=" relative sm:pt-[80px] md:pt-[70px]">
        <AddOrEditPlan plan={plan} />
        <ChangePlanStatus status={plan.plan_state} planId={plan.id} />
      </section>
    </Suspense>
  );
}
