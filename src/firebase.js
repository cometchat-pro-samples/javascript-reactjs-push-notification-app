
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { CometChatNotifications } from "@cometchat/chat-sdk-javascript";
import { CometChatConstants } from "./const";
export default async function firebaseInitialize(navigate) {
  const firebaseConfig = {
    apiKey: "xxxxxxxxxxxxxxxxxxxxx",
    authDomain: "xxxxxxxxxxxxxxxxxxxxx",
    projectId: "xxxxxxxxxxxxxxxxxxxxx",
    storageBucket: "xxxxxxxxxxxxxxxxxxxxx",
    messagingSenderId: "xxxxxxxxxxxxxxxxxxxxx",
    appId: "xxxxxxxxxxxxxxxxxxxxx",
    measurementId: "xxxxxxxxxxxxxxxxxxxxx"
  };

  const app = initializeApp(firebaseConfig); // Initialize Firebase App
  const messaging = getMessaging(app); // Initialize Firebase Messaging

  getToken(messaging, {
    vapidKey:
      "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  })
    .then((currentToken) => {
      if (currentToken) {
        CometChatNotifications.registerPushToken(
          currentToken,
          CometChatNotifications.PushPlatforms.FCM_WEB,
          CometChatConstants.fcmProviderId
        )
          .then((payload) => {
            console.log("from comet", payload);
            console.log("curr token", currentToken);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });

  onMessage(messaging, function (payload) {
    console.log("Got message",payload)
  });
}
