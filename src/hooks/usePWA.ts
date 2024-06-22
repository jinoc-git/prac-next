import React from 'react';
import { toast } from 'react-toastify';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
  prompt(): Promise<void>;
}

const usePWA = () => {
  const [installEvent, setInstallEvent] = React.useState<BeforeInstallPromptEvent | null>(null);

  const handleSaveEvent = (e: BeforeInstallPromptEvent) => {
    e.preventDefault();
    setInstallEvent(e);
  };

  const installApp = async () => {
    try {
      if (installEvent) {
        await installEvent.prompt();
        const { outcome } = await installEvent.userChoice;

        if (outcome === 'accepted') {
          setInstallEvent(null);
        }
      }
    } catch (error) {
      toast.error('앱 설치 오류가 발생했습니다.');
    }
  };

  React.useEffect(() => {
    window.addEventListener('beforeinstallprompt', handleSaveEvent as EventListener);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleSaveEvent as EventListener);
    };
  }, []);

  return { installEvent, installApp };
};

export default usePWA;
