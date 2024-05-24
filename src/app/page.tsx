import GuideBanner from '@/components/landing/guideBanner/GuideBanner';
import IntroduceBanner from '@/components/landing/introduceBanner/IntroduceBanner';
import MainBanner from '@/components/landing/mainBanner/MainBanner';
import PWAButton from '@/components/landing/pwaButton/PWAButton';

export default function Home() {
  return (
    <>
      <MainBanner />
      <GuideBanner />
      <IntroduceBanner />
      <PWAButton />
    </>
  );
}
