import React from 'react';

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
    if (installEvent) {
      installEvent.prompt();
      const { outcome } = await installEvent.userChoice;

      if (outcome === 'accepted') {
        setInstallEvent(null);
      }
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
