import React from 'react';

const usePWA = () => {
  const [installEvent, setInstallEvent] = React.useState<any>(null);

  const handleSaveEvent = (e: Event) => {
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
    window.addEventListener('beforeinstallprompt', handleSaveEvent);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleSaveEvent);
    };
  }, []);

  return { installEvent, installApp };
};

export default usePWA;
