import React from 'react';

import Invite from '@/components/plan/invite/Invite';

import EndPlanCost from './endPlanCost/EndPlanCost';
import EndPlanDate from './endPlanDate/EndPlanDate';
import EndPlanTitle from './endPlanTitle/EndPlanTitle';
import EndPlanVisitedPlace from './endPlanVisitedPlace/EndPlanVisitedPlace';

import type { PinType, PlanType } from '@/types/supabase';

interface Props {
  plan: PlanType;
  allPins: PinType[];
}

const PlanInfo = ({ plan, allPins }: Props) => {
  return (
    <section className="content-layout sm:pt-[133px] md:pt-[140px]">
      <EndPlanTitle title={plan.title} />
      <EndPlanDate dates={plan.dates} />
      <Invite />
      <EndPlanCost cost={plan.total_cost} />
      <EndPlanVisitedPlace allPins={allPins} />
    </section>
  );
};

export default PlanInfo;
