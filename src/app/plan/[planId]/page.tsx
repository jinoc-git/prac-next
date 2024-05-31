import React, { Suspense } from 'react';

import { redirect } from 'next/navigation';

import { getSessionFromServer } from '@/api/serverAction';
import Loading from '@/components/common/loading/Loading';
import PlanContent from '@/components/plan/planContent/PlanContent';

interface Props {
  params: { planId: string };
}

export default async function Plan({ params }: Props) {
  const session = await getSessionFromServer();

  if (session === null) redirect('/signin');

  return (
    <Suspense fallback={<Loading full={true} />}>
      <PlanContent params={params} />
    </Suspense>
  );
}
