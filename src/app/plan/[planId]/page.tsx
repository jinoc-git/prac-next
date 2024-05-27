import React, { Suspense } from 'react';

import Loading from '@/components/common/loading/Loading';
import PlanContent from '@/components/plan/planContent/PlanContent';

interface Props {
  params: { planId: string };
}

export default async function Plan({ params }: Props) {
  return (
    <Suspense fallback={<Loading full={true} />}>
      <PlanContent params={params} />
    </Suspense>
  );
}
