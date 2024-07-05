import React from 'react';

import { redirect } from 'next/navigation';

import { getSessionFromServer } from '@/api/serverAction';
import AddOrEditPlan from '@/components/plan/addOrEditPlan/AddOrEditPlan';

export default async function AddPlan() {
  const session = await getSessionFromServer();

  if (session === null) redirect('/signin');

  return (
    <section className="sm:pt-[80px] md:pt-[70px]">
      <AddOrEditPlan />
    </section>
  );
}
