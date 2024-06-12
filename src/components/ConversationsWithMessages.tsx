import React, { useEffect, useState } from "react";
import { CometChat, CometChatNotifications } from "@cometchat/chat-sdk-javascript";
import {
  CometChatContacts,
  CometChatConversationsWithMessages,
  CometChatIncomingCall,
  CometChatTheme,
  CometChatUIKit,
  CometChatUIKitConstants,
  ConversationsConfiguration,
} from "@cometchat/chat-uikit-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./Button";
import PowerOff from "../assets/power-off.png";
import newIcon from "../assets/new.svg";

const incomingcallListenerId = "incomingcall_listener_id";

function ConversationsWithMessages() {
  const [user, setUser] = useState<any>();
  const [call, setCall] = useState<any>();
  const [theme, setTheme] = useState(new CometChatTheme({}));
  const [group, setGroup] = useState<any>();
  const [contacts, setContacts] = useState<any>(false);

  const navigate = useNavigate();

  const { state } = useLocation();

  const logout = () => {
    CometChatNotifications.unregisterPushToken().then((res)=>{
      console.log(res);
    })
    CometChatUIKit.logout()!.then(
      () => {
        console.log("Logout completed successfully");
        navigate("/");
      },
      (error: any) => {
        console.log("Logout failed with exception:", { error });
      }
    );
  };

  useEffect(() => {
    CometChat.addCallListener(
      incomingcallListenerId,
      new CometChat.CallListener({
        onIncomingCallCancelled: (call: CometChat.Call) => {
          console.log("onIncomingCallCancelled", call);
          setCall(undefined);
          CometChat.removeCallListener(incomingcallListenerId);
        },
        onOutgoingCallRejected: (call: CometChat.Call) => {
          console.log("onOutgoingCallRejected", call);
          setCall(undefined);
          CometChat.removeCallListener(incomingcallListenerId);
        },
      })
    );
    return () => {
      CometChat.removeCallListener(incomingcallListenerId);
    };
  }, []);

  useEffect(() => {
    if (state && state.receiverType === "user" && state.sender) {
      CometChat.getUser(state.sender).then(async (user) => {
        setGroup(null);
        setUser(user);
        if (state.fromBackground && state.type === "call") {
          let newCall = new CometChat.Call(
            state.receiver,
            state.callType,
            state.receiverType
          );
          newCall.setSessionId(state.sessionId);
          newCall.setCallInitiator(new CometChat.User(user));
          newCall.setSender(user);
          setCall(newCall);
        }
      });
    } else if (state && state.receiverType === "group") {
      CometChat.getGroup(state.receiver).then((group) => {
        setUser(null);
        setGroup(group);
      });
    }
  }, [state]);

  return (
    <>
      {call ? (
        <>
          <CometChatIncomingCall
            call={call}
            onDecline={() => {
              CometChat.rejectCall(
                call.sessionId,
                CometChatUIKitConstants.calls.rejected
              )
                .then((rejectedCall: CometChat.Call) => {
                  console.log("rejectedCall", rejectedCall);
                })
                .finally(() => {
                  setCall(undefined);
                });
              CometChat.removeCallListener(incomingcallListenerId);
            }}
            onError={() => {
              console.log("onError");
              setCall(undefined);
              CometChat.removeCallListener(incomingcallListenerId);
            }}
          />
        </>
      ) : (
        <CometChatIncomingCall />
      )}
      {contacts ? (
        <CometChatContacts
          onItemClick={(user, group) => {
            setUser(user);
            setGroup(group);
            setContacts(false);
          }}
        />
      ):
      <CometChatConversationsWithMessages
        conversationsConfiguration={
          new ConversationsConfiguration({
            menu: (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                }}
              >
                
                <Button
                  iconURL={PowerOff}
                  hoverText="Logout"
                  onClick={logout}
                  buttonStyle={{
                    backgroundColor: "transparent",
                    cursor: "pointer",
                    buttonIconTint: theme.palette.getAccent(),
                    border: "none",
                  }}
                />
                <div style={{width: 20}}/>
                <Button
                  iconURL={newIcon}
                  hoverText="New Conversation"
                  onClick={() => {
                    setContacts(true);
                  }}
                  buttonStyle={{
                    backgroundColor: "transparent",
                    cursor: "pointer",
                    buttonIconTint: theme.palette.getAccent(),
                    border: "none",
                  }}
                />
              </div>
            ),
          })
        }
        user={user ? user : null}
        group={group ? group : null}
      />
      }
    </>
  );
}

export default ConversationsWithMessages;
