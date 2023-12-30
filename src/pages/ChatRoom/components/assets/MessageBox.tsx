import { giveReact } from "../../../../api/apifunctions";
import { auth } from "../../../../api/firebase";
import { HeartIcon, ReplyIcon } from "../../../../icons/icons";

type TMessageBox = {
  messageId: string;
  own: boolean;
  senderId: string;
  senderName: string;
  time: string;
  text: string;
  seen: boolean;
  setReply: Function;
  reacted: boolean;
  isLast: boolean;
  reply: {
    replyToName: string | null;
    replyTo: string | null;
    replyText: string | null;
  };
};

export default function MessageBox({
  messageId,
  own,
  senderId,
  senderName,
  time,
  text,
  seen,
  setReply,
  reacted,
  isLast,
  reply,
}: TMessageBox) {
  const handleReact = () => {
    giveReact(messageId);
  };
  const handleReply = () => {
    setReply({ replyTo: senderId, replyText: text, replyToName: senderName });
  };

  return own ? (
    <div
      className={`flex items-center justify-end w-auto group relative ${
        reply.replyText ? "mt-10" : ""
      }`}
    >
      {reply.replyText ? (
        <>
          <div className=" absolute bottom-[100%] right-[20px]  text-replyToText flex items-center text-sm mb-2">
            <span className="mx-2 tracking-widest">
              {" "}
              Replied{" "}
              {reply.replyTo !== auth.currentUser?.uid
                ? reply.replyToName
                : "You"}
              {": "}
            </span>
            <div className=" bg-inputBg px-3 py-[4px] rounded-lg">
              {reply.replyText}
            </div>
          </div>
        </>
      ) : null}
      <p className="text-sm text-timeText mx-3">
        {isLast
          ? time !== "Sending..."
            ? seen
              ? "seen"
              : "sent"
            : ""
          : null}{" "}
        {time}
      </p>
      <div className="px-3 py-2 bg-myTextBox rounded-xl text-myText relative ">
        <button
          onClick={handleReply}
          className="absolute right-[calc(100%+80px)] opacity-0 transition-opacity group-hover:opacity-100"
        >
          <ReplyIcon className="h-6 aspect-square [&>path]:fill-heartButton" />
        </button>
        {reacted ? (
          <div className="absolute left-[-5px] bottom-[-5px]">
            <HeartIcon className="h-4 aspect-square" />
          </div>
        ) : null}

        {text}
      </div>
    </div>
  ) : (
    <div
      className={`flex items-center w-auto relative group ${
        reply.replyText ? "mt-10" : ""
      }`}
    >
      {reply.replyText ? (
        <>
          <div className=" absolute bottom-[100%] left-[0  text-replyToText flex items-center text-sm mb-2">
            <div className=" bg-inputBg px-3 py-[4px] rounded-lg">
              {reply.replyText}
            </div>
            <span className="mx-2 tracking-widest">
              {" "}
              Replied{" "}
              {reply.replyTo !== auth.currentUser?.uid
                ? reply.replyToName
                : "You"}
            </span>
          </div>
        </>
      ) : null}
      <button
        onClick={handleReact}
        className="absolute right-[calc(100%+8px)] opacity-0 transition-opacity group-hover:opacity-100"
      >
        <HeartIcon className="h-4 aspect-square [&>path]:fill-heartButton" />
      </button>

      <div
        onDoubleClick={handleReact}
        className="px-3 py-2 text-white bg-main rounded-xl relative "
      >
        {reacted ? (
          <div className="absolute right-[-5px] bottom-[-5px]">
            <HeartIcon className="h-4 aspect-square" />
          </div>
        ) : null}

        {text}
      </div>
      <p className="text-sm text-timeText mx-3 relative flex items-center">
        {time}
        <button
          onClick={handleReply}
          className="absolute left-[calc(100%+8px)] opacity-0 transition-opacity group-hover:opacity-100"
        >
          <ReplyIcon className="h-6 aspect-square [&>path]:fill-heartButton" />
        </button>
      </p>
    </div>
  );
}
