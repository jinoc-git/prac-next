import React, { Suspense } from 'react';

import { redirect } from 'next/navigation';

import { getSessionFromServer } from '@/api/serverAction';
import Loading from '@/components/common/loading/Loading';
import EndingContent from '@/components/endPlan/endingContent/EndingContent';

export const revalidate = 3600;

interface Props {
  params: { planId: string };
}

export default async function Ending({ params }: Props) {
  const session = await getSessionFromServer();

  if (session === null) redirect('/signin');

  return (
    <Suspense fallback={<Loading full={true} />}>
      <EndingContent params={params} />
    </Suspense>
  );
}
