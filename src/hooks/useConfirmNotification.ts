import React from 'react';
import { toast } from 'react-toastify';

import { usePathname } from 'next/navigation';

import { getTargetUserNotificationToken } from '@/api/notification';
import { getNotificationToken } from '@/firebase/firebase';

import useConfirm from './useConfirm';

const useConfirmNotification = (userId: string | undefined) => {
  const [isShowed, setIsShowed] = React.useState(false);

  const confirm = useConfirm();
  const pathname = usePathname();

  const confirmPushNotification = React.useCallback(async () => {
    if (!userId) return;

    const targetData = await getTargetUserNotificationToken(userId);
    await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
      scope: '/firebase-cloud-messaging-push-scope',
    });

    if (targetData === null) {
      const confTitle = '푸시 알림 동의';
      const confDesc = '오프라인 푸시 알림 미동의시 서비스 이용이 어렵습니다.';
      const confFunc = async () => {
        if (!('Notification' in window)) return;

        const res = await Notification.requestPermission();

        if (res === 'granted') await getNotificationToken(userId);
        else toast.warning('푸시 알림 미동의 시 서비스 이용이 어렵습니다.');
      };

      confirm.default(confTitle, confDesc, confFunc);
    } else {
      const res = await Notification.requestPermission();
      if (res !== 'granted') toast.warning('푸시 알림 미동의 시 서비스 이용이 어렵습니다.');
    }
  }, [userId]);

  React.useEffect(() => {
    const showNotificationPermission = pathname === '/' || pathname === '/main';
    if (showNotificationPermission && !isShowed) {
      confirmPushNotification();
      setIsShowed(true);
    }
  }, [userId, pathname, isShowed]);

  return isShowed;
};

export default useConfirmNotification;
