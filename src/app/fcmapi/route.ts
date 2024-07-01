import { sendFCMNotification } from '@/api/sendFCM';

import type { NextApiRequest, NextApiResponse } from 'next';

const sendFCMHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { message } = req.body;

    try {
      const result = await sendFCMNotification(message);
      res.status(200).json({ result });
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  } else {
    res.status(405).end();
  }
};

export default sendFCMHandler;
