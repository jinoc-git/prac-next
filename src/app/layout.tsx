import Script from 'next/script';

import { getSessionFromServer } from '@/api/serverAction';
import Confirm from '@/components/common/confirm/Confirm';
import AnimateProvider from '@/components/common/providers/animateProvider/AnimateProvider';
import TanstackQueryProvider from '@/components/common/providers/tanstackQueryProvider/TanstackQueryProvider';
import ToastProvider from '@/components/common/providers/toastProvider/ToastProvider';
import Header from '@/components/header/Header';
import Footer from '@/components/landing/footer/Footer';
import SideBar from '@/components/sideBar/SideBar';

import type { Metadata, Viewport } from 'next';

import './globals.css';

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'Traduler',
  description: '다 같이 여행을 떠날 때 저희 서비스와 함께해요!',
  appleWebApp: {
    capable: true,
    title: 'Traduler',
    statusBarStyle: 'black-translucent',
  },
  openGraph: {
    url: 'https://traduler.com',
    title: 'Traduler',
    description: '다 같이 여행을 떠날 때 저희 서비스와 함께해요!',
    images: {
      url: '/images/traduler_intro.png',
      alt: 'Traduler 미리보기 사진',
      width: 1920,
      height: 1080,
    },
  },
  manifest: '/manifest.json',
};
// icons: [
//   {
//     rel: 'apple-touch-icon',
//     sizes: '16x16',
//     url: '/images/Assets.xcassets/AppIcon.appiconset/16.png',
//   },
// ],

const KAKAO_MAP_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY}&autoload=false&libraries=services,clusterer`;

async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSessionFromServer();

  return (
    <html lang="ko">
      <body>
        <TanstackQueryProvider>
          <Header session={session} />
          <SideBar />
          <Script src={KAKAO_MAP_URL} strategy="beforeInteractive" />
          <AnimateProvider>{children}</AnimateProvider>
          <Footer />
          <ToastProvider />
        </TanstackQueryProvider>
        <Confirm />
        <div id="modal-portal" />
        <div id="datepiker-portal" />
      </body>
    </html>
  );
}

export default RootLayout;
