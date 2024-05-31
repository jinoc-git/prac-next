import Script from 'next/script';

import { getSessionFromServer } from '@/api/serverAction';
import Confirm from '@/components/common/confirm/Confirm';
import AnimateProvider from '@/components/common/providers/animateProvider/AnimateProvider';
import TanstackQueryProvider from '@/components/common/providers/tanstackQueryProvider/TanstackQueryProvider';
import ToastProvider from '@/components/common/providers/toastProvider/ToastProvider';
import Header from '@/components/header/Header';
import Footer from '@/components/landing/footer/Footer';
import SideBar from '@/components/sideBar/SideBar';
import { META_DESC, META_ICONS, META_NAME, META_SITE_URL, META_TITLE } from '@/constant/metadatas';

import type { Metadata, Viewport } from 'next';

import './globals.css';

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  // userScalable: false,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: META_TITLE,
  description: META_DESC,
  appleWebApp: {
    capable: true,
    title: META_TITLE,
    statusBarStyle: 'black-translucent',
  },
  openGraph: {
    url: META_SITE_URL,
    siteName: META_NAME,
    title: META_TITLE,
    description: META_DESC,
    images: {
      url: '/images/traduler_intro.png',
      alt: 'Traduler 미리보기 사진',
      width: 1920,
      height: 1080,
    },
  },
  manifest: '/manifest.json',
  icons: META_ICONS,
};

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
