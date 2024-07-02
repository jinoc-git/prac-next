import { toast } from 'react-toastify';

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

import { savaNotificationToken } from '@/api/notification';

const VAPID_KEY = process.env.NEXT_PUBLIC_VAPID_KEY;

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FB_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGE_ID,
  appId: process.env.NEXT_PUBLIC_FB_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const getNotificationToken = async (userId: string) => {
  try {
    const messaging = getMessaging(app);
    // 현재 배포된 서비스에서 토큰 발급 시 토큰 발급 오류가 뜸
    const token = await getToken(messaging, { vapidKey: VAPID_KEY });

    if (!token) {
      toast.warning('푸시 알림에 동의해야 원할한 서비스 이용이 가능합니다.');
    } else {
      await savaNotificationToken(userId, token);
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.message !== '푸시 알림 토큰 저장 오류') throw new Error('토큰 발급 오류');
    }
  }
};
