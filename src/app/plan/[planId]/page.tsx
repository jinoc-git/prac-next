import React from 'react';

import { getPlanByIdFromServer } from '@/api/serverAction';
import PlanContents from '@/components/plan/planContents/PlanContents';

interface Props {
  params: { planId: string };
}

export default async function Plan({ params }: Props) {
  const { planId } = params;

  const plan = await getPlanByIdFromServer(planId);

  return (
    <section>
      <PlanContents plan={plan} />
    </section>
  );
}
