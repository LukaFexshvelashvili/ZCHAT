import { useContext, useState } from "react";
import { CloseIcon, SendIcon } from "../../../icons/icons";
import { sendMessage } from "../../../api/apifunctions";
import { userContext } from "../../../App";
import { auth } from "../../../api/firebase";

export default function InputBLock(props: {
  dialogBox: any;
  reply: any;
  setReply: Function;
}) {
  const User = useContext(userContext);
  const [message, setMessage] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message !== "" && message.replace(/\s+/g, "").length !== 0) {
      sendMessage(
        User.user,
        message,
        User.activeChat,
        props.reply.replyText ? props.reply : false
      );
      setMessage("");
      props.setReply({ replyTo: null, replyText: null, replyToName: null });
      if (props.dialogBox.current) {
        props.dialogBox.current.scrollBy(0, 999);
      }
    }
  };
  const closeReply = () => {
    props.setReply({ replyTo: null, replyText: null, replyToName: null });
  };
  return (
    <div className="w-full h-[100px] px-4 pt-3">
      <form
        className="flex justify-center items-center w-full h-full gap-[20px]"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="  w-[100%] h-11 relative flex justify-center">
          {props.reply.replyText ? (
            <div className="w-[calc(100%)] absolute h-8 border-t-2  border-l-2 border-r-2 border-inputBorder text-sm tracking-wider bg-inputBg rounded-t-lg bottom-[calc(100%)] flex items-center px-4">
              <span className=" text-replyToText pr-1">
                Reply{" "}
                {props.reply.replyTo !== auth.currentUser?.uid
                  ? props.reply.replyToName
                  : "You"}{" "}
                to :
              </span>
              <span className="text-myText">{props.reply.replyText}</span>
              <button
                type="button"
                onClick={closeReply}
                className="absolute right-2 bg-transparent h-4  aspect-square"
              >
                <CloseIcon className=" h-full aspect-square [&>path]:stroke-heartButton" />
              </button>
            </div>
          ) : null}

          <input
            className={`h-full w-full px-5 bg-inputBg placeholder:text-inputPlaceholder rounded-lg border-2 border-inputBorder outline-none transition-colors focus:bg-inputBgFocus ${
              props.reply.replyText ? "rounded-t-none" : ""
            }`}
            type="text"
            placeholder="message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="h-11 min-h-11 aspect-square cursor-pointer transition-colors bg-main rounded-lg flex items-center justify-center hover:bg-mainHover"
        >
          <SendIcon className=" h-[22px] aspect-square" />
        </button>
      </form>
    </div>
  );
}
