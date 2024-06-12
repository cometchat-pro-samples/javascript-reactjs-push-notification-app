<p align="center">
  <img alt="CometChat" src="https://assets.cometchat.io/website/images/logos/banner.png">
</p>

# React Enhanced Push notifications (Beta) Sample app

The CometChat React [Enhanced Push notifications (Beta)](https://www.cometchat.com/docs-beta/notifications/push-overview) Sample app is a fully functional push notification app capable of one-on-one (private) and group messaging, and Calling. This sample app enables users to send and receive push notifications for text and multimedia messages like **images, videos, documents** and **Custom Messages**.

> [!NOTE]
> If you are using Push Notifications (Extension), please refer to our [React Push Notifications (Extension)](https://github.com/cometchat/cometchat-push-notification-app-react/tree/v4-push-notifications-extension) Sample app for guidance.

## Pre-requisite

1. Login to the [CometChat Dashboard](https://app.cometchat.com/).
2. Select an existing app or create a new one.
3. Click on the Notifications section from the menu on the left.
4. Enable Push Notifications by clicking on the toggle bar and configure the push notifications.
5. Add credentials for FCM and make a note of the provider id.

## Run the Sample App

1. Clone this repository.
2. Install the dependencies:

```
npm i
```

3. Paste the `firebaseConfig` in the correct location as per FCM's documentation.
4. Add your app credentials like `appId`, `region`, `authKey` in the `src/const.ts`.
5. Also add the `fcmProviderId` in `src/const.ts` as that is required while registering push token.
6. Run the sample app.

```
npm start
```

6. Once the app opens up in a browser, login with a user.
7. Allow the permission to display push notifications.
8. Send a message or call to the logged in user from another browser/device.
9. You should see a push notification for a message.
10. Tap on the notification to open the Sample app for message.

## Help and Support

For issues running the project or integrating with our UI Kits, consult our [documentation](https://www.cometchat.com/docs-beta/notifications/push-overview) or create a [support ticket](https://help.cometchat.com/hc/en-us) or seek real-time support via the [CometChat Dashboard](https://app.cometchat.com/).
