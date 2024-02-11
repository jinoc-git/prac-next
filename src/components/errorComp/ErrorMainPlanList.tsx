import React from 'react';

import AddPlanBtn from '../main/planList/AddPlanBtn';
import PlanCardList from '../main/planList/PlanCardList';
import PlanTabMenu from '../main/planList/planTabMenu/PlanTabMenu';

export default function ErrorMainPlanList() {
  return (
    <section
      className="flex flex-col mx-auto my-0
        sm:w-[320px] 
        md:w-[800px] "
    >
      <AddPlanBtn />
      <div className="flex flex-col gap-[16px]">
        <PlanTabMenu />
        <PlanCardList />
      </div>
    </section>
  );
}
