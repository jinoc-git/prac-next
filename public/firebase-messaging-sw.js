importScripts('https://www.gstatic.com/firebasejs/9.0.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyCYVFKDq52Ndq_OyXbRbvwBn-49cQZ3ij4',
  authDomain: 'traduler.firebaseapp.com',
  projectId: 'traduler',
  storageBucket: 'traduler.appspot.com',
  messagingSenderId: '136663781474',
  appId: '1:136663781474:web:a2288251716d0d81ca413b',
});

self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json().data;

    const options = {
      body: data.body,
      icon: '/images/android/android-launchericon-144-144.png',
      image: '/images/android/android-launchericon-144-144.png',
      data: {
        click_action: data.click_action,
      },
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
  } else {
    console.log('This push event has no data.');
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const urlToOpen = event.notification.data.click_action;

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      let matchingClient = null;

      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        if (windowClient.url.includes(urlToOpen)) {
          matchingClient = windowClient;
          break;
        }
      }

      if (matchingClient) return matchingClient.focus();
      else return clients.openWindow(urlToOpen);
    }),
  );
});
