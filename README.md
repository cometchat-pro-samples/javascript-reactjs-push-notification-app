<p align="center">
  <img alt="CometChat" src="https://assets.cometchat.io/website/images/logos/banner.png">
</p>

# React Push Notification App

CometChat Push Notification Sample App is a fully functional push notification app capable of one-on-one (private) and group messaging, and Calling. This sample app enables users to send and receive push notifications for text and multimedia messages like **images, videos, documents** and **Custom Messages**. Also, users can make push notifications for Audio and Video calls to other users or groups.

<hr/>

## Pre-requisite :star:
1. Login to the <a href="https://app.cometchat.io/" target="_blank">CometChat Dashboard</a>.
2. Select an existing app or create a new one.
3. Go to the credentials section and copy the `Auth` key from the credentials tab.
4. Go to the "Extensions" section and Enable the Push Notifications extension.
5. Go to the "Installed" tab in the same section to open the settings for this extension and Set the version to Token-based(V2).
6. Also, save the `FCM Server key` (received from [Firebase Console](https://console.firebase.google.com/)) in the Settings and click on Save.
7. Copy the `APP_ID`, `REGION`, and `AUTH_KEY` for your app.
</br>

 
## Installation :wrench:

1. Clone the repository:
   ```sh
   git clone https://github.com/cometchat/cometchat-push-notification-app-react.git
    ```
2. Open the project in VS Code
3. Install the dependencies
   ```sh
   npm i
    ```
4. Refer to the step from [documentation](https://www.cometchat.com/docs/extensions/web-push-notifications) to configure the app to use FCM.
5. Run the app
   ```
   npm run start
   ```


## Help and Support
For issues running the project or integrating with our UI Kits, consult our [documentation](https://www.cometchat.com/docs/extensions/web-push-notifications) or create a [support ticket](https://help.cometchat.com/hc/en-us) or seek real-time support via the [CometChat Dashboard](https://app.cometchat.com/).
