import Script from 'next/script';

import { getSessionFromServer } from '@/api/serverAction';
import Confirm from '@/components/common/confirm/Confirm';
import Providers from '@/components/common/providers/Providers';
import ToastProvider from '@/components/common/toastProvider/ToastProvider';
import Header from '@/components/header/Header';
import SideBar from '@/components/sideBar/SideBar';

import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Traduler',
  description: '다 같이 여행을 떠날 때 저희 서비스와 함께해요!',
};

const KAKAO_MAP_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY}&autoload=false&libraries=services,clusterer`;

async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSessionFromServer();

  return (
    <html lang="ko">
      <body>
        <Providers>
          <SideBar />
          <Header session={session} />
          <main className="w-full min-h-screen">{children}</main>
          <Script src={KAKAO_MAP_URL} strategy="beforeInteractive" />
          <ToastProvider />
        </Providers>
        <Confirm />
        <div id="modal-portal" />
        <div id="datepiker-portal" />
      </body>
    </html>
  );
}

export default RootLayout;
