// /* eslint-disable no-restricted-globals */
// /* eslint-disable no-undef */
// // required to setup background notification handler when browser is not in focus or in background and
// // In order to receive the onMessage event,  app must define the Firebase messaging service worker
// // self.importScripts("localforage.js");

importScripts(
  "https://www.gstatic.com/firebasejs/9.15.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.15.0/firebase-messaging-compat.js"
);
var TAG = "[Firebase-sw.js]";

self.addEventListener("notificationclick", async function (event) {
  console.log(TAG, "notificationclick", event, event.clientId);
  if (event?.notification?.data) {
    let data = event.notification.data;
    event.waitUntil(
      self.clients
        .matchAll({ type: "window", includeUncontrolled: true })
        .then((clientList) => {
          if (clientList.length > 0) {
            clientList[0].postMessage({
              message: data,
            });
            return (
              clientList[0]
                .focus()
                .catch((error) => {
                  console.log(error);
                  return self.clients.openWindow(clientList[0].url); // Adjust this URL as necessary for your application
                })
            );
          } else {
            // Open a new client (tab) if there are no existing clients
            self.clients.openWindow("/");
            setTimeout(() => {
              self.clients
                .matchAll({ type: "window", includeUncontrolled: true })
                .then((clientList) => {
                  if (clientList.length > 0) {
                    clientList[0].postMessage({
                      message: {...data,fromBackground: true},
                    });
                  }
                  return;
                });
            }, 1500);
          }
        })
    );
  }

  event.notification.close();
});
// "Default" Firebase configuration (prevents errors)
const defaultConfig = {
  apiKey: true,
  projectId: true,
  messagingSenderId: true,
  appId: true,
};

// Initialize Firebase app
firebase.initializeApp(self.firebaseConfig || defaultConfig);
let messaging;
try {
  messaging = firebase.messaging();
  // Customize background notification handling here
  messaging.onBackgroundMessage((payload) => {
    console.log("Background Message:", payload);
    const notificationTitle = payload.data.title;
    if (
      payload.data.type === "call" &&
      (payload.data.callAction === "unanswered" ||
        payload.data.callAction === "busy" ||
        payload.data.callAction === "ongoing")
    ) {
      return;
    }
    let body = payload.data.body;
    if (payload.data.type === "call") {
      switch (payload.data.callAction) {
        case "cancelled":
          body = `Call cancelled`;
          break;
        case "initiated":
          body = `Incoming ${payload.data.callType} call`;
          break;
        default:
          break;
      }
    }
    const notificationOptions = {
      title: payload.data.title,
      icon: payload.data.senderAvatar,
      data: payload.data,
      tag: payload.data.tag,
      body: body,
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
  });
} catch (err) {
  console.error("Failed to initialize Firebase Messaging", err);
}
