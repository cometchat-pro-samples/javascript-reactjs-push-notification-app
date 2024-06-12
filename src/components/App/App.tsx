/* eslint-disable @typescript-eslint/no-unused-vars */
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import { CometChatTheme } from "@cometchat/chat-uikit-react";
import { useEffect, useLayoutEffect, useState } from "react";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { Login } from "../Login";
import { IsMobileViewContext } from "../../IsMobileViewContext";
import { appStyle } from "./style";

import firebaseInitialize from "../../firebase";
import ConversationsWithMessages from "../ConversationsWithMessages";
function App() {
  const navigate = useNavigate();
  const [isMobileView, setIsMobileView] = useState(false);
  const [theme, setTheme] = useState(new CometChatTheme({}));


  useEffect(() => {
    // Assuming the service worker has already been registered elsewhere
    if (navigator.serviceWorker) {
      // Listen for messages from the service worker
      const handleServiceWorkerMessage = (event: any) => {
        console.log(
          "Received a message from service worker:",
          event,
          event.data.message
        );
        // Handle the message or payload here
        // You can pass the message to your component's state or context
        if (navigate) {
          navigate("/conversationsWithMessages", { state: event.data.message });
          return;
        }
      };

      navigator.serviceWorker.addEventListener(
        "message",
        handleServiceWorkerMessage
      );

      // Cleanup listener when the component unmounts
      return () => {
        navigator.serviceWorker.removeEventListener(
          "message",
          handleServiceWorkerMessage
        );
      };
    }
  }, []);

  useLayoutEffect(() => {
    firebaseInitialize(navigate);
  },[])

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 768) setIsMobileView(true);
      else setIsMobileView(false);
    }
    window.addEventListener("resize", handleResize);
  }, [setIsMobileView]);

  return (
    <div style={appStyle(theme)}>
      <div
        style={{
          height: "100px",
          width: "800px",
        }}
      >
        <div
          style={{
            boxSizing: "border-box",
            height: "100%",
            width: "100%",
            position: "absolute",
            top: "0",
            left: "0",
            backgroundColor: "white",
          }}
        >
          <IsMobileViewContext.Provider value={isMobileView}>
            <Routes>
              <Route path="/">
                <Route path="/" element={<CheckLogin />}></Route>
                <Route
                  path="conversationsWithMessages"
                  element={<ConversationsWithMessages />}
                />
              </Route>
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </IsMobileViewContext.Provider>

        </div>
      </div>
    </div>
  );
}

const CheckLogin = () => {
  const [loggedInUser, setLoggedInUser] = useState<
    CometChat.User | null | undefined
  >(null);
  const [interestingAsyncOpStarted, setInterestingAsyncOpStarted] = useState(
    false
  );
  const navigate = useNavigate();
  useLayoutEffect(() => {
    (async () => {
      try {
        setLoggedInUser(await CometChat.getLoggedinUser());
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      navigate("/conversationsWithMessages");
    }
  }, [loggedInUser])

  return (
    <Login
      loggedInUser={loggedInUser}
      setLoggedInUser={setLoggedInUser}
      setInterestingAsyncOpStarted={setInterestingAsyncOpStarted}
    />
  );
};

export default App;
