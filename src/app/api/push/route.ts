import { type NextRequest, NextResponse } from 'next/server';

import { sendFCMNotification } from '@/api/sendFCM';

import type { NotificationData } from '@/api/sendFCM';

export const POST = async (req: NextRequest) => {
  try {
    const { message } = await req.json();

    await sendFCMNotification(message as NotificationData);

    return NextResponse.json(message, { status: 200 });
  } catch (error) {
    return console.error('Error sending notification:', error);
  }
};
