import { useState } from "react";
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
  image: string | null;
  reply: {
    replyToName: string | null;
    replyTo: string | null;
    replyText: string | null;
  };
};
type TExpandedImage = {
  active: boolean;
  url: string | null;
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
  image,
  reply,
}: TMessageBox) {
  const [react, setRreact] = useState(reacted);
  const [expandedImage, setExpandedImage] = useState<TExpandedImage>({
    active: false,
    url: null,
  });
  const [imageLoaded, setImageLoaded] = useState(reacted);

  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const handleReact = () => {
    clickDisable();
    setRreact((state) => !state);
    giveReact(messageId);
  };
  const clickDisable = () => {
    setButtonDisabled(true);

    setTimeout(() => {
      setButtonDisabled(false);
    }, 500);
  };
  const handleReply = () => {
    setReply({ replyTo: senderId, replyText: text, replyToName: senderName });
  };

  return (
    <>
      {expandedImage.active && expandedImage.url ? (
        <div
          onClick={() =>
            setExpandedImage({
              active: false,
              url: ``,
            })
          }
          className="expandImageClass fixed z-40 h-full w-full bg-[rgba(0,0,0,0.4)]  top-0 left-0 flex justify-center items-center"
        >
          <img src={expandedImage.url} className="max-w-full max-h-full" />
        </div>
      ) : null}
      {own ? (
        <div
          className={`flex items-center justify-end w-auto group relative   ${
            reply.replyText ? "mt-10" : ""
          }`}
        >
          {reply.replyText ? (
            <>
              <div className=" absolute bottom-[100%] right-[20px]  text-replyToText flex items-center text-sm mb-2 mobile:text-[13px] mobile:right-[0px]">
                <span className="mx-2 tracking-widest">Replied:</span>
                <div className=" bg-inputBg px-3 py-[4px] rounded-lg mobile:text-sm overflow-hidden max-w-[280px] mobile:max-w-[200px]">
                  <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                    {reply.replyText}
                  </p>
                </div>
              </div>
            </>
          ) : null}
          <div className="absolute right-[0px] bottom-[-20px] z-10">
            <p className="text-sm text-timeText mx-3 mobile:text-[12px]">
              {isLast
                ? time !== "sending..."
                  ? seen
                    ? "seen"
                    : "sent"
                  : ""
                : null}{" "}
            </p>
          </div>
          <p className="text-sm text-timeText mx-3 mobile:text-[12px]">
            <span className="select-none transition-opacity opacity-0 group-hover:opacity-100">
              {time}
            </span>
          </p>

          <div className="px-3 py-2 bg-myTextBox font-mainR rounded-xl text-myText relative mobile:text-sm tracking-wider max-w-[450px] mobile:max-w-[250px] flex items-center">
            <button
              onClick={handleReply}
              className={`absolute select-none transition-opacity opacity-0 group-hover:opacity-100 right-[calc(100%+80px)] mobile:right-[calc(100%+70px)] `}
            >
              <ReplyIcon className="h-6 aspect-square [&>path]:fill-heartButton" />
            </button>
            {react ? (
              <div className="absolute left-[-5px] bottom-[-5px]">
                <HeartIcon className="h-4 aspect-square" />
              </div>
            ) : null}

            {text}
            {image ? (
              <div className="min-h-[100px] min-w-[80px] relative flex items-center justify-center">
                {imageLoaded ? null : (
                  <div className=" absolute h-full w-full skelLoadingImg rounded-lg"></div>
                )}
                <img
                  onClick={() =>
                    setExpandedImage({
                      active: true,
                      url: `https://firebasestorage.googleapis.com/v0/b/react-chat-50224.appspot.com/o/${image.replace(
                        "/",
                        "%2F"
                      )}?alt=media`,
                    })
                  }
                  className={`max-h-[200px] max-w-[200px] rounded-lg ${
                    imageLoaded ? "visible" : "invisible"
                  }`}
                  src={`https://firebasestorage.googleapis.com/v0/b/react-chat-50224.appspot.com/o/${image.replace(
                    "/",
                    "%2F"
                  )}?alt=media`}
                  onLoad={() => setImageLoaded(true)}
                />
              </div>
            ) : null}
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
              <div className=" absolute bottom-[100%] left-[0]  text-replyToText flex items-center text-sm mb-2 ">
                <div className=" bg-inputBg px-3 py-[4px] rounded-lg mobile:text-[13px]">
                  {reply.replyText}
                </div>
                <span className="mx-2 tracking-widest">
                  {" "}
                  Replied {reply.replyTo !== auth.currentUser?.uid ? "" : "You"}
                </span>
              </div>
            </>
          ) : null}
          <button
            onClick={handleReact}
            disabled={isButtonDisabled}
            className={`absolute right-[calc(100%+8px)] opacity-0 transition-opacity group-hover:opacity-100  mobile:hidden ${
              isButtonDisabled ? "invisible" : "visible"
            }`}
          >
            <HeartIcon className="h-4 aspect-square [&>path]:fill-heartButton" />
          </button>

          <div
            onDoubleClick={handleReact}
            className="px-3 py-2 text-white bg-main rounded-xl relative mobile:text-sm max-w-[450px] mobile:max-w-[250px] font-mainR"
          >
            {react ? (
              <div className="absolute right-[-5px] bottom-[-5px]">
                <HeartIcon className="h-4 aspect-square" />
              </div>
            ) : null}

            {text}
            {image ? (
              <div className="min-h-[100px] min-w-[80px] relative  flex items-center justify-center">
                {imageLoaded ? null : (
                  <div className=" absolute h-full w-full skelLoadingImg rounded-lg"></div>
                )}
                <img
                  className={`max-h-[200px] max-w-[200px] rounded-lg ${
                    imageLoaded ? "visible" : "invisible"
                  }`}
                  src={`https://firebasestorage.googleapis.com/v0/b/react-chat-50224.appspot.com/o/${image.replace(
                    "/",
                    "%2F"
                  )}?alt=media`}
                  onLoad={() => setImageLoaded(true)}
                />
              </div>
            ) : null}
          </div>
          <p className="text-sm text-timeText mx-3 relative flex items-center mobile:text-[12px] select-none transition-opacity opacity-0 group-hover:opacity-100">
            {time}
            <button
              onClick={handleReply}
              className="absolute left-[calc(100%+8px)] select-none transition-opacity opacity-0 group-hover:opacity-100"
            >
              <ReplyIcon className="h-6 aspect-square [&>path]:fill-heartButton" />
            </button>
          </p>
        </div>
      )}
    </>
  );
}
