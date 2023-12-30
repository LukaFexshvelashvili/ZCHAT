import { useContext, useState } from "react";
import { UserIcon } from "../../../icons/icons";
import { userContext } from "../../../App";
import { listenLastMessages } from "../../../api/apihooks";
import { auth } from "../../../api/firebase";

type TLastMessage = {
  text: string;
  seen: boolean;
  sender: string | null;
};

export default function ChatBLock(props: {
  blockId: string;
  blockActive: string;
  setBlockActive: Function;
  groupChat?: boolean;
  name: string;
  blockImage: string;
  setChatLoader: Function;
}) {
  const [lastMessage, setLastMessage] = useState<TLastMessage>({
    text: "",
    seen: true,
    sender: null,
  });

  const User = useContext(userContext);
  listenLastMessages(setLastMessage, props.blockId);
  const ifSeen =
    lastMessage.sender !== auth.currentUser?.uid ? lastMessage.seen : true;
  return (
    <div
      onClick={() => {
        props.setBlockActive(props.blockId);
        User.setActiveChat(props.blockId);
        if (props.blockActive !== props.blockId) {
          props.setChatLoader(true);
        }
      }}
      className={`flex items-center px-5 py-8 rounded-3xl w-full h-[95px] relative  cursor-pointer transition-colors duration-[0.05s] hover:bg-chatActiveBg ${
        ifSeen == false
          ? "bg-chatActiveBg"
          : props.blockActive === props.blockId
          ? "bg-chatActiveBg"
          : "bg-chatBg"
      }`}
    >
      {props.groupChat ? (
        <div className="flex items-center justify-center h-[60px] aspect-square relative">
          <div className=" z-[3] absolute top-0 left-0 profileIcon bg-gradient-to-br from-[#1C25FF] to-[#7000FF] h-[36px] aspect-square rounded-md  flex justify-center items-center ">
            <UserIcon className=" h-[24px] aspect-square" />
          </div>
          <div className=" z-[2] absolute profileIcon bg-gradient-to-br from-[#FFDB1C] to-[#FF3D00] h-[36px] aspect-square rounded-md  flex justify-center items-center ">
            <UserIcon className=" h-[24px] aspect-square" />
          </div>
          <div className=" z-[1] absolute  bottom-0 right-0 profileIcon bg-gradient-to-br from-[#FF1C1C] to-[#DB00FF] h-[36px] aspect-square rounded-md  flex justify-center items-center ">
            <UserIcon className=" h-[24px] aspect-square" />
          </div>
        </div>
      ) : (
        <div className="profileIcon bg-transparent h-[60px] aspect-square rounded-xl  flex justify-center items-center overflow-hidden">
          {props.blockImage ? (
            <img src={props.blockImage} alt="profileImage" />
          ) : (
            <UserIcon className=" h-[42px] aspect-square" />
          )}
        </div>
      )}
      <div className="flex flex-col w-full">
        <p className=" text-white text-lg ml-5 tracking-wider">{props.name}</p>
        <p
          className={`  text-sm ml-5 tracking-wider mb-3 ${
            ifSeen == false ? "text-white" : "text-myText"
          }`}
        >
          {lastMessage.sender ? (
            lastMessage.text
          ) : (
            <span className=" block h-5 w-24 rounded-md skelLoading"></span>
          )}
        </p>
      </div>
      {ifSeen == false ? (
        <div className=" absolute h-4 aspect-square rounded-full bg-main right-3"></div>
      ) : null}
    </div>
  );
}
