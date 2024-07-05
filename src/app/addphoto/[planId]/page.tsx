import React, { Suspense } from 'react';

import { redirect } from 'next/navigation';

import { getSessionFromServer } from '@/api/serverAction';
import Loading from '@/components/common/loading/Loading';
import AddPhotoContent from '@/components/endPlan/addPhotoContent/AddPhotoContent';

interface Props {
  params: { planId: string };
}

export default async function AddPhoto({ params }: Props) {
  const session = await getSessionFromServer();

  if (session === null) redirect('/signin');

  return (
    <Suspense fallback={<Loading full={true} />}>
      <AddPhotoContent params={params} />
    </Suspense>
  );
}
