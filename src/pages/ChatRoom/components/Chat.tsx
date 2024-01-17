import { useContext, useRef, useState } from "react";
import Dialog from "./Dialog";
import InputBLock from "./InputBLock";
import { userContext } from "../../../App";
import SelectChat from "./assets/SelectChat";
import Loader from "../../../components/Loader";

type TReply = {
  replyToName: string | null;
  replyTo: string | null;
  replyText: string | null;
};

export default function Chat(props: {
  chatLoader: boolean;
  setChatLoader: Function;
}) {
  const [reply, setReply] = useState<TReply>({
    replyTo: null,
    replyText: null,
    replyToName: null,
  });

  const dialogBox = useRef<HTMLDivElement | null>(null);
  const User = useContext(userContext);
  return (
    <div className="w-8/12 relative h-vh px-4 overflow-hidden flex flex-col mobile:w-full mobile:px-0">
      <Loader show={props.chatLoader} forBlock={true} className="z-10  bg-bg" />

      {User.activeChat ? (
        <>
          <Dialog
            setReply={setReply}
            dialogBox={dialogBox}
            setChatLoader={props.setChatLoader}
          />
          <InputBLock dialogBox={dialogBox} reply={reply} setReply={setReply} />
        </>
      ) : (
        <SelectChat />
      )}
    </div>
  );
}
