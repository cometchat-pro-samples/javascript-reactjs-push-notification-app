<p align="center">
  <img alt="CometChat" src="https://assets.cometchat.io/website/images/logos/banner.png">
</p>

# React Push Notifications (Extension) Sample App

The CometChat React [Push Notifications (Extension)](https://www.cometchat.com/docs/extensions/web-push-notifications) Sample App is a fully functional push notification app capable of one-on-one (private) and group messaging. This sample app enables users to send and receive push notifications for text and multimedia messages like **images, videos, documents** and **Custom Messages**. Also, users can make push notifications for Audio and Video calls to other users or groups.

> [!NOTE]
> If you wish to try Enhanced Push Notifications (Beta), please refer to our [React Push Notifications (Beta)](https://github.com/cometchat/cometchat-push-notification-app-react/tree/v4-enhanced-push-notification) Sample app for guidance.

## Pre-requisite :star:

1. Login to the <a href="https://app.cometchat.io/" target="_blank">CometChat Dashboard</a>.
2. Select an existing app or create a new one.
3. Under the Extensions section, enable Push Notifications.
4. Configure Push Notifications by saving the required FCM credentials.

## Installation :wrench:

1. Clone this repository.
2. Install the dependencies
   ```sh
   npm i
   ```
3. Add the Firebase configuration object as mentioned in the FCM documentation for Web.
4. Save your `appId`, `region` and `authKey` in the `const.ts` file. These details can be obtained from the CometChat dashboard.
5. Run the app
   ```
   npm run start
   ```

## Help and Support

For issues running the project or integrating with our UI Kits, consult our [documentation](https://www.cometchat.com/docs/extensions/web-push-notifications) or create a [support ticket](https://help.cometchat.com/hc/en-us) or seek real-time support via the [CometChat Dashboard](https://app.cometchat.com/).
