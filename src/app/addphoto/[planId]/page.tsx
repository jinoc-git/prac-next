import React, { Suspense } from 'react';

import Loading from '@/components/common/loading/Loading';
import AddPhotoContent from '@/components/endPlan/addPhotoContent/AddPhotoContent';

interface Props {
  params: { planId: string };
}

export default function AddPhoto({ params }: Props) {
  return (
    <Suspense fallback={<Loading full={true} />}>
      <AddPhotoContent params={params} />
    </Suspense>
  );
}
