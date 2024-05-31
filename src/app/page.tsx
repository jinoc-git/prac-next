import GuideBanner from '@/components/landing/guideBanner/GuideBanner';
import InstallAppOrNavigate from '@/components/landing/installAppOrNavigate/InstallAppOrNavigate';
import IntroduceBanner from '@/components/landing/introduceBanner/IntroduceBanner';
import MainBanner from '@/components/landing/mainBanner/MainBanner';

export default function Home() {
  return (
    <>
      <MainBanner />
      <GuideBanner />
      <IntroduceBanner />
      <InstallAppOrNavigate />
    </>
  );
}
