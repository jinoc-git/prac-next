import { redirect } from 'next/navigation';

import { getUserFromServer } from '@/api/serverAction';
import GuideBanner from '@/components/landing/guideBanner/GuideBanner';
import InstallAppOrNavigate from '@/components/landing/installAppOrNavigate/InstallAppOrNavigate';
import IntroduceBanner from '@/components/landing/introduceBanner/IntroduceBanner';
import MainBanner from '@/components/landing/mainBanner/MainBanner';

export default async function Home() {
  const user = await getUserFromServer();

  if (user !== null) redirect('/main');

  return (
    <>
      <MainBanner />
      <GuideBanner />
      <IntroduceBanner />
      <InstallAppOrNavigate />
    </>
  );
}
