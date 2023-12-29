import { useContext, useEffect, useState } from "react";
import ChatBLock from "./ChatBLock";
import { PlusIcon } from "../../../icons/icons";
import { getChats } from "../../../api/apifunctions";
import { userContext } from "../../../App";

export default function ChatList() {
  const User = useContext(userContext);
  const [chats, setChats] = useState<any>([]);
  const [blockActive, setBlockActive] = useState("");
  useEffect(() => {
    getChats(setChats);
  }, []);

  return (
    <div className=" min-h-full w-4/12 bg-listBg rounded-r-[35px]  py-9 pl-[200px] pr-[20px] relative">
      <h3 className=" text-2xl tracking-wider mb-5">Conversations</h3>
      <div className="flex flex-col mb-8 gap-3">
        {chats.map((e: any, i: number) => {
          const chatData = e.data();
          return chatData.uId !== User.user.uid ? (
            <ChatBLock
              key={i}
              blockActive={blockActive}
              setBlockActive={setBlockActive}
              name={chatData.uName}
              blockId={chatData.uId}
              blockImage={chatData.uImage}
            />
          ) : null;
        })}
      </div>
      <h3 className=" text-2xl tracking-wider mb-5">Group Chats</h3>
      <div className="flex flex-col mb-8 gap-3">
        {/* {chats.map((e, i) => (
          <ChatBLock
            key={i}
            blockActive={blockActive}
            setBlockActive={setBlockActive}
            blockId={e.id}
            groupChat={true}
          />
        ))} */}
      </div>
      <div className=" cursor-pointer bg-buttonBg transition-colors py-4 w-full flex items-center rounded-xl px-8 hover:bg-buttonHover">
        <PlusIcon className="h-[26px] min-h-[26px] aspect-square" />

        <p className="w-full text-center">add conversation</p>
      </div>
    </div>
  );
}
