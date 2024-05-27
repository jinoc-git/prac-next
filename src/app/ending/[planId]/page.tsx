import React, { Suspense } from 'react';

import Loading from '@/components/common/loading/Loading';
import EndingContent from '@/components/endPlan/endingContent/EndingContent';

export const revalidate = 3600;

interface Props {
  params: { planId: string };
}

export default function Ending({ params }: Props) {
  return (
    <Suspense fallback={<Loading full={true} />}>
      <EndingContent params={params} />
    </Suspense>
  );
}
