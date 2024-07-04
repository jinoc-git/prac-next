import React, { Suspense } from 'react';

import { redirect } from 'next/navigation';

import { getUserFromServer } from '@/api/serverAction';
import Loading from '@/components/common/loading/Loading';
import AddPhotoContent from '@/components/endPlan/addPhotoContent/AddPhotoContent';

interface Props {
  params: { planId: string };
}

export default async function AddPhoto({ params }: Props) {
  const user = await getUserFromServer();

  if (user === null) redirect('/signin');

  return (
    <Suspense fallback={<Loading full={true} />}>
      <AddPhotoContent params={params} />
    </Suspense>
  );
}
