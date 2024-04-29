import React from 'react';

import EndPlanTitle from './endPlanTitle/EndPlanTitle';

import type { PlanType } from '@/types/supabase';

interface Props {
  plan: PlanType;
}

const PlanInfo = ({ plan }: Props) => {
  return (
    <section className="pt-[140px] content-layout">
      <EndPlanTitle title={plan.title} />
    </section>
  );
};

export default PlanInfo;
