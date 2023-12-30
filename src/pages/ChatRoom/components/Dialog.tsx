import { useContext, useEffect, useState } from "react";
import { fetchMessages, setSeen } from "../../../api/apifunctions";
import DialogStarter from "./assets/DialogStarter";
import MessageBox from "./assets/MessageBox";
import { userContext } from "../../../App";

export default function Dialog(props: {
  dialogBox: any;
  setChatLoader: Function;
}) {
  const [messages, setMessages] = useState<any>([]);
  const User = useContext(userContext);
  useEffect(() => {
    window.onclick = () => {
      setSeen(User.activeChat);
    };
  }, []);
  const getDown = () => {
    if (props.dialogBox.current) {
      props.dialogBox.current.scrollBy(0, 150);
    }
  };
  fetchMessages(setMessages, getDown, User.activeChat);

  useEffect(() => {
    if (props.dialogBox.current) {
      props.dialogBox.current.scrollBy(0, 99999);

      props.setChatLoader(false);
    }

    if (messages) {
      setSeen(User.activeChat);
    }
  }, [messages]);

  return (
    <div
      ref={props.dialogBox}
      className="max-h-[calc(100vh-100px)] min-h-[calc(100vh-100px)] overflow-x-hidden chatDialog px-6"
    >
      <DialogStarter />
      <div className="flex flex-col gap-4">
        {messages
          ? messages.map((e: any, i: number) => (
              <MessageBox
                key={i}
                own={User.user.uid == e.data.uId}
                text={e.data.text}
                seen={e.data.seen}
                isLast={messages.length - 1 == i}
                time={
                  e.data.sendTime
                    ? getTime(
                        e.data.sendTime.seconds,
                        e.data.sendTime.nanoseconds
                      )
                    : "Sending..."
                }
              />
            ))
          : null}
      </div>
    </div>
  );
}
const getTime = (seconds: number, nanoseconds: number) => {
  const time = new Date(seconds * 1000 + nanoseconds / 1000000);
  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return `${formattedTime}`;
};
