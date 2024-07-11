import admin from 'firebase-admin';
import { type NextRequest, NextResponse } from 'next/server';

import type { ServiceAccount } from 'firebase-admin';
import type { Message } from 'firebase-admin/messaging';

export const POST = async (req: NextRequest) => {
  try {
    const message: Message = await req.json();

    const serviceAccount: ServiceAccount = {
      projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
      privateKey: process.env.NEXT_PUBLIC_FB_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      clientEmail: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
    };

    if (!admin.apps.length) {
      admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
    }

    await admin.messaging().send(message);

    return NextResponse.json(message, { status: 200 });
  } catch (error) {
    return console.error('Error sending notification:', error);
  }
};
