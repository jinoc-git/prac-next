import admin from 'firebase-admin';

import type { ServiceAccount } from 'firebase-admin';

export interface NotificationData {
  data: {
    title: string;
    body: string;
    click_action: string;
  };
  token: string;
}

export const sendFCMNotification = async (data: NotificationData) => {
  try {
    const serviceAccount: ServiceAccount = {
      projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
      privateKey: process.env.NEXT_PUBLIC_FB_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      clientEmail: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
    };

    if (!admin.apps.length) {
      console.log('firebase initialize');
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }
    console.log('start push');
    const res = await admin.messaging().send(data);
    console.log('result', res, data);
    return res;
  } catch (error) {
    console.log('sendNotification', error);
  }
};
