import React from 'react';

import { redirect } from 'next/navigation';

import { getUserFromServer } from '@/api/serverAction';
import InstallApp from '@/components/main/installApp/InstallApp';
import PlanList from '@/components/main/planList/PlanList';
import Profile from '@/components/main/profile/Profile';

export default async function Main() {
  const user = await getUserFromServer();

  if (user === null) redirect('/signin');

  return (
    <>
      <div
        className="absolute top-0 left-0 w-full bg-blue_dark z-[-1]
        sm:h-[313px]
        md:h-[363px]"
      ></div>
      <Profile />
      <PlanList />
      <InstallApp />
    </>
  );
}
